import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('authors', {path: '/authors'}, function(){
      this.route('author', {path: '/:author_id'});
  });

});

export default Router;
