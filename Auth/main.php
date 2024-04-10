<?php
session_start();
$message = ["errorCode" => 1, "errorMessage" => "Hiba a kérésben", "dataLine" => []];
if(!isset($_SESSION['userName'])){
    $message = ["errorCode" => 2, "errorMessage" => "Nincs bejelentkezve felhasználó"];
    echo json_encode($message);
    session_destroy();
    die;
}
$message = ["errorCode" => 0, "errorMessage" => "Sikeres betöltés", "dataLine" => ["userName" => $_SESSION["userName"],"fullName"=>$_SESSION["fullName"], "game1" => $_SESSION["game1"], "game2" => $_SESSION["game2"], "game3" => $_SESSION["game3"]]];
echo json_encode($message);
?>