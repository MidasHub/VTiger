mobileapp.controller('VtigerDetailController', function ($scope, $api, $mdToast) {
    var url = jQuery.url();
    $scope.module = url.param('module');
    $scope.record = url.param('record');

    $scope.parentRecord = url.param('parentRecord');
    $scope.parentModule = url.param('parentModule');

    $scope.describeObject = null;
    $scope.fields = null;
    $scope.createable = null;
    $scope.updateable = null;
    $scope.deleteable = null;
    $scope.recordData = null;
    $scope.buttons = [];

    $scope.oneAtATime = false;
    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false,
        open : true
    };

    $api('describe', {module:$scope.module}, function(e, r) {
        $scope.describeObject = r.describe;
        $scope.fields = $scope.describeObject.fields;
        $scope.createable = $scope.describeObject.createable;
        $scope.updateable = $scope.describeObject.updateable;
        $scope.deleteable = $scope.describeObject.deleteable;
        $scope.loadRecord();
        $scope.getButton();
    });
    
    $scope.gobacktoUrl = function(){
        //window.history.back();
        // Binding DetailView back action to List view. (as Edit + Save puts back in wrong state)

        if($scope.parentRecord != undefined && $scope.parentModule != undefined ) {
            window.location.href = "index.php?module=" + $scope.module + "&view=List&parentRecord="+$scope.parentRecord+"&parentModule="+$scope.parentModule+ "&app=" + $scope.selectedApp;
        }else{
            window.location.href = (window.location.href.replace(/view=Detail/, "view=List"));
        }
    };
    
    var _VTIGER_RESTRICTIONS = {
	'Vtiger' : {
		'View': {
			'Detail': {
				'Fields': {
					'Ignore_Fields': [
						'modifiedby',
						'last_contacted_via',
						'last_contacted_on',
						'reassign_count',
						'from_portal',
						'prev_sales_stage',
						'txtAdjustment',
						'hdnGrandTotal',
						'hdnTaxType',
						'hdnSubTotal',
						'currency_id',
						'conversion_rate',
						'pre_tax_total',
						'received',
						'balance',
						'hdnS_H_Amount',
						'paid',
						'tags',
						'shipping_&_handling',
						'shipping_&_handling_shtax1',
						'shipping_&_handling_shtax2',
						'shipping_&_handling_shtax3',
						'starred',
						'hdnS_H_Percent',
						'tax1',
						'tax2',
						'tax3',
                                                
					]
				}
			}
		}
	}
    };
    $scope.lineitems = [];
    $scope.lineItemsSummary = {};
    
    $scope.prepareLineItems = function(response){
         $scope.lineitems = response.record['LineItems'];
         var processedLineItems = [];
         for(var index in $scope.lineitems) {
             var item = $scope.lineitems[index];
             processedLineItems.push(item);
         }

         var lineItemFinalDetails = response.record['LineItems_FinalDetails'][1]['final_details'];
         for(var index in response.record['LineItems_FinalDetails']) {
             var final_detail = response.record['LineItems_FinalDetails'][index];
             processedLineItems[index - 1]['netPrice'] = final_detail["netPrice"+index];
         }
         $scope.lineitems = processedLineItems;
         $scope.lineItemsSummary['pre_tax_total'] = response.record.pre_tax_total;
         $scope.lineItemsSummary['sub_total'] = response.record.hdnSubTotal;
         $scope.lineItemsSummary['grand_total'] = response.record.hdnGrandTotal;
         $scope.lineItemsSummary['group_discount'] = response.record.hdnDiscountAmount;
         $scope.lineItemsSummary['total_tax'] = lineItemFinalDetails['tax_totalamount'];
         $scope.lineItemsSummary['totalAfterDiscount'] = lineItemFinalDetails['totalAfterDiscount'];
         $scope.lineItemsSummary['adjustment'] = lineItemFinalDetails['adjustment'];
    };
    
    $scope.loadRecord = function () {
        $api('fetchRecordWithGrouping', {module:$scope.module, record:$scope.record, view_mode:'web'}, function(e,r) {
            $scope.record_label = r.record.label;
            $scope.recordId = r.record.id;
            $scope.recordName = r.record.recordName;
            if($scope.module == 'Invoice' || $scope.module == 'Quotes' || $scope.module == 'PurchaseOrder' || $scope.module == 'SalesOrder'){
                $scope.prepareLineItems(r);
            }
            var processedData = [];
            var headerField = [];
            var ignoreFields  = _VTIGER_RESTRICTIONS['Vtiger']['View']['Detail']['Fields']['Ignore_Fields'];
            // for(var index in $scope.fields) {
            //     if(ignoreFields.indexOf($scope.fields[index].name) === -1) {
            //         var value = r.record[$scope.fields[index].name];
            //         // if(typeof value === 'object') {
            //         //     processedData.push({label:$scope.fields[index].label, value:value.label, type:$scope.fields[index].type.name});
            //         //
            //         // } else {
            //         //     processedData.push({label:$scope.fields[index].label, value:value, type:$scope.fields[index].type.name});
            //         // }
            //         processedData.push(r.record.blocks);
            //     }
            // }
            // var countHeader = 1;

            for(var field in r.record.headerField){
                var fieldObj = r.record.headerField[field];
                if(ignoreFields.indexOf(fieldObj.name === -1)) {
                    var value = fieldObj.value;
                    if (typeof value === 'object' && value != null) {
                        r.record.headerField[field].valueTruncate = value.labelTruncate;
                    }
                }
                headerField.push(r.record.headerField[field])
            }


            for (var index in r.record.blocks) {
                for (var field in r.record.blocks[index].fields) {
                    var fieldObj = r.record.blocks[index].fields[field];
                    if(ignoreFields.indexOf(fieldObj.name === -1)) {
                        var value = fieldObj.value;
                        if(typeof value === 'object' && value != null) {
                            // if(fieldObj.headerField == 'true'){
                            //     headerField.push({fieldname:fieldObj.name,fieldvalue:value.label,fieldType:fieldObj.fieldType,relatedModule:fieldObj.relatedModule,uitype:fieldObj.uitype,color:fieldObj.color})
                            //
                            //     // if(value.label){
                            //     //     if(countHeader % 2 == 0){
                            //     //         headerField.push({fieldname:fieldObj.name,fieldvalue:value.label,fieldType:fieldObj.fieldType,relatedModule:fieldObj.relatedModule,uitype:fieldObj.uitype,evenHeaderCheck:1})
                            //     //     }else{
                            //     //         headerField.push({fieldname:fieldObj.name,fieldvalue:value.label,fieldType:fieldObj.fieldType,relatedModule:fieldObj.relatedModule,uitype:fieldObj.uitype})
                            //     //     }
                            //     //     countHeader++;
                            //     // }else{
                            //     //     headerField.push({fieldname:fieldObj.name,fieldvalue:value.label,fieldType:fieldObj.fieldType,relatedModule:fieldObj.relatedModule,uitype:fieldObj.uitype})
                            //     // }
                            // }
                            r.record.blocks[index].fields[field].value = value.label;
                        }else{
                            // if(fieldObj.headerField == 'true'){
                            //     headerField.push({fieldname:fieldObj.name,fieldvalue:value,fieldType:fieldObj.fieldType,relatedModule:fieldObj.relatedModule,uitype:fieldObj.uitype,color:fieldObj.color})
                            //     // if(value){
                            //     //     if(countHeader % 2 == 0){
                            //     //         headerField.push({fieldname:fieldObj.name,fieldvalue:value,fieldType:fieldObj.fieldType,relatedModule:fieldObj.relatedModule,uitype:fieldObj.uitype,evenHeaderCheck:1})
                            //     //     }else{
                            //     //         headerField.push({fieldname:fieldObj.name,fieldvalue:value,fieldType:fieldObj.fieldType,relatedModule:fieldObj.relatedModule,uitype:fieldObj.uitype})
                            //     //     }
                            //     //     countHeader++;
                            //     // }else{
                            //     //     headerField.push({fieldname:fieldObj.name,fieldvalue:value,fieldType:fieldObj.fieldType,relatedModule:fieldObj.relatedModule,uitype:fieldObj.uitype})
                            //     // }
                            // }
                        }
                    }
                }
                processedData.push({label:r.record.blocks[index].label,fields:r.record.blocks[index].fields});
            }
            // }
            $scope.headerField = headerField;
            $scope.pageTitle = r.record.label;
            $scope.recordData = processedData;
            var myInterval = setInterval(function () {
                var check = false;
                $('#tab-content-0').find('.check-nl2br').each(function(){
                    $(this).html($(this).text());
                    $(this).removeClass('check-nl2br');
                    check = true;
                });
                if(check){
                    clearInterval(myInterval);
                }
            },100)
        });
        //related tab
        
        $api('fetchRecord', {mode:'getRelatedRecordCount', module:$scope.module, record:$scope.record}, function(er, re) {
            if(re){
                $scope.relatedModules = re;
            }
        });
        $api('fetchRecord', {mode:'getActiveComment', module:$scope.module, record:$scope.record}, function(er, re) {
            if(re){
                $scope.modComments = re.commentActive;
                $scope.commentVTE = re.commentVTE;
                if($scope.modComments){
                    $api('fetchRecord', {mode:'getAllComment', record:$scope.record}, function(er, re) {
                        if(re){
                            $scope.allComment = re;
                        }
                    });
                };
            }
        });
        var myInterval = setInterval(function () {
            var check = false;
            $('#tab-content-3').find('span.check-nl2br').each(function(){
                $(this).html($(this).text());
                $(this).removeClass('check-nl2br');
                check = true;
            });
            if(check){
                clearInterval(myInterval);
            }
        },100)
    };
    $scope.toastPosition = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };

    $scope.getButton = function () {
        $api('fetchButtons',{module:$scope.module, record:$scope.record}, function(e, r){
            $scope.buttons = r.buttons;
        });
    };

    $scope.clickButton = function (buttonid) {
        window.location.href = "index.php?module=" + $scope.module + "&view=Edit&record="+$scope.record+"&app=" + $scope.selectedApp + "&buttonid=" + buttonid;
    }

    $scope.getToastPosition = function () {
        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            }).join('');
    };
    $scope.detailViewEditEvent = function(id){
        window.location.href = "index.php?module=" + $scope.module + "&view=Edit&record="+$scope.record+"&app=" + $scope.selectedApp;
    };

    $scope.isUpdateable = function() {
        return ($scope.updateable)? true : false;
    };
    
    $scope.isDeleteable = function() {
        return ($scope.deleteable)? true : false;
    };
    $scope.showRelatedList = function(module){
        window.location.href = "index.php?module="+module+"&view=List&parentRecord="+$scope.record+"&parentModule="+$scope.module+"&app="+$scope.selectedApp;
    };
    $scope.postComment = function(e) {
        var comment = $('[name="commentcontent"]').val();
        if (comment !="") {
            $api('addRecordComment', {
                commentcontent: comment,
                module: $scope.module,
                related_to: $scope.record
            }, function (er, re) {
                if (re) {
                    var message = 'The comment has been posted';
                    var toast = $mdToast.simple().content(message).position($scope.getToastPosition()).hideDelay(1000);
                    $('[name="commentcontent"]').val('');
                    $mdToast.show(toast);
                    if ($scope.modComments) {
                        $api('fetchRecord', {mode: 'getAllComment', record: $scope.record}, function (er, re) {
                            if (re) {
                                $scope.allComment = re;
                            }
                        });
                        var myInterval = setInterval(function () {
                            var check = false;
                            $('#tab-content-3').find('span.check-nl2br').each(function () {
                                $(this).html($(this).text());
                                $(this).removeClass('check-nl2br');
                                check = true;
                            });
                            if (check) {
                                clearInterval(myInterval);
                            }
                        }, 100)
                    }
                }
            });
        }
    };
    $scope.parseDate = function (date) {
        return new Date(Date.parse(date));
    };
    $scope.showMaps = function (location) {
        if(location == ''){
            var message = 'Please add address information to view on map';
            var toast = $mdToast.simple().content(message).position($scope.getToastPosition()).hideDelay(1000);
            $mdToast.show(toast);
        }else{
            window.open(getQueryString(location));
        }
    };
    $scope.downloadFile = function (info) {
        $api('DownloadFile', {info : info}, function(er, re) {
            if(re){
                window.open(re.link_file, '_blank');
            }
        });

    };
    var getQueryString = function (address) {
        address = address.replace(/,/g,' ');
        address = address.replace(/ /g,'+');
        return "https://maps.google.com/maps?q=" + address + "&zoom=14&size=512x512&maptype=roadmap&sensor=false";
    }
});


/** WIP inline EDIT Controller */
mobileapp.controller('InlineEditorController', function($scope){

	// $scope is a special object that makes
	// its properties available to the view as
	// variables. Here we set some default values:

	$scope.showtooltip = false;
	$scope.value = 'Edit me.';
    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

	// Some helper functions that will be
	// available in the angular declarations

	$scope.hideTooltip = function(){

		// When a model is changed, the view will be automatically
		// updated by by AngularJS. In this case it will hide the tooltip.

		$scope.showtooltip = false;
	};

	$scope.toggleTooltip = function(e){
		e.stopPropagation();
		$scope.showtooltip = !$scope.showtooltip;
	};
});
