import { Component } from '@angular/core';
import { MessageService } from 'src/app/shared/message/message.service';
import { MessageInput } from './common/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hangman';
  myWord = 'test';

  constructor(private messageService: MessageService) {
  }

  newGame(): void {
    const appData: MessageInput = {
      topic: 'NEW_GAME',
      data: ''
    };

    this.messageService.sendMessage(appData);
  }
}
