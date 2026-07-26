import { Server } from "node-osc"
import { WebMidi } from "webmidi"

const midiName = "IAC バス1"
const port = 5050;
const midiAllCh = Array.from({length: 128}, (_, idx) => idx)

const main = async () => {
  const tidalPort = port;
  const osc = new Server(port, "127.0.0.1");
  const midi = await WebMidi.enable(() => console.log("Enabled Streamer..."));

  const midiout = midi.getOutputByName(midiName)

  osc.on("error", (err, rinfo) => {
    console.error(`❌ Server error from ${rinfo.address}:${rinfo.port}`);
    console.error(`   ${err.message}`);
  });

  osc.on('bundle', (bundle) => {
    let i = 0;
    let pNameIdx;
    let pName;
    for(let v of bundle.elements[0]) {
      if (v === '_id_') pNameIdx = i + 1;
      if (i === pNameIdx) pName = v;
      i++;
    }

    console.log("recieved")
    console.log(pName);
    
    // percussive instruments c2 - c3
    
    if (pName === "bd" || pName === "kick" || pName === "drums") midiout.playNote("C2", {channels: midiAllCh, duration: 10});
    if (pName === "hh") midiout.playNote("D2", {channels: midiAllCh, duration: 10});
    if (pName === "cp" || pName === "sn") midiout.playNote("E2", {channels: midiAllCh, duration: 10});
    if (pName === "toms" || pName === "percs") midiout.playNote("F2", {channels: midiAllCh, duration: 10});
    if (pName === "breaks") midiout.playNote("G2", {channels: midiAllCh, duration: 10});
    if (pName === "noise") midiout.playNote("A2", {channels: midiAllCh, duration: 10});

    // bass instruments c3 - c4
    if (pName === "fmbass" || pName === "bass") midiout.playNote("C3", {channels: midiAllCh, duration: 10});

    // melodic instruments c4 - c5

    if (pName === "fmsaw" || pName === "pads") midiout.playNote("C4", {channels: midiAllCh, duration: 10});
    if (pName === "plucks") midiout.playNote("D4", {channels: midiAllCh, duration: 10});
    if (pName === "leads" || pName === "melody") midiout.playNote("E4", {channels: midiAllCh, duration: 10}); 
  });
}

await main();