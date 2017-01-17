Quien no tiene <b>mono</b> de C# ? xD<br>
El ejemplo minimo de c# sobre un linux, en concreto un redhat 9.<br>
Choca un poco encontrarse con un exe en tu sistema linux, en fin<br>
aqui se muestra el ejemplo basico, la compilacion y ejecucion

<pre>
/**
* Fichero HolaNena.cs
* compilacion: mcs HolaNena.cs
* Ejecucion: mono HolaNena.exe
*/

// importamos la libreria basica de sistema
using System;

// Definimos la clase Saludo
class Saludo
{
   // Funcion Main
   static void Main() {

      // WriteLine escribe por salida estandar un string y le pone newline
      Console.WriteLine("Hola, nena");

   }

}

</pre>

Creditos:<br>
mono --version: Mono JIT compiler version 1.0.6, <br>
mcs --version: Mono C# compiler version 1.0.6.0