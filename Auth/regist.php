<?php
session_start();

$raw_datas = file_get_contents("php://input");
$datas = json_decode($raw_datas, true);

if ($datas !== null) {
    $firstName = $datas["firstName"];
    $lastName = $datas["lastName"];
    $userName = $datas["userName"];
    $email = $datas["email"];
    $password = md5($datas["password"]);
} else {
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $userName = $_POST["userName"];
    $email = $_POST["email"];
    $password = md5($_POST["password"]);
}

$errorCode = 1;
$errorMessage = "Sikertelen regisztráció";
$dataLine = [];

$conn = mysqli_connect("localhost", "root", "", "games");
if ($conn->connect_error) {
    $errorCode = 1;
    $errorMessage = "Sikertelen kapcsolódás az adatbázissal: " . $conn->connect_error;
} else {
    $stmt = $conn->prepare("SELECT userName, email FROM users WHERE userName = ? OR email = ?");
    $stmt->bind_param("ss", $userName, $email);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $errorCode = 1;
        $errorMessage = "A felhasználónév vagy az email cím már foglalt";
    } else {
        try {
            $stmt = $conn->prepare("INSERT INTO users(firstName, lastName, userName, email, password) VALUES (?,?,?,?,?)");
            $stmt->bind_param("sssss", $firstName, $lastName, $userName, $email, $password);
            if ($stmt->execute()) {
                $errorCode = 0;
                $errorMessage = "Sikeres regisztráció";
                $dataLine = [];
            } else {
                $errorCode = 1;
                $errorMessage = "Sikertelen regisztráció: " . $stmt->error;
                $dataLine = [];
            }
        } catch (Exception $exception) {
            $errorCode = 1;
            $errorMessage = "Sikertelen regisztráció: " . $stmt->error . "\n" . $exception->getMessage();
            $dataLine = [];
        }
    }
    $stmt->close();
    $conn->close();
}

// JSON válasz összeállítása
$message = ["errorCode" => $errorCode, "errorMessage" => $errorMessage, "dataLine" => $dataLine];
// JSON formátumba alakítás és kliensoldalra küldés
echo json_encode($message);
