import { Component, OnInit } from '@angular/core';
import {Character} from "../../models/character.model";
import {HttpServiceService} from "../../services/http-service.service";
import {IdService} from "../../services/id.service";

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

  loadCharacters(){
    this.WebService.getCharacters(this.page, this.pageSize).subscribe((characters: Character[]) => {
      this.characters = characters;
    })
  }

  nextPage(){
    this.page++;
    this.loadCharacters();
  }

  prevPage(){
    this.page--;
    this.loadCharacters();
  }
}
