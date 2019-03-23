import * as mobilenet from "@tensorflow-models/mobilenet";

let net;
let netPromise: Promise<mobilenet.MobileNet>;

async function load() {
  console.log("Loading mobilenet..");

  netPromise = new Promise(async (resolve) => {
    // Load the model.
    net = await mobilenet.load()
    console.log("Sucessfully loaded model");
    resolve(net)
  })
}

export function getNet(): Promise<mobilenet.MobileNet> {
    return netPromise
}

load();
