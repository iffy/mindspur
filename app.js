var app = angular.module('mindspur', ['firebase']);

app.value('FIREBASE_URL', 'https://mindspur.firebaseio.com');

app.factory('User', function(FIREBASE_URL, $firebaseAuth) {
  var User = {
    data: null,
  };

  var auth = $firebaseAuth(new Firebase(FIREBASE_URL));

  User.register = function(email, password) {
    auth.$createUser(email, password)
      .then(function(response) {
        console.log('made user', response);
        return User.signIn(email, password);
      })
      .then(function(authData) {
        console.log('logged in as', authData);
      })
      .catch(function(error) {
        console.error('Error: ', error);
      })
  }

  User.signIn = function(email, password) {
    return auth.$authWithPassword({
      email: email,
      password: password,
    })
    .then(function(authData) {
      User.data = authData;
      return authData;
    })
    .catch(function(error) {
      console.error('Error: ', error);
    })
  }

  User.signOut = function() {
    auth.$unauth()
    User.data = null;
  }
  return User;
})

app.controller('MainCtrl', function(User) {
  var main = this;

  main.user = User;
  
  return main;  
});


