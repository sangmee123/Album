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

    date_default_timezone_set('Asia/Seoul');

    $id = $_POST['id'];
    $password = $_POST['password'];
    $username = $_POST['username'];    
    $phone = $_POST['phone'];
    $created = date("Y-m-d H:i:s"); // 한국 서버의 현재 시간
    

    // 이미 데이터가 있는지 확인
    $checkDuplicateQuery = "SELECT id FROM users WHERE id = '$id'";
    $duplicateQuery = $mysqli->query($checkDuplicateQuery);

    if($duplicateQuery->num_rows == 0) {
        $insertQuery = "INSERT INTO users(id, password, username, phone, created) 
        VALUES ('$id', '$password', '$username', '$phone', '$created')";
    
        if ($mysqli->query($insertQuery) === TRUE) {
            echo("
                <script>
                    alert('회원가입 성공! 나만의 앨범집을 만들어 보세요.');
                    location.replace('http://localhost:3000');
                </script>
            ");
        } else {
            echo "데이터 삽입 오류: " . $mysqli->error;
        }
    } else {
        echo("
            <script>
                alert('이미 사용 중인 아이디입니다.');
                location.replace('http://localhost:3000/membership');
            </script>
        ");
    }

    mysqli_close($mysqli); 
?>
