<!DOCTYPE html>
<?php
// Initialize variables
$name = $email = $subject = $message = '';
$lang = 'EN';
$success = false;
$error = false;

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize inputs
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $subject = htmlspecialchars(trim($_POST['subject'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));
    $lang = strtoupper(trim($_POST['lang'] ?? 'EN'));

    // Validate required fields
    if ($name && filter_var($email, FILTER_VALIDATE_EMAIL) && $subject && $message) {
        $success = true;
    } else {
        $error = true;
    }
}

// Bilingual labels
$labels = [
    'FR' => [
        'received' => '✅ Message reçu!',
        'prepared' => "Votre message a été préparé. Choisissez votre méthode d'envoi préférée:",
        'gmail' => '📬 Gmail (Web)',
        'gmail_hint' => 'Ouvre Gmail dans votre navigateur',
        'outlook' => '📧 Outlook (Web)',
        'outlook_hint' => 'Ouvre Outlook dans votre navigateur',
        'manual' => '📋 Copie manuelle',
        'manual_hint' => 'Copiez et collez dans votre email',
        'copy_title' => '📋 Copiez ce message et envoyez-le à:',
        'subject_label' => 'Sujet:',
        'copy_msg' => '📋 Copier le message',
        'copy_email' => "📧 Copier l'adresse",
        'no_data' => '⚠️ Aucune donnée reçue ou invalide',
        'fill_again' => 'Veuillez retourner au formulaire et le remplir à nouveau.',
        'back' => '← Retour au CV',
        'contact_cv' => 'Contact CV: ',
        'copied_msg' => '📋 Message copié dans le presse-papier!',
        'copied_email' => '📧 Email copié: ',
    ],
    'EN' => [
        'received' => '✅ Message received!',
        'prepared' => 'Your message has been prepared. Choose your preferred sending method:',
        'gmail' => '📬 Gmail (Web)',
        'gmail_hint' => 'Opens Gmail in your browser',
        'outlook' => '📧 Outlook (Web)',
        'outlook_hint' => 'Opens Outlook in your browser',
        'manual' => '📋 Manual Copy',
        'manual_hint' => 'Copy and paste into your email',
        'copy_title' => '📋 Copy this message and send to:',
        'subject_label' => 'Subject:',
        'copy_msg' => '📋 Copy message',
        'copy_email' => '📧 Copy address',
        'no_data' => '⚠️ No data received or invalid',
        'fill_again' => 'Please return to the form and fill it out again.',
        'back' => '← Back to Resume',
        'contact_cv' => 'Contact Resume: ',
        'copied_msg' => '📋 Message copied to clipboard!',
        'copied_email' => '📧 Email copied: ',
    ]
];

// Default to EN if unsupported
if (!isset($labels[$lang])) {
    $lang = 'EN';
}
$l = $labels[$lang];

// Format message
$formatted_message = $lang === 'FR'
    ? "Nom: $name\nCourriel: $email\nSujet: $subject\n\nMessage:\n$message\n\n"
    : "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message\n\n";
?>
<html lang="<?php echo strtolower($lang); ?>">
<head>
    <meta charset="utf-8">
    <title>Contact - Manon Dupuis</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <main class="container mt-5">
        <section class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body text-center">
                        <?php if ($success): ?>
                            <div class="alert alert-success">
                                <h4><?php echo $l['received']; ?></h4>
                                <p><?php echo $l['prepared']; ?></p>
                            </div>
                            <div class="row mb-4">
                                <!-- Gmail -->
                                <div class="col-md-4 mb-3">
                                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=mdupuismtl@gmail.com&su=<?php echo urlencode($l['contact_cv'] . $subject); ?>&body=<?php echo urlencode($formatted_message); ?>" 
                                       target="_blank" class="btn btn-danger w-100">
                                        <?php echo $l['gmail']; ?>
                                    </a>
                                    <small class="text-muted"><?php echo $l['gmail_hint']; ?></small>
                                </div>
                                <!-- Outlook -->
                                <div class="col-md-4 mb-3">
                                    <a href="https://outlook.live.com/mail/0/deeplink/compose?to=mdupuismtl@gmail.com&subject=<?php echo urlencode($l['contact_cv'] . $subject); ?>&body=<?php echo urlencode($formatted_message); ?>" 
                                       target="_blank" class="btn btn-info w-100">
                                        <?php echo $l['outlook']; ?>
                                    </a>
                                    <small class="text-muted"><?php echo $l['outlook_hint']; ?></small>
                                </div>
                                <!-- Manual Copy -->
                                <div class="col-md-4 mb-3">
                                    <button onclick="showManualCopy()" class="btn btn-outline-secondary w-100">
                                        <?php echo $l['manual']; ?>
                                    </button>
                                    <small class="text-muted"><?php echo $l['manual_hint']; ?></small>
                                </div>
                            </div>
                            <div id="manual-copy" class="alert alert-light" style="display: none;">
                                <h6 class="text-start"><?php echo $l['copy_title']; ?> <strong>mdupuismtl@gmail.com</strong></h6>
                                <div class="text-start mb-2">
                                    <strong><?php echo $l['subject_label']; ?></strong> <?php echo $l['contact_cv'] . htmlspecialchars($subject); ?>
                                </div>
                                <textarea class="form-control" rows="10" readonly onclick="this.select()"><?php echo htmlspecialchars($formatted_message); ?></textarea>
                                <div class="mt-2">
                                    <button class="btn btn-sm btn-secondary" onclick="copyToClipboard()"><?php echo $l['copy_msg']; ?></button>
                                    <button class="btn btn-sm btn-outline-secondary" onclick="copyEmail()"><?php echo $l['copy_email']; ?></button>
                                </div>
                            </div>
                        <?php elseif ($error): ?>
                            <div class="alert alert-danger">
                                <h4><?php echo $l['no_data']; ?></h4>
                                <p><?php echo $l['fill_again']; ?></p>
                            </div>
                        <?php endif; ?>
                        <div class="mt-4">
                            <a href="index.html" class="btn btn-primary"><?php echo $l['back']; ?></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <script>
        const copiedMsg = <?php echo json_encode($l['copied_msg']); ?>;
        const copiedEmailMsg = <?php echo json_encode($l['copied_email']); ?>;

        function showManualCopy() {
            document.getElementById('manual-copy').style.display = 'block';
            document.querySelector('#manual-copy textarea').select();
        }

        function copyToClipboard() {
            const textArea = document.querySelector('#manual-copy textarea');
            textArea.select();
            navigator.clipboard?.writeText(textArea.value).then(() => {
                alert(copiedMsg);
            }).catch(() => {
                document.execCommand('copy');
                alert(copiedMsg);
            });
        }

        function copyEmail() {
            const email = 'mdupuismtl@gmail.com';
            navigator.clipboard?.writeText(email).then(() => {
                alert(copiedEmailMsg + email);
            }).catch(() => {
                const temp = document.createElement('input');
                temp.value = email;
                document.body.appendChild(temp);
                temp.select();
                document.execCommand('copy');
                document.body.removeChild(temp);
                alert(copiedEmailMsg + email);
            });
        }
    </script>
</body>
</html>