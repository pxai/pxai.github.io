<h5>Accceso a Web desde Android</h5>
<p>Las aplicaciones para móviles se podrían dividir en tres grandes grupos: las que
se ejecutan totalmente de forma local, las que tienen toda la información en la web
y las que combinan las dos cosas. Si tenemos que acceder a la web desde Android y
 teniendo en cuenta que lo hacemos con java tenemos dos opciones por defecto:
 <ol>
 <li>Usar las librerías básicas de java.net</li>
 <li>Usar HttpClient</li>
 </ol>
</p>
<h5>HttpClient la librería de Apache</h5>
<img src="http://hc.apache.org/httpclient-3.x/images/httpclient_logo.png" title="Logo pre-web ochentero" alt="Logo pre-web ochentero" />
<p>
<a href="http://www.pello.info/index.php/blog/15-acceso-web-desde-android" title="aaceso a web desde Android con httclient" >En este artículo</a> ya
mostraba un ejemplo de uso de HttpClient con Android. HttpClient es una librería que forma
parte del proyecto Apache, ya va por la versión 4.3 y que aparte de tener cierto recorrido pues qué
vamos a decir, tiene detrás a Apache y ya se sabe, esta gente puede decir aquella frase de los jubilados de vaya semanita:
"yo traje la web a Internet chaval".
</p>
<pre class="brush: java">
...
    /*
     * consultar
     * Hace una petición a la web
     * Todo a mano con httpclient
     * @param View v
     */
    public void consultar (View v) {
    	String url = etUrl.getText().toString();
    	HttpGet peticion = new HttpGet(url);
		HttpClient cliente = new DefaultHttpClient();
		
    	try {
			ResponseHandler<String> respuesta = new BasicResponseHandler();
			String cuerpoRespuesta = cliente.execute(peticion,respuesta);

			if (cuerpoRespuesta != null && cuerpoRespuesta.length() > 0) {
				tvResultado.setText("OK\n: " + cuerpoRespuesta);
			} else {
				tvResultado.setText("Error\n"+cuerpoRespuesta);
			}

		} catch (ClientProtocolException e) {
			tvResultado.setText("Unexpected ClientProtocolException" + e);
		} catch (IOException e) {
			tvResultado.setText("Unexpected IOException" + e);
		}

    }
    
    /*
     * postear
     * Enví­a una petición a la web.. con POST pasando parámetros
     * @param View v
     */
    public void postear (View v) {
    	String url = etUrl.getText().toString();
    	String login = etLogin.getText().toString();
    	String password = etPassword.getText().toString();
    	
    	HttpPost peticion = null;
		HttpClient cliente = null;
		
		Vector<NameValuePair> parametros = new Vector<NameValuePair>();
		ResponseHandler<String> respuesta = new BasicResponseHandler();
		
    	try {
    		parametros.add(new BasicNameValuePair("login", login));
    		parametros.add(new BasicNameValuePair("password", password));
    		
    		url +=  "?" + URLEncodedUtils.format(parametros, null);

    		peticion = new HttpPost(url);
			cliente = new DefaultHttpClient();
    		
			String cuerpoRespuesta = cliente.execute(peticion,respuesta);
	    	

			
			if (cuerpoRespuesta != null && cuerpoRespuesta.length() > 0) {
				tvResultado.setText("OK\n: " + cuerpoRespuesta);
			} else {
				tvResultado.setText("Inesperado: \n"+cuerpoRespuesta);
			}

		} catch (ClientProtocolException e) {
			tvResultado.setText("Unexpected ClientProtocolException" + e);
		} catch (IOException e) {
			tvResultado.setText("Unexpected IOException" + e);
		}  	
    }
...
</pre>
<p>Android trae la librería HttpClient por defecto, lo cual está muy bien, pero hay un pequeño problema.
Parece ser que la versión de HttpClient que Android introduce por defecto siempre es una
4.0beta, y lo que es peor, no la cambian. Y es probable que por la web te encuentres muchos
ejemplos de HttpClient y al trasladarlos a una aplicación Android haya muchas clases cruciales
que no se reconocen. Así que en este post, para ejemplos simples lo que propongo es:
</p>
<h5>java.net: back to basics</h5>
<p>A ver, si meter soporte para otras versiones de HttpClient puede ser tan simple como
introducir ese jar en la App, o sencillamente buscar otras librerías que seguramente lo hacen
muy bien. Esto no es más que una clase muy muy simple que tira de java.net para hacer
dos cosas muy simples: GET y POST, con soporte para cookies, y sin necesidad de añadir librerías extras.
</p>
<pre class="brush: java">


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Hashtable;


/**
 * Simple class to make HTTP requests using standar java.net package
 * @author Pello Xabier Altadill Izura
 * @greetz 4 u
 */
public class WebRequest {
	private String userAgent;
	private String responseString;
	private int responseCode;
	private String exceptionMessage;
	private Hashtable<String,String> cookies;
	
	/**
	 * default constructor
	 */
	public WebRequest () {
		this.userAgent = "EvilBlackDeathOfDoom browser v1.0";
		cookies = new Hashtable<String,String>();
	}

	/**
	 * makes GET request to URL
	 * @param urlString to request
	 * @return true if everything went fine, false otherwise
	 */
	public boolean get (String urlString) {
		boolean result = false;
		responseString = "";
		exceptionMessage = "";
		String line = "";
		
		
		try {
				// Create an URL instance
			   URL url = new URL(urlString);
			   
		       // Create the HttpConnection
			   HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		       connection.setRequestProperty("User-Agent", userAgent); 
		       connection.setRequestMethod("GET");
		       setCookies(connection);

		        // Get input stream from server
		        BufferedReader in = new BufferedReader(new InputStreamReader(
		                                    connection.getInputStream()));
		    // Read response from server
		    while ((line = in.readLine()) != null) {
		    	responseString += line;
		    }
		    
		    in.close();
		return true;
		
	    } catch (IOException e) {
		  exceptionMessage = e.getMessage();
		  e.printStackTrace();
		} catch (Exception e) {
		  exceptionMessage = e.getMessage();	    	
		}
		
		return false;
		
	}
	
	/**
	 * makes POST request to URL
	 * @param url to request
	 * @param parameters for POST
	 * @return true if everything went fine, false otherwise
	 */
	public boolean post (String urlString, Hashtable<String,String> parameters) {
		boolean result = false;
	    String line = "";
	    String postString = "";
	    String parameterValue = "";
		responseString = "";
		exceptionMessage = "";

			try {

		        URL url = new URL(urlString);
		        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
		        connection.setRequestMethod("POST");
		        connection.setRequestProperty("User-Agent", userAgent); 
		        connection.setDoOutput(true);
		        setCookies(connection);

		        OutputStreamWriter output = new OutputStreamWriter(
		                                         connection.getOutputStream());
		        
		        
		        // We set parameters one by one
			    for (String parameterName : parameters.keySet()) {
			    	parameterValue = URLEncoder.encode(parameters.get(parameterName),"UTF-8");
			    	postString += parameterName + "=" +parameterValue +"&";
			     }
			    
			    output.write(postString);
		        output.close();

		        // Now we get the response
		        BufferedReader in = new BufferedReader(
		                                    new InputStreamReader(
		                                    connection.getInputStream()));
		        
		      getCookies(connection);
		      responseCode = connection.getResponseCode();
		      
		      while ((line = in.readLine()) != null) {
		        responseString += line;
		      }
		      in.close();
		     return true;
		     
		    } catch (IOException e) {
		      exceptionMessage = e.getMessage();
		      e.printStackTrace();
		    } catch (Exception e) {
			  exceptionMessage = e.getMessage();	    	
		      e.printStackTrace();
		    }
			return false;
	}
	
	/**
	 * sends previously saved cookies to server.
	 * This method restores cookie name=value pairs from cookies hashtable
	 * and puts them in request header:
	 *  cookiename1=value1; cookiename2=value2;..
	 * @param connection
	 */
	private void setCookies(HttpURLConnection connection) {
		String cookieString = "";

		// Get cookies name=value pair from hashtable
		for (String cookieName : cookies.keySet()) {
			cookieString += cookieName + "=" + cookies.get(cookieName) + ";";
		}
		
		// and put them in the request header
		System.out.println("Sending cookies to server: " + cookieString);
		connection.setRequestProperty("Cookies", cookieString);
	}

	/**
	 * retrieves Cookies sent by server
	 * Cookies come in this form:
	 *  Set-Cookie: name1=value1;
	 *  Set-Cookie: name2=value2;
	 *  ...
	 * So we have to retrieve every Set-Cookie line and parse cookie name and value
	 * This method stores cookie data in the cookies Hashtable for further use
	 * @param connection
	 */
	private void getCookies(HttpURLConnection connection) {
		String headerName=null;
		String cookieString = "";
        String cookieName = "";
        String cookieValue = "";        
        
		// We look up for Set-Cookie entries in header
		for (int i=1; (headerName = connection.getHeaderFieldKey(i))!=null; i++) {
		 	if (headerName.equals("Set-Cookie")) {                  
		 		cookieString = connection.getHeaderField(i);   
		        cookieString = cookieString.substring(0, cookieString.indexOf(";"));
		        cookieName = cookieString.substring(0, cookieString.indexOf("="));
		        cookieValue = cookieString.substring(cookieString.indexOf("=") + 1, cookieString.length());
		        cookies.put(cookieName, cookieValue);
		        System.out.println("One cookie, mmm yummy: " + cookieName + "=" + cookieValue);
		    }
		}
	}

	/**
	 * @return the userAgent
	 */
	public String getUserAgent() {
		return userAgent;
	}

	/**
	 * @param userAgent the userAgent to set
	 */
	public void setUserAgent(String userAgent) {
		this.userAgent = userAgent;
	}

	/**
	 * @return the responseString
	 */
	public String getResponseString() {
		return responseString;
	}

	/**
	 * @param responseString the responseString to set
	 */
	public void setResponseString(String responseString) {
		this.responseString = responseString;
	}

	/**
	 * @return the responseCode
	 */
	public int getResponseCode() {
		return responseCode;
	}

	/**
	 * @param responseCode the responseCode to set
	 */
	public void setResponseCode(int responseCode) {
		this.responseCode = responseCode;
	}

	/**
	 * @return the exceptionMessage
	 */
	public String getExceptionMessage() {
		return exceptionMessage;
	}

	/**
	 * @param exceptionMessage the exceptionMessage to set
	 */
	public void setExceptionMessage(String exceptionMessage) {
		this.exceptionMessage = exceptionMessage;
	}
}

</pre>

<p>Esta sería la clase principal para hacer pruebas, que en este caso se hizo con
éxito contra una aplicación php que me facilitó amablemente <a href="http://www.eugeniaperez.es" title="pincha y abandona esta web, encontrarás cosas más pro">Eugenia</a>.
Como se puede apreciar hay un ejemplo de get y otro de post, y el uso de la clase WebRequest es muy muy sencillo.</p>
<pre class="brush: java">
import java.util.Hashtable;



/**
*
* @author Pello Altadill
* @greetz blue mugs
*/
public class Main {
	public static void main (String args[]) {
		WebRequest webRequest = new WebRequest();
		
		if (webRequest.get("http://192.168.77.104/labs/Ejemplo1DAM/index.php")) {
			System.out.println("OK: " + webRequest.getResponseString());
		} else {
			System.out.println("Error: " + webRequest.getExceptionMessage());			
		}
		
		Hashtable<String,String> parameters = new Hashtable<String,String>();
		parameters.put("usuario", "falken");
		parameters.put("password", "josua");
		
		if (webRequest.post("http://192.168.77.104/labs/Ejemplo1DAM/consultarUsuario.php", parameters)) {
			System.out.println("OK login: " + webRequest.getResponseString() + "\n" + webRequest.getResponseCode());
		} else {
			System.out.println("Error: " + webRequest.getExceptionMessage() + "\n" + webRequest.getResponseCode());			
		}
		

	}
}
</pre>
<p>Puedes <a href="http://erps-2dam-4vientos.googlecode.com/files/WebConsole.zip" title="Ejemplo acceso a web desde java.net" alt="Ejemplo acceso a web desde java.net">descargarte este ejemplo aquí</a>. Necesita bastantes mejoras y la primera sería añadir el soporte para redirects.</p>