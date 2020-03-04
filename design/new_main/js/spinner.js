(function($) {
    $.fn.spinner = function(opt) {
        this.each(function () {
            var $input = $(this),
                $wrap = $input.wrap('<div class="spinner">').parent(),
                $minusBtn = $('<button type="button" class="spinner__minus">').html('<svg class="icon icon-minus"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-minus"></use></svg>').prependTo($wrap),
                $plusBtn = $('<button type="button" class="spinner__plus">').html('<svg class="icon icon-plus"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-plus"></use></svg>').appendTo($wrap),
                step = parseFloat($input.data('step') || 1),
                minimal = parseFloat($input.data('min') || 0);

           function checkState() {
               if (parseFloat($input.val()) <= minimal)
                   $minusBtn.attr('disabled', true).prop('disabled', true);
               else
                   $minusBtn.attr('disabled', false).prop('disabled', false);
               $input.focus();
           }

           $plusBtn.on('click', function () {
               $input.val(parseFloat($input.val()) + step);
               checkState();
           });

            $minusBtn.on('click', function () {
                $input.val(parseFloat($input.val()) - step);
                checkState();
            });
        });
    }
})(jQuery);