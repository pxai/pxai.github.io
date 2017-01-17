<p>En Android no solamente hay aplicaciones de ventanas o activities. Hay muchos otros tipos de elementos como por ejemplo los Services. Los servicios nos permiten dejar un programa residente en la memoria y disponible para cualquiera que lo necesite. Los servicios no tienen interfaz gráfico ni nada, son programas pensados para ser utilizados desde las Activities o incluso desde otros servicios. Un service puede crearse para dar servicio -privado- a una sola aplicación o puede hacerse público (a través del manifest) para que cualquiera pueda usarlo.
Al igual que las activities los services tienen su propio ciclo de vida. Pero cuidado, no hay que dar por sentado que a un servicio se le pueda mandar cualquier cosa.
</p>

<h5>Un Service NO es un hilo aparte</h5>
<p>Cuando una activity use un Service, el servicio <b>¡¡usará el mismo hilo que la activity!!</b>. Mucho ojo con lo que se hace en un Service ya que si se demora en su tarea acabaremos teniendo el temido/odiado ANR (Application Not Responding). Desde Android de hecho nos recomiendan usar Threads si vamos a llevar a cabo alguna tarea larga o de duración indefinida como puede ser un acceso a la red.
</p>

<p>Otra opción es crear un servicio extendiendo IntentService en lugar de Service; implementamos el método
<i>onHandleIntent()</i> y ya tenemos un Servicio con un hilo aparte. Este tipo de Service es el que se recomienda para servicios que acceden a la red. Eso sí, así como el Service normal puede atender peticiones simultáneas, el IntentService las atenderá de una en una.
</p>

<h5>Inicio y configuración</h5>
<p>¿Cómo creo y pongo en marcha un Service? Me he desesperado porque no he visto que nadie lo dijera claro, todo se deja caer o se comenta como de pasada, incluso en el <a href="http://developer.android.com/guide/components/services.html">manual oficial</a>: <i>"Another application component can start a service and it will continue to run in the background even if the user switches to another application"</i>. Qué sutileza... A ver. ¿Tanto costaba decir esto? <b>Para poner en marcha un servicio crea un proyecto NORMAL, con un Activity NORMAL y ese activity DEBE poner en marcha el Service</b> con un startService(). Una vez puesto en marcha, aunque la Activity se destruya, el Service ya se queda permanente a no ser que Android ando escaso de memoria y se lo cepille. ¿Puede un Service iniciarse solo desde un APK en el que solo existe él? NO. Ya, a mí tampoco me gusta. NO se puede a día de hoy.</p>

<p>Otra cosa imprescindible: en el Manifest de ese proyecto NORMAL incluye una referencia al Service, igual que se hace con cada una de las a activities de la aplicación. Si no quieres meter la para y prefieres que un asistente te haga el trabajo sucio, desde Eclipse puedes hacer <b>New ...> Other ...> Android > Android Object > y al final tienes Service</b>. Te crea la clase y la referencia en el Manifest. A través del diálogo de Android Object es donde puedes crear toda la plétora de cosas no tan frecuentes an Android: fragments, broadcast receivers, intentservices... Es recomendable porque si haces esas cosas a mano siempre te dejarás algo sin configurar en el proyecto y esos asistentes al menos te lo dan atado.
</p>

<img src="http://www.pello.info/images/androidobjects.png" title="Creando objectos Android en Eclipse" alt="Creando objectos Android en Eclipse" />

<h5>PasswordService</h5>
<p>Bueno, vamos a ver un ejemplo de Service. He sobreescrito todos los métodos simplemente por glosarlos
un poco y añadirles un log para poder ver qué hace Android con el servicio. A través del Intent de llamada es donde recoge una instancia de Messenger con el que el servicio puede notificar a su cliente.</p>
<pre class="brush: java">
package info.pello.android.service.password;


import java.util.Random;

import android.app.Service;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.util.Log;

/**
 * Creates an Android Service to generate random password
 * I've override all the methods just to see how Android calls them
 * @author Pello Xabier Altadill Izura
 * @greetz Web Workers like u
 */
public class PasswordService extends Service {

	// Needed to pass messages to caller
	private Messenger messenger = null;
	private Random random = new Random();
	
	/**
	 *  default constructor
	 */
	
	public PasswordService() {
	}

	/**
	 * Called when the service is first called.
	 */
	@Override
	public void onCreate() {
		// TODO Auto-generated method stub
		super.onCreate();
		Logger.getInstance().log("onCreate method was called");

	}

	/**
	 * this method will be called
	 * each time the service receives a command through startService call 
	 */
	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		int passwordLenght = 8;
		Logger.getInstance().log("onStartCommand method was called");
		
		// Getting messenger to notify
		getMessenger(intent);
		sendMessage("note","Starting service...");
		
		// We get the length requested by client or give default value
		passwordLenght = intent.getIntExtra("passwordLength", passwordLenght);
		String result = generatePassword(passwordLenght);
		
		sendMessage("result", result);

		Logger.getInstance().log("OK, result sent: " + result);
		
		// TODO Auto-generated method stub
		return super.onStartCommand(intent, flags, startId);
	}

	/**
	 * can you guess what this is? ;)
	 * @param length
	 * @return
	 */
	private String generatePassword(int length) {
		String password = "";
		String [] chars = { ".",",",";",":","?","!","-","_",
							"0","1","2","3","4","5","6","7","8","9", 
							"a","e","i","o","u","b","c","d","f","g","h","j","k","l",
							"m","n","p","q","r","s","t","v","w","x","y","z"};
		
		for (int i = 0; i < length;i++) {
			if (random.nextInt(2) == 0 ) 
				password += chars[random.nextInt(chars.length)];
			else
				password += chars[random.nextInt(chars.length)].toUpperCase();
		}
		
		return password;
	}

	/**
	 * sends message to client through the Messenger
	 * @param key
	 * @param msg
	 */
	private void sendMessage(String key, String msg) {
		Message message = new Message();
		Bundle bundle = new Bundle();
		bundle.putString(key, msg);
		message.setData(bundle);
		try {
			messenger.send(message);
		} catch (Exception e) {
			Log.d("Error sending message","PELLODEBUG");
		}
		
	}

	/**
	 * get Messenger from calling intent 
	 * @param intent
	 */
	private void getMessenger(Intent intent) {
		Bundle extras = intent.getExtras();
		if (null != extras) {
			 messenger=(Messenger)extras.get("PasswordServiceMessenger");
		} 
	}

	/**
	 * services somehow are exposing an API. Other Activities or sources
	 * can call bindService() with an intent to bind with this service in order to access that API,
	 * When the service is binded it must return an IBinder instance to communicate
	 * with the client of the service
	 */
	@Override
	public IBinder onBind(Intent intent) {
		Logger.getInstance().log("onBind method was called");
		// TODO: Return the communication channel to the service.
		return null;
		
	}

	/**
	 * called when service configuration is changed
	 */
	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		// TODO Auto-generated method stub
		super.onConfigurationChanged(newConfig);
		Logger.getInstance().log("onConfigurationChanged method was called");

	}

	/**
	 * called when Android destroys the service
	 */
	@Override
	public void onDestroy() {
		// TODO Auto-generated method stub
		super.onDestroy();
		Logger.getInstance().log("onDestroy method was called");

	}

	/**
	 * In cases of low memory Android could do something with the service
	 */
	@Override
	public void onLowMemory() {
		// TODO Auto-generated method stub
		super.onLowMemory();
		Logger.getInstance().log("onLowMemory method was called");

	}

	/* (non-Javadoc)
	 * @see android.app.Service#onRebind(android.content.Intent)
	 */
	@Override
	public void onRebind(Intent intent) {
		// TODO Auto-generated method stub
		super.onRebind(intent);
		Logger.getInstance().log("onRebind method was called");

	}

	/* 
	 * onStart is deprecated, use onStartCommand instead
	 * */
	/*@Override
	public void onStart(Intent intent, int startId) {
		// TODO Auto-generated method stub
		super.onStart(intent, startId);
		Logger.getInstance().log("onStart deprecated method was called");
	}*/


	/* (non-Javadoc)
	 * @see android.app.Service#onTaskRemoved(android.content.Intent)
	 */
	@Override
	public void onTaskRemoved(Intent rootIntent) {
		// TODO Auto-generated method stub
		super.onTaskRemoved(rootIntent);
		Logger.getInstance().log("onTaskRemoved method was called");

	}

	/* (non-Javadoc)
	 * @see android.app.Service#onTrimMemory(int)
	 */
	@Override
	public void onTrimMemory(int level) {
		// TODO Auto-generated method stub
		super.onTrimMemory(level);
		Logger.getInstance().log("onTrimMemory method was called");
	}

	/* (non-Javadoc)
	 * @see android.app.Service#onUnbind(android.content.Intent)
	 */
	@Override
	public boolean onUnbind(Intent intent) {
		Logger.getInstance().log("onUnbind method was called");
		// TODO Auto-generated method stub
		return super.onUnbind(intent);
	}
	
}

</pre>

<h5>El MainActivity que lo inicia todo</h5>
<p>Pues sí, debemos crear un proyecto normal, con un Activity normal que se debe ejecutar por defecto
y ese activity debe iniciar el servicio. Si no queremos que se vea, pues hombre, se puede hacer un destroy para que desaparezca una vez iniciado el servicio.</p>
<pre class="brush: java">
package info.pello.android.service.password;

import android.os.Bundle;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.Menu;

/**
 * MainActivity needed to start the service.
 * @author Pello Xabier Altadill Izura 
 * @greetz cuatrovientos
 */
public class MainActivity extends Activity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		Log.d("Password Activity started...","PELLODEBUG");
		// To make the service available we need to start it
		// from an Activity
		Intent serviceIntent = new Intent(this,PasswordService.class);
		startService(serviceIntent);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}

</pre>

<p>El Manifest del proyecto</p>
<pre class="brush: xml">
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="info.pello.android.service.password"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-sdk
        android:minSdkVersion="8"
        android:targetSdkVersion="17" />

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name="info.pello.android.service.password.MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <service
            android:name="info.pello.android.service.password.PasswordService"
            android:enabled="true"
            android:exported="true" >
        </service>
    </application>

</manifest>

</pre>

<h5>Un cliente del servicio</h5>
<p>Este sería una aplicación ajena/distinta/remota, que no tiene que ver con nuestro service y que sin embargo lo va a utilizar. ¿Ese es un escenario normal no? Pues pocos ejemplos había. Para eso utiliza un Intent pasándole el nombre de paquete y de clase. Supongo que se puede hacer con algún filtro y usar simplemente un nombre, pero de momento esto es lo que ha funcionado sin problemas. Para la comunicación se usa un Messenger con un Handler, como se hacía en los hilos.</p>
<pre class="brush: java">
package info.pello.android.serviceclient;

import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.os.Messenger;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.TextView;

/**
 * Sample Android -remote- Service Client. The service is not part of this App.
 * Uses Messenger/Handler to communicate.
 * @author Pello Xabier Altadill Izura
 * @greetz Txapela
 */
public class MainActivity extends Activity {

	private Handler handler;
	private TextView textViewResult;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		textViewResult = (TextView) findViewById(R.id.textViewResult);
		
		Log.d("Client Started. ","PELLODEBUG");
		
		// The handler used to communicate between Activity and the service
		handler =new Handler() {
	    				@Override
	    				public void handleMessage(Message msg) {
	    					Log.d("Received message from Service","PELLODEBUG");
	    					Bundle bundle;
	    					bundle = msg.getData();
	    					Log.d("Received Message: " + bundle.getString("result"),"PELLODEBUG");
	    					textViewResult.setText("Generated password: \n"+bundle.getString("result"));

	    				}
	    		};
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}
	
	/*
	 * called when button is pressed. We use a Service
	 * using startService
	 * @param view
	 */
	public void startService (View v) {
		Log.d("Starting service fuck yeah ","PELLODEBUG");
		//Intent serviceIntent = new Intent("info.pello.android.services.START_SERVICE");
		Intent serviceIntent = new Intent();
		
		// We set the messenger to let the service notify us.
		serviceIntent.putExtra("PasswordServiceMessenger", new Messenger(handler));
		// And by the way the password length
		serviceIntent.putExtra("passwordLength",8);
		
		// We get the service through package and class name.
		serviceIntent.setClassName("info.pello.android.service.password", "info.pello.android.service.password.PasswordService");
		startService(serviceIntent);
		Log.d("Client> Service was started. ","PELLODEBUG");
	}

	/**
	 * called when second buttons is pressed. We try to bind
	 * to a service.
	 * @param view
	 */
	public void startServiceBind (View v) {
		Log.d("Binding to service. ","PELLODEBUG");

		Intent serviceIntent = new Intent();
		serviceIntent.setAction("info.pello.android.service.RssService.START_SERVICE");
		//bindService(serviceIntent);
		Log.d("Client> Service was started. ","PELLODEBUG");
		
	}

}

</pre>

<p>¿Y es necesario poner una referencia al service en el Manifest de ese proyecto aparte/ajeno/externo que usa ese Service? ¡NO! Lamento no explicar con todo lujo de detalles todo lo que se puede hacer, pero 
para eso hay ejemplos más completos, libros a patadas y por supuesto la guía oficial. Pero a veces  se les olvida poner claros tres detalles clave que nos ahorrarían dar palos de ciego. Otro día el Binding y un ejemplo de IntentService</p>
