/*+***********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is: vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 *************************************************************************************/
Vtiger_AdvanceFilter_Js('VTEModalPopupSearch_AdvanceFilter_Js',{

},{
	filterContainer : false,
	init : function(container) {
		if(typeof container == 'undefined') {
			container = jQuery('.filterContainer');
		}

		if(container.is('.filterContainer')) {
			this.setFilterContainer(container);
		}else{
			this.setFilterContainer(jQuery('.filterContainer',container));
		}
		this.initialize();
	},
	getModuleName : function() {
		return app.getModuleName();
	},
	/**
	 * Function to load condition list for the selected field
	 * (overrrided to remove "has changed" condition for related record fields in workflows)
	 * @params : fieldSelect - select element which will represents field list
	 * @return : select element which will represent the condition element
	 */
	loadConditions : function(fieldSelect) {
		var row = fieldSelect.closest('div.conditionRow');
		var conditionSelectElement = row.find('select[name="comparator"]');
		var conditionSelected = conditionSelectElement.val();
		var fieldSelected = fieldSelect.find('option:selected');
		var fieldLabel = fieldSelected.val();
		var match = fieldLabel.match(/\((\w+)\) (\w+)/);
		var fieldSpecificType = this.getFieldSpecificType(fieldSelected)
		var conditionList = this.getConditionListFromType(fieldSpecificType);
		//for none in field name
		if(typeof conditionList == 'undefined') {
			conditionList = {};
			conditionList['none'] = '';
		}
		var options = '';
		for(var key in conditionList) {
			//IE Browser consider the prototype properties also, it should consider has own properties only.
			if(conditionList.hasOwnProperty(key)) {
				var conditionValue = conditionList[key];
				var conditionLabel = this.getConditionLabel(conditionValue);
				if(match != null){
					if(conditionValue != 'has changed'){
						options += '<option value="'+conditionValue+'"';
						if(conditionValue == conditionSelected){
							options += ' selected="selected" ';
						}
						options += '>'+conditionLabel+'</option>';
					}
				}else{
					options += '<option value="'+conditionValue+'"';
					if(conditionValue == conditionSelected){
						options += ' selected="selected" ';
					}
					options += '>'+conditionLabel+'</option>';
				}
			}
		}
		conditionSelectElement.empty().html(options).trigger('change');
		// adding validation to comparator field
		conditionSelectElement.addClass('validate[required]');
		return conditionSelectElement;
	},
	/**
	 * Function which will load the field specific ui for a selected field
	 * @prarms : fieldSelect - select element which will represents field list
	 * @return : current instance
	 */

	loadFieldSpecificUi : function(fieldSelect) {
		var selectedOption = fieldSelect.find('option:selected');
		var row = fieldSelect.closest('div.conditionRow');
		var fieldUiHolder = row.find('.fieldUiHolder');
		var conditionSelectElement = row.find('select[name="comparator"]');
		var fieldInfo = selectedOption.data('fieldinfo');

		var fieldType = 'string';
		if(typeof fieldInfo != 'undefined') {
			fieldType = fieldInfo.type;
		}
		var comparatorElementVal = fieldInfo.comparatorElementVal = conditionSelectElement.val();
		if(comparatorElementVal=='ewp'){
			app.helper.showProgress();
			var moduleName = 'AdvanceFilter';
			var fieldModel = Vtiger_Field_Js.getInstance(fieldInfo, moduleName);
			this.fieldModelInstance = fieldModel;
			var fieldSpecificUi = this.getFieldSpecificUi(fieldSelect);

			//remove validation since we dont need validations for all eleements
			// Both filter and find is used since we dont know whether the element is enclosed in some conainer like currency
			var fieldName = fieldModel.getName();
			if (fieldModel.getType() == 'multipicklist') {
				fieldName = fieldName + "[]";
			}
			if ((fieldModel.getType() == 'picklist' || fieldModel.getType() == 'owner') && fieldSpecificUi.is('select')
				&& ( comparatorElementVal == 'e' || comparatorElementVal == 'n' || comparatorElementVal == 'ewp')) {
				fieldName = fieldName + "[]";
			}
			var massEditField = row.find(".fieldUiHolder");
			var fieldValue = massEditField.find("input[name="+ fieldName+"]").val();
			var url ='index.php?module=VTEModalPopupSearch&view=MassActionAjax&mode=getFieldsOfModules';
			var actionParams = {
				"type":"POST",
				"url":url,
				"dataType":"html",
				"data" : {
					'module_name': $('#custom_module').val(),
					'field_name': fieldName,
					'field_value': fieldValue,
				}
			};

			app.request.post(actionParams).then(
				function(err,data){
					if(err === null) {
						app.helper.hideProgress();
						massEditField.html(data);
						//app.changeSelectElementView(massEditForm);
						//vtUtils.applyFieldElementsView(massEditForm);
						var table_conditions = jQuery('#table-conditions');
						var advanceFilterContainer = jQuery('.vte-advancefilter');
						app.changeSelectElementView(advanceFilterContainer);
						vtUtils.applyFieldElementsView(advanceFilterContainer.find('select.select2'));
						vtUtils.showSelect2ElementView(advanceFilterContainer.find('select.select2'));

					}else{
						// to do
					}
				}
			);

		}else {
			if (fieldType == 'date' || fieldType == 'datetime') {
				fieldInfo.dateSpecificConditions = this.getDateSpecificConditionInfo();
			}
			var moduleName = 'AdvanceFilter';
			var fieldModel = Vtiger_Field_Js.getInstance(fieldInfo, moduleName);
			this.fieldModelInstance = fieldModel;
			var fieldSpecificUi = this.getFieldSpecificUi(fieldSelect);

			//remove validation since we dont need validations for all eleements
			// Both filter and find is used since we dont know whether the element is enclosed in some conainer like currency
			var fieldName = fieldModel.getName();
			if (fieldModel.getType() == 'multipicklist') {
				fieldName = fieldName + "[]";
			}
			if ((fieldModel.getType() == 'picklist' || fieldModel.getType() == 'owner') && fieldSpecificUi.is('select')
				&& ( comparatorElementVal == 'e' || comparatorElementVal == 'n')) {
				fieldName = fieldName + "[]";
			}

			if (fieldSpecificUi.find('.add-on').length > 0) {
				fieldSpecificUi.filter('.input-append').addClass('row-fluid');
				fieldSpecificUi.find('.input-append').addClass('row-fluid');
				fieldSpecificUi.filter('.input-prepend').addClass('row-fluid');
				fieldSpecificUi.find('.input-prepend').addClass('row-fluid');
				fieldSpecificUi.find('input[type="text"]').css('width', '79%');
			} else {
				fieldSpecificUi.filter('[name="' + fieldName + '"]').addClass('row-fluid');
				fieldSpecificUi.find('[name="' + fieldName + '"]').addClass('row-fluid');
			}

			fieldSpecificUi.filter('[name="' + fieldName + '"]').attr('data-value', 'value').removeAttr('data-validation-engine').addClass('ignore-validation');
			fieldSpecificUi.find('[name="' + fieldName + '"]').attr('data-value', 'value').removeAttr('data-validation-engine').addClass('ignore-validation');

			if (fieldModel.getType() == 'currency') {
				fieldSpecificUi.filter('[name="' + fieldName + '"]').attr('data-decimal-separator', fieldInfo.decimal_separator).attr('data-group-separator', fieldInfo.group_separator);
				fieldSpecificUi.find('[name="' + fieldName + '"]').attr('data-decimal-separator', fieldInfo.decimal_separator).attr('data-group-separator', fieldInfo.group_separator);
			}

			fieldUiHolder.html(fieldSpecificUi);

			if (fieldSpecificUi.is('input.select2')) {
				var tagElements = fieldSpecificUi.data('tags');
				var params = {tags: tagElements, tokenSeparators: [","]}
				vtUtils.showSelect2ElementView(fieldSpecificUi, params);
			} else if (fieldSpecificUi.is('select')) {
				if (fieldSpecificUi.hasClass('chzn-select')) {
					app.changeSelectElementView(fieldSpecificUi)
				} else {
					vtUtils.showSelect2ElementView(fieldSpecificUi);
				}
			} else if (fieldSpecificUi.has('input.dateField').length > 0) {
				vtUtils.registerEventForDateFields(fieldSpecificUi);
			} else if (fieldSpecificUi.has('input.timepicker-default').length > 0) {
				vtUtils.registerEventForTimeFields(fieldSpecificUi);
			}
			this.addValidationToFieldIfNeeded(fieldSelect);

			var comparatorContainer = conditionSelectElement.closest('[class^="conditionComparator"]');
			//if it is check box then we need hide the comprator
			if (fieldModel.getType().toLowerCase() == 'boolean') {
				//making the compator as equal for check box
				conditionSelectElement.find('option[value="e"]').attr('selected', 'selected');
				comparatorContainer.hide();
			} else {
				comparatorContainer.show();
			}

			// Is Empty, today, tomorrow, yesterday conditions does not need any field input value - hide the UI
			// re-enable if condition element is chosen.
			var specialConditions = ["y", "today", "tomorrow", "yesterday", "ny"];
			if (specialConditions.indexOf(conditionSelectElement.val()) != -1) {
				fieldUiHolder.hide();
			} else {
				fieldUiHolder.show();
			}
		}
		return this;
	},

	/**
	 * Function to retrieve the values of the filter
	 * @return : object
	 */
	getValues : function() {
		var thisInstance = this;
		var filterContainer = this.getFilterContainer();

		var fieldList = new Array('columnname', 'comparator', 'value', 'column_condition');

		var values = {};
		var columnIndex = 0;
		var conditionGroups = jQuery('.conditionGroup', filterContainer);
		conditionGroups.each(function(index,domElement){
			var groupElement = jQuery(domElement);
			values[index+1] = {};
			var conditions = jQuery('.conditionList .conditionRow',groupElement);
			values[index+1]['columns'] = {};
			conditions.each(function(i, conditionDomElement){
				var rowElement = jQuery(conditionDomElement);
				var conditionSelectElement = rowElement.find('select[name="comparator"]');
				var comparatorElementVal = conditionSelectElement.val();
				var fieldSelectElement = jQuery('[name="columnname"]', rowElement);
				var valueSelectElement = jQuery('[data-value="value"]',rowElement);
				//To not send empty fields to server
				if(thisInstance.isEmptyFieldSelected(fieldSelectElement)) {
					return true;
				}
				var fieldDataInfo = fieldSelectElement.find('option:selected').data('fieldinfo');
				var fieldType = fieldDataInfo.type;
				var rowValues = {};
				if(fieldType == 'owner' || fieldType == 'ownergroup'){
					for(var key in fieldList) {
						var field = fieldList[key];
						if(field == 'value' && valueSelectElement.is('select')){
							var selectedOptions = valueSelectElement.find('option:selected');
							var newvaluesArr = [];
							jQuery.each(selectedOptions,function(i,e) {
								newvaluesArr.push(jQuery.trim(jQuery(e).text()));
							});
							if(selectedOptions.length == 0){
								rowValues[field] = '';
							} else {
								if(comparatorElementVal=='ewp'){
									rowValues[field] = valueSelectElement.val();
								}else {
									rowValues[field] = newvaluesArr.join(',');
								}
							}

						} else if(field == 'value' && valueSelectElement.is('input')) {
							rowValues[field] = valueSelectElement.val();
						} else {
							rowValues[field] = jQuery('[name="'+field+'"]', rowElement).val();
						}
					}
				} else if (fieldType == 'picklist' || fieldType == 'multipicklist') {
					for(var key in fieldList) {
						var field = fieldList[key];
						if(field == 'value' && valueSelectElement.is('input')) {
							var commaSeperatedValues = valueSelectElement.val();
							var pickListValues = valueSelectElement.data('picklistvalues');
							var valuesArr = commaSeperatedValues.split(',');
							var newvaluesArr = [];
							for(i=0;i<valuesArr.length;i++){
								if(typeof pickListValues[valuesArr[i]] != 'undefined'){
									newvaluesArr.push(pickListValues[valuesArr[i]]);
								} else {
									newvaluesArr.push(valuesArr[i]);
								}
							}
							var reconstructedCommaSeperatedValues = newvaluesArr.join(',');
							rowValues[field] = reconstructedCommaSeperatedValues;
						} else if(field == 'value' && valueSelectElement.is('select') && fieldType == 'picklist'){
							var value = valueSelectElement.val();
							if(value == null){
								rowValues[field] = value;
							} else {
								if(comparatorElementVal=='ewp'){
									rowValues[field] = valueSelectElement.val();
								}else {
									if(typeof newvaluesArr !='undefined' && newvaluesArr.length>0)
										rowValues[field] = newvaluesArr.join(',');
									else {
										newvaluesArr = valueSelectElement.val();
										rowValues[field] = newvaluesArr.join(',');
									}


								}
							}
						} else if(field == 'value' && valueSelectElement.is('select') && fieldType == 'multipicklist'){
							var value = valueSelectElement.val();
							if(value == null){
								rowValues[field] = value;
							} else {
								rowValues[field] = value.join(',');
							}
						} else {
							rowValues[field] = jQuery('[name="'+field+'"]', rowElement).val();
						}
					}

				} else {
					for(var key in fieldList) {
						var field = fieldList[key];
						if(field == 'value'){
							rowValues[field] = valueSelectElement.val();
						}  else {
							rowValues[field] = jQuery('[name="'+field+'"]', rowElement).val();
						}
					}
				}

				if(rowElement.is(":last-child")) {
					rowValues['column_condition'] = '';
				}
				values[index+1]['columns'][columnIndex] = rowValues;
				columnIndex++;
			});
			if(groupElement.find('div.groupCondition').length > 0) {
				values[index+1]['condition'] = conditionGroups.find('div.groupCondition [name="condition"]').val();
			}
		});
		return values;

	},
	/**
	 * Functiont to get the field specific ui for the selected field
	 * @prarms : fieldSelectElement - select element which will represents field list
	 * @return : jquery object which represents the ui for the field
	 */
	getFieldSpecificUi : function(fieldSelectElement) {
		var fieldSelected = fieldSelectElement.find('option:selected');
		var fieldInfo = fieldSelected.data('fieldinfo');
		if(jQuery.inArray(fieldInfo.comparatorElementVal,this.comparatorsWithNoValueBoxMap) != -1){
			return jQuery('');
		} else {
			return this._super(fieldSelectElement);
		}
	}
});

Vtiger_Date_Field_Js('VTEModalPopupSearch_Date_Field_Js',{},{

	/**
	 * Function to get the user date format
	 */
	getDateFormat : function(){
		return this.get('date-format');
	},

	/**
	 * Function to get the ui
	 * @return - input text field
	 */
	getUi : function() {
		var comparatorSelectedOptionVal = this.get('comparatorElementVal');
		var dateSpecificConditions = this.get('dateSpecificConditions');
		if(comparatorSelectedOptionVal.length > 0) {
			if(comparatorSelectedOptionVal == 'between' || comparatorSelectedOptionVal == 'custom'){
				var html = '<div class="date"><input class="dateField inputElement" style="width:auto;" data-calendar-type="range" name="'+ this.getName() +'" data-date-format="'+ this.getDateFormat() +'" type="text" ReadOnly="true" value="'+  this.getValue() + '"></div>';
				var element = jQuery(html);
				return this.addValidationToElement(element);
			} else if(this._specialDateComparator(comparatorSelectedOptionVal)) {
				var html = '<input name="'+ this.getName() +'" type="text" value="'+this.getValue()+'" data-validation-engine="validate[funcCall[Vtiger_Base_Validator_Js.invokeValidation]]" data-validator="[{"name":"PositiveNumber"}]">\n\
							<input type="hidden" name="valuetype" value="'+this.get('workflow_valuetype')+'" />';
				return jQuery(html);
			} else if (comparatorSelectedOptionVal in dateSpecificConditions) {
				var startValue = dateSpecificConditions[comparatorSelectedOptionVal]['startdate'];
				var endValue = dateSpecificConditions[comparatorSelectedOptionVal]['enddate'];
				var html = '<input name="'+ this.getName() +'"  type="text" ReadOnly="true" value="'+  startValue +','+ endValue +'">'
				return jQuery(html);
			} else if(comparatorSelectedOptionVal == 'is today' || comparatorSelectedOptionVal == 'is tomorrow' || comparatorSelectedOptionVal == 'is yesterday') {
				//show nothing
			}else {
				return this._super();
			}
		} else {
			var html = '<input type="text" class="getPopupUi date inputElement" name="'+ this.getName() +'"  data-date-format="'+ this.getDateFormat() +'"  value="'+  this.getValue() + '" />'+
				'<input type="hidden" name="valuetype" value="'+this.get('workflow_valuetype')+'" />'
			var element = jQuery(html);
			return this.addValidationToElement(element);
		}
	},

	_specialDateComparator : function(comp) {
		var specialComparators = ['less than days ago', 'more than days ago', 'in less than', 'in more than', 'days ago', 'days later', 'less than days later', 'more than days later'];
		for(var index in specialComparators) {
			if(comp == specialComparators[index]) {
				return true;
			}
		}
		return false;
	}
});
VTEModalPopupSearch_Date_Field_Js('VTEModalPopupSearch_Datetime_Field_Js',{},{

});