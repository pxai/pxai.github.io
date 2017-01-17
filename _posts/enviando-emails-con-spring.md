<p>Para convertirme en un auténtico frontender me he agenciado unas super gafas de pasta de un grosor lo suficientemente desmesurado como para hacerme respetar en la tribu del asincronismo y de los programas de cuatro líneas. Nótese el tintado rojizo
de las lentes que me proporcionan una experiencia mucho más responsiva con el entorno que me rodea. Por si no lo sabías, los cristales negros están deprecados.</p>

<img src="http://www.pello.info/images/ultrakwel.jpg" alt="Frontender ultra cool glasses" title="Sí, usé un cartón de leche del Mercadona, yeah!!!" />

<p>Pero en este post, voy a dejar descansar esas gafas tan cool para volver a dedicarle un poco de atención a cosas supuestamente rigurosas/orientadas a empresa y a JEE como el framework Spring. Aunque ahora que Java va a tener <a href="http://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html">expresiones lambda</a> no sé yo... clases y funciones anónimas ¿tú también Java?
</p>

<p>
Spring contiene un montón de beans auxiliares que te permiten trabajar con las clases de JEE pero de manera mucho más fácil, al estilo Spring: eliminando el boilerplate (código que debes repetir una y otra vez como en el jdbc), facilitando la inyección de dependencias y por tanto las pruebas unitarias. Esta vez nos toca ver cómo sustituye o tapa las dificultades de javamail y nos facilita la vida para hacer algo tan simple y necesario como poder mandar un email desde un programa. En concreto veremos cómo mandar emails con adjuntos a través de una cuenta gmail. 
</p>

<h5>El mailer</h5>
<p>Esta es la clase que utiliza el potencial de Spring para crear un email, añadirle
adjuntos y enviarlo. Desde el fichero de configuración de Spring se le inyecta una instancia del objeto que mandará el email. Es todo bastante sencillo y verdaderamente, la mayor dificultad de enviar el email reside en acertar con la configuración necesaria de smtp. En este caso he probado con gmail y ya se sabe que se usa un puerto cifrado y tiene unas necesidades de configuración más especiales.
</p>
<pre class="brush: java">
package info.pello.spring.mail;

import java.util.Vector;

import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

/**
 * Sends emails using Spring framework facilities
 * mail server config resides in context + properties files
 * @author Pello Xabier Altadill Izura
 * @greetz For those who prefer c# rather than vb
 */
public class Emailer {
	
	private JavaMailSender mailSender;
	
	private Vector<Resource> attachments = new Vector<Resource>();
	private String from;
	private String to;
	private String subject;
	private String text;
	
	/**
	 * default constructor
	 */
	public Emailer () {
		
	}
	
	/**
	 * @param from
	 * @param to
	 * @param subject
	 * @param text
	 */
	public Emailer(String from, String to, String subject, String text) {
		this.from = from;
		this.to = to;
		this.subject = subject;
		this.text = text;
	}

	/**
	 * sends email with attachments if any
	 * @return
	 */
	public boolean send () {
		boolean result = false;
		 MimeMessage message = mailSender.createMimeMessage();
		    MimeMessageHelper helper;
		try {
				helper = new MimeMessageHelper(message, true);
		
		    helper.setFrom(from);
		    helper.setTo(to);
		    helper.setSubject(subject);
		    helper.setText(text);

		    // For each filename in attachment Vector
		    // we add an attachment
		    for (int i =0;i< attachments.size();i++)
		    	helper.addAttachment(attachments.get(i).getFilename(), attachments.get(i));
		    
		    mailSender.send(message);   
		    attachments.clear(); 
                    result = true;
		} catch (MessagingException e) {
			System.err.println("MessagingException :" + e.getMessage());
		} catch (Exception e) {
			System.err.println("General Exception :" + e.getMessage());				
		}
		return result;
	}
	
	/**
	 * adds an attachment to our email
	 * @param fileName
	 */
	public void addAttachment(Resource fileName) {
		attachments.add(fileName);
	}

	/**
	 * @return the mailSender
	 */
	public JavaMailSender getMailSender() {
		return mailSender;
	}

	/**
	 * @param mailSender the mailSender to set
	 */
	public void setMailSender(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Emailer [from=" + from + ", to=" + to + ", subject=" + subject
				+ "]";
	}

	// Getters/Setters
	// ...
}

</pre>

<p>Para poder encontrar el adjunto lo he metido en la carpeta resources y luego lo cargo en la raíz del classpath. También podría usar una ruta absoluta con file:/// o si te buscas la vida lo haces de otra manera. La cosa era probar que el adjunto se cargaba bien.</p>

<h5>Ojo al fichero de configuración</h5>
<p>En el fichero de configuración he metido dos beans: por un lado necesito un bean
para envío de correos que nos proporciona spring. Ese bean lo configuramos con una serie
de propiedades que por seguridad/comodidad las tenemos en un fichero aparte, en la misma carpeta que este fichero xml. Para que eso funcione hemos aplicado una propiedad context:property-placeholder indicándole dónde
se encuentra ese fichero. Esto es similar a lo que comentaba hace poco con <a href="http://www.pello.info/index.php/blog/perfiles-de-desarrollo-y-produccion-con-maven">Maven y los perfiles</a>. Luego comento opciones, de momento este es el aspecto que tiene la config de Spring, muy simple:</p>
<pre class="brush: xml">
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
						http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
						http://www.springframework.org/schema/context
						http://www.springframework.org/schema/context/spring-context-3.0.xsd">


<!-- With this we can get some property values from
another file an so we don't have to show any password here.
It's worth mentioning that this property values will populate not
only to this file but also to annotations in source code. -->
<context:property-placeholder
	location="emailer.properties" />

<!-- Springs mail Sender implementation.
Note the variables ${} their values come from properties file.
In this case I'm using gmail and It's a bit tricky as you see.
 -->
 <bean id="mailSender" 
      class="org.springframework.mail.javamail.JavaMailSenderImpl">
        <property name="host" value="${host}" /><!-- For gmail: smtp.gmail.com -->
        <property name="port" value="${port}" /><!-- Port: 587 -->
        <property name="protocol" value="smtp" />
    	<property name="username" value="${username}" />
    	<property name="password" value="${password}" />
        <property name="javaMailProperties">
            <props>
                <prop key="mail.smtp.auth">true</prop>
                <prop key="mail.smtp.starttls.enable">true</prop>
                <prop key="mail.smtp.quitwait">false</prop>
            </props>
        </property>
  </bean>

<bean id="emailer" class="info.pello.spring.mail.Emailer">
	<property name="mailSender" ref="mailSender" />
</bean>  
</beans>

</pre>

<p>Francamente diría que la opción de usar Maven es más completa en un principio, peeero: si lo hacemos a la manera de Spring <b>las properties pueden extenderse incluso hasta las anotaciones de las clases Java</b>: ¡¡crema!! Se puede hacer algo intermedio. Usar la opción de Maven pero para rellenar el fichero de Spring en una sección util-properties id='defaultConfiguration' referenciada en un property-placeholder. Con eso tendremos los perfiles desarrollo/producción y conseguiremos llenar la config de Spring y este pasará los valores a las anotaciones. 
</p>


<h5>App.java la clase principal</h5>
<p>Esta es la clase que contiene el método main, carga el bean Emailer del fichero de contexto, prepara un email con un adjunto sacado del classpath y lo manda.
</p>
<pre class="brush: java">
package info.pello.spring.mail;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Main App, gets an instance from Spring context and sends an email.
 * @author Pello Xabier Altadill Izura
 * @greetz those who receive an email using this emailer. 
 */
public class App {

    public static void main (String args[]) {
		ApplicationContext context = new ClassPathXmlApplicationContext("springmailer.xml");
		
		Emailer emailer = (Emailer) context.getBean("emailer");
                
        System.out.println("Preparing email: ");
        emailer.setFrom("pello_altadill@cuatrovientos.org");
        emailer.setTo("pello_altadill@cuatrovientos.org");
        emailer.setSubject("testing Spring email");
        emailer.setText("Hola. Correo en castellano.");
        emailer.addAttachment(context.getResource("ultrakwel.jpg"));
       
        if (emailer.send()) {
        	System.out.println("OK Email Sended! " + emailer.toString());
        }
    }
}

</pre>

<p>
He mandado algún email de prueba, esperemos que lleguen.
</p>