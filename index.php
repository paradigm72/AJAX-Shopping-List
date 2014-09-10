<link rel="stylesheet" type="text/css" href="style.css" />

<!-- iPhone-specific stuff: -->
<link rel="stylesheet" media="only screen and (max-device-width: 480px)" href="highResStyle.css" type="text/css" />
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta names="apple-mobile-web-app-status-bar-style" content="black-translucent">

<!--Allow adding to the iOS home screen-->
<meta name="apple-mobile-web-app-capable" content="yes" />
<link rel="apple-touch-icon" href="thumbnail.png"/>

<!-- Angular-->
<script src="angular.js"></script>
<script src="shoppingListNg.js"></script>
<script src="shoppingListControlNg.js"></script>
<script src="shoppingListPickerNg.js"></script>

<title>Shopping List</title>
<html>


<body ng-app='shoppingList'>


<div ng-controller="ListControl" data-ng-init="retrieveList()">
    <div id="header" ng-click="retrieveList()">
        <img src='images/edit.png' class='button removeAll' ng-click="showListPicker()">
        Shopping List: listName
        <img src='images/remove.png' class='button removeAll' ng-click="removeAll()">
    </div>

    <div ng-controller="ListPicker" ng-show='pickerVisible'
         data-ng-init="initializeList()" class='popover' ng-style='popoverLeftStyle()'>
        <table class='lists'>
            <tr ng-repeat="list in listOfLists">
                <td>{{list.name}}</td>
            </tr>
        </table>
    </div>

        <table class="items">
        <tr ng-repeat="item in shoppingList">
            <td>
                <itemname original-name='item.text' is-gotten='item.isGotten'
                          item-index='$index' color-override='item.colorOverride'
                          save-func="saveNameEdit(index, newName, originalName)">
                </itemname>
            </td>
            <td class="button" ng-click="toggleGotten($index, item.text)">
                <img ng-show='item.isGotten' src='images/undo.png' class='button'>
                <img ng-show='!item.isGotten' src='images/gotten.png' class='button'>
            </td>
            <!--<td class='button' ng-click="removeItem($index, item.text)">
                <img src='images/remove.png' class='button'>
            </td>-->
        </tr>
    </table>

    <table class='items'>
    <form ng-submit='addNewItem()'>
        <tr id='inputRow'>
            <td class='newItemMarkerIcon button'>
                <img src='images/edit.png' class='button'>
            </td>
            <td class='newText'>
                <input type="text" ng-model="newItemText" ng-sl-focus-on-add
                       placeholder="Add new item..." id='newItem'>
            </td>
            <td class='addText' id='newItemCell'>
                <img src='images/add.png' class='addText'>
            </td>
        </tr>
    </form>
    </table>
</div>

</body>
</html>