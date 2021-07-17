{*<!--
/* ********************************************************************************
* The content of this file is subject to the Global Search ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */
-->*}
<form action="index.php" method="post" id="Settings" class="form-horizontal">
    <input type="hidden" name="module" value="GlobalSearch">
    <input type="hidden" name="action" value="SaveAjax">
    <input type="hidden" name="search_module" value="{$SOURCE_MODULE}">
    <input type="hidden" value="" id="selectedModuleFields" name="selectedModuleFields">
    <input type="hidden" value="" id="selectedColumnsSorted" name="selectedColumnsSorted">
    <table class="table table-bordered blockContainer showInlineTable equalSplit" style="width: 500px;">
        <tr>
            <td class="fieldValue medium">
                {vtranslate('LBL_INCLUDE_IN_SEARCH', 'GlobalSearch')}
            </td>
            <td class="fieldValue medium">
                <input type="checkbox" value="1" name="active" {if $ACTIVE eq 1} checked {/if}/>
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fieldValue medium">
                {vtranslate('LBL_SELECT_FIELD_DESCRIPTION', 'GlobalSearch')}
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fieldValue medium">
                {assign var="MODULE_FIELDS_MODEL" value=array()}
                {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$RECORD_STRUCTURE}
                    {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                        {if in_array($FIELD_MODEL->getCustomViewColumnName(), $SELECTED_FIELDS)}
                            {assign var="ARR_SELECTED_FIELDS" array_push($MODULE_FIELDS_MODEL,$FIELD_MODEL)}
                        {/if}
                    {/foreach}
                {/foreach}
                <select class="select2" multiple="true" id="moduleFields" name="fields[]" data-placeholder="Select fields" style="width: 800px">
                    {foreach item=CUSTOMVIEW_COLUMNNAME from=$SELECTED_FIELDS}
                        {foreach key=ARR_LABEL item=OBJ_FIELD_MODEL from=$MODULE_FIELDS_MODEL}
                            {if $OBJ_FIELD_MODEL->getCustomViewColumnName() eq $CUSTOMVIEW_COLUMNNAME}
                                <option value="{$OBJ_FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$OBJ_FIELD_MODEL->getFieldName()}" selected>{vtranslate($OBJ_FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                            {/if}
                        {/foreach}
                    {/foreach}
                    {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$RECORD_STRUCTURE}
                        <optgroup label='{vtranslate($BLOCK_LABEL, $SOURCE_MODULE)}'>
                            {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                                {if !in_array($FIELD_MODEL->getCustomViewColumnName(), $SELECTED_FIELDS)}
                                    <option value="{$FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$FIELD_NAME}">{vtranslate($FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                                {/if}
                            {/foreach}
                        </optgroup>
                    {/foreach}
                    {*Required to include event fields for columns in calendar module advanced filter*}
                    {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$EVENT_RECORD_STRUCTURE}
                        <optgroup label='{vtranslate($BLOCK_LABEL, 'Events')}'>
                            {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                                {if !in_array($FIELD_MODEL->getCustomViewColumnName(), $SELECTED_FIELDS)}
                                    <option value="{$FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$FIELD_NAME}">{vtranslate($FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                                {/if}
                            {/foreach}
                        </optgroup>
                    {/foreach}
                </select>
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fieldValue medium">
                {vtranslate('Select fields to show. If no fields are selected - it will use the fields from "All" filter.', 'GlobalSearch')}
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fieldValue medium">
                {assign var="SELECTED_FIELDS_MODEL" value=array()}
                {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$RECORD_STRUCTURE}
                    {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                        {if in_array($FIELD_MODEL->getCustomViewColumnName(), $SELECTEDFIELDS_SHOW)}
                            {assign var="ARR_SELECTED_FIELDS" array_push($SELECTED_FIELDS_MODEL,$FIELD_MODEL)}
                        {/if}
                    {/foreach}
                {/foreach}
                <select class="select2" multiple="true" id="moduleFieldsShow" name="fields_show[]" data-placeholder="Select fields" style="width: 800px">
                    {foreach item=CUSTOMVIEW_COLUMNNAME from=$SELECTEDFIELDS_SHOW}
                        {foreach key=ARR_LABEL item=OBJ_FIELD_MODEL from=$SELECTED_FIELDS_MODEL}
                            {if $OBJ_FIELD_MODEL->getCustomViewColumnName() eq $CUSTOMVIEW_COLUMNNAME}
                                <option value="{$OBJ_FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$OBJ_FIELD_MODEL->getFieldName()}" selected>{vtranslate($OBJ_FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                            {/if}
                        {/foreach}
                    {/foreach}
                    {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$RECORD_STRUCTURE}
                        <optgroup label='{vtranslate($BLOCK_LABEL, $SOURCE_MODULE)}'>
                            {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                                {if !in_array($FIELD_MODEL->getCustomViewColumnName(), $SELECTEDFIELDS_SHOW)}
                                    <option value="{$FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$FIELD_NAME}">{vtranslate($FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                                {/if}
                            {/foreach}
                        </optgroup>
                    {/foreach}
                    {*Required to include event fields for columns in calendar module advanced filter*}
                    {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$EVENT_RECORD_STRUCTURE}
                        <optgroup label='{vtranslate($BLOCK_LABEL, 'Events')}'>
                            {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                                {if !in_array($FIELD_MODEL->getCustomViewColumnName(), $SELECTEDFIELDS_SHOW)}
                                    <option value="{$FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$FIELD_NAME}">{vtranslate($FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                                {/if}
                            {/foreach}
                        </optgroup>
                    {/foreach}
                </select>
            </td>
        </tr>
    </table>

    <table class="table table-bordered blockContainer showInlineTable equalSplit" style="width: 800px;">
        <tr>
            <td class="fieldValue medium">
                Enable in Quick Search
            </td>
            <td class="fieldValue medium">
                <input type="checkbox" value="1" name="enable_in_quick_search" {if $ENABLE_IN_QUICK_SEARCH eq 1} checked {/if}/>
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fieldValue medium">
                Select fields to search. If no fields are selected, it will use fields that are header fields.
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fieldValue medium">
                {assign var="SEARCH_FIELDS_MODEL" value=array()}
                {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$RECORD_STRUCTURE}
                    {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                        {if in_array($FIELD_MODEL->getCustomViewColumnName(), $QUICK_SEARCH_FIELDS_SEARCH)}
                            {assign var="ARR_SEARCH_FIELDS" array_push($SEARCH_FIELDS_MODEL,$FIELD_MODEL)}
                        {/if}
                    {/foreach}
                {/foreach}

                <select class="select2" multiple="true" id="quick_search_fields_search" name="quick_search_fields_search[]" data-placeholder="Select fields" style="width: 800px">
                    {foreach item=CUSTOMVIEW_COLUMNNAME from=$QUICK_SEARCH_FIELDS_SEARCH}
                        {foreach key=ARR_LABEL item=OBJ_FIELD_MODEL from=$SEARCH_FIELDS_MODEL}
                            {if $OBJ_FIELD_MODEL->getCustomViewColumnName() eq $CUSTOMVIEW_COLUMNNAME}
                                <option value="{$OBJ_FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$OBJ_FIELD_MODEL->getFieldName()}" selected>{vtranslate($OBJ_FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                            {/if}
                        {/foreach}
                    {/foreach}
                    {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$RECORD_STRUCTURE}
                        <optgroup label='{vtranslate($BLOCK_LABEL, $SOURCE_MODULE)}'>
                            {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                                {if !in_array($FIELD_MODEL->getCustomViewColumnName(), $QUICK_SEARCH_FIELDS_SEARCH)}
                                    <option value="{$FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$FIELD_NAME}">{vtranslate($FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                                {/if}
                            {/foreach}
                        </optgroup>
                    {/foreach}
                    {*Required to include event fields for columns in calendar module advanced filter*}
                    {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$EVENT_RECORD_STRUCTURE}
                        <optgroup label='{vtranslate($BLOCK_LABEL, 'Events')}'>
                            {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                                {if !in_array($FIELD_MODEL->getCustomViewColumnName(), $QUICK_SEARCH_FIELDS_SEARCH)}
                                    <option value="{$FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$FIELD_NAME}">{vtranslate($FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                                {/if}
                            {/foreach}
                        </optgroup>
                    {/foreach}
                </select>
                <input type="hidden" value="" id="selectedSearchFields" name="selectedSearchFields">
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fieldValue medium">
                Select fields to show. If no fields are selected, it will use first 3 header fields.
            </td>
        </tr>
        <tr>
            <td colspan="2" class="fieldValue medium">
                {assign var="QUICK_SEARCH_FIELDS_MODEL" value=array()}
                {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$RECORD_STRUCTURE}
                    {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                        {if in_array($FIELD_MODEL->getCustomViewColumnName(), $QUICK_SEARCH_FIELDS_SHOW)}
                            {assign var="testArray" array_push($QUICK_SEARCH_FIELDS_MODEL,$FIELD_MODEL)}
                        {/if}
                    {/foreach}
                {/foreach}

                <select class="select2" multiple="true" id="quick_search_fields_show" name="quick_search_fields_show[]" data-placeholder="Select fields" style="width: 800px">
                    {foreach item=CUSTOMVIEW_COLUMNNAME from=$QUICK_SEARCH_FIELDS_SHOW}
                        {foreach key=ARR_LABEL item=OBJ_FIELD_MODEL from=$QUICK_SEARCH_FIELDS_MODEL}
                            {if $OBJ_FIELD_MODEL->getCustomViewColumnName() eq $CUSTOMVIEW_COLUMNNAME}
                            <option value="{$OBJ_FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$OBJ_FIELD_MODEL->getFieldName()}" selected>{vtranslate($OBJ_FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                            {/if}
                        {/foreach}
                    {/foreach}

                    {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$RECORD_STRUCTURE}
                        <optgroup label='{vtranslate($BLOCK_LABEL, $SOURCE_MODULE)}'>
                            {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                                {if !in_array($FIELD_MODEL->getCustomViewColumnName(), $QUICK_SEARCH_FIELDS_SHOW)}
                                    <option value="{$FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$FIELD_NAME}">{vtranslate($FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                                {/if}
                            {/foreach}
                        </optgroup>
                    {/foreach}
                    {*Required to include event fields for columns in calendar module advanced filter*}
                    {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$EVENT_RECORD_STRUCTURE}
                        <optgroup label='{vtranslate($BLOCK_LABEL, 'Events')}'>
                            {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                                {if !in_array($FIELD_MODEL->getCustomViewColumnName(), $QUICK_SEARCH_FIELDS_SHOW)}
                                    <option value="{$FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$FIELD_NAME}">{vtranslate($FIELD_MODEL->get('label'), $SOURCE_MODULE)}</option>
                                {/if}
                            {/foreach}
                        </optgroup>
                    {/foreach}
                </select>
                <input type="hidden" value="" id="selectedQuickSearchFields" name="selectedQuickSearchFields">
            </td>
        </tr>
    </table>
    <br />
    <div class="row-fluid">
        <button class="btn btn-success btnSaveSettings" type="button">{vtranslate('LBL_SAVE', 'GlobalSearch')}</button>
    </div>
</form>