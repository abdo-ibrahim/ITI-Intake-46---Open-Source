<?php
session_start();

if (isset($_SESSION['user'])) {
	header('Location: show-users.php');
	exit;
}

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
	<title>Login</title>
	<script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="min-h-screen bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 flex items-center justify-center p-6">
	<div class="w-full max-w-md bg-white/90 backdrop-blur p-8 rounded-2xl shadow-2xl border border-slate-200">
		<h1 class="text-3xl font-extrabold text-slate-800 mb-2">Login</h1>
		<p class="text-slate-600 mb-6">Use your email and password to access the user list.</p>

		<?php if (!empty($errors)): ?>
			<div class="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
				<ul class="list-disc pl-5 space-y-1">
					<?php foreach ($errors as $error): ?>
						<li><?php echo htmlspecialchars($error); ?></li>
					<?php endforeach; ?>
				</ul>
			</div>
		<?php endif; ?>

		<form action="loginSubmit.php" method="POST" class="space-y-4">
			<div>
				<label for="email" class="block text-sm font-medium text-slate-700 mb-1">Email</label>
				<input type="email" id="email" name="email" required class="w-full border border-slate-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-slate-700 mb-1">Password</label>
				<input type="password" id="password" name="password" required class="w-full border border-slate-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
			</div>

			<button type="submit" class="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition">Login</button>
		</form>

		<p class="text-sm text-slate-600 mt-6 text-center">
			Need an account?
			<a href="create-user.php" class="text-blue-600 font-semibold hover:underline">Create a user</a>
		</p>
	</div>
</body>

</html>
