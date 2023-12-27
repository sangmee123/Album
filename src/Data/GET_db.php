<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
// $host = 'localhost';
// $user = 'oeanb'; 
// $pw = 'letitgo12!';  
// $dbName = 'oeanb'; 
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
if($id === 'oeanb') {
    $selectQuery = "select * from image_data;";  
} else {
    $selectQuery = "select * from image_data2;";  
}
$result = $mysqli->query($selectQuery);

if ($result) {
    $imageData = array();

    while ($row = $result->fetch_assoc()) {
        $imageData[] = $row;
    }

    // 결과를 JSON 형식으로 출력
    echo json_encode($imageData, JSON_UNESCAPED_UNICODE);
} else {
    echo "데이터를 불러오지 못했습니다.";
}

mysqli_close($mysqli); 
?>