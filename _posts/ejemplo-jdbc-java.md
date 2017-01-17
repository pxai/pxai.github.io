<p>
	JDBC en java</p>
<p>
	Este es un churro resumen de las cuatro cosas b&aacute;sicas que se hacen con el JDBC, en concreto:</p>
<p>
	-Las operaciones CRUD (en jdbc el select de una forma el resto de otra)</p>
<p>
	-El tema de las PreparedStatement, que es la forma correcta de hacer las cosas.</p>
<p>
	-El tema de sacar el &uacute;ltimo campo clave generado. En el caso de autonum&eacute;ricos nos interesa saberlo en muchas ocasiones y la cosa tiene su aquel en java.</p>
<p>
	&nbsp;</p>
<div>
	import java.sql.PreparedStatement;</div>
<div>
	import java.sql.Statement;</div>
<div>
	import java.sql.Connection;</div>
<div>
	import java.sql.DriverManager;</div>
<div>
	import java.sql.ResultSet;</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	/**</div>
<div>
	&nbsp;* churro con las cosas b&aacute;sicas de JDBC</div>
<div>
	&nbsp;* @author pello_altadill</div>
<div>
	&nbsp;*</div>
<div>
	&nbsp;*/</div>
<div>
	public class Main {</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	/**</div>
<div>
	* @param args</div>
<div>
	*/</div>
<div>
	public static void main(String[] args) {</div>
<div>
	&nbsp; try {</div>
<div>
	&nbsp;Class.forName(&quot;com.mysql.jdbc.Driver&quot;);</div>
<div>
	&nbsp;Connection conn =</div>
<div>
	&nbsp;DriverManager.getConnection(&quot;jdbc:mysql://localhost/erp&quot;,&quot;root&quot;,&quot;&quot;);</div>
<div>
	&nbsp;Statement stat = conn.createStatement();</div>
<div>
	&nbsp;ResultSet resultset = stat.executeQuery(&quot;select * from customer;&quot;);</div>
<div>
	&nbsp;</div>
<div>
	&nbsp; &nbsp;while (resultset.next()) {</div>
<div>
	&nbsp; &nbsp; &nbsp;System.out.println(&quot;id = &quot; + resultset.getString(&quot;id&quot;));</div>
<div>
	&nbsp; &nbsp; &nbsp;System.out.println(&quot;name = &quot; + resultset.getString(&quot;name&quot;));</div>
<div>
	&nbsp; &nbsp;}</div>
<div>
	&nbsp; &nbsp;</div>
<div>
	&nbsp;// INSERT</div>
<div>
	&nbsp;String insertQuery =&nbsp;</div>
<div>
	&nbsp;&quot;insert into customer (name,address) values(&#39;Sauron&#39;,&#39;Mordor&#39;)&quot;;</div>
<div>
	&nbsp;int result = stat.executeUpdate(insertQuery);</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;// INSERT RECUPERANDO LA &Uacute;LTIMA CLAVE</div>
<div>
	&nbsp;insertQuery = &quot;insert into customer (name,address) values(&#39;Melkor&#39;,&#39;Angband&#39;)&quot;;</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;result = stat.executeUpdate(insertQuery,Statement.RETURN_GENERATED_KEYS);</div>
<div>
	&nbsp; &nbsp;</div>
<div>
	&nbsp; &nbsp;// Sacamos la clave</div>
<div>
	&nbsp; &nbsp;ResultSet rs = stat.getGeneratedKeys();</div>
<div>
	&nbsp; &nbsp;if (rs.next()){</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp;result=rs.getInt(1);</div>
<div>
	&nbsp; &nbsp;}</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;// DELETE</div>
<div>
	&nbsp;int id = 4;</div>
<div>
	&nbsp;String deleteQuery = &quot;delete from customer where id=&quot; + id;</div>
<div>
	&nbsp;result = stat.executeUpdate(deleteQuery);</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;// UPDATE</div>
<div>
	&nbsp;String who = &quot;Saruman&quot;;</div>
<div>
	&nbsp;String updateQuery =&nbsp;</div>
<div>
	&quot;update customer set address=&#39;The Shire&#39; where name=&#39;&quot;+who+&quot;&#39;&quot;;</div>
<div>
	&nbsp;result = stat.executeUpdate(updateQuery);</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;// PREPARED STATEMENT</div>
<div>
	&nbsp;String insertSQL =&nbsp;</div>
<div>
	&quot;insert into customer (name,address) values (?, ?)&quot;;</div>
<div>
	&nbsp;PreparedStatement prep = conn.prepareStatement(insertSQL);</div>
<div>
	&nbsp;</div>
<div>
	&nbsp; &nbsp;prep.setString(1, &quot;Eomer&quot;);</div>
<div>
	&nbsp; &nbsp;prep.setString(2, &quot;Rohan&quot;);</div>
<div>
	&nbsp; &nbsp;prep.addBatch();</div>
<div>
	&nbsp;</div>
<div>
	&nbsp; &nbsp;prep.setString(1, &quot;Sam&quot;);</div>
<div>
	&nbsp; &nbsp;prep.setString(2, &quot;The Shire&quot;);</div>
<div>
	&nbsp; &nbsp;prep.addBatch();</div>
<div>
	&nbsp;</div>
<div>
	&nbsp; &nbsp;prep.executeBatch();</div>
<div>
	&nbsp; &nbsp;resultset.close();</div>
<div>
	&nbsp; &nbsp;conn.close();</div>
<div>
	} catch (Exception e) {</div>
<div>
	System.err.println(&quot;Error: &quot; + e.getMessage());</div>
<div>
	}</div>
<div>
	}</div>
<div>
	&nbsp;</div>
<div>
	}</div>
<div>
	&nbsp;</div>
