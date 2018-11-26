import DS from 'ember-data';


export default DS.Model.extend({
	name: DS.attr('string'),
	picture: DS.attr(),
	books: DS.hasMany('book')
});
