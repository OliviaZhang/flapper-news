var app = angular.module('flapperNews', ['ui.router']);
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/home.html',
                controller: 'MainCtrl'
            })
            .state('posts', {
                url: '/posts/{id}',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            });

        $urlRouterProvider.otherwise('home');
    }
]);
// inject the posts service into controller
app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
    $scope.test = "Hello World";
    $scope.posts = posts.posts;
    $scope.addPost = function(){
        if (!$scope.xxtitle || $scope.xxtitle == '') {return;}
        $scope.posts.push({
            title: $scope.xxtitle,
            link: $scope.link,
            upvotes: 16,
            comments: [
                {author: 'Joe', body: 'Cool post!', upvotes: 0},
                {author: 'Bob', body: 'Great idea but everthing is wrong!', upvotes: 0}
            ]

        });
        $scope.xxtitle = '';
        $scope.link = '';
    };

    $scope.incrementUpvotes = function(post) {
        post.upvotes += 1;
    };
}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function() {
        if ($scope.body === '') {return;}
        $scope.post.comments.push({
            body: $scope.body,
            author: 'user',
            upvotes: 0
        });
        $scope.body = '';
    };
}]);

app.factory('posts', [function() {
    var o = {
        posts: []
    };
    return o;
}]);
