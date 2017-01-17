<p>Como no podía ser menos, Spring también ofrece facilidades para poner en marcha WebServices. Y la idea viene a ser simple también.
Partimos de una clase Java corriente con una serie de métodos que queremos que sean accesibles via WebService. Es casi tan simple como
añadirles las anotaciones de JAX-WS de @WebService y @WebMethod, unas líneas de configuración en el XML de Spring y ya tenemos nuestro
sevicio web listo para arrancar. Por cierto, basta con crear un proyecto Spring Maven normal.
</p>
<p>De hecho para que veas lo simple que es crear un WebService, mira un HelloWorld:</p>
<pre class="brush: java">
package info.pello.spring.todo.ws;

import javax.jws.WebMethod;
import javax.jws.WebService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author root
 *
 */
@Component
@WebService(serviceName="hello")
public class HelloWS {

        @WebMethod
        public String sayHello () {             
                return "Say hello to my little friend";
        }
}
</pre>
</p>
<p>
La cosa es que el tema de publicar el WebService, el protocolo SOAP, el WSDL y todo lo demás, los IDEs
y las librerías te lo dan resuelto. Tú puedes tener cualquier software aislado al cual si le haces un endpoint de WebService 
ya lo publicas para todo el mundo para cualqueir lenguaje. 
</p>
<p>
Hace un par de post <a href="http://www.pello.info/index.php/blog/rmi-con-spring" title="Post sobre RMI">hablaba sobre RMI</a> y y ahí trataba de exportar a través de RMI un servicio para gestionar una BBDD. En  este ejemplo
vamos a usar esa misma infraestructura añadiendo una clase que servirá de <em>EndPoint</em>, es decir el punto de conexión, el nexo entre nuestro software y el mundo
exterior que accederá a él. ¿Cómo? simplemente creamos un servicio al que le meteremos anotaciones para poder convertilo en un WebService de pleno derecho:
</p>

<b>ToDoServiceWSEndpoint</b>
<pre class="brush: java">
package info.pello.spring.todo.ws;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * This is a class to export a standalone JAX-WS webservice
 * using the Spring framework. In Spring context we create
 * a bean that will find all annotated WebService endpoints like this,
 * and Spring publishes them in http://localhost:8080
 * 
 * @author Pello Xabier Altadill Izura
 * @greetz -double wink-
 */

@Component
@WebService(serviceName="ToDoServiceWS")
public class ToDoServiceWSEndpoint {

﻿  private ToDoServiceImpl toDoService;
﻿  
﻿  /**
﻿   * @return the toDoService
﻿   */
﻿  public ToDoServiceImpl getToDoService() {
﻿  ﻿  return toDoService;
﻿  }

﻿  /**
﻿   * @param toDoService the toDoService to set
﻿   */
﻿  public void setToDoService(ToDoServiceImpl toDoService) {
﻿  ﻿  this.toDoService = toDoService;
﻿  }

﻿  @WebMethod
﻿  public List<ToDo> getToDoList() {
﻿  ﻿  return toDoService.getToDoList();
﻿  }

﻿  @WebMethod
﻿  public List<ToDo> searchToDoList(String name) {
﻿  ﻿  return toDoService.getToDoList();
﻿  }

﻿  @WebMethod
﻿  public ToDo getToDoById(int id) {
﻿  ﻿  // TODO Auto-generated method stub
﻿  ﻿  return toDoService.getToDoById(id);
﻿  }

﻿  @WebMethod
﻿  public void saveToDo(ToDo toDo) {
﻿  ﻿  toDoService.saveToDo(toDo);
﻿  }

﻿  @WebMethod
﻿  public void updateToDo(ToDo toDo) {
﻿  ﻿  toDoService.updateToDo(toDo);
﻿  }

﻿  @WebMethod
﻿  public void deleteToDo(int id) {
﻿  ﻿  toDoService.deleteToDo(id);
﻿  }
}

</pre>


<p>
Bien, estando en Spring necesitamos meter mano en un fichero de contexto, en este caso tiene mucha cosa
por el tema de Hibernate, pero hacia el final está lo interesante. El bean SimpleJaxWsServiceExporter
es el encargado de buscar todos los webservice marcados con anotaciones y los publica en la URL que le digamos.
</p>
<pre  class="brush: xml">
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:tx="http://www.springframework.org/schema/tx"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:p="http://www.springframework.org/schema/p"
	xsi:schemaLocation="http://www.springframework.org/schema/beans 
						http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
						http://www.springframework.org/schema/tx
        				http://www.springframework.org/schema/tx/spring-tx-3.0.xsd
        				http://www.springframework.org/schema/context
           				http://www.springframework.org/schema/context/spring-context-3.0.xsd">

 <context:annotation-config />
 <tx:annotation-driven transaction-manager="transactionManager" />
 
<!-- We define a Bean for datasource -->
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
		<property name="driverClassName" value="org.hsqldb.jdbcDriver" />
		<property name="url" value="jdbc:hsqldb:file:src/main/resources/todo" />
		<property name="username" value="sa" />
		<property name="password" value="" />
</bean>

<!--
We create Hibernate's SessionFactory bean
to get a Hibernate session in our program
If you pay attention you'll realize that this bean config
is somehow like the hibernate.cfg.xml configuration. We don't need
to create that file now.
-->
<bean id="sessionFactory" class="org.springframework.orm.hibernate3.LocalSessionFactoryBean">
	<property name="dataSource" ref="dataSource" />
	<property name="mappingResources">
		<list>
			<value>ToDo.hbm.xml</value>
		</list>		
	</property>
	<property name="hibernateProperties">
		<props>
			<prop key="hibernate.show_sql">true</prop>
			<prop key="hibernate.dialect">org.hibernate.dialect.HSQLDialect</prop>
		</props>
		
	</property>
</bean>
<!-- 
In linux console, hsqldb-databasemanager
Generates todo.log and todo.properties
create table todo (
id identity,
name varchar(30),
description varchar(255),
date date,
done boolean);

insert into todo values(null,'Blog','Improve the blog','2013-07-24',false);

 -->
<bean id="transactionManager" class="org.springframework.orm.hibernate3.HibernateTransactionManager">
    <property name="sessionFactory" ref="sessionFactory" />
</bean>

<bean id="toDoDAO" class="info.pello.spring.todo.ws.ToDoDAO" >
</bean>

<!-- 
This is our service implementation
We inject our hibernate DAO
 -->
<bean id="toDoServiceImpl" class="info.pello.spring.todo.ws.ToDoServiceImpl">
	<property name="toDoDAO" ref="toDoDAO" />
</bean>

<!-- This bean will search for all webservice endpoint classes with annotations -->
<bean class="org.springframework.remoting.jaxws.SimpleJaxWsServiceExporter"
p:baseAddress="http://localhost:8888/services/"
 />
<!-- 
We could stablish url for publishing WS:
	p:baseAddress="http://localhost:8888/services/"
 -->
 
<bean id="toDoServiceWSEndpoint" class="info.pello.spring.todo.ws.ToDoServiceWSEndpoint"
	p:toDoService-ref="toDoServiceImpl" 
/>

<bean id="hello" class="info.pello.spring.todo.ws.HelloWS" />
</beans>

</pre>
<p>
En este caso, para poner el WebService en marcha he creado un main que carga el contexto y un bean.</p><p><img src="http://www.pello.info/images/wsinaction.png" title="WS in action" alt="WS in action" /></p><p>
El caso es que al arrancar este programa, el WebService es accesible y lo podemos comprobar usando el navegador. Por cierto todo el chiringuito lo arranca en este caso el JRE1.6, no es necesario indicar un tomcat ni nada.
</p>
<p>El <a href="http://code.google.com/p/erps-2dam-4vientos/source/browse/trunk/ToDoRemoteWS/" title="Ejemplo de WebService con Spring">código lo tienes en Google code</a>. Los ficheros están repetidos, si fuera un poco más cuidadose separaría la parte del DAO en un proyecto aparte y crearía un Maven multi-módulo (ñaañaa ñaa). ¿Otro día vale?
</p>
