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

