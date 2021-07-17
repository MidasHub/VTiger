{*<!--
/* ********************************************************************************
* The content of this file is subject to the VTE Quick Edit ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */
-->*}
<div id="vtekbContainer" class="container-fluid WidgetsManage vtekb-bg">
	<input type="hidden" id="hfSourceModuleVTEKB" value="{$SOURCE_MODULE}" />
    {include file='HeaderPage.tpl'|@vtemplate_path:$QUALIFIED_MODULE}
    <div class='vtekb-body row'>
        <br /><br />
        {foreach item=COLUMN from=$CATEGORIES}
            {if $COLUMN}
            <div class="span4">
                {foreach item=CATEGORIE from=$COLUMN}
                <div class="category-box">
                    <ul>
                        <li class="category-name">{$CATEGORIE['name']}</li>
                        {foreach item=CATEGORIE_ENTRY from=$CATEGORIE['content']}
                        <li data-id="{$CATEGORIE_ENTRY['id']}" class="openDetail"><a href="javascript: void(0);"><i class="fa fa-file-text-o"></i>&nbsp;&nbsp;{$CATEGORIE_ENTRY['question']}</a></li>
                        {/foreach}
                        {if $CATEGORIE['show_more'] eq 1}
                            <li class="show_more_list" data-page="1" data-category="{$CATEGORIE['name']}"><a href="javascript: void(0);"><i class="glyphicon glyphicon-circle-arrow-right"></i>&nbsp;&nbsp;{vtranslate('LBL_SHOW_MORE', $QUALIFIED_MODULE)}</a></li>
                        {/if}
                    </ul>
                </div>
                {/foreach}
            </div>
            {/if}
        {/foreach}
        <div class="clearfix"></div>
    </div>
</div>