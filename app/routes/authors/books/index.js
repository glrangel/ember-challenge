import Route from '@ember/routing/route';
// import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
     return this.store.findRecord('book',params.book_id)
   }
});
