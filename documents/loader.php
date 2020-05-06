<?php
//
include './../config.php';
include './../auth.php';
include $phpLogin;


$date = date("y.m.d");
$time = date("h.i.s");
$fileErrorLog = "ErrorLog/" . $date . ".errorLog";
$uploadDir = $_SERVER['DOCUMENT_ROOT'].'/'.'NIIME_personal_account'.'/'.'upload';

if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir)) {
        $msg["AjaxError"] = $time . ": Ошибка при настройки среды для работы. Обратитесь к администратору.";
        $errorText = $time . ": Не удалось создать дирректорию: $uploadDir \n";
        file_put_contents($fileErrorLog, $errorText, FILE_APPEND);
        echo json_encode($msg);
        exit();
    }
}
//
if (
	isset($_SERVER["HTTP_PORTION_FROM"]) && 
	isset($_SERVER["HTTP_PORTION_SIZE"]) && 
	isset($_SERVER["HTTP_PORTION_FILE"]) &&
	isset($_FILES['blob']['name']      ) &&
	isset($_SERVER["HTTP_PROJECT_FILE_ID"])
	)
{
	$from = intval($_SERVER["HTTP_PORTION_FROM"]);
    $size = intval($_SERVER["HTTP_PORTION_SIZE"]);
    $file = intval($_SERVER["HTTP_PORTION_FILE"]);
    $name = $_FILES['blob']['name'];

    $msg["From"] = $_SERVER["HTTP_PORTION_FROM"];
    $msg["Size"] = $_SERVER["HTTP_PORTION_SIZE"];
    $msg["File"] = $_SERVER["HTTP_PORTION_FILE"];
    $msg["name"] = $_FILES['blob']['name'];
    $msg["ProjectFileId"] = $_SERVER["HTTP_PROJECT_FILE_ID"];

    if (($from + $size) < $file) {
        $statusId = 2;
    } else {
        $statusId = 4;
    };

    
	$filename = $uploadDir . "/" . $name;
    if (intval($_SERVER["HTTP_PORTION_FROM"]) == 0) {
        $fout = fopen($filename, "wb");
    } else {
        $fout = fopen($filename, "ab");
    };
    fwrite( $fout, file_get_contents($_FILES['blob']['tmp_name']) );
    fclose($fout);
    

    $id = 1;

    // if ($statusId === 4) {
    // 	$query = "INSERT INTO"
    //                 . " `document` "
    //                 . "SET"
    //                 . " `Path` = ?, "
    //                 . " `Name` = ?,"
    //                 . " `UploadUserId` = ?,"
    //                 . " `UploadStatusId` = ?,"
    //                 . " `PublicationStatusId` = ?,"
    //                 . " `Description` = ?";
    //     $statement = $mysqli->prepare($query);
    //     $statement->bind_param('ssiiis', $name, $name, $id, $id, $id, $_POST['comment']);
    //     $statement->execute();
    // };

    echo json_encode($msg);
};
?>