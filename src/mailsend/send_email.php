<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные формы
    $name = htmlspecialchars(trim($_POST['UserName']));
    $email = htmlspecialchars(trim($_POST['Email']));
    $message = htmlspecialchars(trim($_POST['Message']));

    // Ваш email, на который придет письмо
    $to = "thezerumm@gmail.com"; 

    // Тема письма
    $subject = "Новое сообщение от " . $name;

    // Тело письма
    $body = "Имя: $name\nEmail: $email\nСообщение:\n$message";

    // Заголовки письма
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Отправляем письмо с помощью функции mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Сообщение отправлено!";
    } else {
        echo "Ошибка при отправке сообщения.";
    }
}
?>
