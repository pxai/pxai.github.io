<b>Sobrecarga y valores por defecto</b>
<br>
En un clase se pueden sobrecargar los metodos y los constructores, e incluso
se pueden asignar valores por defecto a los parametros (como en php).
Veamos el ejemplo del coche un poco mas desarrollado.

<pre>
/**
* Coche.hpp
* Clase que representa un coche
* 
* Pello Xabier Altadill Izura 
*
*/
#include &lt;iostream.h&gt;


class Coche {
private:
	char *marca;
	int cilindrada;
	int caballos;
	enum marcha { Primera, Segunda, Tercera, Cuarta, Quinta, Pto_Muerto};

public:
	Coche();
	Coche(int cilindrada,int caballos);
	Coche(char *marca,int cilindrada,int caballos);
	~Coche();
	void arranca();
	void avanza(int metros = 5); // Con valor por defecto
	void cambiaMarcha(marcha mar);
	void cambiaMarcha();
	void detiene();
	void acelera();
	char * getMarca ();
	int getCilindrada ();
	int getCaballos ();
};
</pre>

Y esta su implementacion observense las funciones sobrecargadas y los posibles
errores que se pueden cometer.
<pre>
/**
* Coche.cpp
* Fichero que implementa la clase coche
* 
* Pello Xabier Altadill Izura 
*
*/
include "Coche.hpp";
// Constructor por defecto
Coche::Coche() {
 cout << "Coche creado." << endl;
}


// Constructor sobrecargado CON VALORES POR DEFECTO
// si no se establece otra cosa se asignan esos valores
Coche::Coche (int cilindrada = 1000, int caballos = 100) {
    this->marca = "Cualquiera";
    this->cilindrada = cilindrada;
    this->caballos = caballos;
}

// Constructor sobrecargado
Coche::Coche (char *marca,int cilindrada,int caballos) {
    this->marca = marca;
    this->cilindrada = cilindrada;
    this->caballos = caballos;
}

// Destructor
Coche::~Coche() {
 cout << "Coche destruido." << endl;
}

void Coche::arranca() {}
void Coche::detiene() {}
void Coche::acelera() {}

// Metodo para que el coche avance. Esta definico con un valor
// por defecto (5) por tanto podria invocarse SIN parametro alguno
void Coche::avanza(int metros) {
    cout << this->marca << " ha avanzado " << metros << metros << endl; 
}

// Metodo para que el coche cambie de marcha
void Coche::cambiaMarcha() {
}

// Metodo -sobrecargado- para que el coche cambie de marcha 
void Coche::cambiaMarcha(marcha mar) {
}

// Muestra la marca
char * Coche::getMarca () {
    return this->marca;
}

// Muestra la cilindrada
int Coche::getCilindrada () {
    return this->cilindrada;
}

// Muestra los caballos
int Coche::getCaballos (){
    return this->caballos;
}


/**
* NOTA IMPORTANTE
* Atencion : al usar esta clase en otra que ya tiene funcion
* main, no se puede tener otra main.
*/
int main () {

int test = 0;
Coche vehiculo = Coche("Skoda", 1050, 250);
cout << "Lo hice, tengo un: "<< vehiculo.getMarca() << endl;

vehiculo.arranca();

vehiculo.cambiaMarcha();

vehiculo.avanza();

// ATENCION!! esto seria una llamada ambigua, ya que existe otro constructor
// que se puede asignar sin parametros pq tiene valores por defecto que es esta:

// Coche::Coche (int cilindrada = 1000, int caballos = 100) y choca con el constructor
// por defecto. Boludos! el compilador nos rompera el ORTO sin compasion

//Coche segundoCoche = Coche();

return 0;
}
</pre>
Se puede implementar el constructor de otra manera (sirve para tirarte el rollete guru, aunque te seguiran
pagando igual de mal), atencion a la sintaxis.
<pre>
Coche::Coche():
  marca("Seat"),
  cilindrada(120)
   {
   };
</pre>
   
<b>Copy constructor</b>
<br>
Este es un constructor que se puede aÃƒÂ±adir a nuestras clases y que sirve para hacer una copia de un objeto 
de esa clase. Existe uno por defecto pero es recomendable preocuparse en implementarlo nosotros mismos ya que
pueden producirse errores con atributos que son punteros.
<br>Veamos el copy de la clase Perro.
<pre>
/**
* Perro.hpp
* Clase de cabecera de Perro
*
* Pello Xabier Altadill Izura
*
*/

#include &lt;iostream.h&gt;

  class Perro {
  public:
   Perro (int initialAge);
    // constructor COPY 
   Perro (const Perro &);
   ~Perro();
   // metodos YA implementados
    int GetAge() { return itsAge;}             // automaticamente inline!
    void SetAge (int age) { itsAge = age;}     // automaticamente inline!
    int * GetPeso() { return peso;}             // automaticamente inline!
    void SetPeso (int * peso) { this->peso = peso;}     // automaticamente inline!
    char * GetRaza() { return raza;}             // automaticamente inline!
    void SetRaza (char * raza) { this->raza = raza;}     // automaticamente inline!
    char * GetColor() { return color;}             // automaticamente inline!
    void SetColor (char *color) { this->color = color;}     // automaticamente inline!
    void Ladra() { cout << "Guau Guau arrr...
";}             // automaticamente inline!
  private:
 int itsAge;
 int *peso;
 char *raza;
 char *color;
 };

</pre>
Y su implementacion
<pre>
/**
* Perro.cpp
* Clase que implementa la clase Perro con constructor copy
*
* Pello Xabier Altadill Izura
*
* Compilado: g++ Perro.cpp -o Perro
*/

#include "Perro.hpp" 

//constructor
Perro::Perro(int initialAge)   {
     itsAge = initialAge;
     cout << "Creado chucho." << endl;
}


//copy-constructor. Atencion
Perro::Perro(const Perro & perroOrigen) {
     itsAge = perroOrigen.itsAge;
     peso = new int;
     raza = new char;
     color = new char;
     color = perroOrigen.color;
     raza = perroOrigen.raza;
     peso = perroOrigen.peso;
     cout << "Creado chucho con copia" << endl;
}

//destructor
Perro::~Perro() {
	cout << " objeto destruido." << endl;
}
 
  /**
  * La funcion principal, crea un perro y le hace ladrar
  */
  int main()
  {
     int t = 0;
     bool test = false;
     Perro Canelo(5);
     Canelo.SetRaza("Pastor vasco");

     // Creamos a Laika haciendo una copia de canelo
     Perro Laika(Canelo);

     cout << "Laika es de raza " ;
     cout << Laika.GetRaza() << endl;

     Laika.SetRaza("Sovietica");
     Canelo.Ladra();
     
     cout << "Canelo es un perro cuya edad es: " ;
     cout << Canelo.GetAge() << " aÃƒÂ±os
";
     Canelo.Ladra();
     Canelo.SetAge(7);
     cout << "Ahora Canelo es " ;
     cout << Canelo.GetAge() << " aÃƒÂ±os
";

     cout << "Laika es de raza " ;
     cout << Laika.GetRaza() << endl;

      return 0;
 }
</pre>
<b>Sobrecargando operadores</b>
<br>
Todo un clasico de c++. Podemos sobrecargar operadores matematicos para nuestras clases.
La sintaxis seria algo asi:
<pre>
retorno operator++ (parametros)
retorno operator- (parametros)
</pre>
Veamos un ejemplo con la clase Contador en la que sobrecargamos operadores de prefijo.
<pre>
/**
* Contador.hpp
* Clase que muestra la sobrecarga de operadores matematicos
*
* Pello Xabier Altadill Izura
*/

#include &lt;iostream.h&gt;


class Contador {
private:
    int valor;
public:
    Contador();
    Contador(int valor);
    ~Contador();
    Contador(const Contador &);
    int getContador () const { return valor;} // inline
    void setContador (int valor) { this->valor = valor;} // inline
    void operator++ (); // operador PREFIJO ++contador
    void operator-- (); // operador PREFIJO --contador
    void operator++(int); // operador SUFIJO (postfix) contador++
    void operator--(int); // operador SUFIJO (postfix) contador--
    Contador operator+(const Contador &); // operador + 
    bool esCero() { return (valor == 0);} // inline
};
</pre>
Y su implementacion
<pre>
/**
* Contador.cpp
* fichero que implementa la clase contador
*
* Pello Xabier Altadill Izura
*/

#include "Contador.hpp"

    // Constructor
    Contador::Contador() {
        valor = 0;
        cout << "Contador creado!" << endl;
    }
    
    // Constructor con valor
    Contador::Contador(int valor) {
        this->valor = valor;
        cout << "Contador creado con valor inicial: " << valor << endl;
    }
    
    Contador::~Contador() {
        cout << "Contador destruido!" << endl;
    }
    
    Contador::Contador(const Contador & original) {
        valor = original.valor;
    }
    
    // Sobrecarga de operador unario ++ PREFIJO ++operador
    void Contador::operator++ () { 
        cout << "incrementando valor de contador : " << valor << endl;
        ++valor;
    }
    
    // Sobrecarga de operador unario -- PREFIJO --operador
    void Contador::operator-- () { 
        cout << "decrementando valor de contador : " << valor << endl;
        --valor;
    }
    
    // Sobrecarga de operador unario ++ SUFIJO operador++
    void Contador::operator++ (int) { 
        cout << "incrementando valor de contador : " << valor << endl;
        valor++;
    }
    
    // Sobrecarga de operador unario -- SUFIJO operador--
    void Contador::operator-- (int) { 
        cout << "decrementando valor de contador : " << valor << endl;
        valor--;
    }
    
    // operador +
    Contador Contador::operator+(const Contador & tmp) {
        return Contador(valor + tmp.getContador());
    }  

int main () {

int i;
// Definimos un contador
Contador contador;
Contador MegaContador(1687);
Contador resultado;

cout << "Valor de contador: " << contador.getContador() << endl;

// Establecemos un valor inicial
contador.setContador(15);

cout << "Valor de contador: " << contador.getContador() << endl;
cout << "Valor de megacontador: " << MegaContador.getContador() << endl;

// y lo usamos como controlador de un while
while (!contador.esCero()) {
    --contador;
}
contador.setContador(1000);
cout << "Valor actual de contador: " << contador.getContador() << endl;
cout << "Valor actual de megacontador: " << MegaContador.getContador() << endl;

resultado = contador + MegaContador;
cout << "Valor de resultado de la suma: " << resultado.getContador() << endl;

cin >> i;
return 0;
}
</pre>
