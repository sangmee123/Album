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

// 비밀번호를 해시화하여 저장
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$updateQuery = "UPDATE users SET password = ? WHERE id = ?";
$stmt = $mysqli->prepare($updateQuery);
$stmt->bind_param("ss", $hashedPassword, $id);

if ($stmt->execute()) {
    echo("
        <script>
            alert('비밀번호가 변경되었습니다. 로그인 해주세요.');
            location.replace('http://localhost:3000');
        </script>
    ");
} else {
    echo("
        <script>
            alert('서버가 연결되어 있지 않습니다.');
        </script>
    ");
}

$stmt->close();
$mysqli->close();
?>
