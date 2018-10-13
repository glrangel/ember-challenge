import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createAuthor() {
      let newAuthor = this.get('newAuthor')
      let newRecord = this.store.createRecord('author', {
        name: newAuthor
      })
      newRecord.save()
    }
  }
});