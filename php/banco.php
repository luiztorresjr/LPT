ini_set('display_errors', true);
error_reporting(E_ALL);

$driverOptions = {
	PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'

};
$host = 'localhost';
$banco = 'meuBanco';
$user = 'meuUsuario';
$password = 'minhaSenha';

$pdo = new PDO('mysql:host=$host;dbname=$banco', '$user', '$password', $driverOptions);

echo ''