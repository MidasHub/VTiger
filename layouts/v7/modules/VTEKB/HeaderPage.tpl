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
    <div class='vtekb-header' style="padding-left: 0px !important; padding-right: 0px !important">
		<divs>
			{if $IS_DETAIL == 'showDetail'}
				<button type="button" class="btn btnGoback" >&lt;&nbsp;{vtranslate('TXT_GO_BACK', $QUALIFIED_MODULE)}</button>
			{/if}
			<button type="button" class="close" aria-label="Close" data-dismiss="modal" style="margin-top: 3%; margin-right: 2%;"><span aria-hidden="true" class="fa fa-close"></span></button>
			<!-- {*header here*} -->
			<div class="clearfix" style="height: 15px !important"></div>
			<div class="search-box">
				<div class="input-group">
					<div class="input-group-btn">
						<span class="btn btn-default"><i class="glyphicon glyphicon-search" style="padding-bottom: 15px !important; height: 20px !important; top: -2px !important"></i></span>
					</div>
					<input id="vtekb_search" type="text" class="form-control" placeholder="{vtranslate('LBL_PLACEHOLDER_SEARCH', $QUALIFIED_MODULE)}" name="search">
					<input type="hidden" id="hfPage" value="0" />
					<input type="hidden" id="hfVTEKBSourceModule" value="{$SOURCE_MODULE}">
				</div>
			</div>
			<div class="clearfix"></div>
			<br /><br />
		</div>
    </div>
{/strip}