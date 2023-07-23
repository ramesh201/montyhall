import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './montyhall-game/pages/main-page/components/main-page/main-page.component';
import { DoorPageComponent } from './montyhall-game/pages/door-page/components/door-page/door-page.component';
import { ResultPageComponent } from './montyhall-game/pages/result-page/components/result-page/result-page.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './montyhall-game/common/components/navbar/navbar.component';
import { ReadMeComponent } from './montyhall-game/common/pages/read-me/read-me.component';
import { FooterComponent } from './montyhall-game/common/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DoorPageComponent,
    ResultPageComponent,
    NavbarComponent,
    ReadMeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatGridListModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
