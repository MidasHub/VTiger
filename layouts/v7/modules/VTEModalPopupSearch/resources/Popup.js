/*+***********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is:  vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 *************************************************************************************/

Vtiger_Popup_Js("VTEModalPopupSearch_Popup_Js", {}, {
	getCompleteParams : function(){
		var params = {};
		params['view'] = this.getView();
		params['src_module'] = jQuery('#parentModule').val();
		params['recordid'] = jQuery('#record_id').val();
		params['src_record'] = jQuery('#src_record').val();
		params['src_field'] = this.getSourceField();
		params['search_key'] =  this.getSearchKey();
		params['search_value'] =  this.getSearchValue();
		params['orderby'] =  this.getOrderBy();
		params['sortorder'] =  this.getSortOrder();
		params['page'] = this.getPageNumber();
		params['related_module'] = jQuery('#related_module').val();
		params['related_parent_id'] = this.getRelatedParentRecord();
		params['search_params'] = JSON.stringify(this.getPopupListSearchParams());
		params['selected_id'] = jQuery('#selectedIds').val();
		params['vtemodalpopupsearch_id'] = jQuery('#vtemodalpopupsearch_id').val();
		params['parent_module'] = jQuery('#parent_module').val();
		params['module'] = 'VTEModalPopupSearch';
		params['show_all_results'] = $('input[name="show_all_results"]').val();
		var condition_field =  jQuery('#condtion_fields').val();
		var arrFields={};
		if(condition_field.length>0){
			arrFields = condition_field.split(',');
		}
		$.each(arrFields, function(i, item) {
			var fieldValue = $('#EditView').find('[name="'+item+'"]').val();
			params[item]=fieldValue;
		})
		if(this.isMultiSelectMode()) {
			params['multi_select'] = true;
		}
		return params;
	},

	/**
	 * Function to get Page Jump Params
	 */
	getPageJumpParams: function () {
		var params = this.getCompleteParams();
		params['view'] = "PopupAjax";
		params['mode'] = "getPageCount";

		return params;
	},
    show_all_results:function(){
        $('.show-all-results').on('click',function(){
            var data_showing_alls = $(this).data('showing-alls');
            if(data_showing_alls == 0){
                $('input[name="show_all_results"]').val(1);
                $(this).html('Showing all results');
                $(this).data('showing-alls',1);
            }else{
                $('input[name="show_all_results"]').val(0);
                $(this).html('Show all results');
                $(this).data('showing-alls',0);
            }
            $('#popupPageContainer').find('button[data-trigger="PopupListSearch"]').trigger('click');
        });
    },
	registerEvents: function () {
		this._super();
        this.show_all_results();
	}
});

