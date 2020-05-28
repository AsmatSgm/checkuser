<?php include('process.php');?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <form id="register_form">

        <h1>Register</h1>
        <div id="error_msg"></div>

        <div>
            <input type="text" name="username" placeholder="Username" id="username">
            <span></span>
        </div>
       
        <div>
            <input type="text" name="email" placeholder="Email" id="email">
            <span></span>
        </div>
       
        <div>
            <input type="password" name="password" placeholder="Password" id="password">
        </div>
       
        <div>
            <button type="button" name="register" id="reg_btn">Register</button>
        </div>

    </form>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="script.js"></script>
</body>
</html>