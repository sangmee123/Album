<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;

$host = 'localhost';
$user = 'root'; 
$pw = 'system';
$dbName = 'album'; 

$mysqli = new mysqli($host, $user, $pw, $dbName);
$mysqli->set_charset("utf8mb4");

if ($mysqli->connect_error) {
    die("데이터베이스 연결 실패: " . $mysqli->connect_error);
}

$id = $_POST['id'];
$password = $_POST['password'];

$loginQuery = "SELECT id, password, username FROM users WHERE id = ?";
$stmt = $mysqli->prepare($loginQuery);
$stmt->bind_param("s", $id);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    $response = array('success' => false, 'message' => '존재하지 않는 아이디입니다.');
    echo json_encode($response);
} else { 
    // 아이디가 존재할 때
    $row = $result->fetch_assoc();
    $storedPassword = $row['password']; // DB에 저장된 비밀번호
    $issuedAt = '';
    if (password_verify($password, $storedPassword)) {
        // 비밀번호가 일치할 때
        $secretKey = 'This is my_secret_key'; 
        $issuedAt = time();
        $effectiveTime = 10;
        $min = 60;
        $expirationTime = $issuedAt + $effectiveTime * $min; // 10분 유효한 토큰
        
        $payload = array(
            'userId' => $row['id'],
            'username' => $row['username'],
            'iat' => $issuedAt,
            'exp' => $expirationTime
        );
        
        $token = JWT::encode($payload, $secretKey, 'HS256'); // 토큰 생성
        $response = array(
            'success' => true,
            'message' => '로그인 성공', 
            'token' => $token, 
            'time' => $issuedAt
        );
        echo json_encode($response);
    } else {
        $response = array('success' => false, 'message' => '비밀번호가 일치하지 않습니다.');
        echo json_encode($response);
    }
}

$stmt->close();
$mysqli->close();
?>
