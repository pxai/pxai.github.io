<b>Tuneles IP_GRE</b>
<br><br>
Con linux se pueden crear VPNS con tuneles de una forma parecida a los CISCO.
<br> 
Basicamente se trata de unir dos redes locales usando un interfaz de red virtual que vamos a crear. 
<br>
En cada extremo se crea un interfaz de tunel. Este interfaz es punto a punto, debe especificarse
la ip publica remota a la que conectarse y las ips privadas de cada punto.
Una vez metidas las interfaces se pueden meter rutas para hacer que distintas redes
se vean a traves de estos tuneles.
<pre>
192.168.100.0/24 &lt;-&gt; tunel0 &lt;---------la internet esa---------&gt; tunel0 &lt;-&gt; 192.168.25.0/24
</pre>

Esto tendriamos que ejecutar en un lado
<pre>
# Script para el tunel del primer extremo  
# Nuesra red local es 192.168.100.0 queremos llegar a 192.168.25.0 a traves del tunel
echo Iniciando tunel
/sbin/modprobe ip_gre
/sbin/ip tunnel add tunel0 mode gre remote 213.34.153.24 && echo "Tunel creado"
/sbin/ifconfig tunel0 10.20.0.1 pointopoint 10.20.0.2 mtu 1512 && echo "Interfaz levantado"
/sbin/route add -net 192.168.25.0 netmask 255.255.252.0 gw 10.20.0.2 dev tunel0 && echo "OK"
</pre>


Veriamos el interfaz asi:
<pre>
linuz# ifconfig tunel0
tunel0    Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00
          inet addr:10.20.0.1  P-t-P:10.20.0.2  Mask:255.255.255.255
          UP POINTOPOINT RUNNING NOARP  MTU:1512  Metric:1
          RX packets:2896 errors:0 dropped:0 overruns:0 frame:0
          TX packets:3008 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:472021 (460.9 Kb)  TX bytes:439991 (429.6 Kb)
</pre>

Y en el otro lado:

<pre>
# Script del tunel para el otro extremo
# Nuesra red local es 192.168.25.0 queremos llegar a 192.168.100.0 a traves del tunel
echo Iniciando tunel
/sbin/modprobe ip_gre
/sbin/ip tunnel add tunel0 mode gre remote 234.242.23.84 && echo "Tunel creado"
/sbin/ifconfig tunel0 10.20.0.2 pointopoint 10.20.0.1 mtu 1512 && echo "Interfaz levantado"
/sbin/route add -net 192.168.100.0/24 gw 10.20.0.1 dev tunel0 && echo "OK"
</pre>

Y en este extremo veriamos el interfaz asi:
<pre>
linuz# ifconfig tunel0
tunel0    Link encap:UNSPEC  HWaddr 00-00-00-00-00-00-00-00-00-00-00-00-00-00-00-00
          inet addr:10.20.0.2  P-t-P:10.20.0.1  Mask:255.255.255.255
          UP POINTOPOINT RUNNING NOARP  MTU:1512  Metric:1
          RX packets:3008 errors:0 dropped:0 overruns:0 frame:0
          TX packets:2896 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:439991 (429.6 Kb)  TX bytes:472021 (460.9 Kb)
</pre>

Si hay routers por medio es necesario que el router sea capaz de rutar o dejar pasar
el protocolo GRE, en general no hay problema A NO SER QUE EL ROUTER YA TENGA TUNELES CISCO.
En ese caso NO pueden convivir a no ser que se metan IPs secundarias publicas en el router.

TB en caso de firewall hay que permitir el protocolo 47 (GRE) 
<pre>
iptables -A INPUT -p 47 -j ACCEPT
iptables -A OUTPUT -p 47 -j ACCEPT
</pre>


Con estos dos comandos tiramos un interfaz virtual
<pre>
/sbin/ifconfig tunel0 down
/sbin/ip tunnel del tunel0
</pre>