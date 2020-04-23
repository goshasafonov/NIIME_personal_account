<?php
include('config.php');

ini_set('session.use_cookies', 1);
session_start();
session_unset();
session_destroy();
header("Location: $host");
?>
