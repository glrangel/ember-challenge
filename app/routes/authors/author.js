import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {


        let { author_id } = this.paramsFor('author');
        console.log("author id: " + author_id);
        console.log("params id: " + params.author_id);

        // console.log(params.id);
        // console.log(params.author.author_id);
        return RSVP.hash({
          author: this.store.findRecord('author', params.author_id),
          books: this.store.findRecord('author', params.author_id, {include: 'books'})
      });
  }

});
// export default Route.extend({
//   model() {
//     let { books } = this.modelFor('author');
//
//     return books;
//   }
// });
