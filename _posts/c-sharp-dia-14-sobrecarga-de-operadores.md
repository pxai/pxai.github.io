Al igual que en C++ tambiÃƒÂ©n podemos sobrecargar operadores en C#. Desde los aritmeticos binarios (+, -, *,..), comparativos, unarios(++), hasta Equals.
Este ejemplo no muy ÃƒÂºtil muestra un poco la forma de sobrecargar operadores, no tiene mucho misterio pero hay que fijarse bien en los parÃƒÂ¡metros y returns para cada caso.
<pre>
/**
* SobrecargaOperadores.cs
* Este archivo muestra como sobrecargar operadores 
* en concreto los binarios simples: +,-,*,/.%, etc..
*/

using System;

// Definimos una clase tiempo
// y una serie de operadores para sumar minutos, segundos, etc..
public class Tiempo
{

	// Atributo de milisegundos
	private long milisegundos;
		
	// Property para acceder a ÃƒÂ©l
	public long momento 
	{
		get { return milisegundos;  }
		set { milisegundos = value; }
	}

	// Constructor
	public Tiempo ()
	{	
		DateTime t = DateTime.Now;
		momento = t.Millisecond;
	}
	
	// Constructor sobrecargado
	public Tiempo (long milisegundos)
	{
		momento = milisegundos;
	}

	// SOBREGARCA DE OPERADORES
	
	// Sobrecarga de +
	static public Tiempo operator + (Tiempo t, long val)
	{
		// Y devolvemos el objeto tiempo
		Tiempo tiempoTmp = new Tiempo(t.momento);
		tiempoTmp.momento = t.momento + val;
		return tiempoTmp;
	}

	// Sobrecarga de -
	static public Tiempo operator - (Tiempo t, long val)
	{
			
		// Y devolvemos el objeto tiempo
		Tiempo tiempoTmp = new Tiempo(t.momento);
		tiempoTmp.momento = t.momento - val;
		return tiempoTmp;
	}

	// Sobrecarga de operadores unarios: ++, --
	static public Tiempo operator ++ (Tiempo t)
	{
		System.Console.WriteLine("Estamos incrementando...");
		
		Tiempo tiempoTmp = new Tiempo();
		tiempoTmp.momento = t.momento + 1;
		return tiempoTmp;
	}

	static public Tiempo operator -- (Tiempo t)
	{
		Tiempo tiempoTmp = new Tiempo();
		tiempoTmp.momento = t.momento - 1;
		return tiempoTmp;
	}
	
	// Operadores de COMPARACION: devuelve un booleano
	static public bool operator < (Tiempo primer, Tiempo segundo)
	{
		return (primer.momento < segundo.momento);
	}			

	// Operadores de COMPARACION: devuelve un booleano
	static public bool operator > (Tiempo primer, Tiempo segundo)
	{
		return (primer.momento > segundo.momento);
	}			
	
	// Sobrecargando Equals. este debe decidir si los dos objetos
	// son efectivamente iguales. Por tanto hay que comparar atributo
	// por atributo, en este caso serÃƒÂ¡ fÃƒÂ¡cil, casi equivalente a ==
	public override bool Equals (Object objeto)
	{
		return ( ((Tiempo)objeto).momento == this.momento);		
	}
	
	// Sobrecarga GetHashCode
	public override int GetHashCode ()
	{
		return this.ToString().GetHashCode();
	}
	
	// MÃƒÂ©todo principal
	public static void Main()
	{
		
		Tiempo hoy = new Tiempo();
		Tiempo otroDia = new Tiempo(5434454323);
	
		System.Console.WriteLine("Valor de hoy {0}", hoy.momento);
		System.Console.WriteLine("Valor de otroDia {0}", otroDia.momento);
		
		// Probamos algunos operadores	
		hoy++;
		otroDia = hoy + 24;
		
		if (hoy < otroDia)
		{
			System.Console.WriteLine("Otrodia {0} es mayor que hoy {1}", otroDia.momento, hoy.momento);
		} else {
			System.Console.WriteLine("Otrodia {0} es menor que hoy {1}", otroDia.momento, hoy.momento);
		}
		
	}
}
</pre>