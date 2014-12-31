var app = angular.module('mindspur', ['firebase', 'ui.router']);

app.value('FIREBASE_URL', 'https://mindspur.firebaseio.com');


app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  var troot = '/snippets';

  $locationProvider.html5Mode(false).hashPrefix('');
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: troot + '/home.html'
    })
    

    // Authentication
    .state('login', {
      url: '/auth/login',
      templateUrl: troot + '/login.html'
    })
    .state('signup', {
      url: '/auth/signup',
      templateUrl: troot + '/signup.html'
    })
    .state('forgotpassword', {
      url: '/auth/forgot',
      templateUrl: troot + '/forgotpassword.html'
    })

    // User-related pages
    .state('profile', {
      url: '/my-profile',
      templateUrl: troot + '/my-profile.html',
      controller: 'MyProfileCtrl as ctrl'
    })
});


app.factory('User', function(FIREBASE_URL, $firebaseAuth, $firebase, $state) {
  var User = {
    auth: null,
  };

  var auth = $firebaseAuth(new Firebase(FIREBASE_URL));
  User.auth = auth.$getAuth();

  var users = $firebase(new Firebase(FIREBASE_URL + '/users'));

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
      User.auth = authData;
      $state.go('home');
      return authData;
    })
    .catch(function(error) {
      console.error('Error: ', error);
    })
  }

  User.signOut = function() {
    auth.$unauth()
    User.auth = null;
    $state.go('home');
  }

  User.updateAttributes = function() {

  }

  return User;
});

app.controller('MainCtrl', function(User) {
  var main = this;

  main.user = User;
  
  return main;  
});


app.controller('MyProfileCtrl', function(User) {
  var ctrl = this;
  return ctrl;
})


