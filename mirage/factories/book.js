import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
    author(i) { return i; },
    title() { return faker.random.words();},
    date() { return faker.date.past();}
});
