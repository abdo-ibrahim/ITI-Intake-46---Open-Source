<?php

session_start();

if (!isset($_SESSION['user'])) {
  header('Location: login.php');
  exit;
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

$connection = new mysqli("localhost", "root", "", "iti", 3306);
if ($connection->connect_error) {
  die("Connection failed: " . $connection->connect_error);
}

$currentResult = $connection->query("SELECT password, profile_image FROM users WHERE id = $id");
$currentUser = $currentResult ? $currentResult->fetch_assoc() : null;

if (!$currentUser) {
  $connection->close();
  header('Location: show-users.php');
  exit;
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$department = isset($_POST['department']) ? trim($_POST['department']) : '';
$gender = isset($_POST['gender']) ? trim($_POST['gender']) : '';
$country = isset($_POST['country']) ? trim($_POST['country']) : '';
$address = isset($_POST['address']) ? trim($_POST['address']) : '';
$skills = isset($_POST['skills']) ? $_POST['skills'] : [];
$password = isset($_POST['password']) ? trim($_POST['password']) : '';

$errors = [];

$profileImagePath = $currentUser['profile_image'];
if (isset($_FILES['profile-image']) && $_FILES['profile-image']['error'] === UPLOAD_ERR_OK) {
  $profile_image = $_FILES['profile-image'];
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
    $errors[] = 'Only JPG, JPEG, PNG, GIF, or WEBP images are allowed.';
  } else {
    if (!is_dir('uploads')) {
      mkdir('uploads', 0777, true);
    }
    $profileImagePath = "uploads/$new_filename";
    move_uploaded_file($profile_image_tmp_name, $profileImagePath);
  }
}

if (empty(trim($name))) {
  $errors[] = 'Name required';
} elseif (strlen($name) < 3) {
  $errors[] = 'Name must be more than 3 char';
}

if (empty(trim($email))) {
  $errors[] = 'Email required';
} elseif (!preg_match("/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/", $email)) {
  $errors[] = 'Enter a valid email address';
}

if ($password !== '') {
  if (strlen($password) < 8) {
    $errors[] = 'Password must be more than 8 char';
  } elseif (!preg_match("/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/", $password)) {
    $errors[] = 'Password must contain letters and numbers';
  }
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
  $connection->close();
  header("Location: edit-user.php?id=$id&errors=$errors_json");
  exit;
}

$skills_str = implode(',', $skills);
$password_to_save = $currentUser['password'];
if ($password !== '') {
	$password_to_save = $password;
}

$stmt = $connection->prepare("UPDATE users SET name = ?, email = ?, password = ?, department = ?, gender = ?, country = ?, address = ?, skills = ?, profile_image = ? WHERE id = ?");
$stmt->bind_param("sssssssssi", $name, $email, $password_to_save, $department, $gender, $country, $address, $skills_str, $profileImagePath, $id);
$stmt->execute();
$stmt->close();
$connection->close();

header('Location: show-users.php');
exit;