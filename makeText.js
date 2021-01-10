// command-line tool to generate Markov text
const markov = require("./markov");
const fs = require("fs");
const process = require("process");
const axios = require("axios");

function markovFile (file) {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) {
            console.log(err)
            process.kill(1)
        }
        let fileMarokov = new markov.MarkovMachine(data)
        console.log(fileMarokov.makeText())
    })
}

async function marokvUrl (url) {
    try {
        let resp = await axios.get(url)
        console.log("RESP", resp)
        let respMarokov = new markov.MarkovMachine(resp.data)
        console.log(respMarokov.makeText())
    } catch (e) {
        console.log(`Error fetching ${url}: ${e}`);
        process.exit(1);    
    }
}

// text from file or url into Markov output via command line call
let words = process.argv[3];
process.argv[2] === 'url' ? marokvUrl(words) : markovFile(words);