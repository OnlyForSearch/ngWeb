//一个服务模块，用来做服务的声明。
angular.module('xmpl.service', [])
    //对常量的定义，它们应该放在配置块的开始处。
    .value('greeter', {
        salutation: 'Hello',
        localize: function (localization) {
            this.salutation = localization.salutation;
        },
        greet: function (name) {
            return this.salutation + ' ' + name + '!';
        }
    })
    //对常量的定义，它们应该放在配置块的开始处。
    .value('user', {
        load: function (name) {
            this.name = name;
        }
    });
// 一个指令模块，用来做指令的声明。
angular.module('xmpl.directive', []);
// 一个过滤器模块，用来做过滤器声明。
angular.module('xmpl.filter', []).filter('greet', function () {
    return function (name) {
        return 'Hello ' + name + '!';
    }
});
;
// 一个依赖以上模块的应用级模块，它包含初始化代码。“依赖某个模块”意味着需要把这个被依赖的模块需要
// 在本块模块之前被加载。换句话说被依赖模块的配置块会在本模块配置块前被执行。运行块也是一样。任何一个
// 模块都只能被加载一次，即使它被多个模块依赖。
angular.module('xmpl', ['xmpl.service', 'xmpl.directive', 'xmpl.filter'])
    .run(function (greeter, user) {
        // This is effectively part of the main method initialization code这是有效的主要方法初始化代码的一部分
        greeter.localize({
            salutation: 'Bonjour'
        });
        user.load('World');
    })
    //设置好作用域对象的初始状态。
    // 给作用域对象增加行为。
    .controller('XmplController', function ($scope, greeter, user) {

        $scope.greeting = greeter.greet(user.name);
    })
    .controller('MyController', function ($scope) {
        $scope.username='World';
        $scope.sayHello=function(){
            $scope.greetings = 'Hello ' + $scope.username + '!';
        }
    })
    .controller('EmployeeController', function ($scope) {
        $scope.department='Engineering';
        $scope.employee= {
            name :'Joe the Manager',
            reports:[
                {name:'John Smith'},
                {name:'Mary Run'}
            ]
        };
    })
    .controller('EventController', function ($scope) {
        $scope.count = 0;
        $scope.$on('MyEvent', function () {
            $scope.count++;
        });
    })


;