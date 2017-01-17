Acceso a BBDD con ADO.NET. Para ejemplos simples se puede usar un ficherillo de access o una conexiÃƒÂ³n odbc cualquiera.
La cosa no cambia mucho; 
<pre>
/**
* AccesoBD.cs
* Clase para probar el acceso a BD desde C#
* Se usa el ADO.NET
* En este caso se prueba una select, pero las otras sentencias
* se ejecutan del mismo modo, aunque sin guardar resultado en un DataReader claro.
*/

using System;

// Para el acceso a BBDD
using System.Data;
using System.Data.OleDb;

public class AccesoBD
{

	// MÃƒÂ©todo principal
	public static void Main ()
	{

		// String de conexion, al estilo de ASP
		string stringConexion = "Provider=Microsoft.Jet.OLEDB.4.0;" 
		+ "User Id=;Password=;" + @"Data Source=Discos.mdb";

		// Esta es la consulta que ejecutaremos
		string consulta = "SELECT * FROM Discos";
		
		// Creamos el objeto de la conexion
		OleDbConnection conexion = new OleDbConnection(stringConexion);
		
		// Creamos el objeto para ejecutar la sentencia
		OleDbCommand sentencia = new OleDbCommand(consulta, conexion);
		
		// Un resultSet o recordSet para guardar el resultado de la sentencia
		OleDbDataReader resultSet = null;		
		
		try { // metemos control de excepciones, por si las moscas
			
			// Abrimos la conexiÃƒÂ³n
			conexion.Open();
		
			// Ejecutamos la sentencia y mostramos el resultado
			resultSet = sentencia.ExecuteReader();
			
			// NOTA: si fuera un INSERT, UPDATE o DELETE se harÃƒÂ­a asÃƒÂ­:
			// int registros = sentencia.ExecuteNonQuery(); // registros serÃƒÂ­an los reg afectados

			System.Console.WriteLine("Estos datos hay en la tabla
");

			// Recorremos el resultado
			while (resultSet.Read())
			{
				// Para tomar una columna de cada registro usamos funciones de este pelo
				// segun el tipo de dato: getString, getBoolean, getDouble,...
				// nombre, estilo , precio
				System.Console.Write("IntÃƒÂ©rprete: {0} ", resultSet.GetString(2));
				System.Console.Write("Estilo: {0} ", resultSet.GetString(3));
				System.Console.WriteLine("Precio: {0} ", resultSet.GetDouble(4));		
			}		

			// IMPORTANTE, al final de la consulta hay que cerrar
			// tanto el datareader como la conexiÃƒÂ³n!!!
			resultSet.Close();
			conexion.Close();
		}
		catch (OleDbException ode)
		{
				System.Console.WriteLine("Error de OleDb: {0} ", ode);		
		}
		catch (Exception e)
		{
				System.Console.WriteLine("AlgÃƒÂºn error general: {0} ", e);		
		}
	
		
	}
}
</pre>

En .NET hay unos objetos que recuperan datos y se puede manipular para luego actualizar la BBDD con ese conjunto de datos. Personalmente me parece una animalada, a no ser que seas el usuario ÃƒÂºnico de la aplicaciÃƒÂ³n o no te importe bloquear tablas.
