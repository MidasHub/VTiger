<?php
/* ********************************************************************************
 * The content of this file is subject to the Module & Link Creator ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */

$languageStrings = array(
    'ModuleLinkCreator' => 'Custom Module Builder',
    'Module & Link Creator' => 'Custom Module Builder',
    'LBL_MODULE_NAME' => 'Module Name',
    'LBL_MODULE_LABEL' => 'Module Label',
    'LBL_MODULE' => 'Module',
    'LBL_FIELDS' => 'Fields',
    'LBL_ACTIVE' => 'Active',
    'LBL_STATUS' => 'Status',
    'LBL_VIEW_UPDATES_LOG' => 'View Updates Log',
    'LBL_UPDATES_LOG' => 'Updates Log',
    'LBL_ID' => 'ID',
    'LBL_FILENAME' => 'File name',
    'LBL_DESCRIPTION' => 'Description',
    'LBL_SUCCESS' => 'Success',
    'LBL_SUCCESSFUL' => 'Successful',
    'LBL_FAILURE' => 'Failure',
    'LBL_NOT_FOUND' => 'Not found',
    'LBL_DELETED_SUCCESSFULLY' => 'Deleted successfully',
    'LBL_DELETED_FAILURE' => 'Deleted failure',
    'LBL_INVALID_MODULE' => 'Invalid module',
    'LBL_INVALID_DOCUMENT' => 'Invalid document',
    'LBL_PLS_SELECT' => 'Please select ...',
    'LBL_MODULE_DETAILS' => 'Module Details',
    'LBL_MODULE_TYPE' => 'Module Type',
    'LBL_LIST_VIEW_FILTER_FIELDS' => 'List View Filter Fields',
    'LBL_SUMMARY_FIELDS' => 'Summary Fields',
    'LBL_QUICK_CREATE_FIELDS' => 'Quick Create Fields',
    'LBL_LINKED_MODULES' => 'Linked modules',
    'LBL_EXIST_MODULE' => 'The module is exist',
    'LBL_VALID_MODULE' => 'The module is valid',
    'LBL_DOWNLOAD' => 'Download',
    'LBL_ICON' => 'Module Icon',
    'LBL_EDIT_RELATED_FIELD' => 'Edit related field',
    'not_related_list' => 'Not create related list',
    'Welcome To Module & Link Creator' => 'Welcome To Custom Module Builder',

    /* For License page - Begin */
    'MODULE_LBL' => 'VTE Custom Module Builder',
    'LBL_REQUIREMENTS' => 'Requirements',
    'LBL_LICENSING' => 'Licensing',
    'LBL_COMPLETE' => 'Complete',
    'LBL_WELCOME' => 'Welcome to the',
    'LBL_INSTALLATION_WIZARD' => 'Installation Wizard',
    'LBL_INSTALL' => 'Install',
    'LBL_THANK' => 'Thank you for purchasing the',
    'LBL_VTIGER_EXTENSION' => 'vTiger Extension!',
    'LBL_PRODUCT_REQUIRES' => 'The Product requires PHP-SOAP & IonCude Loader to function properly.',
    'LBL_PHPSOAP' => 'PHP-SOAP',
    'LBL_IONCUDE' => 'IonCude Loader',
    'LBL_INSTALLATION_INSTRUCTIONS' => 'Click here for Installation Instructions',
    'LBL_BOTH_PHP_EXT' => 'Both PHP Extensions are mandatory',
    'LBL_YOU_WILL_NOT' => 'You will not be abe to complete',
    'LBL_EXT_INSTALLATION' => 'Extension installation without them being installed first.',
    'LBL_HAVE_TROUBLE' => 'Having trouble installing?',
    'LBL_CONTACT_US' => 'Please Contact Us!',
    'LBL_EMAIL' => 'Email',
    'LBL_PHONE' => 'Phone',
    'LBL_CHAT' => 'Chat',
    'LBL_AVAILABLE_ON' => 'Available on',
    'LBL_YOU_ARE_REQUIRED_VALIDATE' => 'You are required to validate the extension before it can be use. Please enter the license key provided.',
    'LBL_VTIGER_URL' => 'vTiger URL:',
    'LBL_LICENSE_KEY' => 'License Key:',
    'LBL_LICENSE_EXPIRES' => 'License Expires:',
    'LBL_SUPPORT_EXPIRES' => 'Support Expires:',
    'LBL_ACTIVATE' => 'Activate',
    'LBL_HAVING_TROUBLE' => 'Having trouble? Please Contact Us!',
    'LBL_ORDER_NOW' => 'Order Now',
    'LBL_FINISH' => 'Finish',
    'LBL_EXPIRES_ON' => 'Expires on',
    'LBL_EXPIRED_ON' => 'Expired on',
    'LBL_LICENSE_UPGRADE' => 'License & Upgrade',
    'LBL_UPGRADE' => 'Upgrade',
    'LBL_RELEASE_LICENSE' => 'Release License',
    'LBL_INSTALLATION_COMPLETED' => 'The Installation Completed Successfully!',
    'LBL_FEEL_FREE_CONTACT' => 'If you have any questions or run into any issues - feel free to contact us.',
    'LBL_HAS_BEEN_SUCCESSFULLY' => 'has been installed & activated successfully!',
    'LBL_MORE_EXTENSIONS' => 'For more vTiger Extensions, please visit our website',
    /* For License page - End */

    /* For Related Field Creator - Begin */
    'LBL_RELATEDFIELDS' => 'Related Field Creator',
    'LBL_CREATEING_11' => 'Creating 1:1 Relationship',
    'LBL_CREATEING_MM' => 'Creating M:M Relationship',
    'LBL_CREATEING_1M' => 'Creating 1:M Relationship',
    'LBL_CREATEING_1NONE' => 'Creating 1:NONE Relationship',
    'LBL_CREATEING_ONE_WAY' => 'Creating One way Relationship',
    'notice11' => '<p>It\'s very easy to create M:M relationship. Please select module1 and module2. The related list labels(new related list that will be created) will automatically fill in, however you put in your own labels if needed.</br></br>As stated above, this is M:M relationship, meaning that one module will be linked to another. For example, if have 2 custom modules "Servers" & "Passwords" and you create M:M relationship - it will add a "Passwords" related list to "Servers" custom module and "Servers" related list to "Passwords" custom module.</br></br>Important: The relationship is created following VTiger standards, however the database is modified when the relationship is added. We strongly recommend to backup your database and files before creating any relationship fields.</p>',
    'notice1M' => '<p>Creating 1:M relationship is fairly simple task, assuming if you know what you are trying to achieve. This will create a FIELD and RELATEDLIST. Please refer to the example below.</br></br>This relationship will allow you to create Parent/Child relationship between 2 modules. First, select "Primary Module" e.g "Servers", next select "Child Module/Related List" e.g "Passwords" and the rest of the fields will be automatically filled in for you. You can still change the field/related list labels as needed. Once you save such relationship, you will then have a "Passwords" related list on the "Servers" modules and "Servers" field on the "Passwords" module, meaning that you will be able to create/add multiple "Password" records on the "Servers" module, while the "Password" record can ONLY be linked to ONE "Server".</br></br>Important: The relationship is created following VTiger standards, however the database is modified when the relationship is added. We strongly recommend to backup your database and files before creating any relationship fields.</p>',
    'noticeMM' => '<p>It\'s very easy to create M:M relationship. Please select module1 and module2. The related list labels(new related list that will be created) will automatically fill in, however you put in your own labels if needed.</br></br>As stated above, this is M:M relationship, meaning that one module will be linked to another. For example, if have 2 custom modules "Servers" & "Passwords" and you create M:M relationship - it will add a "Passwords" related list to "Servers" custom module and "Servers" related list to "Passwords" custom module.</br></br>Important: The relationship is created following VTiger standards, however the database is modified when the relationship is added. We strongly recommend to backup your database and files before creating any relationship fields.</p>',
    'edit' => 'Edit',
    'fields_label' => 'New Field Label',
    'add_new_related_field_11' => 'Creating 1:1 Relationship',
    'add_new_related_field_MM' => 'Creating M:M Relationship',
    'add_new_related_field_1M' => 'Creating 1:M Relationship',
    'add_new_related_field_explain' => 'Please start by selecting the module. Then, you will need to choose the destination block and your field label.'
        . ' Finally choose the related module and whether you need a related list or not.',
//    'module1'=>'Module where you will add the new field',
    'module1' => ' Child Module/Related List',
    'module111' => 'Module 1',
    'module211' => 'Module 2',
    'label_Module12' => 'Module 1 Field Label on Module 2',
    'label_Module21' => 'Module 2 Field Label on Module 1',
    'related_Module12' => 'Module 1 Related Label on Module 2',
    'related_Module21' => 'Module 2 Related Label on Module 1',
    'LBL_RELATED_FIELD_MODULE' => 'Select Related Field Module',
    'LBL_NEW_RELATED_FIELD' => 'New Related Field Label',
    'LBL_ADD_RELATED_FIELD' => 'Add Related Field To',
    'Place field in Block' => 'Place field in Block',
    'block' => 'Block',
    'fields_list_module1' => 'Field',
//    'module2'=>'Related To Module',
    'module2' => ' Primary Module',
    'add_related_list' => ' "Add" + "Add Record" in the related list?',
    'allow_duplicates' => 'If a related list is already there. Create a new one?',
    'yes' => 'Yes',
    'no' => 'No',
    'fail' => '<p> <b>Error: </b>Something went wrong with your request. The following is the error traceback, should give more information'
        . ' about the error. </p><p><b>Error Traceback</b></p>',
    'works' => '<p><b>Success:</b> Your related field was succesfully create. Thanks!</p>',
    'duplicated-error' => '<p><b>Error:</b> There is already a related list between these two modules with this name. Please change the label.</p>',
    'field-already-there' => '<p><b>Error:</b> There is already a related field between these two modules. You can not create another one</p>',
    'related_list_label' => 'Child Module/Related List Label',
    'LBL_SELECT' => '-- Select --',
    'CHARACTERS_LONG' => 'Field label should be less than 50 characters long',
    'SUCCESS' => 'Success',
    'SUCCESS_1_1' => '1:1 Relationship has been created',
    'SUCCESS_1_M' => '1:M Relationship has been created',
    'SUCCESS_M_M' => 'M:M Relationship has been created',
    'DUPLICATED' => 'Duplicated',
    'DUPLICATED_FIELD_LABEL' => 'Field with this label/name already exists. Please change "New Related Field Label" to unique field label/name.',
    'FIELD_ALREADY_THERE' => 'Field already there',
    'LBL_NOTE' => 'Please enter new custom module name only. You will not be able to select any of the options below. A standard custom module module will be created using vtiger standards and in order to comply with the standards we must create the base module including all required fields<br><br>Important: The custom module is created following VTiger standards, however the database is modified when the module is created. We strongly recommend to backup your database and files before creating any custom modules.',
    /* For Related Field Creator - End */
);

$jsLanguageStrings = array(
    'LBL_INVALID_MODULE' => 'Invalid module',
    'LBL_SELECT' => '-- Select --',
    'LBL_ADD_NEW' => 'Add New',
    'LBL_NONE' => 'None',
    'JS_SUCCESS_11' => '1:1 Relationship has been created',
    'JS_SUCCESS_MM' => 'M:M Relationship Success',
    'JS_FAILED_11' => '1:1 Relationship Failed',
    'JS_FAILED_MM' => 'M:M Relationship Failed',
    'JS_DELETE' => 'DELETE CUSTOM MODULE',
    'JS_CANCEL' => 'CANCEL',
    'JS_CONFIRM_DELETE' => 'YOU ARE ABOUT TO DELETE THIS MODULE. IF YOU DELETE IT - ALL THE DATA STORED IN THAT MODULE WILL BE DELETED. THERE IS NO WAY TO RESTORE IT - ONCE YOU DELETE IT - IT IS GONE',
    'JS_MODULE_NAME_CANNOT_CONTAIN_UNDERLINE' => 'Module name can not contain underline (`_`)',
);