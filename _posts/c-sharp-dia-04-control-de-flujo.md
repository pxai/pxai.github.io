Veamos las herramientas bÃƒÂ¡sicas para control de flujo, empezando por las condicionales.

<pre>
/** 
Condicionales.cs
 Una muestra de los Condicionales de c#
 Para compilar con MS: csc Condicionales.cs , ejecucion: Condicionales.exe
 Para compilar con Mono: mcs Condicionales.cs , ejecucion: mono Condicionales.exe
*/

// Importamos la libreria de utilidades bÃƒÂ¡sicas de sistema
using System;

// Definicion de la clase Condicionales, que muestra tipos de Condicionales.
public class Condicionales {

	// Y aquÃƒÂ­ la funciÃƒÂ³n principal 
	public static void Main () {
		
		// Variables
		char letraA, letraB;
		
		letraA = 'a';
		letraB = 'b';
		
		// Condicionales: IF simples
		if (letraA == 'a') 
		{
			System.Console.WriteLine("Es la letra A");
		}
		
		// Condicionales : IF - ELSE
		if (letraA == 'b')
		{
			System.Console.WriteLine("Es la letra B");
		}
		else
		{
			System.Console.WriteLine("NO es la letra A");
		}
		
		// Condicionales: IF - ELSE IF - ELSE
		if (letraA == 'b' && letraB == 'a')	
		{
			System.Console.WriteLine("letraA es b y letraB es a");
		}
		else if (letraA == 'b' || letraA == 'a')
		{
			System.Console.WriteLine("letraA es b o a");
		} 
		else 
		{
			System.Console.WriteLine("AquÃƒÂ­ no se cumple nada");
		}
	
		// SWITCH CASE: lo mismo de siempre
		switch (letraB) {
			case 'a' :
						System.Console.WriteLine("Es la A");
						break;
			case 'b' :
						System.Console.WriteLine("Es la B");
						break;
			case 'x' :
						System.Console.WriteLine("Es la X");
						break;
			case 'c' :
			case 'd' :
			case 'e' :
						System.Console.WriteLine("Puede ser mÃƒÂ¡s de uno");
						break;
						
			default  :	System.Console.WriteLine("No cumple ninguna");
						break;
		}
				

		System.Console.WriteLine("Estas son las opciones de Condicionales.");
		
	
	}

}
</pre>
Las iteraciones o bucles:
<pre>
/** 
Iteraciones.cs
 Una muestra de los Iteraciones de c#
 Para compilar con MS: csc Iteraciones.cs , ejecucion: Iteraciones.exe
 Para compilar con Mono: mcs Iteraciones.cs , ejecucion: mono Iteraciones.exe
*/

// Importamos la libreria de utilidades bÃƒÂ¡sicas de sistema
using System;

// Definicion de la clase Iteraciones, que muestra tipos de Iteraciones.
public class Iteraciones {

	// Y aquÃƒÂ­ la funciÃƒÂ³n principal 
	public static void Main () {
		
		// Variables
		int contador, i, j;
		
		contador = 0;
		
		// Iteraciones: WHILE, todo un clasico
		while (contador &lt; 10) 
		{
			System.Console.WriteLine("Estamos en el while");
			contador++;
		}

		// Iteraciones: DO WHILE, la que da una vuelta como minio
		do
		{
			System.Console.WriteLine("Estamos en el do-while {0}", contador);
			contador--;
		}
		while (contador &gt; 0);

				
		// Iteraciones : FOR
		for (i = 0; i &lt; 10; i++ )
		{
			System.Console.WriteLine("Iteracion for {0}",i);
		}
		
		// Iteraciones FOR con mas de un valor
		for (i=0, j=15; i &lt; j; i++, j--)
		{
			System.Console.WriteLine("Valores i={0} y j={1}",i, j);
		}
		
		// Dentro de las iteraciones podemos meter: break y continue
		// break: para salir de la iteracion
		// continue: para detener la ejecuciÃƒÂ³n de la iteracion actual y pasar a la siguiente.
		j = 0;
		while (j &lt; 15) 
		{
			
			System.Console.WriteLine("El valor de j es {0}", j);
			
			if (j == 5) 
			{
				break;
			}
			j++;
		}
		
		goto aqui;
		// GOTOs: pueden usarse gotos, pero lo cierto es que su abuso puede
		// producir que la depuraciÃƒÂ³n del cÃƒÂ³digo se dificulte mucho
		// Se usan etiquetas seguidas de 2 puntos
		// Y para llegar a ellas se pone goto etiqueta;
		
		aqui:
		
		
		System.Console.WriteLine("Estas son las opciones de Iteraciones.");
		
	
	}

}
</pre>