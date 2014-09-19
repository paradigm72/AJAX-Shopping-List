angular.module('shoppingList').
    directive('ngSlBlur', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.safeApply = function(fn) {
                    var phase = this.$root.$$phase;
                    if(phase == '$apply' || phase == '$digest') {
                        if(fn && (typeof(fn) === 'function')) {
                            fn(); }
                    } else {
                        this.$apply(fn); }
                };

                element.bind('blur', function() {
                    //when adding new items, we create rows here during $digest
                    //which makes $apply throw exceptions, so use "safeApply"
                    scope.safeApply(attrs.ngSlBlur);
                });
            }
        }
    }).
    directive('itemname', function($timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                originalName: '=',
                isGotten: '=',
                itemIndex: '=',
                colorOverride: '=',
                parentSaveNameEdit: '&saveFunc'
            },
            template:
                '<div>' +
                    '<div class="item-{{isGotten}} item-{{colorOverride}}"' +
                    ' ng-click="startModifyingName()"' +
                    ' ng-hide="beingEdited">{{originalName}}</div>' +
                    '<form ng-submit="stopModifyingName($event)">' +
                    '<input type="text" ng-model="itemText"' +
                    ' placeholder="{{originalName}}"' +
                    ' ng-show="beingEdited"' +
                    ' ng-sl-blur="cancelModifyingName($event)" ' +
                    ' ng-keydown="stopModifyingName($event)" />' +
                    '</form>' +
                    '</div>',
            link: function(scope, element) {
                scope.beingEdited = false;

                scope.startModifyingName = function startModifyingName() {
                    scope.beingEdited = true;
                    scope.itemText = scope.originalName;
                    $timeout(function() {
                        element[0].lastChild.lastChild.focus();
                    });
                };

                scope.stopModifyingName = function stopModifyingName($event) {
                    //If Enter pressed, save the edit. Note on some browser setups,
                    //Enter just accepts the PHP form anyway and calls through the submit code path.
                    if ($event.keyCode == 13)   {
                        scope.beingEdited = false;
                        scope.parentSaveNameEdit({
                            index: scope.itemIndex,
                            newName: scope.itemText,
                            originalName: scope.originalName
                        });
                    }
                };

                scope.cancelModifyingName = function cancelModifyingName($event) {
                    scope.beingEdited = false;
                    scope.itemText = "";
                };
            }
        }
    })
    .directive('ngSlFocusOnAdd', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                scope.$watch('setFocusNow', function(value) {
                    if (value === true) {
                        //$timeout(function() {
                        element[0].focus();
                        scope.setFocusNow = false;
                        //});
                    }
                });
            }
        }
    });