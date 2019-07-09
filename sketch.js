let myMobileNet;
let myVideo;
let myDiv;
let osc;
var index;


let notes = [60, 71];

function preload() {
    myMobileNet = ml5.imageClassifier('MobileNet');
    myVideo = createCapture(VIDEO);
    myVideo.parent('#wrapper');
    // A triangle oscillator
    osc = new p5.TriOsc();
    // Start silent
    osc.start();
    osc.amp(0);
}

function setup() {
    myMobileNet.classify(myVideo, gotResults);
    myDiv = createDiv('...');
    myDiv.parent('#wrapper');
    myDiv.addClass('label');
    // console.log('my mobileNet', myMobileNet);

}

function gotResults(err, results) {
    if (err) console.log(err);
    if(results) {
        if (Math.floor(results[0].confidence*1000) > 60 && Math.floor(results[0].confidence*1000) < 71) {
            console.log("true");
            playNote(Math.floor(results[0].confidence*1000), 500);
        } else {
            index = Math.floor(Math.random()*5)
            playNote(notes[index], 500);
        }
        myDiv.html(`I see: ${results[0].label}, Confidence: ${results[0].confidence}`);
        console.log(results)
        setTimeout(() => myMobileNet.classify(myVideo, gotResults), 500);
    }
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);


  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0.5,0.2);
    }, duration-1000);
  }
}
