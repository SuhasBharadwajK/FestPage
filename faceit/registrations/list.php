<?php
  $servername = "localhost";
  $username = "root";
  $password = "reebokpuma";
  $dbname = "faceit_records";

  $tableName = $_GET["tableName"];
  //echo json_encode($tableName);
  $query = "SELECT * FROM {$tableName}";
  $conn = new mysqli($servername, $username, $password, $dbname);
  //$result = mysqli_query($query,$conn);
  $result = $conn->query($query);
  //$resultArray = array();
  $resultTable = "";
  if (mysqli_num_fields($result) == 10) {
    # code...
    echo "<tr><th>ID</th><th>Name</th><th>Email</th><th>Year</th><th>Branch</th><th>Roll Number</th><th>College</th><th>Phone Number</th><th>Referral Code</th><th>List of Events</th></tr>";
    while($row = $result->fetch_assoc()) {
      echo "<tr><td>{$row['id']}</td><td>{$row['name']}</td><td>{$row['email']}</td><td>{$row['year']}</td><td>{$row['branch']}</td><td>{$row['rollnum']}</td><td>{$row['college']}</td><td>{$row['phonenum']}</td><td>{$row['refcode']}</td><td>{$row['events']}</td></tr>";
    }
  }
  if (mysqli_num_fields($result) == 9) {
    # code...
    echo "<tr><th>ID</th><th>Name</th><th>Email</th><th>Year</th><th>Branch</th><th>Roll Number</th><th>College</th><th>Phone Number</th><th>Referral Code</th></tr>";
    while($row = $result->fetch_assoc()) {
      echo "<tr><td>{$row['id']}</td><td>{$row['name']}</td><td>{$row['email']}</td><td>{$row['year']}</td><td>{$row['branch']}</td><td>{$row['rollnum']}</td><td>{$row['college']}</td><td>{$row['phonenum']}</td><td>{$row['refcode']}</td></tr>";
    }
  }
  $conn->close();
?>
