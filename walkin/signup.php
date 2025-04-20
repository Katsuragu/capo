<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Connect to the database
$conn = new mysqli("localhost", "root", "", "walkindb");

// Check for connection errors
if ($conn->connect_error) {
    die(json_encode(["error" => "Failed to connect to the database: " . $conn->connect_error]));
}

// Get the JSON input data
$data = json_decode(file_get_contents("php://input"), true); // Decode as an associative array

// Validate input
if (!empty($data['email']) && !empty($data['password'])) {
    $email = $conn->real_escape_string($data['email']);
    $password = $data['password'];

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !str_ends_with($email, '@gmail.com')) {
        echo json_encode(["error" => "Email must be a valid @gmail.com address"]);
        exit;
    }

    // Validate password length and special character
    if (strlen($password) < 8) {
        echo json_encode(["error" => "Password must be at least 8 characters long"]);
        exit;
    }

    if (!preg_match('/[!@#$%^&*(),.?":{}|<>]/', $password)) {
        echo json_encode(["error" => "Password must include at least one special character"]);
        exit;
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Check if the email already exists
    $checkQuery = "SELECT id FROM users WHERE email = '$email'";
    $result = $conn->query($checkQuery);

    if ($result->num_rows > 0) {
        echo json_encode(["error" => "Email already exists"]);
        exit;
    }

    // Insert the user into the database with access level 1
    $query = "INSERT INTO users (email, password, access) VALUES ('$email', '$hashed_password', 1)";

    if ($conn->query($query)) {
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        echo json_encode(["error" => "Failed to register user: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Invalid input. Please provide both email and password."]);
}

// Close the database connection
$conn->close();
?>