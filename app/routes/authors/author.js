import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        return RSVP.hash({
          author: this.store.findRecord('author', params.author_id),
          books: this.store.findRecord('author', params.author_id, {include: 'books'})
      });
  }

});
