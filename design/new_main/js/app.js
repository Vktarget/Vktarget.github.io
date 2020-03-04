$(function () {
    $('.js-select').each(function () {
        var $select = $(this);
        function stateHandler(state) {
            var icon = $(state.element).data('icon');
            var color = $(state.element).data('icon-color');

            if (!state.id || !icon)
                return state.text;

            var $state = $(
                '<span class="select2-icon-container">' +
                '<svg ' + (color ? 'style="fill: ' + color + ';"' : '') + ' class="icon icon-' + icon + '"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-' + icon + '"></use></svg>' +
                state.text +
                '</span>'
            );
            return $state;
        }

        $select.select2({
            minimumResultsForSearch: Infinity,
            width: '100%',
            templateSelection: stateHandler,
            templateResult: stateHandler
        });

        return;
    });

    // Header
    (function () {
        var $header = $(".js-header");
        function headerFixed() {
            var top = $(document).scrollTop();
            if (top > 0)
                $header.addClass('is-scrolling');
            else if (top == 0)
                $header.removeClass('is-scrolling');
        }

        $(window).scroll(headerFixed);
        headerFixed();

        // Scrollspy init
        new Gumshoe('.js-header .js-scroll-to', {
            navClass: 'is-active',
            reflow: true,
            offset: function () {
                return $('.js-header')[0].getBoundingClientRect().height;
            }
        });

        var sectionsInOneFlat = function (mode, currentSection) {
            $('.js-header .js-scroll-to').each(function () {
                var $this = $(this);
                var $li = $this.closest('li');
                var $section = $($this.attr('href'));

                if ($section[0].offsetTop == currentSection.offsetTop)
                    $li[mode + 'Class']('is-active');

            })
        }

        document.addEventListener('gumshoeActivate', function (event) {
            sectionsInOneFlat('add', event.detail.content)
        }, false);

        document.addEventListener('gumshoeDeactivate', function (event) {
            sectionsInOneFlat('remove', event.detail.content)
        }, false);

        new SmoothScroll('.js-scroll-to', {
            updateURL: false,
            offset: function (anchor, toggle) {
                return 70
            },
        });

        $header.find('.js-scroll-to').click(function () {
            var $html = $('html');
            $html.removeClass('swipe-open');
            setTimeout(function () { $html.css('overflow', 'auto') }, 300)
        })
    })();

    $('.js-spinner').spinner();


    var carouselOptions = function () {
        return {
            dots: true,
            nav: false,
            slidesPerView: 1,
            spaceBetween: 110,
            loop: false,
            slidesPerColumn: 1,
            watchOverflow: true,
            pagination: {
                clickable: true
            }
        };
    };

    SwiperProxy($('.js-news-carousel'), $.extend(carouselOptions(), {
        slidesPerView: 2,
        breakpoints: {
            992: { freeMode: true, slidesPerView: 'auto', spaceBetween: 64, },
            480: { slidesPerColumn: 1, freeMode: false, slidesPerView: 1, autoHeight: true }
        }
    }));

    SwiperProxy($('.js-features-carousel'), $.extend(carouselOptions(), {
        slidesPerView: 3,
        slidesPerColumn: 3,
        spaceBetween: 64,
        breakpoints: {
            992: { freeMode: true, slidesPerView: 'auto', slidesPerColumn: 1, spaceBetween: 32 },
            480: { slidesPerColumn: 1, freeMode: false, slidesPerView: 1, autoHeight: true }
        }
    }));


    // Up button
    $('.js-up').click(function(e) {
        $("html, body").animate({ scrollTop: 0 }, "slow"); e.preventDefault();
    });

    // Mobile menu
    (function () {
        var $html = $('html'),
            openClass = 'swipe-open',
            $trigger = $('.js-swipe-trigger');
        $trigger.click(function (e) {
            e.preventDefault();
            if ($html.hasClass(openClass))
                setTimeout(function () { $html.css('overflow', 'auto') }, 300)
            else
                $html.css('overflow', 'hidden')
            $html.toggleClass(openClass);
        });

        $(document).click(function (e) {
            var $target = $(e.target);
            if (!$target.closest('.swipe').length && !$target.is($trigger) && !$target.closest($trigger).length) {
                $html.removeClass(openClass);
                setTimeout(function () { $html.css('overflow', 'auto') }, 300)
            }
        });
    })();
});