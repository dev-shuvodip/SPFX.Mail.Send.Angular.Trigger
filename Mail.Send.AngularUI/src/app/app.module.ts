import { Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SendMailComponent } from './send-mail/send-mail.component';

@NgModule({
  declarations: [
    AppComponent,
    SendMailComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) { }

  ngDoBootstrap(): void {

    const angularElement = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('app-root', angularElement);

  }

}
