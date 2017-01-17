<p>
	Las Javamon son criaturas java que viven la isla JVM y son instanciadas por maestros programadores para luchar en combate<br />
	&nbsp;<br />
	Este es un proyecto para montar un sistema de combate de javamon. El proyecto<br />
	&nbsp;consiste en tres clases:<br />
	<br />
	1- una Principal, la que inicia todo.<br />
	<br />
	2- Una clase llamada Javamon para representar a un Javamon<br />
	<br />
	3- Una clase Combate, que lleva a cabo el combate entre dos Javamones<br />
	<br />
	<br />
	<br />
	<strong>Principal</strong><br />
	La clase principal debe iniciar una par de Javamones, a los que se asignan los atributos de manera aleatoria siempre sumando un m&aacute;ximo de 18 puntos. Luego debe crear una instancia de la clase Combate pasando<br />
	&nbsp;los dos javamones al constructor.</p>
<p>
	/**<br />
	&nbsp;* Principal<br />
	&nbsp;* @author Pello<br />
	&nbsp;* greetz to all DAM1 sick people, go and get a life<br />
	&nbsp;*/<br />
	public class Principal {<br />
	<br />
	&nbsp;&nbsp; &nbsp;public static void main (String args[]) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Javamon uno = new Javamon(&quot;Pikachu&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Javamon otro = new Javamon(&quot;Bulbasaur&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Combate combate = new Combate(uno,otro);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Y el ganador es: &quot; + combate.resultado().getNombre());<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Gracias por usar JavaMon&quot;);<br />
	&nbsp;&nbsp; &nbsp;}<br />
	}<br />
	<br />
	<strong>La clase javamon</strong></p>
<p>
	Esta clase contiene al bicho, el javamon y sus m&eacute;todos.</p>
<p>
	import java.util.Random;<br />
	<br />
	/**<br />
	&nbsp;*<br />
	&nbsp;* @author Pello<br />
	&nbsp;* greetz Vigor jauna, 2DAMeko ikaslea<br />
	&nbsp;*/<br />
	public class Javamon {<br />
	&nbsp;&nbsp; &nbsp;private String nombre;<br />
	&nbsp;&nbsp; &nbsp;private int fuerza;<br />
	&nbsp;&nbsp; &nbsp;private int defensa;<br />
	&nbsp;&nbsp; &nbsp;private int agilidad;<br />
	&nbsp;&nbsp; &nbsp;private int vida;<br />
	&nbsp;&nbsp; &nbsp;private Random aleatorio = new Random();<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * Javamon<br />
	&nbsp;&nbsp; &nbsp; * constructor con par&aacute;metro<br />
	&nbsp;&nbsp; &nbsp; * @param nombre<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public Javamon(String nombre) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.nombre = nombre;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;inicializarAtributos();<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * inicializarAtributos<br />
	&nbsp;&nbsp; &nbsp; * inicializa los atributos del javamon<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;private void inicializarAtributos () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;int puntos_a_repartir = 18;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// a qu&eacute; atributo le daremos puntos en cada vuelta<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;int aque = 0;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// m&aacute;ximo de puntos que podemos dar<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;int max = 0;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// en principio valen 0<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;fuerza = defensa = agilidad = 0;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;while (puntos_a_repartir &gt; 0) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;aque = aleatorio.nextInt(3);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;switch (aque) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;case 0:<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;fuerza++;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;break;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;case 1:<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;defensa++;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;break;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;case 2:<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;agilidad ++;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;break;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;default: break; // esto por man&iacute;a. nevermind<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// y vamos restando...<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;puntos_a_repartir--;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Y la vida depender&aacute; de F y D<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;vida = fuerza + defensa + 6;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * iniciativa<br />
	&nbsp;&nbsp; &nbsp; * representa una tirada de iniciativa<br />
	&nbsp;&nbsp; &nbsp; * @return<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public int iniciativa () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return agilidad + aleatorio.nextInt(6);<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * atacar<br />
	&nbsp;&nbsp; &nbsp; * representa una tirada de atacar<br />
	&nbsp;&nbsp; &nbsp; * @return<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public int atacar () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return fuerza + aleatorio.nextInt(6);&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * defender<br />
	&nbsp;&nbsp; &nbsp; * representa una tirada de defensa<br />
	&nbsp;&nbsp; &nbsp; * @return<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public int defender () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return ((agilidad + defensa) /2 ) + aleatorio.nextInt(6);<br />
	<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * estado<br />
	&nbsp;&nbsp; &nbsp; * un resumen del javamon: vida y atributos<br />
	&nbsp;&nbsp; &nbsp; * @return<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public String estado (){<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return nombre +&quot;(&quot; + vida + &quot;)| F:&quot; + fuerza + &quot;| D:&quot; + defensa + &quot;| A:&quot; + agilidad;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * @return the nombre<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public String getNombre() {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return nombre;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * @return the fuerza<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public int getFuerza() {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return fuerza;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * @return the defensa<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public int getDefensa() {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return defensa;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * @return the agilidad<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public int getAgilidad() {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return agilidad;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * @return the vida<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public int getVida() {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return vida;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * @param vida<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public void setVida(int vida) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.vida = vida;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	<br />
	}<br />
	&nbsp;</p>
<p>
	<strong>La clase combate</strong><br />
	<br />
	La clase combate desde el constructor debe llamar al m&eacute;todo privado combatir<br />
	&nbsp;que en un bucle de llamadas al m&eacute;todo asalto determinar&aacute; qui&eacute;n gana.<br />
	<br />
	Para combatir se hace lo siguiente:<br />
	<br />
	1.Los javamones llaman al m&eacute;todo inciativa. El que tenga m&aacute;s valor e inicia el asalto<br />
	<br />
	2.el m&eacute;todo asalto tienes dos Javamones como par&aacute;metros. El primero ataca y el otro defiende. dentro de &eacute;l se restan puntos de vida.<br />
	<br />
	3.mientras a los dos les queden puntos de vida se siguen zumbando.</p>
<p>
	/**<br />
	&nbsp;*<br />
	&nbsp;* @author Pello<br />
	&nbsp;* greetz lafu<br />
	&nbsp;*/<br />
	public class Combate {<br />
	&nbsp;&nbsp; &nbsp;private Javamon javamon1;<br />
	&nbsp;&nbsp; &nbsp;private Javamon javamon2;<br />
	&nbsp;&nbsp; &nbsp;private int asaltos = 0;<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * Combate<br />
	&nbsp;&nbsp; &nbsp; * constructor de la clase<br />
	&nbsp;&nbsp; &nbsp; * @param javamon1<br />
	&nbsp;&nbsp; &nbsp; * @param javamon2<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public Combate (Javamon javamon1, Javamon javamon2) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.javamon1 = javamon1;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;this.javamon2 = javamon2;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;combatir();<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * combatir<br />
	&nbsp;&nbsp; &nbsp; * m&eacute;todo que lleva a cabo el combate<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;private void combatir () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;Javamon primero, segundo;<br />
	<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;do {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Contaremos los asaltos.<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;asaltos++;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Segun iniciativa uno ataca y el otro defiende<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (javamon1.iniciativa() &lt; javamon2.iniciativa()) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;primero = javamon2;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;segundo = javamon1;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;} else {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;primero = javamon1;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;segundo = javamon2;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(primero.estado() +&quot; ATACA A &quot;+ segundo.estado());<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;asalto(primero, segundo);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// mientras los dos tengan vida, se siguen pegando.<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;} while (primero.getVida() &gt; 0 &amp;&amp; segundo.getVida() &gt; 0);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * asalto<br />
	&nbsp;&nbsp; &nbsp; * representa un asalto entre un javamon y otro.<br />
	&nbsp;&nbsp; &nbsp; * seg&uacute;n a qui&eacute;n le toque el par&aacute;metro ser&aacute; uno u otro.<br />
	&nbsp;&nbsp; &nbsp; * El primero es el que ataca<br />
	&nbsp;&nbsp; &nbsp; * @param jm1<br />
	&nbsp;&nbsp; &nbsp; * @param jm2<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;private void asalto (Javamon jm1, Javamon jm2) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// El da&ntilde;o del asalto ser&aacute; el ataque de uno menos la defensa del otro<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;int dano = (jm1.atacar() - jm2.defender());<br />
	<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// Restamos los puntos de da&ntilde;o de la vida del segundo<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;// siempre que se haya hecho da&ntilde;o claro<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (dano &gt; 0) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(jm1.getNombre() + &quot; resta &quot; + dano + &quot; da&ntilde;o a &quot; + jm2.getNombre());<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;jm2.setVida(jm2.getVida() - dano);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;} else {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(jm2.getNombre() + &quot; neutraliza el ataque!!&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	&nbsp;&nbsp; &nbsp;/**<br />
	&nbsp;&nbsp; &nbsp; * resultado<br />
	&nbsp;&nbsp; &nbsp; * devuelve el javamon vencedor<br />
	&nbsp;&nbsp; &nbsp; * @return el javamon vencedor<br />
	&nbsp;&nbsp; &nbsp; */<br />
	&nbsp;&nbsp; &nbsp;public Javamon resultado () {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;System.out.println(&quot;Total &quot; + asaltos + &quot; asaltos&quot;);<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;if (javamon1.getVida() &gt; 0) {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return javamon1;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;} else {<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;return javamon2;<br />
	&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;}<br />
	&nbsp;&nbsp; &nbsp;<br />
	}<br />
	<br />
	<br />
	<br />
	<br />
	Todo eso ocurren autom&aacute;ticamente, y luego el m&eacute;todo principal debe llamar al m&eacute;todo<br />
	&nbsp;de combate.resultado() que le devolver&aacute; la instancia del Javamon vencedor.</p>
<p>
	Pikachu(17)| F:7| D:4| A:7 ATACA A Bulbasaur(17)| F:7| D:4| A:7<br />
	Bulbasaur neutraliza el ataque!!<br />
	Pikachu(17)| F:7| D:4| A:7 ATACA A Bulbasaur(17)| F:7| D:4| A:7<br />
	Pikachu resta 2 da&ntilde;o a Bulbasaur<br />
	Pikachu(17)| F:7| D:4| A:7 ATACA A Bulbasaur(15)| F:7| D:4| A:7<br />
	Pikachu resta 5 da&ntilde;o a Bulbasaur<br />
	Bulbasaur(10)| F:7| D:4| A:7 ATACA A Pikachu(17)| F:7| D:4| A:7<br />
	Pikachu neutraliza el ataque!!<br />
	Bulbasaur(10)| F:7| D:4| A:7 ATACA A Pikachu(17)| F:7| D:4| A:7<br />
	Bulbasaur resta 5 da&ntilde;o a Pikachu<br />
	Pikachu(12)| F:7| D:4| A:7 ATACA A Bulbasaur(10)| F:7| D:4| A:7<br />
	Pikachu resta 1 da&ntilde;o a Bulbasaur<br />
	Pikachu(12)| F:7| D:4| A:7 ATACA A Bulbasaur(9)| F:7| D:4| A:7<br />
	Bulbasaur neutraliza el ataque!!<br />
	Pikachu(12)| F:7| D:4| A:7 ATACA A Bulbasaur(9)| F:7| D:4| A:7<br />
	Pikachu resta 2 da&ntilde;o a Bulbasaur<br />
	Bulbasaur(7)| F:7| D:4| A:7 ATACA A Pikachu(12)| F:7| D:4| A:7<br />
	Pikachu neutraliza el ataque!!<br />
	Bulbasaur(7)| F:7| D:4| A:7 ATACA A Pikachu(12)| F:7| D:4| A:7<br />
	Bulbasaur resta 2 da&ntilde;o a Pikachu<br />
	Pikachu(10)| F:7| D:4| A:7 ATACA A Bulbasaur(7)| F:7| D:4| A:7<br />
	Pikachu resta 5 da&ntilde;o a Bulbasaur<br />
	Bulbasaur(2)| F:7| D:4| A:7 ATACA A Pikachu(10)| F:7| D:4| A:7<br />
	Bulbasaur resta 5 da&ntilde;o a Pikachu<br />
	Pikachu(5)| F:7| D:4| A:7 ATACA A Bulbasaur(2)| F:7| D:4| A:7<br />
	Pikachu resta 1 da&ntilde;o a Bulbasaur<br />
	Pikachu(5)| F:7| D:4| A:7 ATACA A Bulbasaur(1)| F:7| D:4| A:7<br />
	Bulbasaur neutraliza el ataque!!<br />
	Pikachu(5)| F:7| D:4| A:7 ATACA A Bulbasaur(1)| F:7| D:4| A:7<br />
	Bulbasaur neutraliza el ataque!!<br />
	Bulbasaur(1)| F:7| D:4| A:7 ATACA A Pikachu(5)| F:7| D:4| A:7<br />
	Pikachu neutraliza el ataque!!<br />
	Pikachu(5)| F:7| D:4| A:7 ATACA A Bulbasaur(1)| F:7| D:4| A:7<br />
	Bulbasaur neutraliza el ataque!!<br />
	Pikachu(5)| F:7| D:4| A:7 ATACA A Bulbasaur(1)| F:7| D:4| A:7<br />
	Pikachu resta 1 da&ntilde;o a Bulbasaur<br />
	Total 18 asaltos<br />
	Y el ganador es: Pikachu<br />
	Gracias por usar JavaMon<br />
	&nbsp;</p>
