import Route from '@ember/routing/route';
// import RSVP from 'rsvp';

export default Route.extend({
    model() {
     return this.store.findAll('author')
   }
});

// export default Route.extend({
//   model() {
//     return RSVP.hash({
//       authors: this.store.findAll('author'),
//       books: this.store.findAll('book')
//     });
//   }
// });
