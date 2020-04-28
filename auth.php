<?php

ini_set('session.use_cookies', 1);
session_start();

//1. Авторизация на сайте.
if (!isset($_SESSION['UserId'])) {
    if (isset($_POST["typeJson"]) || isset($authAjax)) {
        $msg = array();
        //Авторизация пользователя.
        if ($_POST["login"] && $_POST["password"]) {
            if ($_POST["login"] == 1 && $_POST["password"] == 1) {
                $_SESSION['UserId'] = 1;
                $_SESSION["Name"] = "Имя";
                $_SESSION["Family"] = "Фамилия";
                $msg["Success"] = "1";
            } else {
                $msg["AuthError"] = "Не верный логин или пароль!";
            }
        } else {
            $msg["AuthError"] = "Время сесси истекло. Для дальнейше работы, необходимо перелогиниться.";
        }
        echo json_encode($msg);
    } else {
        $page = file_get_contents($pageAuth);
        $page = str_replace("%\$host%", $host, $page);
        echo $page;
    }
    exit();
}

//2. Проверка доступа к странице. (В разработке)
?>
