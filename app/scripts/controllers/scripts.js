var app = angular.module('myApp', []);

app.controller('InvoiceCtrl', function ($scope) {
    $scope.qty = 1;
    $scope.cost = 9.5;
})
    .controller('GreetCtrl', function ($scope) {
        $scope.name='World';
    })
    .controller('ListCtrl', function ($scope) {
        $scope.names=['A1','A2','A3'];
    })
    .controller('Controller', function ($scope) {
        $scope.master={};
        $scope.update= function (user) {
            $scope.master=angular.copy(user);
        };
        $scope.resets= function () {
            $scope.user={};
         /*   $scope.update($scope.user)*/
        }
        
        $scope.isUnchanged= function (user) {
            return angular.equals(user, $scope.master);

        }
        
     $scope.resets();

    })
;
//指令
app.directive('draggable', function ($document) {

    var startX = 0, startY = 0, x = 0, y = 0;

    return function (scope, element, attr) {
        element.css({
            position: 'relative',
            border: '1px solid red',
            background: 'lightgrey',
            cursor: 'pointer'
        });

        element.bind('mousedown', function (event) {
            startX = event.screenX - x;
            startY = event.screenY - y;
            $document.bind('mousemove', mousemove);
            $document.bind('mouseup', mouseup);

        })

        function mousemove(event) {
            x = event.screenX - startX;
            y = event.screenY - startY;
            element.css({
                top: y + 'px',
                left: x + 'px'
            });
        }

        function mouseup(up) {
            $document.unbind('mousemove', mousemove);
            $document.unbind('mouseup', mouseup);
        }
    }

});
//----------------------------------------------------------------------------------------------------------------
/*模型到视图的更新中- 只要绑定的模型改变了，NgModelController#$formatters数组中的函数就会被轮流调用，所以每一个函数都有机会对数据进行格式化或者通过NgModelController#$setValidity来改变表单的验证状态。

 视图到模型的更新中- 相同的，只要用户与表单实现了就会，NgModelController#$setViewValue就会被调用。 这次是NgModelController#$parsers数组中的函数会被依次调用，每个函数都有机会来改变值或者通过NgModelController#$setValidity来改变表单的验证状态。*/
//自定义验证
var INTEGER_REGEXP=/^\-?\d*$/;

app.directive('integer', function () {
    return{
        require:'ngModel',
        //可以通过在你自己的指令中添加一个验证函数给ngModel的控制器来实现。要想获得控制器的引用，需要在指令中指定依
        link: function (scope,ele,attrs,ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if(INTEGER_REGEXP.test(viewValue)){
                    //每一个函数都有机会对数据进行格式化或者通过NgModelController#$setValidity来改变表单的验证状态。
                    ctrl.$setValidity('integer',true);
                    return viewValue;
                }else{
                    ctrl.$setValidity('integer',false);
                    return undefined;
                }
            })
        }
    };
});

var FLOAT_REGEXP=/^\-?\d*(\.|\,\d*)?$/;
app.directive('smartFloat', function () {
    return {
        require:'ngModel',
        link: function (scope,ele,attrs,ctrl) {

            ctrl.$parsers.unshift(function (viewValue) {
                if(FLOAT_REGEXP.test(viewValue)){
                    ctrl.$setValidity('float',true);
                    return parseFloat(viewValue.replace(',','.'));
                }else{
                    ctrl.$setValidity('float',false);
                    return undefined;
                }
            })

        }

    };
});
//----------------------------------------------------------------------------------------------------------------
//自定义表单控件
/*要和ngModel指令协同工作实现自定义控件，并且实现双向绑定的话，需要：

 实现render方法。这个方法负责在数据传递给NgModelController#$formatters后来渲染数据。
 在用户与控件交互并且模型需要被更新时，调用$setViewValue方法。这通常是在DOM的监听事件中完成的。（查看$compileProvider.directive来获取更多信息）*/
//内容可编辑

app.directive('contenteditable', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            // view -> model
            elm.bind('blur', function () {
                scope.$apply(function () {
                    ctrl.$setViewValue(elm.html());
                });
            });
            //实现render方法。这个方法负责在数据传递给NgModelController#$formatters后来渲染数据。
            // model -> view
            ctrl.$render = function (value) {
                elm.html(value);
            };
            //在用户与控件交互并且模型需要被更新时，调用$setViewValue方法。这通常是在DOM的监听事件中完成的。（查看$compileProvider.directive来获取更多信息）
            // load init value from DOM
            ctrl.$setViewValue(elm.html());
        }
    };
});