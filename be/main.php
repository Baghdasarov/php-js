<?php
ini_set("display_errors",1);
include 'Config/config.php';
include 'Routes/route.php';
include 'Helpers/General.php';
include 'Model/logs.php';
include 'Controller/MainController.php';
include 'Services/RouteService.php';
include 'Services/DbService.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");

$request = (new RouteService())->requestHandle();
$method = $request['method'];
echo (new $request['controller']())->$method();
