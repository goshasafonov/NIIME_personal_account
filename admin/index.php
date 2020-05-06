<?php

include './../config.php';

include './../auth.php';

$page = "";
$titlePage = $titlePage . " | Администрирование";

//header
$pageH = file_get_contents($pageHeader);
$page = $pageH;

//menu
$pageM = file_get_contents($pageMenu);
$page = $page . $pageM;

//content
$pageC = file_get_contents("./page.html");
$page = $page . $pageC;

//fouter
$contentJsScript = '<script src="' . $host . '/admin/content.js" type="text/javascript"></script>';
$pageF = file_get_contents($pageFouter);

//Замена переменных в шаблоне
$page = $page . $pageF;
$page = str_replace("%\$titlePage%", $titlePage, $page);
$page = str_replace("%\$host%", $host, $page);
$page = str_replace("%\$userName%", $_SESSION["Name"], $page);
$page = str_replace("%\$userFamily%", $_SESSION["Family"], $page);
$page = str_replace("%\$contentJsScript%", $contentJsScript, $page);
$page = str_replace("%\$contentCss%", $contentCss, $page);


echo $page;
?>