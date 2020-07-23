<?php

include './../config.php';

include './../auth.php';

$page = "";
$titlePage = $titlePage . " | Журнал посещений";

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

$contentJsScript = ''
//        <!-- Include the Quill library -->
        .'<script src="' . $host . '/Libs/quill-1.3.7/katex/katex.min.js"></script>'
        .'<script src="' . $host . '/Libs/quill-1.3.7/highlight/highlight.min.js"></script>'
        .'<script src="' . $host . '/Libs/quill-1.3.7/quill.min.js"></script>'
//Управляющий скрипт
        .'<script src="' . $host . '/support/content.js" type="text/javascript"></script>';

$contentCss = ''
//        <!--Include the Quill library-->
        .'<link rel="stylesheet" href="' . $host . '/Libs/quill-1.3.7/katex/katex.min.css" />'
        .'<link rel="stylesheet" href="' . $host . '/Libs/quill-1.3.7/highlight/monokai-sublime.min.css" />'
        .'<link rel="stylesheet" href="' . $host . '/Libs/quill-1.3.7/quill.snow.css" rel="stylesheet">'
        .'<link rel="stylesheet" href="' . $host . '/support/content.css" type="text/css">';

$pageF = file_get_contents($pageFouter);

//Замена переменных в шаблоне
$page = $page.$pageF;
$page = str_replace("%\$titlePage%", $titlePage, $page);
$page = str_replace("%\$host%", $host, $page);
$page = str_replace("%\$userName%", $_SESSION["Name"], $page);
$page = str_replace("%\$userFamily%", $_SESSION["Family"], $page);
$page = str_replace("%\$contentJsScript%", $contentJsScript, $page);
$page = str_replace("%\$contentCss%", $contentCss, $page);


echo $page;
?>