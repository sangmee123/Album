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
$phone = $_POST['phone'];

$findQuery = "SELECT id, phone FROM users WHERE id = ? and phone = ?";
$stmt = $mysqli->prepare($findQuery);
$stmt->bind_param("ss", $id, $phone); // '?'에 사용할 값을 바인딩
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 0) {
    // 해당 계정이 존재하지 않을 때
    $response = array('success' => false, 'message' => '일치하는 사용자 정보를 찾을 수 없습니다.');
    echo json_encode($response);
} else {
    // 해당 계정이 존재할 때 
    $row = $result->fetch_assoc();
    $id = $row['id'];

    $response = array('success' => true, 'id' => $id);
    echo json_encode($response);
}

// $stmt를 닫아야 합니다.
$stmt->close();
$mysqli->close();
?>
