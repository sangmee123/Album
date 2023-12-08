<?php
/* 세션 실행 */
session_start();
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
$password = $_POST['password'];

$loginQuery = "SELECT id, password, username FROM users WHERE id = '$id'";
$result = $mysqli->query($loginQuery);

if ($result->num_rows === 0) {
    // 아이디가 존재하지 않을 때
    $response = array('success' => false, 'message' => '존재하지 않는 아이디입니다.');
    echo json_encode($response);
} else {
    // 비밀번호 확인하기
    $row = $result->fetch_assoc();
    $storedPassword = $row['password']; // DB에 저장된 비밀번호
    $username = $row['username'];

    if ($password === $storedPassword) {
        // 비밀번호가 일치할 때  
        $_SESSION["s_id"] = $row["id"];
        $_SESSION["s_username"] = $row["username"];
    
        $response = array('success' => true, 'message' => '로그인 성공');
        echo json_encode($response);
    } else {
        // 비밀번호가 일치하지 않을 때
        $response = array('success' => false, 'message' => '비밀번호가 일치하지 않습니다.');
        echo json_encode($response);
    }
}

mysqli_close($mysqli);
?>
