<?php
//Настройки сайта
$host = "http://localhost/NIIME_personal_account";
$titlePage = "Личный кабинет";

//Настройки подключения к БД
$dbHost = "localhost";
$dbBase = "opfshlkv3";
$dbUser = "root";
$dbPwd = "";

//Пустые переменные. Их значения могут меняться внутри скриптов по управлению страницей.
$contentJsScript = "";
$contentCss = "";

//Пути к управляющим файлам.
$pageAuth = __DIR__."/pages/auth.html";
$pageHeader = __DIR__."/pages/header.html";
$pageMenu = __DIR__."/pages/menu.html";
$pageFouter = __DIR__."/pages/fouter.html";
$phpLogin = __DIR__."/php/login.php";
?>
