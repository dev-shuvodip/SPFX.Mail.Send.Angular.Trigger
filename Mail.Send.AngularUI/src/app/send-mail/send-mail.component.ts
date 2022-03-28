import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { data } from '../../models/data.model';

@Component({
  selector: 'send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  @Input('input-data') inputReceivedFromParent!: string;
  name!: string;
  age!: number;
  isObjectEmpty!: boolean;
  data!: data;
  @Output() eventReceived = new EventEmitter<data>();

  constructor() { }

  ngOnInit(): void { }

  eventEmitted(form: NgForm) {

    console.log(`-- inside Child component send-mail eventEmitted() method => Input received from Parent: ${this.inputReceivedFromParent} --`)

    this.isObjectEmpty = false;
    if ((form.value.name === '' && form.value.age === '') || (form.value.name == null && form.value.age == null)) {

      this.isObjectEmpty = true;

    }

    form.value.isObjectEmpty = this.isObjectEmpty;

    this.data = form.value;
    this.eventReceived.emit(this.data);
    console.log(this.data);

  }

}
