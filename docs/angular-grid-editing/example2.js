
var module = angular.module("example", ["angularGrid"]);

module.controller("exampleCtrl", function($scope, $timeout) {

    var selectData = [
        {value: '1', text: 'AAA'},
        {value: '2', text: 'BBB'},
        {value: '3', text: 'CCC'},
        {value: '4', text: 'DDD'},
        {value: '5', text: 'EEE'},
        {value: '6', text: 'FFF'},
        {value: '7', text: 'GGG'}
    ];

    var columnDefs = [
        {headerName: "Default String", field: "defaultString", width: 150, editable: true},
        {headerName: "Upper Case Only", field: "upperCaseOnly", width: 150, editable: true, newValueHandler: upperCaseNewValueHandler},
        {headerName: "Number", valueGetter: 'data.number', width: 150, editable: true, newValueHandler: numberNewValueHandler},
        {headerName: "Select", field: "setAngular", width: 175, editable: true, cellRenderer: cellRenderer, editControl: "select",editControlData: selectData},
    ];

    var data = [
        {defaultString: 'Apple', upperCaseOnly: 'APPLE', number: 11, setAngular: '1'},
        {defaultString: 'Orange', upperCaseOnly: 'ORANGE', number: 22, setAngular: '2'},
        {defaultString: 'Banana', upperCaseOnly: 'BANANA', number: 33, setAngular: '3'},
        {defaultString: 'Pear', upperCaseOnly: 'PEAR', number: 44, setAngular: '4'}
    ];

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: data,
        angularCompileRows: true
    };

    function cellRenderer(params) {
        for(var i=0; i<selectData.length; i++) {
            if(selectData[i].value == params.data.setAngular)
                return selectData[i].text;
        }
        return "";
    }
    
    function upperCaseNewValueHandler(params) {
        params.data[params.colDef.field] = params.newValue.toUpperCase();
    }

    function numberNewValueHandler(params) {
        var valueAsNumber = parseInt(params.newValue);
        if (isNaN(valueAsNumber)) {
            window.alert("Invalid value " + params.newValue + ", must be a number");
        } else {
            params.data.number = valueAsNumber;
        }
    }

});
