<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Show Users</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>


<body class="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen py-10">
  <div class="max-w-4xl mx-auto bg-white/90 p-8 rounded-2xl shadow-2xl border border-blue-200">
    <?php
      $file = file("students.txt");
      if (empty($file)):?>
      <p class="text-center text-gray-500 text-lg font-medium">No users found.</p>
    <?php else: ?>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-4xl font-extrabold text-blue-700 mb-8 text-center tracking-tight">User List</h1>
        <a href="create-user.php" class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition">Add User</a>
      </div>
      <div class="overflow-x-auto">
      <table class="min-w-full border border-blue-200 rounded-lg overflow-hidden shadow-lg">
        <thead class="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <tr>
            <th class="py-3 px-4 font-semibold">Username</th>
            <th class="py-3 px-4 font-semibold">Department</th>
            <th class="py-3 px-4 font-semibold">Country</th>
            <th class="py-3 px-4 font-semibold">Address</th>
            <th class="py-3 px-4 font-semibold">Gender</th>
            <th class="py-3 px-4 font-semibold">Skills</th>
            <th class="py-3 px-4 font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-blue-100">
        <?php
        foreach ($file as $line) {
          $data = explode("|", $line);
          $username = $data[1];
          $department = $data[2];
          $country = $data[3];
          $address = $data[4];
          $gender = $data[5];
          $skills = $data[8];
          $skillList = explode(",", $skills);

          echo "<tr class='hover:bg-blue-50 transition'>";
          echo "<td class='py-2 px-4 text-blue-900 font-medium'>$username</td>";
          echo "<td class='py-2 px-4'>$department</td>";
          echo "<td class='py-2 px-4'>$country</td>";
          echo "<td class='py-2 px-4'>$address</td>";
          echo "<td class='py-2 px-4'>$gender</td>";
          echo "<td class='py-2 px-4'>";
          foreach ($skillList as $skill) {
            $trimmedSkill = trim($skill);
            if ($trimmedSkill !== "") {
              echo "<span class='inline-block bg-purple-100 text-purple-800 text-xs font-semibold mr-2 mb-1 px-3 py-1 rounded-full border border-purple-200'>" . $trimmedSkill . "</span>";
            }
          }
          echo "</td>";
          echo "<td class='py-2 px-4 space-x-2'>";
          echo "<a href=\"user-info.php?id={$data[0]}\" class=\"inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded shadow transition\">Show</a>";
          echo "<a href=\"delete-user.php?id={$data[0]}\" class=\"inline-block bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded shadow transition\" onclick=\"return confirm('Are you sure you want to delete this user?')\">Delete</a>";
          echo "</td>";
          echo "</tr>";
        }
        ?>
      </tbody>
    </table>
    </div>
    <?php endif; ?>
  </div>
</body>

</html>