

<b>Iteracion con etiquetas</b>
<br>
Es la manera primigenia de implementar iteraciones pero lo cierto es que el uso
de etiquetas no se recomienda ya que es dificil de entender un programa con etiquetas.
A ser posible hay que evitarlas.

<pre>
/**
* Loop.cpp
* 
* Programa que muestra como usar iteraciones
* Pello Xabier Altadill Izura
* Compilar: g++ Loop.cpp -o Loop
*/

#include &lt;iostream.h&gt;

// Programa principal
int main () {

	cout << " Hola, vamos a mostrar un loop " << endl;

	//Inicializamos variables
	int i = 0;
	int max = 0;
	// Le pedimos al usuario que meta el total de iteraciones
	cout << " Cuantas vueltas damos? ";
	cin >> max;

	// Vamos a implementar una iteracion con etiquetas
	// en general no es recomendable usar etiquetas

bucle:	i++;
	cout << "Contador: " << i << endl;
	// si no superamos el tamaÃƒÆ’Ã‚Â±o maximo, volvemos a la etiqueta
	if (i < max)
		goto bucle;

	// fin de programa
	return 0;
}
</pre>

<b>Bucles</b>
<br>
Bueno, ahora en forma de clase vamos a ver una serie de iteraciones. No tienen ningun misterio
se implementan como en c, php, perl, java, ...

<pre>
/**
* Bucles.hpp
* 
* Clase que muestra distintos tipos de iteraciones
* Pello Xabier Altadill Izura
*/

#include &lt;iostream.h&gt;

class Bucles {
private:
	int max;
public:
	// Constructor
	Bucles();

	// Destructor
	~Bucles();

	// Contructor parametrizado
	Bucles(int maximo);

	// Bucle tipo while
	void bucleWhile(int maximo);

	// Bucle tipo for
	void bucleFor(int maximo);

	// Bucle tipo do while
	void bucleDoWhile(int maximo);
};
</pre>

Y aqui la implementacion

<pre>
/**
* Bucles.cpp
* 
* Clase que muestra distintos tipos de iteraciones
* Pello Xabier Altadill Izura
* Compilar: g++ Bucles.cpp -o Bucles
*/

#include "Bucles.hpp"

	// Constructor
	Bucles::Bucles(){}

	// Destructor
	Bucles::~Bucles(){}

	// Contructor parametrizado
	Bucles::Bucles(int maximo){}

	// Bucle tipo while
	void Bucles::bucleWhile(int maximo){
		int temp = 0;

		cout << " iniciamos el bucle WHILE: " << temp << " y max " << maximo << endl;

		while (temp < maximo) {
			cout << temp << " es menor que " << maximo << endl;
			temp++;
		}
	}

	// Bucle tipo for
	void Bucles::bucleFor(int maximo){
		int temp = 0;

		cout << " iniciamos el bucle FOR: " << temp << " y max " << maximo << endl;

		for (temp=0; temp < maximo; temp++) {
			cout << temp << " es menor que " << maximo << endl;
		}
	}


	// Bucle tipo do while
	void Bucles::bucleDoWhile(int maximo){
		int temp = 0;

		cout << " iniciamos e bucle: " << temp << " y max " << maximo << endl;

		do {
			Ã‚Âºcout << temp << " es menor que " << maximo << endl;
			temp++;
		} while (temp < maximo);
	}

int main () {

// Creamos dos instancias de la clase Bucles
Bucles ciclador = Bucles();
Bucles cicladorparam = Bucles(34);

// Invocamos los metodos
ciclador.bucleWhile(23);
cicladorparam.bucleFor(10);
ciclador.bucleDoWhile(5);

return 0;
}


</pre>

<b>Switch/case</b>
Por supuesto tenemos el clasico switch-case en c++<br>
En este ejemplo creamos una clase para mostrar el funcionamiento de un menu de seleccion.

<pre>

/**
* Menu.hpp
* 
* Clase que especifica un menu de seleccion de opciones
* que implementaremos con un case
* Pello Xabier Altadill Izura
*/

#include &lt;iostream.h&gt;

class Menu {
private:
	int resultado;
public:
	// Constructor
	Menu();

	// Destructor
	~Menu();

	// Menu tipo case 
	int menu();
};
</pre>

Y su implementacion
<pre>
/**
* Menu.cpp
* 
* Clase que implementa Menu.hpp
* Pello Xabier Altadill Izura
* Compilar: g++ Menu.cpp -o Menu
*/

#include "Menu.hpp"

	// Constructor
	Menu::Menu(){}

	// Destructor
	Menu::~Menu(){}

	// Menu tipo case
	int Menu::menu(){
		int temp = 0;

		// Iniciamos un bucle que no para hasta que se seleccione 
		// algo distinto de 0.
		do {
			cout << " MENU Seleccion." << endl;
			cout << " 1. Ensalada" << endl;
			cout << " 2. Cordero " << endl;
			cout << " 3. Merluza " << endl;
			cout << " 4. Pato    " << endl;

			cout << " Elije algo: ";
			cin >> temp;
			
			// Segun lo elegido sacamos algo.
			switch (temp) {
				case 0 : 
					cout << " Nos vamos " << endl;
					break;
				case 1 : 
					cout << " Estas a dieta? " << endl;
					break;
				case 2 : 
					cout << " Vaya digestion... " << endl;
					break;
				case 3 : 
					cout << " Que sano eres " << endl;
					break;
				case 4 : 
					cout << " Vaya finolis esta hecho " << endl;
					break;
				default :
					cout << " Chico, decidete." << endl;
					temp = 0;
			} //end switch

		} while(!temp);

		return temp;
	}

int main () {

// Aqui guardaremos el resultado
int resultado = 0;

cout << " Vamos a sacar el menu." << endl;

// Creamos dos instancias de la clase Menu
Menu menutero = Menu();

// Invocamos los metodos
resultado = menutero.menu();

cout << " El resultado es: " << resultado << endl;
return 0;
}


</pre>

<center><img src='/coders/images/character3.jpg' borcer=0 alt='Largo es el camino'></center>
Bueno, ya es el septimo dia pero aun queda un huevo por recorrer...