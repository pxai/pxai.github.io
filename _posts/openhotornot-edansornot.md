<a href='http://www.edansornot.com' title='Ir a edansornot'>
<img src='http://www.edansornot.com/themes/black/logo.jpg' alt='Logo Open Hot or Not' title='Logo Open Hot or Not' border='0' />
</a>

<p>
Un buen día estaba con un amiguete en un bar, y tras meternos unas patatas bravas se nos fue el riego
al estomago y surgió la idea de un sistema de ranking llamado edansornot. Dicho y hecho: <a href='http://www.edansornot.com' title='Ir a edansornot'>edansornot.com</a>
ya es una realidad y su código fuente queda disponible para el que le interese en un proyecto llamado <a href='http://openhotornot.sf.net' title='Ver y descargar proyecto'>openhotornot</a>.
</p>
<p>
Mientras nos llueven las demandas hay que explicar que openhotornot no es más que otra aplicación php+mysql más de esas
que aplica el MVC con un framework similar al que utiliza este sitio. Una vez más se reinventa la rueda cuando ya existen
maravillas como <a href='http://codeigniter.com/' title='Framework php simple y cojonudo'>codeigniter</a>... </p>


<p>
En fin, este framework hace cosas algo burras (marca de la casa): todos los formularios están metidos en tablas de la BD, todas las queries de SQL están en la BD,
las páginas y los ACL están en la BD, etc... existe una clase llamada admintable que permite crear un interfaz de administración de determinada tabla
de forma fácil (como hace access). La razón para esto es que se puedan modificar los formularios desde la adminsitración
de la web.<br />
En cuanto a la seguridad, todo lo que llega por POST y GET se filtra, así como lo que se manda a SQL. Seguro que aún y todo
hay fallos.... Por otro lado, necesita el mod_rewrite para que las url le molen a los buscadores.</p>


<p>
Bueno, espero que alguien al menos saque alguna idea útil de todo esto.
</p>


<a href='http://openhotornot.sf.net' title='Ver y descargar proyecto'>
<img src='http://openhotornot.sourceforge.net/themes/black/logo.jpg' alt='Logo Open Hot or Not' title='Logo Open Hot or Not' border='0' />
</a>