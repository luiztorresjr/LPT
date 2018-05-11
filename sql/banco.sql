CREATE TABLE `markers` (
	  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	  `name` VARCHAR( 60 ) NOT NULL ,
	  `address` VARCHAR( 80 ) NOT NULL ,
	  `lat` FLOAT( 10, 6 ) NOT NULL ,
	  `lng` FLOAT( 10, 6 ) NOT NULL ,
	  `type` VARCHAR( 30 ) NOT NULL
) ENGINE = MYISAM ;


INSERT INTO `markers` (`name`, `address`, `lat`, `lng`, `type`) VALUES ('Escola Estadual Manoel Ignacio da Silva', 'R. Luis Camilo de Camargo, 355 - Vila Sao Francisco, Hortolandia - SP, 13184-420', '-22.861643', '-47.217237', 'school');
