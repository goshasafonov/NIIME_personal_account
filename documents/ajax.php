<?php

ini_set('error_reporting', 0);
ini_set('display_errors', 0);

$authAjax = true;

include './../config.php';
include './../auth.php';
include $phpLogin;

$msg = array();
$queryId = $_POST['queryId'];

$queryId = "getListDocuments";

switch ($queryId) {
    case 'getListDocuments':
        $query = ""
                . "SELECT"
                . " `Document`.Id, "
                . " `Document`.Name, "
                . " `Document::UploadStatus`.Name as UploadStatus, "
                . " `Document::PublicationStatus`.Name as PublicationStatus, "
                . " `Document`.Description "
                . "FROM"
                . " `Document` "
                . " LEFT JOIN `Document::UploadStatus` ON `Document::UploadStatus`.Id = `Document`.UploadStatusId "
                . " LEFT JOIN `Document::PublicationStatus` ON `Document::PublicationStatus`.Id = `Document`.PublicationStatusId ";
        $result = $mysqli->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $tmp = array();
                $tmp['id_document'] = $row['Id'];
                $tmp['name_document'] = $row['Name'];
                $tmp['status_document'] = array(); 
                $tmp['status_document'][] = $row['UploadStatus'];
                $tmp['status_document'][] = 'success';
                $tmp['status_document'][] = $row['PublicationStatus'];
                $tmp['document_agreed'] = true;
                $tmp['comment_document'] = $row['Description'];
                $tmp['href_document'] = "$host/document/id?" . $row['Id'];
                $tmp['last_update'] = '0000-00-00 00:00:00';
                $msg[] = $tmp;
            }
        } else {
            $msg["AjaxError"] = "Ошибка в запросе на получение списка документов: <br>" . $mysqli->error;
        }
        break;
    default:
        $msg['AjaxError'] = "Не корректный ключ запроса.";
}

echo json_encode($msg);
?>
