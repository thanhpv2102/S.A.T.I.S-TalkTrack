$("#tb_call tbody").on('click', 'button', function() {
    $('.call-container').hide();
    $('.call-detail').fadeIn();
  });

$('#come_back').click(function () {
    $(this).parent().hide();
    $('.call-container').fadeIn();
});