import {Component, OnInit} from '@angular/core';
import {Character} from "../../models/character.model";
import {House} from "../../models/house.model";
import {Book} from "../../models/book.model";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpServiceService} from "../../services/http-service.service";
import {IdService} from "../../services/id.service";

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  url: string;
  character: Character;
  father: Character | undefined;
  mother: Character | undefined;
  spouse: Character | undefined;
  allegiances: House[];
  books: Book[];
  povBooks: Book[];

  constructor(
    private route : ActivatedRoute,
    private WebService: HttpServiceService,
    public idService: IdService
  ) { }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.father = undefined;
      this.mother = undefined;
      this.spouse = undefined;
      this.url = this.idService.getCharacterUrl(params["id"]);
      this.WebService.getDetailsFromUrl(this.url).subscribe((character: Character) => { this.character = character;
        if(this.character.father) this.WebService.getDetailsFromUrl(this.character.father).subscribe((character: Character) => { this.father = character });
        if(this.character.mother) this.WebService.getDetailsFromUrl(this.character.mother).subscribe((character: Character) => { this.mother = character });
        if(this.character.spouse) this.WebService.getDetailsFromUrl(this.character.spouse).subscribe((character: Character) => { this.spouse = character });
        this.allegiances = [];
        this.books = [];
        this.povBooks = [];
        this.character.allegiances.forEach(house => {
          this.WebService.getDetailsFromUrl(house).subscribe((house: House) => { this.allegiances.push(house) });
        });
        this.character.books.forEach(book => {
          this.WebService.getDetailsFromUrl(book).subscribe((book: Book) => { this.books.push(book) });
        });
        this.character.povBooks.forEach(book => {
          this.WebService.getDetailsFromUrl(book).subscribe((book: Book) => { this.povBooks.push(book) });
        });
      });
    });
  }
}
