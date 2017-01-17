<b>Autentificacion de directorio en apache</b><br>
Tipica tonteria que siempre se olvida.<br>

Para proteger un directorio en apache hay distintas formas y miles de opciones.
Si simplemente queremos que un directorio este protegido por usuario y contraseÃƒÂ±a
basta con crear un fichero de usuarios y aÃƒÂ±adir una directiva en apache.<br>
Hay 345820982 opciones, el tema de allow, deny, ... pero esto es lo simple.<br>

<pre>

1. Crear el fichero de usuarios y a la vez un usuario:
root@linuz# htpasswd -c ficheropass usuario
New password: ******
Retype password: ******


Si el fichero ya esta creado y queremos aÃƒÂ±adir un nuevo usuario y modificar un password
ponemos:
root@linuz# htpasswd ficheropass usuario

ATENCION!! 
es crucial que ese fichero tenga permisos de lectura por parte del usuario apache o httpd:
root@linuz# chmod 755 ficheropass
root@linuz# chown root:apache ficheropass

Y ahora aÃƒÂ±adimos unas lineas en la configuracion del virtualhost:
&lt;VirtualHost 103.95.215.53&gt;

DocumentRoot /home/httpd/html/www.miweb.com
ServerName www.miweb.com

ServerAdmin webmaster@www.miweb.com

TransferLog /var/log/httpd/entrewebs.log
ErrorDocument 404 http://www.miweb.com/error.html

LogFormat "combined"
HostNameLookups on

# direcotorio protegido
 &lt;Directory /home/httpd/html/www.miweb.com/privado&gt;
    AuthType Basic
    AuthName Miweb
    AuthUserFile /etc/httpd/conf/passwords
    require valid-user
    AllowOverride FileInfo AuthConfig Limit
    # con esto permitimos indexado de contenidos. Si no hay pagina por defecto
    # se muestra todo el contenido del directorio
    Options MultiViews Indexes SymLinksIfOwnerMatch IncludesNoExec
 &lt;/Directory&gt;


&lt;/VirtualHost&gt;

</pre>