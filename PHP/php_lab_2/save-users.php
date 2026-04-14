<?php
$data = file("students.txt");
$lastLine = end($data);

$lastData = explode("|", $lastLine);

print_r($lastData);

$id = (int)$lastData[0] + 1;

$new_user = $id . "|" . $_POST['username'] . "|" . $_POST['department'] . "|" . $_POST['country'] . "|" . $_POST['address']. "|" . $_POST['gender'] . "|" . $_POST['password'] . "|" . $_POST['profile-image'] . "|" . implode(",", $_POST['skills']);

$file = fopen("students.txt", "a");
fwrite($file, $new_user . "\n");
fclose($file);

// redirect
header("Location: show-users.php");
?>
