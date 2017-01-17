Hoy vamos a ver unos objetos y mÃƒÂ©todos algo especiales. Todo esta explicado en el cÃƒÂ³digo.
Por un lado, los indexadores
<pre>
/**
* Indexadores.cs
* Los indexadores sirven para acceder a un array que puede haber dentro
* de la clase de forma directa. Supongamos que tenemos un atributo que es un
* array de nombres: protected string[] nombres;
* Con el indexador o indexer accederiamos a ese array asÃƒÂ­:
*   MiClase clase = new MiClase();
*   clase[0] = "Nuevo valor";
* Y para eso hay que definir un indexer.
*/

// Vamos a definir un equipo de fÃƒÂºtbol
public class Equipo
{
	// Definimos un atributo que contiene los jugadores del equipo
	private string[] jugadores = new string[5];
	// Un atributo para guardar el nombre del equipo
	private string nombreEquipo;
	
	// Constructor
	public Equipo(string nombre)
	{
		nombreEquipo = nombre;
	}
	
	// mÃƒÂ©todo que devuelve tamaÃƒÂ±o
	public int getSize()
	{
		return jugadores.Length;	
	}
	
	// Indexador
	public string this[int indice]
	{
		get // Mediante el get podemos sacar un valor del array de jugadores
		{
			string temp;
			// Comprobamos indices no nos vayamos a salir
			if( indice >= 0 && indice <= 4 )
			{
 				temp = jugadores[indice];
			}
 			else
 			{
 				temp = "";
			}
			return temp;
		}
		
	  set // Mediante el set podemos establecer un valor en el array de jugadores
 	  {
	 	  // Comprobamos los lÃƒÂ­mites
		  if( indice >= 0 && indice <= 4 )
		  {
			jugadores[indice] = value;
	  	  }
	  }
	}
	
	// MÃƒÂ©todo principal
	public static void Main ()
	{
		// Vamos a crear un gran equipo
		Equipo osasuna = new Equipo("C.A. Osasuna");
		
		// Y ahora ya podemos establecer los nombre
		// de jugadores de forma directa
		osasuna[0] = "Ricardo";
		osasuna[1] = "Krutxi";
		osasuna[2] = "Josetxo";
		osasuna[3] = "IÃƒÂ±aki MuÃƒÂ±oz";
		osasuna[4] = "RaÃƒÂºl GarcÃƒÂ­a";
		
		// Y ahora ya podemos recorrer el array
		for(int i = 0; i < osasuna.getSize(); i++)
		{
			System.Console.WriteLine("Jugador {0}", osasuna[i]);
		}
	}
	
}
</pre>
Por otro los mÃƒÂ©todos delegados, similares a los de las interfaces
<pre>
/**
* Delegados.cs
* Los mÃƒÂ©todos delegados son similares a los interfaces: definen
* una forma de mÃƒÂ©todo (con su nombre, su return y sus parÃƒÂ¡metros)
* pero sin implementaciÃƒÂ³n.
*/

using System;

// Definimos la clase Aritmetica
// que sirve para hacer operaciones simples
public class Aritmetica
{
	
	// AquÃƒÂ­ definimos el mÃƒÂ©todo delegado
	// Que deberÃƒÂ¡n implementar otras clases
	public delegate int Operacion(int a, int b);
	
	// Fijate en el parÃƒÂ¡metro
	public int HacerOperacion (Operacion op, int x, int y)
	{
		return (op(x, y));
	}
}

public class UsarAritmetica
{
	// Un mÃƒÂ©todo que implementa OperaciÃƒÂ³n
	public static int OperacionSumar(int a, int b)
	{
		return (a+b);	
	}

	// Un mÃƒÂ©todo que implementa OperaciÃƒÂ³n
	public static int OperacionRestar(int a, int b)
	{
		return (a-b);	
	}

	// MÃƒÂ©todo principal
	public static void Main()
	{
		// ATENCION. Se crea una instancia del MÃƒâ€°TODO DELEGADO
		Aritmetica.Operacion sumar = new Aritmetica.Operacion(OperacionSumar);
		Aritmetica.Operacion restar = new Aritmetica.Operacion(OperacionRestar);
		
		// Y ahora creamos una instancia de la clase que contiene el delegado
		Aritmetica aritmetica = new Aritmetica();
		
		// Y ahora usamos los mÃƒÂ©todos delegados
		int resultado = aritmetica.HacerOperacion(sumar, 665, 1);
		
		System.Console.WriteLine("Que fuerte, ha salido {0}", resultado);
		
		System.Console.WriteLine("Y ahora {0}",  aritmetica.HacerOperacion(restar, 700, 34));

	}
	
}
</pre>
Vamos a ver, como implementar nuestros propios eventos. Es algo complejo, y hay que ir paso a paso
<pre>
/**
* Eventos.cs
* Programas que muestran la definiciÃƒÂ³n y uso de Eventos.
* Los eventos som situaciones en la ejecuciÃƒÂ³n de un programa
* que pueden ser controlados para cambiar el comportamiento del mismo.
* El ejemplo mÃƒÂ¡s claro es el entorno de ventanas: el evento de pinchar en un botÃƒÂ³n
* puede provocar el cierre de una ventana.
*/

using System;

// En esta caso vamos a crear un evento para controlar que el usuario
// ha escrito la palabra viagra en la consola. El evento se va a disparar
// cuando se asigne lo que se ha metido por pantalla a una variable: en ese
// momento se comprobarÃƒÂ¡ si esa palabra es "viagra" y de ser asÃƒÂ­, avisarÃƒÂ¡

// Definimos el mÃƒÂ©todo delegado 
// Los parametros son:
// 1. un objeto: el que genera el evento
// 2. argumento del evento: una clase especifica para ese evento
public delegate void capturaPalabraSpam(Object objeto, ArgumentoEvento e);

// Definimos una clase para los argumentos del evento
// que DEBE heredar de la clase: EventArgs
public class ArgumentoEvento : EventArgs
{
	public string palabra;
	
	// Constructor
	public ArgumentoEvento(string palabra)
	{
		this.palabra = palabra;
	}
}

// Ahora una clase para comprobar el evento
public class CompruebaSpam
{
	string palabraspam;
	public event capturaPalabraSpam EventoSpam;
	
	// Atencion cuando hagamos el set (la asignaciÃƒÂ³n) se dispararÃƒÂ¡ el evento!
	public string PalabraSpam
	{
		get { return palabraspam; }
		set
		{
			if ( EventoSpam != null)
			{
				ArgumentoEvento argumentos = new ArgumentoEvento(value);
				EventoSpam(this, argumentos);
				palabraspam = argumentos.palabra;
			}
		}
	}
}

public class PruebaEvento
{
	// Handler: IMPLEMENTACION DEL MÃƒâ€°TODO DELEGADO
	// Definimos el handler para el evento
	static void detectaSpam(Object source, ArgumentoEvento e )
	{
		if (e.palabra.ToLower() == "viagra")
		{
			System.Console.WriteLine("SPAM!!");
			System.Console.WriteLine("Detectada palabra basura {0}",e.palabra);
		}
	}

	// MÃƒÂ©todo principal
	public static void Main ()
	{
		
		// creamos una instancia del comprobador
		CompruebaSpam comprueba = new CompruebaSpam();
		
		// Le asignamos el handler de eventos que hemos implementado
		comprueba.EventoSpam += new capturaPalabraSpam(detectaSpam);
		
		System.Console.WriteLine("Vamos a ver si generamos un evento");
		System.Console.WriteLine("Escribe algo, distinto de viagra, o no.");
		
		comprueba.PalabraSpam = System.Console.ReadLine();
		
	}
	
}
</pre>