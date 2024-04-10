<?php
session_start();
$raw_datas = file_get_contents("php://input");
$datas = json_decode($raw_datas, true);

if ($datas !== null) {
    $game1 = $datas["game1"];
    $game2 = $datas["game2"];
    $game3 = $datas["game3"];
} else {
    $game1 = $_POST["game1"];
    $game2 = $_POST["game2"];
    $game3 = $_POST["game3"];
}
$server_name = "localhost";
$user_name = "root";
$user_password = "";
$db_name = "games";

$conn = new mysqli($server_name, $user_name, $user_password, $db_name);

if ($conn->connect_error) {
    die("Sikertelen kapcsolódás az adatbázissal" . $conn->connect_error);
}

$stmt = $conn->prepare("UPDATE users SET game1 = ?, game2 = ?, game3 = ? WHERE userName LIKE ?");
$stmt->bind_param("iiis", $game1, $game2, $game3, $_SESSION["userName"]);
$stmt->execute();
session_destroy();
echo json_encode("Sikeres kijelentkezés");
?>