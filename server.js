const exp = require('express')
const app = exp()

const path = require('path')
app.use(exp.static(path.join(__dirname, "dist/books")))

const port=4000
app.listen(port,()=>{ console.log(`Server listening on port ${port}`)})
app.use(exp.json())

const csv = require('csv-parser')
const fs = require('fs')

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: './file.csv',
    header: [
        {id : 'title', title: 'title'},
        {id : 'isbn', title : 'isbn'},
        {id : 'category', title : 'category'},
        {id : 'authors', title : 'authors'},
        {id : 'description', title: 'description'}
    ]
});
 


app.get("/books-and-magazine",async(req,res,next)=>{
    let books = [];
    let authors = []
    let magazines = []
    let files = []

    function compare( a, b ) {
        if ( a.title < b.title ){
          return -1;
        }
        if ( a.title > b.title ){
          return 1;
        }
        return 0;
      }

    await fs.createReadStream('Books.csv')
        .pipe(csv())
        .on('data', (data) => {
            let s = data.authors.split(';');
            data.authors = s;
            books.push(data)
        })
        .on('end', () => {
            fs.createReadStream('file.csv')
            .pipe(csv())
            .on('data',(data)=>{
                let s = data.authors.split(';');
                data.authors = s;
                files.push(data)
            })
            .on('end',()=>{
                fs.createReadStream('Magazines.csv')
            .pipe(csv())
            .on('data', (data) => {
                let s = data.authors.split(';');
                data.authors = s;
                magazines.push(data)
            })
            .on('end', () => {
                fs.createReadStream('Authors.csv')
                .pipe(csv())
                .on('data', (data) => {
                    authors.push(data)
                })
                .on('end', () => {
                    books.sort(compare)
                    magazines.sort(compare)
                    res.send({a : authors, b : books, m : magazines,f : files})
                });
            });
            });
            });
    
})

app.post('/books-and-magazine',async(req,res,next)=>{
    let obj = req.body
    let arr = [obj]
    let files = []
    csvWriter.writeRecords(arr)  
    .then(() => {
        fs.createReadStream('file.csv')
            .pipe(csv())
            .on('data',(data)=>{
                let s = data.authors.split(';');
                data.authors = s;
                files.push(data)
            })
            .on('end',()=>{
                res.send({message : "Successfully Added",files : files});
            })
    });
})