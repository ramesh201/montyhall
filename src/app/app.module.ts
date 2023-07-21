import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './montyhall-game/pages/main-page/components/main-page/main-page.component';
import { DoorPageComponent } from './montyhall-game/pages/door-page/components/door-page/door-page.component';
import { ResultPageComponent } from './montyhall-game/pages/result-page/components/result-page/result-page.component';

@NgModule({
  declarations: [AppComponent, MainPageComponent, DoorPageComponent, ResultPageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
