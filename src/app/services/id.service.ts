import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  constructor() { }

  /**
   * return house id from url
   * @param url
   */
  getHouseId(url: string){
    return url.split("/")[5];
  }

  /**
   * return character id from url
   * @param url
   */
  getCharacterId(url: string){
    return url.split("/")[5];
  }

  /**
   * return book id from url
   * @param url
   */
  getBookId(url: string){
    return url.split("/")[5];
  }

  /**
   * return house url from id
   * @param id
   */
  getHouseUrl(id: number){
    return `https://www.anapioficeandfire.com/api/houses/${id}`;
  }

  /**
   * return character url from id
   * @param id
   */
  getCharacterUrl(id: number){
    return `https://www.anapioficeandfire.com/api/characters/${id}`;
  }

  /**
   * return book url from id
   * @param id
   */
  getBookUrl(id: number){
    return `https://www.anapioficeandfire.com/api/books/${id}`;
  }
}
