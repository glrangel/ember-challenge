export default function() {

  // this.urlPrefix = 'http://localhost:4200/';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `/api`, for example, if your API is namespaced
  this.get('/authors');
  this.get('/authors/:id');


  this.post('/authors', (schema, request) => {
    const attrs = JSON.parse(request.requestBody).author;
    return schema.authors.create(attrs);
  });
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
