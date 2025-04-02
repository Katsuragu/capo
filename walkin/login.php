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
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!empty($data['email']) && !empty($data['password'])) {
    $email = $conn->real_escape_string($data['email']);
    $password = $data['password'];

    // Check if the email exists
    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify the password
        if (password_verify($password, $user['password'])) {
            echo json_encode([
                "message" => "Login successful",
                "access" => (int)$user['access'] // Ensure access is returned as an integer
            ]);
        } else {
            echo json_encode(["error" => "Invalid password"]);
        }
    } else {
        echo json_encode(["error" => "User not found"]);
    }
} else {
    echo json_encode(["error" => "Invalid input. Please provide both email and password."]);
}

// Close the database connection
$conn->close();
?>