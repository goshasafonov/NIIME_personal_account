<?php

include './../config.php';

include './../header.php';
include './../menu.php';
$page = file_get_contents("./page.html");
$page = str_replace("%\$host%", $host, $page);
echo $page;
$contentJsScript = '<script src="' . $host . '/documents/content.js" type="text/javascript"></script>';
$contentCss = '<style src="' . $host . '/documents/content.css" type="text/css"></style>';
include './../fouter.php';
?>