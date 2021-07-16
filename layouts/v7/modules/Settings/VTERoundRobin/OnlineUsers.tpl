{*+**********************************************************************************
* The contents of this file are subject to the vtiger CRM Public License Version 1.1
* ("License"); You may not use this file except in compliance with the License
* The Original Code is: vtiger CRM Open Source
* The Initial Developer of the Original Code is vtiger.
* Portions created by vtiger are Copyright (C) vtiger.
* All Rights Reserved.
*************************************************************************************}

{strip}
    <div class="modal-dialog modelContainer">
        <div class="modal-content" style="width:675px;">
            <div class="modal-header">
                <div class="clearfix">
                    <div class="pull-right " >
                        <button type="button" class="close" aria-label="Close" data-dismiss="modal">
                            <span aria-hidden="true" class='fa fa-close'></span>
                        </button>
                    </div>
                    <h4 class="pull-left">Online Users</h4>
                </div>
            </div>
            <div class="modal-body">
                <table style="width: 100%;" class="listview-table table-bordered listViewEntriesTable">
                    <thead>
                        <tr class="listViewHeaders">
                            <th style="text-align: center;">First Name</th>
                            <th style="text-align: center;">Last Name</th>
                            <th style="text-align: center;">Email</th>
                            <th style="text-align: center;">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                    {foreach item=USER from=$USERS}
                        <tr class="listViewEntries">
                            <td class="listViewEntryValue value textOverflowEllipsis " style="padding: 5px">{$USER->get('first_name')}</td>
                            <td class="listViewEntryValue value textOverflowEllipsis " style="padding: 5px">{$USER->get('last_name')}</td>
                            <td class="listViewEntryValue value textOverflowEllipsis " style="padding: 5px">{$USER->get('email1')}</td>
                            <td class="listViewEntryValue value textOverflowEllipsis " style="padding: 5px">{$USER->get('rolename')}</td>
                        </tr>
                    {/foreach}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

{/strip}
