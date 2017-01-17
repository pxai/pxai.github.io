Vamos a conocer algunas clases ÃƒÂºtiles de C#, presentes en cualquier otro lenguaje.
Veamos el prÃƒÂ¡ctico temporizador con <b>Timer</b>
<pre>
/**
* Temporizador.cs
* Muestra el uso de la clase Timer para crear temporizadores.
* Se puede asociar un evento a un temporizador para que el programa
* reaccione al cabo de x tiempo.
* Info sobre el standar http://msdn.microsoft.com/net/ecma
*/

using System;
using System.Timers;


// Vamos a usar El timer a travÃƒÂ©s de nuestra clase temporizador
public class Temporizador
{
	private Timer miTimer;
	
	public Temporizador (int intervalo)
	{
		miTimer = new Timer();
		
		// Le asociamos un evento
		miTimer.Elapsed += new ElapsedEventHandler( EventoTemporizador );
		
		// Le asignamos un tiempo
		miTimer.Interval = intervalo;
		
		// Lo ponemos en marcha
		miTimer.Start();
	
	 }

	// Este serÃƒÂ¡ el evento que se ejecutarÃƒÂ¡ al pasar el tiempo
	public static void EventoTemporizador( object objeto, ElapsedEventArgs e )
	{
		System.Console.WriteLine("Salto el temporizador: Campaaana y se acabÃƒÂ³");
		//exit(0);
	}
	
	
	// MÃƒÂ©todo principal
	public static void Main ()
	{
		// Un  temporizador que salte cada 3 segundos...
		Temporizador temporizador = new Temporizador(3000);
		System.Console.WriteLine("Que paasa");
		
		// Creamos un bucle infinito y a ver que ocurre
		for(;;);
			// Pues aquÃƒÂ­, a verlas venir...

	}
}
</pre>
Vamos a ver algunas funciones matemÃƒÂ¡ticas con <b>Math</b>
<pre>
/**
* Mates.cs
* Muestra el uso de la clase Math, para las operaciones matemÃƒÂ¡ticas habituales
*/

using System;
using System.Timers;


// La clase Mates
public class Mates
{
	
	// MÃƒÂ©todo principal
	public static void Main ()
	{
		double valor = 0.0;
		
		// Vamos a coger un nÃƒÂºmero con comas y a jugar con ÃƒÂ©l
		System.Console.WriteLine("Anda resalao mete un numero con comillas");	
		string entrada = System.Console.ReadLine();
		
		try  // Trata de convertirlo Carlos!!
		{
			valor = Convert.ToDouble(entrada);
			
			// Vamos a probar el redondeo, su techo y su suelo
			System.Console.WriteLine("Redondeo con Round produce {0}", Math.Round(valor));
			System.Console.WriteLine("Redondeo con Floor produce {0}", Math.Floor(valor));
			System.Console.WriteLine("Redondeo con Ceiling produce {0}", Math.Ceiling(valor));
			System.Console.WriteLine("Su absoluto {0}", Math.Abs(valor));
			
			// Otras funciones: Log, Max, Min, Pow, Cos, Sin, Tan..
			
			System.Console.WriteLine("Constantes universales {0} y {1}", Math.PI, Math.E);
			
		} catch (Exception)
		{
			System.Console.WriteLine("Es probable que no metieras un nÃƒÂºmero vÃƒÂ¡lida. Adios.");
		}

		// Si buscas nÃƒÂºmeros aleatorios usa Random, no Math
		Random aleatorio = new Random();
		System.Console.WriteLine("A ver un aleatorio: {0}", aleatorio.Next());

	}
}
</pre>
Vamos a ver como manejar el entorno con <b>Environment</b>
<pre>
/**
* Entorno.cs
* Muestra el uso de la clase Enviroment que nos da informaciÃƒÂ³n sobre el
* entorno en que se ejecuta el programa. Siendo c# multiplataforma, puede
* ser una clase de gran interÃƒÂ©s
*/

using System;



// Vamos a conocer el entonno...
public class Entorno
{
	
	// MÃƒÂ©todo principal
	public static void Main ()
	{
		int i = 0;
		
		// Vamos a ver..
		System.Console.WriteLine("Vamos a ver que se cuece en el sistema");

		string maquina = "";
		string quienSoy = "";
		string dondeEstoy = "";
		
		// Sacamos los datos de mÃƒÂ¡quina ///////////////////////////////
		maquina += "Sistema operativo: " + Environment.OSVersion + "
";		
		maquina += "VersiÃƒÂ³n: " + Environment.Version + "
";		
		maquina += "Hostname: " + Environment.MachineName + "
";		
		maquina += "RAM: " + Environment.WorkingSet + "
";		

		System.Console.WriteLine("{0}
",maquina);
		
		// Sacamos nuestro nombre de programa y argumentos //////////////
		quienSoy += "Comando ejecutado: " + Environment.CommandLine + "
";
		// Argumentos usados
		string [] argumentos = Environment.GetCommandLineArgs();
		// Mostramos todos, el primero sera el propio programa
		for (i = 0; i < argumentos.Length; i++)
		{
			quienSoy += String.Format("Arg[{0}]: {1}", i, argumentos[i]) + "
";
		}
		
		System.Console.WriteLine("{0}
", quienSoy);
		
		// Sacamos nuestra posicion y las unidades de disco //////////////
	    dondeEstoy += "Directorio actual: " + Environment.CurrentDirectory + "
";		
	    dondeEstoy += "Directorio de sistema: " + Environment.SystemDirectory + "
Unidades:
";
		
		// Sacamos unidades
		string [] unidades = Environment.GetLogicalDrives();
		// Mostramos todos, el primero sera el propio programa
		for (i = 0; i < unidades.Length; i++)
		{
			dondeEstoy += String.Format("Unidad[{0}]: {1}", i, unidades[i]) + "
";
		}
		
		System.Console.WriteLine("{0}
", dondeEstoy);
		
		// Variables de entorno, por ejemplo la mitica PATH, basta con ejecutar
		// el comando set en DOS para sacar las variables
		Console.WriteLine("
Path: {0}", Environment.GetEnvironmentVariable("Path"));
		Console.WriteLine("
Usuario: {0}", Environment.GetEnvironmentVariable("Username"));
		
	}
}
</pre>
Vamos a ver como manejar los ficheros con <b>System.IO</b>
<pre>
/**
* Ficheros.cs
* Muestra el acceso a ficheros: sacar sus datos, leer y escribir en ellos
*/

using System;
using System.IO; // HabrÃƒÂ¡ que importar esta claro..


// Clase Ficheros para manipular archivos
public class Ficheros
{
	private string fichero;

	public Ficheros (string nombre)
	{
		fichero = nombre;
	}
	
	// MÃƒÂ©todo para sacar las propiedades de un fichero
	// devuelve true si el fichero existe
	public bool propiedades()
	{
		string prop = "";
		FileInfo info;
		
		try
		{
			info = new FileInfo(fichero);
			
			// Comprobamos si el fichero existe, es lo suyo
			if (info.Exists)
			{
				prop += "Nombre: " + info.Name +"
";
				prop += "TamaÃƒÂ±a: " + info.Length +"
";
				prop += "Fecha CreaciÃƒÂ³n: " + info.CreationTime +"
";
				prop += "ÃƒÅ¡ltimo acceso: " + info.LastAccessTime +"
";
				prop += "ÃƒÅ¡ltima escritura: " + info.LastWriteTime +"
";

				System.Console.WriteLine("PROPIEDADES:
{0}
", prop);
			}	
		}
		catch (Exception e)
		// Otra excepciÃƒÂ³n podrÃƒÂ­a ser System.IO.FileNotFoundException
		{
			System.Console.WriteLine("OcurriÃƒÂ³ una excepciÃƒÂ³n: {0}", e);
			return false;
		}
		
		return true;
	}
	
	// MÃƒÂ©todo para leer de un fichero
	public void leer()
	{
		// Definimos un StreamReader
		StreamReader lector;
		string linea = "";
		
		try
		{
			lector = File.OpenText(fichero);	
			
			// Lee linea a linea
			while ( (linea = lector.ReadLine()) != null)
			{
				System.Console.WriteLine("{0}", linea);
			}
			
			// Cerramos la conexion
			lector.Close();
			
		}
		catch (Exception e)
		{
			System.Console.WriteLine("OcurriÃƒÂ³ una excepciÃƒÂ³n: {0}", e);
		}
		
	}

	// MÃƒÂ©todo para escribir un fichero, al final de ÃƒÂ©l
	// Para escribir desde el inicio, usa WriteText
	public void escribir()
	{
		// Un objeto para
		StreamWriter escribe;
		string linea = "";
		
		try
		{
			escribe = File.AppendText(fichero);
			// podria ser CreateText para crear uno nuevo
			// o tambiÃƒÂ©n WriteText para machacar el texto
			
			while (linea != "##")
			{
				System.Console.WriteLine("Mete algo en el fichero, ## para terminar ");
				linea = System.Console.ReadLine();
				escribe.WriteLine(linea);
			}		
			
			// Cerramos
			escribe.Close();
				
		}
		catch (Exception e)
		{
			System.Console.WriteLine("OcurriÃƒÂ³ una excepciÃƒÂ³n: {0}", e);
		}
	}
		
	// MÃƒÂ©todo principal
	public static void Main (string[] args)
	{
		// Vamos a requerir un parÃƒÂ¡metro
		if (args.Length != 1)
		{
			System.Console.WriteLine("Pasame un nombre de fichero como parametro");
			return;
		}
		
		// Un  temporizador que salte cada 3 segundos...
		Ficheros miFichero = new Ficheros(args[0]);
		
		if (miFichero.propiedades())
		{
			miFichero.leer();
			
			// Y vamos a escribir
			miFichero.escribir();
			
			// A ver como ha quedado
			miFichero.leer();
			
			// Y las propiedades
			miFichero.propiedades();
		}

	}
}
</pre>