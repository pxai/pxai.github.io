<b>Ejemplo de acceso a mysql desde c</b>
<br>
Necesitaremos tener instalado el mysql-devel o libmysql para poder hacer que nuestro codigo C acceda a mysql.
Ademas de eso debemos establecer con cuidado las opciones de compilacion:<br>
Si tenemos alguna duda podemos ejecutar <b>mysql_config</b> y este nos dira los parametros que necesitamos.

Veamos el "hello_world" del acceso a mysql.
<pre>
/**
* mysql_basico.c
* ejemplo de uso de libmysqlclient
* Necesitamos tener instalado el libmysqlclient
*
* USO: ./mysql_basico host db user password
* NOTA: NO se hace comprobacion de argumentos!!
*
* Compilacion:  gcc -o mysql_basico -I'/usr/include/mysql'  -L'/usr/lib/mysql' 
* -lmysqlclient -lz -lcrypt -lnsl -lm mysql_basico.c
*/

#include &lt;stdio.h&gt;
#include &lt;mysql.h&gt;

int main (int argc, char *argv[]) {

// Esta es la variable para las conexiones
MYSQL conexion;
int result = 0;

// esta funcion debe ejecutarse antes de la conexion
mysql_init(&conexion);

printf("Vamos a ver si nos conectamos a %s",argv[1]);

// usamos mysql_real_connect (mysql_connect esta en desuso)
// Esta es la definicion de la funcion:
//MYSQL *mysql_real_connect(MYSQL *mysql, const char *host, const char *user, const char *passwd, const char *db,
//unsigned int port, const char *unix_socket, unsigned long client_flag)
// Los flags de cliente pueden verse en la documentacion, para este ejemplo basta con 0

if (!mysql_real_connect(&conexion, argv[1], argv[3], argv[4], argv[2], 3306, "/var/lib/mysql/mysql.sock", 0) ) {
        printf("Mal rollete: %s",mysql_error(&conexion));
        printf("

 Recuerda el uso es: %s  host db user password

",argv[0]);
        return(-1);
} else {
        printf("OK conexion establecida!!");
}


printf("Como fue?
");

}

</pre>