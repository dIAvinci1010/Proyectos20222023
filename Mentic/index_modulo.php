<?php
//inciamos sesion
session_start();
//Comprobamos que el usuario esta logeado
if(!isset($_SESSION["usuarioLogeado"])){
	//Sino esta lo redirige al index principal
    header("location:../index.php");
}
//Guardamos la variable de la sesion en nombre
$nombre=$_SESSION["usuarioLogeado"];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style_modulo.css">
    <title>Modulos</title>
</head>
<body>
    <div class="grid-container">
        <div class="item1">
            <img src="../img/Logo black brain.png" alt="" height="70px" width="70px">
             Usuario : <?php echo $nombre ?>
        </div>
        <div class="item2">
            <nav>
                <ul>
                    <li><a href="">Configuraciones</a></li>
                    <li><a href="../salirsesion.php">Salir</a></li>
                    <li><a href="">Contacto</a></li>
                </ul>
            </nav>
        </div>
        <div class="item3">
            <div class="title-cards">
                <h2>Bienvenido a los Módulos</h2>
            </div>
            <div class="container-card">
                <div class="card">
                    <figure>
                        <img src="../img/foto1.jpg">
                    </figure>
                    <div class="contenido-card">
                        <h3>Atención y Apoyo Psicosocial</h3>
                        <p>Descripción del módulo</p>
                        <a href="moduloAAP/teoria.php">Teoria</a>
                        <a href="../../cuerpo/index.php">Practica</a>
                    </div>
                </div>
                <div class="card">
                    <figure>
                        <img src="../img/foto2.jpg">
                    </figure>
                    <div class="contenido-card">
                        <h3>Caracteristicas y Necesidades de las PSD</h3>
                        <p>Descripción del módulo</p>
                        <a href="moduloPSD/teoria.php">Teoria</a>
                        <a href="../../cuerpo/index.php">Practica</a>
                    </div>
                </div>
                <div class="card">
                    <figure>
                        <img src="../img/foto3.jpg">
                    </figure>
                    <div class="contenido-card">
                        <h3>Destrezas Sociales</h3>
                        <p>Descripción del módulo</p>
                        <a href="moduloDS/teoria.php">Teoria</a>
                        <a href="../../cuerpo/index.php">Practica</a>
                    </div>
                </div>
            </div>
        </div>  
        <div class="item5"> 
            <a href="https://instagram.com/diavinciapp?igshid=ZGUzMzM3NWJiOQ==">dIAvinci Copyright</a>

            </div>
    </div>
</body>
</html>
