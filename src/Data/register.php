<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
$host = 'localhost';
$user = 'root'; 
$pw = 'system';
$dbName = 'album'; 
// $host = 'localhost';
// $user = 'oeanb'; 
// $pw = 'letitgo12!';  
// $dbName = 'oeanb'; 

$mysqli = new mysqli($host, $user, $pw, $dbName);
$mysqli->set_charset("utf8mb4"); // 4바이트의 인코딩

if ($mysqli->connect_error) {
    die("데이터베이스 연결 실패: " . $mysqli->connect_error);
}

date_default_timezone_set('Asia/Seoul'); // 한국 서버

$id = $_POST['id'];
$password = $_POST['password'];
$username = $_POST['username'];    
$phone = $_POST['phone'];
$created = date("Y-m-d H:i:s"); // 현재 시간

// 이미 존재하는 아이디인지 확인
$checkIdDuplicateQuery = "SELECT id FROM users WHERE id = ?";
$stmtId = $mysqli->prepare($checkIdDuplicateQuery);
$stmtId->bind_param("s", $id); // '?'에 사용할 값을 바인딩
$stmtId->execute();
$stmtId->store_result();

// 이미 존재하는 휴대폰 번호인지 확인
$checkPhoneDuplicateQuery = "SELECT phone FROM users WHERE phone = ?";
$stmtPhone = $mysqli->prepare($checkPhoneDuplicateQuery);
$stmtPhone->bind_param("s", $phone); // '?'에 사용할 값을 바인딩
$stmtPhone->execute();
$stmtPhone->store_result();

// 생성하려는 아이디와 휴대폰 번호가 중복이 없을 경우
if($stmtId->num_rows == 0 && $stmtPhone->num_rows == 0) { 
    // 비밀번호를 해시화하여 저장
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $insertQuery = "INSERT INTO users(id, password, username, phone, created) 
    VALUES (?, ?, ?, ?, ?)";

    $stmt = $mysqli->prepare($insertQuery);
    $stmt->bind_param("sssss", $id, $hashedPassword, $username, $phone, $created);

    if ($stmt->execute()) {
        echo("
            <script>
                alert('회원가입 성공! 나만의 앨범집을 만들어 보세요.');
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
} else {
    if($stmtId->num_rows != 0) { 
        // 아이디 중복
        echo("
            <script>
                alert('이미 사용 중인 아이디입니다.');
                location.replace('http://localhost:3000/membership');
            </script>
        ");
    } else if($stmtPhone->num_rows != 0) { 
        // 휴대폰 번호 중복 (= 기존 아이디 존재)
        echo("
            <script>
                alert('이미 가입된 계정이 있습니다.');
                location.replace('http://localhost:3000/membership');
            </script>
        ");       
    }
}

$stmt->close();
mysqli_close($mysqli); 
?>
