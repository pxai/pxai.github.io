---
layout: post
title: "Accede a linux por puerto serie (COM)" 
date: 2001-08-04 20:45:00 
categories: coding
---

Muchas veces puede resultar interesante 
acceder a un servidor por consola de manera comoda, sin tener que pinchar tarjetas 
graficas, ni pantallas, ni teclados ni nada. Si se redirigue la salida por el puerto 
serie podemos acceder a la maquina como si fuera un router. 
Hay dos formas de redirigir la salida al puerto serie: 

* Por hardware: 
En la bios puede 
haber opciones para establecer que la salida salga por el puerto serie, incluso 
desde el ARRANQUE. Por otro lado hay que asegurarse de que en la bios el puerto serie esta habilitado; la velocidad se debe establecer en 9600.

* Por Sistema Operativo: 
En el caso de linux hay que redirigir uno de los terminales virtuales al puerto serie (/dev/ttyS0 en linux, com1 en winDOS). Para ello debemos modificar los siguientes 
ficheros: 

/etc/inittab , es donde se establece 
QUE PROCESOS se arrancan en cada nivel de ejecucion. Ponemos algo asi como: 

Código: 
s1:12345:respawn:/sbin/agetty -s 9600 ttyS0 

Esto puede variar, quiza en lugar de agetty tengamos otro programa por el estilo (mingetty, getty, etc..)

El resto de s2, s3, s4,.. s8 lo dejamos tal 
cual. 

En /etc/lilo.conf  aÃƒÂ±adimos: 
CÃƒÂ³digo: 
serial=1,9660n8 
append="console=ttyS0,9660" 
#message=/boot/message 


Y ejecutamos 'lilo' para que se guarde la configuracion. 

Por 
ultimo: 

/etc/securetty es donde decimos desde 
que terminales puede acceder root de forma directa. Hay que aÃƒÂ±adir el terminal de puerto serie. Si no podriamos accceder con un usuario corriente y luego hacer sudo. 
CÃƒÂ³digo: 

/dev/ttyS0 


Luego podremos acceder con un cable serie a la maquina, cosa harto practica, puesto que puede salvarnos de marrones en caso de que no tenga tarjeta grafica, o lo que es mejor podemos montar una caja linux sin vga y asi usar tu tarjeton NVIDIA5 de la muerte para mover poligonos renderizados.