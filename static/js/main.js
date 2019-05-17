"use strict";

jQuery(document).on('ready', function () {

    jQuery(window).on('scroll', function () {
        animateElement();
    });


    //Fix for Skills fill
    skillsFill();

    //Fix for Big Number Counter
    var k = 1;
    jQuery(".big-number-start").each(function () {
        jQuery(this).attr('id', 'count' + k);
        k++;
    });

    jQuery(window).on('scroll', function () {
        animateCounterUp();
    });

    //Portfolio Item Hover Fix
    jQuery(".grid-item a.item-link").on('hover', function () {
        jQuery(this).toggleClass("highlighted");
    });


    //Text slider
    jQuery(".text-slider").each(function () {
        var id = jQuery(this).attr('id');

        var auto_value = window[id + '_auto'];
        var hover_pause = window[id + '_hover'];
        var speed_value = window[id + '_speed'];

        auto_value = (auto_value === 'true') ? true : false;
        hover_pause = (hover_pause === 'true') ? true : false;

        jQuery('#' + id).slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 750,
            autoplay: auto_value,
            autoplaySpeed: speed_value,
            pauseOnHover: hover_pause,
            fade: true,
            draggable: true,
            adaptiveHeight: true
        });
    });

    //Image slider
    jQuery(".image-slider").each(function () {
        var id = jQuery(this).attr('id');

        var auto_value = window[id + '_auto'];
        var hover_pause = window[id + '_hover'];
        var speed_value = window[id + '_speed'];

        auto_value = (auto_value === 'true') ? true : false;
        hover_pause = (hover_pause === 'true') ? true : false;

        jQuery('#' + id).slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 750,
            autoplay: auto_value,
            autoplaySpeed: speed_value,
            pauseOnHover: hover_pause,
            fade: true,
            draggable: true,
            adaptiveHeight: true
        });
    });

//PrettyPhoto initial
    jQuery('a[data-rel]').each(function () {
        jQuery(this).attr('rel', jQuery(this).data('rel'));
    });

    jQuery("a[rel^='prettyPhoto']").prettyPhoto({
        slideshow: false, /* false OR interval time in ms */
        overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
        default_width: 1280,
        default_height: 720,
        deeplinking: false,
        social_tools: false,
        iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
    });

//Portfolio
    var grid = jQuery('.grid').imagesLoaded(function () {
        grid.isotope({
            itemSelector: '.grid-item',
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });
        jQuery('.filters-button-group').on('click', '.button', function () {
            var filterValue = jQuery(this).attr('data-filter');
            grid.isotope({filter: filterValue});
            grid.on('arrangeComplete', function () {
                jQuery(".grid-item:visible a[rel^='prettyPhoto']").prettyPhoto({
                    slideshow: false, /* false OR interval time in ms */
                    overlay_gallery: false, /* If set to true, a gallery will overlay the fullscreen image on mouse over */
                    default_width: 1280,
                    default_height: 720,
                    deeplinking: false,
                    social_tools: false,
                    iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
                });
            });
        });

        // change is-checked class on buttons
        jQuery('.button-group').each(function (i, buttonGroup) {
            var $buttonGroup = jQuery(buttonGroup);
            $buttonGroup.on('click', '.button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                jQuery(this).addClass('is-checked');
            });
        });
    });
   

    //Fix for No-Commnets
    jQuery("#comments").each(function () {
        if (jQuery.trim(jQuery(this).html()) === '')
        {
            jQuery(this).remove();
        }
    });

    //Fix for Menu
    jQuery(".header-holder").sticky({topSpacing: 0});

    //Slow Scroll
    jQuery('#header-main-menu ul li a, .scroll').on("click", function (e) {
        if (jQuery(this).attr('href') === '#')
        {
            e.preventDefault();
        } else {
            if (jQuery(window).width() < 1024) {
                if (!jQuery(e.target).is('.sub-arrow'))
                {
                    jQuery('html, body').animate({scrollTop: jQuery(this.hash).offset().top - 77}, 1500);
                    jQuery('.menu-holder').removeClass('show');
                    jQuery('#toggle').removeClass('on');
                    return false;
                }
            } else
            {
                jQuery('html, body').animate({scrollTop: jQuery(this.hash).offset().top - 77}, 1500);
                return false;
            }
        }
    });

    //Logo Click Fix
    jQuery('.header-logo').on("click", function (e) {
        if (jQuery(".page-template-onepage").length) {
            e.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, 1500);
        }
    });

    jQuery(window).scrollTop(1);
    jQuery(window).scrollTop(0);

    jQuery('.single-post .num-comments a, .single-portfolio .num-comments a').on('click', function (e) {
        e.preventDefault();
        jQuery('html, body').animate({scrollTop: jQuery(this.hash).offset().top}, 2000);
        return false;
    });

    //Add before and after "blockquote" custom class
    jQuery('blockquote.inline-blockquote').prev('p').addClass('wrap-blockquote');
    jQuery('blockquote.inline-blockquote').next('p').addClass('wrap-blockquote');
    jQuery('blockquote.inline-blockquote').css('display', 'table');

    //Placeholder show/hide
    jQuery('input, textarea').on("focus", function () {
        jQuery(this).data('placeholder', jQuery(this).attr('placeholder'));
        jQuery(this).attr('placeholder', '');
    });
    jQuery('input, textarea').on("blur", function () {
        jQuery(this).attr('placeholder', jQuery(this).data('placeholder'));
    });

    //Fit Video
    jQuery(".site-content").fitVids();

    //Fix for Default menu
    jQuery(".default-menu ul:first").addClass('sm sm-clean main-menu');

    //Set menu
    jQuery('.main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -8,
        markCurrentTree: true
    });

    var $mainMenu = jQuery('.main-menu').on('click', 'span.sub-arrow', function (e) {
        var obj = $mainMenu.data('smartmenus');
        if (obj.isCollapsible()) {
            var $item = jQuery(this).parent(),
                    $sub = $item.parent().dataSM('sub');
            $sub.dataSM('arrowClicked', true);
        }
    }).bind({
        'beforeshow.smapi': function (e, menu) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $menu = jQuery(menu);
                if (!$menu.dataSM('arrowClicked')) {
                    return false;
                }
                $menu.removeDataSM('arrowClicked');
            }
        }
    });

    //Show-Hide header sidebar
    jQuery('#toggle').on('click', multiClickFunctionStop);

    contactFormWidthFix();

});



jQuery(window).on('load', function () {

    animateCounterUp();

    // Animate the elemnt if is allready visible on load
    animateElement();

    //Fix for hash
    var hash = location.hash;
    if ((hash != '') && (jQuery(hash).length))
    {
        jQuery('html, body').animate({scrollTop: jQuery(hash).offset().top - 77}, 1);
    }

    jQuery('.doc-loader').fadeOut(600);


});


jQuery(window).on('resize', function () {
    contactFormWidthFix();
});

//------------------------------------------------------------------------
//Helper Methods -->
//------------------------------------------------------------------------


var animateElement = function (e) {

    jQuery(".animate").each(function (i) {

        var top_of_object = jQuery(this).offset().top;
        var bottom_of_window = jQuery(window).scrollTop() + jQuery(window).height();
        if ((bottom_of_window - 70) > top_of_object) {
            jQuery(this).addClass('show-it');
        }

    });

};

var skillsFill = function () {
    jQuery(".v-skill-fill").each(function (i) {
        jQuery(this).width(jQuery(this).data("fill")).height(jQuery(this).data("fill"));
    });
};

var contactFormWidthFix = function () {
    jQuery('.wpcf7 input[type=text], .wpcf7 input[type=email], .wpcf7 textarea').innerWidth(jQuery('.wpcf7-form').width());
};

var multiClickFunctionStop = function (e) {
    jQuery('#toggle').off("click");
    jQuery('#toggle').toggleClass("on");
    if (jQuery('#toggle').hasClass("on"))
    {
        jQuery('.menu-holder').addClass('show');
        jQuery('#toggle').on("click", multiClickFunctionStop);
    } else
    {
        jQuery('.menu-holder').removeClass('show');
        jQuery('#toggle').on("click", multiClickFunctionStop);
    }
};


jQuery(window).on('scroll resize', function () {
    var currentSection = null;
    jQuery('.section').each(function () {
        var element = jQuery(this).attr('id');
        if (jQuery('#' + element).is('*')) {
            if (jQuery(window).scrollTop() >= jQuery('#' + element).offset().top - 115)
            {
                currentSection = element;
            }
        }
    });

    jQuery('#header-main-menu ul li').removeClass('active').find('a[href*="#' + currentSection + '"]').parent().addClass('active');
});

function is_touch_device() {
    return !!('ontouchstart' in window);
}

var animateCounterUp = function (e) {
    jQuery(".big-number-content:not(.animate-done)").each(function () {
        var top_of_object = jQuery(this).offset().top;
        var bottom_of_window = jQuery(window).scrollTop() + jQuery(window).height();
        if ((bottom_of_window - 70) > top_of_object) {

            jQuery(this).addClass("animate-done");
            //Big Number Count Up
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ' ',
                decimal: '.'
            };

            var start = parseInt(jQuery(this).find(".big-number-start").html().replace(/\s+/g, ''));
            var stop = parseInt(jQuery(this).find(".big-number-stop").html().replace(/\s+/g, ''));
            var duration = parseInt(jQuery(this).find(".big-number-duration").html().replace(/\s+/g, ''));


            var demo = new CountUp(jQuery(this).find(".big-number-start").attr("id"), start, stop, 0, duration, options);
            if (!demo.error) {
                demo.start();
            } else {
                console.error(demo.error);
            }
        }
    });
};

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}

var SendMail = function () {

    var emailVal = jQuery('#contact-email').val();

    if (isValidEmailAddress(emailVal)) {
        var params = {
            'action': 'SendMessage',
            'name': jQuery('#name').val(),
            'email': jQuery('#contact-email').val(),
            'subject': jQuery('#subject').val(),
            'message': jQuery('#message').val()
        };
        jQuery.ajax({
            type: "POST",
            url: "php/sendMail.php",
            data: params,
            success: function (response) {
                if (response) {
                    var responseObj = jQuery.parseJSON(response);
                    if (responseObj.ResponseData)
                    {
                        alert(responseObj.ResponseData);
                    }
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //xhr.status : 404, 303, 501...
                var error = null;
                switch (xhr.status)
                {
                    case "301":
                        error = "Redirection Error!";
                        break;
                    case "307":
                        error = "Error, temporary server redirection!";
                        break;
                    case "400":
                        error = "Bad request!";
                        break;
                    case "404":
                        error = "Page not found!";
                        break;
                    case "500":
                        error = "Server is currently unavailable!";
                        break;
                    default:
                        error = "Unespected error, please try again later.";
                }
                if (error) {
                    alert(error);
                }
            }
        });
    } else
    {
        alert('Your email is not in valid format');
    }
};