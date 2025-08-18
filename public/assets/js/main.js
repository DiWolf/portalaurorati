(function ($) {
    "use strict";
    /*----------------------------------------
            Preloader
   ----------------------------------------*/

    $(window).on('load', function () {
        $('#status').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
    });

 


    // Home One Banner Slider JS
    $('.banner-slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 15,
        nav: false,
        dots: true,
        smartSpeed: 1000,
        autoplay: false,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
    });
    // Home Two Banner Slider JS
    $('.banner-slider-two').owlCarousel({
        items: 1,
        loop: true,
        margin: 15,
        nav: true,
        dots: false,
        smartSpeed: 1000,
        autoplay: false,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        navText: [
            "<i class='fas fa-angle-left'></i>",
            "<i class='fas fa-angle-right'></i>"
        ]
    });
    // Home Three Banner Slider JS
    $('.home_three_slider_wrapper').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: false,
        dots: false,
        smartSpeed: 1000,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
    });
    // Home Two Banner Slider JS
    $('.service_slider_home_two').owlCarousel({
        loop: true,
        margin: 20,
        dots: false,
        nav: true,
        autoplay: false,
        responsiveClass: true,
        autoplaySpeed: 1000,
        navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    })
    // Team Slider
    $('.team-slider').owlCarousel({
        loop: true,
        margin: 20,
        dots: true,
        nav: false,
        autoplay: false,
        responsiveClass: true,
        autoplaySpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    })
    // Partner Slider
    $('.partner_slider_wrapper').owlCarousel({
        loop: true,
        margin: 20,
        dots: false,
        nav: false,
        autoplay: false,
        responsiveClass: true,
        autoplaySpeed: 1000,
        responsive: {
            0: {
                items: 2,
            },
            600: {
                items: 2,
            },
            1000: {
                items: 3,
            }
        }
    })
    // Testimonial Slider
    $('.client_review_two').owlCarousel({
        items: 1,
        loop: true,
        margin: 20,
        dots: true,
        nav: false,
        autoplay: false,
        responsiveClass: true,
        autoplaySpeed: 1000
    })
         // Testimonial Slider Three
        $('.test_three_slider').owlCarousel({
            loop: true,
            margin: 10,
            dots: true,
            nav: false,
            autoplay: false,
            responsiveClass: true,
            autoplaySpeed: 1000,
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 2,
                },
                1199: {
                    items: 3,
                }
            }
        })
         // Client Thrree Slider 
        $('.home_three_client_wrapper').owlCarousel({
            loop: true,
            margin: 10,
            dots: false,
            nav: false,
            autoplay: false,
            responsiveClass: true,
            autoplaySpeed: 1000,
            responsive: {
                0: {
                    items: 2,
                },
                600: {
                    items: 3,
                },
                1000: {
                    items: 5,
                }
            }
        })

    /* Logistics Slider for */
    $('#logistics-carousel-one').owlCarousel({
        loop: true,
        margin: 20,
        dots: false,
        autoplay: false,
        responsiveClass: true,
        autoplaySpeed: 1000,
        navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: true
            },
            1000: {
                items: 3,
                nav: true,
                loop: false,
                autoplay: false,
                autoplaySpeed: 1000
            }
        }
    })

    $('#logistics-carousel-two').owlCarousel({
        loop: true,
        margin: 20,
        dots: false,
        autoplay: false,
        responsiveClass: true,
        autoplaySpeed: 1000,
        navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: true
            },
            1000: {
                items: 3,
                nav: true,
                loop: false,
                autoplay: false,
                autoplaySpeed: 1000
            }
        }
    })

    $('#logistics-carousel-three').owlCarousel({
        loop: true,
        margin: 20,
        dots: false,
        autoplay: false,
        responsiveClass: true,
        autoplaySpeed: 1000,
        navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 2,
                nav: true
            },
            1000: {
                items: 3,
                nav: true,
                loop: false,
                autoplay: false,
                autoplaySpeed: 1000
            }
        }
    })

    /* Counter */
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 10000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
    /* advantages_slider */
    $('.advantages_slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    /* Testimonial Slider */
    $('.client_sliders_wrappers').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 1000,
        navText: ["<i class='fas fa-arrow-left fa-2x'></i>", "<i class='fas fa-arrow-right fa-2x'></i>"],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            }
        }
    })
    /* Client Slider */
    $('.client_logo_slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 1000,
        navText: ["<i class='fas fa-arrow-left fa-2x'></i>", "<i class='fas fa-arrow-right fa-2x'></i>"],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2
            },
            1000: {
                items: 5
            }
        }
    })
}(jQuery));

