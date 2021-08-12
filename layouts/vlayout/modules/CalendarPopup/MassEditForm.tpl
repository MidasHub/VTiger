{*<!--
/* ********************************************************************************
 * The content of this file is subject to the Calendar Popup ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */
-->*}

<script type="text/javascript">
    var selected_module=['Calendar'];
</script>
{strip}
{foreach key=index item=jsModel from=$SCRIPTS}
	<script type="{$jsModel->getType()}" src="{$jsModel->getSrc()}"></script>
{/foreach}
<div id="massEditContainer" class='modelContainer'>
    <div id="massEdit">
	{*<form class="form-horizontal" id="massEdit" name="MassEdit" method="post" action="index.php">*}
		{*<input type="hidden" name="module" value="{$MODULE}" />*}
		{*<input type="hidden" name="action" value="MassSave" />*}
        {*<div class="slimScrollDiv" style="position: relative; overflow: auto; width: auto; height: 400px;">*}
            <div name='massEditContent'>
                <div class="modal-body tabbable">
                    <ul class="nav nav-tabs massEditTabs">
                        <li class="active"><a href="#module_Events" data-toggle="tab"><strong>{vtranslate('SINGLE_Events', 'Calendar')}</strong></a></li>
                        {foreach item=MODULE_RECORDS from=$SELECTED_MODULES key=MODULE_NAME name=selectedModule}
                            {foreach item=RECORDID key=TABNO from=$MODULE_RECORDS}
                                {if $TABNO eq 0}
                                    {assign var="TABNO" value=''}
                                {else}
                                    {assign var="TABNO" value=$TABNO+1}
                                {/if}
                                <li>
                                    <a href="#module_{$MODULE_NAME}{$TABNO}" class="module_{$MODULE_NAME}" data-toggle="tab">
                                        {if $LINKED_MODULE_RECORDS[$MODULE_NAME]}
                                            <strong>{vtranslate('SINGLE_'|cat:$MODULE_NAME,$MODULE_NAME)} {$TABNO}</strong>
                                        {else}
                                            {vtranslate('SINGLE_'|cat:$MODULE_NAME,$MODULE_NAME)} {$TABNO}
                                        {/if}

                                    </a>
                                </li>
                            {/foreach}
                        {/foreach}
                    </ul>
                    <div class="tab-content massEditContent">
                        <div class="tab-pane active" id="module_Events">
                            <form class="form-horizontal recordEditView" id="module_Events_Fields" name="module_Events_Fields" method="post" action="index.php">
                                {include file="modules/CalendarPopup/EditViewBlocks.tpl" RECORD_STRUCTURE=$LINKED_RECORD_STRUCTURES['Events']->getStructure() MODULE="Events" RECORD_STRUCTURE_MODEL=$LINKED_RECORD_STRUCTURES['Events']}
                            </form>
                        </div>
                        {foreach item=MODULE_RECORDS key=MODULE_NAME from=$SELECTED_MODULES name=selectedModule}
                            {foreach item=RECORD_STRUCTURE_MODEL key=TABNO from=$LINKED_RECORD_STRUCTURES[$MODULE_NAME]}
                                {include file="modules/CalendarPopup/RelatedRecordView.tpl" EVENTID=$LINKED_RECORD_STRUCTURES['Events']->getRecord()->getId() RECORD_STRUCTURE_MODEL=$RECORD_STRUCTURE_MODEL MODULE_LABEL=$MODULE_NAME ENTITY_FIELD = $ENTITY_FIELDS[$MODULE_NAME]}
                            {/foreach}
                        {/foreach}
                    </div>
                </div>
            </div>
        {*</div>*}
        <div class="modal-footer">
            <div class="pull-right cancelLinkContainer" style="margin-top:0px;">
                <a class="cancelLink" type="reset" data-dismiss="modal">{vtranslate('LBL_CANCEL', $MODULE)}</a>
            </div>
            <button class="btn btn-success" type="button" name="saveButton"><strong>{vtranslate('LBL_SAVE', $MODULE)}</strong></button>
        </div>
	{*</form>*}
    </div>
</div>
{/strip}