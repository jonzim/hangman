import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { WordCharacter, HangmanWord, Letter, MessageInput } from 'src/app/common/types';
import { WordList } from 'src/app/common/wordlist';
import { GuessLetterService } from 'src/app/guess-letter.service';
import { WordsService } from 'src/app/words.service';
import { MessageService } from '../shared/message/message.service';

@Component({
  selector: 'app-guess-word',
  templateUrl: './guess-word.component.html',
  styleUrls: ['./guess-word.component.css']
})
export class GuessWordComponent implements OnInit {
  @Input() guessWord: string;

  charactersToGuess: Array<WordCharacter> = [];

  misses = 0;

  winFlag = false;

  currentWord: HangmanWord;
  subscription: Subscription;

  constructor(public guessLetter: GuessLetterService, private words: WordsService, private messageService: MessageService) { }

  ngOnInit(): void {
    debugger;
    this.startGame();

    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message.topic === 'NEW_GAME') {
        this.startGame();
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const key = event.key.toUpperCase();

    if (event.key.length === 1) {
      this.checkLetter(key);
    }

    console.log(event.key);
    // event.key === 'ArrowUp'
  }

  setMisses(misses: number): void {
    debugger;
    this.misses = misses;
    const appData: MessageInput = {
      topic: 'UPDATE_MISSES',
      data: misses
    };

    this.messageService.sendMessage(appData);
  }

  checkLetter(key: string): void {
    const isGuessed = this.isAlphaNumeric(key) && this.guessLetter.isLetterGuessed(key);
    if (this.misses < 6 && isGuessed === false) {
      if (!this.checkGuess(key)) {
        this.setMisses(this.misses + 1);

        if (this.misses >= 6) {
          this.showAllLetters();
        }
      }
    }

    if (this.checkWon()) {
      this.winFlag = true;
    }
  }

  checkWon(): boolean {
    let returnVal = true;

    for (const letter of this.charactersToGuess) {
      if (letter.isGuessed === false && letter.isAlphaNumeric === true) {
        returnVal = false;
        break;
      }
    }

    return returnVal;
  }

  checkGuess(guess: String): boolean {
    this.guessLetter.setLetterGuessed(guess);
    let foundIt: boolean = false;
    guess = guess.toUpperCase();

    this.charactersToGuess.forEach(function (letter) {
      if (letter.value === guess) {
        letter.isGuessed = true;
        foundIt = true;
        letter.isVisible = true;
      }
    }, this);

    return foundIt;
  }

  showAllLetters() {
    for (const letter of this.charactersToGuess) {
      letter.isVisible = true;
    }
  }


  isAlphaNumeric(str: String): Boolean {
    debugger;
    var code: number, i: number, len: number;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
        return false;
      }
    }
    return true;
  };

  startGame(): void {
    this.winFlag = false;
    this.guessLetter.resetLetterGuessed();
    debugger;
    this.charactersToGuess = [];
    this.setMisses(0);

    this.currentWord = this.words.getRandomWord();

    let myArray: any = [];
    let wordSplit = this.currentWord.word.split('');

    wordSplit.forEach(function (character) {
      let isLetter: boolean = this.isAlphaNumeric(character);

      // any non-letter will be shown automatically
      let c: WordCharacter = {
        value: character,
        isGuessed: false,
        isAlphaNumeric: isLetter,
        isVisible: !isLetter
      };

      myArray.push(c);
    }, this);

    this.charactersToGuess = myArray;
  }
}
