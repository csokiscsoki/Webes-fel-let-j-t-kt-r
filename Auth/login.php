<?php
session_start();

$raw_datas = file_get_contents("php://input");
$datas = json_decode($raw_datas, true);

if ($datas !== null) {
    $userName = $datas["userName"];
    $password = md5($datas["password"]);
} else {
    $userName = $_POST["userName"];
    $password = md5($_POST["password"]);
}

$errorCode = 1;
$errorMessage = "Sikertelen belépés";
$dataLine = [];

//Kapcsolódás a szerverrel
$server_name = "localhost";
$user_name = "root";
$user_password = "";
$db_name = "games";

$conn = new mysqli($server_name, $user_name, $user_password, $db_name);

if ($conn->connect_error) {
    die("Sikertelen kapcsolódás az adatbázissal" . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT userName, firstName, lastName, game1, game2, game3 FROM users WHERE password = ? AND userName = ?");
$stmt->bind_param("ss", $password, $userName);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if ($row["userName"] === $userName) {
        $errorCode = 0;
        $errorMessage = "Sikeres bejelentkezés";
        $dataLine = [];
        $_SESSION["userName"] = $userName;
        $_SESSION["fullName"] = $row["firstName"] . " " . $row["lastName"];
        $_SESSION["game1"] = $row["game1"];
        $_SESSION["game2"] = $row["game2"];
        $_SESSION["game3"] = $row["game3"];

    } else {
        $errorCode = 1;
        $errorMessage = "Helytelen felhasználónév";
        $dataLine = [];
    }
} else {
    $errorCode = 1;
    $errorMessage = "Helytelen jelszó";
    $dataLine = [];
}

$message = ["errorCode" => $errorCode, "errorMessage" => $errorMessage, "dataLine" => $dataLine];
echo json_encode($message);
