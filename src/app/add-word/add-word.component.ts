import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'src/app/shared/message/message.service';
import { FormControl, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.css']
})
export class AddWordComponent implements OnInit {
  @Input() guessWord: String;
  @Output() guessWordChange = new EventEmitter<String>();

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onChanges(newValue: String) {
    this.guessWordChange.emit(newValue);
  }

  addNewItem(value: string) {
    this.guessWordChange.emit(value);
  }
}
