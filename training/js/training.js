var iframe = document.getElementById("personal_frame");
var elmnt = iframe.contentWindow.document.getElementById("GVHoDnN7csEvH0hc");
elmnt.addEventListener("click", function(){

   $('#personal').hide();
   $('#training').fadeIn();   
});

$('#come_back').click(function () {
   $(this).parent().hide();
   $('#personal').fadeIn();
});

let recorder;
let chunks = [];

const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const audio = document.getElementById('audio');
const recognizedText = document.getElementById('recognizedText');

stopButton.disabled = true;
stopButton.style.display = "none";

navigator.mediaDevices.getUserMedia({ audio: true })
   .then(stream => {
      const mimeType = 'audio/webm; codecs=opus';
      recorder = new MediaRecorder(stream, { mimeType });
      recorder.ondataavailable = e => {
         chunks.push(e.data);
      };
      recorder.onstop = async () => {
         const blob = new Blob(chunks, { type: 'audio/webm' });
         const url = URL.createObjectURL(blob);
         audio.src = url;
         const formData = new FormData();
         formData.append('file', blob, 'audio.webm');

         fetch('https://86e5-43-239-223-87.ngrok-free.app/predict', {
            method: 'POST',
            body: formData,
         }).then(response => {
            if (response.status >= 200 && response.status < 300) {
               return response.json();
            } else {
               throw new Error('Request failed');
            }
         })
            .then(jsonData => {
               // Handle the parsed JSON data here
               // recognizedText.innerHTML = jsonData.transcription + '-' + jsonData.emotion;
               // var decision = jsonData.decision;
               // var review = jsonData.review;
               console.log(jsonData)
               Swal.fire({
                  title: jsonData.result,
                  html: jsonData.review,
                  icon: jsonData.decision,
               }).then(function () {
                  // window.location.reload(true);
               });
            })
            .catch(error => {
               // Handle any errors here
            });
         chunks = []
      };
   })
   .catch(error => {
      console.error(error);
   });

recordButton.addEventListener('click', () => {
   recorder.start();
   recordButton.disabled = true;
   stopButton.disabled = false;
   recordButton.style.display = "none";
   stopButton.style.display = "inline-block";

});

stopButton.addEventListener('click', () => {
   recorder.stop();
   recordButton.disabled = false;
   stopButton.disabled = true;
   stopButton.style.display = "none";
   recordButton.style.display = "inline-block";

});