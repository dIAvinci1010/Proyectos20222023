<?php
    session_start();
	//Destruimos la session.
	session_destroy();
	//Redirigimos hacia el login.
	header("location:index.php");
?>