{*<!--
/*************************************************************************************
** The contents of this file are subject to the vtiger CRM Public License Version 1.1
* ("License"); You may not use this file except in compliance with the License
* The Original Code is:  vtiger CRM Commercial
* The Initial Developer of the Original Code is vtiger.
* Portions created by vtiger are Copyright (C) vtiger.
* All Rights Reserved.
*
**************************************************************************************/
-->*}
{include file="../Header.tpl" scripts=$_scripts}
<style>
    .main-title {
        text-align: center;
    }
</style>
<section class="detail-content-wrapper">
    <link type="text/css" rel="stylesheet"
          href="../../{$TEMPLATE_WEBPATH}/resources/libs/bootstrap-3.3.6/css/bootstrap.min.css">
    <div class="container">
        <div class="row" style="margin-top: 50px;     margin-bottom: 10px; border-bottom: 1px solid #ccc;">
            <div class="col-sm-12 main-title">
                <label><strong>Welcome to the VTE Mobile Installation Wizard</strong></label>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <span>You are required to validate the extension before it can be use.Please click on the link below and active this module</span>
            </div>
        </div>
        <div class="row" style="margin-bottom:10px; margin-top: 5px">
            <div class="col-sm-12">
                <span class="col-lg-1"><strong>vTiger URL:</strong></span><span class="col-lg-4"><a target="_blank" href="{$SITE_URL}index.php?module=VTEMobile&parent=Settings&view=Settings">{$SITE_URL}</a></span>
            </div>
        </div>
        <div>
            <span>Having trouble installing? Please Contact Us!</span>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <ul style="padding-left: 10px;">
                    <li>Email: &nbsp;&nbsp;<a style="color: #0088cc; text-decoration:none;"
                                              href="mailto:Support@VTExperts.com">Support@VTExperts.com</a></li>
                    <li>Phone: &nbsp;&nbsp;<span>+1 (818) 495-5557</span></li>
                    <li>Chat: &nbsp;&nbsp;Available on <a style="color: #0088cc; text-decoration:none;"
                                                          href="http://www.vtexperts.com" target="_blank">http://www.VTExperts.com</a>
                    </li>
                </ul>
            </div>

        </div>
    </div>


</section>

