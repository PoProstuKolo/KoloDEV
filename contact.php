<?php

$name = $_POST["name"]; // input name="name"
$from = $_POST["email"]; // input name="email"
$subject = $_POST["subject"]; // input name="subject"
$to = "kontakt@kolodev.pl"; // adres, na który ma zostać wysłany mail
$message = $_POST["message"]; // textarea name="message"

$txt = "Imię: " . $name . "\r\n" . "Email: " . $from . "\r\n" . "\r\n" . "Treść: " . $message;

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";
$headers .= "From: " . $from . "\r\n";
$headers .= "Reply-To: " . $from . "\r\n";

$mail_status = mail($to, $subject, $txt, $headers);

if ($mail_status) {
    header("Location: /index.html?mail_status=sent"); 
} else {
    header("Location: /index.html?mail_status=error"); 
}
?>