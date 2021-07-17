{*<!--
/*********************************************************************************
** The contents of this file are subject to the vtiger CRM Public License Version 1.0
* ("License"); You may not use this file except in compliance with the License
* The Original Code is:  vtiger CRM Open Source
* The Initial Developer of the Original Code is vtiger.
* Portions created by vtiger are Copyright (C) vtiger.
* All Rights Reserved.
*
********************************************************************************/
-->*}
{strip}
    {assign var="_scripts" value=','|explode:'Users/Users.js'}
    {include file="../Header.tpl" scripts=$_scripts}
    <link type="text/css" rel="stylesheet" href="../../{$TEMPLATE_WEBPATH}/resources/libs/bootstrap-3.3.6/css/bootstrap.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/notify.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/notify/0.4.2/styles/metro/notify-metro.css" />

    <style type="text/css">
        {literal}
            body { background: lightsteelblue; background-size: 100%; font-size: 14px; }
            .modal-backdrop { opacity: 0.35; }
            .tooltip { z-index: 1055; }
            input, select, textarea { font-size: 14px; }
        {/literal}
        @media(max-width: 767px) {
            .modal {
                top: 30%!important;
                left: 1px!important;
                width: 99%!important;
                margin: 0 auto!important;

            }
        }
    </style>

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-backdrop"></div>
            <section ng-controller="UsersLoginController" layout="column" id="page">
            <form class="form" id="GoogleAuthentication" name="GoogleAuthentication" ng-submit="checkGoogleAuthentication()" ng-validate>
                <input type="hidden" name="module" value="LoginSecurity" />
                <div class="modal">
                    <div class="modal-header">
                        <div class="clearfix">
                            <div class="pull-right signout">
                                <a id="loginhistory_LBL_SIGN_OUT" href="#" ng-click="logout();">Sign Out</a>
                            </div>
                        </div>
                    </div>
                    <div class="modal-body">
                        <div class="control-group">
                            <div class="col-lg-8">
                                <div class="controls">
                                    <div class="verificationcode">
                                        Enter code from Google Authenticator app to proceed.<br>
                                        <a target="_blank" href="https://www.vtexperts.com/helpdesk/security-standards/2fa-google-authentication-user-configuration/#login"><i style="color: #15c;">(click here for instructions)</i></a>
                                        <br/><br/>
                                        <input type="hidden" name="userid" value="{$USERID}" ng-init="googleAuth.userid={$USERID}" ng-model="googleAuth.userid"/>
                                        <input type="text"  ng-model="googleAuth.verification_code" name="verification_code" ng-required="true" />
                                        <br/><br/>
                                    </div>
                                    <div class="codeinvalid" style="display: none;">
                                        Code is Invalid! Please try again
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <div class="pull-right">
                            <button class="btn btn-success" type="submit" name="saveButton" value="Submit"><strong>Continue</strong></button>
                        </div>
                    </div>
                </div>
            </form>
            </section>
        </div>
    </div>
    </body>
    </html>
{/strip}
