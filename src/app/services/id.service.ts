import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  constructor() { }

  /**
   * return id from url, url looks like: "https://anapioficeandfire.com/api/{type}/1" or "https://www.anapioficeandfire.com/api/{type}/1"
   * where {type} can be houses, books or characters
   * split picks the number after 5 separator "/"
   * @param url
   */
  getId(url: string){
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
