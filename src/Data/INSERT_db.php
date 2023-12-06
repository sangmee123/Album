<?php
$host = 'localhost';
$user = 'root';
$pw = 'system';
$dbName = 'album';

$mysqli = new mysqli($host, $user, $pw, $dbName);
$mysqli->set_charset("utf8mb4"); // 4바이트의 인코딩

if ($mysqli->connect_error) {
    die("데이터베이스 연결 실패: " . $mysqli->connect_error);
}

echo "데이터베이스 연결 성공<br>";

// 데이터 파일 읽기
$dataFile = file_get_contents('data.json');
$imageData = json_decode($dataFile, true);

if ($imageData === null) {
    die("data.json 파일을 읽어올 수 없거나 JSON 파싱 오류가 발생했습니다.<br>");
}

// 사용자 정보
$user_id = $imageData[0]['user_id'];
$username = $imageData[0]['username'];

// 앨범 데이터 삽입
foreach ($imageData[0]['albums'] as $album) {
    $title = $album['title'];
    $urlLeft = json_encode($album['urlLeft']);
    $urlRight = json_encode($album['urlRight']);
    $txt = json_encode($album['txt'], JSON_UNESCAPED_UNICODE);

    // 이미 데이터가 있는지 확인
    $checkDuplicateQuery = "SELECT * FROM image_data WHERE title = '$title' AND user_id = '$user_id'";
    $duplicateResult = $mysqli->query($checkDuplicateQuery);

    if ($duplicateResult->num_rows == 0) {
        $insertQuery = "INSERT INTO image_data (user_id, username, title, urlLeft, urlRight, txt) 
        VALUES ('$user_id', '$username', '$title', '$urlLeft', '$urlRight', '$txt')";

        if ($mysqli->query($insertQuery) === TRUE) {
            echo "데이터가 성공적으로 삽입되었습니다.<br>";
        } else {
            echo "데이터 삽입 오류: " . $mysqli->error;
        }
    }
}

$mysqli->close();
?>
