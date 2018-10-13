import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name(i) { return '${i}';},
  picture() { return faker.internet.avatar(); }
});