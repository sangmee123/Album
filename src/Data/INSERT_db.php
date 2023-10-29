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

// 이미지 데이터 테이블 생성 쿼리
$createTableQuery = "CREATE TABLE IF NOT EXISTS image_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    urlLeft JSON NOT NULL,
    urlRight JSON NOT NULL,
    txt TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
)";

if ($mysqli->query($createTableQuery) === TRUE) {
    echo "테이블이 성공적으로 생성되었습니다.<br>";
} else {
    echo "테이블 생성 오류: " . $mysqli->error;
}

foreach($imageData as $item) {
    $title = $item['title'];
    $urlLeft = json_encode($item['urlLeft']);
    $urlRight = json_encode($item['urlRight']);
    $txt = json_encode($item['txt'], JSON_UNESCAPED_UNICODE);

    // 이미 데이터가 있는지 확인
    $checkDuplicateQuery = "SELECT * FROM image_data WHERE title = '$title'";
    $duplicateResult = $mysqli->query($checkDuplicateQuery);

    if ($duplicateResult->num_rows == 0) {
        $insertQuery = "INSERT INTO image_data (title, urlLeft, urlRight, txt) 
        VALUES ('$title', '$urlLeft', '$urlRight', '$txt')";

        if ($mysqli->query($insertQuery) === TRUE) {
            echo "데이터가 성공적으로 삽입되었습니다.<br>";
        } else {
            echo "데이터 삽입 오류: " . $mysqli->error;
        }
    }
}

$mysqli->close();
?>
