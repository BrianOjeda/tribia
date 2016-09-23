angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


  function login()
  {
    setCookie('user',$("#userName").val(),1);
    setCookie('pass',$("#userPassword").val(),1);

   location.href="#/tab/chats";
  }

  $scope.login=login;
})

.controller('ChatsCtrl', function($scope, Chats) {
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var preguntasResp = new Firebase('https://miproyecto-739b3.firebaseio.com/tribia/');
  //$scope.chats = Chats.all();
  //$scope.remove = function(chat) {
   // Chats.remove(chat);
  //};
  $scope.user=getCookie('user');
  $scope.tribia=[];
  //$scope.respuestas=[];
  var contador=0;
  preguntasResp.on('child_added', function (snapshot) {
   contador=contador+1;
    var objs = snapshot.val();
    unapregunta=new Object();
    unapregunta.pregunta=objs.pregunta;
    unapregunta.respuesta1=objs.respuesta1;
    unapregunta.respuesta2=objs.respuesta2;
    unapregunta.respuesta3=objs.respuesta3;
     unapregunta.acertada=objs.acertada;
    unapregunta.nombre="pregunta"+contador;
    //$("#tribia").html("<h2>"+objs.pregunta+"</h2>");
   // $scope.preguntas.push(objs.pregunta);
    $scope.tribia.push(unapregunta);
  });

 
   //console.log($scope.preguntas.pregunta);
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
