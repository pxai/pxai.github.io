<p>Algo muy común y recomendable en cualquier proyecto medianamente serio es contar con un servidor de desarrollo y otro de producción, además del propio equipo del programador donde se hacen las primeras pruebas. Los programas se prueban en local, se prueban en desarrollo y finalmente, cuando se ha verificado
que todo está correcto, se puede pasar a producción donde se explotará una BD con datos reales y habrá
usuarios reales. Hay lugares en los que incluso existe una servidor de pre-producción.</p>

<p>Lo normal en cualquier proyecto mínimamente cuerdo es que el desarrollo se haga con una BD con la
misma estructura que la BD de producción pero por supuesto con datos
inventados. La configuración del programa por tanto <b>es distinta en desarrollo y en producción</b>.
Si los programadores han sido mínimamente serios, deben haber programado el acceso a los datos de una forma que el código no tenga que variar en un entorno u otro. Lo ideal es que la configuración del acceso
a la BD (driver, url, nombre, password) más otras configuraciones estén aisladas en un único fichero de
propiedades (properties, xml, lo que sea, pero aislado). De esta forma, cuando pasamos el proyecto de desarrollo a producción lo único que debe variar es el fichero de configuración.</p> 
<p>
Lo que pasa es que según el tipo de proyecto, si la aplicación esta comprimida por ejemplo en un jar o en un war y dentro contiene ese ficherillo de configuración tenemos que ser capaces de generar un fichero de proyecto para desarrollo y otro para producción.
</p>

<h5>Maven controla</h5>
<p>Esta situación tan típica está prevista en Maven. En Maven podemos definir los profiles o perfiles
que nos permite aplicar distintas propiedades (BD, usuario, password) al proyecto, y lo que es más interesante, automáticamente
puede propagar esas propiedades a ficheros properties, a ficheros de contexto spring, o a cualquier fichero que metamos dentro de la carpeta resources.</p>

<h5>settings.xml</h5>
<p>Para poder definir los tipos de entorno o perfil en los que trabajamos (desarrollo, producción) y para poder
decirle a Maven cuál de ellos se debe aplicar por defecto, dentro de nuestra carpeta Maven ($HOME/.m2)
debemos incluir un fichero xml llamado settings.xml cuyo contenido es bastante evidente:
</p>
<pre class="brush: xml">
<!-- 
$HOME/.m2/settings.xml

We set 3 profiles: dev, preproduction and production 
To check active profiles, in a project folder we run
mvn help:active-profiles

Now in our pom.xml we can add profiles with their own properties
like database settings
-->
<settings>
<profiles>
	<profile>
		<id>dev</id>
		<activation>
			<!-- dev is active by default, so doing 'mvn install' will apply this-->
			<activeByDefault>true</activeByDefault>
		</activation>
		<properties>
			<environment.type>dev</environment.type>
		</properties>
	</profile>
	<profile>
		<id>preproduction</id>
		<activation>
		<activeByDefault>false</activeByDefault>
		</activation>
		<properties>
			<environment.type>preproduction</environment.type>
		</properties>
	</profile>
	<profile>
		<id>production</id>
		<activation>
		<activeByDefault>false</activeByDefault>
		</activation>
		<properties>
			<environment.type>production</environment.type>
		</properties>
	</profile>
</profiles>
</settings>
</pre>

<h5>Los ficheros properties</h5>
<p>
Vamos a ver qué aspecto tienen dos ficheros cuyos valores queremos que cambien
según el perfil que queramos aplicar. Como veremos, en lugar de poner valores se ponen variables. Los dos se encuentran en la carpeta resources
del proyecto Maven (src/main/resources). Por un lado un fichero properties normalito:
</p>
<pre class="brush: java">
database.driverClassName=${database.driverClassName}
database.url=${database.url}
database.user=${database.user}
database.password=${database.password}
anyvalue=${anyvalue.name}
othervalue=This is just a test

</pre>
<p>Y por otro un fichero xml de contexto de Spring.</p>
<pre class="brush: xml">
...
<!-- We define a Bean for datasource -->
<bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
		<property name="driverClassName" value="${database.driverClassName}" />
		<property name="url" value="${database.url}" />
		<property name="username" value="${database.user}" />
		<property name="password" value="${database.password}" />
</bean>

<!-- 
We use a JdbcTemplates to avoid JDBC boilerplate code
warning: SimpleJdbcTempalte is deprecated 
-->
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
	<constructor-arg ref="dataSource" />
</bean>
...
</pre>


<h5>El pom.xml</h5>
<p>Y ahora viene cuando la matan. Dentro del fichero de proyecto Maven es donde vamos a definir
las propiedades de cada perfil. Si NO queremos que esos datos sean visibles para todo aquel que
maneja este fichero, podemos separar la parte de las properties y llevarlas al fichero settings.xml que
también contiene una sección properties por cada perfil. Es importante incluir la parte final del build resources ya que sin ella no se propagan las variables.
</p>
<pre class="brush: xml">
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>info.pello.maven.profilessample</groupId>
  <artifactId>MavenProfiles</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <packaging>jar</packaging>

  <name>MavenProfiles</name>
  <url>http://maven.apache.org</url>

  <properties>
  		<!-- Generic properties -->
		<java.version>1.6</java.version>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
  </properties>
  
 <profiles>
 	<!-- Maven will apply this by default as we set in $HOME/.m2/settings.xml -->
	<!-- mvn install -Denvironment.type=dev -->
		  <profile>
			<id>development</id>
			<activation>
				<property>
					<name>environment.type</name>
					<value>dev</value>
				</property>
			</activation>
			<properties>
				<database.driverClassName>com.mysql.jdbc.Driver</database.driverClassName>
				<database.url>jdbc:mysql://localhost:3306/erp-dev</database.url>
				<database.user>dev-user</database.user>
				<database.password>dev-user</database.password>
				<anyvalue.name>God</anyvalue.name>
			</properties>
	</profile>
	<!-- mvn install -Denvironment.type=production -->
	  <profile>
			<id>production</id>
			<activation>
				<property>
					<name>environment.type</name>
					<value>production</value>
				</property>
			</activation>
			<properties>
				<database.driverClassName>com.mysql.jdbc.Driver</database.driverClassName>
				<database.url>jdbc:mysql://localhost:3306/erp-prod</database.url>
				<database.user>prod-user</database.user>
				<database.password>prod-password</database.password>
				<anyvalue.name>Satan</anyvalue.name>
			</properties>
	</profile>
  
</profiles>

  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  
  <!-- We need this if we want the props to be populated on resource files -->
    <build>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
            </resource>
        </resources>
    </build>
</project>

</pre>

<h5>¿Y cómo aplico esto?</h5>
<p>Bien, por defecto se aplicará el perfil <i>dev</i>. Podemos verificar qué perfiles
tenemos activados con el siguiente comando:</p>
<pre class="brush: bash">
linux:~/workspace/MavenProfiles# mvn help:active-profiles
[INFO] Scanning for projects...
[INFO] Searching repository for plugin with prefix: 'help'.
[INFO] ------------------------------------------------------------------------
[INFO] Building MavenProfiles
[INFO]    task-segment: [help:active-profiles] (aggregator-style)
[INFO] ------------------------------------------------------------------------
[INFO] [help:active-profiles {execution: default-cli}]
[INFO] 
Active Profiles for Project 'info.pello.maven.profilessample:MavenProfiles:jar:0.0.1-SNAPSHOT': 

The following profiles are active:

 - dev (source: settings.xml)
 - dev (source: settings.xml)

</pre> 

<p>Si queremos que se aplique el perfil de production debemos ejecutar lo siguiente: 
</p>
<pre class="brush: bash">
linux:~/workspace/MavenProfiles# mvn install -Denvironment.type=production
[INFO] Scanning for projects...
[INFO] ------------------------------------------------------------------------
[INFO] Building MavenProfiles
[INFO]    task-segment: [install]
[INFO] ------------------------------------------------------------------------
[INFO] [resources:resources {execution: default-resources}]
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Copying 2 resources
[INFO] [compiler:compile {execution: default-compile}]
...
</pre>
<p>Para que cambie el contenido de los ficheros de desarrollo a producción NO ES NECESARIO HACER CLEAN,
mvn install mantiene el mismo código compilado pero sí propaga las propiedades.</p>

<p>Esto lo podemos hacer desde eclipse también. En un proyecto basado en Maven, podemos crear
distintos run configurations, en concreto un <i>Maven Build...</i>, uno que haga un install normal y otro al que le digamos que queremos
un perfil distinto, con lo que conseguimos el objetivo final: aplicar uno u otro con
un simple click</p>

<img src="http://www.pello.info/images/mavenprofiles.png" alt="Aplicando un install de producción" title="Aplicando un install de producción" />

<p>Y así es como quedaría por ejemplo el fichero properties tal y como se guarda en la carpeta target
o dentro del jar:</p>
<pre class="brush: bash">
linux:~/workspace/MavenProfiles# more target/classes/myproject.properties 
database.driverClassName=com.mysql.jdbc.Driver
database.url=jdbc:mysql://localhost:3306/erp-prod
database.user=prod-user
database.password=prod-password
anyvalue=Satan
othervalue=This is just a test

linux:~/workspace/MavenProfiles#
</pre>

<p>Asier jambo ¿ves qué fácil? Págate algo.</p>