import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
	//Use host 1 if hosting locally or host 2 for heroku also update mirage/config.js
	
	// /* host 1 */ host: 'http://localhost:4200/api'
	/* host 2*/	host: 'https://crud-authors.herokuapp.com/api'
});
