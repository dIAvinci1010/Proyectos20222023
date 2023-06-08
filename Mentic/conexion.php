<?php
//datos del servidor
$server		="localhost";
$username	="root";
$password	="rootroot";
$bd			="dia";

//creamos una conexión
$conn = mysqli_connect($server, $username, $password, $bd);

$conn->query("SET NAMES 'utf8'");
//Chequeamos la conexión
if(!$conn){
	die("Conexión fallida:" . mysqli_connect_error());
}

//Chequeamos la conexión
if(!$conn){
	die("Conexión fallida:" . mysqli_connect_error());
}

?>

