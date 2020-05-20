<?php

include './../../config.php';
include './../../auth.php';
include $phpLogin;

$doc_data;

if(isset($_GET['doc'])) {
    $doc_id = $_GET['doc'];

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
            . " LEFT JOIN `Document::PublicationStatus` ON `Document::PublicationStatus`.Id = `Document`.PublicationStatusId "
            . "WHERE"
            . " `Document`.Id=$doc_id";
    $result = $mysqli->query($query);
    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $doc_data = $row;
    }
}else{

}

//var_dump($doc_data);

$page = "";
$titlePage = $titlePage . " | ". $row['Name'];

//header
$pageH = file_get_contents($pageHeader);
$page = $pageH;

//menu
$pageM = file_get_contents($pageMenu);
$page = $page.$pageM;

//content
$pageC = file_get_contents("./page.html");
$page = $page.$pageC;

//fouter
$contentJsScript = '<script src="' . $host . '/documents/content.js" type="text/javascript"></script>';
$contentCss = '<style src="' . $host . '/documents/content.css" type="text/css"></style>';
$pageF = file_get_contents($pageFouter);

//Замена переменных в шаблоне
$page = $page.$pageF;
$page = str_replace("%\$titlePage%", $titlePage, $page);
$page = str_replace("%\$docName%", $row['Name'], $page);
$page = str_replace("%\$host%", $host, $page);
$page = str_replace("%\$userName%", $_SESSION["Name"], $page);
$page = str_replace("%\$userFamily%", $_SESSION["Family"], $page);
$page = str_replace("%\$contentJsScript%", $contentJsScript, $page);
$page = str_replace("%\$contentCss%", $contentCss, $page);


echo $page;
?>