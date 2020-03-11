
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,

  ],
  providers: [NgForm, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
