Cuatro cosillas para poner el postfix funcionando para un dominio y permitir el relay a una red.

Bueno que pasa si quiero poner en marcha un postfix para mi dominio (campeon.net) rapido!
En redhat podemos poner sendmail o postfix, no pueden convivir juntos.
Si ponemos postfix puede que cree tb un binario llamado sendmail , pero es por compatibilidad. Postfix nacio con la idea de sustituir a sendmail y es mucho mas simple que este.

Supongamos que tenemos un server en nuestra LAN 192.168.2.0/24
Bueno. Pues vamos a /etc/postfix y tendremos que editar main.cf

Tenemos que conseguir dos cosas:
1)- Permitir relay para la red 192.168.2.0/24
2)- Decirle a postfix que campeon.net es el dominio del postfix.

1) para esto ponemos (y descomentamos) los parametros:
mynetworks_style = class
mynetworks = 192.168.2.0/24 (si es una lista se puede poner un fichero)
relayhost = $mydomain, $mynetworks

2) para esto ponemos:
mydomain = campeon.net

Y en principio parece que ya va. Postfix delivera localmente usando procmail. Si queremos
poner algo mas decente habra que currarselo. Tiene todas las opciones que se pueden esperar:
soporte para dominios virtuales, alias, reescritura de dominios de salida, etc.
En principio las cuentas de sistema seran cuentas de correo.

Para iniciar/parar postfix simplemente ejecutamos:
CÃƒÂ³digo:
postfix start


Tiene una serie de comandos para ver el estado etc.. escribe "post" y dale
al tabulador.
Podemos seguir los logs en /var/log/maillog