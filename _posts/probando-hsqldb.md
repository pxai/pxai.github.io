HSQLDB es un gestor de bases de datos escrito íntegramente en java, con soporte a la última para SQL, bla bla y afirman ser los líderes en su terreno, los más guapos, los más rápidos,... aunque no dicen nada de <a href="http://www.h2database.com/html/main.html">H2</a> por si acaso.
</p>
<p>Tiene tres modos de funcionamiento:</p>
<ul>
<li>Memoria: todas las tablas se guardan en la memoria RAM. Acceso local claro está.</li>
<li>Fichero: los datos se almacenan en ficheros. Acceso local obviamente.</li>
<li>Modo servidor: el acceso puede ser remoto.</li>
</ul>
<p>
Puedes iniciar una conexión a una BD y si no existe la crea al vuelo.</p>
<p>
¿Qué utilidad puede tener una cosa así? ¡Todo parece que está en el aire!
Como poco, puede resultar muy útil en un entorno de desarrollo o un entorno para hacer pruebas. No precisa instalar
un servidor ni poner en marcha nada en concreto, en ese sentido es como una BD SQLite. Otra cosa interesante es que puedes meterle funciones propias... ¡¡hechas en java!! al final <a href="http://hsqldb.org/doc/2.0/guide/sqlroutines-chapt.html#src_jrt_routines">todo queda en casa</a>
Este gestor de BD te lo encuentras muchas veces cuando ves ejemplos de Hibernate o de aplicaciones java con acceso a BD.</p>
<p>
Si te descargas HSQLDB trae una serie de utilidades y una "útil" aunque algo espartana es hsqldb-databasemanagerswing. También tienes
la versión awt si eres más espartano que Leonidas. En la distribución linux dispones directamente de ese comando si no es así lo tienes que <a href="http://hsqldb.org/doc/2.0/util-guide/dbm-chapt.html">invocar a mano.</a></p>
<img src="http://www.pello.info/images/hsqldb.png" alt="hsqldb manager screen" title="hsqldb manager screen" /><br />
Ahí creas una BD al vuelo, en este caso una BD llamada example con una tabla llamada table1.

<pre class="brush: js">
create table table1 (
id identity,
name varchar(30),
description varchar(100),
anydate date,
done boolean);
</pre>

identity viene a ser el autoincrement, autonumeric, you name it..
<p>
Meto tres registros y al cerrar me encuentro con dos ficheros: example.log y example.properties
</p>

<b>example.log</b>
Contiene los últimos comandos insertados.

<pre  class="brush: js">
CONNECT USER SA
CREATE TABLE table1 (\u000aid identity,\u000aname varchar(30),\u000adescription 
varchar(100),\u000aanydate date,\u000adone boolean)
INSERT INTO TABLE1 VALUES(0,'test1','test1 desc','2013-07-29',TRUE)
INSERT INTO TABLE1 VALUES(1,'test2','test2 desc','2013-07-29',TRUE)
INSERT INTO TABLE1 VALUES(2,'test3','test3 desc','2013-07-29',TRUE)
</pre>

<b>example.properties</b>
Contiene las propiedades de la BD.
<pre  class="brush: js">
#HSQL Database Engine 1.8.0.10
#Mon Jul 29 01:18:19 CEST 2013
hsqldb.script_format=0
runtime.gc_interval=0
sql.enforce_strict_size=false
hsqldb.cache_size_scale=8
readonly=false
hsqldb.nio_data_file=true
hsqldb.cache_scale=14
version=1.8.0
hsqldb.default_table_type=memory
hsqldb.cache_file_scale=1
hsqldb.log_size=200
modified=yes
hsqldb.cache_version=1.7.0
hsqldb.original_version=1.8.0
hsqldb.compatible_version=1.8.0
</pre>

<b>Siguiente ejecución</b>
<p>
Como se puede comprobar, si hacemos un select HSQLDB nos muestra los datos que ya habiamos metido, ya que al iniciarse los recupera mirando el fichero example.log.
Insertamos unos nuevos registros y...</p>
<br />...aparece un nuevo ficehro:

<b>example.script</b>
<p>
Este fichero contiene el comando para crear la tabla y los inserts anteriores, es decir, lo que había en el example.log
pasa al fichero .script y en el fichero .log aparece los últimos comandos que se han ejecutado, es decir, los últimos
cambios en la BD.</p>

<b>Siguiente ejecución</b>
<p>Haciendo una select se puede comprobar que efectivamente HSQLDB carga todo desde el ficerho .script y .log
Se supone que en el fichero log se guardan cosas en los casos que la conexión se cierre de forma brusca.
</p>

<p>Para asegurarte de que los datos se guardan en el fichero script, utiliza el comando SQL CHECKPOINT.</p>

<b>HsqldbSample.java</b>
<p>Merece la pena hacer una pequeña prueba de acceso desde java para verificar una cosa ¿podemos recuperar el id de un insert? parece que a la
manera tradicional no, al menos en esta prueba me daba Comando no soportado y en muchos sitios dicen que no se puede. 
Debemos ejecutar un comando SQL específico de Hsqldb (CALL IDENTITY) y eso no da el dato. Otra cosa curiosa, es que a partir del registro 12 ya no me guardaba en el fichero example.script los últimos insert. He tenido que incluir la directiva shutdown=true en la conexión para que guardara todo. No era cuestión de hacer commit ni nada.</p>
</p>
<pre class="brush: java">
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.Scanner;
 
/**
 * Quick and Dirty program te test HSQLDB
 * run: java -cp "hsqldb.jar:." HsqldbSample
 * @author pello_altadill
 *
 */
public class HsqldbSample {
 
 
/**
* @param args
*/
public static void main(String[] args) {
	Scanner reader = new Scanner(System.in);
	String name = "";
	String description = "";
	
  try {
 Class.forName("org.hsqldb.jdbcDriver");
 Connection conn =
 DriverManager.getConnection("jdbc:hsqldb:file:example;shutdown=true","sa","");
 Statement stat;
 ResultSet resultset;
 
 stat = conn.createStatement();
 resultset = stat.executeQuery("select * from table1;");
 
   while (resultset.next()) {
     System.out.println("id = " + resultset.getString("id"));
     System.out.println("name = " + resultset.getString("name"));
   }
   
  System.out.println("Gimme a name");
  name = reader.nextLine();
  System.out.println("Ok, now gimme a desc");
  description = reader.nextLine();
  
 // INSERT
 String insertQuery =  "insert into table1 (name,description,anydate,done) values('"+name+"','"+description+"',now(),true)";
 int result = stat.executeUpdate(insertQuery);


 
 // INSERT RECUPERANDO LA ÚLTIMA CLAVE
  System.out.println("Gimme a name");
  name = reader.nextLine();
  System.out.println("Ok, now gimme a desc");
  description = reader.nextLine();

	insertQuery =  "insert into table1 (name,description,anydate,done) values('"+name+"','"+description+"',now(),true)";


	 
	 	result = stat.executeUpdate(insertQuery);

		// Query to retrieve last generated id from HSQLDB
	   PreparedStatement psIdentity = conn.prepareStatement("CALL IDENTITY()");
   
      ResultSet resultSet = psIdentity.executeQuery();
	   if (   resultSet.next()) {
      	int lastid = resultSet.getInt(1);
	      System.out.println("Last id: "+ lastid);
	      resultSet.close();
      }

   /*
   	// Doesn't work at all 
	 //result = stat.executeUpdate(insertQuery,Statement.RETURN_GENERATED_KEYS);
   // Sacamos la clave
   ResultSet rs = stat.getGeneratedKeys();
   if (rs.next()){
       result=rs.getInt(1);
   }
    
	*/
 
   resultset = stat.executeQuery("select * from table1;");
 
   while (resultset.next()) {
     System.out.println("id = " + resultset.getString("id"));
     System.out.println("name = " + resultset.getString("name"));
   }

	
	resultset.close();
   conn.close();
} catch (Exception e) {
System.err.println("Error: " + e.getMessage());
}
}
 
}
</pre>
<p>Tras meter mano a este programa y hacer que metiera 10.000 registros, he comprobado que efectivamente, mete 10.000 comandos insert en el fichero example.script. Si no los queremos, basta con editar ese fichero y cargarnos los insert y si acaso retocar el valor del último id generado.</p>