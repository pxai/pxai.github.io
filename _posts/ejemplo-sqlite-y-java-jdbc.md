<p>
	<img alt="Logo SQLite" src="http://www.sqlite.org/images/sqlite370_banner.gif" style="width: 220px; height: 101px; " /></p>
<p>
	SQLite es un gestor de BBDD ligero con el que podemos crear una BBDD que se guarda en un ficherito y luego podemos explotar la BBDD con SQL. En linux o en cualquier consola en la que dispongamos de SQLite, si queremos crear una BBDD hacemos lo siguiente:</p>
<p>
	&nbsp;</p>
<div>
	linux:~/java/sqlite# sqlite3 bdejemplo.db</div>
<div>
	SQLite version 3.7.3</div>
<div>
	Enter &quot;.help&quot; for instructions</div>
<div>
	Enter SQL statements terminated with a &quot;;&quot;</div>
<div>
	sqlite&gt; create table mitabla (id integer unique primary key, nombre varchar(30));</div>
<div>
	sqlite&gt; insert into mitabla values (1,&quot;prueba&quot;);</div>
<div>
	sqlite&gt; insert into mitabla values (2,&quot;otra prueba&quot;);</div>
<div>
	sqlite&gt; .q</div>
<div>
	linux:~/java/sqlite#&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	Con eso hemos creado una BBDD llamada<strong> bdejemplo.db </strong>y ahora ya podemos explotarla desde un programa java con JDBC. Hay que bajarse el driver jdbc de aqu&iacute;:&nbsp;<a href="http://www.zentus.com/sqlitejdbc/">http://www.zentus.com/sqlitejdbc/</a></div>
<div>
	&nbsp;</div>
<div>
	<div>
		/**</div>
	<div>
		* EjemploSqlite</div>
	<div>
		* javac EjemploSqlite.java</div>
	<div>
		* java -cp .:sqlitejdbc-v056.jar EjemploSqlite</div>
	<div>
		*/</div>
	<div>
		import java.sql.*;</div>
	<div>
		&nbsp;</div>
	<div>
		public class EjemploSqlite {</div>
	<div>
		&nbsp; public static void main(String[] args) throws Exception {</div>
	<div>
		&nbsp; &nbsp; Class.forName(&quot;org.sqlite.JDBC&quot;);</div>
	<div>
		&nbsp; &nbsp; Connection conn =</div>
	<div>
		&nbsp; &nbsp; &nbsp; DriverManager.getConnection(&quot;jdbc:sqlite:bdejemplo.db&quot;);</div>
	<div>
		&nbsp; &nbsp; Statement stat = conn.createStatement();</div>
	<div>
		&nbsp; &nbsp;&nbsp;</div>
	<div>
		&nbsp; &nbsp; ResultSet rs = stat.executeQuery(&quot;select * from mitabla;&quot;);</div>
	<div>
		&nbsp; &nbsp; while (rs.next()) {</div>
	<div>
		&nbsp; &nbsp; &nbsp; System.out.println(&quot;id = &quot; + rs.getString(&quot;id&quot;));</div>
	<div>
		&nbsp; &nbsp; &nbsp; System.out.println(&quot;nombre = &quot; + rs.getString(&quot;nombre&quot;));</div>
	<div>
		&nbsp; &nbsp; }</div>
	<div>
		&nbsp; &nbsp; rs.close();</div>
	<div>
		&nbsp; &nbsp; conn.close();</div>
	<div>
		&nbsp; }</div>
	<div>
		}</div>
</div>
<div>
	&nbsp;</div>
