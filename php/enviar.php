<?php
	require("banco.php");
	
	try{			
			$nome = $_POST["nome"];
			$email = $_POST["email"];
			$duvida =  $_POST["duvida"];
			$today = date("Y-m-d H:i:s");
			$con->beginTransaction();
			$stmt = $con->prepare("INSERT INTO ajuda (name, email, duvida, data) VALUES (:name, :email, :duvida, :data)");
			$stmt->bindParam(':name', $nome);
			$stmt->bindParam(':email', $email);
			$stmt->bindParam(':duvida', $duvida);
			$stmt->bindParam(':data', $today);
			$result=$stmt->execute();
			if($result){
				$con->commit();
				$var = "<script>javascript:history.back(-2)</script>";
				echo $var;
			}else{
				var_dump($stmt->errorInfo());
				echo "<p>Não foi cadastrado com sucesso</p>";
				header("Location: ../index.html");
				die();
			}
				
		}catch(PDOException $e) {
	        if(stripos($e->getMessage(), 'DATABASE IS LOCKED') !== false) {
	            // This should be specific to SQLite, sleep for 0.25 seconds
	            // and try again.  We do have to commit the open transaction first though
	            $con->commit();
	            usleep(250000);
        	} else {
            $con->rollBack();
            throw $e;
        	}
    	}
?>
