// import Ember from 'ember';
import Controller from '@ember/controller';
import { faker } from 'ember-cli-mirage';



export default Controller.extend({

  actions: {
    updateName(id) {
        let newName = this.get('newName');
        this.store.findRecord('author', id).then(function(auth) {
          auth.set('name', newName);
        });
        this.set('newName','');
    },
    addBook(id) {
        let newBook = this.get('newBook');
        let auth = this.store.peekRecord('author', id);

        let newRecord = this.store.createRecord('book', {
            author: auth,
            title: newBook,
            date: faker.date.past()
        });
        auth.get('books').pushObject(newRecord);
        newRecord.save();
        this.set('newBook','');
    },
    deleteBook(id) {
        let book = this.store.peekRecord('book',id);
        book.deleteRecord();
        book.save();
    }
  }
});
