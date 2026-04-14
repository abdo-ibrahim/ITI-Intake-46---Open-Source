<?php

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

$connection = new mysqli("localhost", "root", "", "iti");
if ($connection->connect_error) {
  die("Connection failed: " . $connection->connect_error);
}
$sql = "SELECT name, email, department, gender, country, address, skills, profile_image FROM users WHERE id = $id";
$result = $connection->query($sql);

$user = $result->fetch_assoc();

$connection->close();
if (!$user) {
  header('Location: show-users.php');
  exit;
}

$name       = htmlspecialchars($user['name']);
$email      = htmlspecialchars($user['email']);
$department = htmlspecialchars($user['department']);
$country    = htmlspecialchars($user['country']);
$gender     = htmlspecialchars($user['gender']);
$address    = htmlspecialchars($user['address']);
$skills     = explode(',', $user['skills']);

$profileImage = $user['profile_image'] ? htmlspecialchars($user['profile_image']) : 'https://cdn-icons-png.flaticon.com/512/9203/9203764.png';
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>User Details</title>

  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

</head>

<body class="bg-gray-100 p-6">

  <div class="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

    <h1 class="text-3xl font-bold text-blue-600 mb-4">User Details</h1>
    <p class="text-lg font-medium mb-3">Name: <?php echo $name; ?></p>

    <img src="<?php echo $profileImage; ?>" class="w-24 h-24 rounded-full mb-4 mx-auto object-cover" alt="Profile Image">

    <h2 class="text-xl font-semibold mb-2">Personal Information</h2>

    <div class="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded">
      <p><strong>Email:</strong> <?php echo $email; ?></p>
      <p><strong>Department:</strong> <?php echo $department; ?></p>
      <p><strong>Country:</strong> <?php echo $country; ?></p>
      <p><strong>Gender:</strong> <?php echo $gender; ?></p>
      <p><strong>Location:</strong> <?php echo $address; ?></p>
    </div>
    <h2 class="text-xl font-semibold mb-2">Skills</h2>
    <ul class="pl-5 mb-4 flex flex-wrap">
      <?php
      if (!empty($skills)) {
        foreach ($skills as $skill) {
          echo "<li class=\"bg-gray-200 px-4 py-2 rounded-xl m-1\">" . htmlspecialchars(trim($skill)) . "</li>";
        }
      } else {
        echo "<li class=\"bg-gray-200 px-4 py-2 rounded-xl m-1\">No skills selected</li>";
      }
      ?>
    </ul>

    <a href="show-users.php" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg inline-block">Back to Users</a>

  </div>

</body>

</html>