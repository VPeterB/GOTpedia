import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book.model";
import {Character} from "../../models/character.model";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpServiceService} from "../../services/http-service.service";
import {IdService} from "../../services/id.service";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  url: string;
  book: Book;
  characters: Character[];
  povCharacters: Character[];

  constructor(
    private route : ActivatedRoute,
    private WebService: HttpServiceService,
    public idService: IdService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.url = this.idService.getBookUrl(params["id"]);
      this.WebService.getDetailsFromUrl(this.url).subscribe((book: any) => { this.book = book;
        this.characters = [];
        this.povCharacters = [];
        this.book.characters.forEach(character => {
          this.WebService.getDetailsFromUrl(character).subscribe((character: any) => { if(character) this.characters.push(character) });
        });
        this.book.povCharacters.forEach(character => {
          this.WebService.getDetailsFromUrl(character).subscribe((character: any) => { if(character) this.povCharacters.push(character) });
        });
      });
    });
  }
}
