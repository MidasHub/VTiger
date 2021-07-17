{*<!--
/* ********************************************************************************
* The content of this file is subject to the Predictive Fields/Bills ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */
-->*}
{strip}
    <div class="form list_fields">
        {assign var=LISTFIELDS_LENGTH value=(count($SELECTED_MODULE_FIELDS) -1)}
        {assign var=INDEX value = 0 }
        {assign var=REJECT_TABLE value = array("vtiger_inventoryproductrel")}
        <table data-length="{$LISTFIELDS_LENGTH}" border="0px solid #cccccc">
            {foreach from = $SELECTED_MODULE_FIELDS item =val key=k }
                {if !$val->isEditable()}{continue}{/if}
                {if !in_array($val->get('uitype'),$ALOW_UITYPE)}{continue}{/if}
                {if in_array($val->get('table'),$REJECT_TABLE)}{continue}{/if}
                {assign var=MODE4OK value=(($INDEX mod 4) == 0)}
                {if $MODE4OK}
                    <tr>
                {/if}
                <td style="padding: 5px;width: 25%;" class="cell-icon">
                    <input class="list_fields" type="checkbox" name="list_fields" value="{Vtiger_Util_Helper::toSafeHTML($k)}"
                            {if in_array($k,$SELECTED_FIELDS)}
                                checked
                            {/if}>
                    <span class="{$k} icon-module" data-info="{$k}" style="margin-left: 5px;">
                    {vtranslate($val ->get("label"),$SELECTED_MODULE_NAME)}
                    </span>
                </td>
                {if ($INDEX mod 14) == 13 or $LISTFIELDS_LENGTH == $INDEX}
                    </tr>
                {/if}
                <input type="hidden" value="{$INDEX++}">
            {/foreach}
        </table>
    </div>
{/strip}