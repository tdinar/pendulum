
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { LayoutComponent } from './layout/layout.component';
import { pendulumComponent } from './pendulum/pendulum.component';
import { NavComponent } from './nav/nav.component';
import{BlurDirective} from './common/blur.directive'
import{FocusDirective} from './common/focus.directive'
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {InputQuestionComponent} from './common/input-question.component'
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavComponent,
    pendulumComponent,
   InputQuestionComponent,
   FocusDirective,


  ],
  entryComponents:[],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  // providers: [StoreComponent],
  bootstrap: [AppComponent,]
})
export class AppModule { }
