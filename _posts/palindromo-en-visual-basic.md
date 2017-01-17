<p>
	<strong>Pal&iacute;ndromo&nbsp;</strong></p>
<p>
	El cl&aacute;sico ejemplo de pal&iacute;ndromo, en este caso para probar la palabra Shared en los m&eacute;todos de una clase, que en definitiv equivale al static de java.</p>
<p>
	Se usa el pal&iacute;ndromo para String y para Enteros.</p>
<p>
	&nbsp;</p>
<div>
	Public Class Palindromo</div>
<div>
	&nbsp;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; &lt;summary&gt;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39;&nbsp;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; &lt;/summary&gt;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; &lt;param name=&quot;cadena&quot;&gt;&lt;/param&gt;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; &lt;returns&gt;&lt;/returns&gt;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; &lt;remarks&gt;&lt;/remarks&gt;</div>
<div>
	&nbsp; &nbsp; Public Shared Function esPalindromo(ByVal cadena As String) As Boolean</div>
<div>
	&nbsp;</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; Dim inversa As String = Microsoft.VisualBasic.StrReverse(cadena)</div>
<div>
	&nbsp;</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; For I As Integer = 0 To cadena.Length - 1</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; If cadena.ElementAt(I) &lt;&gt; inversa.ElementAt(I) Then</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Return False</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; End If</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; Next</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; Return True</div>
<div>
	&nbsp;</div>
<div>
	&nbsp; &nbsp; End Function</div>
<div>
	&nbsp;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; &lt;summary&gt;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; esPalindromo con enteros, convierte el entero a cadena y reutiliza el&nbsp;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; m&eacute;todo que espera Strings</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; &lt;/summary&gt;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; &lt;param name=&quot;cadena&quot;&gt;&lt;/param&gt;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; &lt;returns&gt;&lt;/returns&gt;</div>
<div>
	&nbsp; &nbsp; &#39;&#39;&#39; &lt;remarks&gt;&lt;/remarks&gt;</div>
<div>
	&nbsp; &nbsp; Public Shared Function esPalindromo(ByVal cadena As Integer) As Boolean</div>
<div>
	&nbsp; &nbsp; &nbsp; &nbsp; Return esPalindromo(cadena.ToString)</div>
<div>
	&nbsp; &nbsp; End Function</div>
<div>
	&nbsp;</div>
<div>
	End Class</div>
