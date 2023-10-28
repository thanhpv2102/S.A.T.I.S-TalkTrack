let recorder;
let chunks = [];

const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const audio = document.getElementById('audio');
const recognizedText = document.getElementById('recognizedText');

const prediction = document.getElementById('prediction');
const emo = document.getElementById('emo');
// const keywords = document.getElementById('keywords');
// const hatespeech_words = document.getElementById('hatespeech_words');

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

         fetch('https://25f2-43-239-223-87.ngrok-free.app/predict', {
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
               prediction.innerHTML = '<b>Nội dung văn bản:</b> ' + jsonData.transcription
               emo.innerHTML = '<b>Cảm xúc:</b> ' + jsonData.emotion
               // keywords.innerHTML = '<b>Từ khóa:</b> ' + jsonData.keywords
               // hatespeech_words.innerHTML = '<b>Từ ngữ thô tục:</b> ' + jsonData.hatespeech_words
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