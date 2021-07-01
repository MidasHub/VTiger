/*+**********************************************************************************
 * Key Performance Indicators by SalesPlatform
 * Copyright (C) 2011-2016 SalesPlatform Ltd
 * All Rights Reserved.
 * This extension is licensed to be used within one instance of Vtiger CRM.
 * Source code or binaries may not be redistributed unless expressly permitted by SalesPlatform Ltd.
 * If you have any questions or comments, please email: extensions@salesplatform.ru
 ************************************************************************************/

Vtiger_Edit_Js("SPIndicators_Edit_Js",{},{
    
    container : false,
    foldersDependency : false,
    reportsKeysToNamesMap : false,
    memberSelectElement : false,
    
    init : function() {
		var statusToProceed = this.proceedRegisterEvents();
		if(!statusToProceed){
			return;
		}
		this.setContainer($('#spWidgetReport'));
	},

    /**
	 * Function to get the container which holds all the reports elements
	 * @return jQuery object
	 */
	getContainer : function() {
		return this.container;
	},

    /**
     * Function to set the reports container
     * @params : element - which represents the reports container
     * @return : current instance
     */
    setContainer : function(element) {
        this.container = element;
        return this;
	},
    
    getForm : function() {
        return $('#indicatorsMainForm', this.getContainer());
    },
    
    getIndicatorLayerForm : function() {
        return $('#indicatorForm', this.getContainer());
    },
    
    prepareExpressionCallbacks : function() {
        var thisInstance = this;
        var clearUIObject = this.getExpressionUI();
        var expressionArea = $("#expression", clearUIObject);
        
        /* Prepare picklist values for report use */
        var expressionReportsPicklist = $("#useReportValue", clearUIObject);
        expressionReportsPicklist.on('change', function() {
            if($(this).val() != '') {
                var oldValue = expressionArea.val();
                expressionArea.val(oldValue + ' $' + thisInstance.getReportVariableNameByKey($(this).val()) + '$');
                $(this).val('');
            }
        });
        
        $('.cancelLink', clearUIObject).on('click', function(e) {
            e.preventDefault();
            clearUIObject.hide();
        });
        
        $('.close', clearUIObject).on('click', function(e) {
            e.preventDefault();
            clearUIObject.hide();
        });
    },
    
    getExpressionUI : function() {
        return $('.modal', this.getContainer());
    }, 
    
    registerIndicatorFoldersDependency : function() {
        this.reportsKeysToNamesMap = JSON.parse($('#reportsIdsToNamesMap').val());
        this.foldersDependency = JSON.parse($('#foldersDependency').val());
        var thisInstance = this;
        $('#folder').on('change', function() {
            var newFolderName = $(this).val();
            var newReportsList = thisInstance.foldersDependency[newFolderName];
            
            var reportsSelect = '<option value="" default selected>' + app.vtranslate('JS_CHOOSE') + '</option>';
            $.each(newReportsList, function(index, value) {
                reportsSelect += '<option value="' + value.key + '">' + value.name + '</option>';
            });
            
            $('#useReportValue').empty().append(reportsSelect);
            $('#useReportValue').trigger('liszt:updated');
        });
    },
    
    /*
     * Function to register the click event for next button
     */
    registerSaveEvent : function(form) {
        var thisInstance = this;
        $("#saveSpWidgetReport").click(function(e) {
            e.preventDefault();
            if (form.validationEngine('validate')) {
                if($('#indicatorLayers tbody tr:not(.hide)').length < 1) {
                    Vtiger_Helper_Js.showPnotify(app.vtranslate('JS_FILL_INDICATOR_LAYERS'));
                    return;
                }
                
                /* Save order of modules elements ans serialaze form */
                var formData = form.serializeFormData();
                var moduleName = app.getModuleName();
                var params = {
                    module : moduleName,
                    action : "CheckDuplicate",
                    name : $.trim(formData.name),
                    record : formData.record,
                    isDuplicate : formData.isDuplicate
                };
                
                /* Send check request */
                var progressIndicatorElement = $.progressIndicator({
                    position : 'html',
                    blockInfo : {
                        enabled : true
                    }
                });
                AppConnector.request(params).then(
                    function(data) {
                        var response = data.result;
                        var result = response.success;

                        /* Vtiger CheckDuplicate Report returns true if report exists */
                        if(result == true) {
                            progressIndicatorElement.progressIndicator({
                                mode : 'hide'
                            });
                            var notification = {
                                title: app.vtranslate('JS_DUPLICATE_RECORD'),
                                text: response['message']
                            };
                            Vtiger_Helper_Js.showPnotify(notification);
                        } else {
                            $('[name="layers"]', form).val(thisInstance.serializeLayersData());
                            form.submit();
                        }
                    },
                    
                    function(error,err){
                        progressIndicatorElement.progressIndicator({
                            mode : 'hide'
                        });
                        var notification = {
                            title: app.vtranslate('JS_ERROR'),
                            text: app.vtranslate('JS_ERROR_SEND_SAVE_RECORD_REQUEST')
                        };
                        Vtiger_Helper_Js.showPnotify(notification);
                    }
                ); 
            }      
        });
        
    },
    
    serializeLayersData : function() {
        var serializedData = [];
        this.convetExpressions(true);
        $('#indicatorLayers tbody tr:not(.hide)').each(function() {
            serializedData.push($(this).data('details'));
        });
        
        return JSON.stringify(serializedData);
    },
    
    addFormValidation : function(form) {
        var opts = app.validationEngineOptions;
        opts['onValidationComplete'] = function(form,valid) {
            return valid;
        };
        opts['promptPosition'] = "bottomRight";
        form.validationEngine(opts);
    },
    
    showIndicatorUI : function(editElement) {
        var thisInstance = this;
        var modalWindow = this.getExpressionUI();
        var indicatorData = this.getDefaultIndicatorElementData();
        if(typeof editElement !== 'undefined') {
            indicatorData = editElement.data('details');
        }
       
       
        /* Prepare values of form */
        $("#expression", modalWindow).val(indicatorData.calculate_expression);
        $('[name="name"]', modalWindow).val(indicatorData.name);
        $('[name="usage_unit"]', modalWindow).val(indicatorData.usage_unit);
        $('[name="round"]', modalWindow).val(indicatorData.round);
        $('[name="description"]', modalWindow).val(indicatorData.description);
        
        /* Prepare save action */
        $('.btn-success', modalWindow).unbind('click');
        $('.btn-success', modalWindow).on('click', function(e) {
            e.preventDefault();
            var indicatorForm = thisInstance.getIndicatorLayerForm();
            thisInstance.addFormValidation(indicatorForm);
            if(indicatorForm.validationEngine('validate')) {
                if(typeof editElement !== 'undefined') {
                    thisInstance.updateIndicatorElement(editElement, thisInstance.getIndicatorModalData(modalWindow));
                } else {
                    thisInstance.createIndicatorLayerElement(thisInstance.getIndicatorModalData(modalWindow));
                }
                modalWindow.hide();
            }
        });
        
        modalWindow.show();
    },
    
    getIndicatorModalData : function(modalWindow) {
        return {
            name : $('[name="name"]', modalWindow).val(),
            calculate_expression :  $('[name="calculate_expression"]', modalWindow).val(),
            description :  $('[name="description"]', modalWindow).val(),
            usage_unit : $('[name="usage_unit"]', modalWindow).val(),
            round : $('[name="round"]', modalWindow).val()
        };
    },
    
    createIndicatorLayerElement : function(indicatorData) {
        var rowClone = $('#indicatorLayers tr.hide').clone();
        this.updateIndicatorElement(rowClone, indicatorData);
        rowClone.removeClass("hide");
        this.registerDeleteIndicatorEvent(rowClone);
        this.registerEditIndicatorEvent(rowClone);
        
        $('#indicatorLayers').append(rowClone);
    },
    
    updateIndicatorElement : function(indicatorElement, indicatorData) {
        indicatorElement.data('details', indicatorData);
        $(".indicatorName", indicatorElement).text(indicatorData.name); 
    },
    
    getDefaultIndicatorElementData : function() {
        return {
            name : '',
            calculate_expression : '',
            description : '',
            usage_unit : '',
            round : ''
        };
    },
    
    registerLayersSortableEvent : function() {
		var tbody = $("tbody", $('#indicatorLayers'));
		tbody.sortable({
			helper : function(e,ui){
				ui.children().each(function(index,element){
					element = jQuery(element);
					element.width(element.width());
				});
                
				return ui;
			},
			containment : tbody,
			revert : true
		});
	},

    registerAddIndicatorEvent : function() {
        var thisInstance = this;
        $("#addIndicator").on("click", function(e) {
            e.preventDefault();
            thisInstance.showIndicatorUI();
        });
    },
    
    registerEditIndicatorEvent : function(parentElement) {
        var thisInstance = this;
        if(typeof parentElement !== 'undefined') {
            $(".icon-pencil", parentElement).on("click", function(e) {
                thisInstance.showIndicatorUI($(this).closest("tr"));
            });
        } else {
            $(".icon-pencil").on("click", function(e) {
                thisInstance.showIndicatorUI($(this).closest("tr"));
            });
        }
    },
    
    registerDeleteIndicatorEvent : function(parentElement) {
        if(typeof parentElement !== 'undefined') {
            $(".icon-trash", parentElement).on("click", function() {
                var parentRow = $(this).closest("tr");
                parentRow.remove();
            });
        } else {
            $(".icon-trash").on("click", function() {
                var parentRow = $(this).closest("tr");
                parentRow.remove();
            });
        }
    },
    
    convetExpressions : function(toKeys) {
        var thisInstance = this;
        $('#indicatorLayers tbody tr:not(.hide)').each(function() {
            var details = $(this).data('details');
            thisInstance.reportsKeysToNamesMap.forEach(function(item) {
                var searchValue = (toKeys === true) ? '$' + item.name + '$' : '$' + item.key + '$';
                var replaceValue = (toKeys === true) ? '$' + item.key + '$' : '$' + item.name + '$';
                
                details.calculate_expression = details.calculate_expression.replace(
                    new RegExp(thisInstance.escape(searchValue),'g'), 
                    replaceValue
                );
            });
            
            $(this).data('details', details);
        });
    },
    
    getReportVariableNameByKey : function(key) {
        var reportName = '';
        this.reportsKeysToNamesMap.forEach(function(item) {
            if(item.key === key) {
                reportName = item.name;
            }
        });
        
        return reportName;
    },
    
    escape : function(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    },
    
	getMemberSelectElement : function () {
		if(this.memberSelectElement === false) {
			this.memberSelectElement = $('#memberList');
		}
		return this.memberSelectElement;
	},
    
    registerEventForCalculateMembersSelect2Element : function(){
		var editViewForm = this.getForm();
		var selectElement = this.getMemberSelectElement();
		var params = {};
		params.dropdownCss = {'z-index' : 0};
		params.formatSelection = function(object,container){
			var selectedId = object.id;
			var selectedOptionTag = editViewForm.find('option[value="' + selectedId + '"]');
			var selectedMemberType = selectedOptionTag.data('memberType');
			container.addClass(selectedMemberType);
			var element = '<div>' + selectedOptionTag.text() + '</div>';
			return element;
		};
		app.changeSelectElementView(selectElement, 'select2', params);
	},
    
    registerEvents : function(){
        var form = this.getForm();
        this.addFormValidation(form);
        this.registerSaveEvent(form);
        this.registerEventForCalculateMembersSelect2Element();
        this.registerLayersSortableEvent();
        this.registerAddIndicatorEvent();
        this.registerEditIndicatorEvent();
        this.registerDeleteIndicatorEvent();
        this.prepareExpressionCallbacks();
        this.registerIndicatorFoldersDependency();
        this.convetExpressions(false);
    }
});