import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../shared/message/message.service';

@Component({
  selector: 'app-image1',
  templateUrl: './image1.component.html',
  styleUrls: ['./image1.component.css']
})
export class Image1Component implements OnInit {
  @Input() height: string;
  @Input() width: string;

  misses = 0;
  subscription: Subscription;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      debugger;
      if (message.topic === 'UPDATE_MISSES') {
        this.misses = message.data;
      }
    });
  }

}
