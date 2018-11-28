import Route from '@ember/routing/route';
// import RSVP from 'rsvp';

export default Route.extend({
    model(params) {
        console.log("heyyy");
        console.log(params.book_id);
     return this.store.findRecord('book',params.book_id)
   }
});
