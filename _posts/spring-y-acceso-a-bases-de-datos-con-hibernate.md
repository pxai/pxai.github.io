<p>
	Spring puede facilitar enormemente la gesti&oacute;n de datos desde nuestros programas, eliminando un mont&oacute;n de l&iacute;neas de c&oacute;digo repetitivo. Aunque quiz&aacute; viendo el c&oacute;digo que sal&iacute; en el ejemplo de JdbcTemplate no pienses lo mismo espera a ver la integraci&oacute;n con Hibernate. C&oacute;digo de <a href="http://code.google.com/p/erps-2dam-4vientos/source/browse/trunk/SpringPersistenceHibernate/">ejemplos con jdbc y hibernate en en google code</a>.<br />
	<br />
	Lo primero que llama la atenci&oacute;n es que la configuraci&oacute;n de hibernate (hibernate.cfg.xml) se hace en el fichero xml de Spring, haciendo uso del bean dataSource. Luego podemos usar los mapeos con cada tabla por xml o usar anotaciones. En este ejemplo, donde oh sorpresa, se maneja la tabla customer se hace por xml. Por otro lado, el SessionFactory de hibernate tambi&eacute;n se&nbsp; consigue mediante inyecci&oacute;n.<br />
	<br />
	La clase POJO es igual y por supuesto el m&eacute;todo Main se mantiene igual.<br />
	Lo que s&iacute; cambia es el CustomerDAO, que utilizar&aacute; anotaciones para hacer las operaciones dentro de transacciones. Y ahora s&iacute;, la gesti&oacute;n de BBDD con Hibernate s&iacute; que simplifica las cosas.<br />
	<br />
	<strong>CustomerDAO</strong></p>
<p>
	<br />
	<span style="font-family:courier new,courier,monospace;">package info.pello.spring.persistence.hibernate;<br />
	<br />
	import org.hibernate.classic.Session;<br />
	import org.hibernate.SessionFactory;<br />
	import org.springframework.stereotype.Repository;<br />
	import org.springframework.transaction.annotation.Transactional;<br />
	<br />
	import java.util.List;<br />
	<br />
	<br />
	/**<br />
	&nbsp;* DAO for customer entity using Hibernate<br />
	&nbsp;* @author Pello Xabier Altadill Izura<br />
	&nbsp;* @greetz Blue Mug<br />
	&nbsp;*<br />
	&nbsp;*/<br />
	@Repository &nbsp;<br />
	public class CustomerDAO {<br />
	<br />
	﻿&nbsp; private SessionFactory sessionFactory;<br />
	<br />
	﻿&nbsp; public CustomerDAO () {}<br />
	<br />
	<br />
	﻿&nbsp; /**<br />
	﻿&nbsp;&nbsp; * gives hibernate3 Session<br />
	﻿&nbsp;&nbsp; * @return current hibernate Session<br />
	﻿&nbsp;&nbsp; */<br />
	﻿&nbsp; private Session getSession () {<br />
	<br />
	﻿&nbsp; ﻿&nbsp; return sessionFactory.getCurrentSession();<br />
	﻿&nbsp; }<br />
	﻿ &nbsp;<br />
	﻿&nbsp; /**<br />
	﻿&nbsp;&nbsp; * gets Customer data from DataBase<br />
	﻿&nbsp;&nbsp; * @param customerId<br />
	﻿&nbsp;&nbsp; * @return<br />
	﻿&nbsp;&nbsp; */<br />
	﻿&nbsp; @Transactional(readOnly = true)<br />
	﻿&nbsp; public Customer getCustomersById (long customerId) {<br />
	﻿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Customer customer = (Customer) getSession().get(Customer.class, customerId);<br />
	﻿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return customer;<br />
	﻿&nbsp; }<br />
	<br />
	﻿&nbsp; /**<br />
	﻿&nbsp;&nbsp; * gets all Customer data from DataBase<br />
	﻿&nbsp;&nbsp; * @return list of customers<br />
	﻿&nbsp;&nbsp; */<br />
	﻿&nbsp; @Transactional(readOnly = true)<br />
	﻿&nbsp; public List&lt;Customer&gt; getCustomers () {<br />
	﻿&nbsp; ﻿&nbsp; List&lt;Customer&gt; customers = null;<br />
	<br />
	﻿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; customers = getSession().createQuery(&quot;from Customer&quot;).list();<br />
	<br />
	﻿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; return customers;<br />
	﻿&nbsp; }<br />
	﻿ &nbsp;<br />
	﻿&nbsp; /**<br />
	﻿&nbsp;&nbsp; * creates new Customer<br />
	﻿&nbsp;&nbsp; * @param newCustomer<br />
	﻿&nbsp;&nbsp; * @return<br />
	﻿&nbsp;&nbsp; */<br />
	﻿&nbsp; @Transactional<br />
	﻿&nbsp; public long create (Customer newCustomer) {<br />
	<br />
	﻿&nbsp; ﻿&nbsp; //getSession().beginTransaction();<br />
	﻿&nbsp; ﻿&nbsp; &nbsp;<br />
	﻿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Long id = (Long) getSession().save(newCustomer);<br />
	﻿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; newCustomer.setId(id);<br />
	﻿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<br />
	﻿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; //getSession().getTransaction().commit();<br />
	﻿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<br />
	﻿&nbsp; ﻿&nbsp; return id;<br />
	﻿&nbsp; }<br />
	﻿ &nbsp;<br />
	﻿&nbsp; /**<br />
	﻿&nbsp;&nbsp; * updates customer information<br />
	﻿&nbsp;&nbsp; * @param customer<br />
	﻿&nbsp;&nbsp; * @return affected rows<br />
	﻿&nbsp;&nbsp; */<br />
	﻿&nbsp; @Transactional<br />
	﻿&nbsp; public int update (Customer customer) {<br />
	﻿&nbsp; ﻿ &nbsp;<br />
	﻿&nbsp; ﻿&nbsp; getSession().merge(customer);<br />
	﻿&nbsp; ﻿&nbsp; return 0;<br />
	﻿&nbsp; }<br />
	﻿ &nbsp;<br />
	﻿&nbsp; /**<br />
	﻿&nbsp;&nbsp; * delete customer &nbsp;<br />
	﻿&nbsp;&nbsp; * @param customerId<br />
	﻿&nbsp;&nbsp; * @return affected rows<br />
	﻿&nbsp;&nbsp; */<br />
	﻿&nbsp; @Transactional<br />
	﻿&nbsp; public int delete (Long customerId) {;<br />
	﻿&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;<br />
	﻿&nbsp; ﻿&nbsp; // It&#39;s easier to delete using the object.. but<br />
	﻿&nbsp; ﻿&nbsp; // just to see how we should delete by id:<br />
	﻿&nbsp;&nbsp; ﻿&nbsp; Customer customerToDelete = (Customer) sessionFactory.getCurrentSession().load(Customer.class,customerId);<br />
	﻿&nbsp;&nbsp; ﻿&nbsp; getSession().delete(customerToDelete);<br />
	﻿&nbsp; ﻿&nbsp; return 0;<br />
	﻿&nbsp; }<br />
	<br />
	﻿&nbsp; /**<br />
	﻿&nbsp;&nbsp; * @return the sessionFactory<br />
	﻿&nbsp;&nbsp; */<br />
	﻿&nbsp; public SessionFactory getSessionFactory() {<br />
	﻿&nbsp; ﻿&nbsp; return sessionFactory;<br />
	﻿&nbsp; }<br />
	<br />
	﻿&nbsp; /**<br />
	﻿&nbsp;&nbsp; * @param sessionFactory the sessionFactory to set<br />
	﻿&nbsp;&nbsp; */<br />
	﻿&nbsp; public void setSessionFactory(SessionFactory sessionFactory) {<br />
	﻿&nbsp; ﻿&nbsp; this.sessionFactory = sessionFactory;<br />
	﻿&nbsp; ﻿&nbsp; if (sessionFactory.isClosed()) {System.out.println(&quot;Su puta m,adre&quot;);}<br />
	﻿&nbsp; }<br />
	<br />
	<br />
	}</span><br />
	<br />
	<strong>El fichero XML de Spring</strong><br />
	Atenci&oacute;n, para las transacciones necesitaremos el namespace tx. El AOP est&aacute; sin probar.<br />
	<br />
	<span style="font-family:courier new,courier,monospace;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;<br />
	&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;<br />
	﻿&nbsp; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;<br />
	﻿&nbsp; xmlns:aop=&quot;http://www.springframework.org/schema/aop&quot;<br />
	﻿&nbsp; xmlns:tx=&quot;http://www.springframework.org/schema/tx&quot;<br />
	﻿&nbsp; xmlns:p=&quot;http://www.springframework.org/schema/p&quot;<br />
	﻿&nbsp; xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans<br />
	﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; http://www.springframework.org/schema/beans/spring-beans-3.2.xsd<br />
	﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; http://www.springframework.org/schema/aop<br />
	﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; http://www.springframework.org/schema/aop/spring-aop-3.2.xsd<br />
	﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; http://www.springframework.org/schema/tx<br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; http://www.springframework.org/schema/tx/spring-tx-3.0.xsd&quot;&gt;<br />
	<br />
	<br />
	&nbsp;&lt;tx:annotation-driven transaction-manager=&quot;transactionManager&quot; /&gt;<br />
	&nbsp;<br />
	&lt;!-- We define a Bean for datasource --&gt;<br />
	&lt;bean id=&quot;dataSource&quot; class=&quot;org.springframework.jdbc.datasource.DriverManagerDataSource&quot;&gt;<br />
	﻿&nbsp; ﻿&nbsp; &lt;property name=&quot;driverClassName&quot; value=&quot;com.mysql.jdbc.Driver&quot; /&gt;<br />
	﻿&nbsp; ﻿&nbsp; &lt;property name=&quot;url&quot; value=&quot;jdbc:mysql://localhost:3306/erp&quot; /&gt;<br />
	﻿&nbsp; ﻿&nbsp; &lt;property name=&quot;username&quot; value=&quot;root&quot; /&gt;<br />
	﻿&nbsp; ﻿&nbsp; &lt;property name=&quot;password&quot; value=&quot;root&quot; /&gt;<br />
	&lt;/bean&gt;<br />
	<br />
	&lt;!--<br />
	We create Hibernate&#39;s SessionFactory bean<br />
	to get a Hibernate session in our program<br />
	If you pay attention you&#39;ll realize that this bean config<br />
	is somehow like the hibernate.cfg.xml configuration. We don&#39;t need<br />
	to create that file now.<br />
	--&gt;<br />
	&lt;bean id=&quot;sessionFactory&quot; class=&quot;org.springframework.orm.hibernate3.LocalSessionFactoryBean&quot;&gt;<br />
	﻿&nbsp; &lt;property name=&quot;dataSource&quot; ref=&quot;dataSource&quot; /&gt;<br />
	﻿&nbsp; &lt;property name=&quot;mappingResources&quot;&gt;<br />
	﻿&nbsp; ﻿&nbsp; &lt;list&gt;<br />
	﻿&nbsp; ﻿&nbsp; ﻿&nbsp; &lt;value&gt;Customer.hbm.xml&lt;/value&gt;<br />
	﻿&nbsp; ﻿&nbsp; &lt;/list&gt;﻿&nbsp; ﻿ &nbsp;<br />
	﻿&nbsp; &lt;/property&gt;<br />
	﻿&nbsp; &lt;property name=&quot;hibernateProperties&quot;&gt;<br />
	﻿&nbsp; ﻿&nbsp; &lt;props&gt;<br />
	﻿&nbsp; ﻿&nbsp; ﻿&nbsp; &lt;prop key=&quot;hibernate.show_sql&quot;&gt;true&lt;/prop&gt;<br />
	﻿&nbsp; ﻿&nbsp; ﻿&nbsp; &lt;prop key=&quot;dialect&quot;&gt;org.hibernate.dialect.HSQLDialect&lt;/prop&gt;<br />
	﻿&nbsp; ﻿&nbsp; &lt;/props&gt;<br />
	﻿&nbsp; &lt;/property&gt;<br />
	&lt;/bean&gt;<br />
	<br />
	&lt;bean id=&quot;transactionManager&quot; class=&quot;org.springframework.orm.hibernate3.HibernateTransactionManager&quot;&gt;<br />
	&nbsp;&nbsp;&nbsp; &lt;property name=&quot;sessionFactory&quot; ref=&quot;sessionFactory&quot; /&gt;<br />
	&lt;/bean&gt;<br />
	<br />
	&lt;bean id=&quot;customerDao&quot; class=&quot;info.pello.spring.persistence.hibernate.CustomerDAO&quot; &gt;<br />
	﻿&nbsp; &lt;property name=&quot;sessionFactory&quot; ref=&quot;sessionFactory&quot; /&gt;<br />
	&lt;/bean&gt;<br />
	<br />
	&lt;!-- We create the journalist --&gt;<br />
	&lt;!--&nbsp; bean id=&quot;logger&quot; class=&quot;info.pello.spring.persistence.hibernate.Logger&quot; / --&gt;<br />
	&lt;!--<br />
	We add AOP<br />
	Don&#39;t forget to include in header:<br />
	﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; http://www.springframework.org/schema/aop<br />
	﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; ﻿&nbsp; http://www.springframework.org/schema/aop/spring-aop-3.2.xsd<br />
	--&gt;<br />
	<br />
	&lt;!--&nbsp; aop:config&gt;<br />
	﻿&nbsp; &lt;aop:aspect ref=&quot;logger&quot;&gt;<br />
	﻿&nbsp; ﻿&nbsp; &lt;aop:pointcut id=&quot;running&quot;<br />
	﻿&nbsp; ﻿&nbsp; ﻿&nbsp; expression=&quot;execution(* *.run(..))&quot; /&gt;<br />
	﻿&nbsp; ﻿&nbsp; &lt;aop:after pointcut-ref=&quot;running&quot;<br />
	﻿&nbsp; ﻿&nbsp; ﻿&nbsp; method=&quot;reportRunning&quot;/&gt;<br />
	﻿&nbsp; &lt;/aop:aspect&gt;<br />
	&lt;/aop:config --&gt;<br />
	<br />
	&lt;/beans&gt;</span></p>
