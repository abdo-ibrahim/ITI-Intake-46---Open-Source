<?php
$department = $_POST['department'] ?? '';
$country    = $_POST['country'] ?? '';
$gender     = $_POST['gender' ] ?? '';
$address    = $_POST['address'] ?? '';
$username   = $_POST['username'] ?? '';
$skills     = $_POST['skills'] ?? [];
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

    <img src="https://cdn-icons-png.flaticon.com/512/9203/9203764.png" class="w-24 h-24 rounded-full mb-4 mx-auto" alt="Profile Image">

    <h2 class="text-xl font-semibold mb-2">Personal Information</h2>

    <div class="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded">
      <p><strong>Department:</strong> <?php echo $department; ?></p>
      <p><strong>Country:</strong> <?php echo $country; ?></p>
      <p><strong>Gender:</strong> <?php echo $gender; ?></p>
      <p><strong>Location:</strong> <?php echo $address; ?></p>
    </div>
    <h2 class="text-xl font-semibold mb-2">Skills</h2>
    <ul class="pl-5 mb-4 flex flex-wrap">
      <?php
        if (!empty($skills) ) {
          foreach ($skills as $skill) {
            echo "<li class=\"bg-gray-200 px-4 py-2 rounded-xl m-1\">$skill</li>";
          }
        } else {
          echo "<li class=\"bg-gray-200 px-4 py-2 rounded-xl m-1\">No skills selected</li>";
        }
      ?>
    </ul>

    <h2 class="text-xl font-semibold mb-2">Account Credentials</h2>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <p class="border border-gray-300 p-2 rounded">Username: <br><?php echo $username; ?></p>
      <br>
      <p class="border border-gray-300 p-2 rounded">Password: <br>********</p>
    </div>

    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
      Edit Profile
    </button>

  </div>

</body>
</html>