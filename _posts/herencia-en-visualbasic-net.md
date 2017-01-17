Este es un ejemplo de POO y herencia en Visual Basic .NET<br>
Jerarquia:<br>

<pre>
Producto
  |     
Limpieza  Alimenticio
           |       
         Carne    Fruta
</pre>

Esta es la superclase padre: Producto
<pre>
Public Class Producto

    'constructor
    Sub New()
        dblPrecio = 0.0
        intStock = 0
    End Sub

    'constructor parametrizado
    Sub New(ByVal precio As Double, ByVal stock As Integer)
        dblPrecio = precio
        intStock = stock
    End Sub

    'atributos
    Protected dblPrecio As Double
    Protected intStock As Integer

    'property de precio
    Public Property precio() As Double
        Get
            Return dblPrecio
        End Get
        Set(ByVal Value As Double)
            dblPrecio = Value
        End Set
    End Property

    'Property de stock
    Public Property stock() As Integer
        Get
            Return intStock
        End Get
        Set(ByVal Value As Integer)
            intStock = Value
        End Set
    End Property

    'metodo imprimirinformacion
    Overridable Function imprimirInformacion() As String
        Return "Precio: " & dblPrecio & " Stock: " & intStock
    End Function

    'metodo calcular valor
    Function calcularValor() As Double
        Return dblPrecio * intStock
    End Function

End Class
</pre>

Una clase hija: la bebida
<pre>
Public Class Bebida
    Inherits Producto

    'constructor por defecto
    Sub New()

    End Sub

    'constructor parametrizado
    Sub New(ByVal burbujas as Boolean)
        bolBurbujas = burbujas
    End Sub

    'constructor parametrizado
    Sub New(ByVal precio As Double, ByVal stock As Integer, ByVal burbujas As Boolean)
        bolBurbujas = burbujas
        dblPrecio = precio
        intStock = stock
    End Sub

    Private bolBurbujas As Boolean

    Property burbujas() As Boolean
        Get
            Return bolBurbujas
        End Get
        Set(ByVal Value As Boolean)
            bolBurbujas = Value
        End Set
    End Property
End Class

</pre>

Otra subclase de producto: alimenticio
<pre>
Public Class Alimenticio
    Inherits Producto

    'constructor por defecto
    Sub New()

    End Sub

    'constructor parametrizado
    Sub New(ByVal label As Boolean)
        bollabel = label
    End Sub

    'constructor parametrizado
    Sub New(ByVal precio As Double, ByVal stock As Integer, ByVal label As Boolean)
        bollabel = label
        dblPrecio = precio
        intStock = stock
    End Sub

    Protected bolLabel As Boolean

    Property label() As Boolean
        Get
            Return bolLabel
        End Get
        Set(ByVal Value As Boolean)
            bolLabel = Value
        End Set
    End Property

    'metodo imprimir informacion sobreescrito
    'metodo imprimirinformacion
    Overrides Function imprimirInformacion() As String
        Return MyBase.imprimirInformacion() & " Label: " & bolLabel
    End Function
End Class

</pre>

Un hijo de producto alimenticio: carne
<pre>
Public Class Carne
    Inherits Alimenticio

    'constructor por defecto
    Sub New()

    End Sub

    'constructor parametrizado
    Sub New(ByVal edad As Integer)
        intEdad = edad
    End Sub

    'constructor parametrizado
    Sub New(ByVal precio As Double, ByVal stock As Integer, ByVal label As Boolean, ByVal edad As Integer)
        bolLabel = label
        dblPrecio = precio
        intStock = stock
        intEdad = edad
    End Sub

    Private intEdad As Integer

    Property edad() As Integer
        Get
            Return intEdad
        End Get
        Set(ByVal Value As Integer)
            intEdad = Value
        End Set
    End Property

    'metodo imprimir informacion sobreescrito
    'metodo imprimirinformacion
    Overrides Function imprimirInformacion() As String
        Return MyBase.imprimirInformacion() & " Edad: " & intEdad
    End Function

End Class

</pre>

Hija de producto alimenticio: Fruta
<pre>
Public Class Fruta
    Inherits Alimenticio

    'constructor por defecto
    Sub New()

    End Sub

    'constructor parametrizado
    Sub New(ByVal autoctona As Boolean)
        bolAutoctona = autoctona
    End Sub

    'constructor parametrizado
    Sub New(ByVal precio As Double, ByVal stock As Integer, ByVal autoctona As Boolean)
        dblPrecio = precio
        intStock = stock
        bolAutoctona = autoctona
    End Sub

    Private bolAutoctona As Boolean

    'propiedad de autoctona
    Property autoctona() As Boolean
        Get
            Return bolAutoctona
        End Get
        Set(ByVal Value As Boolean)
            bolAutoctona = Value
        End Set
    End Property

    'metodo imprimir informacion sobreescrito
    'metodo imprimirinformacion
    Overrides Function imprimirInformacion() As String
        Return MyBase.imprimirInformacion() & " Autoctona: " & bolAutoctona
    End Function
End Class

</pre>


Y la funcion principal que lo inicia todo
<pre>
Public Class Main
    Public Shared Sub Main()
        'mensajito de inicio
        Console.WriteLine("Aplicacion de supermercado")

        Dim pera As Fruta
        Dim lucera As Carne = New Carne(23)

        pera = New Fruta(5.7, 2, True)

        'informacion de fruta
        Console.WriteLine("La pera: " & pera.imprimirInformacion())

        'informacion de carne
        Console.WriteLine("La oveja: " & lucera.imprimirInformacion())

        'valor de la suma
        Console.WriteLine("Valor de suma: " & pera.calcularValor() + lucera.calcularValor)

        'mensaje de fin
        Console.ReadLine()

    End Sub


End Class
</pre>