import { Injectable } from '@angular/core';
import { Letter } from './common/types';

@Injectable({
  providedIn: 'root'
})
export class GuessLetterService {
  letters: Array<Letter>;

  constructor() { 
    var upper = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

    this.letters = [];
    for (const letter of upper) {
      let myLetter: Letter = {
        value: letter,
        isGuessed: false
      };
      this.letters.push(myLetter);
    }
  }

  resetLetterGuessed(): void {
    for (var letter of this.letters) {
      letter.isGuessed = false;
    }
  }

  setLetterGuessed(l: String): void {
    for (var letter of this.letters) {
      if (letter.value === l) {
        letter.isGuessed = true;
      }
    }
  }

  isLetterGuessed(l: String): boolean {
    var returnVal = false;
    for (var letter of this.letters) {
      if (letter.value === l) {
        returnVal = letter.isGuessed;
        break;
      }
    }
    return returnVal;
  }
}
