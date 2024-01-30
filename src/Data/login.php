<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$host = 'localhost';
$user = 'root'; 
$pw = 'system';
$dbName = 'album'; 

$mysqli = new mysqli($host, $user, $pw, $dbName);
$mysqli->set_charset("utf8mb4"); // 4바이트의 인코딩

if ($mysqli->connect_error) {
    die("데이터베이스 연결 실패: " . $mysqli->connect_error);
}

$token = $_POST['token'];

try {
    // 토큰 디코딩
    $secretKey = 'This is my_secret_key'; 
    $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
    $userId = $decoded->userId; // 토큰의 payload 정보

    // 사용자 정보 가져오기
    $select_username = "SELECT username FROM users WHERE id = ?";
    $stmt = $mysqli->prepare($select_username);
    $stmt->bind_param("s", $userId);
    $stmt->execute();

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $username = $row['username'];

    $response = array('success' => true, 'username' => $username);
    echo json_encode($response);
} catch (Exception $e) {
    // 토큰이 유효하지 않은 경우
    $response = array('success' => false, 'message' => 'Invalid token');
    echo json_encode($response);
}

mysqli_close($mysqli);
?>
