import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    updateName(id) {
        console.log("yes");
        let newName = this.get('newName');
        let author = this.store.findRecord('author', id).then(function(auth) {
          auth.set('name', newName);
        });
    }
  }
});
