<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
$host = 'localhost';
$user = 'root'; 
$pw = 'system';
$dbName = 'album'; 

$mysqli = new mysqli($host, $user, $pw, $dbName);
$mysqli->set_charset("utf8mb4"); // 4바이트의 인코딩

if ($mysqli->connect_error) {
    die("데이터베이스 연결 실패: " . $mysqli->connect_error);
}

$id = $_POST['id'];
$select_username = "SELECT username FROM users WHERE id = '$id'";
$result = $mysqli->query($select_username);
$row = $result->fetch_assoc();
$username = $row['username'];

$response = array('success' => true, 'username' => $username);
echo json_encode($response);

mysqli_close($mysqli);
?>
