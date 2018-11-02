<?php
	require("banco.php");
	try{			
			$nome = $_POST["nome"];
			$endereco = $_POST["endereco"];
			$latitude = floatval($_POST["lat"]);
			$longitude = floatval($_POST["lng"]);
			$tipo = $_POST["tipo"];
			$con->beginTransaction();
			$stmt = $con->prepare("INSERT INTO markers (name, address, lat, lng, type) VALUES (:name, :address, :lat, :lng, :type)");
			$stmt->bindParam(':name', $nome);
			$stmt->bindParam(':address', $endereco);
			$stmt->bindParam(':lat', $latitude);
			$stmt->bindParam(':lng', $longitude);
			$stmt->bindParam(':type', $tipo);
			$result=$stmt->execute();
			if($result){
				$con->commit();
				echo "<p>Cadastrado com sucesso</p>";
				echo '<p><a href="../index.html"></a>Home</p>';
			}else{
				var_dump($stmt->errorInfo());
				echo "<p>Não foi cadastrado com sucesso</p>";
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