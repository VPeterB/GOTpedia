import { Component, OnInit } from '@angular/core';
import {Book} from "../../models/book.model";
import {Character} from "../../models/character.model";
import {ActivatedRoute, Params} from "@angular/router";
import {HttpServiceService} from "../../services/http-service.service";
import {IdService} from "../../services/id.service";

/**
 * Book details page.
 */
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

  /**
   * - set url from route param via idService
   * - reset values
   * - get values from API via WebService
   */
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.url = this.idService.getBookUrl(params["id"]);
      this.resetValues();
      this.getValues();
    });
  }

  /**
   * Reset values.
   */
  resetValues(){
    this.characters = [];
    this.povCharacters = [];
  }

  /**
   * Load values from API via WebService.
   */
  getValues(){
    this.WebService.getDetailsFromUrl(this.url).subscribe((book: Book) => { this.book = book;
      this.book.characters.forEach(character => {
        this.WebService.getDetailsFromUrl(character).subscribe((character: Character) => { this.characters.push(character) });
      });
      this.book.povCharacters.forEach(character => {
        this.WebService.getDetailsFromUrl(character).subscribe((character: Character) => { this.povCharacters.push(character) });
      });
    });
  }
}
