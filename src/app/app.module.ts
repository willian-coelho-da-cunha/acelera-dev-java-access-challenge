import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/**Routes.*/
import { AppRoutingModule } from './app-routing.module';

/**Components.*/
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
