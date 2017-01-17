<p>Madre mía RMI, bueno la verdad es que hoy en día con la WEB omnipresente no le veo gran utilidad a esto pero en fin, va por los viejos tiempos. Tengo por ahí unos <a href="http://www.pello.info/filez/Rmi.zip" title="Old School stuff">ejemplos de RMI</a> fechados el 30 de abril de 1999. Bueno, Spring hace las cosas fáciles. Y hecho este ejemplo puedes hacer lo mismo para otro tipo de servicios remotos.</p>

<img src="http://rubenerd.com/uploads/logo.java.175.png" alt="Old java Logo" title="Old java logo" align="left"/>
<p>Ya desde sus primeras versiones (incluso en la era pre java2), java disponía de un mecanismo para poder invocar métodos remotos, es decir, llamar a funciones que se encuentran en una JVM remota. Esto era cómo el clásico RPC que se hacía (hace) en unix pero al estilo java. Si tenemos una especie de sistema distribuido y queremos que las clases java interactúen entre sí, el RMI puede ser una buena opción pero ojo: RMI es para que se comunique java con java, y nada más. Si queremos implicar otras tecnologías y crear algo más heterogéneo será mejor olvidarse.
</p><p>
El RMI está bien para java, puedes mandar objetos para aquí y para allá (tendrán que ser serializables), la comunicación es inmediata, pero al poco surgieron otras tecnologías mucho más potentes: como CORBA que prometía un edén donde cualquier lenguaje tendría cabida y algo mucho más cercano, realista y útil el SOAP y los consiguientes WebServices.
</p><p>
Peeero RMI sigue funcionando si te interesa. La clásica aplicación java RMI era un pelín engorrosa, no era compilar y listo, tenías que generar una serie de clases -stub/skel- y luego claro, iniciar el RMI Registry, que venía a ser el servicio RMI.
</p><p>
Spring, como no podía ser menos, lo hace mucho más fácil. Spring dispone de soporte para distintos servicios remotos, como son los clásicos WebServices (JAX-WS), sus propios servicios remotos HttpInvoker, y por supuesto el RMI. Desarrollar un servicio RMI con Spring es tan fácil como crear una clase con métodos. Metemos unas configuraciones en el fichero del contexto y a correr.
</p><p>
Para no hacer la típica tontería de decir "hola", en este caso he creado una tontería con BD con su patrón DAO y su hibernate. Oh sorpresa, se trata de la gestión de una ToDo list, es decir, una lista de tareas. 
</p>
<h5>ToDo.java</h5>
<p>
Esta sería la clase POJO todo, y OJO, para moverla por RMI debe implementar Serializable. Eso hace que una instancia de la clase pueda codificarse para su almacenamiento o comunicación. Hablamos de la instancia, es decir que tu mueves o guardas un objeto y lo recuperas tal cual.
</p>

<pre class="brush: java;">

package info.pello.spring.todo.rmi;

import java.io.Serializable;
import java.util.Date;

/**
 * Represents a todo, a Task  to be done
 * @author Pello Xabier Altadill Izura
 * @greetz you, Martin Fowler and the rest of your friends
 */
public class ToDo implements Serializable {
﻿  private int id;
﻿  private String name;
﻿  private String description;
﻿  private Date date;
﻿  private boolean done;
﻿  
﻿  /**
﻿   * default constructor for hibernate
﻿   */
﻿  public ToDo () {
﻿  ﻿  
﻿  }
﻿  
﻿  
﻿  /**
﻿   * @param id
﻿   * @param name
﻿   * @param description
﻿   * @param date
﻿   * @param done
﻿   */
﻿  public ToDo(int id, String name, String description, Date date, boolean done) {
﻿  ﻿  this.id = id;
﻿  ﻿  this.name = name;
﻿  ﻿  this.description = description;
﻿  ﻿  this.date = date;
﻿  ﻿  this.done = done;
﻿  }
﻿  /* (non-Javadoc)
﻿   * @see java.lang.Object#toString()
﻿   */
﻿  @Override
﻿  public String toString() {
﻿  ﻿  return "ToDo [id=" + id + ", name=" + name + ", description="
﻿  ﻿  ﻿  ﻿  + description + ", date=" + date + ", done=" + done + "]";
﻿  }


	// GETTERS/SETTERS...
﻿  
}

</pre>
<p>
El DAO lo omito, si quieres <a href=""http://http://code.google.com/p/erps-2dam-4vientos/source/browse/trunk/ToDoRemoteRMI/src/main/java/info/pello/spring/todo/rmi/>lo puedes ojear en google code</a>
</p>
Pero por cierto en la implementación he probado:
<img src="http://hsqldb.org/images/hypersql_logo.png" title="HyperSQL ÑAAAÑAÑAAAÑA" alt="HyperSQL logo" />
<p>Lo que vamos a hacer aquí es crear una especie de Servicio, que será lo que publicaremos a través de RMI.
Para eso definimos un interfaz y luego lo implementaremos.
</p>
<h5>Interfaz ToDoService</h5>
<pre class="brush: java;">
package info.pello.spring.todo.rmi;

import java.util.List;

/**
 * A service interface that will be presented through RMI
 * @author Pello Xabier Altadill Izura
 * @greets 4 u
 */
public interface ToDoService {
        List<ToDo> getToDoList();
        List<ToDo> searchToDoList(String name);
        ToDo getToDoById(int id);
        void saveToDo(ToDo toDo);
        void updateToDo(ToDo toDo);
        void deleteToDo(int id);
}
</pre>

<h5>Implementación del interfaz ToDoServiceImpl</h5>
Aquí esta la chicha, este servicio tira del DAO para hacer todo:
<pre class="brush: java;">
package info.pello.spring.todo.rmi;

import java.util.List;

/**
 * Implementations of ToDoService
 * @author Pello Xabier Altadill Izura
 * @greetz u again
 */
public class ToDoServiceImpl implements ToDoService {
        
        private ToDoDAO toDoDAO;

        
        /**
         * @return the toDoDAO
         */
        public ToDoDAO getToDoDAO() {
                return toDoDAO;
        }

        /**
         * @param toDoDAO the toDoDAO to set
         */
        public void setToDoDAO(ToDoDAO toDoDAO) {
                this.toDoDAO = toDoDAO;
        }

        @Override
        public List<ToDo> getToDoList() {
                return toDoDAO.getToDos();
        }

        @Override
        public List<ToDo> searchToDoList(String name) {
                return toDoDAO.getToDos();
        }

        @Override
        public ToDo getToDoById(int id) {
                // TODO Auto-generated method stub
                return toDoDAO.getToDoById(id);
        }

        @Override
        public void saveToDo(ToDo toDo) {
                toDoDAO.create(toDo);
        }

        @Override
        public void updateToDo(ToDo toDo) {
                toDoDAO.update(toDo);
        }

        @Override
        public void deleteToDo(int id) {
                toDoDAO.delete(id);
        }

}
</pre>


<h5>Configuración de Spring</h5>
Para usar esto hay que meter un bean que nos permita usar el RMI de spring. 
Aquí tienes el fichero, y el RMI es el bean toDoServiceRMI, el resto es lo habitual
al utilizar hibernate.

<pre class="brush: xml;">
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
﻿  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
﻿  xmlns:aop="http://www.springframework.org/schema/aop"
﻿  xmlns:tx="http://www.springframework.org/schema/tx"
﻿  xmlns:p="http://www.springframework.org/schema/p"
﻿  xsi:schemaLocation="http://www.springframework.org/schema/beans 
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  http://www.springframework.org/schema/aop
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  http://www.springframework.org/schema/aop/spring-aop-3.2.xsd
﻿  ﻿  ﻿  ﻿  ﻿  ﻿  http://www.springframework.org/schema/tx
        ﻿  ﻿  ﻿  ﻿  http://www.springframework.org/schema/tx/spring-tx-3.0.xsd">


 <tx:annotation-driven transaction-manager="transactionManager" />
 
<!-- We define a Bean for datasource -->
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
﻿  ﻿  <property name="driverClassName" value="org.hsqldb.jdbcDriver" />
﻿  ﻿  <property name="url" value="jdbc:hsqldb:file:src/main/resources/todo" />
﻿  ﻿  <property name="username" value="sa" />
﻿  ﻿  <property name="password" value="" />
</bean>

<!--
We create Hibernate's SessionFactory bean
to get a Hibernate session in our program
If you pay attention you'll realize that this bean config
is somehow like the hibernate.cfg.xml configuration. We don't need
to create that file now.
-->
<bean id="sessionFactory" class="org.springframework.orm.hibernate3.LocalSessionFactoryBean">
﻿  <property name="dataSource" ref="dataSource" />
﻿  <property name="mappingResources">
﻿  ﻿  <list>
﻿  ﻿  ﻿  <value>ToDo.hbm.xml</value>
﻿  ﻿  </list>﻿  ﻿  
﻿  </property>
﻿  <property name="hibernateProperties">
﻿  ﻿  <props>
﻿  ﻿  ﻿  <prop key="hibernate.show_sql">true</prop>
﻿  ﻿  ﻿  <prop key="hibernate.dialect">org.hibernate.dialect.HSQLDialect</prop>
﻿  ﻿  </props>
﻿  ﻿  
﻿  </property>
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

<bean id="toDoDAO" class="info.pello.spring.todo.rmi.ToDoDAO" >
﻿  <property name="sessionFactory" ref="sessionFactory" />
</bean>

<!-- 
This is our service implementation
We inject our hibernate DAO
 -->
<bean id="toDoServiceImpl" class="info.pello.spring.todo.rmi.ToDoServiceImpl">
﻿  <property name="toDoDAO" ref="toDoDAO" />
</bean>

<!-- 
This will reguister our service as a RMI service
at local ip on default 1099 port , but we will be more specific
-->
<bean class="org.springframework.remoting.rmi.RmiServiceExporter"
﻿  p:service-ref="toDoServiceImpl"
﻿  p:serviceName="ToDoService"
﻿  p:serviceInterface="info.pello.spring.todo.rmi.ToDoService"
 />

<!-- If we want to inject a RMI in our main class to avoid RMI boilerplate -->
<bean id="toDoServiceRMI" class="org.springframework.remoting.rmi.RmiProxyFactoryBean"
﻿  p:serviceUrl="rmi://artean/ToDoService"
﻿  p:serviceInterface="info.pello.spring.todo.rmi.ToDoService" />


</beans>

</pre>

<h5>Main</h5>

Y este es el método main, que una vez iniciado el RMI se conectará a él, se traerá una instancia del servicio
y a trabajar con él. Si echamos un ojo en el sistema veremos que se ha abierto un puerto 1099 (by default)

<pre class="brush: java;">
package info.pello.spring.todo.rmi;

import java.util.Date;
import java.util.List;
import java.util.Scanner;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


/** 
 * @author Pello Xabier Altadill Izura
 * @greetz Blue Mug users
 */
public class Main {
        
        
        public static String showAll (List<ToDo> toDos) {
                String result = "";
                
                for (ToDo toDo : toDos) {
                        result += toDo.toString() + "\n";
                }
                
                return result;
        }

        /**
         * @param args
         */
        public static void main(String[] args) {
                
                // TODO Auto-generated method stub
                ApplicationContext context = new ClassPathXmlApplicationContext("todoremotermi.xml");
                
                ToDoService toDoService = (ToDoService) context.getBean("toDoServiceRMI");
                
                List<ToDo> toDoList = toDoService.getToDoList();
                
                System.out.println("Here are our ToDos...");
                System.out.println(showAll(toDoList));
                
                // TODO Auto-generated method stub
                int id = 0;
                String name = "Spring";
                String description = "Master Spring";
                Date date = new Date();
                
                
                // CREATE
                ToDo toDo = new ToDo(0, name, description,date,false);
                toDoService.saveToDo(toDo);
                System.out.println("After insert> Here are our ToDos...");
                toDoList = toDoService.getToDoList();
                System.out.println(showAll(toDoList));
                
                // UPDATE DATA
                toDo.setName("Master all");
                toDoService.updateToDo(toDo);
                System.out.println("After update> Here are our ToDos...");
                toDoList = toDoService.getToDoList();
                System.out.println(showAll(toDoList));
                
                
                // REMOVE
                toDoService.deleteToDo(5);
                System.out.println("After deletion> Here are our ToDos...");
                toDoList = toDoService.getToDoList();
                System.out.println(showAll(toDoList));

                // and so on...


                
        }

}
</pre>