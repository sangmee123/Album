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
$password = $_POST['password'];

$loginQuery = "SELECT id, password, username FROM users WHERE id = ?";
$stmt = $mysqli->prepare($loginQuery); // SQL 인젝션 방지를 위해 prepare 사용
$stmt->bind_param("s", $id);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    // 아이디가 존재하지 않을 때
    $response = array('success' => false, 'message' => '존재하지 않는 아이디입니다.');
    echo json_encode($response);
} else {
    // 비밀번호 확인하기
    $row = $result->fetch_assoc();
    $storedPassword = $row['password']; // DB에 저장된 비밀번호

    if (password_verify($password, $storedPassword)) {
        // 비밀번호가 일치할 때
        $response = array('success' => true, 'message' => '로그인 성공');
        echo json_encode($response);
    } else {
        // 비밀번호가 일치하지 않을 때
        $response = array('success' => false, 'message' => '비밀번호가 일치하지 않습니다.');
        echo json_encode($response);
    }
}

$stmt->close();
$mysqli->close();
?>
