import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    debugger;
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('dashboard');
    }
  },

  actions: {
    signIn(email,password) {
      //var controller = this.get('controller');
      //var email = controller.get('email');
      //var password = controller.get('password');
      //var self = this;
      debugger;
      this.get('session').open('firebase', {
        provider: 'password',
        'email': email,
        'password': password
      }).then(this.transitionTo('dashboard'));//)
        /*
        .then(function (data) {
        console.log(data.currentUser);
        let uid = this.get('session').get('uid');
        this.store.findRecord('user', uid).then(user => {
          console.log(user.get('firstName'));
          self.transitionTo('user', uid);
        });
        */
      //});
    },

  }
});
