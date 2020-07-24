<?php

include './../../config.php';
include './../../auth.php';
include $phpLogin;


$msg = array();
$queryId = $_POST['queryId'];
$docId =$_POST['docId'];

switch ($queryId) {
    case 'getInfoDocument':
         $query = ""
            . "SELECT"
            . " `Document`.Id, "
            . " `Document`.Name, "
            . " `Document`.Path, "
            . " `Document::UploadStatus`.Name as UploadStatus, "
            . " `Document::PublicationStatus`.Name as PublicationStatus, "

            . " `Document::UploadStatus`.StatusClass as UploadStatusClass, "
            . " `Document::PublicationStatus`.StatusClass as PublicationStatusClass, "


            . " `Document`.MD5, "
            . " `Document`.Description, "
            . " `Document`.UploadUserId, "
            . " `Document`.TimeStamp "
            . "FROM"
            . " `Document` "
            . " LEFT JOIN `Document::UploadStatus` ON `Document::UploadStatus`.Id = `Document`.UploadStatusId "
            . " LEFT JOIN `Document::PublicationStatus` ON `Document::PublicationStatus`.Id = `Document`.PublicationStatusId "
            . "WHERE"
            . " `Document`.Id=$docId";
    $result = $mysqli->query($query);
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $path_for_doc = $_SERVER['DOCUMENT_ROOT'].'/'.'NIIME_personal_account'.'/'.$row['Path'];

        if ( file_exists($path_for_doc) ) {
			$stat = stat($path_for_doc);
			$row['Size']  = $stat['size'];
			$row['Host']  = $host;
			$msg = $row;
        }else{
            exit();
        }        
    }else{
        exit();
    }
        break;
    default:
    	$msg['AjaxError'] = "Не корректный ключ запроса.";
};

echo json_encode($msg);
?>