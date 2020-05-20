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

                . " `Document::UploadStatus`.StatusClass as UploadStatusClass, "
                . " `Document::PublicationStatus`.StatusClass as PublicationStatusClass, "


                . " `Document`.Description, "
                . " `Document`.UploadUserId, "
                . " `Document`.TimeStamp "
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
                
                $tmp['status_document'][0]['name'] = 'Процесс загрузки';
                $tmp['status_document'][0]['status'] = $row['UploadStatus'];
                $tmp['status_document'][0]['class'] = $row['UploadStatusClass'];
                $tmp['status_document'][0]['user'] = $row['UploadUserId'];
                $tmp['status_document'][0]['comment'] = 'Документ успешно загружен и готов к процессу согласования для более подробной информации перейдите в раздер документа';
                $tmp['status_document'][0]['date'] = $row['TimeStamp'];

                $tmp['status_document'][1]['name'] = 'Процесс согласования';
                $tmp['status_document'][1]['status'] = $row['PublicationStatus'];
                $tmp['status_document'][1]['class'] = 'warning';//$row['PublicationStatusClass'];
                $tmp['status_document'][1]['user'] = $row['UploadUserId'];
                $tmp['status_document'][1]['comment'] = 'Документ успешно согласован и готов к процессу публикации для более подробной информации перейдите в раздер документа';
                $tmp['status_document'][1]['date'] = $row['TimeStamp'];

                $tmp['status_document'][2]['name'] = 'Процесс публикации';
                $tmp['status_document'][2]['status'] = $row['PublicationStatus'];
                $tmp['status_document'][2]['class'] = $row['PublicationStatusClass'];
                $tmp['status_document'][2]['user'] = $row['UploadUserId'];
                $tmp['status_document'][2]['comment'] = 'Документ успешно опубликован для просмотра и более подробной информации перейдите в раздер документа';
                $tmp['status_document'][2]['date'] = $row['TimeStamp'];

                $tmp['document_agreed'] = true;
                $tmp['comment_document'] = $row['Description'];
                $tmp['href_document'] = "$host/documents/id/?doc=" . $row['Id'];
                $tmp['last_update'] = $row['TimeStamp'];
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
