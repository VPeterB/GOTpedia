import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  readonly ROOT_URL;

  constructor(private http: HttpClient) {
    this.ROOT_URL = "https://www.anapioficeandfire.com/api";
  }

  getAll(uri: string, page: number, pageSize: number): Observable<any[]>{
    const params = new HttpParams().set("page", `${page}`).set("pageSize", `${pageSize}`);
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}`, {params});
  }

  getBooks(page: number, pageSize: number){
    return this.getAll('books', page, pageSize);
  }

  getCharacters(page: number, pageSize: number){
    return this.getAll('characters', page, pageSize);
  }

  getHouses(page: number, pageSize: number){
    return this.getAll('houses', page, pageSize);
  }

  getDetailsFromUrl(url: string){
    return this.http.get(url);
  }
}
