<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
    <title>Bienvenido a dlAvinci</title>
</head>

<body>
    <div class="container-form sign-up">
        <div class="welcome-back">
            <div class="message">
                <h2>Bienvenido a dlAvinci</h2>
                <p>Si ya tienes una cuenta por favor inicia sesion aqui</p>
                <button class="sign-up-btn">Iniciar Sesion</button>
            </div>
        </div>
        <form class="formulario" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">
            <h2 class="create-account">Crear una cuenta</h2>
            <div class="iconos">
                <div class="border-icon">
                    <a href="https://instagram.com/diavinciapp?igshid=ZGUzMzM3NWJiOQ=="><i class='bx bxl-instagram'></i></a>
                </div>
            </div>
            <p class="cuenta-gratis">Crear una cuenta gratis</p>
            <input type="text" placeholder="Usuario" name="usuario">
            <input type="password" placeholder="Contraseña" name="contra">
            <input type="email" placeholder="Email" name="email">
            <input type="submit" value="Registrarse" name="registrar">
        </form>
    </div>
    <div class="container-form sign-in">
        <form class="formulario" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>" method="POST">
            <h2 class="create-account">Iniciar Sesion</h2>
            <div class="iconos">
                <div class="border-icon">
                    <a href="https://instagram.com/diavinciapp?igshid=ZGUzMzM3NWJiOQ=="><i class='bx bxl-instagram'></i></a>
                </div>
            </div>
            <p class="cuenta-gratis">Dime tus datos de sesión</p>
            <input type="text" placeholder="Usuario" name="usuario">
            <input type="password" placeholder="Contraseña" name="contra">
            <input type="submit" value="Iniciar Sesion" name="iniciar">
        </form>
        <div class="welcome-back">
            <div class="message">
                <h2>Bienvenido a dlAvinci</h2>
                <p>Si aun no tienes una cuenta por favor registrese aqui</p>
                <button class="sign-in-btn">Registrarse</button>
            </div>
        </div>
    </div>
    <script src="js/script.js"></script>
</body>

</html>

<?php
//Incluimos el archivo funciones.php
include("funciones.php");

//Comprobamos que ha dado click en el boton iniciar.
if (isset($_POST["iniciar"])){
	//Guardamos las variables con sus valores que ha intorducido en el formulario
	$usuario= limpiar($_POST["usuario"]);
	$contra= limpiar($_POST["contra"]);
	//LLamamos a la funcion para redirigirlo a la siguiente pagina o volver a loguearse.
	comprobarusuario($usuario,$contra);
}

//Comprobamos que ha dado click en el boton registrar.
if (isset($_POST["registrar"])){
    //Comprobamos si los campos estan vacios.
    if(empty($_POST["contra"]) || empty($_POST["contra"])){
        //Mandamos mensaje si estan vacios.
        echo "<script>alert('Rellena todos los campos')</script>";
    }
    else{
        //Sino guardamos las variables con sus valores que ha intorducido en el formulario
        $usuario= limpiar($_POST["usuario"]);
        $contra= limpiar($_POST["contra"]);
        //LLamamos a la funcion para redirigirlo a la siguiente pagina o volver a loguearse.
        agregarusuario($usuario,$contra);
    }
}

?>