<p>
	<br />
	Recientemente me dispon&iacute;a a poner orden en la secci&oacute;n de descargas y software de este sitio donde no hay m&aacute;s que vaporware, pruebas de concepto y algunas ideas disparatadas. Casi todas ellas est&aacute;n dejadas ah&iacute; por si a alguien le serv&iacute;a algo como idea o por si alg&uacute;n trozo de c&oacute;digo pod&iacute;a ser &uacute;til para uno mismo: c&oacute;mo leer un fichero properties, c&oacute;mo hacer el tema de locales en php, c&oacute;mo hacer un bot de irc en perl para tomar el pelo a los salidos, en fin un caj&oacute;n desastre.<br />
	<br />
	Uno de las tonter&iacute;as que ten&iacute;a por ah&iacute; era una vieja idea de montar un motor de inferencia propio. La inteligencia artificial fue de las &uacute;ltimas asignaturas de la carrera que se me atraves&oacute; un poco con uno de los ex&aacute;menes m&aacute;s jodidos de todos al menos en la facultad de Donosti: mezclaba programaci&oacute;n funcional en lisp, programaci&oacute;n l&oacute;gica con prolog y programar una especie de sistemas expertos sencillos en clisp, y no recuerdo qu&eacute; cosas m&aacute;s -oscuras o mejor dicho difusas ;)-. Un horror. Es una asignatura que bien dada puede ser fascinante pero tal cual te la dan lo que acabas haciendo es procurar preparar el examen, m&aacute;s que aprender algo &uacute;til.<br />
	<br />
	El caso es que el tema de los motores de inferencia, los sistemas expertos me parec&iacute;a algo m&aacute;s interesante para aplicar a problemas reales. Por ejemplo ten&iacute;a la idea de crear un administrador de sistemas virtual que en funci&oacute;n del estado del sistema fuera capaz de tomar decisiones y aplicar los&nbsp; comandos oportunos.Esto quiz&aacute; vino inspirado por una peli de serie B llamada Webmaster donde sale algo parecido: un sysadmin que transmite sus ordenes a un ente virtual llamado EGO que va aprendiendo de su amo y mantiene y supervisa los servidores.<br />
	<br />
	Comenc&eacute; desarrollando una especie de motor de inferencia en perl cuyo c&oacute;digo debe andar por sourceforge desde al a&ntilde;o 2000 (madre del amor hermoso) y que lo mismo ya est&aacute; desaparecido. Si lo viera ser&iacute;a incapaz de reconocer la paternidad del mismo ya que perl es un lenguaje que por mucho que te esfuerces en ponerlo claro queda inevitablemente sucio (demasiados caracteres especiales).<br />
	<br />
	En el 2001 la humanidad todav&iacute;a no hab&iacute;a llegado a Jupiter como predijo Clarke, as&iacute; que me dediqu&eacute; a esa misma idea y la trat&eacute; de pasar a Java manteniendo en mismo nombre, inferenczy,evidente para m&iacute; pero sin duda rebuscado para cualquiera que no haya le&iacute;do la saga del Necroscopio de Brian Lumley, o sea la gran mayor&iacute;a de la gente normal inform&aacute;tica o no. Justo cuando estaba revisando ese c&oacute;digo me encontr&eacute; que inferenczy estaba montado sobre otro proyecto que pensaba que estaba perdido sin remedio: Ozone.<br />
	<br />
	OOO = O3 = Ozone<br />
	Era por las tres O, de Object Oriented Operative System. Tras ese nombre tan pretendidamente mol&oacute;n lo que trataba de hacer es un sistema operativo hecho enteramente en java, todo de consola claro. En su d&iacute;a ya exist&iacute;a alguna cosa as&iacute; JavaOS se me ocurre y seguramente ahora habr&aacute; miles de ellos. Me ha sorprendido un poco c&oacute;mo compliqu&eacute; el desarrollo de ese sistema seguramente inspirado en el entorno de trabajo que me rodeaba en esa &eacute;poca: en Madrid trabajando para una una de las m&aacute;s c&eacute;lebres c&aacute;rnicas (AXPE) que a su vez me ten&iacute;a en la m&iacute;tica picadora de carne llamada Andersen (&iexcl;&iexcl;toma combo breaker!!). Ese era un proyecto en el que los p&eacute;rfidos gerentes de Andersen le hab&iacute;an vendido a Safei un proyecto monstruoso con un framework del mal donde TODO era XML y donde se met&iacute;a lo t&iacute;pico de la &eacute;poca: Java, Oracle, EJB, Unix (no linux) y ante todo XML everywhere: los formularios web estaban definidos en xml. Las consultas a BBDD estaban definidas en xml, etc... una &eacute;poca en la que, te lo creas o no, todav&iacute;a se fumaba en la oficina.<br />
	<br />
	As&iacute; que Ozone e inferenczy iban a usar XML. Y por supuesto JDBC, que siempre queda m&aacute;s profesional. Como digo hace unas semanas me baj&eacute; el c&oacute;digo y ech&eacute; un ojo a los ficheros de log que generaba el sistema y esto fue lo que me encontr&eacute;:<br />
	Wed Sep 05 11:30:06 CEST 2001&gt; &lt;Kernel&gt; Kernel loaded.<br />
	Wed Sep 05 11:30:06 CEST 2001&gt; &lt;Kernel&gt; starting init...<br />
	Wed Sep 05 11:30:06 CEST 2001&gt; &lt;Init&gt; Init started. [pid: 1]<br />
	Wed Sep 05 11:30:06 CEST 2001&gt; &lt;Init&gt; Init completed succesfully.<br />
	Wed Sep 05 11:30:06 CEST 2001&gt; &lt;DBConnection&gt; starting...<br />
	Wed Sep 05 11:30:06 CEST 2001&gt; &lt;DBConnection&gt; Connected to DB<br />
	Wed Sep 05 11:30:06 CEST 2001&gt; &lt;DBConnection&gt; DB Operations interface set to: SQL<br />
	Wed Sep 05 11:30:06 CEST 2001&gt; &lt;DBOperationsSQL&gt; SQL SELECT successful: select * from personas<br />
	Wed Sep 05 11:30:06 CEST 2001&gt; &lt;DBConnection&gt; started. [pid: 2]<br />
	<br />
	Madre m&iacute;a, 5 de septiembre de 2001. Y al poco se ve esto:<br />
	<br />
	Thu Sep 06 08:19:06 CEST 2001&gt; &lt;Kernel&gt; Kernel loaded.<br />
	Thu Sep 06 08:19:06 CEST 2001&gt; &lt;Kernel&gt; starting init...<br />
	Thu Sep 06 08:19:06 CEST 2001&gt; &lt;Init&gt; Init started. [pid: 1]<br />
	Thu Sep 06 08:19:06 CEST 2001&gt; &lt;Init&gt; Init completed succesfully.<br />
	Thu Sep 06 08:19:06 CEST 2001&gt; &lt;DBConnection&gt; starting...<br />
	Thu Sep 06 08:19:07 CEST 2001&gt; &lt;DBConnection&gt; Connected to DB<br />
	Thu Sep 06 08:19:07 CEST 2001&gt; &lt;DBConnection&gt; DB Operations interface set to: SQL<br />
	Thu Sep 06 08:19:07 CEST 2001&gt; &lt;DBConnection&gt; started. [pid: 2]<br />
	Wed Sep 12 11:35:06 CEST 2001&gt; &lt;Kernel&gt; Kernel loaded.<br />
	Wed Sep 12 11:35:07 CEST 2001&gt; &lt;Kernel&gt; starting init...<br />
	Wed Sep 12 11:35:07 CEST 2001&gt; &lt;Init&gt; Init started. [pid: 1]<br />
	Wed Sep 12 11:35:07 CEST 2001&gt; &lt;Init&gt; Init completed succesfully.<br />
	Wed Sep 12 11:35:07 CEST 2001&gt; &lt;DBConnection&gt; starting...<br />
	Wed Sep 12 11:35:07 CEST 2001&gt; &lt;DBConnection&gt; Can&#39;t connect to DB<br />
	Wed Sep 12 11:35:07 CEST 2001&gt; &lt;DBConnection&gt; DB Operations interface set to: SQL<br />
	Wed Sep 12 11:35:07 CEST 2001&gt; &lt;DBConnection&gt; started. [pid: 2]<br />
	<br />
	Parece que tras el 11 de septiembre el mundo se derrumbaba pero yo segu&iacute;a a mi rollo. &iexcl;&iexcl;Oh cielos no! &iexcl;&iexcl;No me conectaba a la BBDD!!<br />
	<br />
	El caso es que, a&ntilde;os despu&eacute;s, lo volv&iacute;a a ejecutar tirando de un script BAT que hab&iacute;a para tal efecto. Y esto sucedi&oacute;:<br />
	Tue Sep 18 09:26:00 CEST 2001&gt; &lt;Kernel&gt; Kernel loaded.<br />
	Tue Sep 18 09:26:00 CEST 2001&gt; &lt;Kernel&gt; starting init...<br />
	Tue Sep 18 09:26:00 CEST 2001&gt; &lt;Init&gt; Init started. [pid: 1]<br />
	Tue Sep 18 09:26:00 CEST 2001&gt; &lt;SystemXMLReader&gt; Init Data/etc/init.xml parsing.<br />
	Tue Sep 18 09:26:00 CEST 2001&gt; &lt;SystemXMLReader&gt; parsed.<br />
	Tue Sep 18 09:26:00 CEST 2001&gt; &lt;Init&gt; Loading com.javamercenary.ai.inferenczy.core.DBConnection...<br />
	Tue Sep 18 09:26:00 CEST 2001&gt; &lt;Init&gt; Init completed succesfully.<br />
	Tue Sep 18 09:26:00 CEST 2001&gt; &lt;DBConnection&gt; starting...<br />
	Tue Sep 18 09:26:00 CEST 2001&gt; &lt;DBConnection&gt; Can&#39;t connect to DB<br />
	Tue Sep 18 09:26:00 CEST 2001&gt; &lt;DBConnection&gt; DB Operations interface set to: SQL<br />
	Tue Sep 18 09:26:00 CEST 2001&gt; &lt;DBConnection&gt; started. [pid: 2]<br />
	&lt;LOG&gt;&lt;DATE&gt;Tue Sep 18 09:28:26 CEST 2001&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;Kernel&gt; Kernel loaded.&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Tue Sep 18 09:28:26 CEST 2001&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;Kernel&gt; starting init...&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Tue Sep 18 09:28:26 CEST 2001&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;Init&gt; Init started. [pid: 1]&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Tue Sep 18 09:28:26 CEST 2001&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;SystemXMLReader&gt; Init Data/etc/init.xml parsing.&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Tue Sep 18 09:28:27 CEST 2001&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;SystemXMLReader&gt; parsed.&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Tue Sep 18 09:28:27 CEST 2001&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;Init&gt; Loading com.javamercenary.ai.inferenczy.core.DBConnection... &lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Tue Sep 18 09:28:27 CEST 2001&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;Init&gt; Init completed succesfully.&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Tue Sep 18 09:28:27 CEST 2001&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;DBConnection&gt; starting...&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Tue Sep 18 09:28:27 CEST 2001&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;DBConnection&gt; Can&#39;t connect to DB&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Tue Sep 18 09:28:27 CEST 2001&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;DBConnection&gt; DB Operations interface set to: SQL&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Tue Sep 18 09:28:27 CEST 2001&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;DBConnection&gt; started. [pid: 2]&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Fri May 31 23:47:48 CEST 2013&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;Kernel&gt; Kernel loaded.&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Fri May 31 23:47:48 CEST 2013&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;Kernel&gt; starting init...&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Fri May 31 23:47:48 CEST 2013&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;Init&gt; Init started. [pid: 1]&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Fri May 31 23:47:48 CEST 2013&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;SystemXMLReader&gt; Init Data/etc/init.xml parsing.&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Fri May 31 23:47:49 CEST 2013&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;SystemXMLReader&gt; parsed.&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Fri May 31 23:47:49 CEST 2013&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;Init&gt; Loading com.javamercenary.ai.inferenczy.core.DBConnection... &lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Fri May 31 23:47:49 CEST 2013&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;DBConnection&gt; starting...&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Fri May 31 23:47:49 CEST 2013&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;Init&gt; Init completed succesfully.&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Fri May 31 23:47:49 CEST 2013&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;DBConnection&gt; Can&#39;t connect to DB&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Fri May 31 23:47:49 CEST 2013&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;DBConnection&gt; DB Operations interface set to: SQL&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	&lt;LOG&gt;&lt;DATE&gt;Fri May 31 23:47:49 CEST 2013&lt;/DATE&gt;&lt;MESSAGE&gt;&lt;DBConnection&gt; started. [pid: 2]&lt;/MESSAGE&gt;&lt;/LOG&gt;<br />
	<br />
	Hay dos cosas: se ve que el 18 de septiembre, inmerso en la locura de XML cambi&eacute; el formato del fichero de log usando tags (MAL, en may&uacute;sculas) con la vaga idea de que quiz&aacute; en alg&uacute;n momento podr&iacute;a interesar parsear los ficheros de log para facilitar su an&aacute;lisis. Cosa que s&iacute; es &uacute;til. La revisi&oacute;n y procesamient de logs puede servir para sacar estad&iacute;sticas por ejemplo como hacen algunos analizadores web como webalizer.<br />
	<br />
	La otra cosa, algo m&aacute;s anecd&oacute;tica es el salto temporal en el fichero de log desde:<br />
	Tue Sep 18 09:28:27 CEST 2001<br />
	Hasta<br />
	Fri May 31 23:47:48 CEST 2013<br />
	<br />
	Madre m&iacute;a, 12 a&ntilde;os nos contemplan. Y el c&oacute;digo segu&iacute;a funcionando en una m&aacute;quina virtual mucho m&aacute;s moderna.<br />
	<br />
	Bueno, en lugar de empezar poniendo un diagrama de clases, voy a ir a haciendo algo de ingenier&iacute;a inversa para poder entender c&oacute;mo narices funcionaba esto. Y todo parte de dos ficheros *.bat, uno para compilar y el otro para ejecutar. Efectivamente, ignoraba la existencia de herramientas como ANT, si es que exist&iacute;an entonces que no lo s&eacute;. El caso es que el fichero de compilaci&oacute;n hac&iacute;a lo siguiente:<br />
	@echo off<br />
	@REM Copyright (c) 2000 Pedro Alcazar, Inc. All Rights Reserved.<br />
	<br />
	@REM Adjust these variables to match your environment<br />
	set CLASSES=src/core/*.java src/api/*.java src/ie/*.java<br />
	<br />
	set PATH=%PATH%;c:\jbuilder4\jdk1.3\bin<br />
	if &quot;&quot; == &quot;%JAVA_HOME%&quot; set JAVA_HOME=c:\jbuilder4\jdk1.3<br />
	<br />
	set MYCLASSPATH=%JAVA_HOME%\lib\classes.zip;.;c:\weblogic\lib\parser.jar<br />
	<br />
	echo&nbsp; Build %CLASSES% ...<br />
	javac -d .&nbsp; -classpath %MYCLASSPATH% %CLASSES%<br />
	echo&nbsp; [ DONE ]<br />
	pause<br />
	<br />
	<br />
	Madreeee! &iexcl;El Jbuilder! &iexcl;El jdk1.3! &iexcl;El weblogic!&nbsp; &iquest;Y qui&eacute;n era Pedro Alcazar? &iexcl;Era yo! Si quieres saber por qu&eacute;... pues en fin.<br />
	<br />
	A ver el de ejecuci&oacute;n:<br />
	<br />
	@echo off<br />
	@REM Copyright (c) 2000 Pedro Alcazar, Inc. All Rights Reserved.<br />
	<br />
	@REM Adjust these variables to match your environment<br />
	set STARTCLASS=com.javamercenary.ai.inferenczy.core.Boot<br />
	<br />
	set PATH=%PATH%;c:\jbuilder4\jdk1.3\bin<br />
	if &quot;&quot; == &quot;%JAVA_HOME%&quot; set JAVA_HOME=c:\jbuilder4\jdk1.3<br />
	<br />
	set MYCLASSPATH=%JAVA_HOME%\lib\classes.zip;./lib/parser.jar;.<br />
	<br />
	echo running %STARTCLASS%<br />
	java -classpath %MYCLASSPATH% %STARTCLASS%<br />
	<br />
	pause<br />
	<br />
	Bueno vale, parecido pero ya vemos un inicio:<br />
	com.javamercenary.ai.inferenczy.core.Boot<br />
	<br />
	C&oacute;mo mola lo de javamercenary, y lo de core, jajaja, qu&eacute; pretencioso es todo. Bueno, a ver qu&eacute; narices hac&iacute;a la clase Boot:<br />
	<br />
	package com.javamercenary.ai.inferenczy.core;<br />
	&nbsp;<br />
	/**<br />
	&nbsp;* T&iacute;tulo:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inference Engine<br />
	&nbsp;* Descripcion:<br />
	&nbsp;* Copyright:&nbsp;&nbsp;&nbsp; Copyright (c) 2001<br />
	&nbsp;* Empresa:<br />
	&nbsp;* @author P. Al.<br />
	&nbsp;* @version 1.0<br />
	&nbsp;*/<br />
	&nbsp;<br />
	&nbsp;public class Boot&nbsp; {<br />
	<br />
	&nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp;&nbsp; &nbsp;* method<br />
	&nbsp;&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;Boot () {<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;public static void main (String args[]) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;INFeReNCZy (c) P. Al. Madrid September 2001&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;INFeReNCZy Bootstrap...&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;new Kernel().start();<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;}<br />
	<br />
	Los comentarios javadoc son lo que te met&iacute;a el jbuilder. Vale, se ve hay un Kernel quese inicia, y tiene pinta de ser un hilo. Vamos a verlo:<br />
	<br />
	package com.javamercenary.ai.inferenczy.core;<br />
	<br />
	/**<br />
	&nbsp;* T&iacute;tulo:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inference Engine<br />
	&nbsp;* Descripcion:<br />
	&nbsp;* Copyright:&nbsp;&nbsp;&nbsp; Copyright (c) 2001<br />
	&nbsp;* Empresa:<br />
	&nbsp;* @author P. Al.<br />
	&nbsp;* @version 1.0<br />
	&nbsp;*/<br />
	&nbsp;import java.util.Hashtable;<br />
	&nbsp;import java.util.Vector;<br />
	&nbsp;import java.sql.Connection;<br />
	&nbsp;<br />
	&nbsp;public class Kernel extends Thread {<br />
	&nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp;&nbsp; &nbsp;* KERNEL ATTRIBUTES<br />
	&nbsp;&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp;&nbsp; &nbsp;// process table<br />
	&nbsp;&nbsp; &nbsp;private final static Hashtable _PROCESSES = new Hashtable();<br />
	&nbsp;&nbsp; &nbsp;// system properties: loglevel, multiuser,...<br />
	&nbsp;&nbsp; &nbsp;private InferenczyProperties _SYSTEM_PROPERTIES = new InferenczyProperties();<br />
	&nbsp;&nbsp; &nbsp;// system interface<br />
	&nbsp;&nbsp; &nbsp;private SystemInterface _SI = null;<br />
	&nbsp;&nbsp; &nbsp;// log service<br />
	&nbsp;&nbsp; &nbsp;private static final Log _LOG = new Log();<br />
	&nbsp;&nbsp; &nbsp;// console output<br />
	&nbsp;&nbsp; &nbsp;private static final Printer _PRINTER = new Printer();<br />
	&nbsp;&nbsp; &nbsp;// XML Reader<br />
	&nbsp;&nbsp; &nbsp;private static final SystemXMLReader _XML_READER = new SystemXMLReader();<br />
	&nbsp;&nbsp; &nbsp;// database connection<br />
	&nbsp;&nbsp; &nbsp;private Connection _DBCONNECTION = null;<br />
	&nbsp;&nbsp; &nbsp;// database operations interface<br />
	&nbsp;&nbsp; &nbsp;private DBOperationsInterface _DBOPERATIONS_INTERFACE = null;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp;&nbsp; &nbsp;* method<br />
	&nbsp;&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;Kernel () {<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* run the Kernel<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public void run () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// first of all, load system properties.<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (!this.loadProperties()) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.err.println(&quot;Failed to load Properties file.&quot;);&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_SI = new SystemInterface(this);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;//setting properties.<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_LOG.setProperties(_SI);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_PRINTER.setProperties(_SI);&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_XML_READER.setProperties(_SI);&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_LOG.log(1,&quot;&lt;Kernel&gt; Kernel loaded.&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// now run first process: init (pid:1)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_LOG.log(1,&quot;&lt;Kernel&gt; starting init...&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;startProcess(&quot;com.javamercenary.ai.inferenczy.core.Init&quot;,1,1,1,1,1,&quot;Init program&quot;);<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* loadProperties<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;private boolean loadProperties () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return _SYSTEM_PROPERTIES.loadProperties();<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* getProperties<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public InferenczyProperties getProperties () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return&nbsp; _SYSTEM_PROPERTIES;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* startProcess<br />
	&nbsp;&nbsp; &nbsp;* return 0 if everything works well<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public int startProcess (String name,int PID,int UID,int GID,int STATE,int PRIORITY, String P_INFO) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Object o = null;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;try {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;o = Class.forName(name).newInstance();&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;} catch (ClassNotFoundException cnfe) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_LOG.log(1,&quot;Error on instantiation. Class not Found.&quot;+cnfe.getMessage());<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return -1;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;} catch (IllegalAccessException iae) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_LOG.log(1,&quot;Error on instantiation.Illegal Access&quot;+iae.getMessage());<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return -2;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;} catch (InstantiationException ie) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_LOG.log(1,&quot;Error on instantiation.&quot;+ie.getMessage());<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return -3;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;try {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (((Process) o).setAttributes(PID,UID,GID,STATE, PRIORITY,P_INFO,this._SI)) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;addProcess(((Process)o));<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;((Process) o).start();&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return 0;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;} catch (Exception e) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;removeProcess(new Integer(((Process)o).getPID()));<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_LOG.log(1,&quot;Error on instantiation.&quot;+e.getMessage());<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return -4;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	/**<br />
	* addProcess<br />
	*/<br />
	&nbsp;private boolean addProcess (Process p) {<br />
	&nbsp;&nbsp;&nbsp; &nbsp;try {<br />
	&nbsp;&nbsp; &nbsp;_PROCESSES.put(new Integer(p.getPID()),p); &nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return true;<br />
	&nbsp;&nbsp; &nbsp;} catch (Exception e) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_PRINTER.print(-1,&quot;Error starting process.\n&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return false;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	}<br />
	<br />
	/**<br />
	* removeProcess<br />
	*/<br />
	&nbsp;public boolean removeProcess (Integer pid) {<br />
	&nbsp;&nbsp;&nbsp; &nbsp;try {<br />
	&nbsp;&nbsp; &nbsp;_PROCESSES.remove(pid); &nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return true;<br />
	&nbsp;&nbsp; &nbsp;} catch (Exception e) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;_PRINTER.print(-1,&quot;Error deleting process.\n&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return false;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	}<br />
	<br />
	/**<br />
	* getProcessTable<br />
	*/<br />
	&nbsp;public Hashtable getProcessTable () { &nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;return _PROCESSES; &nbsp;&nbsp; &nbsp;<br />
	&nbsp;}<br />
	<br />
	/**<br />
	* log<br />
	*/<br />
	public boolean log (int loglevel, String message) {<br />
	&nbsp;&nbsp; &nbsp;return _LOG.log(loglevel,message);<br />
	}<br />
	<br />
	/**<br />
	* print<br />
	*/<br />
	public void print (int flag, String message) {<br />
	&nbsp;&nbsp; &nbsp; _PRINTER.print(flag,message);<br />
	}<br />
	<br />
	<br />
	/**<br />
	* setDBConnection<br />
	*/<br />
	public void setDBConnection (Connection conn) {<br />
	&nbsp;&nbsp; &nbsp;this._DBCONNECTION = conn;&nbsp;&nbsp; &nbsp;<br />
	}<br />
	<br />
	/**<br />
	* getDBConnection<br />
	*/<br />
	public Connection getDBConnection () {<br />
	&nbsp;&nbsp; &nbsp;return this._DBCONNECTION;&nbsp;&nbsp; &nbsp;<br />
	}<br />
	<br />
	/**<br />
	* setDBOperations<br />
	*/<br />
	public void setDBOperationsInterface (DBOperationsInterface dbo) {<br />
	&nbsp;&nbsp; &nbsp;this._DBOPERATIONS_INTERFACE = dbo;&nbsp;&nbsp; &nbsp;<br />
	}<br />
	<br />
	/**<br />
	* getDBOperations<br />
	*/<br />
	public DBOperationsInterface getDBOperationsInterface () {<br />
	&nbsp;&nbsp; &nbsp;return this._DBOPERATIONS_INTERFACE;&nbsp;&nbsp; &nbsp;<br />
	}<br />
	<br />
	/**<br />
	* readData<br />
	* @param String filename<br />
	* @param String[] elements<br />
	* @return Hashtable<br />
	*/<br />
	public Hashtable readData (String filename, String[] elements) {<br />
	&nbsp;&nbsp; &nbsp;return this._XML_READER.initParse(filename,elements);<br />
	}<br />
	<br />
	/**<br />
	* readData<br />
	* @param String filename<br />
	* @param String field<br />
	* @return Hashtable<br />
	*/<br />
	public Vector readData (String filename,String field) {<br />
	&nbsp;&nbsp; &nbsp;return this._XML_READER.initParse(filename,field);<br />
	}<br />
	}//end kernel<br />
	<br />
	<br />
	<strong>Vaya vaya, si es una especie de sistema operativo.</strong><br />
	Tiene properties, un sistema de logs, un printer que ser&aacute; para sacar mensajes por alg&uacute;n lado, una tabla de procesos, y un m&eacute;todo para crear nuevos procesos que hace uso del Reflection. Y aparte de getters y setters tiene como peculiar un interfaz para una BBDD y un lector de XML.<br />
	<br />
	B&aacute;sicamente el Kernel pone en marcha nuevas instancias de programas que heredan de la clase Process, la cual tiene esta pinta:<br />
	package com.javamercenary.ai.inferenczy.core;<br />
	<br />
	/**<br />
	&nbsp;* T&iacute;tulo:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inference Engine<br />
	&nbsp;* Descripcion:<br />
	&nbsp;* Copyright:&nbsp;&nbsp;&nbsp; Copyright (c) 2001<br />
	&nbsp;* Empresa:<br />
	&nbsp;* @author P. Al.<br />
	&nbsp;* @version 1.0<br />
	&nbsp;*/<br />
	&nbsp;<br />
	&nbsp;public abstract class Process extends Thread {<br />
	&nbsp;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp;&nbsp; &nbsp;* attributes<br />
	&nbsp;&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp;&nbsp; &nbsp;private int PID = -1 ;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;private int UID = 0;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;private int GID = 0;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;private int STATE = 0;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;private int PRIORITY = 0;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;private String P_INFO = &quot;&quot;;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;private long START_DATE;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;private SystemInterface _SI = null;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp;&nbsp; &nbsp;* constructors<br />
	&nbsp;&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp;&nbsp; &nbsp;public Process () {<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.START_DATE = System.currentTimeMillis();<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;&nbsp;&nbsp; &nbsp;public Process (int PID,int UID,int GID,int STATE,int PRIORITY, String P_INFO, SystemInterface _SI) {<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.PID = PID;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.UID = UID;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.GID = GID;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.PID = PID;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.PRIORITY = PRIORITY;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.P_INFO = P_INFO;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this._SI = _SI;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;&nbsp;&nbsp; &nbsp;public boolean setAttributes (int PID,int UID,int GID,int STATE,int PRIORITY, String P_INFO, SystemInterface _SI) {<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (PID == -1) return false;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.PID = PID;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.UID = UID;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.GID = GID;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.PID = PID;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.PRIORITY = PRIORITY;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.P_INFO = P_INFO;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this._SI = _SI;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return true;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;&nbsp;&nbsp; &nbsp;public&nbsp; int getPID (){<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return PID;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;public&nbsp; int getUID () {<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return UID;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;public&nbsp; int getGID () {<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return GID;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;public&nbsp; int getSTATE () {<br />
	&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;return STATE;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;public&nbsp; int setSTATE (int state) {<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return STATE = state;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;public&nbsp; int getPRIORITY () {<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return PRIORITY;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;public&nbsp; int setPRIORITY(int priority) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return PRIORITY = priority;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;public&nbsp; long getSTART_DATE() {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return START_DATE;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;public&nbsp; String getP_INFO () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return P_INFO;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;public&nbsp; SystemInterface get_SI () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return _SI;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;public&nbsp; String setP_INFO(String p_info) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return P_INFO = p_info;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;}<br />
	<br />
	<strong>Un Thread. </strong></p>
<p>
	El primer proceso que inicia el kernel es, como no pod&iacute;a ser menos Init. Y este hereda de process y lo que hace b&aacute;sicamente es cargar en el kernel una serie de procesos que tiene indicado dentro de init.d:<br />
	<br />
	package com.javamercenary.ai.inferenczy.core;<br />
	<br />
	/**<br />
	&nbsp;* T&iacute;tulo:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Inference Engine<br />
	&nbsp;* Descripcion:<br />
	&nbsp;* Copyright:&nbsp;&nbsp;&nbsp; Copyright (c) 2001<br />
	&nbsp;* Empresa:<br />
	&nbsp;* @author P. Al.<br />
	&nbsp;* @version 1.0<br />
	&nbsp;*/<br />
	&nbsp;import java.util.Vector;<br />
	<br />
	&nbsp;public class Init extends Process {<br />
	<br />
	&nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp;&nbsp; &nbsp;* method<br />
	&nbsp;&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp;&nbsp; &nbsp;public Init () {<br />
	&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;super();<br />
	&nbsp;&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;&nbsp; &nbsp;public Init (int PID,int UID,int GID,int STATE,int PRIORITY, String P_INFO, SystemInterface _SI) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;super(PID,UID,GID,STATE,PRIORITY,P_INFO, _SI);<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* run&nbsp; method<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;public void run () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;get_SI().log(1,&quot;&lt;Init&gt; Init started. [pid: &quot;+this.getPID()+&quot;]&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;loadProcesses();<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;while (true) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp;* loadProcesses<br />
	&nbsp;&nbsp; &nbsp;* load processes from init.d<br />
	&nbsp;&nbsp; &nbsp;*/<br />
	&nbsp;&nbsp; &nbsp;private boolean loadProcesses () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;String line = &quot;&quot;;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;int cont = 2;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;boolean errors = false;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Vector vclasses = null;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;try {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;vclasses = get_SI().readData(get_SI().getProperty(&quot;init.d&quot;),&quot;CLASSNAME&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;for (int i = 0;i&lt;vclasses.size();i++) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;get_SI().log(1,&quot;&lt;Init&gt; Loading &quot;+vclasses.elementAt(i)+&quot;... &quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (get_SI().startProcess((String)vclasses.elementAt(i),cont++,1,1,1,1,line) &lt; 0)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;errors = true;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (errors)<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;get_SI().log(1,&quot;&lt;Init&gt; Init finished with errors. Check init.d file.&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;else<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;get_SI().log(1,&quot;&lt;Init&gt; Init completed succesfully.&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return true;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;} catch (Exception e) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; get_SI().log(1,&quot;Failed loadin properties .Error: &quot;+e.getMessage());<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; return false;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;}<br />
	El sistema gira en torno al kernel. Y en resumen los procesos como el init y los recursos del sistema se comunican con el kernel a trav&eacute;s de un intermediario llamado SystemInterface. En el diagrama UML puedes hacerte una vaga idea de c&oacute;mo est&aacute; montado, y ver&aacute;s que las clases se acoplan y que todo es un poco infernal. Pero como digo... era joven e incosciente. Ahora ya soy simplemente joven y&nbsp; plenamente inconsciente. &iquest;o era simplemente inconsciente?</p>
<p>
	<a href="http://pello.info/images/diagrama_inf.png"><img alt="Diagrama" src="http://pello.info/images/diagrama_inf.png" style="width: 300px; height: 244px;" /></a><br />
	<br />
	<strong>Delirio total</strong><br />
	<br />
	Ojo que lo del sistema operativo no era m&aacute;s que una base para montar el motor de inferencia. Y lo pretencioso del tema es que quer&iacute;a crear programas escritos en XML. Es decir, era una especie de lenguaje de programaci&oacute;n gen&eacute;rico, al que por ejemplo se le podr&iacute;a hipot&eacute;ticamente aplicar un XSLT y convertir en un lenguaje concreto. Por ejemplo de un programa.xml podriamos tener un Programa.java y un Programa.cpp.<br />
	<br />
	Todo el proyecto est&aacute; ahora subido a google code. Echa un ojo a la carpeta Data donde encontrar&aacute;s el DTD: http://code.google.com/p/ozone/<br />
	<br />
	Para descargar por git:<br />
	<tt id="checkoutcmd_nouser">git clone https://code.google.com/p/ozone/</tt></p>
<p>
	O puedes descargar el zip original:</p>
<p>
	<a href="http://pello.info/filez/inf.zip">http://pello.info/filez/inf.zip</a></p>
<p>
	aunque existe otro original en alguna parte con otros procesos como el login y un shell... pero qui&eacute;n sabe d&oacute;nde.</p>
