import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
	// host: 'http://localhost:4200/api'
	host: 'https://crud-authors.herokuapp.com/'
});
