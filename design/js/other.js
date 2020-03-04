
var FilterForm = {
    submit: function () {
        var data = {};

        this.$form.find('select, input, textarea').each(function () {
            var $this = $(this);
            if ($this.val() != '' && $this.val() != '0' && $this.val())
                data[$this.attr('name')] = $this.val();
        })
        $.cookie(this.cookieName, data,  { expires: 365 })
        window.location = this.$form.attr('action') + (!$.isEmptyObject(data) ? '?' + $.param(data) : '')
        return false;
    },

    init: function (cookiePrefix) {
        $.cookie.json = true;
        this.cookieName = (cookiePrefix ? cookiePrefix + '_' : '') + 'filter';
        var filterData = $.cookie(this.cookieName);
        var self = this;
        this.$form = $('#filter-form');

        if (!this.$form.length)
            return;

        for (var i in filterData) {
            self.$form.find('[name=' + i + ']').val(filterData[i]).trigger('refresh')
        }
        if (!$.isEmptyObject(filterData) && !$.cookie(this.cookieName + '_show_form'))
            $('#filter-form-label').css('display', 'inline-block');
        else
            $('#filter-form-label').hide();
    },

    clear: function () {
        $.removeCookie(this.cookieName);
        $.removeCookie(this.cookieName, { path: '/campaign' });
        $.removeCookie(this.cookieName, { path: '/campaign/archive' });
        this.$form.trigger('reset');
        this.$form.find('select, input').val('').trigger('refresh')
        return false;
    },

    showForm: function (action) {
        if (action == 'show') {
            on('block_filter');
            $.cookie(this.cookieName + '_show_form', 1)
        } else {
            off('block_filter');
            $.cookie(this.cookieName + '_show_form', 0)
        }
        if (!$.isEmptyObject($.cookie(this.cookieName)) && !$.cookie(this.cookieName + '_show_form'))
            $('#filter-form-label').css('display', 'inline-block');
        else
            $('#filter-form-label').hide();
    }
};

function newChangeStatus(id, action) {
    var $campaign = $('#info-campaign-' + id);
    var $activeButton = $campaign.find('.active-button');
    if ($activeButton.hasClass('campaign-' + action + '-status'))
        return false;
    $.ajax({
        url: '/campaign/status?action=' + action,
        data: {id: id},
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.type && response.type == 'success') {
                switch (action) {
                    case 'active':
                        $campaign.find('.campaign-active-status').addClass('green').removeClass('link-white').addClass('active-button').text('активно');
                        $campaign.find('.campaign-pause-status').removeClass('gray').removeClass('active-button').html('на паузу');
                        break;
                    case 'pause':
                        $campaign.find('.campaign-active-status').removeClass('green').removeClass('active-button').html('запустить');
                        $campaign.find('.campaign-pause-status').addClass('gray').addClass('active-button').text('на паузе');
                        break;
                    case 'delete':
                        $('.arcticmodal-close').click();
                        $campaign.fadeOut('medium', function() {
                            $campaign.remove()
                            $.get(document.URL.split('#')[0], function (response) {
                                var $response = $(response);
                                $('#campaigns-workplace').html($response.find('#campaigns-workplace').html()).find('select').styler();
                            })
                        })

                        break;
                }
            } else {
                $('#status-modal-error').arcticmodal();
                $('.status-modal-error-message').html(response.message)
            }
        }
    })

    return false;
}


function resetCampaign(id) {
    var $campaign = $('#info-campaign-' + id);
    $.ajax({
        url: '/campaign/status?action=pause',
        data: {id: id},
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.type && response.type == 'success') {
                $campaign.fadeOut('medium', function() {
                    $campaign.remove()
                    $('#campaigns-count').text( parseInt($('#campaigns-count').text()) - 1 );
                });
            } else {
                $('#status-modal-error').arcticmodal();
                $('.status-modal-error-message').html(response.message)
            }
        }
    });
    return false;
}

function showAlert(id, link) {
    var $modal = $('#status-modal');
    $modal.arcticmodal();
    $modal.find('b').html(link);
    $modal.find('.status-modal-yes').attr('onclick', 'return newChangeStatus(' + id + ', "delete")')
    return false;
}