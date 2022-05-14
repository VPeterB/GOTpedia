import { NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {BooksComponent} from "./components/books/books.component";
import {BookDetailComponent} from "./components/book-detail/book-detail.component";
import {CharactersComponent} from "./components/characters/characters.component";
import {CharacterDetailComponent} from "./components/character-detail/character-detail.component";
import {HousesComponent} from "./components/houses/houses.component";
import {HouseDetailComponent} from "./components/house-detail/house-detail.component";

const routes: Route[] = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'character/:id', component: CharacterDetailComponent },
  { path: 'houses', component: HousesComponent },
  { path: 'house/:id', component: HouseDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
