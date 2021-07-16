
Settings_Vtiger_Edit_Js("Settings_VTERoundRobin_Edit_Js", {
}, {
    registerSwitchField:function(form){
        form.find("[name=rr_online_users_only]").bootstrapSwitch();
        form.find("[name=rr_assign_preferred_user]").bootstrapSwitch();
    },
    registerSelectStatusField : function(form){
        var thisInstance = this;
        form.on('change','[name="rr_status_field"]',function () {
            var element = $(this);
            var fieldSelected = element.val();
            if(fieldSelected != undefined && fieldSelected != ''){
                var moduleSelected = $('[name="rr_module"]').val();
                var module = $('#module').val();
                var params = {
                    module : module,
                    action : 'ActionAjax',
                    mode : 'selectStatusField',
                    parent : 'Settings',
                    'fieldSelected' : fieldSelected,
                    'moduleSelected' : moduleSelected
                };
                AppConnector.request(params).then(
                    function (data) {
                        var result = data.result;
                        var picklistFieldValue = form.find('[name="rr_unassigned_status"]');
                        picklistFieldValue.siblings('div').find('.select2-chosen').html('Select an Option');
                        var html = '<option selected="selected">Select an Option</option>';
                        $.each(result.fieldValue,function (picklistValue,picklistLabel) {
                            if(picklistLabel != 'fieldLabel'){
                                html += '<option value="'+picklistValue+'">'+picklistLabel+'</option>';
                            }else{
                            }
                        });
                        picklistFieldValue.html(html);
                        var picklistFieldValue = form.find('[name="rr_assigned_status"]');
                        picklistFieldValue.siblings('div').find('.select2-chosen').html('Select an Option');
                        var html = '<option selected="selected">Select an Option</option>';
                        $.each(result.fieldValue,function (picklistValue,picklistLabel) {
                            if(picklistLabel != 'fieldLabel'){
                                html += '<option value="'+picklistValue+'">'+picklistLabel+'</option>';
                            }else{
                            }
                        });
                        picklistFieldValue.html(html);

                    },
                    function(error){
                        var html = '<option selected="selected">Select an Option</option>';
                        var picklistFieldValue = form.find('[name="rr_unassigned_status"]');
                        picklistFieldValue.siblings('div').find('.select2-chosen').html('Select an Option');
                        picklistFieldValue.html(html);
                        $('[name="picklist_field_label"]').html('');
                        var html = '<option selected="selected">Select an Option</option>';
                        var picklistFieldValue = form.find('[name="rr_assigned_status"]');
                        picklistFieldValue.siblings('div').find('.select2-chosen').html('Select an Option');
                        picklistFieldValue.html(html);
                        $('[name="picklist_field_label"]').html('');
                    }
                );
            }
        })
    },
    registerSelectModule :function (form) {
        var thisInstance = this;
        form.on('change','[name="rr_module"]',function () {
            var element = $(this);
            var moduleSelected = element.val();
            var module = $('#module').val();
            if(moduleSelected != undefined && moduleSelected != ''){
                var params = {
                    module : module,
                    action : 'ActionAjax',
                    mode : 'selectModule',
                    parent : 'Settings',
                    'moduleSelected' : moduleSelected
                };
                AppConnector.request(params).then(
                    function (data) {
                        //picklistField
                        var picklistField = form.find('[name="rr_status_field"]');
                        picklistField.siblings('div').find('.select2-chosen').html('Select an Option');
                        var result = data.result.fields;
                        var html = '<option value="" selected="selected">Select an Option</option>';
                        $.each(result,function (fieldname,fieldlabel) {
                            html += '<option value="'+fieldname+'">'+fieldlabel+'</option>';
                        });
                        picklistField.html(html);
                    },
                    function(error){
                        var html = '<option value="" selected="selected">Select an Option</option>';
                        var picklistField = form.find('[name="rr_status_field"]');
                        picklistField.siblings('div').find('.select2-chosen').html('Select an Option');
                        picklistField.html(html);
                    }
                );
                if(moduleSelected == 'HelpDesk'){
                    var div = $('div.rr_assign_preferred_user');
                    div.html('');
                    div.html('<input type="checkbox" value="" class="inputElement switch-input" data-on-color="success" id="rr_assign_preferred_user" name="rr_assign_preferred_user">');
                    $("[name=rr_assign_preferred_user]").bootstrapSwitch();
                }else{
                    var div = $('div.rr_assign_preferred_user');
                    div.html('');
                    div.html('<input type="checkbox" value="" disabled class="inputElement switch-input" data-on-color="success" id="rr_assign_preferred_user" name="rr_assign_preferred_user">');
                    $("[name=rr_assign_preferred_user]").bootstrapSwitch();
                }
            }

        })
    },
    registerSubmitEvent:function(form){
        form.vtValidate({
            submitHandler: function(form) {
                return true;
            }
        });
        form.on('submit',function(e) {
            form.vtValidate();
            var rr_unassigned_status = $('[name="rr_unassigned_status"]').val();
            var rr_assigned_status = $('[name="rr_assigned_status"]').val();
            if((rr_unassigned_status != '' || rr_assigned_status != '') && rr_unassigned_status == rr_assigned_status){
                app.helper.showAlertNotification({'message':'Assigned Status and New Status can not be the same'});
                e.preventDefault();
            }else{
                return true;
            }
        });
    },
    registerShowTotalCountIcon:function(){
        $('.showTotalCountIcon').on('click',function(){
           var value = $(this).data('value');
            $(this).html(value);
        });
    },
    registerEvents: function () {
        var form = $('#editView');
        this.registerSelectModule(form);
        this.registerSwitchField(form);
        this.registerSelectStatusField(form);
        this.registerSubmitEvent(form);
        this.registerShowTotalCountIcon();
    }
});

$(document).ready(function () {
    window.onbeforeunload = null;
});