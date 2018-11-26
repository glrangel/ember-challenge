export default function() {

  // this.urlPrefix = 'http://localhost:4200/';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `/api`, for example, if your API is namespaced
  this.get('/authors');
  this.post('/authors')

  this.get('/books');
  this.post('/books');

  this.get('/authors/:id');
  this.del('/authors/:id');
  this.patch('/authors/:id');

  this.get('/books/:id');
  this.del('/books/:id');

  // this.post('/authors', (schema, request) => {
  //   const attrs = JSON.parse(request.requestBody).data.attributes;
  //   console.log(attrs);
  //   console.log(schema);
  //   return schema.authors.create(attrs);
  // });
  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */
}
