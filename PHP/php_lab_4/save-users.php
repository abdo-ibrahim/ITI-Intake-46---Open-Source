<?php

// Database connection
$connection = new mysqli("localhost", "root", "", "iti", 3306);
if ($connection->connect_error) {
  die("Connection failed: " . $connection->connect_error);
}

$name       = $_POST['name'];
$email      = $_POST['email'];
$password   = $_POST['password'];
$department = $_POST['department'];
$gender     = $_POST['gender'];
$country    = $_POST['country'];
$address    = $_POST['address'];
$skills     = $_POST['skills'];

$errors = [];

$profile_image = $_FILES['profile-image'];
$destination = '';
if (isset($profile_image)) {
  $profile_image_name = basename($profile_image['name']);
  $profile_image_tmp_name = $profile_image['tmp_name'];
  $ext = strtolower(pathinfo($profile_image_name, PATHINFO_EXTENSION));
  $base = pathinfo($profile_image_name, PATHINFO_FILENAME);
  $datetime = date('Ymd_His');
  $new_filename = $base . '_' . $datetime . '.' . $ext;
  $allowed_exts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  $allowed_mimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  $file_mime = mime_content_type($profile_image_tmp_name);
  if (!in_array($ext, $allowed_exts) || !in_array($file_mime, $allowed_mimes)) {
    $errors[] = "Only JPG, JPEG, PNG, GIF, or WEBP images are allowed.";
  } else {
    if (!is_dir('uploads')) {
      mkdir('uploads', 0777, true);
    }
    $destination = "uploads/$new_filename";
    move_uploaded_file($profile_image_tmp_name, $destination);
  }
} else {
  $errors[] = "Profile image required";
}

if (empty(trim($name))) {
  $errors[] = 'Name required';
} elseif (strlen($name) < 3) {
  $errors[] = 'Name must be more than 3 char';
}

if (empty(trim($email))) {
  $errors[] = 'Email required';
} elseif (!preg_match("/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/", $email)) {
  $errors[] = "Enter a valid email address";
}

if (empty(trim($password))) {
  $errors[] = 'Password required';
} elseif (strlen($password) < 8) {
  $errors[] = 'Password must be more than 8 char';
} elseif (!preg_match("/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/", $password)) {
  $errors[] = 'Password must contain letters and numbers';
}

if (empty(trim($department))) {
  $errors[] = 'Department required';
}

if (empty(trim($gender))) {
  $errors[] = 'Gender required';
}

if (empty(trim($country))) {
  $errors[] = 'Country required';
}

if (empty(trim($address))) {
  $errors[] = 'Address required';
}

if (empty($skills)) {
  $errors[] = 'At least one skill required';
}

if (!empty($errors)) {
  $errors_json = json_encode($errors);
  header("Location: create-user.php?errors=$errors_json");
  exit;
}

$skills_str = implode(',', $skills);

$sql = "INSERT INTO users (name, email, password, department, gender, country, address, skills, profile_image) 
    VALUES ('$name', '$email', '$password', '$department', '$gender', '$country', '$address', '$skills_str', '$destination')";

$connection->query($sql);
$connection->close();

// Redirect to users list
header("Location: show-users.php");
exit;
