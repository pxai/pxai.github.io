Bueno, montar un viejo sistema windoze es bastante fÃƒÂ¡cil, se puede incluso crear con soporte para tarjeta de red y sonido.
Primero hay que crear el disco:
<pre>
qemu-img create -f qcow discowin.img 500M
</pre>
Aunque le digas que el tamaÃƒÂ±o es 500 de entrada no ocuparÃƒÂ¡ todo eso, si no lo que el sistema requiera. AdemÃƒÂ¡s se puede aplicar compresiÃƒÂ³n y cifrado.
Ahora ya podemos meter el CD e instalar. Si el instalador arranca desde el propio cd no hay problema:
<pre>
qemu -net nic -soundhw sb16 -boot d -cdrom /dev/cdrom discowin.img
</pre>
Si el cd no es bootable, tendrÃƒÂ¡s que bajarte una imagen de diskette de instalaciÃƒÂ³n. Para eso pÃƒÂ¡sate por <a href="http://www.bootdisk.com">bootdisk</a>.
En la instalaciÃƒÂ³n de windous puede que salten pantallazos azules. Si es asÃƒÂ­ hay que quitar o el soporte para tarjeta de sonido o red.
<br /><b>Intercambiar ficheros entre sistemas</b>
Si no te funciona la red y necesitas intercambiar ficheros con el sistema anfitriÃƒÂ³n, puedes hacer que un directorio funcione como diskette:
<pre> qemu -net nic -soundhw sb16  -fda fat:floppy:rw:/tmp/midir
</pre>
A partir de entonces, cuando en windozer guardes algo en A: tambiÃƒÂ©n quedarÃƒÂ¡ guardado en /tmp/midir del sistema. Sin necesidad de reinicios.