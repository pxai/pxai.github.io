<p>
	&nbsp;</p>
<div>
	Siguiendo con una aplicacion MVC en Spring, ya vimos algo fundamental como es el paso de valores por GET y POST pero faltaba algo crucial: &iexcl;&iexcl;la validaci&oacute;n de los campos!!</div>
<div>
	&nbsp;</div>
<div>
	Para conseguir esto hay que hacerlo muy al estilo de Spring: un puzzle de configuraciones, una inyecci&oacute;n por aqu&iacute;, unas anotaciones por all&aacute;, etc... Vayamos por partes.</div>
<div>
	&nbsp;</div>
<div>
	En el fichero donde tenemos la configuraci&oacute;n de Spring debemos tener lo siguiente:</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;&lt;!-- We&#39;ll be using annotated controller classes --&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &lt;mvc:annotation-driven /&gt;</span></div>
<div>
	&nbsp; &nbsp;&nbsp;</div>
<div>
	&nbsp; Eso ya estaba comentado, en las clases que hacen de controlador debemos indicar que tendremos anotaciones.</div>
<div>
	&nbsp; Y vaya si las tendremos. Ahora habr&aacute; una nueva llamada @Valid.</div>
<div>
	&nbsp;&nbsp;</div>
<div>
	&nbsp; Necesitamos soporte para validaciones tanto las anotaciones como algo que valide. Debemos incluir un par</div>
<div>
	&nbsp; de dependencias en el pom.xml de maven:</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;dependency&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;groupId&gt;javax.validation&lt;/groupId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;artifactId&gt;validation-api&lt;/artifactId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;version&gt;1.1.0.Final&lt;/version&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;/dependency&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;dependency&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;groupId&gt;org.hibernate&lt;/groupId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;artifactId&gt;hibernate-validator&lt;/artifactId&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;version&gt;4.2.0.Final&lt;/version&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&lt;/dependency&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	Con el javax.validation lo que hacemos es meter unas anotaciones en la clase Pojo que representa la entidad a validar.</div>
<div>
	Es muy sencillo, se ponen una reglas de validaci&oacute;n en cada atributo y a correr. Pueden usarse expresiones regulares y si vamos&nbsp;m&aacute;s all&aacute;, se podr&iacute;an crear nuestras propias clases validadoras.</div>
<div>
	&nbsp;</div>
<h3>
	User.java</h3>
<div>
	Lo que se usa aqu&iacute; son anotaciones est&aacute;ndar basadas es una <a href="http://jcp.org/en/jsr/detail?id=303">especificaci&oacute;n oficial de java</a></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">package info.pello.jomework;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.validation.constraints.Pattern;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">import javax.validation.constraints.Size;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* Represents User entity</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @author Pello Xabier Altadill Izura</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;* @greet to teachers who are users too</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">public class User {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private Long id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Size(min=4,max=30,message=&quot;Login must be between 4 and 40 characters long&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Pattern(regexp=&quot;[A-Za-z0-9]+&quot;,message=&quot;Must contain conly chars and numbers&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String login;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Size(min=8,max=15,message=&quot;Passowrd must be between 8 and 15 characters long&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String password;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;@Size(min=10,max=255,message=&quot;Description must be between 10 and 255 characters long&quot;)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;private String description;</span></div>
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
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param id</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param name</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param password</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; * @param description</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp; */</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;public User(Long id, String login, String password, String description) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.id = id;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.login = login;﻿ &nbsp;﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.password = password;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;this.description = description;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
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
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;return &quot;User&gt; [id=&quot; + id + &quot;, login=&quot; + login + &quot;, password=&quot; + password</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;+ &quot;, description=&quot; + description + &quot;]&quot;;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;}</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; // GETTERS/SETTERS...</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">}</span></div>
<div>
	&nbsp;</div>
<div>
	&nbsp;</div>
<h3>
	UserController.java</h3>
<div>
	&nbsp;</div>
<div>
	Bien, ahora vamos a meter unos cambios en el m&eacute;tdoo que recibe el formulario para crear nuevo usuario.</div>
<div>
	hemos metido la anotaci&oacute;n @Valid en el User para que se compruebe. Aparte se ve que ahora hay un nuevo par&aacute;metro,&nbsp;</div>
<div>
	el BindingResult que quien puede llamar a una funci&oacute;n que nos dice si hay errores o no.&nbsp;</div>
<div>
	Si hay errores guardamos la instancia de user para poder visualizar los errores en el view</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp;/**</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;* handles form POST for new user</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;* @param model</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;* @return the name of the view to show</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;*/</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; @RequestMapping(method=RequestMethod.POST)</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; public String saveUser(@Valid User user, BindingResult bindingResult) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // We redirect to other handler</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ModelAndView modelAndView = new ModelAndView(&quot;redirect:/users&quot;); &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Map&lt;String, Object&gt; model = modelAndView.getModel();</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; if (bindingResult.hasErrors()) {</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; System.err.println(&quot;Form validation ERROR!!&quot;);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; model.put(&quot;user&quot;, user);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; return &quot;newuser&quot;;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; System.err.println(&quot;Form received .&quot; + user.toString());</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; // We save the user:</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; userDAO.create(user);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; //return new ModelAndView(&quot;redirect:/users&quot;, model);</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; return &quot;redirect:/users/&quot;;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">&nbsp; &nbsp; &nbsp; &nbsp; }</span></div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</div>
<h3>
	newuser.jsp</h3>
<div>
	Este es el JSP donde simplemente se a&ntilde;aden unas etiquetas &lt;sf:errors ...&gt; que en caso de error se llenar&aacute;n</div>
<div>
	con el mensaje que hemos metido en el pojo User.java</div>
<div>
	&nbsp;</div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;sf:form method=&quot;post&quot; modelAttribute=&quot;user&quot;&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;fieldset&gt;&lt;legend&gt;New User&lt;/legend&gt;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;label for=&quot;login&quot;&gt;Login&lt;/label&gt;&lt;br /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;sf:input path=&quot;login&quot; &nbsp;/&gt;&lt;br /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;sf:errors path=&quot;login&quot; cssClass=&quot;error&quot; /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;label for=&quot;password&quot;&gt;Password&lt;/label&gt;&lt;br /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;sf:input path=&quot;password&quot; /&gt;&lt;br /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;sf:errors path=&quot;password&quot; cssClass=&quot;error&quot; /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;label for=&quot;description&quot;&gt;Description&lt;/label&gt;&lt;br /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;sf:textarea &nbsp;path=&quot;description&quot; /&gt;&lt;br /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;sf:errors path=&quot;description&quot; cssClass=&quot;error&quot; /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;input type=&quot;submit&quot; name=&quot;create&quot; value=&quot;Create&quot; id=&quot;create&quot; /&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;﻿ &nbsp;&lt;/fieldset&gt;</span></div>
<div>
	<span style="font-family:courier new,courier,monospace;">﻿ &nbsp;﻿ &nbsp;&lt;/sf:form&gt;</span></div>
<div>
	&nbsp;</div>
<div>
	Solo quedar&iacute;a mejorar esto con los mensajes internacionalizados.</div>
