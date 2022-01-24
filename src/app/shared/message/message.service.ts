import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { MessageInput } from 'src/app/common/types';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();

  sendMessage(message: MessageInput): void {
    this.subject.next(message);
  }

  clearMessage(): void {
      this.subject.next(null);
  }

  getMessage(): Observable<MessageInput> {
      return this.subject.asObservable();
  }
}
