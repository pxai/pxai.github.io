Este es un ejemplo simple de acceso a una BBDD Mysql con el driver 3, el 5 es beta y no estÃƒÂ¡ documentada la forma de conectar (o al menos no la encuentro).

Esta serÃƒÂ­a la clase:
<pre>
using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

using System.Data.Odbc;


public partial class Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void TextBox1_TextChanged(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        if (comprobar(login.Text, password.Text))
        {
            lblResultado.Text = "<b>OK</b>. Login correcto";
        }
        else 
        {
            lblResultado.Text = "<b>Error!</b>. Login incorrecto";
        }
    }

    private bool comprobar(string strLogin, string strPassword)
    {
        string cadenaConexion;
        OdbcConnection conexion;
        OdbcCommand sentencia;
        OdbcDataReader resultado;
        bool existe = false;

        string consulta = "select * from usuarios where login= + strLogin +  and password = sha1( + strPassword + )";
        cadenaConexion ="DRIVER={MySQL ODBC 3.51 Driver};SERVER=localhost; DATABASE=telefonos;USER=root;PASSWORD=root;OPTION=3;";

        lblQuery.Text = consulta;

        // Creamos la instancia del objeto pasÃƒÂ¡ndole el string de conexion
        conexion = new OdbcConnection(cadenaConexion);

        // Abrimos la conexion
        conexion.Open();

        // Creamos la instancia del objeto para ejecutar comandos
        sentencia = new OdbcCommand(consulta, conexion);


        // Y la ejecutamos
        resultado = sentencia.ExecuteReader();

        existe = resultado.HasRows;

        // Cerramos la conexion con la BD
        conexion.Close();


        return existe;
    }
}


</pre>

Y por su parte, la pÃƒÂ¡gina ASP.NET asociada:
<pre>

&lt;%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default2.aspx.cs" Inherits="Default2" %&gt;

&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;

&lt;html xmlns="http://www.w3.org/1999/xhtml" &gt;
&lt;head runat="server"&gt;
    &lt;title&gt;PÃƒÂ¡gina sin tÃƒÂ­tulo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;form id="form1" runat="server"&gt;
    &lt;div&gt;
        &nbsp;&lt;asp:Label ID="Label2" runat="server" Text="Login"&gt;&lt;/asp:Label&gt;
        &lt;asp:TextBox ID="login" runat="server"&gt;&lt;/asp:TextBox&gt;&nbsp;&lt;br /&gt;
        &lt;asp:Label ID="Label1" runat="server" Text="Password"&gt;&lt;/asp:Label&gt;
        &lt;asp:TextBox ID="password" runat="server" OnTextChanged="TextBox1_TextChanged" TextMode="Password"&gt;&lt;/asp:TextBox&gt;&lt;br /&gt;
        &lt;asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Comprobar" /&gt;&lt;br /&gt;
        &lt;asp:Label ID="lblResultado" runat="server"&gt;&lt;/asp:Label&gt;
        &lt;br /&gt;
        &lt;asp:Label ID="lblQuery" runat="server"&gt;&lt;/asp:Label&gt;&lt;/div&gt;
    &lt;/form&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>