<?php
  //header('Access-Control-Allow-Origin: *');
  //phpinfo();
  echo "Received";
  $name1 = $_POST["name"];
  $email1 = $_POST["email"];
  $phonenum1 = $_POST["phonenum"];
  echo $name1;
  echo $email1;
  echo $phonenum1;
  $servername = "localhost";
  $username = "root";
  $password = "reebokpuma";
  $dbname = "faceit_records";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  echo "Connected successfully";
  $sqlquery = "INSERT INTO test_reg(name, email, phonenum) VALUES ('$name1', '$email1', '$phonenum1')";
  if ($conn->query($sqlquery) === TRUE) {
    # code...
    echo "Thank you for your submission, " . $name1;
  }
  else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();
 ?>
