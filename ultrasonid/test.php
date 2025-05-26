<?php 

$hostname = "localhost"; 
$username = "root"; 
$password = ""; 
$database = "test"; 

$conn = mysqli_connect($hostname, $username, $password, $database);

if (!$conn) 
{ 
	die("Connection failed: " . mysqli_connect_error()); 
} 

else {
echo "Database connection is OK<br>"; }

// If values send by Arduino/NodeMCU are not empty then insert into MySQL database table

if(!empty($_POST['sendval']) && !empty($_POST['sendval2']) )
{
	$distance = $_POST['sendval'];
	$state  = $_POST['sendval2'];


// Update your tablename here
	$sql = "INSERT INTO readings(reading_data, sensor_id) VALUES (".$distance.",".$state.")"; 

	if ($conn->query($sql) === TRUE) {
		echo "Values inserted in MySQL database table.";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}
}


// Close MySQL connection
$conn->close();

?>