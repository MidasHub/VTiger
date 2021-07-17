{*<!--
/* ********************************************************************************
* The content of this file is subject to the VTE Quick Edit ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */
-->*}
{strip}
    <div class='vtekb-header'>
        <button type="button" class="icon-remove icon-white vte-close" aria-label="Close" data-dismiss="modal"></button>
        {if $IS_DETAIL == 'showDetail'}
            <button type="button" class="icon-arrow-left icon-white vte-back" ></button>
        {/if}
        <h1 class='title-module'>
            <a href="index.php?module=VTEKB&view=List">{vtranslate($QUALIFIED_MODULE, $QUALIFIED_MODULE)}</a>
        </h1>
        <div class="clearfix"></div>
        <div class="search-box hide">
            <div class="input-group">
                <div class="input-group-btn">
                    <span class="btn btn-default"><i class="glyphicon glyphicon-search"></i></span>
                </div>
                <input id="vtekb_search" type="text" class="form-control" placeholder="{vtranslate('LBL_PLACEHOLDER_SEARCH', $QUALIFIED_MODULE)}" name="search">
                <input type="hidden" id="hfPage" value="0" />
            </div>
        </div>
        <div class="clearfix"></div>
    </div>
{/strip}