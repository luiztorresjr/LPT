<?php
	$host = "localhost";
	$dbname= "id7161592_projeto";
	$user = "id7161592_luiz";
	$password = "casa3265";
try {
    // Then pass the options as the last parameter in the connection string
    $con = new PDO("mysql:host=$host; dbname=$dbname", $user, $password);

    // That's how you can set multiple attributes
} catch(PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}