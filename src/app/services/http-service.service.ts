import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
import {Character} from "../models/character.model";
import {House} from "../models/house.model";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "https://www.anapioficeandfire.com/api";
  }

  /**
   * return http get (array)
   * @param uri
   * @param page number of the current page
   * @param pageSize
   */
  getAll(uri: string, page: number, pageSize: number): Observable<any[]>{
    const params = new HttpParams().set("page", `${page}`).set("pageSize", `${pageSize}`);
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}`, {params});
  }

  /**
   * return http get books
   * @param page number of the current page
   * @param pageSize
   */
  getBooks(page: number, pageSize: number): Observable<Book[]>{
    return this.getAll('books', page, pageSize);
  }

  /**
   * return http get characters
   * @param page number of the current page
   * @param pageSize
   */
  getCharacters(page: number, pageSize: number): Observable<Character[]>{
    return this.getAll('characters', page, pageSize);
  }

  /**
   * return http get houses
   * @param page number of the current page
   * @param pageSize
   */
  getHouses(page: number, pageSize: number): Observable<House[]>{
    return this.getAll('houses', page, pageSize);
  }

  /**
   * return http get
   * @param url
   */
  getDetailsFromUrl(url: string): Observable<any>{
    return this.http.get(url);
  }
}
