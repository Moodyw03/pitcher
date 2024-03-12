let audioContext;
let sourceNode;
let buffer;
let mediaRecorder;
let recordedChunks = [];

window.onload = function() {
    document.getElementById('audioFile').addEventListener('change', handleFileSelect);
    document.getElementById('playButton').addEventListener('click', handlePlay);
    document.getElementById('stopButton').addEventListener('click', handleStop);
    document.getElementById('rateControl').addEventListener('input', handleRateChange);
    document.getElementById('downloadButton').addEventListener('click', downloadPitchedAudio);
};

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) {
        console.log("No file selected.");
        return;
    }

    // Close the previous audio context if it exists
    if (audioContext) {
        audioContext.close();
    }
    // Create a new audio context
    audioContext = new AudioContext();

    const reader = new FileReader();
    reader.onload = function(fileEvent) {
        audioContext.decodeAudioData(fileEvent.target.result).then(function(decodedData) {
            buffer = decodedData;
            console.log("Audio file loaded and decoded.");
        }).catch(function(e) {
            console.log("Error decoding audio data: ", e);
        });
    };
    reader.onerror = function(e) {
        console.log("FileReader error: ", e);
    };
    reader.readAsArrayBuffer(file);
    console.log("File read started.");
}

function handlePlay() {
    if (!audioContext) {
        console.log("AudioContext not initialized.");
        return;
    }

    if (!buffer) {
        console.log("No audio buffer available. Make sure to upload and decode an audio file first.");
        return;
    }

    if (sourceNode) sourceNode.disconnect(); // Disconnect any previously playing audio
    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = buffer;

    setupMediaRecorder(); // Setup media recorder with the current sourceNode

    sourceNode.connect(audioContext.destination);
    sourceNode.start(0);
    console.log("Playback started.");

    // Resume the audio context if needed
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log('Playback resumed successfully');
        });
    }
}

function handleStop() {
    if (sourceNode) {
        sourceNode.stop(0);
        console.log("Playback stopped.");
    }
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        console.log("Recording stopped.");
    }
}

function handleRateChange() {
    const rate = parseFloat(this.value);
    if (sourceNode) {
        sourceNode.playbackRate.value = rate;
        console.log(`Playback rate changed: ${rate}`);
    }
}

function setupMediaRecorder() {
    if (!audioContext) return;
    const dest = audioContext.createMediaStreamDestination();
    sourceNode.connect(dest); // Connect the source to it

    mediaRecorder = new MediaRecorder(dest.stream);

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = createDownloadLink;
    
    // Start recording
    mediaRecorder.start();
    console.log("Recording started.");
}

function createDownloadLink() {
    const blob = new Blob(recordedChunks, {
        type: 'audio/wav' // Assuming you're recording in WAV format
    });
    const url = URL.createObjectURL(blob);

    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'pitched_audio.wav'; // Filename for the downloaded file
    downloadLink.style.display = 'none'; // Hide the link element
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    // Clear recorded chunks for the next recording
    recordedChunks = [];
}

function downloadPitchedAudio() {
    // Placeholder for download function
    // You need to implement audio processing before calling this function
    console.log("Download pitched audio - function needs implementation");
}
function downloadPitchedAudio() {
    if (!buffer) {
        console.log("No audio buffer available to download.");
        return;
    }

    // Create an OfflineAudioContext with the same properties as the current AudioContext
    const offlineContext = new OfflineAudioContext(
        buffer.numberOfChannels,
        buffer.length,
        buffer.sampleRate
    );

    // Create a buffer source
    const offlineSource = offlineContext.createBufferSource();
    offlineSource.buffer = buffer;

    // Here we set the playback rate to adjust the pitch.
    // A value greater than 1 will increase the pitch, while a value less than 1 will decrease it.
    // For this example, let's say we want to increase the pitch by a half-step (semitone).
    const pitchShift = Math.pow(2, 1/12); // A half-step up
    offlineSource.playbackRate.value = pitchShift;

    // Connect source to the offline context
    offlineSource.connect(offlineContext.destination);

    // Start the source
    offlineSource.start(0);

    // Render the audio - this processes the entire buffer through the offline context
    offlineContext.startRendering().then(renderedBuffer => {
        // The rendered buffer is now the pitched version of the audio
        // We'll create a WAV file from this buffer
        const wavFile = audioBufferToWav(renderedBuffer);
        const blob = new Blob([wavFile], {
            type: 'audio/wav'
        });

        // Use the existing createDownloadLink function to create a link and initiate download
        createDownloadLink(blob
, 'pitched_audio.wav'); // Pass the blob and the filename to the function
}).catch(e => console.log('Rendering failed: ' + e));
}

// This function will be used by downloadPitchedAudio to convert the rendered buffer into a WAV file
function audioBufferToWav(buffer) {
// Placeholder for actual WAV conversion logic
// For a real implementation, you would need to use an audio library
// or write the conversion code yourself.
console.log('The audioBufferToWav function needs to be implemented to convert an AudioBuffer to a WAV file.');
}

function createDownloadLink(blob, filename) {
const url = URL.createObjectURL(blob);
const downloadLink = document.createElement('a');
downloadLink.href = url;
downloadLink.download = filename;
downloadLink.style.display = 'none'; // Hide the link element
document.body.appendChild(downloadLink);
downloadLink.click();
document.body.removeChild(downloadLink);
URL.revokeObjectURL(url);
}

const toWav = require('audiobuffer-to-wav');
// Assuming 'audioBuffer' is an instance of AudioBuffer you want to convert
const wavBlob = toWav(audioBuffer);
// Now 'wavBlob' contains the WAV file data

