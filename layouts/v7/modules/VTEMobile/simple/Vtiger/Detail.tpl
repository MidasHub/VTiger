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
    <section class="detail-content-wrapper" ng-controller="{$_controller}">
        <link type="text/css" rel="stylesheet" href="../../{$TEMPLATE_WEBPATH}/resources/libs/bootstrap-3.3.6/css/bootstrap.min.css">
{literal}

        <style>
            .vteButton{
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
            }
            .vteButtonQuickUpdate {
                border-radius: 2px;
                background-image: none !important;
                box-shadow: none !important;
                line-height: 18px;
                cursor: pointer;
                font-weight: 400;
                padding: 6px 10px !important;
                margin: 6px 8px!important;
                background-color: #FFFFFF !important;
            }
            .md-3-line .md-list-item-text p.header-fields{
                width: 50%;
                float: left;
            }
        </style>

        <header md-page-header fixed-top>
            <md-toolbar>
                <div class="md-toolbar-tools actionbar">
                    <md-button ng-click="gobacktoUrl()" class="md-icon-button" aria-label="side-menu-open">
                        <i class="mdi mdi-arrow-left actionbar-icon"></i>
                    </md-button>
                    <h2 flex>{{pageTitle}}</h2>
                    <span flex></span>
                    <md-button class="md-icon-button" ng-if="module != 'Invoice' && module != 'SalesOrder' && module != 'Quotes' && module != 'PurchaseOrder'" ng-click="detailViewEditEvent();" aria-label="global-search">
                         <i class="mdi mdi-pencil actionbar-icon"></i>
                    </md-button>
                </div>
            </md-toolbar>
        </header>
        <md-content style="padding-top: 56px;">
            <md-toolbar>
                <div layout="row" style="width: 100%">
                    <i style="font-size: 30px;margin: 20px 5px 0px 20px;" class="vicon-{{module | lowercase}}"></i>
                    <md-list-item class="md-3-line">
                        <div class="md-list-item-text">
                            <h3 style="font-weight: bold;line-height: 20px">{{recordName}}</h3>
                            <div ng-repeat="header in headerField |orderBy:'seq' ">
                                <p class="header-fields" ng-if="header.fieldType == 'reference' || header.uitype == '10'">
                                    <i style="font-size: 13px" class="vicon-{{header.relatedModule | lowercase}}"></i> {{header.valueTruncate}}
                                </p>
                                <p class="header-fields" ng-if="header.name == 'assigned_user_id'">
                                    <i style="font-size: 17px;margin: -2px;" class="mdi mdi-account-outline"></i> {{header.value.label}}
                                </p>
                                <p class="header-fields" ng-if="header.fieldType == 'currency'">
                                    {{header.currency}} {{header.valueTruncate}}
                                </p>
                                <p class="header-fields" ng-if="header.fieldType != 'currency' && header.fieldType != 'reference' && header.uitype != '10' && header.name != 'assigned_user_id' && header.fieldType != 'picklist' && header.fieldType != 'multipicklist'">
                                    {{header.valueTruncate}}
                                </p>
                                <p class="header-fields" ng-if="header.fieldType == 'picklist'">
                                    <span ng-if="header.color" style="background-color: {{header.color}}; color: #ffffff; border-radius: 8px; padding: 2px 4px">{{header.valueTruncate}}</span>
                                    <span ng-if="!header.color">{{header.valueTruncate}}</span>
                                </p>
                                <p class="header-fields" ng-if="header.fieldType == 'multipicklist'" >
                                    <!--<span ng-if="header.color" style="background-color: {{head-cocolor}}; color: #ffffff; border-radius: 8px; padding: 2px 4px">{{header.valueTruncate}}</span>-->
                                    <span ng-repeat="(key,val) in header.value">
                                        <span ng-if="val == '#ffffff' || val == '' || val=='#fff' || val=='#FFFFFF'" style=" border-radius: 8px; padding: 2px 4px">{{key}}</span>
                                        <span ng-if="val != '#ffffff' && val != '' && val!='#fff' && val!='#FFFFFF'" style="background-color: {{val}};  border-radius: 8px; padding: 2px 4px">{{key}}</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </md-list-item>
                </div>
            </md-toolbar>
            <md-tabs md-dynamic-height md-border-bottom style="width:100%">
                <md-tab style="width:50%">
                    <md-tab-label>
                        <md-icon style="font-size:13px;padding-top: 5px" class="vicon-detailreport icon-module"></md-icon>DETAILS
                    </md-tab-label>
                    <div flex class="detail-content" style="height:78vh; overflow: scroll;background-color: #ddd">
                        <div class="vteButton" style="background: #ffffff">
                            <div flex ng-repeat="button in buttons">
                                <style>
                                    .p-o-vtebtn{{button.vtebuttonsid}}:hover {  background-color: #{{button.color}}!important;  color: #FFFFFF!important;  }
                                </style>
                                <div data-vtebuttonid="{{button.vtebuttonsid}}" ng-model="button.vtebuttonsid">
                                    <button ng-click="clickButton(button.vtebuttonsid)" type="button" class="vteButtonQuickUpdate p-o-vtebtn{{button.vtebuttonsid}}" data-vtebuttonid="{{button.vtebuttonsid}}" style="color: #{{button.color}};border: thin solid #{{button.color}} !important; ">
                                        <i class="icon-module {{button.icon}}" style="font-size: inherit;"></i>
                                        &nbsp;{{button.header}}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div layout="column" layout-fill layout-align="top center" ng-if="fields.length">

                            <accordion close-others="false">
                                <accordion-group is-open="true" ng-repeat="block in recordData" style="margin: 7px 7px">
                                    <accordion-heading>
                                        <span style="font-weight: bold">{{block.label}}</span>
                                    </accordion-heading>
                                    <md-list style="padding: 0px;" class="fields-list" ng-controller="InlineEditorController"> <!-- infinite-scroll='loadMoreRecords()' infinite-scroll-distance='10'-->
                                        <md-list-item class="md-2-line" style="padding: 0px 5px;" ng-repeat="field in block.fields">
                                            <div class="md-list-item-text field-row">
                                                <div layout="row" flex>
                                                    <div flex="50">
                                                        <p style="margin-right: 5px; opacity: 0.9; color:black; font-size:14px; line-height:25px; font-weight: bold;" class="field-label">
                                                            {{field.label}}
                                                            {/literal}
                                                            <img ng-if="field.isAddress == 'true'" ng-click="showMaps(field.value)" src="../../{$TEMPLATE_WEBPATH}/resources/images/google-maps.png" style="width: 30px; height: 30px">
                                                            {literal}
                                                        </p>
                                                    </div>

                                                    <div flex="50">
                                                        <p style="margin-left: 5px" ng-if="field.uitype == 10 || field.uitype == 51 || field.uitype == 57 || field.uitype == 73 || field.uitype == 81 || field.uitype == 76" >
                                                            {/literal}
                                                            <a href="{literal}{{field.link}}" style="text-decoration: none">{{field.value}}</a>
                                                        </p>

                                                        <p style="margin-left: 5px" ng-if="field.uitype == 17" >
                                                            <a href="{{field.value}}" style="text-decoration: none">{{field.value}}</a>
                                                        </p>

                                                        <p style="margin-left: 5px" ng-if="field.fieldType == 'picklist'" >
                                                            <span ng-if="field.color" style="background-color: {{field.color}}; color: #ffffff; border-radius: 8px; padding: 2px 4px">{{field.value}}</span>
                                                            <span ng-if="!field.color">{{field.value}}</span>
                                                        </p>
                                                        <p style="margin-left: 5px" ng-if="field.fieldType == 'currency'" >
                                                            {{field.currency}} {{field.value}}
                                                        </p>

                                                        <p style="margin-left: 5px" ng-if="field.fieldType != 'currency' && field.name != 'filename' && field.uitype != 10 && field.uitype != 51 && field.uitype != 57 && field.uitype != 17 && field.uitype != 73 && field.uitype != 81 && field.uitype != 76 && field.fieldType != 'picklist'" ng-class="{'value-empty' : !field.value || field.value==='' || field.value==='--None' || field.value==0,'check-nl2br':field.uitype ==19 || field.uitype ==21} ">
                                                            {{field.value}}
                                                        </p>
                                                        <a href="#" data-info="{{field.link}}" ng-click="downloadFile(field.link)" ng-if="field.name == 'filename'">{{field.value}}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </md-list-item>
                                    </md-list>

                                </accordion-group>
                            </accordion>
                            <md-list style="padding-bottom: 130px;" ng-if="lineitems && (module == 'Invoice' || module == 'Quotes' || module == 'SalesOrder' || module == 'PurchaseOrder')">
                                <md-subheader style="margin:0px; padding:0px; background:beige;">Item Details</md-subheader>
                                <md-list-item class="md-2-line" ng-repeat="item in lineitems">
                                    <div layout="column" style="width: 100%;">
                                        <p style="opacity:0.8; color:#0099FF; font-size: 14px; margin: 4px 0px;">{{item.product_name}}</p>
                                        <i style="color:grey; font-size: 11px;">{{item.comment}}</i>
                                        <div layout="row" style="opacity: 0.9;">
                                            <p style="font-size: 12px; margin: 4px 0px;">{{item.quantity}} * {{item.listprice}}</p>
                                        </div>
                                        <div layout="column" flex style="opacity: 0.9">
                                            <p ng-if="item.discount_amount" style="font-size: 12px; margin: 4px 0px;" flex="100">(-) Discount Amount : {{item.discount_amount}}</p>
                                            <p ng-if="item.discount_percent"  style="font-size: 12px; margin: 4px 0px;" flex="100">(-) Discount Percentage : {{item.discount_percent}} (%)</p>
                                        </div>
                                        <div layout="row" style="text-align: right; color:darkgreen;">
                                            <p style="font-size: 12px; margin: 4px 0px; width: 100%;">{{item.netPrice}}</p>
                                        </div>
                                    </div>
                                    <md-divider></md-divider>
                                </md-list-item>
                                <md-list-item layout="column" style="font-size: 13px;">
                                    <div layout="row" style="width:100%">
                                        <p flex="50" style="text-align: left;">Items Total</p>
                                        <p flex="50" style="text-align: right; color:darkgreen;">{{lineItemsSummary.sub_total}}</p>
                                    </div>
                                    <div layout="row" style="width:100%">
                                        <p flex="50" style="text-align: left;">(-) Overall Discount</p>
                                        <p flex="50" style="text-align: right; color:darkgreen;">{{lineItemsSummary.group_discount}}</p>
                                    </div>
                                    <div layout="row" style="width:100%">
                                        <p flex="50" style="text-align: left;">Total After Discount</p>
                                        <p flex="50" style="text-align: right; color:darkgreen;">{{lineItemsSummary.totalAfterDiscount}}</p>
                                    </div>
                                    <div layout="row" style="width:100%">
                                        <p flex="50" style="text-align: left;">Pre Tax Total</p>
                                        <p flex="50" style="text-align: right; color:darkgreen;">{{lineItemsSummary.pre_tax_total}}</p>
                                    </div>
                                    <div layout="row" style="width:100%">
                                        <p flex="50" style="text-align: left;">(+) Tax</p>
                                        <p flex="50" style="text-align: right; color:darkgreen;">{{lineItemsSummary.total_tax}}</p>
                                    </div>
                                    <div layout="row" style="width:100%">
                                        <p flex="50" style="text-align: left;">Adjustment</p>
                                        <p flex="50" style="text-align: right; color:darkgreen;">{{lineItemsSummary.adjustment}}</p>
                                    </div> 
                                    <div layout="row" style="width:100%; color:#0099FF;">
                                        <p flex="50" style="text-align: left;">Grand Total</p>
                                        <p flex="50" style="text-align: right;">{{lineItemsSummary.grand_total}}</p>
                                    </div>
                                </md-list-item>
                            </md-list>
                        </div>
                        <div class="no-records-message" ng-if="!fields.length">
                            <div class="no-records">No Fields Found</div>
                        </div>
                        <div flex></div>
                    </div>
                </md-tab>

                <md-tab>
                    <md-tab-label>
                        <md-icon style="font-size:13px;padding-top: 5px" class="vicon-list icon-module"></md-icon>RELATED
                    </md-tab-label>
                    <div ng-if="relatedModules" style="height:75vh; overflow: scroll;">
                        <md-list-item ng-repeat="(label, info) in relatedModules" ng-click="showRelatedList(info.relatedModule)" ng-if="info.relatedModule!='ModComments'">
                            <p style="font-size: 13px;"><span style="font-size: 12px; color:#FF4068" class="vicon-{{info.relatedModule | lowercase | nospace}}"></span> &nbsp;  {{label}}</p>
                            <p style="text-align:right; color:#0099FF">{{info.count}}</p>
                            <md-divider></md-divider>
                        </md-list-item>
                    </div>
                </md-tab>

                <md-tab ng-if="modComments">
                    <md-tab-label>
                        <md-icon style="font-size:13px;padding-top: 5px" class="vicon-chat icon-module"></md-icon>COMMENTS
                    </md-tab-label>
                    <div style="height:75vh; overflow: scroll;">
                        <md-list-item class="md-2-line" >
                            <div layout="column" style="width: 100%;">
                                <div class="col-lg-12" layout="row" style="opacity: 0.9;padding-top: 10px;">
                                    <textarea style="width: 100%" name="commentcontent" class="commentcontent form-control col-lg-12" placeholder="Post your comment here" rows="2"></textarea>
                                </div>
                                <div class="col-lg-12" layout="row" style="opacity: 0.9;justify-content: flex-end;padding-top: 5px;padding-bottom: 5px;">
                                    <button ng-click="postComment($event)"  class="btn btn-success btn-sm">Post</button>
                                </div>
                            </div>
                            <md-divider></md-divider>
                        </md-list-item>
                        <md-list-item-text ng-repeat="comment in allComment" class="" >
                            <span style="color: blue;padding-left:32px">{{comment.ownername}}</span>&nbsp;&nbsp;
                            <span style="color: #777;"><small>{{comment.commentdatetime}}</small></span>
                            <p style="padding: 0 32px" class="ng-binding ng-scope">
                                <span class="check-nl2br" ng-if="!commentVTE">{{comment.commentcontent | nl2br}}</span>
                                <span class="check-nl2br" ng-if="commentVTE">{{comment.commentcontent}}</span>
                            </p>
                            <md-divider></md-divider>
                        </md-list-item-text>
                    </div>
                </md-tab>
            </md-tabs>
        </md-content>
    </section>
{/literal}
