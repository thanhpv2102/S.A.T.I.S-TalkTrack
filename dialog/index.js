$("#tb_call tbody").on('click', 'button', function() {
    $('.call-container').hide();
    $('.call-detail').fadeIn();
  });

$('#come_back').click(function () {
    $(this).parent().hide();
    $('.call-container').fadeIn();
});

var audio1 = new Audio('tts_1.wav');
var audio2 = new Audio('1.wav');
var audio3 = new Audio('tts_2.wav');
var audio4 = new Audio('2.wav');
var audio5 = new Audio('tts_3.wav');
var audio6 = new Audio('3.wav');
var audio7 = new Audio('tts_4.wav');

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

$('#btn-5').click(function () {
  audio5.play()
});

$('#btn-6').click(function () {
  audio6.play()
});

$('#btn-7').click(function () {
  audio7.play()
});