import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksAndMagazinesComponent } from './books-and-magazines/books-and-magazines.component';

const routes: Routes = [{path : "books-and-magazine",component : BooksAndMagazinesComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
