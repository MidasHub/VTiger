/* ********************************************************************************
 * The content of this file is subject to the Predictive Fields/Bills ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */

Vtiger.Class("VTEPredictiveFields_Js", {
    instance: false,
    getInstance: function () {
        if (VTEPredictiveFields_Js.instance == false) {
            var instance = new VTEPredictiveFields_Js();
            VTEPredictiveFields_Js.instance = instance;
            return instance;
        }
        return VTEPredictiveFields_Js.instance;
    }
},{
    registerApplyPredictiveOnView:function(view){
        var self = this;
        var record_id = app.getRecordId();
        var params = {};
        var list_fields = [];
        var record = app.convertUrlToDataParams(window.location.href).record;
        var field_module = app.getModuleName();
        params['module'] = 'VTEPredictiveFields';
        params['action'] = 'ActionAjax';
        params['mode'] = 'getPredictions';
        params['record'] = record;
        params['view'] = app.getViewName();
        params['moduleSelected'] =field_module;
        app.request.post({data:params}).then(
            function(err,data) {
                if(err == null){
                    jQuery.each( data, function( key, val ) {
                        if(list_fields.indexOf(key) === -1) list_fields.push(key);
                    });
                    $.each(list_fields,function (index,field_name) {
                        var btn_predictive = self.getPredictionForField(data,field_name,record_id);
                        if(view == "Detail"){
                            var field_td_on_detail_view = $("#" + field_module+'_detailView_fieldValue_'+field_name);
                            var this_field = $('.detailview-content').find("input[data-name='"+field_name+"']");
                            if(field_td_on_detail_view.length == 0){
                                field_td_on_detail_view = this_field.closest('div');
                                if(field_td_on_detail_view.find('button.predictiveUpdateThis').length == 0){
                                    $(btn_predictive).appendTo(field_td_on_detail_view);
                                    $('.predictiveUpdateThis').css({"margin-bottom":"15px"});
                                    field_td_on_detail_view.find('button.predictiveUpdateThis').fadeIn(700);
                                }

                            }
                            else{
                                if(field_td_on_detail_view.find('button.predictiveUpdateThis').length == 0){
                                    $(btn_predictive).appendTo(field_td_on_detail_view);
                                    field_td_on_detail_view.find('button.predictiveUpdateThis').fadeIn(700);
                                }
                            }

                        }
                        else{
                            var this_field = $("[name='"+field_name+"']");
                            var field_td_on_edit_view = this_field.closest('td');
                            if(field_td_on_edit_view.find('button.predictiveUpdateThis').length == 0){
                                $(btn_predictive).appendTo(field_td_on_edit_view);
                                field_td_on_edit_view.find('button.predictiveUpdateThis').fadeIn(700);
                            }
                        }
                    });
                }
            },
            function(error) {
            }
        );

    },
    getPredictionForField:function (data,field_name,record_id) {
        var predictions = [];
        var predictions_html = "";
        var field_type = "";
        var field_module = "";
        var sugest_value = "";
        var btn_predictive = "";
        var style_reference_field = "";
        var view = app.getViewName();
        var self = this;
        var this_field = $("input[data-name='"+field_name+"']");
        if(this_field.length == 0) this_field = $("[name='"+field_name+"']");
        var current_value = "";
        if (this_field.data('value') != undefined)
        {
            current_value = this_field.data('value');
        }
        else{
            if(this_field.val() != undefined && this_field.val() != ''){
                current_value = this_field.val();
            }else{
                current_value = this_field.data('selected-value');
            }
        }
        if (view == "Detail") {
            style_reference_field = "margin-left:30px;margin-top: -10px;";
        }
        else{
            style_reference_field = "margin-left:30px;";
        }
        jQuery.each( data[field_name], function(key,cval ) {
            if(predictions.length == 0){
                field_type =cval.field_type;
                field_module = cval.module;
                if(field_type  == "date") {
                    if(current_value == "" || current_value == undefined){
                        var postvalue1_int = cval[6];
                        var postvalue2_int = cval[7];
                        var postvalue3_int = cval[8];
                        var postvalue4_int = cval[9];
                        if(postvalue1_int == 0){
                            if(postvalue2_int == 0){
                                if(postvalue3_int == 0){
                                    if(postvalue4_int == 0){

                                    }else{
                                        sugest_value = [cval.postvalue4,postvalue4_int];
                                    }
                                }else{
                                    sugest_value = [cval.postvalue3,postvalue3_int];
                                }
                            }else{
                                sugest_value = [cval.postvalue2,postvalue2_int];
                            }
                        }else{
                            sugest_value = [cval.postvalue1,postvalue1_int];
                        }
                        predictions = [[cval.postvalue1,postvalue1_int],[cval.postvalue2,postvalue2_int],[cval.postvalue3,postvalue3_int],[cval.postvalue4,postvalue4_int]];
                        return;
                    }
                    else{
                        var postvalue1 = cval[6];
                        var postvalue2 = cval[7];
                        var postvalue3 = cval[8];
                        var postvalue4 = cval[9];
                        var postvalue1_int = postvalue1;
                        var postvalue2_int = postvalue2;
                        var postvalue3_int = postvalue3;
                        var postvalue4_int = postvalue4;
                        var formatDate = $('body').data('user-dateformat');
                        Date.prototype.addDays = function (num) {
                            var value = this.valueOf();
                            value += 86400000 * num;
                            return new Date(value);
                        }
                        Date.prototype.formatCurrentDate = function(formatDate){
                            var date =  this.getDate();
                            if(date < 10) date = "0" +date;
                            var month = this.getMonth() + 1;
                            if(month < 10) month = "0" +month;
                            if(formatDate=='dd-mm-yyyy'){
                                return date +
                                    "-" +  month  +
                                    "-" +  this.getFullYear();
                            }else if(formatDate=='mm-dd-yyyy'){
                                return month +
                                    "-" +  date +
                                    "-" +  this.getFullYear();
                            }else if(formatDate=='yyyy-mm-dd'){
                                return this.getFullYear() +
                                    "-" +  month +
                                    "-" +  date;
                            }
                        }
                        if(app.getViewName() == 'Detail'){
                            var current_date = app.helper.getDateInstance(current_value, 'yyyy-mm-dd');
                        }
                        else{
                            var current_date = app.helper.getDateInstance(current_value, formatDate);
                        }

                        if(postvalue1){
                            var added_date  = current_date.addDays(postvalue1);
                            postvalue1 = added_date.formatCurrentDate(formatDate);
                        }

                        if(postvalue2){
                            var added_date  = current_date.addDays(postvalue2);
                            postvalue2 = added_date.formatCurrentDate(formatDate);
                        }

                        if(postvalue3){
                            var added_date  = current_date.addDays(postvalue3);
                            postvalue3 = added_date.formatCurrentDate(formatDate);
                        }
                        if(postvalue4){
                            var added_date  = current_date.addDays(postvalue4);
                            postvalue4 = added_date.formatCurrentDate(formatDate);
                        }
                        if(postvalue1_int == 0){
                            if(postvalue2_int == 0){
                                if(postvalue3_int == 0){
                                    if(postvalue4_int == 0){

                                    }else{
                                        sugest_value = [postvalue4,postvalue4_int];
                                    }
                                }else{
                                    sugest_value = [postvalue3,postvalue3_int];
                                }
                            }else{
                                sugest_value = [postvalue2,postvalue2_int];
                            }
                        }else{
                            sugest_value = [postvalue1,postvalue1_int];
                        }

                        predictions = [[postvalue1,postvalue1_int],[postvalue2,postvalue2_int],[postvalue3,postvalue3_int],[postvalue4,postvalue4_int]];
                        return;
                    }
                }
                else if(field_type == "picklist"){
                    if(current_value == "" || current_value == undefined || typeof current_value == "undefined"){
                        var postvalue1_int = cval[6];
                        var postvalue2_int = cval[7];
                        var postvalue3_int = cval[8];
                        var postvalue4_int = cval[9];
                        sugest_value = [cval.postvalue1,postvalue1_int];
                        predictions = [[cval.postvalue1,postvalue1_int],[cval.postvalue2,postvalue2_int],[cval.postvalue3,postvalue3_int],[cval.postvalue4,postvalue4_int]];
                        return;
                    }else{
                        if(current_value == cval.prevalue){
                            sugest_value = [cval.postvalue1,cval.postvalue1_int];
                            predictions = [[cval.postvalue1,cval.postvalue1_int],[cval.postvalue2,cval.postvalue2_int],[cval.postvalue3,cval.postvalue3_int],[cval.postvalue4,cval.postvalue4_int]];
                            return;
                        }
                    }
                }
                else{
                    if(current_value == "" || current_value == undefined || typeof current_value == "undefined"){
                        sugest_value = [cval.postvalue1,cval.postvalue1_int];
                        predictions = [[cval.postvalue1,cval.postvalue1_int],[cval.postvalue2,cval.postvalue2_int],[cval.postvalue3,cval.postvalue3_int],[cval.postvalue4,cval.postvalue4_int]];
                        return;
                    }
                }
            }
        });
        if(predictions.length > 0){
            $(predictions).each(function (key, val) {
                if(val){
                    var int_value = val[0];
                    if(typeof val[1] !== "undefined") int_value = val[1];
                    if(field_type == 'date'){
                        int_value = isNaN(parseInt(int_value)) ? 0 : parseInt(int_value);
                    }
                    if(val[0] && val[1] && sugest_value && sugest_value[0] !=val[0]){
                        if(field_type == 'date'){
                            if(int_value != 0){
                                predictions_html += "<a class='linkToUpdatePridiction' data-fieldname='" +field_name+ "'  data-module='" +field_module+ "' data-recordid='" +record_id+ "' data-value='" +(field_type != 'picklist' ? val[0] : int_value)+ "'>" +val[0]+(field_type == 'date' ? " ("+(int_value >=0 ? '+'+int_value : int_value)+' '+ (int_value == 1 || int_value == -1 ? 'day' : 'days')+")" : '')+"</a><br/>";
                            }
                        }else{
                            predictions_html += "<a class='linkToUpdatePridiction' data-fieldname='" +field_name+ "'  data-module='" +field_module+ "' data-recordid='" +record_id+ "' data-value='" +(field_type != 'picklist' ? val[0] : int_value)+ "'>" +val[0]+(field_type == 'date' ? " ("+(int_value >=0 ? '+'+int_value : int_value)+' '+ (int_value == 1 || int_value == -1 ? 'day' : 'days')+")" : '')+"</a><br/>";
                        }
                    }
                }
            });
        }
        if(sugest_value[0]){
            var int_sugest_value = sugest_value[0];
            if(typeof sugest_value[1] !== "undefined") int_sugest_value = sugest_value[1];
            if(field_type == 'date'){
                int_sugest_value = isNaN(parseInt(int_sugest_value)) ? 0 : parseInt(int_sugest_value);
            }
            btn_predictive = '<button type="button"  class="btn predictiveUpdateThis" data-tooltip = "'+predictions_html+'" data-fieldname = "'+field_name+'" data-module = "'+field_module+'"  data-recordid = "'+record_id+'" data-value = "'+ (field_type != 'picklist' ? sugest_value[0] : int_sugest_value)+'"  style="white-space: nowrap;max-width: 150px;overflow: hidden;text-overflow: ellipsis;background: #cacaca24;box-shadow: 0px 0px 1px 1px #88888833;border-radius: 5px;color: gray;font-size: 11px;padding: initial;padding: 2px;display:none;'+style_reference_field+'">' +
                sugest_value[0]+(field_type == 'date' ? ' ('+(int_sugest_value >= 0 ? '+'+int_sugest_value : int_sugest_value)+' '+ (int_sugest_value == 1 || int_sugest_value == -1 ? 'day' : 'days')+")" : '')+
                '</button>';
        }

        return btn_predictive;
    },
    checkExistedValue:function(value,arr){
        var status = false;
        for(var i=0; i<arr.length; i++){
            var name = arr[i];
            if(name[0] == value || name[1] == value){
                status = true;
                break;
            }
        }
        return status;
    },
    registerShowTooltipOnBtn:function(){
        var self =this;
        jQuery(document).on("hover", ".predictiveUpdateThis", function() {
            var html =  $(this).data('tooltip');
            self.showVtePredictiveActionTooltip(jQuery(this),html);
        });
    },
    showVtePredictiveActionTooltip : function(obj,html){
        //var target_on_quick_form = jQuery("#QuickCreate").find(obj);
        var template = '<div class="popover" role="tooltip">' +
            '<style>' +
            '.popover.bottom > .arrow:after{border-bottom-color:whitesmoke;2px solid rgba(202, 202, 202, 1)}' +
            '.popover > .arrow {border-width: 10px;background-color: rgba(202, 202, 202, 0.14);} ' +
            '.popover-content{background-color:rgba(202, 202, 202, 0.14);font-size: 11px;color:#2c3b49;white-space: nowrap;max-width: 150px !important;overflow: hidden;text-overflow: ellipsis;}' +
            '.popover-title{background: red;text-align:center;color:#f4f12e;font-weight: bold;}' +
            '.popover-content ul{padding: 5px 5px 0 5px}' +
            '.popover-content li{list-style-type: none}' +
            '.popover{background-color: rgba(420, 420, 420, 1);border: 2px solid rgba(420, 420, 420, 1);z-index:99999999;color: #fff;box-shadow: 0 0 6px #000; -moz-box-shadow: 0 0 6px #000;-webkit-box-shadow: 0 0 6px #000; -o-box-shadow: 0 0 6px #000;padding: 0px;border-radius: 6px; -moz-border-radius: 6px; -webkit-border-radius: 6px; -o-border-radius: 6px;}' +
            '</style><div class="arrow">' +
            '</div>' +
            '<div class="popover-content"></div></div>';
        if (!obj.attr('data-popoverShow')) {
            obj.popover('destroy').popover({
                content: html,
                animation : false,
                placement: 'auto bottom',
                html: true,
                template:template,
                container: 'body',
                trigger: 'manual'
            }).on("mouseenter", function () {
                var _this = this;
                $(this).popover("show");
                $(".popover").on("mouseleave", function () {
                    $(_this).popover('hide');
                });
            }).on("mouseleave", function () {
                var _this = this;
                setTimeout(function () {
                    if (!$(".popover:hover").length) {
                        $(_this).popover("hide");
                    }
                }, 100);
            });
            obj.attr('data-popoverShow', true);
        }
        obj.popover('show');
    },
    //predictiveUpdateThis
    PredictiveUpdateThisClick:function(e){
        var this_btn = $(e);
        var current_view = app.getViewName();
        var link_text = this_btn.text();
        var module = app.getModuleName();
        var apply_field = this_btn.data('fieldname');
        var apply_value = this_btn.data('value');
        var newValue = this_btn.data('value');
        var newLabel = this_btn.text();
        if(current_view == "Detail"){
            var data = {};
            var field_td_on_detail_view = $("#" + module+'_detailView_fieldValue_'+apply_field);
            var fieldLabel = field_td_on_detail_view.prev('td').find('span').text();
            var fieldType = field_td_on_detail_view.find('span.value').data('field-type');
            if(fieldType !='picklist' && fieldType !='date'){
                newValue = this_btn.text();
            }
            data['module'] = 'VTEPredictiveFields';
            data['action'] = 'ActionAjax';
            data['mode'] = 'updateSelectedRecord';
            data['apply_module'] = this_btn.data('module');
            data['apply_record'] = this_btn.data('recordid');
            data['apply_field'] = apply_field;
            data['apply_value'] = newValue;
            app.helper.showProgress(app.vtranslate('JS_PLEASE_WAIT'));
            app.request.post({data:data}).then(
                function (err,data) {
                    if(err == null){
                        app.helper.hideProgress();
                        if (data) {
                            if(field_td_on_detail_view.length > 0){
                                //requestMode=full
                                var parent_span = field_td_on_detail_view.find('span.value');
                                if(typeof parent_span.data('field-type') != "undefined" && parent_span.data('field-type') == "reference"){
                                    var c_link = parent_span.html();
                                    var href_link = $(c_link).attr('href');
                                    var html_link = $(c_link).html();
                                    c_link = c_link.replace(html_link,link_text);
                                    c_link = c_link.replace(html_link,link_text);
                                    c_link = c_link.replace(/record=\d*/g,"record="+newValue);
                                    parent_span.html(c_link);
                                }
                                else{
                                    if(field_td_on_detail_view.find('span.value').find('span').length > 0){
                                        if(parent_span.data('field-type') == 'date'){
                                            field_td_on_detail_view.find('span.value').find('span').html(newValue);
                                        }else if(parent_span.data('field-type') == 'picklist'){
                                            field_td_on_detail_view.find('span.value').find('span').html(newLabel);
                                        }else{
                                            field_td_on_detail_view.find('span.value').find('span').html(newValue);
                                        }
                                    }
                                    else{
                                        if(parent_span.data('field-type') == 'date'){
                                            field_td_on_detail_view.find('span.value').html(newValue);
                                        }else if(parent_span.data('field-type') == 'picklist'){
                                            field_td_on_detail_view.find('span.value').html(newLabel);
                                        }else{
                                            field_td_on_detail_view.find('span.value').html(newValue);
                                        }
                                    }
                                }
                            }
                            else{
                                field_td_on_detail_view = this_btn.closest('div');
                                field_td_on_detail_view.find('span.value').html(newValue);
                                fieldLabel =  field_td_on_detail_view.closest('tr.summaryViewEntries').find('td.fieldLabel label').attr('title');
                            }
                            app.helper.showSuccessNotification({
                                message : fieldLabel+' has been updated to '+ link_text
                            });
                            this_btn.attr('disabled','disabled');
                            var popover = this_btn.attr('aria-describedby');
                            $('#'+popover).remove();
                            this_btn.hide();
                            var apply_field = this_btn.data('fieldname');
                            this_btn.closest('div.popover').remove();
                            $("button[data-fieldname='" + apply_field +"']").hide();
                        }
                    }
                }
            );
        }
        else{
            var this_field = $("[name='"+apply_field+"']");
            var fieldtype = this_field.data('fieldtype');
            if(typeof fieldtype == "undefined"){
                if(this_field.hasClass('sourceField')){
                    this_field = $("[data-fieldname='"+apply_field+"']");
                    if(this_field.length > 0) {
                        fieldtype = this_field.data('fieldtype');
                        if (fieldtype == "reference") {
                            apply_value = $(this).text();
                            this_field.val(apply_value);
                        }
                    }
                }
                else this_field.val(apply_value);
            }
            else{
                if(fieldtype == "picklist"){
                    this_field.val(apply_value);
                    this_field.trigger('change');
                }
                else  if(fieldtype == "date"){
                    this_field.val(apply_value);
                }
                else{
                    apply_value = this_btn.text();
                    this_field.val(apply_value);
                }
            }
        }
    },
    registerPredictiveUpdateThisClick: function () {
        var self = this;
        $(document).on('click','.linkToUpdatePridiction',function() {
            self.PredictiveUpdateThisClick(this);
        });
        $(document).on('click','.predictiveUpdateThis',function() {
            self.PredictiveUpdateThisClick(this);

        });
    },
    getQueryParams:function(qs) {
        if(typeof(qs) != 'undefined' ){
            qs = qs.toString().split('+').join(' ');
            var params = {},
                tokens,
                re = /[?&]?([^=]+)=([^&]*)/g;
            while (tokens = re.exec(qs)) {
                params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
            }
            return params;
        }
    },
    checkDisplayOrHidePredictionBtn:function () {
        $('.editAction').on('click',function(){
            var predictiveUpdateThis =  $(this).closest("td").find('button.predictiveUpdateThis');
            if(predictiveUpdateThis.length > 0)predictiveUpdateThis.hide();
            window.setInterval(function(){
                $('.inlineAjaxCancel').on('click',function(){
                    var predictiveUpdateThis =  $(this).closest("td").find('button.predictiveUpdateThis');
                    if(predictiveUpdateThis.length > 0)predictiveUpdateThis.show();
                });
            }, 100);
        });
    },
    registerEvents: function(){
        this.registerApplyPredictiveOnView();
    }
});

jQuery(document).ready(function () {
    // Only load when loadHeaderScript=1 BEGIN #241208
    if (typeof VTECheckLoadHeaderScript == 'function') {
        if (!VTECheckLoadHeaderScript('VTEPredictiveFields')) {
            return;
        }
    }
    // Only load when loadHeaderScript=1 END #241208

    var moduleName = app.getModuleName();
    var viewName = app.getViewName();
    var instance = new VTEPredictiveFields_Js();
    if(viewName == 'Detail'){
        instance.registerApplyPredictiveOnView('Detail');
        instance.checkDisplayOrHidePredictionBtn();
        instance.registerShowTooltipOnBtn();
        instance.registerPredictiveUpdateThisClick();
    }
    if(viewName == 'Edit'){
        instance.registerApplyPredictiveOnView('Edit');
        instance.registerShowTooltipOnBtn();
        instance.registerPredictiveUpdateThisClick();
    }
    jQuery( document ).ajaxComplete(function(event, xhr, settings) {
        var url = settings.data;
        if(typeof url == 'undefined' && settings.url) url = settings.url;
        var other_url = instance.getQueryParams(url);
        if(other_url.view == 'Detail' && other_url.mode == 'showDetailViewByMode' && (other_url.requestMode == 'full' || other_url.requestMode == 'summary' )  && other_url._pjax == '#pjaxContainer') {
            instance.registerApplyPredictiveOnView('Detail');
            instance.checkDisplayOrHidePredictionBtn();
        }
        if(other_url.view == 'Edit' && other_url.returnmode == 'showRelatedList' && other_url.displayMode == 'overlay') {
            instance.registerApplyPredictiveOnView('Edit');
        }
        //{ index.php?module: "Accounts", view: "Detail", record: "31", mode: "showDetailViewByMode", requestMode: "summary", tab_label: "Organization Summary", app: "MARKETING", _pjax: "#pjaxContainer" }
    });
});
