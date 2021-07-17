{*<!--
/*********************************************************************************
  ** The contents of this file are subject to the vtiger CRM Public License Version 1.0
   * ("License"); You may not use this file except in compliance with the License
   * The Original Code is: vtiger CRM Open Source
   * The Initial Developer of the Original Code is vtiger.
   * Portions created by vtiger are Copyright (C) vtiger.
   * All Rights Reserved.
  *
 ********************************************************************************/
-->*}
{strip}
    {if $FIELD_MODEL->get('uitype') eq 'vtem'}
        {if ($USER_MODEL->isAdminUser())}
            {assign var="SPECIAL_VALIDATOR" value=$FIELD_MODEL->getValidator()}
            {assign var="FIELD_INFO" value=$FIELD_MODEL->getFieldInfo()}
            {assign var=ASSIGNED_USER_ID value=$FIELD_MODEL->get('name')}
            {assign var=FIELD_VALUE value=$FIELD_MODEL->get('fieldvalue')}
            {assign var=FIELD_VALUE2 value=';'|explode:$FIELD_VALUE}
            {assign var=ALL_MODULES value=Settings_ModuleManager_Module_Model::getAll()}

            <input type="hidden" name="{$ASSIGNED_USER_ID}" value="{$FIELD_VALUE}">
            <select class="chzn-select {$ASSIGNED_USER_ID}" data-vtemodule="true"
                data-name="{$ASSIGNED_USER_ID}" name="{$ASSIGNED_USER_ID}_vtemodule_temp[]" data-fieldinfo='{$FIELD_INFO}'
                {if !empty($SPECIAL_VALIDATOR)}data-validator={Zend_Json::encode($SPECIAL_VALIDATOR)}{/if} multiple>
                {foreach from=$ALL_MODULES item=MODULE}
                    {assign var=FIELD_VALUE value=$FIELD_MODEL->get('fieldvalue')}
                    {assign var=TAB_ID value=$MODULE->getId()}
                    {assign var=MODULE_LABEL value=$MODULE->getName()}
                    <option value="{$TAB_ID}"
                            {foreach item=F_VALUE from=$FIELD_VALUE2}{if $F_VALUE eq $TAB_ID } selected {/if}{/foreach} >{$MODULE_LABEL}</option>
                {/foreach}
            </select>
        {else}
            <input type="hidden" name="{$ASSIGNED_USER_ID}" value="{$FIELD_VALUE}">
            <span>{vtranslate('Only admin can see this field', $MODULE)}</span>
        {/if}
    {/if}
{/strip}