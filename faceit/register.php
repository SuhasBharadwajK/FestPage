<?php
  $name = $_POST["name"];
  $email = $_POST["email"];
  $year = $_POST["year"];
  $college = $_POST["college"];
  $branch = $_POST["branch"];
  $rollnum = $_POST["rollnum"];
  $phonenum = $_POST["phonenum"];
  $events = $_POST["allevents"];
  $refcode = $_POST["refcode"];
  $eventCodes = json_decode($_POST["eventCodes"]);

  $eventArray = explode(",", $events);

  $servername = "localhost";
  $username = "root";
  $password = "reebokpuma";
  $dbname = "faceit_records";

  #echo json_encode($eventArray);
  $eventsToPush = "";
  echo json_encode($eventCodes);

  $cse = array("C Programming Challenge" => "csecpc",
              "Java Debugging Contest" => "csejdc",
              "LAN Gaming" => "cselag",
              "Web Design Contest" => "csewdc",
              "Technical Treasure Hunt" => "csetth",
              "Film Making on Green Computing" => "csefgc",
              "Project Exhibition" => "csepex",
              "Paper Presentation" => "cseppr",
            );

  $ece = array("Robotics Competition" => "ecerbc",
                "Project Expo" => "ecepex",
                "Circuit Debugging" => "ececdb",
                "JAM" =>"ecejam",
                "Poster Presentation" => "ecepop",
                "Quiz Competition" => "eceqcp",
                "Paper Presentation" => "eceppr",
              );

  $mec = array("Robotics Competition" => "mecrbc",
                "Model Presentation" => "mecmod",
                "Poster Presentation" => "mecpop",
                "Technical Quiz" => "mecteq",
                "Make in India Debate" => "mecmid",
                "Paper Presentation" => "mecppr",
              );

  $civ = array("Technical Quiz" => "civteq",
                "Cubo Casting" => "civccb",
                "Code Cracking" => "civccr",
                "CAD Modelling" => "civcad",
                "Hassle Free City" => "civhfc",
                "Survey Contest" => "civsrc",
                "Spot Modelling" => "civspm",
                "Paper Presentation" => "civppr",
              );
  $eee = array("Technical Quiz" => "eeeteq",
                "Power JAM" => "eeejam",
                "ELECTRA" => "eeeelc",
                "Project Expo" => "eeepex",
                "Poster Presentation" => "eeepop",
                "Paper Presentation" => "eeeppr");


  $branches = array("cse" => $cse, "ece" => $ece, "mec" => $mec, "civ" => $civ, "eee" => $eee);

  foreach ($branches as $abranch => $branchevs) {
    $branchconn = new mysqli($servername, $username, $password, $dbname);
    if ($branchconn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    # code...
    $eventsToPushBranch = "";
    foreach ($branchevs as $eventname => $eventcode) {
      $eventconn = new mysqli($servername, $username, $password, $dbname);
      if ($eventconn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
      }
      # code...
      if (in_array($eventcode, $eventCodes)) {
        # code...
        $eventsToPushBranch .= $eventname . ',';
        $eventsToPush .= $eventname . ',';

        $branchquery = "INSERT INTO {$abranch}(name, email, college, year, branch, rollnum, phonenum, refcode, events) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode', '$eventsToPushBranch')";
        if ($branchconn->query($branchquery) === TRUE) {
          # code...
          //echo "Successfully Registered";
        }
        else {
          echo "Error: " . $branchquery . "<br>" . $branchconn->error;
        }

        $eventquery = "INSERT INTO {$eventcode}(name, email, college, year, branch, rollnum, phonenum, refcode) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode')";
        if ($eventconn->query($eventquery) === TRUE) {
          # code...
          //echo "Successfully Registered";
        }
        else {
          echo "Error: " . $eventquery . "<br>" . $eventconn->error;
        }
      }
      $eventconn->close();
    }
    echo json_encode($branchquery);
    $branchconn->close();
    //echo json_encode($eventsToPush);
  }
  echo json_encode($eventsToPush);
  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  //echo "Connected successfully";
  $sqlquery = "INSERT INTO registrations(name, email, college, year, branch, rollnum, phonenum, refcode, events) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode', '$events')";
  if ($conn->query($sqlquery) === TRUE) {
    # code...
    //echo "Successfully Registered";
  }
  else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();
  // foreach ($branches as $abranch => $branchevs) {
  //   //$branchconn = new mysqli($servername, $username, $password, $dbname);
  //   # code...
  //   $eventsToPush = "";
  //   foreach ($branchevs as $eventname => $eventcode) {
  //     # code...
  //     // foreach ($eventArray as $anevent) {
  //     //   # code...
  //     //
  //     // }
  //     if (in_array($eventname, $eventArray)) {
  //       # code...
  //       $eventsToPush = $eventsToPush . $eventname . ',';
  //       $eventArray = array_merge(array_diff($eventArray, array($eventname)));
  //       // echo json_encode($abranch);
  //       // echo json_encode($eventname);
  //       // echo json_encode($eventcode);
  //       // echo json_encode($eventArray);
  //       // echo json_encode($eventsToPush);
  //
  //       //$eventquery = "INSERT INTO `{$eventcode}`(name, email, college, year, branch, rollnum, phonenum, refcode) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode')";
  //       // if ($eventconn->query($eventquery) === TRUE) {
  //       //   # code...
  //       //   echo "Registered for event: " . $eventname;
  //       // }
  //       // else {
  //       //   echo "Error: " . $eventquery . "<br>" . $eventconn->error;
  //       // }
  //     }
  //     // //array_merge($eventArray);
  //   }


    //$branchquery = "INSERT INTO '$abranch'(name, email, college, year, branch, rollnum, phonenum, refcode, events) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode', '$eventsToPush')";
    // if ($branchconn->query($branchquery) === TRUE) {
    //   # code...
    //   echo "Registered for events in: " . $abranch;
    // }
    // else {
    //   echo "Error: " . $branchquery . "<br>" . $branchconn->error;
    // }
    //$branchconn.close();
    //$branchquery = "INSERT INTO " . $abranch . "(name, email, college, year, branch, rollnum, phonenum, refcode, events) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode', '$eventsToPush')";
    // if ($branchconn->query($branchquery) === TRUE) {
    //   # code...
    //   #echo "Registered for events in: " . $abranch;
    // }
    // else {
    //   echo json_encode("Error: " . $branchquery . "<br>" . $branchconn->error);
    // }
    // $branchconn.close();
  /*
  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  //echo "Connected successfully";
  $sqlquery = "INSERT INTO registrations(name, email, college, year, branch, rollnum, phonenum, refcode, events) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode', '$events')";
  if ($conn->query($sqlquery) === TRUE) {
    # code...
    //echo "Successfully Registered";
  }
  else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();
  foreach ($branches as $abranch => $branchevs) {
    $branchconn = new mysqli($servername, $username, $password, $dbname);
    # code...
    $eventsToPush = "";
    foreach ($branchevs as $eventname => $eventcode) {
      $eventconn = new mysqli($servername, $username, $password, $dbname);
      # code...
      // foreach ($eventArray as $anevent) {
      //   # code...
      //
      // }
      if (in_array($eventname, $eventArray)) {
        # code...
        $eventsToPush = $eventsToPush . ',' . $eventname;
        $eventArray = array_merge(array_diff($eventArray, array($eventname)));
        $eventquery = "INSERT INTO $eventcode(name, email, college, year, branch, rollnum, phonenum, refcode) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode')";
        if ($eventconn->query($eventquery) === TRUE) {
          # code...
          echo "Registered for event: " . $eventname;
        }
        else {
          echo "Error: " . $eventquery . "<br>" . $eventconn->error;
        }
      }
      //array_merge($eventArray);
      $eventconn.close();
    }
    $branchquery = "INSERT INTO '$abranch'(name, email, college, year, branch, rollnum, phonenum, refcode, events) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode', '$eventsToPush')";
    if ($branchconn->query($branchquery) === TRUE) {
      # code...
      echo "Registered for events in: " . $abranch;
    }
    else {
      echo "Error: " . $branchquery . "<br>" . $branchconn->error;
    }
    $branchconn.close();
  }
  // $conn->close();*/
  //$eventconn.close();
?>
