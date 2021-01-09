// textual markov chain generator

class MarkovMachine {

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  // markov chains to pull words from
  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }
    this.chains = chains;
    console.log("TYYYYPE****************", typeof this.chains, this.chains.length )
  }  

  // pick random choice from array
  static choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }


// return ran text from chains
  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let textOut = [];

    for (let i=0; i < numWords; i++) {
      textOut.push(MarkovMachine.choice(keys));
    }
    return textOut.join(" ");
  }

}

let mm = new MarkovMachine("this is a test and I hope it works really well");
let newWords = mm.makeText()
console.log(newWords)

module.exports = {
  MarkovMachine,
}