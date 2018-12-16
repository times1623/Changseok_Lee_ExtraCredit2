<?php
$host = "localhost";
$user = "root";
$password = "root"; // leave this blank for windows users
$db = "db_cooperinfo";

$conn = mysqli_connect($host, $user, $password, $db);
//mysqli_set_charset($conn. 'utf8');

if (!$conn) {
    echo "something broke... connection isn't working";
    exit;
}

//echo "connected!";

// go and get all data from the database
//$myQuery = "SELECT * FROM mainmodel";
//$result = mysqli_query($conn, $myQuery);
//$rows = array();

// fill the array with the result set and send it to the browser
// while($row = mysqli_fetch_assoc($result)) {
//     $rows[] = $row;
// }

// get one item from the database
if (isset($_GET["modelNo"])) {
    $car = $_GET["modelNo"];

    $myQuery = "SELECT * FROM mainmodel WHERE model = '$car'";

    $result = mysqli_query($conn, $myQuery);
    $rows = array();

    // fill the array with the result set and send it to the browser
    while($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
}
// encode the result and send it back
echo json_encode($rows);
?>