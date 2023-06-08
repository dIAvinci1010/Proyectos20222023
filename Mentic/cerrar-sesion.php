<?php
    session_start();
    session_destroy();
    header("Location: ../../cabeza/index.php");
?>