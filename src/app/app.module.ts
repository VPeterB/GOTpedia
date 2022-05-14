import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app.component';
import { BooksComponent } from './components/books/books.component';
import { CharactersComponent } from './components/characters/characters.component';
import { HousesComponent } from './components/houses/houses.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpServiceService } from "./services/http-service.service";
import { RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { IdService } from "./services/id.service";

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    CharactersComponent,
    HousesComponent,
    BookDetailComponent,
    HouseDetailComponent,
    CharacterDetailComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    NgbCollapseModule,
    AppRoutingModule
  ],
  providers: [HttpServiceService, IdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
