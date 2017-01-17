
<img src="http://www.pello.info/images/activemq-spring.png" title="Spring ActiveMQ" alt="Spring ActiveMQ" />
<p>
Hace unos meses salió aquí <a href="http://www.pello.info/index.php/blog/colas-de-mensajes-con-activemq" title="activeMQ sin Spring">un ejemplo de ActiveMQ</a> sin Spring ni nada, aunque lo relevante era mostrar la configuración y uso del servidor de mensajes. Vamos ahora a hacer exactamente lo mismo pero utilizando Spring. Cosa que tenía pendiente desde entonces.
</p>

<p>
Al igual que sucedía con JDBC, Spring trae unas plantillas para que nos podamos ahorrar toooodo ese código boilerplate tedioso, repetitivo que se precisa simplemente para hacer una operación sencilla. En este caso se trata de JmsTemplate.
</p><p>
Al contrario que otros ejemplos, aquí conviene empezar viendo el fichero xml con la definición de beans, en los que veremos cómo se declaran una serie de instancias precisas para interactuar con ActiveMQ.
</p>

<h5>El fichero de beans de Spring</h5>
<p>
Hay dos maneras de referise a la cola, puede ser de forma genérica como se ve en este ejemplo o haciendo uso de los prefijos de ActiveMQ (se ven comentados)
</p>

<pre class="brush: xml">
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:jms="http://www.springframework.org/schema/jms"
	xmlns:amq="http://activemq.apache.org/schema/core"
	xsi:schemaLocation="http://activemq.apache.org/schema/core
	http://activemq.apache.org/schema/core/activemq-core-5.5.0.xsd
	http://www.springframework.org/schema/jms
	http://www.springframework.org/schema/jms/spring-jms-3.0.xsd
	http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">

<!-- Bean for connection with mq -->
<bean id="connectionFactory"
	class="org.apache.activemq.spring.ActiveMQConnectionFactory">
	<property name="brokerURL" value="tcp://localhost:61616"/>
</bean>

<!-- alternate way to do the same using amq tags -->
<!--amq:connectionFactory id="connectionFactory"
brokerURL="tcp://localhost:61616"/ -->

<!-- Now we declare a queue -->
<bean id="queue" class="org.apache.activemq.command.ActiveMQQueue">
	<constructor-arg value="order.queue"/>
</bean>
<!-- Alternate way -->
<!--  <amq:queue id="queue" physicalName="order.queue" /> -->

<!-- We could also create a topic queue -->
<!-- <bean id="topic" class="org.apache.activemq.command.ActiveMQTopic">
<constructor-arg value="order.topic"/>
</bean>
-->
<!-- Alternate: <amq:topic id="topic" physicalName="order.topic" />
 -->

<!-- JmsTemplate used by Spring to interact with a MQ --> 
<bean id="jmsTemplate" class="org.springframework.jms.core.JmsTemplate">
	<property name="connectionFactory" ref="connectionFactory" />
</bean>
 
  <!--context:component-scan 
      base-package="info.pello.spring.messagequeue">
  </context:component-scan --> 
  
  <!-- Message sender bean -->
  <bean id="messageSender" class="info.pello.spring.messagequeue.MessageSender">
  	<constructor-arg name="name" value="Sender" />
  	<property name="jmsTemplate" ref="jmsTemplate" />
	<property name="queueName" value="order.queue" />
  </bean>
  
  <!-- Message receiver bean -->
  <bean id="messageReceiver" class="info.pello.spring.messagequeue.MessageReceiver">
	<constructor-arg name="name" value="Receiver" />
	<property name="jmsTemplate" ref="jmsTemplate" />
	<property name="queueName" value="order.queue" />
  </bean>
  
</beans>
</pre>

<h5>
El emisor</h5>
<p>

Es un Thread que aleatoriamente manda una instancia de la clase Order, que no es más que un POJO que representa un pedido. Tanto en el emisor como en el receptor se aprecia que el código para interactuar con la cola de mensajes se reduce mucho.
</p>

<pre class="brush: java">
package info.pello.spring.messagequeue;

import java.util.Random;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.jms.core.MessageCreator;


/**
 * Sends messages to apache MQ
 * @author Pello Altadill
 * @greetz to people I met in Andersen
 */
public class MessageSender extends Thread {

	private Random random;
	private JmsTemplate jmsTemplate;
	private String queueName;
	
	/**
	 * default constructor
	 */
	public MessageSender (String name) {
		super(name);
		random = new Random();
	}
	
	/**
	 * main thread loop
	 */
	public void run () {
		String [] products = {"BigMac","Chips","Coke"};
		Order order = null;
		int counter = 0;
		
		while (true) {
			try {
				sleep(random.nextInt(5));
				counter++;
				order = new Order(products[random.nextInt(3)], random.nextInt(5));
				System.out.println("["+counter+"] Sending order: " + order.toString());
				sendMessage(order);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
	}

	/**
	 * sends message to queue
	 * http://docs.spring.io/spring/docs/3.0.0.M3/reference/html/ch23s03.html
	 * @param order
	 */
	private void sendMessage(final Order order) {

		jmsTemplate.send(queueName,
			new MessageCreator() {
				public Message createMessage(Session session) throws JMSException {
					return session.createObjectMessage(order);
				}
			}
		);

		
	}

	/**
	 * @return the jmsTemplate
	 */
	public JmsTemplate getJmsTemplate() {
		return jmsTemplate;
	}

	/**
	 * @param jmsTemplate the jmsTemplate to set
	 */
	public void setJmsTemplate(JmsTemplate jmsTemplate) {
		this.jmsTemplate = jmsTemplate;
	}

	/**
	 * @return the queueName
	 */
	public String getQueueName() {
		return queueName;
	}

	/**
	 * @param queueName the queueName to set
	 */
	public void setQueueName(String queueName) {
		this.queueName = queueName;
	}
}
</pre>

<h5>
El receptor</h5>
<p>
Otro thread que va leyendo de la cola los pedidos.
</p>

<pre class="brush: java">
package info.pello.spring.messagequeue;

import java.util.Random;

import javax.jms.JMSException;
import javax.jms.ObjectMessage;


import org.springframework.jms.core.JmsTemplate;


/**
 * Receives messages to apache MQ
 * @author Pello Altadill
 * @greetz to people I met in Andersen
 */
public class MessageReceiver extends Thread {
	
	private Random random;
	private String queueName;
	private JmsTemplate jmsTemplate;
	
	/**
	 * default constructor
	 */
	public MessageReceiver (String name) {
		super(name);
		random = new Random();
	}
	
	/**
	 * main thread loop
	 */
	public void run () {
		Order order = null;
		int counter = 0;
		
		while (true) {
			try {
				sleep(random.nextInt(5));
				order = receiveMessage();
				
				if (null != order) {
					counter++;
					System.out.println("["+counter+"] Order rcv: " + order.toString());
				} else {
					System.out.println("Order is null ");					
				}
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
	}

	/**
	 * reads message from queue
	 * @return Order
	 */
	private Order receiveMessage() {
		try {
			ObjectMessage receivedMessage = (ObjectMessage) jmsTemplate.receive(queueName);
			Order order = (Order) receivedMessage.getObject();
			
			return order;
			} catch (JMSException jmsException) {
				System.err.println("Error reading msg: " + jmsException.getMessage());
			}
		
		return null;
		
	}


	/**
	 * @return the jmsTemplate
	 */
	public JmsTemplate getJmsTemplate() {
		return jmsTemplate;
	}

	/**
	 * @param jmsTemplate the jmsTemplate to set
	 */
	public void setJmsTemplate(JmsTemplate jmsTemplate) {
		this.jmsTemplate = jmsTemplate;
	}

	/**
	 * @return the queueName
	 */
	public String getQueueName() {
		return queueName;
	}

	/**
	 * @param queueName the queueName to set
	 */
	public void setQueueName(String queueName) {
		this.queueName = queueName;
	}
}
</pre>

<h5>
La clase principal</h5>
<p>
Esta clase simplemente inicia el emisor y receptor.
</p>
<pre class="brush: java">
package info.pello.spring.messagequeue;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
/**
 * Main program, starting point of our project
 * @author Pello Altadill
 * @greetz for those who keep on working even on xmas
 */
public class Main {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ApplicationContext context = new ClassPathXmlApplicationContext("messagequeue.xml");
		 
		MessageSender messageSender = (MessageSender) context.getBean("messageSender");
		MessageReceiver messageReceiver = (MessageReceiver) context.getBean("messageReceiver");

		messageSender.start();
		messageReceiver.start();
		
	}

}
</pre>
<p>Esto genera una serie de logs bastante verbosos, pero se va viendo como se pasan mensajes a través de activeMQ. Por cierto, en el servidor no hace falta hacer nada, más que ponerlo en marcha.</p>