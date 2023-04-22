$("#tb_call tbody").on('click', 'button', function() {
    $('.call-container').hide();
    $('.call-detail').fadeIn();
  });

$('#come_back').click(function () {
    $(this).parent().hide();
    $('.call-container').fadeIn();
});

var audio1 = new Audio('1.wav');
var audio2 = new Audio('2.wav');
var audio3 = new Audio('3.wav');
var audio4 = new Audio('4.wav');

$('#btn-1').click(function () {
  audio1.play()
});

$('#btn-2').click(function () {
  audio2.play()
});

$('#btn-3').click(function () {
  audio3.play()
});

$('#btn-4').click(function () {
  audio4.play()
});