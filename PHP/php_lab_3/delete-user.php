<?php
$connection = new mysqli("localhost", "root", "", "iti");
if ($connection->connect_error) {
  die("Connection failed: " . $connection->connect_error);
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id > 0) {
  $sql = "DELETE FROM users WHERE id = $id";
  $connection->query($sql);
}

$connection->close();

header("Location: show-users.php");
