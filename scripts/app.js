$(document).ready(function () {
    $(function () {
        $("#contactsScroll").click(function () {
            $([document.documentElement, document.body]).animate(
                {
                    scrollTop: $("#contacts").offset().top,
                },
                1000
            );
        });
    });
    $(function () {
        $("#arrowToBenefits").click(function () {
            $([document.documentElement, document.body]).animate(
                {
                    scrollTop: $("#benefits").offset().top,
                },
                500
            );
        });
    });
    $(".whatTheySay__slider").slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        prevArrow:
            '<svg class="nextBtn position-absolute">  <use xlink:href="#arrowScroll" /> </svg>',
        nextArrow:
            '<svg class="prevBtn position-absolute">  <use xlink:href="#arrowScroll" /> </svg>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                },
            },
        ],
    });
});
