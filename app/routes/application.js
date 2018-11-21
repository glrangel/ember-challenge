import Route from '@ember/routing/route';


export default Route.extend({
  model() {
   return this.store.findAll('author')
 },
 redirect: function () {
    this.transitionTo('/authors/');
    }
});
