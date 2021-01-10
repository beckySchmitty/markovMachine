// command-line tool to generate Markov text
const markov = require("./markov");
const fs = require("fs");
const process = require("process");
const axios = require("axios");

// make markov machine and generate text
function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText())
}

// read file and generate text
function markovFile (file) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err)
            process.kill(1)
        }
        generateText(data)
    })
}

// real URL and make text
async function marokvUrl (url) {
    try {
        let resp = await axios.get(url);
        generateText(resp.data)

    } catch (e) {
        console.log(`Error fetching ${url}: ${e}`);
        process.exit(1);    
    }
}

// text from file or url into Markov output via command line call
let [method, path] = process.argv.slice(2);

if (method === "file") {
  markovFile(path);
}

else if (method === "url") {
  marokvUrl(path);
}

else {
  console.log(`Unknown method: ${method}`);
  process.exit(1);
}