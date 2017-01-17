<b>La herencia multiple</b>
<br>
Una de las oportunidades que nos ofrece el lenguaje c++ es la posibilidad de que un objeto tenga la herencia de mas de una clase; esta ventaja fue considerada por los desarrolladores
de Java como una pega y la quitaron, e incluso hay desarrolladores de c++ que prefieren evitar
este tipo de herencia ya que puede complicar mucho la depuracion de programas<br>
Para ilustrar un caso de herencia multiple hemos definido la superclase Habitante;
de ella heredan dos clases distintas: Humano  (que hablan) y Animal (que matan). Ahora
queremos definir un ente que tiene propiedades de esas dos clases: <br>
Militar, ya que el militar habla y ademas mata. <br>
Como podemos definirlo? con una herencia multiple.<br>
Vamos la definicion de la superclase o clase padre Habitante
<br>
<b>Notas de la logia POO</b><br>
Conviene definir todos los metodos de un clase como const siempre que en el metodo
no se modifiquen los atributos. Tu resistencia es inutil. unete a nosotros o muere.
Definir metodos como const le facilitara el trabajo al compilador y al programador.
<br>
Nota el codigo necesita revision y testeo
<pre>
/**
* Habitante.hpp
* Clase que define el objeto habitante
* 
* Pello Xabier Altadill Izura
*
*/

#include &lt;iostream.h&gt;

class Habitante {
    private:
        char *nombre;
        int edad;
    public:    
        Habitante();
        virtual ~Habitante();
        Habitante(const Habitante &);
        
        virtual void dormir();
        
        // setter/getter o accessors
        virtual char *getNombre() const { return this->nombre;} // inline
        virtual void setNombre(char *nombre) { this->nombre = nombre; } // inline
        virtual int getEdad() const { return this->edad;} // inline
        virtual void setEdad(int edad) { this->edad = edad; } // inline
};
</pre>
Y su implementacion
<pre>
/**
* Habitante.cpp
* Programa que implementa la clase habitante
* 
* Pello Xabier Altadill Izura
* Compilacion: g++ -c Habitante.cpp
* 
*/

#include "Habitante.hpp"

        // Construido
        Habitante::Habitante() {
                cout &lt;&lt; "-clase habitante- Habitante construido."&lt;&lt; endl;
        }
        
        // Destructor
        Habitante::~Habitante() {
                cout &lt;&lt; "-clase habitante- Habitante "&lt;&lt; this->getNombre() &lt;&lt; " destruido."&lt;&lt; endl;
        }
        
        // constructor copia
        Habitante::Habitante(const Habitante & original) {
                nombre = new char;
                original.getNombre();
        }
        
        // metodo dormir
        void Habitante::dormir() {
                cout &lt;&lt; "-clase habitante- zzzzzZZZZzzzzz zzz" &lt;&lt; endl;
        }

</pre>
<b>Humano</b>
La clase Humano, que hereda de Habitante
<br>
<pre>
/**
* Humano.hpp
* Clase que define el objeto humano
* 
* Pello Xabier Altadill Izura
*
*/

#include "Habitante.hpp"

// hereda atributos y metodos de la superclase Habitante 
class Humano : public Habitante {
    private:
        char *idioma;
    public:    
        Humano();
        virtual ~Humano();
        Humano(const Humano &);
        virtual void hablar(char *bla) const;
        // setter/getter o accessors
        virtual char *getIdioma() const { return this->idioma;} // inline
        virtual void setIdioma(char *idioma) { this->idioma = idioma; } // inline
};
</pre>
Y su implementacion
<pre>

        // Construido
        Humano::Humano() {
                cout &lt;&lt; "-clase Humano- Humano construido."&lt;&lt; endl;
        }
        
        // Destructor
        Humano::~Humano() {
                cout &lt;&lt; "-clase Humano- Humano "&lt;&lt; this->getNombre() &lt;&lt; " destruido."&lt;&lt; endl;
        }
        
        // constructor copia
        Humano::Humano(const Humano & original) {
                idioma = new char;
                idioma = original.getIdioma();
        }
        
        // metodo hablar
        void Humano::hablar(char *bla) const {
                cout &lt;&lt; "-clase Humano-" &lt;&lt; this->getNombre() &lt;&lt; " dice: " &lt;&lt; bla &lt;&lt; endl;
        }
</pre>

<b>Animal</b>
La clase Animal, que hereda de Habitante
<br>
<pre>
/**
* Animal.hpp
* Clase que define el objeto Animal
* 
* Pello Xabier Altadill Izura
*
*/

#include "Habitante.hpp"

// hereda atributos y metodos de la superclase Habitante 
class Animal : public Habitante { 
    private:
        int patas;
    public:    
        Animal();
        virtual ~Animal();
        Animal(const Animal &);
        
        virtual void matar() const;
        
        // setter/getter o accessors
        virtual int getPatas() const { return this->patas;} // inline
        virtual void setPatas(int patas) { this->patas = patas; } // inline
};
</pre>
Y su implementacion
<pre>
/**
* Animal.cpp
* Programa que implementa la clase Animal
* 
* Pello Xabier Altadill Izura
* Compilacion: g++ -c Animal.cpp
* 
*/

#include "Animal.hpp"

        // Construido
        Animal::Animal() {
                cout &lt;&lt; "-clase Animal- Animal construido."&lt;&lt; endl;
        }
        
        // Destructor
        Animal::~Animal() {
                cout &lt;&lt; "-clase Animal- Animal "&lt;&lt; this->getNombre() &lt;&lt; " destruido."&lt;&lt; endl;
        }
        
        // constructor copia
        Animal::Animal(const Animal & original) {
        }
        
        // metodo matar
        void Animal::matar() const {
                cout &lt;&lt; "-clase Animal-" &lt;&lt; this->getNombre() &lt;&lt; " Matar! Matar! Matar! " &lt;&lt; endl;
        }
        

</pre>

<b>La herencia multiple!</b>
<br>
Aqui esta la clase Militar, que hereda de Humano y Animal.
<pre>
/**
* Militar.hpp
* Clase que define el objeto Militar
* 
* Pello Xabier Altadill Izura
* 
*/

// Herencia multiple de Humano y Animal
class Militar : public Animal { //, public Humano {
    private:
        char *rango;
    public:
        Militar();
        ~Militar();
        Militar(const Militar &);
        
        // sobrescribe metodos
        void matar() const;
        void hablar(char *bla) const;
        
        // un metodo poco probable entre cualquier uniformado...
        void razonar() const;
        
        // setter/getter o accessors
        char *getRango() const { return this->rango;}
        void setRango(char *rango) { this->rango = rango;}
};

</pre>
Y su implementacion
<pre>
/**
* Militar.cpp
* Programa que implementa la clase Militar
* 
* Pello Xabier Altadill Izura
* Compilacion: g++ -c Habitante.cpp
*              g++ -c Humano.cpp
*              g++ -c Animal.cpp
*              g++ Militar.cpp Habitante.o Humano.o Animal.o -o Militar
*/

#include "Militar.hpp"
       // Constructor
        Militar::Militar() {
                cout &lt;&lt; "-clase Militar- Militar construido."&lt;&lt; endl;
        }
        
        // Destructor
        Militar::~Militar() {
                cout &lt;&lt; "-clase Militar- Militar "&lt;&lt; this->getNombre() &lt;&lt; " destruido."&lt;&lt; endl;
        }
        
        // constructor copia
        Militar::Militar(const Militar & original) {
                cout &lt;&lt; "-clase Militar- Militar copia creada."&lt;&lt; endl;
        }
        
        // metodo razonar
        void Militar::razonar() const {
                cout &lt;&lt; "-clase Militar-" &lt;&lt; this->getNombre() &lt;&lt; " Error: OVERFLOW " &lt;&lt; endl;
        }
        
        // metodo hablar
        void Militar::hablar(char *bla) const {
                cout &lt;&lt; "-clase Militar-" &lt;&lt; this->getRango() &lt;&lt; " " &lt;&lt; this->getNombre() &lt;&lt; " dice: ";
                cout &lt;&lt; bla &lt;&lt; endl;
        }

        // metodo matar
        void Militar::matar() const {
                cout &lt;&lt; "-clase Militar-" &lt;&lt; this->getRango() &lt;&lt; " Matar! " &lt;&lt; endl;
                cout &lt;&lt; "-clase Militar- Somos... agresores por la paz " &lt;&lt; endl;
        }
        
// Aqui haremos multiples pruebas...
int main () { 

return 0;
}
</pre>
<b>NECESITA DEPURARSE</b>
