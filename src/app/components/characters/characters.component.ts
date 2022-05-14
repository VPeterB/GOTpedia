import { Component, OnInit } from '@angular/core';
import {Character} from "../../models/character.model";
import {HttpServiceService} from "../../services/http-service.service";
import {IdService} from "../../services/id.service";

/**
 * Character list page with paging.
 */
@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  page = 1;
  pageSize = 9;
  lastPage = Math.ceil(2134 / this.pageSize);
  characters: Character[] = [];


  constructor(
    private WebService: HttpServiceService,
    public idService: IdService
  ) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  /**
   * Load characters from API via WebService.
   */
  loadCharacters(){
    this.WebService.getCharacters(this.page, this.pageSize).subscribe((characters: Character[]) => {
      this.characters = characters;
    })
  }

  /**
   * Go to next page.
   */
  nextPage(){
    this.page++;
    this.loadCharacters();
  }

  /**
   * Go to previous page.
   */
  prevPage(){
    this.page--;
    this.loadCharacters();
  }
}
