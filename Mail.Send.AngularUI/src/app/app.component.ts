import { Component, EventEmitter, Input, Output } from '@angular/core';
import { data } from '../models/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @Input('input-data') inputReceivedFromWebPart!: string;
  @Output() eventReceivedfromChild = new EventEmitter<data>();

  displayChildEvent(receivedEvent: data): void {

    console.log(`-- inside Parent component app-root displayChildEvent() method => Input received from WebPart: ${this.inputReceivedFromWebPart
      } --`)

    console.log(`-- inside parent component displayChildEvent() method => value received from child: ${JSON.stringify(receivedEvent)}`);

    this.eventReceivedfromChild.emit(receivedEvent);

  }

}
