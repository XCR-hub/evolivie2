<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['status' => false, 'error' => 'Invalid payload']);
    exit;
}

$endpoint = $input['endpoint'] ?? '';
$method = $input['method'] ?? 'GET';
$token = $input['token'] ?? '';
$body = $input['body'] ?? null;

$url = 'https://api.neoliane.fr/nws/public/v1' . $endpoint;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$headers = [
    'Authorization: Bearer ' . $token,
    'Accept: application/json',
];

if (!is_null($body)) {
    $jsonBody = json_encode($body);
    $headers[] = 'Content-Type: application/json';
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonBody);
}

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);
if ($response === false) {
    http_response_code(500);
    echo json_encode(['status' => false, 'error' => curl_error($ch), 'value' => null]);
} else {
    echo $response;
}

curl_close($ch);
?>
