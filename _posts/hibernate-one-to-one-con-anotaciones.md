<p>
	&nbsp;</p>
<div>
	En este post sobre Hibernate y las relaciones one to one vimos un ejemplo que utilizaba los mapeos con ficheros XML. Lo de este post ser&aacute; lo mismo pero con anotaciones. En este caso son algo m&aacute;s pecualiares que las simples @Column.</div>
<div>
	&nbsp;</div>
<div>
	La bueno es que para hacer esto lo &uacute;nico que tenemos que hacer es retocar las clases que representan las entidades y meterles las anotaciones (y de paso algunos imports claro). Luego cambiamos el fichero de configuraci&oacute;n de hibernate y cambiamos la referencia a ficheros de mapeo xml por referencias a las clases que representan a las entidades directamente. El <a href="http://code.google.com/p/erps-2dam-4vientos/source/browse/trunk/HibernateAnnotationsSamples/">c&oacute;digo fuente lo tienes en google code</a>.</div>
<div>
	&nbsp;</div>
<div>
	<strong>Car.java</strong></div>
<div>
	As&iacute; quedar&iacute;a la clase que representa al coche</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.maven.hibernate.HibernateAnnotationsSamples;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">//We need all of these for annotations</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Entity;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Table;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.CascadeType;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Column;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.GeneratedValue;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.OneToOne;</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* Represents a company car</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Altadill</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @greetz Taberna chocolate cake</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">@Entity</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">@Table(name=&quot;car&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class Car {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @GeneratedValue</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Column(name=&quot;id&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private int id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Column(name=&quot;registration&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private String registration;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Column(name=&quot;model&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String model;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @OneToOne(mappedBy=&quot;car&quot;, cascade=CascadeType.ALL)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private Insurance insurance;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Car () {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param registration</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param model</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Car(int id, String registration, String model) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.id = id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.registration = registration;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.model = model;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">// GETTERS/SETTERS</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">//...</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<div>
	<strong>Insurance.java</strong></div>
<div>
	Y la otra clase con la que hay una relaci&oacute;n 1:1 quedar&iacute;a como sigue.</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.maven.hibernate.HibernateAnnotationsSamples;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">// We need all of these for annotations</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Entity;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Table;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.CascadeType;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Column;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.GeneratedValue;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.PrimaryKeyJoinColumn;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.Id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.persistence.OneToOne;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import org.hibernate.annotations.GenericGenerator;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import org.hibernate.annotations.Parameter;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* Represents the insurance for a car</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @greetz Taberna chocolate cake</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">@Entity</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">@Table(name=&quot;insurance&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class Insurance {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Column(name=&quot;idcar&quot;, unique=true, nullable=false)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @GeneratedValue(generator=&quot;gen&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @GenericGenerator(name=&quot;gen&quot;, strategy=&quot;foreign&quot;, parameters=@Parameter(name=&quot;property&quot;, value=&quot;car&quot;))</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private int idcar;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Column(name=&quot;company&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String company;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Column(name=&quot;type&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String type;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @Column(name=&quot;cost&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private double cost;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @OneToOne</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; @PrimaryKeyJoinColumn</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private Car car;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Insurance () {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param company</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param type</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param cost</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Insurance(String company, String type, double cost) {</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.company = company;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.type = type;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.cost = cost;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">// GETTERS/SETTERS</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">//...</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<div>
	<strong>hibernate.cfg.xml</strong></div>
<div>
	Y en el fichero hibernate.cfg.xml lo &uacute;nico que se a&ntilde;aden son dos mapeos nuevos</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; ﻿ &nbsp;﻿ &nbsp;&lt;!-- Here comes the mapping using annotations in a java class --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;mapping class=&quot;info.pello.maven.hibernate.HibernateAnnotationsSamples.Customer&quot; /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;mapping class=&quot;info.pello.maven.hibernate.HibernateAnnotationsSamples.Car&quot; /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;mapping class=&quot;info.pello.maven.hibernate.HibernateAnnotationsSamples.Insurance&quot; /&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	&iquest;El resto? los interfaces, el DAO, la funci&oacute;n &nbsp;principal,... exactamente IGUAL.</div>
<div>
	&nbsp;</div>
<div>
	Para variar vamos a ver el output de la principal, donde podremos ver el volcado de las sentencias</div>
<div>
	sql que ejecuta hibernate, ya que as&iacute; se lo hemos indicado en la configuraci&oacute;n:</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;!-- Echo all executed SQL to stdout --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &lt;property name=&quot;show_sql&quot;&gt;true&lt;/property&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	Primero ver&aacute;s el inicio de Maven, luego la incializaci&oacute;n de Hibernate y finalmente los logs del programa en si</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">SLF4J: Failed to load class &quot;org.slf4j.impl.StaticLoggerBinder&quot;.</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">SLF4J: Defaulting to no-operation (NOP) logger implementation</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] Scanning for projects...</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] ------------------------------------------------------------------------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] Building HibernateSamples 0.0.1-SNAPSHOT</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] ------------------------------------------------------------------------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO]&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] &gt;&gt;&gt; exec-maven-plugin:1.2.1:java (default-cli) @ HibernateSamples &gt;&gt;&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO]&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] &lt;&lt;&lt; exec-maven-plugin:1.2.1:java (default-cli) @ HibernateSamples &lt;&lt;&lt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO]&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] --- exec-maven-plugin:1.2.1:java (default-cli) @ HibernateSamples ---</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:52 PM org.hibernate.annotations.common.Version &lt;clinit&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HCANN000001: Hibernate Commons Annotations {4.0.1.Final}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:52 PM org.hibernate.Version logVersion</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000412: Hibernate Core {4.2.1.Final}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:52 PM org.hibernate.cfg.Environment &lt;clinit&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000206: hibernate.properties not found</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:52 PM org.hibernate.cfg.Environment buildBytecodeProvider</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000021: Bytecode provider name : javassist</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:52 PM org.hibernate.cfg.Configuration configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000043: Configuring from resource: /hibernate.cfg.xml</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:52 PM org.hibernate.cfg.Configuration getConfigurationInputStream</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000040: Configuration resource: /hibernate.cfg.xml</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:53 PM org.hibernate.cfg.Configuration doConfigure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000041: Configured SessionFactory: null</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:53 PM org.hibernate.service.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000402: Using Hibernate built-in connection pool (not for production use!)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:53 PM org.hibernate.service.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000115: Hibernate connection pool size: 1</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:53 PM org.hibernate.service.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000006: Autocommit mode: false</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:53 PM org.hibernate.service.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000401: using driver [com.mysql.jdbc.Driver] at URL [jdbc:mysql://localhost:3306/erp]</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:53 PM org.hibernate.service.jdbc.connections.internal.DriverManagerConnectionProviderImpl configure</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000046: Connection properties: {user=root, password=****}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:53 PM org.hibernate.dialect.Dialect &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000400: Using dialect: org.hibernate.dialect.MySQLDialect</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:53 PM org.hibernate.engine.jdbc.internal.LobCreatorBuilder useContextualLobCreation</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000423: Disabling contextual LOB creation as JDBC driver reported JDBC version [3] less than 4</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:53 PM org.hibernate.engine.transaction.internal.TransactionFactoryInitiator initiateService</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000399: Using default transaction strategy (direct JDBC transactions)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:53 PM org.hibernate.hql.internal.ast.ASTQueryTranslatorFactory &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000397: Using ASTQueryTranslatorFactory</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:54 PM org.hibernate.tool.hbm2ddl.SchemaValidator validate</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000229: Running schema validator</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:54 PM org.hibernate.tool.hbm2ddl.SchemaValidator validate</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000102: Fetching database metadata</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:54 PM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000261: Table found: erp.car</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:54 PM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000037: Columns: [id, model, registration]</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:54 PM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000261: Table found: erp.customer</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:54 PM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000037: Columns: [id, email, address, name]</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:54 PM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000261: Table found: erp.insurance</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">jul 17, 2013 12:55:54 PM org.hibernate.tool.hbm2ddl.TableMetadata &lt;init&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">INFO: HHH000037: Columns: [company, type, cost, idcar]</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select car0_.id as id1_0_, car0_.model as model2_0_, car0_.registration as registra3_0_ from car car0_</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select insurance0_.idcar as idcar1_2_1_, insurance0_.company as company2_2_1_, insurance0_.cost as cost3_2_1_, insurance0_.type as type4_2_1_, car1_.id as id1_0_0_, car1_.model as model2_0_0_, car1_.registration as registra3_0_0_ from insurance insurance0_ left outer join car car1_ on insurance0_.idcar=car1_.id where insurance0_.idcar=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select insurance0_.idcar as idcar1_2_1_, insurance0_.company as company2_2_1_, insurance0_.cost as cost3_2_1_, insurance0_.type as type4_2_1_, car1_.id as id1_0_0_, car1_.model as model2_0_0_, car1_.registration as registra3_0_0_ from insurance insurance0_ left outer join car car1_ on insurance0_.idcar=car1_.id where insurance0_.idcar=?</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">--- CARS ----- table contents -----------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 1 - Model: Skoda Fabia TDI - Insurance: AXA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 2 - Model: Ferrari Enzo - Insurance: AEG</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Total cars: 2</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select car0_.id as id1_0_1_, car0_.model as model2_0_1_, car0_.registration as registra3_0_1_, insurance1_.idcar as idcar1_2_0_, insurance1_.company as company2_2_0_, insurance1_.cost as cost3_2_0_, insurance1_.type as type4_2_0_ from car car0_ left outer join insurance insurance1_ on car0_.id=insurance1_.idcar where car0_.id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Selected Name: 4653WCE</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: insert into car (model, registration) values (?, ?)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: insert into insurance (company, cost, type, idcar) values (?, ?, ?, ?)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Inserted id: 5</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Show data after new insert</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select car0_.id as id1_0_, car0_.model as model2_0_, car0_.registration as registra3_0_ from car car0_</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select insurance0_.idcar as idcar1_2_1_, insurance0_.company as company2_2_1_, insurance0_.cost as cost3_2_1_, insurance0_.type as type4_2_1_, car1_.id as id1_0_0_, car1_.model as model2_0_0_, car1_.registration as registra3_0_0_ from insurance insurance0_ left outer join car car1_ on insurance0_.idcar=car1_.id where insurance0_.idcar=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select insurance0_.idcar as idcar1_2_1_, insurance0_.company as company2_2_1_, insurance0_.cost as cost3_2_1_, insurance0_.type as type4_2_1_, car1_.id as id1_0_0_, car1_.model as model2_0_0_, car1_.registration as registra3_0_0_ from insurance insurance0_ left outer join car car1_ on insurance0_.idcar=car1_.id where insurance0_.idcar=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select insurance0_.idcar as idcar1_2_1_, insurance0_.company as company2_2_1_, insurance0_.cost as cost3_2_1_, insurance0_.type as type4_2_1_, car1_.id as id1_0_0_, car1_.model as model2_0_0_, car1_.registration as registra3_0_0_ from insurance insurance0_ left outer join car car1_ on insurance0_.idcar=car1_.id where insurance0_.idcar=?</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">--- CARS ----- table contents -----------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 1 - Model: Skoda Fabia TDI - Insurance: AXA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 2 - Model: Ferrari Enzo - Insurance: AEG</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 5 - Model: Volkswagen passat - Insurance: Lagun Aro</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Total cars: 3</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select car0_.id as id1_0_1_, car0_.model as model2_0_1_, car0_.registration as registra3_0_1_, insurance1_.idcar as idcar1_2_0_, insurance1_.company as company2_2_0_, insurance1_.cost as cost3_2_0_, insurance1_.type as type4_2_0_ from car car0_ left outer join insurance insurance1_ on car0_.id=insurance1_.idcar where car0_.id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: update car set model=?, registration=? where id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Show data after update</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select car0_.id as id1_0_, car0_.model as model2_0_, car0_.registration as registra3_0_ from car car0_</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select insurance0_.idcar as idcar1_2_1_, insurance0_.company as company2_2_1_, insurance0_.cost as cost3_2_1_, insurance0_.type as type4_2_1_, car1_.id as id1_0_0_, car1_.model as model2_0_0_, car1_.registration as registra3_0_0_ from insurance insurance0_ left outer join car car1_ on insurance0_.idcar=car1_.id where insurance0_.idcar=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select insurance0_.idcar as idcar1_2_1_, insurance0_.company as company2_2_1_, insurance0_.cost as cost3_2_1_, insurance0_.type as type4_2_1_, car1_.id as id1_0_0_, car1_.model as model2_0_0_, car1_.registration as registra3_0_0_ from insurance insurance0_ left outer join car car1_ on insurance0_.idcar=car1_.id where insurance0_.idcar=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: select insurance0_.idcar as idcar1_2_1_, insurance0_.company as company2_2_1_, insurance0_.cost as cost3_2_1_, insurance0_.type as type4_2_1_, car1_.id as id1_0_0_, car1_.model as model2_0_0_, car1_.registration as registra3_0_0_ from insurance insurance0_ left outer join car car1_ on insurance0_.idcar=car1_.id where insurance0_.idcar=?</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">--- CARS ----- table contents -----------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 1 - Model: Skoda Fabia TDI - Insurance: AXA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 2 - Model: Ferrari Enzo - Insurance: AEG</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Id: 5 - Model: Seat Panda TDI - Insurance: Lagun Aro</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Total cars: 3</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: delete from insurance where idcar=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">Hibernate: delete from car where id=?</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] ------------------------------------------------------------------------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] BUILD SUCCESS</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] ------------------------------------------------------------------------</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] Total time: 3.776s</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] Finished at: Wed Jul 17 12:55:55 CEST 2013</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] Final Memory: 9M/22M</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">[INFO] ------------------------------------------------------------------------</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
