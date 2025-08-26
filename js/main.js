// Restore language from localStorage if available
if (localStorage.getItem('cv_lang')) {
    currentLang = localStorage.getItem('cv_lang');
} else {
    currentLang = 'en'; // Default to English if no language is set
    localStorage.setItem('cv_lang', currentLang);
}

// Immediately set the initial typed-text content based on language, before Typed.js runs
// This ensures the dactylo typed text is correct on first load
const typedTextElement = document.querySelector('.typed-text');
if (typedTextElement) {
    const initText = currentLang === 'fr' ? typedTextElement.getAttribute('data-fr') : typedTextElement.getAttribute('data-en');
    typedTextElement.textContent = initText;
}

document.addEventListener('DOMContentLoaded', function() {
    // Use restored language, not always English
    window.scrollTo(0, 0);
    const elements = document.querySelectorAll('[data-en][data-fr]');
    elements.forEach(element => {
        const text = currentLang === 'fr' ? element.getAttribute('data-fr') : element.getAttribute('data-en');
        if (text && text.trim() !== '') {
            element.textContent = text;
        }
    });
    // Set the toggle button text correctly based on restored language
    const langText = document.getElementById('langText');
    if (langText) {
    langText.textContent = currentLang === 'en' ? 'Français' : 'English';
    }
    // Force isotope layout recalculation after content is loaded
    setTimeout(function() {
        if (window.jQuery && $('.experience-container').data('isotope')) {
            $('.experience-container').isotope('layout');
        }
    }, 200);
});

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'fr' : 'en';

    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en][data-fr]');

    elements.forEach(element => {
        const newText = currentLang === 'fr' ?
            element.getAttribute('data-fr') :
            element.getAttribute('data-en');

        if (newText) {
            element.textContent = newText;
        }
    });

    // Update placeholders for form inputs
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (nameInput) {
        nameInput.placeholder = currentLang === 'fr' ? 'Votre nom' : 'Your Name';
    }
    if (emailInput) {
        emailInput.placeholder = currentLang === 'fr' ? 'Votre courriel' : 'Your Email';
    }
    if (subjectInput) {
        subjectInput.placeholder = currentLang === 'fr' ? 'Sujet' : 'Subject';
    }
    if (messageInput) {
        messageInput.placeholder = currentLang === 'fr' ? 'Laissez votre message ici' : 'Leave a message here';
    }

    // Handle the typed text by showing it statically instead of animated
    const typedTextElement = document.querySelector('.typed-text');
    const typedOutput = document.querySelector('.typed-text-output');

    if (typedTextElement && typedOutput) {
        const frenchText = typedTextElement.getAttribute('data-fr');
        const englishText = typedTextElement.getAttribute('data-en');

        const newText = currentLang === 'fr' ? frenchText : englishText;

        // Stop any existing typed animation
        if (window.typedInstance) {
            window.typedInstance.destroy();
            window.typedInstance = null;
        }

        // Update the hidden text element that Typed.js reads from
        typedTextElement.textContent = newText;

        // Restart Typed.js with the new language text
        if (newText) {
            window.typedInstance = new Typed('.typed-text-output', {
                strings: newText.split(', '),
                typeSpeed: 100,
                backSpeed: 20,
                smartBackspace: false,
                loop: true
            });
        }
    }

    // Update the toggle button text
    const langText = document.getElementById('langText');
    if (langText) {
    langText.textContent = currentLang === 'en' ? 'Français' : 'English';
    }

    // Update page title
    document.title = currentLang === 'en' ?
        'Manon Dupuis - English Resume' :
        'Manon Dupuis - CV Français';

    // Update HTML lang attribute
    document.documentElement.lang = currentLang === 'fr' ? 'fr' : 'en';

    // Force isotope layout recalculation after language change
    setTimeout(function() {
        if (window.jQuery && $('.experience-container').data('isotope')) {
            $('.experience-container').isotope('layout');
        }
        if (window.jQuery && $('.education-container').data('isotope')) {
            $('.education-container').isotope('layout');
        }
        if (window.jQuery && $('.community-container').data('isotope')) {
            $('.community-container').isotope('layout');
        }
    }, 100);

    // At the end of toggleLanguage(), update localStorage
    localStorage.setItem('cv_lang', currentLang);
    // At the end of toggleLanguage(), update the formLang value
    document.getElementById('formLang').value = currentLang;
}

// Add click functionality to service items
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.clickable-service');
    const modal = $('#serviceInterestModal'); // Using jQuery for Bootstrap 4
    const yesBtn = document.getElementById('modalYesBtn');

    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            // Show the modal instead of directly scrolling
            modal.modal('show');
        });

        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Handle "Yes" button click in modal
    yesBtn.addEventListener('click', function() {
        // Close modal first
        modal.modal('hide');

        // Then scroll to contact form after modal is hidden
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 300); // Small delay to ensure modal is closed
    });
});

// Download Resume functionality
document.getElementById('downloadResume').addEventListener('click', function(e) {
    e.preventDefault();

    // Set the appropriate file path based on language
    let filePath;
    let fileName;

    if (currentLang === 'fr') {
        filePath = 'cv/Manon_Dupuis_CV_FR.pdf';
        fileName = 'Manon_Dupuis_CV_FR.pdf';
    } else {
        filePath = 'cv/Manon_Dupuis_Resume_EN.pdf';
        fileName = 'Manon_Dupuis_Resume_EN.pdf';
    }

    // Create a temporary anchor element to trigger download
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.download = fileName;
    downloadLink.style.display = 'none';

    // Add to DOM, click, and remove
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();

    // Initiate the wowjs
    new WOW().init();

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        window.typedInstance = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Smooth scrolling to section
    $(".btn-scroll").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 0
            }, 1500, 'easeInOutExpo');
        }
    });

    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

    // Community isotope and filter
    var communityIsotope;

    // Initialize Community isotope after DOM is ready and content is loaded
    $(document).ready(function() {
        // Initialize Community isotope with delay
        setTimeout(function() {
            communityIsotope = $('.community-container').isotope({
                itemSelector: '.community-item',
                layoutMode: 'fitRows',
                filter: '.current'
            });

            // Force layout recalculation
            communityIsotope.isotope('layout');
        }, 100);
        
        // Set the tabs in the experience section
        $(document).ready(function () {
            $('#previousTabs a:first').tab('show');
        });
        $(document).ready(function () {
            $('#preEquifaxTabs a:first').tab('show');
        });
    });

    // Also reinitialize on window load to handle any content that loads after DOM ready
    $(window).on('load', function() {
        setTimeout(function() {
            if (communityIsotope) {
                communityIsotope.isotope('layout');
            }
            if (experienceIsotope) {
                experienceIsotope.isotope('layout');
            }
        }, 200);
    });

    $('#community-filters li').on('click', function () {
        $("#community-filters li").removeClass('active');
        $(this).addClass('active');

        if (communityIsotope) {
            communityIsotope.isotope({filter: $(this).data('filter')});
        }
    });

    // Experience isotope and filter
    var experienceIsotope;

    // Initialize Experience isotope after DOM is ready and content is loaded
    $(document).ready(function() {
        // Initialize Experience isotope
        setTimeout(function() {
            experienceIsotope = $('.experience-container').isotope({
                itemSelector: '.experience-item',
                layoutMode: 'fitRows',
                filter: '.current'
            });

            // Force layout recalculation
            experienceIsotope.isotope('layout');
        }, 100);
    });

    $('#experience-filters li').on('click', function () {
        $("#experience-filters li").removeClass('active');
        $(this).addClass('active');

        if (experienceIsotope) {
            experienceIsotope.isotope({filter: $(this).data('filter')});
        }
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);