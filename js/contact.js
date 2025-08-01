// contact.js - Gestion du formulaire de contact avec alternatives mailto/gmail/outlook/copie

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = (document.getElementById('name')?.value || '').trim();
        const email = (document.getElementById('email')?.value || '').trim();
        const subject = (document.getElementById('subject')?.value || '').trim();
        const message = (document.getElementById('message')?.value || '').trim();
        const lang = (typeof currentLang !== 'undefined') ? currentLang : (localStorage.getItem('cv_lang') || 'en');

        // Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let errorMsg = '';
        if (!name) errorMsg = lang === 'fr' ? 'Le nom est requis.' : 'Name is required.';
        else if (!emailPattern.test(email)) errorMsg = lang === 'fr' ? 'Adresse courriel invalide.' : 'Invalid email address.';
        else if (!subject) errorMsg = lang === 'fr' ? 'Le sujet est requis.' : 'Subject is required.';
        else if (!message) errorMsg = lang === 'fr' ? 'Le message est requis.' : 'Message is required.';

        if (errorMsg) {
            alert(errorMsg);
            return;
        }

        const mailSubject = encodeURIComponent(subject || (lang === 'fr' ? 'Contact via CV' : 'Contact via Resume'));
        const mailBody = encodeURIComponent(
            (lang === 'fr' ? 'Nom: ' : 'Name: ') + name + '\n' +
            (lang === 'fr' ? 'Courriel: ' : 'Email: ') + email + '\n\n' +
            message
        );
        showContactOptions(mailSubject, mailBody, lang);
    });
});

function showContactOptions(mailSubject, mailBody, lang) {
    // Supprime une modale existante si présente
    const oldModal = document.getElementById('contactOptionsModal');
    if (oldModal) oldModal.remove();

    // Texte localisé
    const txt = {
        fr: {
            title: 'Choisissez une méthode d\'envoi',
            mailto: 'Client mail local',
            gmail: 'Gmail',
            outlook: 'Outlook Web',
            copy: 'Copier le message',
            close: 'Fermer',
            copied: 'Message copié dans le presse-papier !'
        },
        en: {
            title: 'Choose a sending method',
            mailto: 'Local mail client',
            gmail: 'Gmail',
            outlook: 'Outlook Web',
            copy: 'Copy message',
            close: 'Close',
            copied: 'Message copied to clipboard!'
        }
    }[lang] || {};

    // Création de la modale
    const modal = document.createElement('div');
    modal.id = 'contactOptionsModal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    modal.innerHTML = `
      <div style="background:#fff;padding:2rem 1.5rem;border-radius:10px;max-width:400px;width:100%;box-shadow:0 2px 16px #0002;text-align:center;">
        <h4 style="margin-bottom:1.5rem;color:#222;font-weight:700;">${txt.title}</h4>
        <button id="mailtoBtn" style="margin:0.5rem 0;width:100%;" class="btn btn-primary">${txt.mailto}</button><br>
        <button id="gmailBtn" style="margin:0.5rem 0;width:100%;" class="btn btn-danger">${txt.gmail}</button><br>
        <button id="outlookBtn" style="margin:0.5rem 0;width:100%;" class="btn btn-info">${txt.outlook}</button><br>
        <div style="display:flex;gap:0.5rem;justify-content:center;align-items:center;margin:0.5rem 0;">
          <button id="copyEmailBtn" class="btn btn-secondary w-100" style="margin-bottom:0.25rem;">${lang === 'fr' ? 'Copier le courriel' : 'Copy email'}</button>
          <button id="copyMsgBtn" class="btn btn-secondary w-100" style="margin-bottom:0.25rem;">${lang === 'fr' ? 'Copier le message' : 'Copy message'}</button>
        </div>
        <button id="closeContactModal" style="margin-top:1rem;" class="btn btn-outline-dark">${txt.close}</button>
        <div id="copyMsgStatus" style="color:green;margin-top:0.5rem;"></div>
      </div>
    `;
    document.body.appendChild(modal);

    // Actions boutons
    document.getElementById('mailtoBtn').onclick = function() {
        window.location.href = `mailto:mdupuismtl@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    };
    document.getElementById('gmailBtn').onclick = function() {
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=mdupuismtl@gmail.com&su=${mailSubject}&body=${mailBody}`, '_blank');
    };
    document.getElementById('outlookBtn').onclick = function() {
        window.open(`https://outlook.live.com/mail/0/deeplink/compose?to=mdupuismtl@gmail.com&subject=${mailSubject}&body=${mailBody}`, '_blank');
    };
    document.getElementById('copyEmailBtn').onclick = function() {
        navigator.clipboard.writeText('mdupuismtl@gmail.com').then(function() {
            document.getElementById('copyMsgStatus').textContent = lang === 'fr' ? 'Courriel copié !' : 'Email copied!';
        });
    };
    document.getElementById('copyMsgBtn').onclick = function() {
        navigator.clipboard.writeText(decodeURIComponent(mailBody)).then(function() {
            document.getElementById('copyMsgStatus').textContent = txt.copied;
        });
    };
    document.getElementById('closeContactModal').onclick = function() {
        modal.remove();
    };
}
