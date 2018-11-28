// import Ember from 'ember';
import Controller from '@ember/controller';


export default Controller.extend({
  actions: {
      updateName(id) {
          let newTitle = this.get('newTitle');
          this.store.findRecord('book', id).then(function(book) {
            book.set('title', newTitle);
            book.save();
          });
          this.set('newTitle','');
      }
  }
});
