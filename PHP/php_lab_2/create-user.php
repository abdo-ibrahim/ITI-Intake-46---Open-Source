<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Create User</title>
  
  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#f3f3f3]">

  <div class="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
    <h1 class="text-blue-500 p-4 font-bold text-3xl">Create New User</h1>
    <p>Fill out the information below to create a new user account.</p>
    
    <form action="save-users.php" method="POST" class="bg-white p-6 rounded shadow-md mt-4">
      <label for="first-name">First Name:</label>
      <input type="text" id="first-name" name="first-name" required class="border border-gray-300 rounded py-2 px-4"><br><br>
  
      <label for="last-name">Last Name:</label>
      <input type="text" id="last-name" name="last-name" required class="border border-gray-300 rounded py-2 px-4"><br><br>
  
      <label for="department">Department:</label>
      <input type="text" id="department" name="department" value="Open Source" readonly required class="border border-gray-300 rounded py-2 px-4"><br><br>
  
      <label for="country">Country:</label>
      <select id="country" name="country" required class="border border-gray-300 rounded py-2 px-4">
        <option value="">Select a country</option>
        <option value="egypt">Egypt</option>
        <option value="usa">USA</option>
        <option value="canada">Canada</option>
        <option value="uk">UK</option>
      </select><br><br>
  
      <label for="address">Residential Address:</label>
      <br>
      <textarea id="address" name="address" required placeholder="Enter full street address, city, and postal code..." rows="4" cols="50" class="border border-gray-300 rounded py-2 px-4 resize-none"></textarea><br><br>
  
      <label for="gender">Gender:</label>
      <br>
      <input type="radio" id="male" name="gender" value="male" required>
      <label for="male">Male</label>
      <input type="radio" id="female" name="gender" value="female" required>
      <label for="female">Female</label>
      <br><br>

      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required class="border border-gray-300 rounded py-2 px-4">
      <br><br>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required class="border border-gray-300 rounded py-2 px-4"><br><br>
  
      <label for="skills">Professional Skills:</label>
      <br><br>
      <div class="flex flex-wrap gap-2 bg-gray-50 p-4 rounded">
        <input type="checkbox" id="html" name="skills[]" value="HTML" class="border border-gray-300 rounded py-2 px-4">
        <label for="html">HTML</label>

        <input type="checkbox" id="css" name="skills[]" value="CSS"  class="border border-gray-300 rounded py-2 px-4">
        <label for="css">CSS</label>

        <input type="checkbox" id="javascript" name="skills[]" value="JavaScript"  class="border border-gray-300 rounded py-2 px-4">
        <label for="javascript">JavaScript</label>

        <input type="checkbox" id="php" name="skills[]" value="PHP"  class="border border-gray-300 rounded py-2 px-4">
        <label for="php">PHP</label>

        <input type="checkbox" id="mysql" name="skills[]" value="MySQL"  class="border border-gray-300 rounded py-2 px-4">
        <label for="mysql">MySQL</label>

        <input type="checkbox" id="python" name="skills[]" value="Python" class="border border-gray-300 rounded py-2 px-4">
        <label for="python">Python</label>
      </div>

      <br><br>

      <label for="captcha">Verification:</label>
      <input type="text" id="captcha" name="captcha" required placeholder="Enter captcha" class="border border-gray-300 rounded py-2 px-4"><br><br>
  
      <label for="profile-image">Profile Image:</label>
      <input type="file" id="profile-image" name="profile-image" class="border border-gray-300 rounded py-2 px-4"><br><br>
  
      <input type="submit" value="Create User" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer">
    </form>
  </div>

</body>
</html>