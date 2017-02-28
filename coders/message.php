<?
// Vamos a enviar el correo:
if (isset($feedback) && (strlen(trim($feedback)) > 0) ) {
        mail("pello@pello.info","Mezua webgunetik : $score -".date("l dS de F Y h:i:s A"),$feedback);
        $result= "Thanks";
} else {
        $result = "Where is your message?";
}
?>

<html>
<head>
<title>Gracias - Mila esker - Thanks
</title>
<META http-equiv="refresh" content="1;URL=http://coders.pello.info/">
</head>
<body>
<center>
<a href="javascript:history.back()">Volver - Itzuli - Back</a><br>
<?=$result?>
</center>
</body>
</html>

