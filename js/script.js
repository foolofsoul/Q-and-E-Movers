$(document).ready(function(){
    // /** 
    //  * This part does the "fixed navigation after scroll" functionality
    //  * We use the jQuery function scroll() to recalculate our variables as the 
    //  * page is scrolled/
    //  */
    // $(window).scroll(function(){
    //     var window_top = $(window).scrollTop() + 12; // the "12" should equal the margin-top value for nav.stick
    //     var div_top = $('#nav-anchor').offset().top;
    //         if (window_top > div_top) {
    //             $('nav').addClass('stick');
    //         } else {
    //             $('nav').removeClass('stick');
    //         }
    // });

    /**
     * This part causes smooth scrolling using scrollto.js
     * We target all a tags inside the nav, and apply the scrollto.js to it.
     */
    var $navLink = $("nav a"),
        $ctaLink = $(".cta a"),
        $menuIcon = $("#nav-icon4"),
        $header = $(".header"),
        $overlay = $(".overlay");

    $("nav a, .cta a").click(function(evn){
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, 500, this.hash); 
    });

    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and 
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = $("nav li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).outerHeight(); // get the height of the div in question
            if ((windowPos + 1 ) >= divPos && windowPos < (divPos + divHeight - 1)) {
                $("a[href='" + theID + "']").addClass("nav-active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav-active");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                $("nav li:last-child a").addClass("nav-active");
            }
        }
    });
    
    function openMenu(){
        $menuIcon.css("margin-left", "14.25rem");
        $(".header").addClass("active");
        $(".overlay").addClass("hidden-overlay");
        $(".logo-header").addClass("slide-logo");
    }

    function closeMenu(){
        $menuIcon.css("margin-left", ".75rem");
        $menuIcon.removeClass("open");
        $(".header").removeClass("active");
        $(".overlay").removeClass("hidden-overlay");
        $(".logo-header").removeClass("slide-logo");
    }

    if ($(window).width() < 1300) { // checks to see if window is smaller than 1300
        $(".mobile-header").addClass("active");
        $("nav a").click(function(){
            if( $menuIcon.hasClass("open") ){
                closeMenu();
            }
        });
        
        $(".overlay").click(function(){
            if( $menuIcon.hasClass("open") ){
                closeMenu();
            }
        });
    }

    $(window).resize(function() { // used resize method to watch if the screen size changes 
        if ($(window).width() < 1300) {
            $(".mobile-header").addClass("active");
            $("nav a").click(function(){
                if( $menuIcon.hasClass("open") ){
                    closeMenu();
                }
            });

            $(".overlay").click(function(){
                if( $menuIcon.hasClass("open") ){
                    closeMenu();
                }
            });           
        } else {
            $(".mobile-header").removeClass("active");
            closeMenu();
        }
    });

    $menuIcon.click(function() {
        if( $(this).hasClass("open") ){
            $(this).removeClass("open");
        } else {
            $(this).addClass("open");
        }

        if( $(this).hasClass("open") ){
            openMenu();
        } else {
            closeMenu();
        }
    });

    $(".overlay").height($(window).height());

    $(window).resize(function() {
        $(".overlay").height($(window).height());
    }).resize;
});