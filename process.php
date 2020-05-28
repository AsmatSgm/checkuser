<?php
    $db = mysqli_connect('localhost', 'root', '', 'checkuserdb');
    //ทำการเช็คว่ามี post ในส่วนของ username_checkหรือเปล่า จะเช็คจาก data ในไฟล์ script.js
    if (isset($_POST['username_check'])) {
        //สร้างตัวแปร username เก็บค่า Post ที่รับมาก่อน
        $username = $_POST['username'];
        //สร้างตัวแปร sql เพื่อใช้คำสั่งเลือกข้อมูลจากตาราง
        $sql = "SELECT * FROM users WHERE username = '$username'";
        //สร้างตัวแปร results ทำการ query ข้อมูล
        $results = mysqli_query($db, $sql);
        //ทำการเช็คว่า username นี้อยู่ในระบบหรือเปล่า
        if (mysqli_num_rows($results) > 0) {
            //ถ้ามีก็ข้อมูล จะแสดง taken มาจาก script.js
            echo 'taken';
        } else {
            echo 'not_taken';
        }
        exit();
    }

    if (isset($_POST['email_check'])) {
        $email = $_POST['email'];
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $results = mysqli_query($db, $sql);
        if (mysqli_num_rows($results) > 0) {
            echo 'taken';
        } else {
            echo 'not_taken';
        }
        exit();
    }

    //insert ข้มอมูล
    if (isset($_POST['save'])) {
        $username = $_POST['username'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $sql = "SELECT * FROM users WHERE username = '$username'";
        $results = mysqli_query($db, $sql);
        if (mysqli_num_rows($results) > 0) {
            echo "exits";
            exit();
        } else {
            $query = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '".md5($password)."')";
            $results = mysqli_query($db, $query);
            echo 'Saved';
            exit();
        }
    }
?>