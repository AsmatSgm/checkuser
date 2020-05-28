// ่jquery จะต้องประกาศการเรียกใช้ก่อนเสมอ
$('document').ready(function() { //call back function

    // สร้างตัวแปร และกำหนดค่า
    var username_state = false;
    var email_state = false;

    //การเข้าถึง การ get id จาก index.php
    $('#username').on('blur', function() {
        //สร้างตัวแปรเก็บค่าที่ส่งเข้ามา
        var username = $('#username').val();
        // ถ้า username มีค่าว่าง
        if (username == '') {
            // ก็กำหนด username_state  เป็น false
            username_state = false;
            //จบการทำงาน หรือว่า return
            return;
        }//แต่ถ้ามีการพิมพ์ username เข้ามา ก็จะมีการเรียกใช้ ajax
        $.ajax({
            url: 'index.php', //พิมพ์ usersername จากไหน
            type: 'post', 
            data: {
                'username_check': 1, //กำหนด username_check เก็บค่า 1 ไว้
                'username': username //กำหนด username เก็บตัวแปร ของ username ไว้
            },//ถ้ามัน success ก็จะมีการตอบกลับ (response)
            success: function(response) {
                if (response == 'taken') { //ถ้าข้อมูลมีอยู่แล้วในระบบ
                    username_state = false; //กำหนด username_state เป็น false เพราะว่า มันมี user นี้ ในระบบแล้ว
                    $('#username').parent().removeClass();//จะทำการลบclass ก็คือ div ของ username
                    $('#username').parent().addClass('form_error');//เพิ่ม form_error ที่กำหนดในscript
                    $('#username').siblings("span").text("Sorry... Username already taken");//อ้างอิงที่ tab span
                } else if (response == "not_taken"){ //แต่ถ้าข้อมูลยังไม่มีในระบบ
                    username_state = true; //กำหนด username_state เป็น true เพราะว่า มันมี user นี้ ยังไม่มีในระบบ
                    $('#username').parent().removeClass();//จะทำการลบclass ก็คือ div ของ username
                    $('#username').parent().addClass('form_success');//เพิ่ม form_error ที่กำหนดในscript
                    $('#username').siblings("span").text("Username available");
                }
            }
        })
    });

    $('#email').on('blur', function() {
        var email = $('#email').val();
        if (email == '') {
            email_state = false;
            return;
        }
        $.ajax({
            url: 'index.php',
            type: 'post', 
            data: {
                'email_check': 1,
                'email': email
            },
            success: function(response) {
                if (response == 'taken') {
                    email_state = false;
                    $('#email').parent().removeClass();
                    $('#email').parent().addClass('form_error');
                    $('#email').siblings("span").text("Sorry... Email already taken");
                } else if (response == "not_taken"){
                    email_state = true; 
                    $('#email').parent().removeClass();
                    $('#email').parent().addClass('form_success');
                    $('#email').siblings("span").text("Email available");
                }
            }
        })
    });

    $('#reg_btn').on("click", function(e) { //เมื่อคลิ๊กปุ่ม submit ให้ขึ้น alert user save
        //สร้างตัวแปร ดึงค่าจาก username มา
        var username = $("#username").val();
        var email = $("#email").val();
        var password = $("#password").val();
        //ถ้าเกิด username หรือ email = false 
        if (username_state == false || email_state == false) {
            e.preventDefault();//ป้องกันฟรอมรีเฟรช
        // ก็จะให้ขึ้นข้อความ ถ้าไม่มีการกรอกข้อมูลมา
            $("#error_msg").text("Fix the errors in the form first");
        } else { //แต่ถ้ากรอกข้อมูลครบถ้วน
            $.ajax( {
                url: 'index.php',
                type: 'post',
                data: {
                    'save': 1,
                    'username': username,
                    'email': email,
                    'password': password

                },
                success: function(response) {
                    alert('User saved');
                    $('#username').val('');
                    $('#email').val('');
                    $('#password').val('');

                }
            })
        }
    });
});