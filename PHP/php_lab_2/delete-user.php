<?php
$id = $_GET['id'];


$data = file("students.txt");
$newData = [];
foreach ($data as $line) {
  $userData = explode("|", $line);
  if ($userData[0] != $id) {
    array_push($newData, $line);
}
}
file_put_contents("students.txt", implode("", $newData));

header("Location: show-users.php");
?>
