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

$sql = "SELECT * FROM users WHERE id = $id";
$result = $connection->query($sql);
$user = $result ? $result->fetch_assoc() : null;
$connection->close();

if (!$user) {
  header('Location: show-users.php');
  exit;
}

$name = htmlspecialchars($user['name']);
$email = htmlspecialchars($user['email']);
$department = htmlspecialchars($user['department']);
$country = htmlspecialchars($user['country']);
$address = htmlspecialchars($user['address']);
$gender = $user['gender'];
$selectedSkills = array_map('trim', explode(',', $user['skills']));
$profileImage = $user['profile_image'];

$errors = [];
if (isset($_GET['errors'])) {
  $decodedErrors = json_decode($_GET['errors'], true);
  if (is_array($decodedErrors)) {
    $errors = $decodedErrors;
  }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Edit User</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-[#f3f3f3] py-10 px-4">

  <div class="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
    <h1 class="text-blue-500 p-4 font-bold text-3xl">Edit User</h1>
    <p>Update the information below.</p>

    <?php if (!empty($errors)): ?>
      <ul class="mt-4 mb-4 list-disc pl-5">
        <?php foreach ($errors as $error): ?>
          <li class="text-red-600"><?php echo htmlspecialchars($error); ?></li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>

    <form action="update-user.php?id=<?php echo $id; ?>" method="POST" enctype="multipart/form-data" class="bg-white p-6 rounded shadow-md mt-4">
      <label for="name">Full Name:</label>
      <input type="text" id="name" name="name" value="<?php echo $name; ?>" required class="border border-gray-300 rounded py-2 px-4"><br><br>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" value="<?php echo $email; ?>" required class="border border-gray-300 rounded py-2 px-4"><br><br>

      <label for="department">Department:</label>
      <input type="text" id="department" name="department" value="<?php echo $department; ?>" readonly required class="border border-gray-300 rounded py-2 px-4"><br><br>

      <label for="country">Country:</label>
      <select id="country" name="country" required class="border border-gray-300 rounded py-2 px-4">
        <option value="">Select a country</option>
        <option value="egypt" <?php echo $country === 'egypt' ? 'selected' : ''; ?>>Egypt</option>
        <option value="usa" <?php echo $country === 'usa' ? 'selected' : ''; ?>>USA</option>
        <option value="canada" <?php echo $country === 'canada' ? 'selected' : ''; ?>>Canada</option>
        <option value="uk" <?php echo $country === 'uk' ? 'selected' : ''; ?>>UK</option>
      </select><br><br>

      <label for="address">Residential Address:</label>
      <br>
      <textarea id="address" name="address" required rows="4" cols="50" class="border border-gray-300 rounded py-2 px-4 resize-none"><?php echo $address; ?></textarea><br><br>

      <label for="gender">Gender:</label>
      <br>
      <input type="radio" id="male" name="gender" value="male" <?php echo $gender === 'male' ? 'checked' : ''; ?> required>
      <label for="male">Male</label>
      <input type="radio" id="female" name="gender" value="female" <?php echo $gender === 'female' ? 'checked' : ''; ?> required>
      <label for="female">Female</label>
      <br><br>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" placeholder="Leave blank to keep current password" class="border border-gray-300 rounded py-2 px-4"><br><br>

      <label for="skills">Professional Skills:</label>
      <br><br>
      <div class="flex flex-wrap gap-2 bg-gray-50 p-4 rounded">
        <input type="checkbox" id="html" name="skills[]" value="HTML" <?php echo in_array('HTML', $selectedSkills) ? 'checked' : ''; ?> class="border border-gray-300 rounded py-2 px-4">
        <label for="html">HTML</label>

        <input type="checkbox" id="css" name="skills[]" value="CSS" <?php echo in_array('CSS', $selectedSkills) ? 'checked' : ''; ?> class="border border-gray-300 rounded py-2 px-4">
        <label for="css">CSS</label>

        <input type="checkbox" id="javascript" name="skills[]" value="JavaScript" <?php echo in_array('JavaScript', $selectedSkills) ? 'checked' : ''; ?> class="border border-gray-300 rounded py-2 px-4">
        <label for="javascript">JavaScript</label>

        <input type="checkbox" id="php" name="skills[]" value="PHP" <?php echo in_array('PHP', $selectedSkills) ? 'checked' : ''; ?> class="border border-gray-300 rounded py-2 px-4">
        <label for="php">PHP</label>

        <input type="checkbox" id="mysql" name="skills[]" value="MySQL" <?php echo in_array('MySQL', $selectedSkills) ? 'checked' : ''; ?> class="border border-gray-300 rounded py-2 px-4">
        <label for="mysql">MySQL</label>

        <input type="checkbox" id="python" name="skills[]" value="Python" <?php echo in_array('Python', $selectedSkills) ? 'checked' : ''; ?> class="border border-gray-300 rounded py-2 px-4">
        <label for="python">Python</label>
      </div>

      <br><br>

      <label for="profile-image">Profile Image:</label>
      <input type="file" id="profile-image" name="profile-image" class="border border-gray-300 rounded py-2 px-4"><br>
      <?php if (!empty($profileImage)): ?>
        <p class="text-sm text-gray-500 mt-2">Current image: <?php echo htmlspecialchars($profileImage); ?></p>
      <?php endif; ?>
      <br>

      <input type="submit" value="Update User" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer">
    </form>
  </div>

</body>

</html>