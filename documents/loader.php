<?php
//
include './../config.php';
include './../auth.php';
include $phpLogin;


$fileErrorLog = __DIR__.'log.txt';

$date = date("y.m.d");
$time = date("h.i.s");
//$fileErrorLog = "ErrorLog/" . $date . ".errorLog";
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
	isset($_SERVER["HTTP_DATA_BASE_ID"]) &&
	isset($_SERVER["HTTP_PROJECT_FILE_ID"])
	)
{
	$from  = intval($_SERVER["HTTP_PORTION_FROM"]);
    $size  = intval($_SERVER["HTTP_PORTION_SIZE"]);
    $file  = intval($_SERVER["HTTP_PORTION_FILE"]);
    $DB_id = intval($_SERVER["HTTP_DATA_BASE_ID"]);
    $name  = $_FILES['blob']['name'];
    $ext = pathinfo($name, PATHINFO_EXTENSION);

    $msg["From"] = $_SERVER["HTTP_PORTION_FROM"];
    $msg["Size"] = $_SERVER["HTTP_PORTION_SIZE"];
    $msg["File"] = $_SERVER["HTTP_PORTION_FILE"];
    $msg["name"] = $_FILES['blob']['name'];
    $msg["ProjectFileId"] = $_SERVER["HTTP_PROJECT_FILE_ID"];
    $msg["DB_id"] = $_SERVER["HTTP_DATA_BASE_ID"];

    if (($from + $size) < $file) {
        $statusId = 2;
    } else {
        $statusId = 4;
    };

    $UploadStatusId = 1;
    $UploadUserId = 13131313;
    $PublicationStatusId = 1;
	
    if (intval($_SERVER["HTTP_PORTION_FROM"]) == 0) {

    	$query = "INSERT INTO"
                    . " `document` "
                    . "SET"
                    . " `Path` = ?, "
                    . " `Name` = ?,"
                    . " `UploadUserId` = ?,"
                    . " `UploadStatusId` = ?,"
                    . " `PublicationStatusId` = ?,"
                    . " `Description` = ?";
        $statement = $mysqli->prepare($query);
    	if ($statement) {
    		$statement->bind_param('ssiiis', $name, $name, $UploadUserId, $UploadStatusId, $PublicationStatusId, $_POST['comment']);
    		if ($statement->execute()) {
    			$msg["AjaxSuccess"] = $statement->insert_id;
    			$msg["DB_id"] = $msg["AjaxSuccess"];

    			mkdir($uploadDir.'/'.$msg["AjaxSuccess"], 0777);
        		$filename = $uploadDir.'/'.$msg["AjaxSuccess"].'/'.'doc_'.$msg["AjaxSuccess"].'.'.$ext;
        		$fout = fopen($filename, "wb");
    		} else {
                $msg["AjaxError"] = $time . ": Не удалось добавить проект. Обратитесь к администратору.";
                $errorText = $time . ":\t Ошибка записи в базу : (" . $mysqli->errno . " ) " . $mysqli->error . "\n";
                file_put_contents($fileErrorLog, $errorText, FILE_APPEND);
            }
            $statement->close();
    	}else {
            $msg["AjaxError"] = $time . ": Не удалось добавить документ. Обратитесь к администратору.";
            $errorText = $time . ":\t Ошибка записи в базу : (" . $mysqli->errno . " ) " . $mysqli->error . "\n";
            file_put_contents($fileErrorLog, $errorText, FILE_APPEND);
        };
    } else {
    	$filename = $uploadDir.'/'.$DB_id.'/'.'doc_'.$DB_id.'.'.$ext;
        $fout = fopen($filename, "ab");
    };
    fwrite( $fout, file_get_contents($_FILES['blob']['tmp_name']) );
    fclose($fout);
    

    

    if ($statusId === 4) {
		$UploadStatusId = 2;

    	$DB_id = $msg["DB_id"];
    	$path = 'upload'.'/'.$DB_id.'/'.'doc_'.$DB_id.'.'.$ext;
    	$query = ""
    			. "UPDATE"
                . " `document` "
                . "SET"
                . " `document`.Path = ?, "
                . " `document`.UploadStatusId = ?, "
                . " `document`.Description = ? "
                . "WHERE"
                . " `document`.Id = ?";

        $statement = $mysqli->prepare($query);
    	if ($statement) {
    		$statement->bind_param('sisi', $path, $UploadStatusId, $_POST['comment'], $DB_id);
    		if ($statement->execute()) {
    			$msg["AjaxSuccess"] = $DB_id;
    		} else {
                $msg["AjaxError"] = $time . ": Не удалось добавить проект. Обратитесь к администратору.";
                $errorText = $time . ":\t Ошибка записи в базу : (" . $mysqli->errno . " ) " . $mysqli->error . "\n";
                file_put_contents($fileErrorLog, $errorText, FILE_APPEND);
            }
            $statement->close();
    	}else {
            $msg["AjaxError"] = $time . ": Не удалось добавить документ. Обратитесь к администратору.";
            $errorText = $time . ":\t Ошибка записи в базу : (" . $mysqli->errno . " ) " . $mysqli->error . "\n";
            file_put_contents($fileErrorLog, $errorText, FILE_APPEND);
        };
    };
    echo json_encode($msg);
};


?>