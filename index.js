let recorder;
let chunks = [];

const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
const audio = document.getElementById('audio');
const recognizedText = document.getElementById('recognizedText');

navigator.mediaDevices.getUserMedia({audio: true})
.then(stream => {
    const mimeType = 'audio/webm; codecs=opus';
    recorder = new MediaRecorder(stream, { mimeType });
    recorder.ondataavailable = e => {
        chunks.push(e.data);
    };
    recorder.onstop = async () => {
        const blob = new Blob(chunks, {type: 'audio/webm'});
        const url = URL.createObjectURL(blob);
        audio.src = url;
        const formData = new FormData();
        formData.append('file', blob, 'audio.webm');

        // const metadata = {
        //     transcript: 'test',
        //     num_channels: '1',
        //     sample_rate: '16000',
        //   };
        // formData.append('metadata', JSON.stringify(metadata));

        const response = await fetch('https://0d64-43-239-223-87.ngrok-free.app/predict', {
            method: 'POST',
            body: formData,
            });
        chunks = []
        console.log(response.json());
        recognizedText.innerHTML = response.json().transcription + '-' + response.json().emotion;
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
