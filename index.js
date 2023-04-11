let recorder;
let chunks = [];

const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const audio = document.getElementById('audio');

navigator.mediaDevices.getUserMedia({audio: true})
.then(stream => {
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => {
        chunks.push(e.data);
    };
    recorder.onstop = e => {
        const blob = new Blob(chunks, {type: 'audio/webm'});
        const url = URL.createObjectURL(blob);
        audio.src = url;

        const formData = new FormData();
        formData.append('audio_file', blob, 'audio.wav');
        formData.append('transcript', 'đàn gà mới nở lông vàng mát dịu mắt đen sáng ngời');
        formData.append('num_channels', 1);
        formData.append('sample_rate', 16000);

        fetch('http://6bb5-43-239-223-87.ngrok.io/predict', {
        method: 'POST',
        body: formData,
        })
        .then(response => console.log(response.text))
        .then(data => console.log(data))
        .catch(error => console.error(error));
        };
})
.catch(error => {
    console.error(error);
});

recordButton.addEventListener('click', () => {
    recorder.start();
    recordButton.disabled = true;
    stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
    recorder.stop();
    recordButton.disabled = false;
    stopButton.disabled = true;
});