// import Ember from 'ember';
import Controller from '@ember/controller';
// import {faker} from 'ember-cli-mirage';

export default Controller.extend({
    actions: {
      createAuthor() {
        let newAuthor = this.get('newAuthor');
        let newRecord = this.store.createRecord('author', {
          name: newAuthor
          // picture: faker.internet.avatar()
        })
        newRecord.save();
        this.set('newAuthor','');
    },
    deleteAuthor(id) {
            let auth = this.store.peekRecord('author',id);
            auth.deleteRecord();
            auth.save();
    },
    filterByName(param) {
        if (param !== '') {
            return this.store
          .query('author', { name: param }).then((results) => {
            return { query: param, results: results };
          });
        } else {
            return this.store
          .findAll('author').then((results) => {
            return { query: param, results: results };
          });
        }
    }
}
});
