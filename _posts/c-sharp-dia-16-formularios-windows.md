Bueno, pese a que este no es el tema que mÃƒÂ¡s interesa hay que verlo: el de las aplicaciones para entornos de ventanas. Hay que tener cuidado a la hora de compilar. Este tema se maneja en entornos Case o IDEs como Visual Studio.
Veamos el ejemplo mÃƒÂ­nimo:
<pre>
/**
* Formularios.cs
* Ejemplo de uso de formularios windows.
* A la hora de compilar, para ejecutar como aplicaciÃƒÂ³n de windows
* y para que no salga una ventana de DOS, hay que usar estas opciones
* csc /t:winexe Formularios.cs  o en su defecto
* csc /r:System.Windows.Forms.dll /t:winexe Formularios.cs
*
*/

// Usamos esta librerÃƒÂ­a para los formularios de windows
using System.Windows.Forms;
using System.Drawing; // Para posicionamiento

// La clase debe heredar de Form
public class Aplicacion : Form
{

	
	
	// MÃƒÂ©todo principal
	public static void Main ()
	{
		Aplicacion aplicacion = new Aplicacion();
		
		// Vamos a establecer un tÃƒÂ­tulo
		aplicacion.Text = "Primera aplicaciÃƒÂ³n";
		
		// Vamos a establecer unos botones
		aplicacion.HelpButton = true;  // Metemos botÃƒÂ³n de ayuda
		aplicacion.ControlBox = true;  // Metemos caja de control 
		aplicacion.MinimizeBox = true; // Metemos botÃƒÂ³n para minimizar
		aplicacion.MaximizeBox = true; // Metemos botÃƒÂ³n para maximizar
		
		// TAMAÃƒâ€˜O
		aplicacion.Width = 600;
		aplicacion.Height = 400;
		
		// POSICIÃƒâ€œN
		Point localizacion = new Point(400,300);
		
		// PosiciÃƒÂ³n inicial
		aplicacion.StartPosition = FormStartPosition.Manual;
		// PosiciÃƒÂ³n en el escritorio
		aplicacion.DesktopLocation = localizacion;

		
		// PodÃ‚Â´riamos usar Show, pero con Run nos hace el trabajo sucio
		Application.Run(aplicacion);
	}
}
</pre>
Y otro ejemplo con controles y eventos
<pre>
/**
* Controles.cs
* Ejemplo de uso de formularios windows con diversos controles
* A la hora de compilar, para ejecutar como aplicaciÃƒÂ³n de windows
* y para que no salga una ventana de DOS, hay que usar estas opciones
* csc /t:winexe Controles.cs  o en su defecto
* csc /r:System.Windows.Forms.dll /t:winexe Controles.cs
*
*/

// Usamos esta librerÃƒÂ­a para los formularios de windows
using System.Windows.Forms;
using System.Drawing; // Para posicionamiento

// La clase debe heredar de Form
// ATENCION, la forma de iniciar la aplicacion de ventanas
// suele hacerse de esta forma, con un mÃƒÂ©todo especÃƒÂ­fico para inicializar
public class Controles : Form
{

	// Los controles hay que definirlos como atributos 
	// para manejarlos desde cualquier mÃƒÂ©todo o handler de eventos
	private Label otraEtiqueta;
	private Label etiqueta;
	private Button boton;
	
	// Constructor
	public Controles ()
	{
		inicializar();
	}
	
	// Inicializa los componentes
	private void inicializar ()
	{
		// Vamos a establecer un tÃƒÂ­tulo
		this.Text = "AplicaciÃƒÂ³n con controles";
				
		// TAMAÃƒâ€˜O
		this.Width = 600;
		this.Height = 400;
		
		// Elementos /////////////////
		// LABEL o etiqueta
		etiqueta = new Label();
		etiqueta.Text = "Login";
		
		// Con Controls.Add lo aÃƒÂ±adimos
		this.Controls.Add(etiqueta);
		
		// otra etiqueta, con mÃƒÂ¡s control
		otraEtiqueta = new Label();
		otraEtiqueta.Text = "La otra etiqueta";
		
		otraEtiqueta.AutoSize = true;
		otraEtiqueta.Left = 100;
		otraEtiqueta.Top = 200;
		
		this.Controls.Add(otraEtiqueta);
		
		// BUTTON o botones
		boton = new Button();
		
		boton.Text = "BotÃƒÂ³n de acciÃƒÂ³n";
		boton.Left = 200;
		boton.Top = 200;
		
		// Asociamos un evento al botÃƒÂ³n
		boton.Click += new System.EventHandler(this.boton_Click);

		this.Controls.Add(boton);
		
	}
	
	// Evento para el botÃƒÂ³n
	private void boton_Click (object objeto, System.EventArgs e)
	{
		this.Text = "Has pulsado el botÃƒÂ³n";
		this.otraEtiqueta.Text = "Has pulsado!!";
	}
	
	
	// MÃƒÂ©todo principal
	public static void Main ()
	{
				
		// PodÃ‚Â´riamos usar Show, pero con Run nos hace el trabajo sucio
		Application.Run(new Controles());
	}
}
</pre>