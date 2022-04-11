import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
 
import { selectBookCollection, selectBooks } from './state/books.selectors';
import {
  retrievedBookList,
  addBook,
  removeBook,
} from './state/books.actions';
import { GoogleBooksService } from './book-list/books.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  books$:any;
  bookCollection$ : any;
 
  onAdd(bookId: string) {
    this.store.dispatch(addBook({ bookId }));
  }
 
  onRemove(bookId: string) {
    this.store.dispatch(removeBook({ bookId }));
  }
 
  constructor(
    private booksService: GoogleBooksService,
    private store: Store
  ) {
    this.books$ = this.store.select(selectBooks);
    this.bookCollection$ = this.store.select(selectBookCollection);
  }
 
  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((books) => this.store.dispatch(retrievedBookList({ books })));
  }
}