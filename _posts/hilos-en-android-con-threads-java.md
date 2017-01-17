<p>
Toda aplicación de Android tiene al menos un hilo o thread de ejecución. Ese thread es el encargado
de la pantalla que tienes ante ti y es imprescindible por la manera en la que Android gestiona los
cambios en el interfaz: a través de una cola de mensajes. Es decir, cada vez que aplicamos algún cambio 
en algún View no se aplica directamente sino que se deja la petición en una cola. Y ese hilo, el UI thread
o el hilo principal de la aplicación es quien precisamente se encarga de procesar esa cola y aplicar los
cambios solicitados. 
</p>

<p>También desde ese hilo es de donde se llama a los callbacks de los eventos y es por eso por lo 
que hay que tener ojo con determinadas acciones si no queremos que la aplicación se ralentice 
y deje de responder. El ejemplo más típico es un acceso a la red. Para que la aplicación siga respondiendo
resulta imprescindible por tanto dejar determinadas tareas a nuevos hilos. Android soporta los hilos
básicos de java más todo el API de concurrencia, y aparte trae sus propios superhilos llamados AsyncTask.
Entre uno y otro quizá habrá que decantarse por el último porque a Android me da la sensación que 
siempre le gusta más que se hagan las cosas a su peculiar manera. ¿Tú también Android? joder, esto es la fiesta de los callbacks y el asincronísmo generalizado.</p>

<p>En este post veremos los hilos tradicionales utilizados desde un Activity de Android. Es una App
de android que genera nombres aleatorios. Para generar y visualizar los nombres utilizará dos clases
Thread:
<ol>
	<li><b>NameGenerator</b>: genera nombres para dar ideas a nombres de webs. Cada nombre lo guarda
	en una estructura BlockingQueue que comparte con la otra clase. Este hilo es totalmente ajeno a Android</li>
	<li><b>NameFetcher</b>: a través de la cola va recibiendo cada uno de los nombres generados y se encarga de notificárselo a la activity de Android</li>
</ol>
Este último punto es interesante. ¿Cómo podemos hacer que desde un hilo Java normal se actualice el interfaz del Activity? OJO: NO podemos pasar un view o la activity entera al Thread para que este meta mano: <code>
//08-12 19:54:46.882: E/AndroidRuntime(1372): android.view.ViewRoot$CalledFromWrongThreadException: Only the original thread that created a view hierarchy can touch its views.
</code> Android NO permite que se altere el interfaz más que desde la propia Activity. Así que establecemos
un mecanismo de comunicación (propio de android) a través de una instancia de la clase Handler. Esta nos
permite mandar mensajes del hilo al Activity y esta ya puede tocar lo que quiera y como en este caso, 
actualizar una ProgressBar que siempre queda muy aparentón.
</p>

<h5>NameGenerator</h5>
<p>Empezamos por el hilo feliz, ajeno al entorno que le rodea. Genera un número concreto 
de nombres y los va metiendo en una estructura compartida con un consumidor. Él sabrá para que 
lo quiere, esta clase es una machaca en modo mononeurona, hace su tarea y punto.</p>
<pre class="brush: java">
package info.pello.android.threads;

import java.util.Random;
import java.util.concurrent.BlockingQueue;

/**
 * NameGenerator
 * generates random names alternating vowels/consonants and sometimes
 * duplicating them. It makes use of a BlockingQueue to share names
 * with a consumer that will take care of notifying to our Android Activity.
 * @author Pello Xabier Altadill Izura
 * @greetz OOoooh I'm using threads and queues again oooo uuuu aaa
 *
 */
public class NameGenerator extends Thread {
	private int size = 2;
	private String [] vowels = {"a","e","i","o","u","y","ee","oo"}; 
	private String [] consonants = {"b","c","d","f","g","h","j","k","l",
									"m","n","p","q","r","s","t","v","w","x","y","z"};
	private String [][] alternate = {vowels,consonants};
	private int [] sizes = {vowels.length, consonants.length};
	
	private BlockingQueue<String> generatedNames;
	
	private int isVowel = 0;
	private Random random = new Random();
	private int total = 100;
	private static final int DUPLICATION_POSSIBILITY = 20;
	private static final int SLEEP_TIME = 2000;
	
	
	
	/**
	 * default constructor
	 * @param thread name
	 */
	public NameGenerator (String name) {
		super(name);
	}
	
	/**
	 * Constructor with size parameter
	 * @param size
	 */
	public NameGenerator (String name, int size, BlockingQueue<String> generatedNames, int total) {
		super(name);
		this.size = size;
		this.generatedNames = generatedNames;
		this.total  = total;
	}

	/**
	 * method executed when thread is started
	 */
	public void run () {
		String name = "";
		while (true) {
			if (total == 0) {
				System.err.println(this.getName() + " > Our work is done here. Bye!");
				return; 
			}
			name = generate();
			System.out.println("Generated name: " + name);
			try {
				generatedNames.put(name);
				total--;
				sleep(random.nextInt(SLEEP_TIME) + SLEEP_TIME);
			} catch (InterruptedException ie) {
				System.err.println("Exception in generation thread: " + ie.getMessage());
			}
		}
	}
	
	/**
	 * generates a name
	 * @return
	 */
	private String generate () {
		String result = "";
		int counter = 0;
		String lastChar = "";
		isVowel = counter = random.nextInt(2);
		
		for (int i = 0; i < this.size; i++) {
			lastChar = generateChar();
			lastChar = duplicateOrNot(lastChar);
			result += lastChar;
			
			// We prepare next round
			counter++;
			isVowel = counter % 2;
		}
		
		return result;
	}

	/**
	 * we generate a random char from vowels or consonants
	 * @return
	 */
	private String generateChar() {
		String lastChar;
		lastChar = alternate[isVowel][random.nextInt(sizes[isVowel])];
		return lastChar;
	}

	/**
	 * We apply 20% possibilities to duplicate vowel or consonant
	 * @param lastChar
	 * @return
	 */
	private String duplicateOrNot(String lastChar) {
		lastChar += (random.nextInt(100)< DUPLICATION_POSSIBILITY)?lastChar:"";
		return lastChar;
	}
	
	/**
	 * @return the size
	 */
	public int getSize() {
		return size;
	}

	/**
	 * @param size the size to set
	 */
	public void setSize(int size) {
		this.size = size;
	}

}

//... OOooo uuuuu aaaaa ... xDDDD
</pre>

<h5>NameFetcher</h5>
<p>Este es otro hilo que está pendiente de los nombres generados por NameGenerator. Los
va recibiendo a través de la cola y se encarga de notificárselo a la activity de android
a través de un mensaje por un Handler compartido. Se podría haber usado ese handler en el propio
generador, es cierto pero quería un generador desacoplado de android.</p>
<pre class="brush: java">
package info.pello.android.threads;

import java.util.Random;
import java.util.concurrent.BlockingQueue;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;


/**
 * NameFetcher shares a queue with a name producer.
 * When a new name is generated it send a message to Activity through a Handler
 * @author Pello Xabier Altadill Izura
 */
public class NameFetcher extends Thread {
	private BlockingQueue<String> generatedNames;	
	private static final int SLEEP_TIME = 2000;
	private Handler handler;
	private int total = 100;
	
	/**
	 * default constructor
	 * @param thread name
	 */
	public NameFetcher (String name) {
		super(name);
	}
	
	/**
	 * Constructor with size parameter
	 * @param size
	 */
	public NameFetcher (String name, BlockingQueue<String> generatedNames, int total) {
		super(name);
		this.generatedNames = generatedNames;
		this.total = total;
	}

	/**
	 * method executed when thread is started
	 */
	public void run () {
		String name = "";
		Message msg = null;
		Bundle bundle = null;
		
		while (true) {
			try {
				if (total == 0) {
					System.err.println(this.getName() + " > My work is done here. Bye!");
					return; 
				}
				name = generatedNames.take().toString();
				System.out.println("Fetching name: " + name);
				// We prepare message, and we send it.
				msg = new Message();
				bundle= new Bundle();
				bundle.putString("name",name);
				msg.setData(bundle);
				handler.sendMessage(msg);
				total--;
				sleep(SLEEP_TIME);
			} catch (InterruptedException ie) {
				System.err.println("Exception in generation thread: " + ie.getMessage());
			}
		}
	}


	/**
	 * we need to set this handler to send messages to
	 * Main app thread
	 * @param handler
	 */
	public void setHandler(Handler handler) {
		// TODO Auto-generated method stub
		this.handler = handler;
		
	}


	
}

</pre>

<h5>MainActivity</h5>
<p>Bueno, y aquí es donde ponemos todo a funcionar. Aparte de unos controles simples, la activity
instancia los hilos y los pone en marcha. Con el NameFetcher establece un puente de comunicación a través
del handler, que dispone de un callback para cada nuevo mensaje recibido. ahí es donde nuestra activity
actualizará los views: meterá el nuevo nombre en un TextView y incrementará el ProgressBar.</p>
<pre class="brush: java">
package info.pello.android.threads;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.app.Activity;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.SynchronousQueue;

/**
 * This activity uses java Threads to generate Random names.
 * To communicate with them it makes us of a Handler
 * @author Pello Xabier Altadill Izura
 * @greetz bizgen project
 */
public class MainActivity extends Activity {
	
	private TextView generatedResult;
	private NameGenerator nameGenerator;
	private NameFetcher nameFetcher;
    BlockingQueue<String> generatedNames = new SynchronousQueue<String>();
    private Handler handler;
    private static final int NAMES_TO_GENERATE = 10;
    ProgressBar progressBar;

	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		generatedResult = (TextView) findViewById(R.id.generatedResult);
		progressBar = (ProgressBar) findViewById(R.id.progressBarThreads);
		progressBar.setMax(NAMES_TO_GENERATE);
		
		// The handler used to communicate between Activity and a Thread
		handler =new Handler() {
	    				@Override
	    				public void handleMessage(Message msg) {
	    					Log.d("Received message from thread","PELLODEBUG");
	    					Bundle bundle;
	    					bundle = msg.getData();
	    					generatedResult.append(bundle.getString("name") + "\n");
	    					// We update progress bar:
	    					progressBar.incrementProgressBy(1);
	    				}
	    		};
	    		
		nameGenerator = new NameGenerator("Generator", 3, generatedNames,NAMES_TO_GENERATE);
		nameFetcher = new NameFetcher("Fetcher", generatedNames, NAMES_TO_GENERATE);
		// We set a handler to comunicate with android activity
		nameFetcher.setHandler(handler);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	/**
	 * invoked when button is pressed, this method start
	 * some java threads.
	 * NOTE: this thread will keep on working even if we click home
	 * or back buttons in the application
	 * @param v
	 */
	public void startThreads (View v) {
		progressBar.setProgress(0);
		Log.d("Starting threads","PELLODEBUG");
		// This thread generates names and puts them
		// in a queue
		nameGenerator.start();
		
		// This one will get freshly created names from
		// the queue
		nameFetcher.start();
	}
	
}

</pre>

<p>Aquí puedes ver un poco el aspecto que tiene la cosa en el emulador y en el DDMS</p>
<img src="http://www.pello.info/images/androidthreads.png" alt="Ejemplo de hilos en Android" title="Ejemplo de hilos en Android" />
