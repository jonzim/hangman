import { Injectable } from '@angular/core';
import { HangmanWord } from './common/types';
import { WordList } from './common/wordlist';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  words: Array<HangmanWord>;
  maxLetters: number = 25;

  constructor() { 
    this.words = WordList.words;
  }

  getRandomWord(): HangmanWord {
    var max = this.words.length;
    var foundWord = false;

    while (!foundWord) {
      var i = Math.floor(Math.random() * Math.floor(max));
      var returnVal: HangmanWord = this.words[i];
      if (returnVal.word.length <= this.maxLetters) {
        foundWord = true;
      }
    }

    return returnVal;
  }
}
