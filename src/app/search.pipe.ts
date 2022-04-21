import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(booksMagazines : any[], searchTerm : string, choice : string): any[] {
    if(!booksMagazines || !searchTerm || !choice){
      return booksMagazines
    }
    else{  
      if(choice == "isbn")
        return booksMagazines.filter(bm => bm.isbn.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
      return booksMagazines.filter(bm => bm.authors.filter((a : string)=>a.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1).length>0);
    }
  }

}
