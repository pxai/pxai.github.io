<h2>
	Java i18n Internationalization</h2>
<p>
	&iquest;Qu&eacute; por qu&eacute; se llama i18n? b&uacute;scalo y ver&aacute;s, qu&eacute; cosas.</p>
<p>
	A diferencia de otros lenguajes la internacionalizaci&oacute;n de programas en java, al menos la forma b&aacute;sica que trae la plataforma por defecto te permite hacer de todo (fechas, monedas, traducci&oacute;n de texto con par&aacute;metros) pero la forma es cuando menos engorrosa.</p>
<p>
	Lo que he puesto aqu&iacute; es el t&iacute;pico churro que muestra c&oacute;mo hacer varias cosas: detectar el locale del sistema, aplicar el que nosotros queramos, mostrar n&uacute;meros y monedas seg&uacute;n el locale, las fechas, etc. y por supuesto, mostrar mensajes en distintos idiomas, con o sin par&aacute;metros.</p>
<p>
	si ahondamos un poco en la documentaci&oacute;n oficial veremos que hay dos tipos de internacionalizaciones, una es la que veremos aqu&iacute; pero hay otra (ListResourceBundle) en la que hay que crear ficheros *.class para la internacionalizaci&oacute;n.</p>
<p>
	Otra cosa curiosa es que los ficheros properties con los mensajes deben estar en el classpath como si fueran clases. Por cada idioma que queremos meter debemos crear un fichero con mensajes, incluyendo uno que ser&aacute; el que se aplique en caso de no encontrar el locale elegido en el programa.</p>
<p>
	<strong>Messages.properties</strong></p>
<p>
	Este ser&iacute;a el fichero por defecto:</p>
<p>
	# this is a comment<br />
	start = Starting program<br />
	end = Program ended<br />
	hello = Hello<br />
	name = My name is {0}<br />
	name2 = My name is {0} and Im {1,number,integer} years old \<br />
	and I was born in {2,date,long} at {2,time,short} \<br />
	and I weighed {3,number}</p>
<p>
	<strong>Message_en_US.properties</strong></p>
<p>
	Este ser&iacute;a la versi&oacute;n inglesa-USA:</p>
<p>
	# this is a comment<br />
	start = Starting program<br />
	end = Program ended<br />
	hello = Hello<br />
	name = My name is {0}<br />
	name2 = My name is {0} and Im {1,number,integer} years old \<br />
	and I was born in {2,date,long} at {2,time,short} \<br />
	and I weighed {3,number}<br />
	<strong> </strong></p>
<p>
	<strong>Message_es_ES.properties</strong></p>
<p>
	Y la versi&oacute;n espa&ntilde;ola, ole ole y ole qu&eacute; arte :)</p>
<p>
	# this is a comment<br />
	start = Iniciando programa<br />
	end = Programa terminado<br />
	hello = Hola<br />
	name = Mi nombre es {0}<br />
	name2 = Mi nombre es {0} y tengo {1,number,integer} a&ntilde;os\<br />
	y nac&iacute; el {2,date,long} a las {2,time,short}\<br />
	y pes&eacute; {3,number}</p>
<p>
	<strong>El programa</strong></p>
<p>
	Un churro con todas las pruebas que se me ocurr&iacute;an, aunque s&eacute; que faltan algunas.</p>
<p>
	import java.text.DateFormat;<br />
	import java.text.MessageFormat;<br />
	import java.text.NumberFormat;<br />
	import java.util.Currency;<br />
	import java.util.Date;<br />
	import java.util.Locale;<br />
	import java.util.ResourceBundle;<br />
	import java.util.Scanner;<br />
	<br />
	<br />
	/**<br />
	&nbsp;* Shows how to write a program with messages in different languages<br />
	&nbsp;* NOTE: message files (*.properties) must be located in the classpath<br />
	&nbsp;* like a *.class file<br />
	&nbsp;* @author Pello Altadill<br />
	&nbsp;* @greetz fat-free milk drinker<br />
	&nbsp;* http://butterbeliever.com/fat-free-dairy-skim-milk-secrets/<br />
	&nbsp;*/<br />
	public class InternationalizationSample {<br />
	<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * @param args<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public static void main(String[] args) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// TODO Auto-generated method stub<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Locale locale = Locale.getDefault();<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String language = locale.getDisplayLanguage();<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String country = locale.getDisplayCountry();<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Scanner reader = new Scanner(System.in);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Integer integerNumber = new Integer(160666);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Double doubleNumber = new Double(1666.42);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; NumberFormat numberFormatter;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; DateFormat dateFormatter;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Currency currency;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String languageCode = System.getProperty(&quot;user.language&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String countryCode = System.getProperty(&quot;user.country&quot;);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; System.out.println(&quot;Lang: &quot; + language + &quot;, country: &quot; + country);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; System.out.println(&quot;Lang: &quot; + languageCode + &quot;, country: &quot; + countryCode);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; System.out.println(&quot;Give me lang code (en, es, eu): &quot;);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; languageCode = reader.nextLine();<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; System.out.println(&quot;Give me country code (EN, ES, EU): &quot;);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; countryCode = reader.nextLine();<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Let&#39;s show messages in selected language<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ResourceBundle messages;<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; System.out.println(&quot;Setting locales to: &quot; + languageCode +&quot;_&quot;+countryCode);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; locale = new Locale(languageCode, countryCode);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; messages = ResourceBundle.getBundle(&quot;Messages&quot;, locale);<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; System.out.println(messages.getString(&quot;start&quot;));<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; System.out.println(messages.getString(&quot;hello&quot;));<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; System.out.println(messages.getString(&quot;end&quot;));<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; numberFormatter = NumberFormat.getNumberInstance(locale);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; dateFormatter = DateFormat.getDateInstance(DateFormat.LONG, locale);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; // currency = Currency.getInstance(locale);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; System.out.println(&quot;Numbers: &quot; + numberFormatter.format(integerNumber));<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; System.out.println(&quot;Number Double: &quot; + numberFormatter.format(doubleNumber));<br />
	<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; //numberFormatter = NumberFormat.getCurrencyInstance(locale);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; //System.out.println(&quot;Currency: &quot; + currency);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; //System.out.println(&quot;Money: &quot; + numberFormatter.format(doubleNumber));<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; // PARAMETERS!!!<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; // For messages with parameters we use MesssageFormat<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; // This will be the param to fill de message<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Object[] messageParams = {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &quot;Prince&quot;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;};<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; MessageFormat formatter = new MessageFormat(&quot;&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; formatter.setLocale(locale);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; formatter.applyPattern(messages.getString(&quot;name&quot;));<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; System.out.println(formatter.format(messageParams));<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Format samples: http://docs.oracle.com/javase/7/docs/api/java/text/MessageFormat.html<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; Object[] messageParams2 = {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &quot;Prince&quot;,<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; new Integer(45),<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; new Date(),<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; new Double(3.4)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;};<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; formatter = new MessageFormat(&quot;&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; formatter.setLocale(locale);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; formatter.applyPattern(messages.getString(&quot;name2&quot;));<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; System.out.println(formatter.format(messageParams2));<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	}<br />
	&nbsp;</p>
