Pues eso, hay que currarse los 21 dÃƒÂ­as. Antes de San FermÃƒÂ­n. Ã‚Â¿Lo lograrÃƒÂ©?
<pre>
// Hola.cs
// El ejemplo clasico para iniciarse en un lenguaje
// Para compilar con MS: csc Hola.cs , ejecucion: Hola.exe
// Para compilar con Mono: mcs Hola.cs , ejecucion: mono Hola.exe

// Importamos la libreria de utilidades bÃƒÂ¡sicas de sistema
using System;

// Todo debe ir dentro de clases. En este caso
// Definimos la clase Hola
	class Hola
	{
		// Main: Programa principal
		public static void Main(string[] args)
		{
			// Mandamos un saludo por la consola
			System.Console.WriteLine("Hola nena");
		}
	}
</pre>
Y una de Windozer:
<pre>
// Hola.cs
// El ejemplo clasico para iniciarse en un lenguaje
// Para compilar con MS: csc HolaWindows.cs , ejecucion: HolaWindows.exe
using System;
using System.Windows.Forms;

	// Declaramos la clase HolaWindows,
	// que hereda las propiedades y metodos de la clase Form
	public class HolaWindows : Form
	{
		// Definimos algunos atributos del formulario
		private Button btnOk;		// Un botÃƒÂ³n
		private Label lblMostrar;	// Una etiqueta

		// AquÃƒÂ­ va el mÃƒÂ©todo constructor, con el mismo nombre
		// que la clase.
		public HolaWindows()
		{
			// Inicializamos los atributos
			this.lblMostrar = new Label();
			this.btnOk = new Button();

			// Ponemos un titulo a la ventana
			this.Text = "Mi aplicaciÃƒÂ³n C# para W1ND0W5";

			// Posicionamos y damos tamaÃƒÂ±o al label lblDisplay
			this.lblMostrar.Location = new System.Drawing.Point(20, 50);
			this.lblMostrar.Size = new System.Drawing.Size(100, 120);
			
			// Posicionamos, asignamos texto y damos tamaÃƒÂ±o al botÃƒÂ³n btnOk
			this.btnOk.Location = new System.Drawing.Point(60, 200);
			this.btnOk.Text = "OK";
			this.btnOk.Click += new System.EventHandler(this.btnOK_Click);

			// Metemos los controles al formulario
			this.Controls.AddRange(new Control[] {this.lblMostrar, this.btnOk});
		}

		// MÃƒÂ©todo especÃƒÂ­fico para el evento de pulsar el boton
		private void btnOK_Click(object sender, System.EventArgs e)
		{
			lblMostrar.Text = "Hola nena!";
		}

		// Programa principal
		public static void Main () 
		{
			// Ejecutamos nuestro propio objeto
			Application.Run(new HolaWindows());
		}

	}


</pre>