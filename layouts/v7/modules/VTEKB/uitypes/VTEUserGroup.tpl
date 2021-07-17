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
    {if $FIELD_MODEL->get('uitype') eq 'vteug'}
        {if ($USER_MODEL->isAdminUser())}
            {assign var="SPECIAL_VALIDATOR" value=$FIELD_MODEL->getValidator()}
            {assign var="FIELD_INFO" value=$FIELD_MODEL->getFieldInfo()}
            {assign var=ASSIGNED_USER_ID value=$FIELD_MODEL->get('name')}
            {assign var=FIELD_VALUE value=$FIELD_MODEL->get('fieldvalue')}
            {assign var=FIELD_VALUE2 value=';'|explode:$FIELD_VALUE}
            {assign var=MEMBER_GROUPS value=Settings_Groups_Member_Model::getAll()}

            {assign var=ACCESSIBLE_GROUP_LIST value=$USER_MODEL->getAccessibleGroupForModule($MODULE)}
            <input type="hidden" name="{$ASSIGNED_USER_ID}" value="{$FIELD_VALUE}">
            <select class="select2 inputElement" data-name="{$ASSIGNED_USER_ID}" data-vteusergroup="true" name="{$ASSIGNED_USER_ID}_vteusergroup_temp[]" multiple
                    {if $FIELD_INFO["mandatory"] eq true} data-rule-required="true" {/if}
                    {if count($FIELD_INFO['validator'])}
                        data-specific-rules='{ZEND_JSON::encode($FIELD_INFO["validator"])}'
                    {/if}
            >
                {foreach from=$MEMBER_GROUPS key=GROUP_LABEL item=ALL_GROUP_MEMBERS}
                    <optgroup label="{$GROUP_LABEL}">
                        {foreach from=$ALL_GROUP_MEMBERS item=MEMBER}
                            {assign var=OWNER_ID value=$MEMBER->getId()}
                            <option value="{$MEMBER->getId()}"  data-member-type="{$GROUP_LABEL}"
                                    {foreach item=USER from=$FIELD_VALUE2}{if $USER eq $OWNER_ID } selected {/if}{/foreach} >{$MEMBER->getName()}</option>
                        {/foreach}
                    </optgroup>
                {/foreach}
            </select>
        {else}
            <input type="hidden" name="{$ASSIGNED_USER_ID}" value="{$FIELD_VALUE}">
            <span>{vtranslate('Only admin can see this field', $MODULE)}</span>
        {/if}
    {/if}

{/strip}