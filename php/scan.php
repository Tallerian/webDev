<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // API endpoint and parameters
    $url = 'https://my-api.plantnet.org/v2/identify/all';
    $params = array(
        'include-related-images' => 'false',
        'no-reject' => 'false',
        'lang' => 'en',
        'api-key' => '2b100Lv7k9FUUNen3RRK6bDCe'
    );

    // Check if a file was uploaded
    if (isset($_FILES['images'])) {
        // File data
        $file_name = $_FILES['images']['name'];
        $file_tmp = $_FILES['images']['tmp_name'];
        $file_type = $_FILES['images']['type'];

        // Create cURL File object
        $file_data = new CURLFile($file_tmp, $file_type, $file_name);

        // Create cURL resource
        $ch = curl_init();

        // Set cURL options
        curl_setopt_array($ch, array(
            CURLOPT_URL => $url . '?' . http_build_query($params),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => array(
                'images' => $file_data
            ),
            CURLOPT_HTTPHEADER => array(
                'Accept: application/json',
                // If needed, you can set other headers here
            ),
        ));

        // Execute the request
        $response = curl_exec($ch);

        // Check for errors
        if ($response === false) {
            echo 'Error: ' . curl_error($ch);
        } else {
            echo $response;
        }

        // Close cURL resource
        curl_close($ch);
    } else {
        echo 'No file uploaded';
    }
} else {
    echo 'Invalid request method';
}

?>
