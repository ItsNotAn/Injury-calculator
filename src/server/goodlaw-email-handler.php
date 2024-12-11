<?php
/*
Plugin Name: Goodlaw Email Handler
Description: Handles form submissions from the Goodlaw Calculator and sends email notifications.
Version: 1.0
Author: Ngoc Truong
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Register REST API Endpoint
add_action('rest_api_init', function () {
    register_rest_route('goodlaw/v1', '/submit', array(
        'methods' => 'POST',
        'callback' => 'goodlaw_handle_form_submission',
        'permission_callback' => '__return_true',
    ));
});

// Handle Form Submission
function goodlaw_handle_form_submission($request) {
    $data = $request->get_json_params();

    $accidentTiming = sanitize_text_field($data['accidentTiming'] ?? '');
    $fault = sanitize_text_field($data['fault'] ?? '');
    $injuryType = sanitize_text_field($data['injuryType'] ?? '');
    $medicalVisits = sanitize_text_field($data['medicalVisits'] ?? '');
    $hasAttorney = sanitize_text_field($data['hasAttorney'] ?? '');
    $injurySeverity = sanitize_text_field($data['injurySeverity'] ?? '');
    $fullName = sanitize_text_field($data['fullName'] ?? '');
    $phoneNumber = sanitize_text_field($data['phoneNumber'] ?? '');
    $email = sanitize_email($data['email'] ?? '');
    $state = sanitize_text_field($data['state'] ?? '');
    $estimatedCompensation = sanitize_text_field($data['compensation'] ?? '');

    if (empty($fullName) || empty($email)) {
        return new WP_Error('invalid_data', 'Full name and email are required.', array('status' => 400));
    }

    $to = 'ntta239@gmail.com';
    $subject = "New Submission from Goodlaw Calculator";
    $message = "
    New submission from Goodlaw Calculator:

    Full Name: $fullName
    Phone Number: $phoneNumber
    Email: $email
    State: $state
    Accident Timing: $accidentTiming
    Fault: $fault
    Injury Type: $injuryType
    Medical Visits: $medicalVisits
    Has Attorney: $hasAttorney
    Injury Severity: $injurySeverity
    Estimated Compensation: $estimatedCompensation
    ";

    $headers = array('Content-Type: text/plain; charset=UTF-8');

    $sent = wp_mail($to, $subject, $message, $headers);

    if (!$sent) {
        return new WP_Error('email_failed', 'Failed to send email.', array('status' => 500));
    }

    return rest_ensure_response(['success' => true, 'message' => 'Email sent successfully!']);
}

