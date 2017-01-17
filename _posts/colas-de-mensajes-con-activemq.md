<p>Las MQ o Message Queues son gestores de colas de mensajes que permiten la comunicación ASÍNCRONA
entre programas. Antaño (toju, toju, a principios de siglo) era frecuente que en cualquier proyecto
monstruoso de esos que montaban las consultoras además de Oracle, Java y Weblogic también hubiera
el MQSeries de IBM.
</p>
<p>¿Qué tiene de útil la comuinicación asíncrona? En este tipo de comunicaciones el emisor NO se queda
esperando a que el receptor reciba el mensaje. El emisor <em>deja</em> el mensaje en una cola y sigue
a los suyo, <b>no se queda bloqueado</b>. Mientras tanto, si hay algún receptor/consumidor del mensaje
irá y lo recogerá. La comunicación no es instantánea, pero es que sirve para escenarios en los que no es algo fundamental. Es como cuando queremos decirle algo a alguien y le dejamos una nota en la mesa porque tenemos cosas que hacer o como hacen en algunos restaurantes en los que el camarero va dejando notas a la cocina y sigue atendiendo el mostrador.</p>

<h5>Punto a punto / Suscripción</h5>
<p>Existen dos formas básicas de mensajería en la colas. En la punto a punto solamente hay un emisor y  receptor y cada mensaje sera recogido únicamente por ese receptor. En la suscripción el emisor publica los
mensajes en lo que se denomina un <em>topic</em> (tema) y puede haber más de un receptor que lea
esos mensajes. </p>
<p>¿A qué viene este inusitado interés en las colas? (perdón) Porque ahora en verano le doy al Spring, y Spring
tiene soporte para facilitar el acceso a colas de mensajes. En este post vamos a ver el acceso a pelo,
usando programas java con JMS, las librerías que java trae de serie para las MQ. ¿Y qué servidor
usaremos para gestionar las colas de mensajes? Uno grande y libre (oops), el apache activemq. Las
colas de mensajes como esta vuelven a la palestra porque tienen soporte para websockets con lo que
podemos hacer <a href="http://eugeniaperez.es/wordpress/?p=417" title="Ejemplo de websockets desde js como que mola más">cosas molonas desde JS</a>.</p>

<h5>Apache ActiveMQ</h5>
<p>En mi caso me he desargado apache-activemq-5.9-20130727.033339-82-bin.tar.gz, y me lo he descomprimido
dentro de /opt en LINUX. Al principio da un poco de cosa porque parece el típico caos que voy a tener que iniciar a mano. El caso es que hay unos comandos con los que se puede preparar para su ejecución como
un servidor más del sistema. <br /> Si ejecuto:</p>
<pre class="brush: bash">
linux:/opt/activemq/bin# ./activemq setup /etc/default/activemq
INFO: Creating configuration file: /etc/default/activemq
INFO: It's recommend to limit access to '/etc/default/activemq' to the priviledged user
INFO: (recommended: chown 'root':nogroup '/etc/default/activemq'; chmod 600 '/etc/default/activemq')
linux:/opt/activemq/bin# 
</pre>

<p>
Y ahora lo puedo iniciar:
</p>
<pre class="brush: bash">
linux:/opt/activemq/bin# ./activemq start
INFO: Loading '/etc/default/activemq'
INFO: Using java '/usr/bin/java'
INFO: Starting - inspect logfiles specified in logging.properties and log4j.properties to get details
INFO: pidfile created : '/opt/activemq/data/activemq-bt.pid' (pid '5277')
linux:/opt/activemq/bin# 
</pre>

<p>Esto no es del todo necesario si luego investigamos un poco lo que trae activemq. La sensación que
me ha quedado es que está bien montado, trae ejemplos, y simplemente funciona que es de lo que se trata.
Estos son los contenidos de activeMQ</p>
<ul>
<li><b>bin</b>: los "binarios" de iniciación que no son tales sino scripts</li>
<li><b>libs</b>: librerías, ficheros *.jar esenciales y opcionales</li>
<li><b>conf</b>: configuración de activemq</li>
<li><b>examples</b>: ejemplos de aplicaciones java y ruby con un build de ant listo para arrancar.</li>
<li><b>data</b>: directorio para guardar datos, puede usarse o no si establecemos persistencia</li>
<li><b>webapps/webapps-demo</b>: aplicaciones web de ejemplo (websockets por ejemplo), incluyendo un gestor web de activemq.</li>
</ul>

<h5>Ejecutando distintas configuraciones</h5>
<p>La sorpresa con activemq ha sido la forma de ejecutar el servidor con distintas configuraciones.
Si probamos esto pondrá en marcha el mq.</p>
<pre class="brush: bash">
linux:/opt/activemq# bin/activemq console xbean:conf/activemq.xml
INFO: Loading '/etc/default/activemq'
INFO: Using java '/usr/bin/java'
INFO: Starting in foreground, this is just for debugging purposes (stop process by pressing CTRL+C)
Java Runtime: Sun Microsystems Inc. 1.6.0_20 /usr/lib/jvm/java-6-openjdk/jre
  Heap sizes: current=1013632k  free=1002447k  max=1013632k
    JVM args: -Xms1G -Xmx1G -Djava.util.logging.config.file=logging.properties -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote -Djava.awt.headless=true -Djava.io.tmpdir=/opt/activemq/tmp -Dactivemq.classpath=/opt/activemq/conf; -Dactivemq.home=/opt/activemq -Dactivemq.base=/opt/activemq -Dactivemq.conf=/opt/activemq/conf -Dactivemq.data=/opt/activemq/data
Extensions classpath:
  [/opt/activemq/lib,/opt/activemq/lib/camel,/opt/activemq/lib/optional,/opt/activemq/lib/web,/opt/activemq/lib/extra]
ACTIVEMQ_HOME: /opt/activemq
ACTIVEMQ_BASE: /opt/activemq
ACTIVEMQ_CONF: /opt/activemq/conf
ACTIVEMQ_DATA: /opt/activemq/data
Loading message broker from: xbean:conf/activemq.xml
...
</pre>

<p>Vale, ¿qué es ese fichero <code>conf/activemq.xml</code>? Oh sorpresa, es un <b>fichero de
contexto de Spring</b>. Todo lo que necesitamos para ejecutar activemq es una JVM, el resto
funciona y lo puede hacer con Spring. si echamos un ojo a ese fichero, que está ampliamente
documentado podemos ver y entender la configuración del activemq, como por ejemplo
los distintos protocolos que puede soportar:</p>
<pre class="brush: java">
        <!--
            The transport connectors expose ActiveMQ over a given protocol to
            clients and other brokers. For more information, see:

            http://activemq.apache.org/configuring-transports.html
        -->
        <transportConnectors>
            <!-- Create a TCP transport that is advertised on via an IP multicast
              group named default. -->
            <transportConnector name="openwire" uri="tcp://localhost:61616" discoveryUri="multicast://default"/>
            <!-- Create a SSL transport. Make sure to configure the SSL options
              via the system properties or the sslContext element. -->
            <transportConnector name="ssl" uri="ssl://localhost:61617"/>
            <!-- Create a STOMP transport for STOMP clients. -->
            <transportConnector name="stomp" uri="stomp://localhost:61613"/>
            <!-- Create a Websocket transport for the websocket dmeo -->
            <transportConnector name="ws" uri="ws://localhost:61614/" />
        </transportConnectors>
</pre>
<p>... así como las opciones de persistencia para las que basta con especificar un datasource.</p>

<p>Para probar el activeMQ con un ejemplo lo más sencillo posible he creado una clase productora
de mensajes y otra consumidora. Como decía usan las colas llamando a JMS, sin Spring ni nada.</p>

<h5>El Productor</h5>
<p>La clase productora llamada QueueProducer no es más que un Thread que se conecta
a activeMQ usando las clases de JMS. Una vez conectado va dejando mensajes en la cola 
con un TTL (tiempo de vida) limitado. La propia clase tiene un método main para autoniciarse
tanto ella como las clase consumidora.
</p>
<pre class="brush: java">

import java.util.Random;

import javax.jms.JMSException;
import javax.jms.MessageProducer;
import javax.jms.Session;
import javax.jms.Connection;
import javax.jms.DeliveryMode;
import javax.jms.Destination;
import javax.jms.TextMessage;

import org.apache.activemq.ActiveMQConnection;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.util.IndentPrinter;

/**
 * Simple JMS producer for a queue
 * @author Pello Xabier Altadill Izura
 * @greetz for those who spend summertime playing with queues
 * 
 */
public class QueueProducer extends Thread {
    private String url;
    private String queueName;
    private static final boolean isTransacted = false;
    private static final int TTL = 100;
    private Random random = new Random();
    private String[] messages = {"My name is Iñigo Montoya. You killed my father. Prepare to die",
                                 "Do or do not. There is no try.",
                                 "Then you have my permission to die."};

    /**
    * default constructor
    * @param url of the queue service
    * @param queueName
    */
   public QueueProducer(String url, String queueName) {
        this.url = url;
        this.queueName = queueName;
   }

   /**
   * run method, called when we invoke .start()
   */
    public void run() {
        Connection connection = null;
        Session session = null;
        Destination destination = null;
        TextMessage message = null;

        try {
            // Create the connection.
            ActiveMQConnectionFactory connectionFactory 
                    = new ActiveMQConnectionFactory(ActiveMQConnection.DEFAULT_USER, ActiveMQConnection.DEFAULT_PASSWORD, url);
            connection = connectionFactory.createConnection();
            connection.start();

            // Create the session
            session = connection.createSession(isTransacted, Session.AUTO_ACKNOWLEDGE);

            destination = session.createQueue(queueName);

            // In case we want a topic instead of a queue
            // destination = session.createTopic(queueName);

            // Create the producer.
            MessageProducer messageProducer = session.createProducer(destination);

            messageProducer.setDeliveryMode(DeliveryMode.NON_PERSISTENT);

            // In case we want persistent queue
            // producer.setDeliveryMode(DeliveryMode.PERSISTENT);

            messageProducer.setTimeToLive(TTL);
 

            while (true) {
                // We create a simple text message
                message = session.createTextMessage(randomMsg());
                // And we send It!!
                messageProducer.send(message);
                System.out.println("Message Sent.");
                Thread.sleep(2000);

                if (isTransacted)
                    session.commit();
            }

        } catch (JMSException jmse) {
            System.out.println("JMSException in producer: " + jmse.getMessage());
        } catch (Exception e) {
            System.out.println("General exception in producer: " + e.getMessage());
        } finally {
            try {
                connection.close();
            } catch (Throwable ignore) {
            }
        }
    }

    /**
    * picks one random string from messages array
    * @return random message
    */
    private String randomMsg () {
        return messages[random.nextInt(messages.length)];
    }

    /**
    * main class to run the producer.
    */ 
   public static void main (String [] args) {
    QueueProducer producer = new QueueProducer("tcp://localhost:61616","LongandHardQueue");
    QueueConsumer consumer = new QueueConsumer("tcp://localhost:61616","LongandHardQueue");
    producer.start();
    consumer.start();
   }
}
</pre>

<h5>El Consumidor</h5>
<p>La clase productora llamada QueueConsumer es digamos la parte contraria al Producer. Las llamadas
para conectarse son similares salvo que en lugar de crear un MessageProducer instancia un MessageConsumer.
</p>
<pre class="brush: java">

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;

import javax.jms.JMSException;
import javax.jms.MessageConsumer;
import javax.jms.Session;
import javax.jms.Connection;
import javax.jms.DeliveryMode;
import javax.jms.Destination;
import javax.jms.TextMessage;

import org.apache.activemq.ActiveMQConnection;
import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.util.IndentPrinter;

/**
 * Simple JMS consumer for a queue
 * @author Pello Xabier Altadill Izura
 * @greetz to people I met at Andersen, wherever you are.
 * 
 */
public class QueueConsumer extends Thread {
    private String url;
    private String queueName;
    private static final boolean isTransacted = false;

    /**
    * default constructor
    * @param url of the queue service
    * @param queueName
    */
   public QueueConsumer(String url, String queueName) {
        this.url = url;
        this.queueName = queueName;
   }

   /**
   * run method, called when we invoke .start()
   */
    public void run() {
        Connection connection = null;
        Session session = null;
        Destination destination = null;
        TextMessage message = null;

        try {
            // Create the connection, with default user/password 
            ActiveMQConnectionFactory connectionFactory 
                    = new ActiveMQConnectionFactory(ActiveMQConnection.DEFAULT_USER, ActiveMQConnection.DEFAULT_PASSWORD, url);
            connection = connectionFactory.createConnection();
            connection.start();

            // Create the session
            session = connection.createSession(isTransacted, Session.AUTO_ACKNOWLEDGE);

            // Create destiny
            destination = session.createQueue(queueName);

            // In case we want a topic instead of a queue
            // destination = session.createTopic(queueName);

            // Create the consumer.
            MessageConsumer messageConsumer = session.createConsumer(destination);

            while (true) {
                // And we receive It!!
                message = (TextMessage) messageConsumer.receive();
                System.out.println("Message Received: " + message.getText());
            }

        } catch (JMSException jmse) {
            System.out.println("JMSException in consumer: " + jmse.getMessage());
        } catch (Exception e) {
            System.out.println("General exception in consumer: " + e.getMessage());
        } finally {
            try {
                connection.close();
            } catch (Throwable ignore) {
            }
        }
    }


}
</pre>

<h5>¿Cómo compilo y arranco esto?</h5>
<p>
En mi caso me pilla trasteando con la consola y no he montado esto desde el eclipse.
Lo que he hecho ha sido meter esos ficheros en la carpeta examples/src de activemq y utilizar
el build.xml de ant que traen los propios ejemplos. Ese build me resuelve todo el problema de 
dependencias, librerías, etc... Por defecto compila TODO el contenido de src así que lo único que
tengo que hacer es añadir un nuevo target para compilar el QueueProducer. Como le he eliminado
todos los argumentos y parámetros, el target es muy muy simple.
</p>
<pre class="brush: xml">
...
	<target name="queueproducer" depends="compile" description="Runs my QueueProducer">
		<echo>Running my QueueProducer</echo>
		<java classname="QueueProducer" fork="yes" maxmemory="100M">
			<classpath refid="javac.classpath" />
			
		</java>
	</target>
...
</pre>

<p>
Ahora con el activemq iniciado ya puedo lanzar el productor y el consumidor que utilizarán una cola
convenientemente llamada <em>LongandHardQueue</em>. Esto es lo que veré al ejecutar mi target de ant:
</p>
<pre class="brush: bash">
linux:/opt/activemq/example# ant queueproducer
Buildfile: build.xml

init:

compile:
    [javac] Compiling 2 source files to /opt/activemq/example/target/classes

queueproducer:
     [echo] Running my QueueProducer
     [java] Message Sent.
     [java] Message Received: My name is Iñigo Montoya. You killed my father. Prepare to die
     [java] Message Sent.
     [java] Message Received: Then you have my permission to die.
     [java] Message Sent.
     [java] Message Received: My name is Iñigo Montoya. You killed my father. Prepare to die
     [java] Message Sent.
     [java] Message Received: Do or do not. There is no try.
...
</pre>

<p>Todo esto puede monitorizarse de alguna manera desde el administrador web de ActiveMQ. A través de la
url http://localhost:8161/admin (acceso por defecto con admin/admin) podremos ver las colas activas y
los mensajes intercambiados.</p>

<p>Lo siguiente será un ejemplo de uso de activemq desde Spring, que como es de esperar nos quitará
todo el boilerplate para hacerlo todo más simple.</p>