export default function() {

//Comment out line below if hosting locally and adjust
//app/adapters/application.js file appropiately
/* --- comment out if hosting locally ---*/
this.urlPrefix = 'https://crud-authors.herokuapp.com';

this.namespace = 'api';

  //allows for searchable authors
  this.get('/authors', function(db, request) {
    if(request.queryParams.name !== undefined) {
      let filteredAuthors = db.authors.all().filter(function(i) {
        return i.name.toLowerCase().indexOf(request.queryParams.name.toLowerCase()) !== -1;
      });
      return filteredAuthors;
    }
    else
      return db.authors.all();
  });
  
  this.post('/authors');


  this.get('/books');
  this.post('/books');

  this.get('/authors/:id');
  this.del('/authors/:id');
  this.patch('/authors/:id');

  this.get('/books/:id');
  this.del('/books/:id');
  this.patch('/books/:id');


}
