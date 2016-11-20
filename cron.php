<?php
/**
 * Created by PhpStorm.
 * User: debasis
 * Date: 20/11/16
 * Time: 11:14 AM
 */
set_time_limit(0);

$servername = "influxiq.com";
$username = "influxiq_url";
$password = "P@ss1234";

// Create connection
$dbname = "influxiq_test";
$conn = new mysqli($servername, $username, $password,$dbname );

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

$sql = "SELECT * FROM ripoff_urls limit 10";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        print_r($row['full_url']);
        echo "<br/>";


        callphantom($row['full_url']);

//$response = exec('ls ');


    }
} else {
    echo "0 results";
}




function callphantom($url){

    $response = exec('/home/influxiq/public_html/projects/phantom/ph/bin/phantomjs /home/influxiq/public_html/projects/phantom/ph/examples/test.js  '.$url);
    print_r($response);

    echo "<br/>";

}