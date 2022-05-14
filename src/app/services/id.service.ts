import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  constructor() { }

  getHouseId(url: string){
    return url.split("https://www.anapioficeandfire.com/api/houses/")[1];
  }

  getCharacterId(url: string){
    return url.split("https://www.anapioficeandfire.com/api/characters/")[1];
  }

  getBookId(url: string){
    return url.split("https://www.anapioficeandfire.com/api/books/")[1];
  }

  getHouseUrl(id: number){
    return `https://www.anapioficeandfire.com/api/houses/${id}`;
  }

  getCharacterUrl(id: number){
    return `https://www.anapioficeandfire.com/api/characters/${id}`;
  }

  getBookUrl(id: number){
    return `https://www.anapioficeandfire.com/api/books/${id}`;
  }
}
