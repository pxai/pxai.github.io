<p>
	Este midlet tiene varias partes:</p>
<ol>
	<li>
		Por un lado est&aacute; el Midlet o aplicaci&oacute;n para el m&oacute;vil</li>
	<li>
		Una clase tipo Canvas para hacer los gr&aacute;ficos</li>
	<li>
		Una clase hilo que se utiliza para que el canvas pinte una y otra vez con pausas.</li>
</ol>
<p>
	/*<br />
	&nbsp;* RandomCircles<br />
	&nbsp;* Midlet que usa una pantalla de tipo Canvas para crear gr&aacute;ficos<br />
	&nbsp;*/<br />
	package hello;<br />
	<br />
	import javax.microedition.midlet.*;<br />
	import javax.microedition.lcdui.*;<br />
	import java.util.*;<br />
	<br />
	public class InfiniteCircles extends MIDlet implements CommandListener {<br />
	&nbsp;&nbsp;&nbsp; private Command exitCommand;<br />
	&nbsp;&nbsp;&nbsp; private Display pantalla;<br />
	&nbsp;&nbsp;&nbsp; private CanvasForInfinite screen;<br />
	&nbsp;&nbsp;&nbsp; private Repainter repintar;<br />
	<br />
	&nbsp;&nbsp;&nbsp; public InfiniteCircles () {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Tomamos la pantalla<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pantalla = Display.getDisplay(this);<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Creamos el comando para salir<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; exitCommand = new Command(&quot;Exit&quot;, Command.EXIT, 2);<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Asociamos a Screen nuestro Canvas especial<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; screen = new CanvasForInfinite();<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Establecemos el comando para salir<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; screen.addCommand(exitCommand);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; screen.setCommandListener(this);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; repintar = new Repainter(pantalla,screen);<br />
	&nbsp;&nbsp;&nbsp; }<br />
	<br />
	&nbsp;&nbsp;&nbsp; /**<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * startApp<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * se ejecuta al inicio de la aplicaci&oacute;n<br />
	&nbsp;&nbsp;&nbsp;&nbsp; */<br />
	&nbsp;&nbsp;&nbsp; public void startApp() throws MIDletStateChangeException {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Establecemos el formulario en la pantalla<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; pantalla.setCurrent(screen);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; repintar.start();<br />
	&nbsp;&nbsp;&nbsp; }<br />
	<br />
	&nbsp;&nbsp;&nbsp; /**<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * pauseApp<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * se ejecuta en caso de pausar la aplicaci&oacute;n<br />
	&nbsp;&nbsp;&nbsp;&nbsp; */<br />
	&nbsp;&nbsp;&nbsp; public void pauseApp() {<br />
	&nbsp;&nbsp;&nbsp; }<br />
	<br />
	&nbsp;&nbsp;&nbsp; /**<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * destroyApp<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * se ejecuta al terminar la aplicaci&oacute;n<br />
	&nbsp;&nbsp;&nbsp;&nbsp; */<br />
	&nbsp;&nbsp;&nbsp; public void destroyApp(boolean unconditional) {<br />
	&nbsp;&nbsp;&nbsp; }<br />
	<br />
	&nbsp;&nbsp;&nbsp; public void commandAction(Command c, Displayable s) {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (c == exitCommand) {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; destroyApp(false);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; notifyDestroyed();<br />
	&nbsp;&nbsp;&nbsp;&nbsp; }<br />
	&nbsp;&nbsp;&nbsp; }<br />
	}<br />
	<br />
	class CanvasForInfinite extends Canvas&nbsp; {<br />
	<br />
	&nbsp;&nbsp;&nbsp; // Dentro de canvas debe existir esta funci&oacute;n<br />
	&nbsp;&nbsp;&nbsp; public void paint(Graphics g) {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Declaramos variables para coordenadas, anchura, altura y radio<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; int x,y,w,h,r,maxx, maxy;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Variable para generar n&uacute;meros aleatorios<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Random rnd = new Random();<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; maxx= maxy = x = y = w = h = r = 0;<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; maxx = this.getWidth();<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; maxy = this.getHeight();<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //try {<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; for (int i = 0;i&lt;5;i++)<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Establecemos color (r,g,b)<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; g.setColor( rnd.nextInt(255),&nbsp; rnd.nextInt(255), rnd.nextInt(255));<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //g.drawArc(rnd.nextInt(maxx), rnd.nextInt(maxy), maxx/2, maxy/2, 0, 360);<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Para hacer estrellas<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //g.drawArc(rnd.nextInt(maxx), rnd.nextInt(maxy), 1, 1, 0, 360);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; g.drawArc(rnd.nextInt(maxx), rnd.nextInt(maxy), rnd.nextInt(4), rnd.nextInt(4), 0, 360);<br />
	<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // dibujamos un arco, completo: 360<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //g.drawArc(rnd.nextInt(maxx), rnd.nextInt(maxy), rnd.nextInt(), rnd.nextInt(), 0, 360);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //g.drawString(&quot;Epa&quot;, 0, 0, Graphics.HCENTER | Graphics.TOP);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //g.drawString(&quot;Vamos&quot;,(getWidth() / 2),0 Graphics.HCENTER | Graphics.TOP);<br />
	&nbsp; /*<br />
	&nbsp;&nbsp; } catch (InterruptedException iex) {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; g.drawString(&quot;Excepci&oacute;n: &quot; + iex.getMessage(), 0, 0, Graphics.HCENTER | Graphics.TOP);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
	&nbsp; */<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
	}</p>
<p>
	&nbsp;</p>
<p>
	//<br />
	// Y ahora la clase tipo runnable, es decir, un thread que se ejecuta en paralelo al midlet.<br />
	// Sacada de las demos de sun</p>
<p>
	/*<br />
	&nbsp;* To change this template, choose Tools | Templates<br />
	&nbsp;* and open the template in the editor.<br />
	&nbsp;*/<br />
	<br />
	package hello;<br />
	<br />
	import javax.microedition.lcdui.Canvas;<br />
	import javax.microedition.lcdui.Display;<br />
	<br />
	/**<br />
	&nbsp;* Class periodically repainting the canvas with all the balls.<br />
	&nbsp;*/<br />
	public class Repainter implements Runnable {<br />
	<br />
	&nbsp;&nbsp;&nbsp; /* target display */<br />
	&nbsp;&nbsp;&nbsp; private Display display;<br />
	&nbsp;&nbsp;&nbsp; /* canvas to repaint */<br />
	&nbsp;&nbsp;&nbsp; private Canvas canvas;<br />
	&nbsp;&nbsp;&nbsp; /* whether the repainting is stopped */<br />
	&nbsp;&nbsp;&nbsp; private boolean stop;<br />
	<br />
	&nbsp;&nbsp;&nbsp; /**<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * Creates a new instance of repainter.<br />
	&nbsp;&nbsp;&nbsp;&nbsp; *<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * @param display Target display<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * @param canvas&nbsp; Canvas to repaint<br />
	&nbsp;&nbsp;&nbsp;&nbsp; */<br />
	&nbsp;&nbsp;&nbsp; public Repainter (Display display, Canvas canvas) {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.display = display;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.canvas = canvas;<br />
	&nbsp;&nbsp;&nbsp; }<br />
	<br />
	&nbsp;&nbsp;&nbsp; /**<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * Starts the repainter<br />
	&nbsp;&nbsp;&nbsp;&nbsp; */<br />
	&nbsp;&nbsp;&nbsp; public void start () {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; stop = false;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; run ();<br />
	&nbsp;&nbsp;&nbsp; }<br />
	<br />
	&nbsp;&nbsp;&nbsp; /**<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * Stops the repainter<br />
	&nbsp;&nbsp;&nbsp;&nbsp; */<br />
	&nbsp;&nbsp;&nbsp; public void stop () {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; stop = true;<br />
	&nbsp;&nbsp;&nbsp; }<br />
	<br />
	&nbsp;&nbsp;&nbsp; /**<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * Actual repainting process being performed serially with actual display<br />
	&nbsp;&nbsp;&nbsp;&nbsp; * updates.<br />
	&nbsp;&nbsp;&nbsp;&nbsp; */<br />
	&nbsp;&nbsp;&nbsp; public void run () {<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (stop) {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return;<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; try {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // avoid insane repainting<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Thread.sleep (5);<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; catch (InterruptedException e) {<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; // Never mind<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br />
	<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; canvas.repaint ();<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; display.callSerially (this);<br />
	&nbsp;&nbsp;&nbsp; }<br />
	}<br />
	&nbsp;</p>
