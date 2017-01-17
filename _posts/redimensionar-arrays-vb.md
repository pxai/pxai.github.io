Jo, siempre se me olvidan los dos pasos.
<pre>

    'Metodo aÃƒÂ±adir estudiantes
    Public Function addEstudiantes(ByVal unEstudiante As Estudiante) As Integer
        If arListaestudiantes Is Nothing Then
            ReDim arListaestudiantes(0)
        Else
            ReDim Preserve arListaestudiantes(UBound(arListaestudiantes) + 1)
        End If
        arListaestudiantes(UBound(arListaestudiantes)) = unEstudiante

    End Function
</pre>