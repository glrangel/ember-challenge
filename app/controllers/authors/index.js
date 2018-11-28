// import Ember from 'ember';
import Controller from '@ember/controller';
// import Mirage, { faker } from 'ember-cli-mirage';

export default Controller.extend({
    actions: {
      createAuthor() {
        let newAuthor = this.get('newAuthor');
        let newRecord = this.store.createRecord('author', {
          name: newAuthor,
          picture: faker.internet.avatar()
        })
        newRecord.save();
        //create books
        this.set('newAuthor','');
    },
    deleteAuthor(id) {
            // let auth = this.store.peekRecord('author', authId);
            let auth = this.store.peekRecord('author',id);
            // auth.get('books').removeObject(book);
            auth.deleteRecord();
            auth.save();
            // auth.save();
        }
    }
});
