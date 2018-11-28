// import Ember from 'ember';
import Controller from '@ember/controller';


export default Controller.extend({
  actions: {
      updateName(id) {
          console.log("wxdddd");
          console.log(id);
          let newTitle = this.get('newTitle');
          this.store.findRecord('book', id).then(function(book) {
            book.set('title', newTitle);
          });
          this.set('newTitle','');
      }
  }
});
