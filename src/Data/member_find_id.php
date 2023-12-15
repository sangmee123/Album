<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
$mysqli = new mysqli('localhost', 'root', 'system', 'album');
$mysqli->set_charset("utf8mb4"); // 4바이트의 인코딩

if ($mysqli->connect_error) {
    die("데이터베이스 연결 실패: " . $mysqli->connect_error);
}

$username = $_POST['username'];
$phone = $_POST['phone'];

$findIdQuery = "SELECT id, phone FROM users WHERE username = ?";
$stmt = $mysqli->prepare($findIdQuery);
$stmt->bind_param("s", $username); // '?'에 사용할 값을 바인딩
$stmt->execute();
$result = $stmt->get_result();

$found = false; // 계정 찾기 Flag

if($result->num_rows == 0) {
    // 아이디가 존재하지 않을 때
    $response = array('success' => $found, 'message' => '회원가입 이력이 존재하지 않습니다.');
    echo json_encode($response);
} else {
    // 아아디가 존재할 때
    while ($row = $result->fetch_assoc()) {
        // 사용자 이름과 매칭되는 여러 개의 아이디 탐색
        $storedPhone = $row['phone'];
    
        if ($phone == $storedPhone) {
            // 입력 값과 같은 휴대폰 번호가 존재할 때
            $id = $row['id'];
            $found = true; // 계정 찾기 완료
            break; // 반복문 종료
        }
    }

    if ($found) {
        // 계정 찾기 완료 결과
        $response = array('success' => $found, 'id' => $id);
        echo json_encode($response);
    } else {
        // 아이디는 존재하지만 휴대폰 번호가 존재하지 않을 때
        $response = array('success' => $found, 'message' => '휴대폰 번호를 다시 입력해주세요.');
        echo json_encode($response);
    }
}

$stmt->close();
$mysqli->close();
?>
