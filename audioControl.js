let audioContext;
let sourceNode;
let buffer;

window.onload = function() {
    document.getElementById('audioFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) {
            console.log("No file selected.");
            return;
        }
        if (audioContext) audioContext.close();
        audioContext = new AudioContext();

        const reader = new FileReader();
        
        reader.onload = function(fileEvent) {
            audioContext.decodeAudioData(fileEvent.target.result, function(decodedData) {
                buffer = decodedData;
                console.log("Audio file loaded and decoded.");
            }, function(e){
                console.log("Error decoding audio data: ", e);
            });
        };

        reader.onerror = function(e) {
            console.log("FileReader error: ", e);
        };

        reader.readAsArrayBuffer(file);
        console.log("File read started.");
    });

    document.getElementById('playButton').addEventListener('click', function() {
        if (!buffer) {
            console.log("No audio buffer available. Make sure to upload and decode an audio file first.");
            return;
        }
        if (sourceNode) sourceNode.stop(0); // Stop any currently playing audio
        sourceNode = audioContext.createBufferSource();
        sourceNode.buffer = buffer;
        sourceNode.connect(audioContext.destination);
        sourceNode.start(0);
        console.log("Playback started.");

        // Resume the audio context if needed
        if (audioContext.state === 'suspended') {
            audioContext.resume().then(() => {
                console.log('Playback resumed successfully');
            });
        }
    });

    document.getElementById('stopButton').addEventListener('click', function() {
        if (sourceNode) {
            sourceNode.stop(0);
            console.log("Playback stopped.");
        }
    });

    document.getElementById('rateControl').addEventListener('input', function() {
        const rate = parseFloat(this.value);
        if (sourceNode) {
            sourceNode.playbackRate.value = rate;
            console.log(`Playback rate changed: ${rate}`);
        }
    });
};


