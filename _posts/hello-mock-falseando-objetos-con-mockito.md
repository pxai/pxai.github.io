<h2>
	Mock Objects con Mockito</h2>
<p>
	<a href="http://code.google.com/p/mockito/">mockito</a> es un framework para trabajar con objetos mock, es decir objetos falsos o simulados. Mockito trata de ser m&aacute;s simple de usar que otras librer&iacute;as predecesoras como jmock o easymock.</p>
<p>
	&iquest;Para qu&eacute; necesitamos objetos simulados? por muchos motivos cuando queremos hacer pruebas unitarias de nuestras clases puede que dependamos de otras clases que tengan alguna pega:</p>
<p>
	- Son lentas (jdbc, redes, ...)</p>
<p>
	- No devuelven un resultado concreto</p>
<p>
	- No se tienen a mano o dependen de algo externo.</p>
<p>
	- Sencillamente a&uacute;n no est&aacute;n creadas</p>
<p>
	En fin, el caso es que puede que haya objetos que necesitemos simularlos a la hora de poder hacer test unitarios de nuestras clases.</p>
<p>
	Vamos a ver un par de ejemplos en los que se crea una instancia de la clase List falsa y otro ejemplo en el que creamos un BufferedReader de palo.</p>
<p>
	<strong>Mocked List</strong></p>
<p>
	import static org.mockito.Mockito.*;<br />
	<br />
	import java.util.List;<br />
	/**<br />
	&nbsp;* @author Pello Altadill<br />
	&nbsp;* @greetz &ntilde;a&ntilde;a&ntilde;aa MOOOOOOOOOCK (vuvuzela)<br />
	&nbsp;*/<br />
	public class MockList {<br />
	<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * @param args<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public static void main(String[] args) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// We create a mock list using List interface<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// So, this is a false or mocked list<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;List mockedList = mock(List.class);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// We add something to the list<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;mockedList.add(&quot;Example&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;mockedList.add(&quot;Another example&quot;);<br />
	<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// This will return null<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Is anything there?: &quot; + mockedList.get(0));<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Now we establish: when we call get(0) on out list we<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// want to return &quot;Pain in the ass&quot;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// This is Stubbing<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;when(mockedList.get(0)).thenReturn(&quot;Pain in the ass&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// We verify that we have stubbed this invocation<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// nothing will happen in this case.<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;verify(mockedList).add(&quot;Example&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Now, this will return: &quot;Pain in the ass&quot;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Let&#39;s see: &quot; + mockedList.get(0));<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// And this one will return&nbsp; null<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;And what about this: &quot; + mockedList.get(1));<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// This will throw an Exception because add(&quot;Another Exception&quot;)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// invocation is not stubbed<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;verify(mockedList).add(&quot;Another Example&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	}<br />
	&nbsp;</p>
<p>
	<strong>Mocked BufferedReader</strong></p>
<p>
	import static org.mockito.Mockito.*;<br />
	<br />
	import java.io.BufferedReader;<br />
	import java.io.FileNotFoundException;<br />
	import java.io.FileReader;<br />
	import java.io.IOException;<br />
	<br />
	<br />
	/**<br />
	&nbsp;* We mock a BufferedReader using mockito<br />
	&nbsp;* @author Pello Xabier Altadill Izura<br />
	&nbsp;* @greetz UuuuuuoooAaaaaUUUaa<br />
	&nbsp;*/<br />
	public class MockFile {<br />
	<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * @param args<br />
	&nbsp;&nbsp; &nbsp; * @throws Exception<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public static void main(String[] args) throws Exception {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// We create an instance of a false or mocked BufferedReader<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;BufferedReader mockBufferedReader = mock(BufferedReader.class);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Then we stub readLine() function. It will return &quot;747:John:Doe&quot;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;when(mockBufferedReader.readLine()).thenReturn(&quot;747:John:Doe&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// We establish that when mocked reader calls close an exception<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// will be thrown<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;doThrow(new IOException()).when(mockBufferedReader).close();<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Let&#39;s try<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;First line: &quot; + mockBufferedReader.readLine());<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Now we close...<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;mockBufferedReader.close();<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;BufferedReader anotherMockReader;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	}<br />
	&nbsp;</p>
<p>
	&nbsp;</p>
