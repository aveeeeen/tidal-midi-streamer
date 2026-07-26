import { WebMidi } from "webmidi";
import { exit } from "node:process"

const midi = await WebMidi.enable(() => {
  console.log("Loading available midi devices...")
});

console.log("--- Midi Output Devices ---")

await WebMidi.outputs.forEach(output => {
  console.log("Manufature: ", output.manufacturer);
  console.log("Device Name: ", output.name);
});

console.log("--- Midi Input Devices ---")

await WebMidi.inputs.forEach(input => {
  console.log("Manufature: ", input.manufacturer);
  console.log("Device Name: ", input.name);
});

console.log("Ending...");
exit();