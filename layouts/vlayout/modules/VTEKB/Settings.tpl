{*<!--
/* ********************************************************************************
* The content of this file is subject to the VTE Quick Edit ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */
-->*}
<div class="container-fluid WidgetsManage">
    <div class="widget_header row">
        <div class="col-sm-6"><h4><label>{vtranslate($QUALIFIED_MODULE, $QUALIFIED_MODULE)}</label>
        </div>
    </div>
    <hr>
    <div class="clearfix"></div>
    <div class="summaryWidgetContainer hide">
        <div class="row-fluid">
            <h4>{vtranslate('LBL_STATUS', $QUALIFIED_MODULE)}&nbsp;&nbsp;<input type="checkbox" name="enable_module" id="enable_module" value="1" {if $STATUS eq '1'}checked="" {/if}/></h4>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="hide">
        <div style="padding: 10px; text-align: justify; font-size: 14px; border: 1px solid #ececec; border-left: 5px solid #2a9bbc; border-radius: 5px; overflow: hidden;">
            <h4 style="color: #2a9bbc; margin: 0px -15px 10px -15px; padding: 0px 15px 8px 15px; border-bottom: 1px solid #ececec;"><i class="fa fa-info-circle"></i>&nbsp;&nbsp;{vtranslate('LBL_INFO_BLOCK', $QUALIFIED_MODULE)}</h4>
            {vtranslate('LBL_INFO_BLOCK_ON_SETTING_PAGE', $QUALIFIED_MODULE)}
        </div>
    </div>
    <div class="summaryWidgetContainer">
        <div class="form-group row">
            <label for="txtNumberDisplay" class="span2">{vtranslate('LBL_NUMBER_DISPLAY', $QUALIFIED_MODULE)}</label>
            <div class="span4"><input style="width: 80px;" type="number" id='txtNumberDisplay' value="{$NUMBER_DISPLAY}" class="form-control" /></div>
            <div class="clearfix"></div>
        </div>
        <div class="form-group row hide">
            <label for="txtNumberDisplay" class="span2">{vtranslate('LBL_OPEN_BY_DEFAULT', $QUALIFIED_MODULE)}</label>
            <div class="span4">
                <input type="checkbox" id="chkOpenByDefault" value="1"
                    {if $OPEN_BY_DEFAULT eq 1} checked="checked" {/if}
                    data-on-text="{vtranslate('TEXT_ON', $QUALIFIED_MODULE)}" 
                    data-off-text="{vtranslate('TEXT_OFF', $QUALIFIED_MODULE)}" 
                    data-on-color="success">
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="form-group row">
            <div class="span12"><a id="btnFAQSave" class="btn btn-primary" href="javascript: void(0);">{vtranslate('BTN_SAVE', $QUALIFIED_MODULE)}</a></div>
            <div class="clearfix"></div>
        </div>
    </div>
</div>