const markov = require("./markov");
describe("markov function", function () {

    test('makeChains method', function () {
        const mm = new markov.MarkovMachine("the cat in the hat")
        expect(typeof mm.chains).toEqual('object');
        expect(mm.chains).not.toBeNull();

      });
    test('makeText method - default', function () {
        const mm = new markov.MarkovMachine("the cat in the hat")
        let wordsOut = mm.makeText()       
        expect(wordsOut).toBeDefined();
        expect(wordsOut.split(" ").length).toEqual(100)
      });
    test('makeText method - user num input', function () {
        const mm = new markov.MarkovMachine("the cat in the hat")
        let wordsOut = mm.makeText(50)       
        expect(wordsOut).toBeDefined();
        expect(wordsOut.split(" ").length).toEqual(50)
      });
    });