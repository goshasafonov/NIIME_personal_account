<?php

$mysqli = new mysqli($dbHost, $dbUser, $dbPwd, $dbBase);

if ($mysqli->connect_errno) {
    $msg['AjaxError'] = "Извините, возникла проблема на сайте<br>"
            . "Ошибка: Не удалась создать соединение с базой MySQL и вот почему: <br>"
            . "Номер ошибки: " . $mysqli->connect_errno . "<br>"
            . "Ошибка: " . $mysqli->connect_error . "<br>";
    echo json_encode($msg);
    exit;
}

if (!$mysqli->set_charset('utf-8')) {
    $msg['AjaxError'] = "Извините, возникла проблема на сайте<br>"
            . "Ошибка: Не удалось установить 'utf-8': <br>"
            . "Номер ошибки: " . $mysqli->errno . "<br>"
            . "Ошибка: " . $mysqli->error . "<br>";
}
?>
