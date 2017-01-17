Bueno, me hubiera gustado terminar el dÃƒÂ­a 6, pero han llegado los sanfermines y me ha pillado el toro. En fin. Veamos como se crea una pÃƒÂ¡gina web con ASP.NET y C#. Por un lado se usan etiquetas especiales para los "componentes HTML" como las cajas de texto, botÃƒÂ³nes y etiquetas. Por otro se puede meter cÃƒÂ³digo C# dentro de etiquetas script, pero se ejecutan en el servidor claro. Y tambiÃƒÂ©n se puede asociar una clase C# a la pÃƒÂ¡gina, pero eso se escapa de esta introduciÃƒÂ³n.
Veamos un ejemplo tipo hello World.
<pre>

&lt;%@ Page Language="C#" %&gt;
&lt;html&gt;
&lt;head&gt;
&lt;script runat="server"&gt;

 // Este cÃƒÂ³digo de C# se ejecuta en el servidor,
 // es como si lo metieramos entre &lt;% %&gt;
 protected void btnBoton_Pulsa(object Origen, EventArgs e)
 { 
 	// Establecemos la etiqueta de saludo
 	lblSaludo.Text="nano dice: hola nena!";
	
	// Establecemos el tÃƒÂ­tulo de pÃƒÂ¡gina
	lblTitulo.Text = "Ejemplo de ASP.NET";
	
 }

&lt;/script&gt;

&lt;title&gt;&lt;asp:Label id="lblTitulo" runat="server" /&gt;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;El hello World del ASP.NET&lt;/h1&gt;

&lt;form runat=server&gt;
&lt;asp:Button id="btnBoton" runat="server" Text="Pulsa este botÃƒÂ³n" onclick="btnBoton_Pulsa" /&gt;
Venga, pincha y muestrame el saludo
&lt;br&gt;

&lt;br&gt;
&lt;asp:Label id="lblSaludo" runat="server" /&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/hmtl&gt;
</pre>
Merece la pena ver como .NET ha transformado esa pÃƒÂ¡gina en una pÃƒÂ¡gina web en el lado cliente,
echale un ojo en el navegador.
Y otro ejemplo algo mÃƒÂ¡s complejo.
<pre>
&lt;%@ Page Language="C#" %&gt;
&lt;html&gt;
&lt;head&gt;
&lt;script runat="server"&gt;

 // Vamos a comprobar que se han introducido datos y que los dos passwords
 // son idÃƒÂ©nticos
 protected void btnBotonComprueba_Pulsa(object Origen, EventArgs e)
 { 
 
 		lblErrores.Text = "";
 		
		// Recoge los datos de formulario
		// Para estas validacion ya existen unas clases especÃƒÂ­ficas
		// pero lo haremos a pelo
		if (txtLogin.Text == "")
		{
			lblErrores.Text = "Escribe algo en el login";
			return;
		}

		if (txtPassword.Text == "" || txtPassword2.Text == "")
		{
			lblErrores.Text = "No dejes los campos password en vacÃƒÂ­o";
			return;
		}
	
		if (txtPassword.Text == txtPassword2.Text)
		{
			lblErrores.Text = "Ok, campos llenos y los password coinciden";
		} 
		else 
		{
			lblErrores.Text = "Error, los campos password NO coinciden";
			return;
		}

		lblErrores.Text += "&lt;br&gt;Tu login es: &lt;b&gt;" + txtLogin.Text + "&lt;/b&gt;";
 }

&lt;/script&gt;

&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;Formulario de ASP.NET&lt;/h1&gt;

&lt;form runat=server&gt;
&lt;table&gt;
&lt;tr&gt;
&lt;td&gt;Login&lt;/td&gt;
&lt;td&gt;&lt;asp:TextBox id="txtLogin" runat="server" Text="" /&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;Password&lt;/td&gt;
&lt;td&gt;&lt;asp:TextBox id="txtPassword"  TextMode="Password" runat="server" Text="" /&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td&gt;Repite Password&lt;/td&gt;

&lt;td&gt;&lt;asp:TextBox id="txtPassword2" TextMode="Password" runat="server" Text="" /&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td colspan="2"&gt;
&lt;asp:Button id="btnBotonComprueba" runat="server" Text="Comprueba datos" onclick="btnBotonComprueba_Pulsa" /&gt;
&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;
Venga, pincha y muestrame el saludo
&lt;br&gt;
&lt;br&gt;
&lt;asp:Label id="lblErrores" runat="server" /&gt;
&lt;/form&gt;
&lt;/body&gt;
&lt;/hmtl&gt;
</pre>