<p>
	&nbsp;</p>
<div>
	Bueno, para celebrar que el fin de semana toca a su fin vamos a ver otro ejemplo de mapeo de Hibernate, en este caso el mapeo many-to-many, es decir cuando la relaci&oacute;n entre dos entidades es M:N.&nbsp;</div>
<div>
	El <a href="http://code.google.com/p/erps-2dam-4vientos/source/browse/trunk/HibernateSamples/">c&oacute;digo lo puedes encontrar en Google code</a>.</div>
<div>
	&nbsp;</div>
<div>
	Como ejemplo vamos a usar un cl&aacute;sico Usuario/Roles. Un usuario de una aplicaci&oacute;n puede tener distintos roles, desde usuario raso a superadministrador, y de la misma manera puede haber m&aacute;s de un usuario que sea usuario raso o administrador.&nbsp;</div>
<div>
	En ese tipo de relaciones se generan tres tablas:</div>
<div>
	-La de usuario&nbsp;</div>
<div>
	-La de roles</div>
<div>
	-Y la que relaciona ambas, donde cada registro contiene idusuario e idrol ambas formando la clave.</div>
<div>
	&nbsp;</div>
<div>
	Para mapear esto con hibernate no har&iacute;a falta crear otra Clase intermedia.</div>
<div>
	Vamos a ver c&oacute;mo quedar&iacute;a la cosa:</div>
<div>
	&nbsp;</div>
<h3>
	La clase User.java</h3>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.maven.hibernate.HibernateSamples;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import java.util.HashSet;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import java.util.Set;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* Represents system User data</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class User {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private long id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String login;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String password;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String email;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private Set<role> roles = new HashSet<role>();</role></role></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * default constructor</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public User () {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * Constructor with all attributes</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param login</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param password</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param email</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public User(long id, String login, String password, String email) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.id = id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.login = login;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.password = password;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.email = email;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿<span class="Apple-tab-span" style="white-space: pre; "> </span>// GETTERS/SETTERS...</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<h3>
	La clase Role.java</h3>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.maven.hibernate.HibernateSamples;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import java.util.HashSet;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import java.util.Set;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* Represents system User role data</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class Role {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private long id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String name;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String description;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; private Set<user> users = new HashSet<user>();</user></user></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * default constructor</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Role () {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * Constructor with all attributes</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param name</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param description</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Role(long id, String name, String description) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.id = id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.name = name;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.description = description;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿<span class="Apple-tab-span" style="white-space: pre; "> </span>// GETTERS/SETTERS...</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<h3>
	El mapeo de la clase User: User.hbm.xml</h3>
<div>
	<span style="font-family:courier new,courier,monospace;"><!--?xml version="1.0" encoding="UTF-8"?--></span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &quot;-//Hibernate/Hibernate Mapping DTD 3.0//EN&quot;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &quot;http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd&quot;&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;<!-- Mapping configuration details between Customer class and customer table --></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;"><hibernate-mapping package="info.pello.maven.hibernate.HibernateSamples"></hibernate-mapping></span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; <class name="User" table="user"></class></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <id column="id" name="id"></id></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <generator class="native"></generator></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; </span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <property column="login" name="login"></property></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <property column="password" name="password"></property></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <property column="email" name="email"></property></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <set name="roles" span="" table="userrole"></set></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; inverse=&quot;false&quot; lazy=&quot;true&quot; fetch=&quot;select&quot; cascade=&quot;all&quot;&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <key column="iduser"></key></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <many-to-many class="Role" column="idrole"></many-to-many></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; </span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; </span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<h3>
	El mapeo de la clase Role: Role.hbm.xml</h3>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;"><!--?xml version="1.0" encoding="UTF-8"?--></span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &quot;-//Hibernate/Hibernate Mapping DTD 3.0//EN&quot;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &quot;http://hibernate.sourceforge.net/hibernate-mapping-3.0.dtd&quot;&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;<!-- Mapping configuration details between Customer class and customer table --></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;"><hibernate-mapping package="info.pello.maven.hibernate.HibernateSamples"></hibernate-mapping></span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; <class name="Role" table="role"></class></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <id column="id" name="id"></id></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <generator class="native"></generator></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; </span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <property column="name" name="name"></property></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <property column="description" name="description"></property></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <set name="users" span="" table="userrole"></set></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; inverse=&quot;true&quot; lazy=&quot;true&quot; fetch=&quot;select&quot;&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <key column="iduser"></key></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <many-to-many class="Role" column="idrole"></many-to-many></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; </span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; </span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<h3>
	hibernate.cfg.xml</h3>
<div>
	La configuraci&oacute;n no necesita m&aacute;s que a&ntilde;adir las dos l&iacute;neas con los nuevos mapeos:</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <!-- Here comes the mapping definition - saved in resources dir with this hibernate config --></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <mapping resource="Customer.hbm.xml"></mapping></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <mapping resource="Car.hbm.xml"></mapping></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <mapping resource="Insurance.hbm.xml"></mapping></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <mapping resource="Product.hbm.xml"></mapping></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <mapping resource="ProductType.hbm.xml"></mapping></span></div>
<div>
	<strong><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <mapping resource="User.hbm.xml"></mapping></span></strong></div>
<div>
	<strong><span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; <mapping resource="Role.hbm.xml"></mapping></span></strong></div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<h3>
	Main.java</h3>
<div>
	&nbsp;</div>
<div>
	Y la clase main donde probamos todo:</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.maven.hibernate.HibernateSamples;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import java.util.ArrayList;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import java.util.HashSet;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import java.util.List;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* Main class</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @greetz 4 u</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @listening OST Batman Dark Knight Rises</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class Main &nbsp;{</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * simple function for reusing</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param userDAOInterface</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public static void showAllUsers (UserDAOInterface userDAOInterface) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// SELECT ALL DATA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;List<user> users = userDAOInterface.selectAll();</user></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;String userDesc = &quot;&quot;;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;System.out.println(&quot;\n--- Users ----- table contents -----------&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; for(User user : users) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; ﻿ &nbsp;userDesc = &quot;Id: &quot; + user.getId() +&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; ﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&quot; - Name: &quot; + user.getLogin();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; ﻿ &nbsp;System.out.println(userDesc);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; }</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; System.out.println(&quot;Total users: &quot; + users.size());﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * simple function for reusing</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param userDAOInterface</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public static void showAllRoles (RoleDAOInterface roleDAOInterface) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// SELECT ALL DATA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;List<role> roles = roleDAOInterface.selectAll();</role></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;String roleDesc = &quot;&quot;;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;System.out.println(&quot;\n--- Roles ----- table contents -----------&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; for(Role role : roles) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; ﻿ &nbsp;roleDesc = &quot;Id: &quot; + role.getId() +&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; ﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&quot; - Name: &quot; + role.getName() +</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; ﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&quot; - Description: &quot; + role.getDescription();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; ﻿ &nbsp;System.out.println(roleDesc);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; }</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; System.out.println(&quot;Total roles: &quot; + roles.size());﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * main function</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param args</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; public static void main( String[] args )</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; {</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;UserDAOInterface userDAO = new UserDAO();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;RoleDAOInterface roleDAO = new RoleDAO();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;showAllUsers(userDAO);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; // SELECT JUST ONE</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; User oneUser = userDAO.selectById(1);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;System.out.println(&quot;Selected Name: &quot; + oneUser.getLogin());</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; // INSERT NEW DATA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;Role role = new Role(0,&quot;default&quot;,&quot;Another role&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;roleDAO.insert(role);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;HashSet<role> roles = new HashSet<role>();</role></role></span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;roles.add(role);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;User newUser = new User(0,&quot;newuser&quot;,&quot;1234567&quot;,&quot;newuser@gmail.com&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;newUser.setRoles(roles);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;userDAO.insert(newUser);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;System.out.println(&quot;Inserted id: &quot; + newUser.getId());</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; System.out.println(&quot;Show data after new insert&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;showAllUsers(userDAO);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; // UPDATE DATA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; newUser.setLogin(&quot;changed&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; userDAO.update(newUser);</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; System.out.println(&quot;Show data after update&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;showAllUsers(userDAO);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; // DELETE DATA</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; userDAO.delete(newUser);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;showAllUsers(userDAO);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; ﻿ &nbsp;showAllRoles(roleDAO);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; }</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<h3>
	Estructura en MYSQL</h3>
<div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">--</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">-- Estructura de tabla para la tabla `role`</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">--</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">CREATE TABLE IF NOT EXISTS `role` (</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; `id` bigint(11) NOT NULL AUTO_INCREMENT,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; `name` varchar(30) NOT NULL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; `description` varchar(255) NOT NULL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; PRIMARY KEY (`id`)</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">) ENGINE=MyISAM &nbsp;DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">-- --------------------------------------------------------</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">--</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">-- Estructura de tabla para la tabla `user`</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">--</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">CREATE TABLE IF NOT EXISTS `user` (</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; `id` bigint(11) NOT NULL AUTO_INCREMENT,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; `login` varchar(50) NOT NULL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; `password` varchar(100) NOT NULL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; `email` varchar(100) NOT NULL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; PRIMARY KEY (`id`)</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">) ENGINE=MyISAM &nbsp;DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">-- --------------------------------------------------------</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">--</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">-- Estructura de tabla para la tabla `userrole`</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">--</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">CREATE TABLE IF NOT EXISTS `userrole` (</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; `iduser` bigint(11) NOT NULL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; `idrole` bigint(11) NOT NULL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp; PRIMARY KEY (`iduser`,`idrole`)</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">) ENGINE=MyISAM DEFAULT CHARSET=utf8;</span></div>
</div>
