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
  $mobile = $_POST["mobile"];
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
              "Technical Quiz" => "cseteq",
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
    $deptentered = FALSE;
    $branchconn = new mysqli($servername, $username, $password, $dbname);
    if ($branchconn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $eventsToPushBranch = "";
    foreach ($branchevs as $eventname => $eventcode) {
      $eventconn = new mysqli($servername, $username, $password, $dbname);
      if ($eventconn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
      }
      if (in_array($eventcode, $eventCodes)) {
        $eventsToPushBranch .= $eventname . ',';
        $eventsToPush .= $eventname . ',';
        $deptentered = TRUE;
        $eventquery = "INSERT INTO {$eventcode}(name, email, college, year, branch, rollnum, phonenum, refcode) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode')";
        $eventquerybool = $eventconn->query($eventquery);
        if ($eventquerybool === TRUE) {
        }
        else {
          echo "Error: " . $eventquery . "<br>" . $eventconn->error;
        }
      }
      $eventconn->close();
    }
    if ($deptentered === TRUE) {
      # code...
      $branchquery = "INSERT INTO {$abranch}(name, email, college, year, branch, rollnum, phonenum, refcode, events, mobile) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode', '$eventsToPushBranch', '$mobile')";
      $branchquerybool = $branchconn->query($branchquery);
      if ($branchquerybool === TRUE) {
      }
      else {
        echo "Error: " . $branchquery . "<br>" . $branchconn->error;
      }
    }
    echo json_encode($branchquery);
    $branchconn->close();
  }
  echo json_encode($eventsToPush);
  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
  }
  $sqlquery = "INSERT INTO registrations(name, email, college, year, branch, rollnum, phonenum, refcode, events, mobile) VALUES ('$name', '$email', '$college', '$year', '$branch', '$rollnum', '$phonenum', '$refcode', '$events', '$mobile')";
  if ($conn->query($sqlquery) === TRUE) {
  }
  else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
  $conn->close();
?>
