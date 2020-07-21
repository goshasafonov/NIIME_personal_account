<?php

ini_set('error_reporting', 0);
ini_set('display_errors', 0);

$authAjax = true;

include './../config.php';
include './../auth.php';
// $dbUser = "php_checkDB_v2";
// $dbPwd = "XH55bf5d5y5SbThA";

$dbUser = "root";
$dbPwd = "";
include $phpLogin;

$msg = array();
$queryId = $_POST['queryId'];

switch ($queryId) {
    case 'setBug':
        // $query = "SELECT"
        //             . " `Id`, "
        //             . " `NameCategory` "
        //             . "FROM"
        //             . " `categories_documents`";
        // $result = $mysqli->query($query);
        // if ($result) {
        //     while( $row = $result->fetch_assoc() ) {
        //         $msg[] = $row;
        //     };
        // }else {
        //     $msg["AjaxError"] = "Ошибка в запросе на получение списка категорий: <br>" . $mysqli->error;
        // }

        $msg[] = 'olololo';
        break;
    default:
        $msg['AjaxError'] = "Не корректный ключ запроса.";
}

echo json_encode($msg);
?>
