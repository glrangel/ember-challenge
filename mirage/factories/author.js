import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name() { return faker.name.findName();},
  picture() { return faker.internet.avatar(); },
  afterCreate(author, server) {
      server.create('book', { author });
      server.create('book', { author });
  }
});
