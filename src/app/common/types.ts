export interface MessageInput {
    topic: string;
    data: any;
}

export interface WordCharacter {
    isGuessed: boolean;
    value: string;
    isAlphaNumeric: boolean;
    isVisible: boolean;
}

export interface HangmanWord {
    category: string;
    word: string
}

export interface Letter {
    value: string;
    isGuessed: boolean;
}