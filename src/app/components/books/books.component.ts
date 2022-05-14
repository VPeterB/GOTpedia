import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../services/http-service.service";
import {Book} from "../../models/book.model";
import {IdService} from "../../services/id.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  page = 1;
  pageSize = 6;
  lastPage = Math.ceil(12/this.pageSize)
  books: Book[] = [];

  constructor(
    private WebService: HttpServiceService,
    public idService: IdService
  ) { }

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks(){
    this.WebService.getBooks(this.page, this.pageSize).subscribe((books: Book[]) => {
      this.books = books;
    })
  }

  nextPage(){
    this.page++;
    this.loadBooks();
  }

  prevPage(){
    this.page--;
    this.loadBooks();
  }
}
