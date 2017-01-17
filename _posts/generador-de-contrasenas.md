<p>Ya existen generadores de passwords mucho mejores, pero en fin necesitaba tener uno a mano que tuviera una peculiaridad muy simple: no crear passwords con caracteres problematicos: los ceros, las eles las is, etc: 0,O,i,l,I,|,1,...</p>
<p>Por si le sirve a alguien...</p>
<pre>/**
* genpas.c
* Password generator supercutre, sobre el que estampo mi r&uacute;brica
* Pello Xabier Altadill Izura
* Tiene como peculiaridad el hecho de que 
* NO usa caracteres ambiguos como 1l0O para evitar confusiones
*/
#include &lt;stdio.h&gt;



#define TOTAL 58

int main (int argc, char *argv[])
{
char caracteres[TOTAL] = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789.,-_";
int i,j;
int cuantos = 1;
int longitud = 8;


if (argc == 2)
{
	cuantos = atoi(argv[1]);	
}

if (argc == 3)
{
	cuantos = atoi(argv[1]);	
	longitud = atoi(argv[2]);	
}

printf("GeNPaS %d %d
",cuantos,longitud);
		srand(time(0));

for (j=0;j&lt;cuantos;j++)
{
	for (i=0;i&lt;longitud;i++)
	{
		printf("%c",caracteres[rand()%TOTAL]);
	}
	printf("
");
}
return 1;
}
</pre>
<p>Una prueba: generamos 4 contrase&ntilde;as de longitud 8.</p>
<pre>linux:~$ ./genpas 4 8
GeNPaS 4 8
UFtyjr-a
DSVtPuF3
TQtddMB6
xqmy.UZQ
linux:~$ ./genpas 4 8
</pre>