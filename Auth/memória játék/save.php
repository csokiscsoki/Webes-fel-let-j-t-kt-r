<?php
session_start();
$raw_datas = file_get_contents("php://input");
$datas = json_decode($raw_datas, true);

$errorCode = 1;
$errorMessage = "Sikertelen regisztráció";
$dataLine = [];

if ($datas !== null) {
    $game2 = $datas["pts"];
} else {
    $game2 = $_POST["pts"];
}

$_SESSION["game2"]+=$game2;
$errorCode = 0;
$errorMessage = "Sikeres mentés";
$message=["errorCode"=>$errorCode, "errorMessage"=>$errorMessage, "dataLine"=>$dataLine];
echo json_encode($message);
?>