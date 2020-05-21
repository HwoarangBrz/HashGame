import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HashGameModule } from './hash-game';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HashGameModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
