<h5>Un ejemplo de Spring Web Flow</h5>
<p>Los WebFlows de Spring tratan de facilitar el desarrollo de aplicaciones que siguen un flujo de ejecución, como por ejemplo un asistente, un wizard, etc... En lugar de tener que programar un método controlador para cada paso Spring lo hace tan fácil como definir un flujo de ejecución en un fichero XML. En ese fichero se describen los estados por los que pasa el flujo y nos permite olvidarnos de controladores y preocuparnos únicamente de las views (jsps en este caso) y de servicios del dominio que necesitemos.
</p><p>
Para ilustrar esto con un ejemplo he desarrollado una especie de "Alta de usuario" en la que se van solicitando datos.
</p>
Al finalizar se llama a un método que guarda los datos y listo. El webflow contiene básicamente estados que se van encadenando  y los más comunes son

<ul>
<li>VIEW STATES: son estados que muestran una pantalla al usuario</li>
<li>END STATE: describe el estado final</li>
<li>ACTION STATE: un estado en el que se lleva a cabo una acción.</li>
<li>DECISION STATE: un estado en el que podemos bifurcar el flujo de forma condicional</li>
<li>SUBFLOW STATE: un estado en el que se inicia otro flujo. Al terminar el mismo se sigue en el flujo principal.</li>
</ul> 
<p>El tema del webflow no es uno de los paquetes habituales de Spring así que habrá que bajarse dependencias vía Maven, como mínimo el binding y webflow de Spring.
Un fichero que define el flow o flujo de ejecución, debe ser un fichero xml terminado en "-flow.xml".
</p>
<p>En eclipse se puede crear un fichero de flow con el asistente. Sobre un proyecto Spring Web Maven añadirmos un fichero de flow y nos saltará
el asistente. Le damos un nombre terminado en "-flow.xml" y le indicamos un id para definir el flujo y luego el fichero de configuración de Spring.
El fichero de flow lo podemos poner en una carpeta flow dentro de WEB-INF. Luego a en la configuración de Spring hay que indicarle dónde están los ficheros de flow. Por cierto, en este caso he simplificado la configuración dejando todo lo relacionado con Spring en un único fichero XML. Hay quien prefiere separar todo en pequeños ficheros, eso ya, según gustos o circustancias.
</p>

<b>web.xml</b>
<p>Para conseguir esto primero debemos configurar el fichero web.xml que contiene la configuración de la aplicación web
para indicar que vamos a meter el web Flow
</p>
<pre class="brush: xml">
<?xml version="1.0" encoding="ISO-8859-1"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://java.sun.com/xml/ns/javaee"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
         id="WebApp_ID" version="2.5">

    <display-name>SignupSpringWebFlow</display-name>
        
    <!--
﻿  ﻿  - Servlet that dispatches request to registered handlers (Controller implementations).
﻿  -->
    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>/WEB-INF/mvc-config.xml</param-value>
    </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>

    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

</web-app>

</pre>

<b>Configuración de Spring</b>
<p>Lo más complejo de montar esta historia seguramente es configurar correctamente el fichero de Spring. Aquí debemos
meter todos los componentes necesarios para el flow más los beans que necesitemos para nuestras cosas claro está.
</p>
<pre class="brush: xml">
<?xml version="1.0" encoding="UTF-8"?>

<beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
﻿  xmlns:mvc="http://www.springframework.org/schema/mvc" xmlns:context="http://www.springframework.org/schema/context"
﻿  ﻿  xmlns:flow="http://www.springframework.org/schema/webflow-config"
﻿  xsi:schemaLocation="http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd
﻿  ﻿  http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
﻿  ﻿  http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
﻿  ﻿  ﻿  ﻿  http://www.springframework.org/schema/webflow-config
﻿  ﻿  http://www.springframework.org/schema/webflow-config/spring-webflow-config-2.0.xsd">

﻿  <!-- With this all the content from resources dir will
﻿  be treated as static content: js, css, images,  -->
﻿  <mvc:resources mapping="/resources/**" location="/resources/" />
﻿  
﻿  <flow:flow-executor id="flowExecutor" flow-registry="flowRegistry"/>

﻿  <!-- 
﻿  The first step to dispatching requests to flows is to enable flow handling within Spring MVC. 
﻿  To this, install the FlowHandlerAdapter:
﻿   -->
﻿  <bean class="org.springframework.webflow.mvc.servlet.FlowHandlerAdapter">
﻿      <property name="flowExecutor" ref="flowExecutor" />
﻿  </bean>
﻿  <!--
﻿  ﻿  Once flow handling is enabled, the next step is to map specific application resources to your flows. 
﻿  ﻿  The simplest way to do this is to define a FlowHandlerMapping:﻿   
﻿  ﻿  With this config requests to /example/action will look for a flow which id is /example/action
﻿  ﻿  In our case signup will look for signup named flow
﻿   -->
 ﻿  <bean class="org.springframework.webflow.mvc.servlet.FlowHandlerMapping">
    ﻿  <property name="flowRegistry" ref="flowRegistry"/>
    ﻿  <property name="order" value="0"/>
﻿  </bean>
﻿  
﻿  <!-- The flowRegistry, where are our flow definition files??  -->
﻿  <flow:flow-registry id="flowRegistry" flow-builder-services="flowBuilderServices">
    ﻿  <flow:flow-location path="/WEB-INF/flows/signup.xml" />
﻿  </flow:flow-registry>
﻿  <!-- ALTERNATE WAY:
﻿    <flow:flow-registry id="flowRegistry" 
           flow-builder-services="flowBuilderServices"
           base-path="/WEB-INF/flows">
    ﻿   <flow:flow-location-pattern value="/**/*-flow.xml" />
  ﻿    </flow:flow-registry>
﻿   -->
﻿  
﻿  
﻿  <!-- How shall we show the views? flowBuilder -> viewFactoryCreator-> viewResolver -> jsp -->
﻿  <flow:flow-builder-services id="flowBuilderServices" view-factory-creator="viewFactoryCreator"/>
﻿  
﻿  <bean id="viewFactoryCreator" class="org.springframework.webflow.mvc.builder.MvcViewFactoryCreator">
﻿  ﻿  <property name="viewResolvers">
﻿  ﻿  ﻿  <list>
﻿  ﻿  ﻿  ﻿  <ref bean="viewResolver"/>
﻿  ﻿  ﻿  </list>
﻿  ﻿  </property>
﻿  </bean>
﻿  
﻿  <!-- 
﻿  Maps a logical view name to a physical resource
﻿  If someone asks for "home", It will look for /WEB-INF/view/home.jsp 
﻿  -->
﻿  <bean id="viewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
﻿  ﻿  <property name="prefix" value="/WEB-INF/view/"/>
﻿  ﻿  <property name="suffix" value=".jsp"/>
﻿  </bean>
﻿  
﻿  <!-- We'll use this bean in an action state of the flow -->
﻿  <bean id="serviceDoSomething" class="info.pello.signup.ServiceDoSomething" />
﻿  
</beans>

</pre>

<b>signup-flow.xml</b>
<p>
Pues bien, este es el fichero XML donde se configura el flow. Es bastante obvio cómo pasa de un estado a otro.
Cada estado se mapea con un fichero JSP con el mismo nombre, ya que a Spring le hemos indicado que los views los
resuelva de esa manera. Por otro lado tenemos una instancia de la clase User donde iremos guardando los datos
que mete el usuario. Esa instancia se va pasando de una clase a otra.
</p>
<pre class="brush: xml">
<?xml version="1.0" encoding="UTF-8"?>
<flow xmlns="http://www.springframework.org/schema/webflow"
﻿  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
﻿  xsi:schemaLocation="http://www.springframework.org/schema/webflow
        http://www.springframework.org/schema/webflow/spring-webflow-2.0.xsd">

﻿  <var name="newUser" class="info.pello.signup.User" />
﻿  
﻿  <!-- By default, the first state is the start state. -->
﻿  <view-state id="start">
﻿  ﻿  <transition to="enterAddress" />
﻿  </view-state>

﻿  <view-state id="enterAddress" model="newUser">
﻿  ﻿  <transition on="submit" to="enterContact" />
﻿  </view-state>

﻿  <view-state id="enterContact"  model="newUser">
﻿  ﻿  <transition on="contactEntered" to="enterLogin" />
﻿  </view-state>
﻿  
﻿  <view-state id="enterLogin" model="newUser">
﻿  ﻿  <transition on="loginEntered" to="userReady" />
﻿  </view-state>
﻿  
﻿  <!-- 
﻿  In this state the flow performs an action an then goes on. 
﻿  -->
﻿  <action-state id="userReady">
﻿  ﻿  <evaluate expression="serviceDoSomething.logUser(newUser)" />
﻿  ﻿  <transition to="finishFlow" />
﻿  </action-state>
﻿  
﻿  <view-state id="finishFlow" model="newUser">
﻿  ﻿  <transition to="finished" />
﻿  </view-state>

﻿  <end-state id="finished">
﻿  ﻿  <output name="newUser" />
﻿  </end-state>
﻿  
﻿  <end-state id="cancelled" />
﻿  ﻿  
﻿  <!-- With this in any place that we press Cancel we go to cancelled state -->
﻿  <global-transitions>
﻿  ﻿  <transition on="cancel" to="cancelled" />
﻿  </global-transitions>
﻿  

</flow>
</pre>

<b>¿Cómo saltamos de un estado a otro en los JSP?</b>
<p>
La aplicación debe iniciarse con el nombre del flujo en este caso:<br />
	<em>http://localhost:8080/SignupSpringWebFlow/signup</em>
</p>

<p>
Con esto llegamos al primer JSP que inicia todo con un link.
En ese link hay que indicar el siguiente paso del flow que debe coincidir con el indicado en el fichero xml 
pero añadiendo el guión bajo "_" como prefijo.
</p>
<pre class="brush: js">
<!DOCTYPE html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    
<html>
	<head>
		<meta charset="utf-8">
		<title>Welcome to signup</title>
	</head> 
	<body>
		<h2>Step1 - Start</h2>
		<div>
		    <a href="${flowExecutionUrl}&_eventId=_enterAddress">Continue &gt;&gt;</a> <br />
            <a href="${flowExecutionUrl}&_eventId=_cancel">Cancel</a>
        </div>
	</body>
</html>
</pre>

<b>Los formularios</b>
<p>Dos cosas a subrayar: para que los campos de formulario se vincules a una clase y podamos pasar los datos
de una pantalla a otra debemos indicar el atributo modelAttribute="newUser" en la etiqueta form. Por otro lado
para saltar al siguiente estado del flow o para cancelar metemos botones submit con un atributo name que contiene los nobmres de estado.
</p>
<pre class="brush: js">
<!DOCTYPE html>
<%@ taglib prefix="sf" uri="http://www.springframework.org/tags/form" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    
<html>
	<head>
		<meta charset="utf-8">
		<title>Step3 : Enter Contact</title>
	</head> 
	<body>
		<h2>Step3 : Enter Contact</h2>
		<div>
		<sf:form modelAttribute="newUser">
			<fieldset><legend>Contact info</legend>		
			<input type="hidden" name="_flowExecutionKey" value="{$flowExecutionKey}">	
				<label for="phone">Phone</label><br />
				<sf:input path="phone"  /><br />
				<label for="email">Email</label><br />
				<sf:input path="email"  /><br />
				<label for="url">Url</label><br />
				<sf:input path="url"  /><br />
				<input type="submit" name="_eventId_contactEntered" value="Continue &gt;&gt;"  /><br />
				<input type="submit" name="_eventId_cancel" value="Cancel"  />
			</fieldset>
		</sf:form>
        </div>
	</body>
</html>
</pre>

<p>
Al final mostramos los datos en el JSP correspondiente a finishFlow. En un action state hemos llamado
a nuestro SuperServicio de palo que es el que puede guardar en BD o hacer otras cosas serias.
</p>
<pre class="brush: js">
<!DOCTYPE html>

<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    
<html>
	<head>
		<meta charset="utf-8">
		<title>Finished!! user is ready</title>
	</head> 
	<body>
		<h2>Finished!! User ${newUser.login} is ready</h2>
		<div>
		    <a href="signup">Again</a>
        </div>
	</body>
</html>
</pre>


<p>
Esto del webflow es útil, pero montar un fichero de Spring que funcione ha sido algo infernal.
En todas partes o hay configuraciones incompletas o son demasiado completas. Esta es la que me ha servido,
una vez se inyecta todo correctamente, lo de los flows pues eso, fluye.<br />
Puedes echar un ojo al <a href="http://code.google.com/p/erps-2dam-4vientos/source/browse/trunk/SignupSpringWebFlow/">proyecto completo en Google code</a>
</p>
