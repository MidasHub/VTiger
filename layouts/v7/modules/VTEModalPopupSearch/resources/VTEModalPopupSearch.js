/* ********************************************************************************
 * The content of this file is subject to the Custom Header/Bills ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */

Vtiger.Class("VTEModalPopupSearch_Js", {
    instance: false,
    getInstance: function () {
        if (VTEModalPopupSearch_Js.instance == false) {
            var instance = new VTEModalPopupSearch_Js();
            VTEModalPopupSearch_Js.instance = instance;
            return instance;
        }
        return VTEModalPopupSearch_Js.instance;
    }
},{
    registerVTEModalPopupSearchEvent:function(){
        var thisInstance=this;
        var params = {};
        params.module = 'VTEModalPopupSearch';
        params.src_module = app.getModuleName();
        params.action = 'ActionAjax';
        params.mode = 'getFieldWithConditons';
        app.request.get({data: params}).then(function (error, data) {
            if(error === null) {
                var fieldList = data.conditons;
                var res ={};
                $.each(fieldList, function(i, item) {
                    var eleField = $('#EditView').find('input[name="'+item.field_name+'"]');
                    if(app.getViewName()!='Edit'){
                        var detailContentsHolder = thisInstance.getContentHolder();
                        if (jQuery('#QuickCreate').length > 0) {
                            eleField = jQuery('#QuickCreate').find('input[name="' + item.field_name + '"]');
                        }
                        else if(detailContentsHolder.length >0){
                            eleField = detailContentsHolder.find('input[name="'+item.field_name+'"]');
                        }
                    }

                    var divClosed = eleField.parent('.input-group')
                    var eleRelatedPopup = divClosed.find('span.relatedPopup');
                    if(eleRelatedPopup.length<=0){
                        eleRelatedPopup = divClosed.find('span.VTEModalPopupSearchRecord');
                        eleRelatedPopup.removeAttr( "data-vtemodalpopupsearch-id");
                    }
                    eleRelatedPopup.addClass('VTEModalPopupSearchRecord').removeClass('relatedPopup');
                    res[i]=item.module_field;
                    eleRelatedPopup.attr( "data-vtemodalpopupsearch-id", JSON.stringify(res));
                    eleRelatedPopup.attr( "data-vtemodalpopupsearch-searchfield", item.condition_field);
                })
                jQuery('span.VTEModalPopupSearchRecord').on('click',function(e){
                    thisInstance.openPopUp(e);
                });
            }else{
                // to do
            }
        });

    },
    registerVTEModalPopupSearchForQuickCreate:function(form){
        var thisInstance=this;
        var params = {};
        var src_module = form.find('input[name="module"]').val();
        params.module = 'VTEModalPopupSearch';
        params.src_module = src_module;
        params.action = 'ActionAjax';
        params.mode = 'getFieldWithConditons';
        app.request.get({data: params}).then(function (error, data) {
            if(error === null) {
                var fieldList = data.conditons;
                var res ={};
                $.each(fieldList, function(i, item) {
                    var eleField = form.find('input[name="' + item.field_name + '"]');
                    var divClosed = eleField.parent('.input-group')
                    var eleRelatedPopup = divClosed.find('span.relatedPopup');
                    if(eleRelatedPopup.length<=0){
                        eleRelatedPopup = divClosed.find('span.VTEModalPopupSearchRecord');
                        eleRelatedPopup.removeAttr( "data-vtemodalpopupsearch-id");
                    }
                    eleRelatedPopup.addClass('VTEModalPopupSearchRecord').removeClass('relatedPopup');
                    res[i]=item.module_field;
                    eleRelatedPopup.attr( "data-vtemodalpopupsearch-id", JSON.stringify(res));
                    eleRelatedPopup.attr( "data-vtemodalpopupsearch-searchfield", item.condition_field);
                })
                jQuery('span.VTEModalPopupSearchRecord').on('click',function(e){
                    thisInstance.openPopUp(e);
                });
            }else{
                // to do
            }
        });

    },
    /*
     * Function to get Field parent element
     */
    getParentElement : function(element) {
        var parent = element.closest('td');
        // added to support from all views which may not be table format
        if(parent.length === 0) {
            parent = element.closest('.td').length ?
                element.closest('.td') : element.closest('.fieldValue');
        }
        return parent;
    },
    /*
     * Function to set reference field value
     */
    setReferenceFieldValue : function(container, params) {
        var sourceField = container.find('input.sourceField').attr('name');
        var fieldElement = container.find('input[name="'+sourceField+'"]');
        var sourceFieldDisplay = sourceField+"_display";
        var fieldDisplayElement = container.find('input[name="'+sourceFieldDisplay+'"]');
        var popupReferenceModuleElement = container.find('input[name="popupReferenceModule"]').length ? container.find('input[name="popupReferenceModule"]') : container.find('input.popupReferenceModule');
        var popupReferenceModule = popupReferenceModuleElement.val();
        var selectedName = params.name;
        var id = params.id;

        if (id && selectedName) {
            if(!fieldDisplayElement.length) {
                fieldElement.attr('value',id);
                fieldElement.data('value', id);
                fieldElement.val(selectedName);
            } else {
                fieldElement.val(id);
                fieldElement.data('value', id);
                fieldDisplayElement.val(selectedName);
                if(selectedName) {
                    fieldDisplayElement.attr('readonly', 'readonly');
                } else {
                    fieldDisplayElement.removeAttr("readonly");
                }
            }

            if(selectedName) {
                fieldElement.parent().find('.clearReferenceSelection').removeClass('hide');
                fieldElement.parent().find('.referencefield-wrapper').addClass('selected');
            }else {
                fieldElement.parent().find('.clearReferenceSelection').addClass('hide');
                fieldElement.parent().find('.referencefield-wrapper').removeClass('selected');
            }
            fieldElement.trigger(Vtiger_Edit_Js.referenceSelectionEvent, {'source_module' : popupReferenceModule, 'record' : id, 'selectedName' : selectedName});
        }
    },
    relatedContactElement : false,

    recurringEditConfirmation : false,

    getRelatedContactElement : function(form) {
        if(typeof form == "undefined") {
            form = this.getForm();
        }
        this.relatedContactElement =  jQuery('#contact_id_display', form);
        return this.relatedContactElement;
    },
    isEvents : function(form) {
        if(typeof form === 'undefined') {
            form = this.getForm();
        }
        var moduleName = form.find('[name="module"]').val();
        if(form.find('.quickCreateContent').length > 0 && form.find('[name="calendarModule"]').val()==='Events') {
            return true;
        }
        if(moduleName === 'Events') {
            return true;
        }
        return false;
    },
    getPopUpParams : function (element) {
        var thisInstance = this;
        var parentElem = thisInstance.getParentElement(element);

        var sourceModule = parentElem.find('input[name="popupReferenceModule"]').val();
        var params = {};
        var recordId = $('[name="record"]').val();
        params.module = 'VTEModalPopupSearch';
        params.view = 'Popup';
        params.parent_module = sourceModule;
        params.src_module =  app.getModuleName();
        params.recordid = recordId;

        var vtePopupSearch = element.data('vtemodalpopupsearch-id');
        for(var k in vtePopupSearch){
            if(sourceModule==vtePopupSearch[k]){
                params.vtemodalpopupsearch_id =k;
            }
        }
        var condition_field =  element.data('vtemodalpopupsearch-searchfield');
        var arrFields={};
        if(condition_field.length>0){
            arrFields = condition_field.split(',');
        }
        var form = this.getForm();
        var fieldValue='';
        if(app.getViewName()=='Detail') {
            if (jQuery('#QuickCreate').length > 0 || jQuery('#quickEditForm').length > 0) {
                var moduleQuickView = $('[name="module"]').val();
                params.src_module =  moduleQuickView;
                $.each(arrFields, function (i, item) {
                    fieldValue = $('#QuickCreate').find('[name="' + item + '"]').val();
                    form = jQuery('#QuickCreate');
                    var relatedContactElement = thisInstance.getRelatedContactElement(form);
                    if(thisInstance.isEvents(form) && relatedContactElement.length) {
                        fieldValue = relatedContactElement.val().split(',').join(';');
                    }
                    params[item] = fieldValue;
                })
            }else {
                params.recordid = app.getRecordId();
            }
        }else {
            $.each(arrFields, function (i, item) {
                 fieldValue = $('#EditView').find('[name="' + item + '"]').val();
                if(typeof fieldValue =='undefined'){
                    if (jQuery('#QuickCreate').length > 0) {
                        fieldValue = $('#QuickCreate').find('[name="' + item + '"]').val();
                        form = jQuery('#QuickCreate');
                    }
                }
                var relatedContactElement = thisInstance.getRelatedContactElement(form);
                if(thisInstance.isEvents(form) && relatedContactElement.length) {
                    fieldValue = relatedContactElement.val().split(',').join(';');
                }
                params[item] = fieldValue;
            })
        }
        return params;
    },
    /**
     * Function to open popup list modal
     */
    openPopUp : function(e) {
        var thisInstance = this;
        var element = jQuery(e.currentTarget);
        var parentElem = thisInstance.getParentElement(jQuery(e.target));

        var params = this.getPopUpParams(element);

        var isMultiple = false;
        if(params.multi_select) {
            isMultiple = true;
        }

        var sourceFieldElement = jQuery('input[class="sourceField"]',parentElem);

        var prePopupOpenEvent = jQuery.Event(Vtiger_Edit_Js.preReferencePopUpOpenEvent);
        sourceFieldElement.trigger(prePopupOpenEvent);

        if(prePopupOpenEvent.isDefaultPrevented()) {
            return ;
        }
        var popupInstance = Vtiger_Popup_Js.getInstance();

        app.event.off(Vtiger_Edit_Js.popupSelectionEvent);
        app.event.one(Vtiger_Edit_Js.popupSelectionEvent,function(e,data) {
            var responseData = JSON.parse(data);
            var dataList = new Array();
            jQuery.each(responseData, function(key, value){
                var counter = 0;
                for(var valuekey in value){
                    if(valuekey == 'name') continue;
                    if(typeof valuekey == 'object') continue;
//					var referenceModule = value[valuekey].module;
//					if(typeof referenceModule == "undefined") {
//						referenceModule = value.module;
//					}
//					if(parentElem.find('[name="popupReferenceModule"]').val() != referenceModule) continue;
//
                    var data = {
                        'name' : value.name,
                        'id' : key
                    }
                    if(valuekey == 'info') {
                        data['name'] = value.name;
                    }
                    dataList.push(data);
                    if(!isMultiple && counter === 0) {
                        counter++;
                        thisInstance.setReferenceFieldValue(parentElem, data);
                    }
                }
            });

            if(isMultiple) {
                sourceFieldElement.trigger(Vtiger_Edit_Js.refrenceMultiSelectionEvent,{'data':dataList});
            }
            sourceFieldElement.trigger(Vtiger_Edit_Js.postReferenceSelectionEvent,{'data':responseData});
        });
        popupInstance.showPopup(params,Vtiger_Edit_Js.popupSelectionEvent,function() {});
    },
    /**
     * Function which will register reference field clear event
     * @params - container <jQuery> - element in which auto complete fields needs to be searched
     */
    registerClearReferenceSelectionEvent : function(container) {
        container.find('.clearReferenceSelection').on('click', function(e){
            var element = jQuery(e.currentTarget);
            var parentTdElement = element.closest('td');
            var fieldNameElement = parentTdElement.find('.sourceField');
            var fieldName = fieldNameElement.attr('name');
            fieldNameElement.val('');
            parentTdElement.find('[name="'+fieldName+'_display"]').removeAttr("disabled").removeAttr('readonly').val('');
            element.trigger(Vtiger_Edit_Js.referenceDeSelectionEvent);
            e.preventDefault();
        });

        container.find('.sourceField').on(Vtiger_Edit_Js.postReferenceSelectionEvent,function(e,result){
            var fieldName = jQuery(this).attr("name");
            var element = container.find('[name="'+fieldName+'_display"]');
            element.attr("disabled","disabled");
        });
    },

    getReferencedModuleName : function(parenElement){
        return jQuery('input[name="popupReferenceModule"]',parenElement).val();
    },

    searchModuleNames : function(params) {
        var aDeferred = jQuery.Deferred();

        if(typeof params.module == 'undefined') {
            params.module = 'VTEModalPopupSearch';
        }

        if(typeof params.action == 'undefined') {
            params.action = 'BasicAjax';
        }

        app.request.post({data:params}).then(
            function(err,data){
                if(err == null){
                    aDeferred.resolve(data);
                }else{
                    aDeferred.reject();
                }
            }
        );
        return aDeferred.promise();
    },
    /**
     * Function to get reference search params
     */
    getReferenceSearchParams : function(element,container){
        var tdElement = jQuery(element).closest('td');
        var params = {};
        var searchModule = this.getReferencedModuleName(tdElement);
        params.search_module = searchModule;
        var spanElement = tdElement.find('.VTEModalPopupSearchRecord');

        if(spanElement.length>0) {
            var data = {};
            var condition_field = spanElement.data('vtemodalpopupsearch-searchfield');
            var arrFields = {};
            if (condition_field.length > 0) {
                arrFields = condition_field.split(',');
            }
            $.each(arrFields, function (i, item) {
                var fieldValue = container.find('[name="' + item + '"]').val();
                data[item]=fieldValue;
            })
            params.data = data;
            var vtePopupSearch = spanElement.data('vtemodalpopupsearch-id');
            for(var k in vtePopupSearch){
                if(searchModule==vtePopupSearch[k]){
                    params.vtemodalpopupsearch_id =k;
                }
            }
        }

        return params;
    },
    /**
     * Function which will handle the reference auto complete event registrations
     * @params - container <jQuery> - element in which auto complete fields needs to be searched
     */
    registerAutoCompleteFields : function(container) {
        var thisInstance = this;
        container.find('input.autoComplete').autocomplete({
            'minLength' : '3',
            'source' : function(request, response){
                //element will be array of dom elements
                //here this refers to auto complete instance
                var inputElement = jQuery(this.element[0]);
                var searchValue = request.term;
                var params = thisInstance.getReferenceSearchParams(inputElement,container);
                params.search_value = searchValue;
                thisInstance.searchModuleNames(params).then(function(data){
                    var reponseDataList = [];
                    var serverDataFormat = data;
                    if(serverDataFormat.length <= 0) {
                        //jQuery(inputElement).val('');
                        serverDataFormat = new Array({
                            'label' : app.vtranslate('JS_NO_RESULTS_FOUND'),
                            'type'  : 'no results'
                        });
                    }
                    for(var id in serverDataFormat){
                        var responseData = serverDataFormat[id];
                        reponseDataList.push(responseData);
                    }
                    response(reponseDataList);
                });
            },
            'select' : function(event, ui ){
                var selectedItemData = ui.item;
                //To stop selection if no results is selected
                if(typeof selectedItemData.type != 'undefined' && selectedItemData.type=="no results"){
                    return false;
                }
                selectedItemData.name = selectedItemData.value;
                var element = jQuery(this);
                var tdElement = element.closest('td');
                thisInstance.setReferenceFieldValue(tdElement, selectedItemData);

                var sourceField = tdElement.find('input[class*="sourceField"]').attr('name');
                var fieldElement = tdElement.find('input[name="'+sourceField+'"]');

                fieldElement.trigger(Vtiger_Edit_Js.postReferenceSelectionEvent,{'data':selectedItemData});
            },
            /*'change' : function(event, ui) {
                var element = jQuery(this);
                //if you dont have readonly attribute means the user didnt select the item
                if(element.attr('readonly')== undefined) {
                    element.closest('td').find('.clearReferenceSelection').trigger('click');
                }
            }*/
        });
    },
    formElement : false,

    getForm : function() {
        if(this.formElement === false){
            this.formElement = jQuery('#EditView');
        }
        return this.formElement;
    },
    detailViewContentHolder : false,
    getContentHolder : function() {
        if(this.detailViewContentHolder == false) {
            this.detailViewContentHolder = jQuery('div.details');
        }
        return this.detailViewContentHolder;
    },
    /**
     * To Register Ajax Edit Event
     * @returns {undefined}
     */
    registerAjaxEditEvent : function(){
        var thisInstance = this;
        var detailContentsHolder = this.getContentHolder();
        detailContentsHolder.on('click','table.detailview-table td.fieldValue .editAction', function(e) {
            thisInstance.registerVTEModalPopupSearchEvent();
            var element = jQuery(e.currentTarget);
            var parentElem = thisInstance.getParentElement(jQuery(e.target));
            thisInstance.registerAutoCompleteFields(parentElem);
        });
        detailContentsHolder.on('click','table.summary-table td.fieldValue .editAction', function(e){
            thisInstance.registerVTEModalPopupSearchEvent();
            var element = jQuery(e.currentTarget);
            var parentElem = thisInstance.getParentElement(jQuery(e.target));
            thisInstance.registerAutoCompleteFields(parentElem);
        });

        app.event.one('post.QuickCreateForm.show', function (e, form) {
            thisInstance.registerVTEModalPopupSearchForQuickCreate(form);
            thisInstance.registerAutoCompleteFields(form);
        });
    },
    registerEvents: function(){
        this.registerAjaxEditEvent();
        if(app.getViewName() == 'Edit'){
            this.registerVTEModalPopupSearchEvent();
        }
        this.registerAutoCompleteFields(this.getForm());
    }
});

jQuery(document).ready(function () {
    // Only load when click quick create
    $('.quickCreateModule').on('click',function(){
        jQuery( document ).ajaxComplete(function(event, xhr, settings) {
            var url = settings.data;
            if(typeof url == 'undefined' && settings.url) url = settings.url;
            if(settings.data != undefined && typeof  settings.data== 'string' && settings.data.indexOf('view=QuickCreateAjax') != -1) {
                var form = $('form[name="QuickCreate"]');
                if (form != undefined && form.length > 0) {
                    var intervalRunDefaultFunc = setInterval(function () {
                        if (jQuery('#QuickCreate').length > 0){
                            var instance = new VTEModalPopupSearch_Js();
                            instance.registerEvents();
                            clearInterval(intervalRunDefaultFunc);
                        }
                    }, 300);

                }
            }
        });
    });

	// Only load when loadHeaderScript=1 BEGIN #241208
	if (typeof VTECheckLoadHeaderScript == 'function') {
		if (!VTECheckLoadHeaderScript('VTEModalPopupSearch')) {
			return;
		}
	}
	// Only load when loadHeaderScript=1 END #241208
    var instance = new VTEModalPopupSearch_Js();
    instance.registerEvents();
});
jQuery( document ).ajaxComplete(function(event, xhr, settings) {
    var url = settings.data;
    if(typeof url == 'undefined' && settings.url) url = settings.url;
    if(Object.prototype.toString.call(url) =='[object String]') {
        if (url.indexOf('module=VTEButtons') > -1 && url.indexOf('view=QuickEditAjax') > -1 ){
            var instance = new VTEModalPopupSearch_Js();
            app.event.one('post.vteButtonQuickEditForm.show', function (e, form) {
                instance.registerVTEModalPopupSearchForQuickCreate(form);
                setTimeout(function() {
                instance.registerAutoCompleteFields(form);
                }, 100);
            });
        }
    }
    if (typeof VTECheckLoadHeaderScript == 'function') {
        if (!VTECheckLoadHeaderScript('VTEModalPopupSearch')) {
            return;
        }
    }
    if(settings.data != undefined && typeof  settings.data== 'string' && settings.data.indexOf('view=QuickCreateAjax') != -1){
        setTimeout(function(){
            var instance = new VTEModalPopupSearch_Js();
            instance.registerEvents();
        },1000);
    }
});