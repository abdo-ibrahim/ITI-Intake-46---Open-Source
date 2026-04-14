<?php

session_start();

$connection = new mysqli("localhost", "root", "", "iti", 3306);
if ($connection->connect_error) {
	die("Connection failed: " . $connection->connect_error);
}

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';
$errors = [];

if (empty($email)) {
  $errors[] = 'Email required';
} elseif (!preg_match("/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/", $email)) {
  $errors[] = "Enter a valid email address";
}

if (empty($password)) {
	$errors[] = 'Password required';
}

if (!empty($errors)) {
  $errors_json = json_encode($errors);
	header("Location: login.php?errors=$errors_json");
	exit;
}

$sql = "SELECT * FROM users WHERE email = ? AND password = ?";
$stmt = $connection->prepare($sql);
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows === 1) {
	$user = $result->fetch_assoc();
	$_SESSION['user'] = [
		'id' => $user['id'],
		'name' => $user['name'],
		'email' => $user['email'],
	];

	$stmt->close();
	$connection->close();
	header('Location: show-users.php');
	exit;
}

$stmt->close();
$connection->close();
$errors[] = 'Invalid email or password';
$errors_json = json_encode($errors);
header("Location: login.php?errors=$errors_json");
exit;