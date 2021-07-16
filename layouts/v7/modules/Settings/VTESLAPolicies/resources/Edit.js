
Settings_Vtiger_Edit_Js("Settings_VTESLAPolicies_Edit_Js", {
}, {
    advanceFilterInstance: false,

    initSLA : function () {
        var thisInstance = this;
        var record = jQuery('[name="record"]').val();
        var moduleSelected = jQuery('[name="moduleSelected"]').val();
        if(record && moduleSelected){
            var table_conditions = jQuery('#table-conditions');
            var advanceFilterContainer = jQuery('#advanceFilterContainer');
            vtUtils.applyFieldElementsView(table_conditions);
            thisInstance.advanceFilterInstance = Vtiger_AdvanceFilter_Js.getInstance(jQuery('.filterContainer', advanceFilterContainer));
            var picklistField = $('#picklist_field');
            var excludeField = $('#exclude_field');
            thisInstance.updateSelectElement(picklistField.val(),excludeField,'field');
            thisInstance.updateSelectElement(excludeField.val(),picklistField,'field');
            if(excludeField.val()){
                var pauseHoldValue = $('#exclude_fieldvalue');
                var fulFillmetValue = $('#sla_fulfillment_values');
                thisInstance.updateSelectElement(pauseHoldValue.val(),fulFillmetValue,'fieldvalue');
                thisInstance.updateSelectElement(fulFillmetValue.val(),pauseHoldValue,'fieldvalue')
            }
        }else{
            thisInstance.buttonAddConditionsEmptySelectedModule();
        }
    },
    buttonAddConditionsEmptySelectedModule : function () {
        jQuery('.filterContainer').on('click','button.btn-default',function () {
            var message = 'Module select is Empty';
            app.helper.showErrorNotification({message : message});
        });
    },

    calculateValues : function(){
        //handled advanced filters saved values.
        var enableFilterElement = jQuery('#enableAdvanceFilters');
        if(enableFilterElement.length > 0 && enableFilterElement.is(':checked') == false) {
            jQuery('#advanced_filter').val(jQuery('#olderConditions').val());
        } else {
            var advfilterlist = this.advanceFilterInstance.getValues();
            jQuery('#advanced_filter').val(JSON.stringify(advfilterlist));
        }
    },
    //Business Hour
    registerSelectBusinessHour : function(){
        var thisInstance = this;
        $('#business_hour').on('change',function () {
            var element = $(this);
            var trElement = element.closest('div');
            var typeAction = element.val();
            if(typeAction == 'Yes'){
                //trElement.find('.sla_action_email_template').addClass('hide');
                //trElement.find('.selectEmailTemplate').addClass('hide');
                $('#resolved_time').removeAttr('disabled');
                trElement.find('.selectWorkflow').removeClass('hide');
                // trElement.find('.sla_action_users').removeClass('hide');
            }
        });

    },
    //Module
    registerSelectModule :function (form) {
        var thisInstance = this;
        form.on('change','[name="sla_module"]',function () {
            app.helper.showProgress();
            var element = $(this);
            var moduleSelected = element.val();
            var module = $('#module').val();
            var params = {
                module : module,
                action : 'ActionAjax',
                mode : 'selectModule',
                parent : 'Settings',
                'moduleSelected' : moduleSelected
            };
            AppConnector.request(params).then(
                function (data) {
                    var result1 = data.result;
                    thisInstance.registerEventForShowModuleFilterCondition(moduleSelected);

                    //picklistField
                    var picklistField = form.find('[name="sla_picklist_field"]');
                    picklistField.siblings('div').find('.select2-chosen').html('Select an Option');
                    var result = data.result.fields;
                    var html = '<option selected="selected">Select an Option</option>';
                    html += '<option value="None">None</option>';
                    $.each(result,function (fieldname,fieldlabel) {
                        html += '<option value="'+fieldname+'">'+fieldlabel+'</option>';
                    });
                    var valueStartContinue = [];
                    picklistField.html(html);

                    //picklistField Exclude
                    var excludeField = form.find('[name="exclude_field"]');
                    excludeField.siblings('div').find('.select2-chosen').html('Select an Option');
                    excludeField.html(html);
                    var htmlExcludeField = '<option selected="selected">Select an Option</option>';
                    $.each(result1.fields,function (picklistValue,picklistLabel) {
                        valueStartContinue.push(picklistLabel);
                        htmlExcludeField += '<option value="'+picklistValue+'">'+picklistLabel+'</option>';
                    });
                    $('#hide_picklist_field').html(htmlExcludeField);
                    $('#input_hide_picklist_field').val(JSON.stringify(valueStartContinue));
                    excludeField.html(htmlExcludeField);


                    //Email Template
                    var rsWorkflows = data.result.workflows;
                    var workflows = form.find('select.sla_action_workflow');
                    workflows.siblings('div').find('.select2-chosen').html('Select an Option');
                    var htmlWorkflows = '<option selected="selected">Select an Option</option>';
                    $.each(rsWorkflows,function (id,value) {
                        htmlWorkflows += '<option value="'+id+'">'+value+'</option>';
                    });

                    workflows.html(htmlWorkflows);
                    var urlWorkflows = "module=VTESLAPolicies&parent=Settings&view=PopupWorkflow&sourceModule="+moduleSelected;
                    var buttonWorkflows =  $('.selectWorkflow');
                    buttonWorkflows.attr('data-url',urlWorkflows);


                    // clear Excludes
                    var excludeFieldValue = form.find('#exclude_fieldvalue');
                    excludeFieldValue.siblings('div').find('.select2-choices li.select2-search-choice').remove();
                    excludeFieldValue.html('');

                    // clear fulfillment_values
                    var fulfillment_values = form.find('#sla_fulfillment_values');
                    fulfillment_values.siblings('div').find('.select2-choices li.select2-search-choice').remove();
                    fulfillment_values.html('');

                    // clear SLA TargetType
                    var htmlClearSelect = '<option selected="selected">Select an Option</option>';
                    var SLATargetType = form.find('select[name="sla_picklist_value"]');
                    SLATargetType.siblings('div').find('.select2-chosen').html('Select an Option');
                    SLATargetType.html(htmlClearSelect);

                    app.helper.hideProgress();

                },
                function(error){
                    thisInstance.clearText('module');
                    //picklist Exclustions Field
                    var html = '<option selected="selected">Select an Option</option>';
                    var picklistField = form.find('[name="sla_picklist_field"]');
                    picklistField.siblings('div').find('.select2-chosen').html('Select an Option');
                    picklistField.html(html);

                    //picklist Exclustions Values
                    var picklistFieldValue = form.find('[name="picklist_value"]');
                    picklistFieldValue.siblings('div').find('.select2-chosen').html('Select an Option');
                    picklistFieldValue.html(html);
                    $('[name="picklist_field_label"]').html('');

                    //Email Template
                    var workflows = form.find('select.sla_action_workflow');
                    workflows.siblings('div').find('.select2-chosen').html('Select an Option');
                    workflows.html(html);


                    //picklistField Exclude
                    var excludeField = form.find('[name="exclude_field"]');
                    excludeField.siblings('div').find('.select2-chosen').html('Select an Option');
                    excludeField.html(html);

                    // clear Excludes
                    var excludeFieldValue = form.find('#exclude_fieldvalue');
                    excludeFieldValue.siblings('div').find('.select2-choices li.select2-search-choice').remove();
                    excludeFieldValue.html('');

                    // clear fulfillment_values
                    var fulfillment_values = form.find('#sla_fulfillment_values');
                    fulfillment_values.siblings('div').find('.select2-choices li.select2-search-choice').remove();
                    fulfillment_values.html('');

                    // clear SLA TargetType
                    var SLATargetType = form.find('select[name="sla_picklist_value"]');
                    SLATargetType.siblings('div').find('.select2-chosen').html('Select an Option');
                    SLATargetType.html(html);


                    $('.selectWorkflow').removeAttr('data-url');
                    app.helper.hideProgress();

                }
            );
        })
    },

    registerSelectField : function (form) {
        var thisInstance = this;
        form.on('change','[name="sla_picklist_field"],[name="exclude_field"]',function () {
            var module = $('#module').val();
            var element = $(this);
            var fieldSelected = element.val();
            var moduleSelected = $('[name="sla_module"]').val();
            var fieldname = element.attr('name');
            if(fieldname == 'sla_picklist_field'){
                if(fieldSelected == 'None'){
                    var picklistFieldValue = form.find('[name="sla_picklist_value"]');
                    picklistFieldValue.siblings('div').find('.select2-chosen').html('Select an Option');
                    var html = '<option>Select an Option</option>';
                    html += '<option value="None" selected="selected">None</option>';
                    picklistFieldValue.html(html);
                    picklistFieldValue.select2();
                    form.find('.message_sla_trigger').html('SLA will trigger <b>for all records created (starting from now)</b> and is expected to <strong class="text_int_time">??</strong> <strong class="text_typetime">??</strong>');
                    return;
                }else{
                    form.find('.message_sla_trigger').html('SLA will trigger when <strong class="trigger_fieldlabel">??</strong> is <strong class="triggervalue">??</strong> and is expected to <strong class="text_int_time">??</strong> <strong class="text_typetime">??</strong>');
                }
            }
            app.helper.showProgress();
            var params = {
                module: module,
                action: 'ActionAjax',
                mode: 'selectField',
                parent: 'Settings',
                'moduleSelected' : moduleSelected,
                'fieldSelected': fieldSelected
            };

            AppConnector.request(params).then(
                function (data) {
                    var result = data.result;
                    if(fieldname == 'sla_picklist_field'){

                        var picklistFieldValue = form.find('[name="sla_picklist_value"]');
                        picklistFieldValue.siblings('div').find('.select2-chosen').html('Select an Option');
                        $('strong.trigger_fieldlabel').html(result.fieldLabel);
                        var html = '<option selected="selected">Select an Option</option>';
                        $.each(result.fieldValue,function (picklistValue,picklistLabel) {
                            if(picklistLabel != 'fieldLabel'){
                                html += '<option value="'+picklistValue+'">'+picklistLabel+'</option>';
                            }else{
                            }
                        });
                        picklistFieldValue.html(html);
                        var removeFieldValue = $('#exclude_field');
                        thisInstance.updateSelectElement(fieldSelected,removeFieldValue,'field');
                    }else{

                        var excludeField = form.find('#exclude_fieldvalue');
                        excludeField.siblings('div').find('.select2-choices li.select2-search-choice').remove();
                        excludeField.html('');
                        var valueStartContinue = [];
                        $('strong.statusfield_label').html(result.fieldLabel);

                        // clear fulfillment_values
                        var fulfillment_values = form.find('#sla_fulfillment_values');
                        fulfillment_values.siblings('div').find('.select2-choices li.select2-search-choice').remove();
                        fulfillment_values.html('');

                        var htmlExcludeField = '';
                        $.each(result.fieldValue,function (picklistValue,picklistLabel) {
                            valueStartContinue.push(picklistLabel);
                            htmlExcludeField += '<option value="'+picklistValue+'">'+picklistLabel+'</option>';
                        });
                        $('#hide_exclude_field').html(htmlExcludeField);
                        $('#input_exclude_field_value').val(JSON.stringify(valueStartContinue));
                        $('strong.value_not_selected_in_pause_or_fullfilment').html(valueStartContinue.toString());
                        excludeField.html(htmlExcludeField);
                        fulfillment_values.html(htmlExcludeField);

                        // excludeField.html(htmlExcludeField);
                        var Fieldpicklist = $('[name="sla_picklist_field"]').val();
                        var removeFieldValue = $('#picklist_field');
                        thisInstance.updateSelectElement(fieldSelected,removeFieldValue,'field');
                    }
                    app.helper.hideProgress();
                },
                function(error){
                    if(fieldname == 'sla_picklist_field'){
                        var html = '<option selected="selected">Select an Option</option>';
                        var picklistFieldValue = form.find('[name="sla_picklist_value"]');
                        picklistFieldValue.siblings('div').find('.select2-chosen').html('Select an Option');
                        picklistFieldValue.html(html);
                        thisInstance.clearText('picklistField');
                        var removeFieldValue = $('#exclude_field');
                        thisInstance.updateSelectElement('',removeFieldValue,'field');

                    }else{
                        var excludeField = form.find('#exclude_fieldvalue');
                        excludeField.siblings('div').find('.select2-choices li.select2-search-choice').remove();
                        excludeField.html('');
                        thisInstance.clearText('excludeField');
                        // clear fulfillment_values
                        var fulfillment_values = form.find('#sla_fulfillment_values');
                        fulfillment_values.siblings('div').find('.select2-choices li.select2-search-choice').remove();
                        fulfillment_values.html('');
                        var removeFieldValue = $('#picklist_field');
                        thisInstance.updateSelectElement('',removeFieldValue,'field');
                    }
                    app.helper.hideProgress();
                }
            )
        })
    },

    registerSelectFieldValue : function (form) {
        var thisInstance = this;
        form.on('change','[name="sla_picklist_value"]',function (e) {
            var element = $(e.currentTarget);
            var elementValue = element.val();
            if(elementValue) {
                $('strong.triggervalue').html(elementValue);
            }else{
                $('strong.triggervalue').html('??');
            }
        });
        form.on('change','#exclude_fieldvalue',function (e) {
            var element = $(e.currentTarget);
            var elementValue = element.val();
            var fieldRemoveValue = $('#sla_fulfillment_values');
            if(elementValue) {
                $('strong.holdvalues').html(elementValue.toString());
            }else{
                $('strong.holdvalues').html('??');
            }
            thisInstance.updateSelectElement(elementValue,fieldRemoveValue,'fieldvalue');
            thisInstance.updateValueStartOrContinue();
        });

        form.on('change','#sla_fulfillment_values',function (e) {
            var element = $(e.currentTarget);
            var elementValue = element.val();
            var fieldRemoveValue = $('#exclude_fieldvalue');
            if(elementValue) {
                $('strong.fullfilment_value').html(elementValue.toString());

            }else{
                $('strong.fullfilment_value').html('??');
            }
            thisInstance.updateSelectElement(elementValue,fieldRemoveValue,'fieldvalue');
            thisInstance.updateValueStartOrContinue();
        });
    },

    clearText : function (fieldType) {
        var triggerLabel = $('strong.trigger_fieldlabel');
        var triggerValue = $('strong.triggervalue');

        var excludeField = $('strong.statusfield_label');
        var startContinue = $('strong.value_not_selected_in_pause_or_fullfilment');
        var holdvalues = $('strong.holdvalues');
        var fullfilment_value = $('strong.fullfilment_value');
        if(fieldType == 'module'){
            triggerLabel.html('??');
            triggerValue.html('??');
            startContinue.html('??');
            excludeField.html('??');
            holdvalues.html('??');
            fullfilment_value.html('??');
        }else if(fieldType == 'picklistField'){
            triggerLabel.html('??');
            triggerValue.html('??');
        }else if(fieldType =='excludeField'){
            startContinue.html('??');
            excludeField.html('??');
            holdvalues.html('??');
            fullfilment_value.html('??');
        }

    },

    registerEventChangeResolveTime : function (form) {
        form.on('keyup change','#resolved_time',function (e) {
            var element = $(e.currentTarget);
            var elementValue = element.val();
            $('strong.text_int_time').html(elementValue);

        });

        form.on('change','#resolved_typetime',function (e) {
            var element = $(e.currentTarget);
            var elementValue = element.val();
            if(elementValue == ''){
                elementValue = '$hours/min$'
            }
            $('strong.text_typetime').html(elementValue);
        });

    },

    updateValueStartOrContinue : function () {
        var fulfillment_values = $('#sla_fulfillment_values').val();
        var exclude_fieldvalue = $('#exclude_fieldvalue').val();
        var excludeField = JSON.parse($('#input_exclude_field_value').val());
        for(var i in fulfillment_values){
            excludeField.splice($.inArray(fulfillment_values[i],excludeField),1);
        }
        for(var j in exclude_fieldvalue){
            excludeField.splice($.inArray(exclude_fieldvalue[j],excludeField),1);
        }
        var valueStartOrContinue = excludeField.toString();
        if(excludeField.length == 0){
            valueStartOrContinue = '??';
        }
        $('strong.value_not_selected_in_pause_or_fullfilment').html(valueStartOrContinue);
    },

    updateSelectElement:function (value,field,type) {
        var excludeFieldValue = '';
        var fieldValue = field.val();
        if(type == 'fieldvalue') {
            excludeFieldValue = $('#hide_exclude_field');
            field.html(excludeFieldValue.clone().html());
            for (var i in value) {
                value[i] = value[i].replace(/\\/g, "\\\\\\\\");
                field.find('option[value="' + value[i] + '"]').remove();
            }
            if (fieldValue && fieldValue[0]) {
                field.select2("val", fieldValue);
            }
        }else{
            excludeFieldValue = $('#hide_picklist_field');
            field.html(excludeFieldValue.clone().html());
            value = value.replace(/\\/g, "\\\\\\\\");
            if(value != ""){
                field.find('option[value="' + value + '"]').remove();
            }
            if (fieldValue) {
                if(fieldValue == 'None'){
                    var newOption = new Option('None', 'None', true, true);
                    field.append(newOption).trigger('change');
                }
                field.select2("val", fieldValue);
            }
        }
    },

    //SLA Conditions
    registerEventForModifyCondition : function() {
        jQuery('button[name=modify_condition]').on('click', function(e) {
            var icon =  jQuery(e.currentTarget).find('i');
            var isClassExist = jQuery(icon).hasClass('fa-chevron-right');
            if(isClassExist) {
                jQuery(e.currentTarget).find('i').removeClass('fa-chevron-right').addClass('fa-chevron-down');
                jQuery('#advanceFilterContainer').removeClass('hide').show('slow');
            } else {
                jQuery(e.currentTarget).find('i').removeClass('fa-chevron-down').addClass('fa-chevron-right');
                jQuery('#advanceFilterContainer').addClass('hide').hide('slow');
            }
            return false;
        });
    },
    registerEventForShowModuleFilterCondition: function (moduleSelected) {
        var thisInstance = this;
        var params = {
            'module': 'VTESLAPolicies',
            'parent': 'Settings',
            'view': 'EditAjax',
            'mode': 'getWorkflowConditions',
            'record': jQuery("input[name='record']").val(),
            'module_name': moduleSelected
        }
        app.helper.showProgress();
        app.request.get({data: params}).then(function (error, data) {
            app.helper.hideProgress();
            var table_conditions = jQuery('#table-conditions');
            table_conditions.html(data);
            var advanceFilterContainer = jQuery('#advanceFilterContainer');
            vtUtils.applyFieldElementsView(table_conditions);
            thisInstance.advanceFilterInstance = Vtiger_AdvanceFilter_Js.getInstance(jQuery('.filterContainer', advanceFilterContainer));
        });
    },

    //SLA Actions

    getBasicRow : function(table) {
        var basicRow = table.find('.recordClone');
        var newRow = basicRow.clone(true,true);
        newRow.find('select').select2();
        return newRow.removeClass('hide recordClone');
    },
    registerAddRowActionsSLA : function (form) {
        var thisInstance = this;
        var table = form.find('#sla_actions');
        form.on('click','#addrow',function () {
            var tableBody = table.find('tbody');
            var countRow = parseInt(jQuery('[name="count_sla_actions"]').val());
            var newRow = thisInstance.getBasicRow(table).addClass('record').attr('data-id',countRow+1);
            newRow.find('[name="rowno[]"]').val(countRow+1);
            newRow.find('[name="sla_action_name"]').attr("name",'sla_action_name'+(countRow+1));
            newRow.find('[name="sla_action_type"]').attr("name",'sla_action_type'+(countRow+1));
            newRow.find('[name="sla_action_trigger"]').attr("name",'sla_action_trigger'+(countRow+1));
            newRow.find('[name="sla_action_time"]').attr("name",'sla_action_time'+(countRow+1));
            newRow.find('[name="sla_action_typetime"]').attr("name",'sla_action_typetime'+(countRow+1));
            newRow.find('[name="sla_action_users"]').attr("name",'sla_action_users'+(countRow+1));
            newRow.find('[name="sla_action_email_template"]').attr("name",'sla_action_email_template'+(countRow+1));
            newRow.find('[name="sla_action_workflow"]').attr("name",'sla_action_workflow'+(countRow+1));

            tableBody.append(newRow);
            var countSLAActions = parseInt(form.find('[name="count_sla_actions"]').val()) + 1;
            form.find('[name="count_sla_actions"]').val(countSLAActions);
        })
    },
    registerDeleteRowActionsSLA : function (form) {
        var table = form.find('#sla_actions');
        table.on('click','.deleterow',function () {
            var element = $(this);
            var trElement = element.closest('tr');
            var recordActionsId = trElement.attr('sla-record-id');
            var module = app.getModuleName();
            if(recordActionsId){
                var message = 'Would you like to delete?';
                app.helper.showConfirmationBox({'message' : message}).then(function (e) {
                    app.helper.showProgress();
                    var params = {
                        module : module,
                        action : 'ActionAjax',
                        mode : 'deleteRecordSLA',
                        parent : 'Settings',
                        record : recordActionsId
                    };
                    AppConnector.request(params).then(
                        function (data) {
                            if(data.success == true){
                                trElement.remove();
                                app.helper.hideProgress();
                            }
                        }
                    );
                });
            }else{
                trElement.remove();
                var countSLAActions = parseInt(form.find('[name="count_sla_actions"]').val()) - 1;
                form.find('[name="count_sla_actions"]').val(countSLAActions);
            }
        });
    },
    registerChangeTypeActions : function (form) {
        var table = form.find('#sla_actions');
        table.on('change','.sla_action_type',function () {
            var element = $(this);
            var trElement = element.closest('tr');
            var typeAction = element.val();
            if(typeAction == 'Reassign'){
                trElement.find('.sla_action_email_template').addClass('hide');
                trElement.find('.selectEmailTemplate').addClass('hide');
                trElement.find('.sla_action_workflow').addClass('hide');
                trElement.find('.selectWorkflow').addClass('hide');
                trElement.find('.sla_action_users').removeClass('hide');
            }else if(typeAction == 'Email'){

                trElement.find('.sla_action_workflow').addClass('hide');
                trElement.find('.selectWorkflow').addClass('hide');

                trElement.find('.sla_action_email_template').removeClass('hide');
                trElement.find('.selectEmailTemplate').removeClass('hide');
                trElement.find('.sla_action_users').removeClass('hide');

            }else{
                trElement.find('.sla_action_email_template').addClass('hide');
                trElement.find('.selectEmailTemplate').addClass('hide');

                trElement.find('.sla_action_users').addClass('hide');


                trElement.find('.sla_action_workflow').removeClass('hide');
                trElement.find('.selectWorkflow').removeClass('hide');
            }
        })
    },

    registerSelectEmailTemplateEvent : function(form){
        var thisInstance = this;
        form.on("click",".selectEmailTemplate",function(e){
            var element = $(this);
            var dataUrl = element.attr('data-url');
            if(dataUrl){
                var trElementRow = element.closest('tr');
                localStorage.setItem('sla_action_row',trElementRow.attr('data-id'));
                var url = "index.php?"+ dataUrl;
                var postParams = app.convertUrlToDataParams(url);
                app.request.post({data:postParams}).then(function(err,data){
                    if(err === null){
                        jQuery('.popupModal').remove();
                        var ele = jQuery('<div class="modal popupModal"></div>');
                        ele.append(data);
                        jQuery('body').append(ele);
                        thisInstance.showpopupModal();
                        app.event.trigger("post.Popup.Load",{"eventToTrigger":"post.EmailTemplateList.click"})
                    }
                });
            }else{
                app.helper.showInfoMessage('');
            }
        });
    },
    registerSelectWorkflowEvent : function(form){
        var thisInstance = this;
        form.on("click",".selectWorkflow",function(e){
            var element = $(this);
            var dataUrl = element.attr('data-url');
            if(dataUrl){
                var trElementRow = element.closest('tr');
                localStorage.setItem('sla_action_row',trElementRow.attr('data-id'));
                var url = "index.php?"+ dataUrl;
                var postParams = app.convertUrlToDataParams(url);
                app.request.post({data:postParams}).then(function(err,data){
                    if(err === null){
                        jQuery('.popupModal').remove();
                        var ele = jQuery('<div class="modal popupModal"></div>');
                        ele.append(data);
                        jQuery('body').append(ele);
                        thisInstance.showpopupModal();
                        app.event.trigger("post.Popup.Load",{"eventToTrigger":"post.WorkflowsList.click"})
                    }
                });
            }else{
                var message = 'Module select is Empty';
                app.helper.showErrorNotification({message : message});
            }
        });
    },
    showpopupModal : function(){
        var thisInstance = this;
        vtUtils.applyFieldElementsView(jQuery('.popupModal'));
        jQuery('.popupModal').modal();
        jQuery('.popupModal').on('shown.bs.modal', function() {
            jQuery('.myModal').css('opacity', .5);
            jQuery('.myModal').unbind();
        });

    },

    registerSortableEvent : function() {
        var table = jQuery('#sla_actions');
        var thisInstance = this;
        var sequenceList = {};
        var tbody = table.find('tbody');

        tbody.sortable({
            'helper' : function(e,ui){
                //while dragging helper elements td element will take width as contents width
                //so we are explicity saying that it has to be same width so that element will not
                //look like distrubed
                ui.children().each(function(index,element){
                    element = jQuery(element);
                    element.width(element.width());
                });
                return ui;
            },
            'containment' : tbody,
            'revert' : true,
            'ui-floating': 'auto',
            scroll: true,

            start: function (ev, ui) {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > 0) {
                    ui.helper.css('margin-top', scrollTop);
                }
            },
            stop: function (ev, ui) {
                ui.item.css('margin-top', 0);
            },
            update: function(e, ui ) {
                jQuery('#sla_actions .record').each(function(i){
                    var index = 1 + i ;
                    var thisRecords = jQuery(this);
                    thisRecords.find('input[name="rowno[]"]').val(index);
                    thisRecords.find('.sla_action_name').attr("name",'sla_action_name'+index);
                    thisRecords.find('.sla_action_type').attr("name",'sla_action_type'+index);
                    thisRecords.find('.sla_action_trigger').attr("name",'sla_action_trigger'+index);
                    thisRecords.find('.sla_action_time').attr("name",'sla_action_time'+index);
                    thisRecords.find('.sla_action_typetime').attr("name",'sla_action_typetime'+index);
                    thisRecords.find('.sla_action_users').attr("name",'sla_action_users'+index);
                    thisRecords.find('.sla_action_email_template').attr("name",'sla_action_email_template'+index);
                    thisRecords.find('.sla_action_workflow').attr("name",'sla_action_workflow'+index);
                });
            }
        });
    },
    registerFormSubmitEvent : function(form) {
        var thisInstance = this;
        form.on('submit',function (e) {
            var checkTrigger = thisInstance.registerCheckTriggerBeforeSave();
            var checkValidate = thisInstance.registerValidateTableActions();
            if(!checkTrigger || !checkValidate){
                e.preventDefault();
            }
            thisInstance.calculateValues();
            form.vtValidate();
        });
    },
    registerCheckTriggerOnchange : function(){
        var table = jQuery('table#sla_actions');
        var thisInstance = this;
        table.on('change','[name^="sla_action_trigger"], [name^="sla_action_time"], [name^="sla_action_typetime"]',function (e) {
            var element = e.currentTarget;
            var trElement = jQuery(element).closest('tr');
            var triggerType = trElement.find('[name^="sla_action_trigger"]').val();
            var triggerTimeValue = trElement.find('[name^="sla_action_time"]').val();
            var triggerTypeTimeValue = trElement.find('[name^="sla_action_typetime"]').val();
            var resolvedTime = jQuery('[name="sla_resolved_time"]').val();
            var resolvedTypeTime = jQuery('[name="sla_resolved_typetime"]').val();
            if (triggerTypeTimeValue == 'Hours'){
                triggerTimeValue = parseInt(triggerTimeValue) * 60;
            }
            if(resolvedTypeTime == 'Hours'){
                resolvedTime = parseInt(resolvedTime) * 60;
            }
            if(triggerType == 'Before' && parseInt(resolvedTime) < parseInt(triggerTimeValue)){
                var message = app.vtranslate('Cannot trigger action before greater than resolved time');
                app.helper.showErrorNotification({message:message});
                trElement.find('[name^="sla_action_time"]').focus();
            }
        })
    },
    registerCheckTriggerBeforeSave : function () {
        var resolvedTime = jQuery('[name="sla_resolved_time"]').val();
        var resolvedTypeTime = jQuery('[name="sla_resolved_typetime"]').val();
        if(resolvedTypeTime == 'Hours'){
            resolvedTime = parseInt(resolvedTime) * 60;
        }
        var table = jQuery('table#sla_actions');
        var trTable = table.find('tr.record');
        var status = false;
        if(trTable.length > 0){
            $.each(trTable,function (key,tr) {
                var triggerType = jQuery(tr).find('[name^="sla_action_trigger"]').val();
                var triggerTimeValue = jQuery(tr).find('[name^="sla_action_time"]').val();
                var triggerTypeTimeValue = jQuery(tr).find('[name^="sla_action_typetime"]').val();
                if (triggerTypeTimeValue == 'Hours'){
                    triggerTimeValue = parseInt(triggerTimeValue) * 60;
                }
                if(triggerType == 'Before' && parseInt(resolvedTime) < parseInt(triggerTimeValue)){
                    var message = app.vtranslate('Cannot trigger action before greater than resolved time');
                    app.helper.showErrorNotification({message:message});
                    jQuery(tr).find('[name^="sla_action_time"]').focus();
                }else{
                    status = true;
                }
            });
        }
        else{
            status = true;
        }
        return status;
    },
    registerValidateTableActions : function () {
        var table = $(document).find('#sla_actions');
        var tr = table.find('.record');
        var status = true;
        var message = '';
        for(var i =0; i< tr.length ; i++){
            var trElement = $(tr[i]);
            var nameAction = trElement.find('input.sla_action_name');
            var typeActions = trElement.find('select.sla_action_type');
            var trigger = trElement.find('select.sla_action_trigger');
            var trigger_time = trElement.find('input.sla_action_time');
            var trigger_typetime = trElement.find('select.sla_action_typetime');
            var trigger_user = trElement.find('select.sla_action_users');
            var emailTemplate = trElement.find('select.sla_action_email_template');
            var workflows = trElement.find('select.sla_action_workflow');
            // name
            if(nameAction.val() == ''){
                nameAction.addClass('error-validate');
                message = app.vtranslate('SLA Actions : Field Name cannot be empty');
                nameAction.focus();
                app.helper.showErrorNotification({message:message});
                status = false;
                break;
            }else{
                nameAction.removeClass('error-validate');
            }
            if(typeActions.val() == '' || typeActions.val() == 'Select an Option' ){
                typeActions.addClass('error-validate');
                message = app.vtranslate('SLA Actions : Type cannot be empty');
                typeActions.focus();
                app.helper.showErrorNotification({message:message});
                status = false;
                break;
            }else{
                typeActions.removeClass('error-validate');
            }
            // trigger
            if(trigger.val() == '' || trigger.val() == 'Select an Option' ){
                trigger.addClass('error-validate');
                message = app.vtranslate('SLA Actions : Field Trigger cannot be empty');
                trigger.focus();
                app.helper.showErrorNotification({message:message});
                status = false;
                break;
            }else{
                trigger.removeClass('error-validate');
            }
            // trigger time
            if(trigger_time.val() == ''){
                trigger_time.addClass('error-validate');
                message = app.vtranslate('SLA Actions : Field Trigger Time cannot be empty');
                trigger_time.focus();
                app.helper.showErrorNotification({message:message});
                status = false;
                break;
            }else{
                trigger_time.removeClass('error-validate');
            }
            // trigger type time
            if(trigger_typetime.val() == '' || trigger_typetime.val() == 'Select an Option'){
                trigger_typetime.addClass('error-validate');
                message = app.vtranslate('SLA Actions : Field Trigger Time Type cannot be empty');
                trigger_typetime.focus();
                app.helper.showErrorNotification({message:message});
                status = false;
                break;
            }else{
                trigger_typetime.removeClass('error-validate');
            }
            // trigger user
            if((trigger_user.val() == '' || trigger_user.val() == 'Select an Option') && (typeActions.val() == '' || typeActions.val() == 'Reassign')){
                trigger_user.addClass('error-validate');
                message = app.vtranslate('SLA Actions : Field User cannot be empty');
                trigger_user.focus();
                app.helper.showErrorNotification({message:message});
                status = false;
                break;
            }else{
                trigger_user.removeClass('error-validate');
            }

            if(typeActions.val() == 'Email' && (emailTemplate.val() == '' || emailTemplate.val() == 'Select an Option')){
                emailTemplate.siblings('div.sla_action_email_template').find('a').addClass('error-validate');
                message = app.vtranslate('SLA Actions : Field Email/Workflow cannot be empty');
                app.helper.showErrorNotification({message:message});
                status = false;
                break;
            }else{
                emailTemplate.siblings('div.sla_action_email_template').find('a').removeClass('error-validate');
            }
            if(typeActions.val() == 'Workflow' && (workflows.val() == '' || workflows.val() == 'Select an Option')){
                workflows.siblings('div.sla_action_workflow').find('a').addClass('error-validate');
                message = app.vtranslate('SLA Actions : Field Email/Workflow cannot be empty');
                app.helper.showErrorNotification({message:message});
                status = false;
                break;
            }else{
                workflows.siblings('div.sla_action_workflow').find('a').removeClass('error-validate');
            }
        }
        return status;
    },
    activeCondition : function(){
       var conditionAll = $('.allConditionContainer').find('.conditionList .conditionRow').length;
       var conditionAny = $('.anyConditionContainer ').find('.conditionList .conditionRow').length;
       var activeCondition = conditionAll + conditionAny;
       if(!activeCondition){
           $(".active_condition").empty();
       }else{
           $(".active_condition").append(activeCondition);
       }
       //check button addCondition
       $(document).on('click','.addCondition button', function () {
            var conditionAll = $('.allConditionContainer').find('.conditionList .conditionRow').length;
            var conditionAny = $('.anyConditionContainer ').find('.conditionList .conditionRow').length;
            var activeCondition = conditionAll + conditionAny ;
            $(".active_condition").empty();
            $(".active_condition").append(activeCondition);
        });
       //check button delete
        $(document).on('click','.deleteCondition', function(){
            var conditionAll = $('.allConditionContainer').find('.conditionList .conditionRow').length;
            var conditionAny = $('.anyConditionContainer ').find('.conditionList .conditionRow').length;
            var activeCondition = conditionAll + conditionAny;
            if(!activeCondition){
                $(".active_condition").empty();
            }else{
                $(".active_condition").empty();
                $(".active_condition").append(activeCondition);
            }

       });
    },
    registerFieldChangeCondition : function() {
        var thisInstance = this;
        $(document).on('change','select[name="columnname"]:first',function(e,data){
            var valueSelect = $('select[name="columnname"]:first').val().split(';')[1];
            if(valueSelect){
                $('.allConditionContainer ').find('.icon-image').remove();
                $('.allConditionContainer ').find('.deleteCondition:first').parent().append('<div class="icon-image" style="margin-left: 20px; display: inline;">' +
                    '<img class="cursorPointer" src="layouts/v7/modules/Settings/VTESLAPolicies/resources/icon-loi.png" data-toggle="tooltip" title="You can not have related module condition as first one. Please move this condition below primary module condition." />' +
                    '</div>');
                $('.icon-image').find('[data-toggle="tooltip"]').tooltip();
            }else{
                $('.allConditionContainer ').find('.icon-image').remove();
            }
        });
    },
    registerEvents: function () {
        var form = $('#EditView');
        this._super();
        this.initSLA();
        this.registerSelectModule(form);
        this.registerSelectField(form);
        this.registerSelectFieldValue(form);
        this.registerEventChangeResolveTime(form);
        this.registerEventForModifyCondition();
        this.registerAddRowActionsSLA(form);
        this.registerDeleteRowActionsSLA(form);
        this.registerChangeTypeActions(form);
        this.registerSelectEmailTemplateEvent(form);
        this.registerSortableEvent();
        this.registerFormSubmitEvent(form);
        this.registerCheckTriggerOnchange();
        this.registerSelectWorkflowEvent(form);
        this.activeCondition();
        this.registerFieldChangeCondition();


        app.event.on("post.WorkflowsList.click",function(event, data){
            var responseData = JSON.parse(data);
            jQuery('.popupModal').modal('hide');
            var table = $('#sla_actions');
            var rowNo = localStorage.getItem('sla_action_row');
            var trElement = table.find('tr[data-id="'+rowNo+'"]');
            var selectWorkflows = trElement.find('select.sla_action_workflow');
            var divWorkflows = trElement.find('div.sla_action_workflow');
            console.log(responseData);
            $.each(responseData,function (id,value) {
                console.log(id);
                selectWorkflows.find('option[value="'+id+'"]').attr('selected','selected');
                divWorkflows.find('span.select2-chosen').html(value.name);
            });
        });

        app.event.on("post.EmailTemplateList.click",function(event, data){
            var responseData = JSON.parse(data);
            jQuery('.popupModal').modal('hide');
            var table = $('#sla_actions');
            var rowNo = localStorage.getItem('sla_action_row');
            var trElement = table.find('tr[data-id="'+rowNo+'"]');
            var selectEmailTemplate = trElement.find('select.sla_action_email_template');
            var divEmailTemplate = trElement.find('div.sla_action_email_template');
            $.each(responseData,function (id,value) {
                selectEmailTemplate.find('option[value="'+id+'"]').attr('selected','selected');
                divEmailTemplate.find('span.select2-chosen').html(value.name);
            });
        });
    }
});

$(document).ready(function () {
    window.onbeforeunload = null;

});