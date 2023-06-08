<?php

function comprobarusuario($usuario,$contra){
    include("conexion.php");
    //Comprobamos si existe el usuario
    $query = "SELECT id , usuario , password FROM config WHERE usuario='$usuario' AND password='$contra'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    if($row != 0){
        //Iniciamos sesion o reanudamos.
        session_start();
        //Guardamos en la variable super global sesion con nombre 'usuario' el valor de usuario.
        $_SESSION["usuarioLogeado"]=$_POST["usuario"];
        if($usuario === "admin" && $contra === "admin"){
            //Redirigimos hacia ese fichero si es profesor.
            header("location:../cuerpo/admin/index.php");
        }
        else{
            //Redirigimos hacia ese fichero si es alumno.
            header("location:modulos/index_modulo.php");
        }
    }
    else{
        //Redirige hacia la pagina login.
        header("location:index.php");
    }
}

function agregarusuario($usuario,$contra){
    include("conexion.php");
    //Comprobaremos si existe o no el usuario y su contraseña
    $query = "SELECT COUNT(*) AS total FROM config WHERE usuario='$usuario' AND password='$contra'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    //Si existe, mostraremos el mensaje
    if($row['total'] != 0 || $usuario == "admin"){
        echo "<script>alert('Usuario y contraseña ya existente')</script>";
    }
    //Sino existe agregaremos el usuario y su contraseña y mandaremos el mensaje
    else{
        //Armamos el query para insertar en la tabla el usuario*************
        $query = "INSERT INTO config (usuario, password, totalpreguntas) VALUES ('$usuario', '$contra' , '10')";
        //insertamos en la tabla temas
        if (mysqli_query($conn, $query)) { //Se insertó correctamente
            //Redirigimos a index.php
            header("Location: index.php");
        }
    }
}

function eliminarsesion(){
    //Destruimos la session.
	session_destroy();
    setcookie(session_name(),'',time() - 1);
	//Redirigimos hacia el login.
	header("location:index.php");
}

function limpiar($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
};


?>