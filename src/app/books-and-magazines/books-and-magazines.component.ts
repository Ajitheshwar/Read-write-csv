import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authors, books, magazines } from 'src/models/data.models';

@Component({
  selector: 'app-books-and-magazines',
  templateUrl: './books-and-magazines.component.html',
  styleUrls: ['./books-and-magazines.component.css']
})
export class BooksAndMagazinesComponent implements OnInit {

  constructor(private http : HttpClient) { }

  searchTerm : string = ""
  choice : string = ''
  aus : string[] = []
  category : string  = ''
  ngOnInit(): void {
    
    this.http.get<any>("/books-and-magazine",{responseType : 'text' as 'json'}).subscribe(
      {
        next : data=>{
          let d = JSON.parse(data)
          this.authors = d.a
          this.files = d.f
          let s = []
          for(let x of d.b){
            s=[]
            for(let y of x.authors){
              for(let z of this.authors){
                if(z.email==y)
                  s.push(z.firstname+" "+z.lastname)
              }
            }
            let obj : books = {title : x.title, description : x.description, authors : x.authors, isbn : x.isbn, authorsName : s}
            this.books.push(obj)
          }
          s = []
          for(let x of d.m){
            s=[]
            for(let y of x.authors){
              for(let z of this.authors){
                if(z.email==y)
                  s.push(z.firstname+" "+z.lastname)
              }
            }
            let obj : magazines = {title : x.title, publishedAt : x.publishedAt, authors : x.authors, isbn : x.isbn, authorsName : s}
            this.magazines.push(obj)
          }
        },
        error : err =>{
          console.log(err)
        }
      }
    )

  }

  authors : authors []= []
  books : books[] = []
  magazines : magazines[] = []
  files:any[] =[]
  authorNameError : boolean = false;


  addAuthor(ref : NgForm){
    this.authorError = false
    let author = ref.value.author
    this.aus.push(author)
    ref.reset()
  }
  deleteAuthor(j : number){
    this.aus.splice(j,1)
  }

  authorError : boolean = false
  submitAddBookMagazine( ref : NgForm){
    this.authorError = false
    let s : string = ''
    for(let a of this.aus){
      s+=a
      s+=";"
    }
    s=s.slice(0,s.length-1)
    console.log(s)
    if(s=="")
      this.authorError = true;

  
    if(ref.form.valid){
      let obj = {title : ref.value.title,isbn : ref.value.isbn, description : ref.value.description,authors :s,category : ref.value.category}
  
      this.http.post<any>("/books-and-magazine",obj).subscribe({
        next : data =>{this.files = data.files;alert(data.message)},
        error : err => {console.error(err)}
      })
    }
  }

  scrollToDiv(s : string){
    var ele = document.getElementById(s);
    ele?.scrollIntoView()
  }
}
