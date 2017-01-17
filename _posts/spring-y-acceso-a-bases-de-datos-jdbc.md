<p>
	&nbsp;</p>
<div>
	El framework Spring aparte de servir como marco para la inyecci&oacute;n de dependencias tambi&eacute;n trata de facilitar &nbsp;la vida de los desarrolladores en muchos &aacute;mbitos de J2EE. En cualquier aplicaci&oacute;n que gestione datos nos veremos obligados a usar librer&iacute;as para explotar un SGBD. Cualquiera que haya programado c&oacute;digo JDBC, aunque haya aplicado patrones como el DAO se habr&aacute; topado conque el JDBC exige meter las mismas l&iacute;neas de c&oacute;digo una y otra y otra y otra vez, en lo que se conoce como <strong><em>boilerplate code</em></strong> o c&oacute;digo repetitivo: declarar el driver, abrir conexi&oacute;n, preparar sentencia, ejecutar, cerrar... etc.</div>
<div>
	&nbsp;</div>
<div>
	Spring nos ofrece una serie de librer&iacute;as para evitar tener que meter ese c&oacute;digo una y otra vez y simplificar el acceso a BBDD y adem&aacute;s lo hace aplicando la DI por supuesto. Una de esas librer&iacute;as es la que utiliza el JDBC pero de una forma m&aacute;s simple que es la que veremos a continuaci&oacute;n. Es una forma de quedarte a medio camino entre el bajo nivel (jdbc puro) y frameworks como hibernate (A veces nos puede interesar estar a bajo nivel seg&uacute;n el problema).</div>
<div>
	&nbsp;</div>
<div>
	En este caso tenemos una BD mysql llamada erp con una tabla llamada customer con los campos:</div>
<div>
	-id bigint</div>
<div>
	-name varchar</div>
<div>
	-address varchar</div>
<div>
	-email varchar</div>
<div>
	&nbsp;</div>
<div>
	Puedes descargar el c&oacute;digo fuente desde Google Code.</div>
<div>
	&nbsp;</div>
<div>
	Hay una clase Customer para mapear los registros de esa tabla y una clase DAO que utilizar&aacute; la librer&iacute;a</div>
<div>
	especial de Spring JdbcTemplate&nbsp;Lo que vamos a hacer es un programa muy simple que crear&aacute; una instancia del DAO y llevar&aacute; a cabo las operaciones&nbsp;CRUD t&iacute;picas.&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	En el DAO se utilizan dos clases para las operaciones de BD:</div>
<div>
	JdbcTemplate y NamedParameterJdbcTemplate. La primera es m&aacute;s simple, la segunda nos permite operaciones</div>
<div>
	tipo preparedStatement pero con parametros con nombre Ya las veremos.</div>
<div>
	Esas dos clases las va inyectar Spring en el DAO, y en el fichero XML de Spring se le pasar&aacute; una propiedad</div>
<div>
	fundamental: un DataSource, que no es sino otro bean donde se configura el acceso a la BBDD:</div>
<div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;!-- We define a Bean for datasource --&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;bean id=&quot;dataSource&quot; class=&quot;org.springframework.jdbc.datasource.DriverManagerDataSource&quot;&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;property name=&quot;driverClassName&quot; value=&quot;com.mysql.jdbc.Driver&quot; /&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;property name=&quot;url&quot; value=&quot;jdbc:mysql://localhost:3306/erp&quot; /&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;property name=&quot;username&quot; value=&quot;root&quot; /&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;property name=&quot;password&quot; value=&quot;root&quot; /&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;/bean&gt;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;!--&nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">We use a JdbcTemplates to avoid JDBC boilerplate code</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">warning: SimpleJdbcTempalte is deprecated&nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">--&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;bean id=&quot;jdbcTemplate&quot; class=&quot;org.springframework.jdbc.core.JdbcTemplate&quot;&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;constructor-arg ref=&quot;dataSource&quot; /&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;/bean&gt;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;bean id=&quot;namedParameterJdbcTemplate&quot; class=&quot;org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate&quot;&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;constructor-arg ref=&quot;dataSource&quot; /&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;/bean&gt;</span></div>
	<div>
		&nbsp;</div>
</div>
<div>
	&nbsp;</div>
<div>
	<strong>Customer.java</strong></div>
<div>
	La clase Customer no es m&aacute;s que un pojo:</div>
<div>
	<div>
		package info.pello.spring.persistence;</div>
	<div>
		&nbsp;</div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* POJO class for Customer</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Altadill</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;*</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">public class Customer {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private long id;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String name;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String address;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String email;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * default constructor</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Customer () {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param id</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param name</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param address</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Customer(long id, String name, String address, String email) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.id = id;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.name = name;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.address = address;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.email = email;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/* (non-Javadoc)</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @see java.lang.Object#toString()</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Override</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public String toString() {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return &quot;Customer [id=&quot; + id + &quot;, name=&quot; + name + &quot;, address=&quot; + address</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;+ &quot;]&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/********** Getters/Setters ********************/</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public long getId() {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return id;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void setId(long id) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.id = id;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public String getName() {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return name;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void setName(String name) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.name = name;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public String getAddress() {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return address;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void setAddress(String address) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.address = address;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return the email</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public String getEmail() {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return email;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param email the email to set</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void setEmail(String email) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.email = email;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">}</span></div>
	<div>
		&nbsp;</div>
</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<strong>CustomerDAO</strong></div>
<div>
	Y ahora viene lo gordo, el CustomerDAO. Algunas operaciones se pueden hacer de manera m&aacute;s o menos simple.</div>
<div>
	Puede que alguno ya est&eacute; pensando &quot;pues m&aacute;s vale que me iba a quitar el boilerplate&quot;. Bueno, lo sustituyes</div>
<div>
	por algo m&aacute;s complejo quiz&aacute;, seg&uacute;n el caso. Desde luego que hibernate queda m&aacute;s limpio que esto, peeeero,&nbsp;</div>
<div>
	en caso de no quererlo tienes esta forma:</div>
<div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">package info.pello.spring.persistence;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import org.springframework.jdbc.core.JdbcTemplate;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import org.springframework.jdbc.core.simple.ParameterizedRowMapper;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import org.springframework.jdbc.support.GeneratedKeyHolder;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import java.sql.ResultSet;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import java.sql.SQLException;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import java.util.ArrayList;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import java.util.List;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import java.util.Map;</span></div>
	<div>
		&nbsp;</div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* DAO for customer entity</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* @greetz Blue Mug</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;*</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">public class CustomerDAO {</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;// I use both jdbcTemplate/namedParameterJdbcTemplate depending on needs</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private JdbcTemplate jdbcTemplate;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private NamedParameterJdbcTemplate namedParameterJdbcTemplate;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private final static String CREATE_SQL = &quot;insert into customer (name,address,email) values(:name,:address,:email)&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private final static String UPDATE_SQL = &quot;update customer set name=?,address=?,email=? where id=?&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private final static String DELETE_SQL = &quot;delete from customer where id=?&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private final static String SELECT_ALL_SQL = &quot;select * from customer order by id&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private final static String SELECT_BY_ID_SQL = &quot;select * from customer where id=?&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * gets Customer data from DataBase</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param customerId</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public Customer getCustomersById (long customerId) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// we need a custom class to map rows with our class.</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// in this case we do everything on the fly: is the second parameter of queryForObject</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return jdbcTemplate.queryForObject(</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;SELECT_BY_ID_SQL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;new ParameterizedRowMapper&lt;Customer&gt;() {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;public Customer mapRow (ResultSet rs, int rowNumber) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;Customer newCustomer = new Customer();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;try {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;newCustomer.setId(rs.getLong(1));</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;newCustomer.setName(rs.getString(2));</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;newCustomer.setAddress(rs.getString(3));</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;newCustomer.setEmail(rs.getString(4));</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;} catch (SQLException e) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;// TODO Auto-generated catch block</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;e.printStackTrace();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;return newCustomer;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;},</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;customerId</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}&nbsp;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * gets all Customer data from DataBase</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return list of customers</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public List&lt;Customer&gt; getCustomers () {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// Being pro:</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;List&lt;Customer&gt; customers = new ArrayList&lt;Customer&gt;();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;List&lt;Map&lt;String, Object&gt;&gt; rows = jdbcTemplate.queryForList(SELECT_ALL_SQL);&nbsp;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;for (Map&lt;String, Object&gt; row : rows) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;Customer customer = new Customer();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;customer.setId((Long)(row.get(&quot;id&quot;)));</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;customer.setName((String)row.get(&quot;name&quot;));</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;customer.setAddress((String)row.get(&quot;address&quot;));</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;customer.setEmail((String)row.get(&quot;email&quot;));</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;customers.add(customer);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// Bajeril Style</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// Living la vida loca, RowMapper is a Raw type but</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// everything may be ok.</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;/*List&lt;Customer&gt; customers = jdbcTemplate.query(SELECT_ALL_SQL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;new BeanPropertyRowMapper(Customer.class));*/</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return customers;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}&nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * creates new Customer</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param newCustomer</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public long create (Customer newCustomer) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;GeneratedKeyHolder generatedKeyHolder = new GeneratedKeyHolder();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;MapSqlParameterSource namedParameters = new MapSqlParameterSource();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;namedParameters.addValue(&quot;name&quot;, newCustomer.getName());</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;namedParameters.addValue(&quot;address&quot;, newCustomer.getAddress());</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;namedParameters.addValue(&quot;email&quot;, newCustomer.getEmail());</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;namedParameterJdbcTemplate.update(CREATE_SQL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;namedParameters,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;generatedKeyHolder);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// Maybe this is not suitable for all</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;newCustomer.setId(generatedKeyHolder.getKey().intValue());</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return newCustomer.getId();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * updates customer information&nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param customer</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return affected rows</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public int update (Customer customer) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return jdbcTemplate.update(UPDATE_SQL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;customer.getName(),</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;customer.getAddress(),</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;customer.getEmail(),</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;customer.getId());</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * delete customer &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param customerId</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return affected rows</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public int delete (long customerId) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return jdbcTemplate.update(DELETE_SQL,</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;customerId);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return the jdbcTemplate</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public JdbcTemplate getJdbcTemplate() {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return jdbcTemplate;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param jdbcTemplate the jdbcTemplate to set</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.jdbcTemplate = jdbcTemplate;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return the namedParameterJdbcTemplate</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public NamedParameterJdbcTemplate getNamedParameterJdbcTemplate() {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return namedParameterJdbcTemplate;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param namedParameterJdbcTemplate the namedParameterJdbcTemplate to set</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public void setNamedParameterJdbcTemplate(</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;NamedParameterJdbcTemplate namedParameterJdbcTemplate) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		&nbsp;</div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">}</span></div>
	<div>
		&nbsp;</div>
</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<strong>Main.java</strong></div>
<div>
	El programa principal para hacerf algunas pruebas.</div>
<div>
	&nbsp;</div>
<div>
	<div>
		<span style="font-family:courier new,courier,monospace;">package info.pello.spring.persistence;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import java.util.List;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import java.util.Scanner;</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import org.springframework.context.ApplicationContext;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">import org.springframework.context.support.ClassPathXmlApplicationContext;</span></div>
	<div>
		&nbsp;</div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* This program makes use of a CustomerDAO that</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* uses Spring JdbcTemplates to manage data.</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;*&nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;* @greetz White take away cup</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">public class Main {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * shows all data from Customer table</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param customerDao</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @return</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public static String readAll (CustomerDAO customerDao) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;String result = &quot;&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;List&lt;Customer&gt; customers = customerDao.getCustomers();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;for (Customer customer : customers) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;result += &quot;Id: &quot; + customer.getId() + &quot;,&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;result += customer.getName() + &quot;,&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;result += customer.getAddress() + &quot;,&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;result += customer.getEmail() + &quot;\n&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;}</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return result;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param args</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public static void main(String[] args) {</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// TODO Auto-generated method stub</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;ApplicationContext contexto = new ClassPathXmlApplicationContext(&quot;persistencejdbc.xml&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;CustomerDAO customerDAO = (CustomerDAO) contexto.getBean(&quot;customerDao&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;Scanner scanner = new Scanner(System.in);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// TODO Auto-generated method stub</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;long id = 0;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;String name = &quot;&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;String address = &quot;&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;String email = &quot;&quot;;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// CREATE</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(&quot;Insert new Name&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;name = scanner.nextLine();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(&quot;Insert new Adress&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;address = scanner.nextLine();</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(&quot;Insert new Email&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;email = scanner.nextLine();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;Customer customer = new Customer(0, name, address,email);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;long newId = customerDAO.create(customer);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(&quot;New Id added: &quot; + newId);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(Main.readAll(customerDAO));</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(&quot;Customer data: &quot; + customer.toString());</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// UPDATE DATA</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(&quot;Insert new Name&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;name = scanner.nextLine();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(&quot;Insert new Adress&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;address = scanner.nextLine();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(&quot;Insert new Email&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;email = scanner.nextLine();</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;customer.setName(name);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;customer.setAddress(address);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;customer.setEmail(email);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;customerDAO.update(customer);</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(Main.readAll(customerDAO));</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// REMOVE</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;customerDAO.delete(customer.getId());</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(Main.readAll(customerDAO));</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;// Get By ID</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(&quot;Select a Id&quot;);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;id = scanner.nextLong();</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;customer = customerDAO.getCustomersById(id);</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;System.out.println(&quot;Customer is: &quot; + customer.toString());</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">}</span></div>
	<div>
		&nbsp;</div>
</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<div>
	<strong>XML de Spring&nbsp;</strong></div>
<div>
	Y por &uacute;ltimo el fichero xml de spring al completo.</div>
<div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;xmlns:aop=&quot;http://www.springframework.org/schema/aop&quot;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;xmlns:p=&quot;http://www.springframework.org/schema/p&quot;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans&nbsp;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;http://www.springframework.org/schema/beans/spring-beans-3.2.xsd</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;http://www.springframework.org/schema/aop</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;http://www.springframework.org/schema/aop/spring-aop-3.2.xsd&quot;&gt;</span></div>
	<div>
		&nbsp;</div>
	<div>
		&nbsp;</div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;!-- We define a Bean for datasource --&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">&lt;bean id=&quot;dataSource&quot; class=&quot;org.springframework.jdbc.datasource.DriverManagerDataSource&quot;&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;property name=&quot;driverClassName&quot; value=&quot;com.mysql.jdbc.Driver&quot; /&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;property name=&quot;url&quot; value=&quot;jdbc:mysql://localhost:3306/erp&quot; /&gt;</span></div>
	<div>
		<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;property name=&quot;username&quot; value=&quot;r