<p>Un BroadcastReceiver es un componente de Android que una vez registrado reacciona cuando el sistema envía los Intent para los que estaba preparado. Un caso muy típico es el del Receiver que se registra para que reaccione cada vez que se recibe una llamada de teléfono o un SMS. Ese BroadcastReceiver capta el Intent y en un método onReceive hace lo que tenga que hacer. Se supone que es muy fácil y todo muy bonito.</p>

<p>Para Android tienes infinidad de ejemplos colgados por la red. Lo que nunca puedes saber seguro es si la gente que cuelga las ristras de código realmente los ha probado o no. O lo que es más probable, a ellos su código les ha funcionado y a ti no, y puede ser tan simple como que hayan omitido algún detalle de configuración, alguna opción perdida en un fichero xml, etc... Así que en mi caso voy a mostrar el código y comentar lo que he observado en un dispositivo real (4.1) y en uno emulado (2.2).
</p>

<h5>Hechos comprobados: como registrar un BroadcastReceiver</h5>
<p>Se supone que puedes registrar el Receiver a través de unas líneas en el Manifest o por programación. La gente por ahí pone como que con declarar en un Manifest el receiver ya es suficiente y que con eso ya se registra el BroadcastReceiver. ¡Pues NO! En mi caso me ha ocurrido como los Services, sin un Activity no he podido activar el BroadcastReceiver. Otros detalles interesantes son el hacer un registerReceiver y también un unregisterReceiver para que el Receiver no salte una excepción y no le afecte el pulsar Home o Back en el activity que ha cargado el Receiver.</p>

<h5>Hechos comprobados: el BroadcastReceiver queda registrado y responde para unos Intents sí y para otros no</h5>
<p>En mi caso he registrado un Receiver para varios intents: el arranque del sistema, una llamada entrante, meter/sacar auriculares...  Y he podido comprobar como:
<ul>
<li>Con el activity en primer plano, el Receiver responde bien ante el evento de los auriculares, si no NO.</li>
<li>Con el activity en primer plano o no, el Receiver sigue respondiendo al intent de llamada entrante</li>
<li>Con el reinicio del móvil, el Receiver ha respondido al intent de reinicio, y también al de llamada entrante, así que aparentemente el Receiver para esos eventos se ha quedado registrado correctamente.</li>
</ul>

Me choca un poco que para unos sí y para otros no, claro que igual es cosa del móvil, de mi configuración, vete a saber... Si vamos al manual oficial, en la sección lifecycle insisten es que tras ser atendido un Intent en el Receiver en el método <i>onReceive()</i> este no es que se pare, Android se supone que lo extermina:
<pre>"then upon returning from onReceive() the system will consider its process to be empty and aggressively kill it so that resources are available for other more important processes."</pre>

Ver <a href="http://developer.android.com/reference/android/content/BroadcastReceiver.html">manual
oficial</a><br />
Por cierto, también advierte sobre el tipo de tareas que se pueden hacer en un Receiver y dice que nada de tareas asíncronas. Lo que sugiere para escenarios de ejecuciones más prolongadas es una combinación de Service con un Receiver (Oh my god).
</p>

<p>Supongo que una cosa es que se carga la instancia de nuestro BroadcastReceiver, pero lo que he podido comprobar es que el Receiver sigue registrado y en caso de surgir un intent de los que espera entonces se Android lo instancia. Reitero, luego la instancia muere, pero el receiver sigue registrado, es decir: <i>No está muerto lo que yace eternamente...</i> ;)</p>
</p>


<h5>Nuestro BroadcastReceiver</h5>
<p>Bueno, pues hacer un BroadcastReceiver en principio es una tontería, basta con extender
una clase y procurar sobrescribir el método onReceive. En nuestro caso, como antedemos a más de un Intent he tenido que meter varios if (un switch con Strings no le gustaba en mi versión de jdk, será la 1.6).
</p>
<pre class="brush: java">
package info.pello.android.broadcastreceiver;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.TelephonyManager;
import android.util.Log;

/**
 * Sample of BroadcastReceiver, every time the phone get a phone
 * this Receiver should be called. It'll just log a message but It
 * could save info in a database, to a file, somewhere on the cloud...
 * @author Pello Xabier Altadill Izura
 * @greetz Remírez
 */
public class PhoneCallReceiver extends BroadcastReceiver {
	
	/**
	 * default constructor
	 */
	public PhoneCallReceiver() {
		Log.d("PELLODEBUG","BR> Instance creaed");
	}

	/**
	 * this handler will be fired when w receive an Intent for us
	 */
	@Override
	public void onReceive(Context context, Intent intent) {
		 Bundle intentExtras = intent.getExtras();
		 
		// is intent a REBOOT?
		if (intent.getAction().equals(Intent.ACTION_REBOOT)) {
			Log.d("PELLODEBUG","BR> Received intent: system rebooted");
		}

		// or maybe a headphone plug/unplug?
		if (intent.getAction().equals("android.intent.action.HEADSET_PLUG")) {
			Log.d("PELLODEBUG","BR> Received intent: headsetPlugged");
		}
		
		// or maybe phone is ringing?
		if (intent.getAction().equals("android.intent.action.PHONE_STATE")) {
			Log.d("PELLODEBUG","BR> Received intent: RING RING!!");
			// Now we extract number from intent extras

	
		    if (null != intentExtras) {
			      String state = intentExtras.getString(TelephonyManager.EXTRA_STATE);
			      if (state.equals(TelephonyManager.EXTRA_STATE_RINGING)) {
			        String callingNumber = intentExtras.getString(TelephonyManager.EXTRA_INCOMING_NUMBER);

					saveInformation("BR> Call received: " + state + " ," + callingNumber);
			      }
			    }
		}


		Log.d("PELLODEBUG","BR> Received intent: " + intent.getAction());

	}
	
	/**
	 * method called from onReceive to store information
	 * @param info
	 * @return
	 */
	private boolean saveInformation (String info) {
		Log.d("PELLODEBUG","BR> saving info: " + info);
		return true;
	}
	
	
}

</pre>

<h5>La MainActivity</h5>
<p>
Otros dirán lo que sea pero en mi caso <b>ha sido imprescindible para registrar el Receiver</b> con la llamada registerReceiver().
</p>
<pre class="brush: java">
package info.pello.android.broadcastreceiver;

import android.os.Bundle;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.IntentFilter;
import android.util.Log;

/**
 * MainActivity that simply register a BroadcastReceiver.
 * It's important to unregister on Stop event or we will get an Exception.
 * @author Pello Xabier Altadill Izura
 * @greetz For those who dare to mix Android and Threads
 */
public class MainActivity extends Activity {
	PhoneCallReceiver myPhoneCallReceiver = new PhoneCallReceiver();

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		Log.d("PELLODEBUG","MainActivity> unregistering Receiver");
	}
	
	@Override
	protected void onStart() {
		myPhoneCallReceiver = new PhoneCallReceiver();
		IntentFilter myFilter = new IntentFilter();
		myFilter.addAction("android.intent.action.HEADSET_PLUG");
		myFilter.addAction("android.intent.action.PHONE_STATE");
		myFilter.addAction("android.intent.action.BOOT_COMPLETED");
		myFilter.addAction("android.intent.action.QUICKBOOT_POWERON");

		// We register the receiver...
		// and off we go...
		this.registerReceiver(myPhoneCallReceiver, myFilter);
		Log.d("PELLODEBUG","Activity> receiver registered");
		super.onStart();
	}
	
	/**
	 *  We must override this to avoid 
	 *  Are you missing a call to unRegisterReceiver()
	 *  exception	 
	 *  */
	@Override
	protected void onStop() {
		Log.d("PELLODEBUG","MainActivity> unregistering Receiver");
		if (null != myPhoneCallReceiver)
			this.unregisterReceiver(myPhoneCallReceiver);
		else
			Log.d("PELLODEBUG","MainActivity> is null already");
		super.onStop();
	}
	

}

</pre>
<br />
<i>It's alive!</i> <i>It's aliveeee!</i>
<img src="http://www.pello.info/images/androidbroadcast.png" alt="El logcat mostrando los Intents del receiver" title="El logcat mostrando los Intents del receiver" />

<h5>El Manifest</h5>
<p>
El proyecto, lo diré por si no era evidente, es un proyecto NORMAL, con su activity por defecto NORMAL. Se le han añadido un par de permisos, uno para poder ver el estado del teléfono (para los intents de llamadas) y otro para que se entere cuándo hay un reinicio del sistema. Este último es muy interesante y como decía he comprobado que efectivamente al reiniciar el BroadcastReceiver responde al Intent. Luego en la propia configuración del manifest he indicado que hay un BroadcastReceiver y los Intents a los que responde.
</p>
<pre class="brush: xml">
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="info.pello.android.broadcastreceiver"
    android:versionCode="1"
    android:versionName="1.0" >

    <uses-sdk
        android:minSdkVersion="8"
        android:targetSdkVersion="17" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/AppTheme" >
        <activity
            android:name="info.pello.android.broadcastreceiver.MainActivity"
            android:label="@string/app_name" >
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <receiver
            android:name="info.pello.android.broadcastreceiver.PhoneCallReceiver"
            android:enabled="true"
            android:exported="true" >
            <intent-filter>
                <action android:name="android.intent.action.PHONE_STATE" />
                <action android:name="android.intent.action.HEADSET_PLUG" />
	        	<action android:name="android.intent.action.BOOT_COMPLETED" />
    		    <action android:name="android.intent.action.QUICKBOOT_POWERON" />
                </intent-filter>
        </receiver>
    </application>

</manifest>

</pre>

<p>Por cierto, hasta ahora estaba poniendo al revés el orden en los mensajes de Log.d, hay que poner el tag primero. La información la podemos seguir viendo pero es más cómodo para aplicar un filtro tag: en el logcat. En este proyecto ya está correcto. Sorry!</p>