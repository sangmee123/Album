<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

// 프리플라이트 요청에 대한 응답 처리
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    header("Content-Type: text/plain");
    exit();
}

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

// 매개변수화된 쿼리 사용하여 SQL 인젝션 방지
$loginQuery = "SELECT id, password FROM users WHERE id = ?";
$stmt = $mysqli->prepare($loginQuery);
$stmt->bind_param("s", $id);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    // 아이디가 존재하지 않을 때
    echo("
        <script>
            alert('존재하지 않는 아이디입니다.');
            location.replace('http://localhost:3000');
        </script>
    ");
} else {
    // 비밀번호 확인하기
    $stmt->bind_result($userId, $hashedPassword);
    $stmt->fetch();

    if (password_verify($password, $hashedPassword)) {
        // 비밀번호가 일치할 때
        echo("
            <script>
                alert('로그인 성공');
                location.replace('http://localhost:3000/album');
            </script>
        ");
    } else {
        // 비밀번호가 일치하지 않을 때
        echo("
            <script>
                alert('비밀번호가 일치하지 않습니다.');
                location.replace('http://localhost:3000');
            </script>
        ");
    }
}

mysqli_close($mysqli);
?>
