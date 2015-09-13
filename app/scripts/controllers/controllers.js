/**
 * Created by Administrator on 2015/9/13.
 */
angular.module('myApp',[])
    .controller('MainCtrl', function ($scope) {
        $scope.timeOfDay='morning';
        $scope.name='Nikki';
    })
    .controller('ChildCtrl', function ($scope) {
        $scope.name='Mattie';
    })
    .controller('BabyCtrl', function ($scope) {
        $scope.timeOfDay = 'evening';
        $scope.name = 'GingerBreak Baby';
    })


;