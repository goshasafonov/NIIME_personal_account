<?php

include './../config.php';

include './../header.php';
include './../menu.php';
$page = file_get_contents("./page.html");
$page = str_replace("%\$host%", $host, $page);
echo $page;
$contentJsScript = '<script src="' . $host . '/statusLaunch/content.js" type="text/javascript"></script>';
include './../fouter.php';
?>