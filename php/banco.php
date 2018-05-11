<?php
	$host = "";
	$dbname= "projeto";
	$user = "";
	$password = ".";
try {
    // Then pass the options as the last parameter in the connection string
    $con = new PDO("mysql:host=$host; dbname=$dbname", $user, $password);

    // That's how you can set multiple attributes
} catch(PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}