En C# tambiÃƒÂ©n se pueden crear interfaces como en Java, aunque el manejo de atributos se hace a travÃƒÂ©s de las properties y es algo engorroso. Veamos un ejemplo bÃƒÂ¡sico:
Definimos el interfaz bebida y una clase que lo implementa, el cafÃƒÂ©.
<pre>
/**
* Interfaces.cs
* Programa que muestra el uso de interfaces. Al igual que en Java los interfaces son 
* como clases abstractas pero sin implementaciÃƒÂ³n alguna. Su objetivo es servir como 
* plantilla a las clases que lo implementan (sus mÃƒÂ©todos y atributos).
* Los interfaces no tienen constructores ni destructores, y todo es pÃƒÂºblico.
*/

using System;

// Vamos a definir el interfaz Bebida
public interface Bebida
{
	// No podemos meter atributos sin mÃƒÂ¡s, 
	// Hay que usar properties.
	double precioLitro { get; set; }
	string color{ get; set; }
	string sabor{ get; set; }
	int azucar { get; set; }

	
	// Metemos algunos mÃƒÂ©todos, pero sin implementar.
	// Las clases que implementen este interfaz, deberÃƒÂ¡n
	// tener este mÃƒÂ©todo.
	void mostrar();
	bool esDulce();
	void echarAzucar(int cantidad);
}


// Vamos a usar una clase que implemente el interfaz bebida
public class Cafe : Bebida
{
	// DEfinimos estos atributos y accedemos
	// a ellos a travÃƒÂ©s de los properties
	private int azucarCafe;
	private string saborCafe;
	private string colorCafe;
	private double precioLitroCafe;
	
	// Implementamos las properties
	public double precioLitro 
	{ 
		get { return precioLitroCafe; }
		set { precioLitroCafe = value; }
	}
	public string color
	{ 
		get { return colorCafe; }
		set { colorCafe = value; }
	}
	public string sabor
	{ 
		get { return saborCafe; }
		set { saborCafe = value; }
	}
	public int azucar 
	{ 
		get { return azucarCafe; }
		set { azucarCafe = value; }
	}
	
	// MÃƒÂ©todo constructor
	public Cafe()
	{
		azucar = 0;
		precioLitro = 5.6;
	}
	
	// Implementaciones del interfaz //////////
	
	// mostrar info
	public void mostrar()
	{
		System.Console.WriteLine("Esto es un CafÃƒÂ©");
	}
	
	// Pregunta si la bebida es dulce
	public bool esDulce()
	{
		if (sabor == "dulce")
		{
			return true;
		} 
		else 
		{
			return false;
		}
	}
	
	// Echa azucar en el CafÃƒÂ©
	public void echarAzucar(int cantidad)
	{
		azucar += cantidad;
	}
	
	// MÃƒÂ©todo principal
	public static void Main ()
	{	
		Cafe cafeton = new Cafe();
		
		cafeton.sabor = "dulce";
		
		System.Console.WriteLine("Ya tenemos un cafe a {0:C#.##} /litro", cafeton.precioLitro);

		// Probamos a ver...
		if (cafeton.esDulce())
		{
			System.Console.WriteLine("Y estÃƒÂ¡ muy dulce");
		}
		
		
	}

}
</pre>

Y ahora un ejemplo de implementaciÃƒÂ³n de multiples interfaces: Bebida y Estimulante. Dicen que es una aproximaciÃƒÂ³n a la herencia multiple. Anda que...
<pre>
// Vamos a definir otro interfaz
public interface Estimulante
{
	// Properties
	double cafeina { get; set; }
	double teina { get; set; }
	double taurina { get; set; }
	double cachondina  { get; set; }
	
	// Metodos
	void mostrar();
	bool esMortal();
}

// Y ahora vamos a implementar este y otro interfaz
public class RezBull : Bebida, Estimulante
{
	private double RBCafeina;
	private double RBTeina;
	private double RBTaurina;
	private double RBCachondina;
	
	// Properties
	public double cafeina 
	{ 	
		get { return RBCafeina;  }
		set { RBCafeina = value; } 
	}

	public double teina 
	{ 	
		get { return RBTeina;  }
		set { RBTeina = value; } 
	}

	public double taurina 
		{ 	
		get { return RBTaurina;  }
		set { RBTaurina = value; } 
	}

	public double cachondina  
	{ 	
		get { return RBCachondina;  }
		set { RBCachondina = value; } 
	}
	
		// DEfinimos estos atributos y accedemos
	// a ellos a travÃƒÂ©s de los properties
	private int azucarCafe;
	private string saborCafe;
	private string colorCafe;
	private double precioLitroCafe;
	
	// Implementamos las properties
	public double precioLitro 
	{ 
		get { return precioLitroCafe; }
		set { precioLitroCafe = value; }
	}
	public string color
	{ 
		get { return colorCafe; }
		set { colorCafe = value; }
	}
	public string sabor
	{ 
		get { return saborCafe; }
		set { saborCafe = value; }
	}
	public int azucar 
	{ 
		get { return azucarCafe; }
		set { azucarCafe = value; }
	}
	
	// Constructor
	public RezBull ()
	{
		taurina = 66.6;
		teina = 0.0;
		cafeina = 453.98;
	}
	
	
	// Implementaciones del interfaz //////////
	// Pregunta si la bebida es dulce
	public bool esDulce()
	{
			return false;
	}
	
	// Echa azucar en el RezBull
	public void echarAzucar(int cantidad)
	{
		azucar += cantidad;
	}
	
	// Mostrar. Para distinguir entre los dos interfaces, ponemos el prefijo
	void Bebida.mostrar()
	{
		System.Console.WriteLine("Esta es una bebida inclasificable");
	}
		
	// Mostrar. Para distinguir entre los dos interfaces, ponemos el prefijo
	void Estimulante.mostrar()
	{
		System.Console.WriteLine("Esta bebida mata, o eso dicen");
	}	
	
	// Implementacion sencilla de esMortal
	bool Estimulante.esMortal()
	{
		return true;
	}
}
</pre>