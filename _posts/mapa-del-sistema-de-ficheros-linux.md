Sistema de ficheros en unix/linux 
se ejecuta "ls /" para ver desde la raiz.
Hay directorios que pueden cambiar segun la distribucion que sea.
Las de linux se parecen bastante, pero en general tienen lo mismo.
/
+-/bin : los binarios MAS basicos como: ls, cd, pwd, cp, rm
+-/boot : archivos de arranque, imagen de kernel.
+-/cdrom : punto de montaje del cdrom
+-/etc : configuracion. Todas las configuraciones (red,scripts de inicio,firewall,usuarios)
+-----/mail/ : configuracion de sendmail
+-----/rc.d/ : ficheros con scripts de inicio de sistema
+-----/sysconfig/ : configuracion de sistema (red,rutas,interfaces)
+-/dev : todos los dispositivos de sistema (pantalla,raton,impresora,disco duro) representados por un fichero
+-/home : directorios particulares de los usuarios
+-/lib : librerias de sistema, modulos de kernel
+-/lost+found : directorio en el que se guarda contenido perdido tras un chequeo de disco
+-/mnt : punto de montaje (opcional) para particiones locales, remotas (nfs),..
+-/proc : sistema de ficheros que refleja el estado y configuracion del sistema
+-/sbin : binarios basicos que influyen en configuraciones (firewall, rutas,) de kernel
+-/usr : binarios de servidores, programas, manuales, documentos, etc (este ocupa el que mas)
+-/opt : binarios opcionales o programas que no se instalan desde el principio.
+-/root : directorio home de superusuario.
+-/tmp : directorio temporal, utilizado para guardar sesiones, sockets, etc..
+-/var : directorio en el que se guarda informacion variable: logs, BBDD (postgres, mysql)
+-----/log/ : todos los logs de sistema y servidores
+-----/lib/pgsql/ : postgres
+-----/lib/mysql/ : mysql
+-----/spool/mqueue/ : cola de correo del servidor (entregas sendmail)
+-----/spool/mail/ : buzones de correo