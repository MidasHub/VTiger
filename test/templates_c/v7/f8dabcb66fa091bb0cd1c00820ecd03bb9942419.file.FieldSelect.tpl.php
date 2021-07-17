<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:55:25
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Quoter/FieldSelect.tpl" */ ?>
<?php /*%%SmartyHeaderCode:102925309260f21c6d0cd9c7-17095680%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f8dabcb66fa091bb0cd1c00820ecd03bb9942419' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Quoter/FieldSelect.tpl',
      1 => 1626475498,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '102925309260f21c6d0cd9c7-17095680',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'BASE' => 0,
    'IS_DEFAULT' => 0,
    'SOURCE_MODULE' => 0,
    'INDEX' => 0,
    'RECORD_STRUCTURE' => 0,
    'BLOCK_LABEL' => 0,
    'BLOCK_FIELDS' => 0,
    'FIELD_MODEL' => 0,
    'COLUMNNAME_API' => 0,
    'columnNameApi' => 0,
    'FIELD_NAME' => 0,
    'CURRENT_FIELD' => 0,
    'CONDITION_INFO' => 0,
    'MODULE_MODEL' => 0,
    'PICKLIST_VALUES' => 0,
    'referenceList' => 0,
    'CURRENT_USER_MODEL' => 0,
    'ACCESSIBLE_USERS' => 0,
    'USER_NAME' => 0,
    'USERSLIST' => 0,
    'FIELD_INFO' => 0,
    'SPECIAL_VALIDATOR' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21c6d0f867',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21c6d0f867')) {function content_60f21c6d0f867($_smarty_tpl) {?>    

<select class="<?php if (empty($_smarty_tpl->tpl_vars['BASE']->value)){?>select2<?php }?>"   <?php if ($_smarty_tpl->tpl_vars['IS_DEFAULT']->value==1){?> disabled="disabled" <?php }?>name="<?php if ($_smarty_tpl->tpl_vars['SOURCE_MODULE']->value=='Products'){?>productField<?php }else{ ?>serviceField<?php }?><?php echo $_smarty_tpl->tpl_vars['INDEX']->value;?>
"data-rule-required="true" aria-required="true" style="width: 100%;"><option value=""><?php echo vtranslate('LBL_SELECT_FIELD');?>
</option><?php  $_smarty_tpl->tpl_vars['BLOCK_FIELDS'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['BLOCK_FIELDS']->_loop = false;
 $_smarty_tpl->tpl_vars['BLOCK_LABEL'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['RECORD_STRUCTURE']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['BLOCK_FIELDS']->key => $_smarty_tpl->tpl_vars['BLOCK_FIELDS']->value){
$_smarty_tpl->tpl_vars['BLOCK_FIELDS']->_loop = true;
 $_smarty_tpl->tpl_vars['BLOCK_LABEL']->value = $_smarty_tpl->tpl_vars['BLOCK_FIELDS']->key;
?><?php echo vtranslate($_smarty_tpl->tpl_vars['BLOCK_LABEL']->value,$_smarty_tpl->tpl_vars['SOURCE_MODULE']->value);?>
<?php echo $_smarty_tpl->tpl_vars['SOURCE_MODULE']->value;?>
<optgroup label='<?php echo vtranslate($_smarty_tpl->tpl_vars['BLOCK_LABEL']->value,$_smarty_tpl->tpl_vars['SOURCE_MODULE']->value);?>
'><?php  $_smarty_tpl->tpl_vars['FIELD_MODEL'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['FIELD_MODEL']->_loop = false;
 $_smarty_tpl->tpl_vars['FIELD_NAME'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['BLOCK_FIELDS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['FIELD_MODEL']->key => $_smarty_tpl->tpl_vars['FIELD_MODEL']->value){
$_smarty_tpl->tpl_vars['FIELD_MODEL']->_loop = true;
 $_smarty_tpl->tpl_vars['FIELD_NAME']->value = $_smarty_tpl->tpl_vars['FIELD_MODEL']->key;
?><?php if ($_smarty_tpl->tpl_vars['FIELD_MODEL']->value->getFieldDataType()!='reference'||$_smarty_tpl->tpl_vars['FIELD_MODEL']->value->get('uitype')==10){?><?php $_smarty_tpl->tpl_vars['FIELD_INFO'] = new Smarty_variable($_smarty_tpl->tpl_vars['FIELD_MODEL']->value->getFieldInfo(), null, 0);?><?php $_smarty_tpl->tpl_vars['MODULE_MODEL'] = new Smarty_variable($_smarty_tpl->tpl_vars['FIELD_MODEL']->value->getModule(), null, 0);?><?php $_smarty_tpl->tpl_vars["SPECIAL_VALIDATOR"] = new Smarty_variable($_smarty_tpl->tpl_vars['FIELD_MODEL']->value->getValidator(), null, 0);?><?php if (!empty($_smarty_tpl->tpl_vars['COLUMNNAME_API']->value)){?><?php $_smarty_tpl->tpl_vars['columnNameApi'] = new Smarty_variable($_smarty_tpl->tpl_vars['COLUMNNAME_API']->value, null, 0);?><?php }else{ ?><?php $_smarty_tpl->tpl_vars['columnNameApi'] = new Smarty_variable('getCustomViewColumnName', null, 0);?><?php }?><option value="<?php $_tmp1=$_smarty_tpl->tpl_vars['columnNameApi']->value;?><?php echo $_smarty_tpl->tpl_vars['FIELD_MODEL']->value->$_tmp1();?>
" data-fieldtype="<?php echo $_smarty_tpl->tpl_vars['FIELD_MODEL']->value->getFieldType();?>
" data-field-name="<?php echo $_smarty_tpl->tpl_vars['FIELD_NAME']->value;?>
"<?php if ($_smarty_tpl->tpl_vars['CURRENT_FIELD']->value&&$_smarty_tpl->tpl_vars['CURRENT_FIELD']->value==$_smarty_tpl->tpl_vars['FIELD_MODEL']->value->getName()){?><?php $_smarty_tpl->tpl_vars['FIELD_TYPE'] = new Smarty_variable($_smarty_tpl->tpl_vars['FIELD_MODEL']->value->getFieldType(), null, 0);?><?php $_smarty_tpl->tpl_vars['SELECTED_FIELD_MODEL'] = new Smarty_variable($_smarty_tpl->tpl_vars['FIELD_MODEL']->value, null, 0);?><?php if ($_smarty_tpl->tpl_vars['FIELD_MODEL']->value->getFieldDataType()=='reference'){?><?php $_smarty_tpl->tpl_vars['FIELD_TYPE'] = new Smarty_variable('V', null, 0);?><?php }?><?php $_smarty_tpl->createLocalArrayVariable('FIELD_INFO', null, 0);
$_smarty_tpl->tpl_vars['FIELD_INFO']->value['value'] = decode_html($_smarty_tpl->tpl_vars['CONDITION_INFO']->value['value']);?>selected="selected"<?php }?><?php if (($_smarty_tpl->tpl_vars['MODULE_MODEL']->value->get('name')=='Calendar')&&($_smarty_tpl->tpl_vars['FIELD_NAME']->value=='recurringtype')){?><?php $_smarty_tpl->tpl_vars['PICKLIST_VALUES'] = new Smarty_variable(Calendar_Field_Model::getReccurencePicklistValues(), null, 0);?><?php $_smarty_tpl->createLocalArrayVariable('FIELD_INFO', null, 0);
$_smarty_tpl->tpl_vars['FIELD_INFO']->value['picklistvalues'] = $_smarty_tpl->tpl_vars['PICKLIST_VALUES']->value;?><?php }?><?php if (($_smarty_tpl->tpl_vars['MODULE_MODEL']->value->get('name')=='Calendar')&&($_smarty_tpl->tpl_vars['FIELD_NAME']->value=='activitytype')){?><?php $_smarty_tpl->createLocalArrayVariable('FIELD_INFO', null, 0);
$_smarty_tpl->tpl_vars['FIELD_INFO']->value['picklistvalues']['Task'] = vtranslate('Task','Calendar');?><?php }?><?php if ($_smarty_tpl->tpl_vars['FIELD_MODEL']->value->getFieldDataType()=='reference'){?><?php $_smarty_tpl->tpl_vars['referenceList'] = new Smarty_variable($_smarty_tpl->tpl_vars['FIELD_MODEL']->value->getWebserviceFieldObject()->getReferenceList(), null, 0);?><?php if (is_array($_smarty_tpl->tpl_vars['referenceList']->value)&&in_array('Users',$_smarty_tpl->tpl_vars['referenceList']->value)){?><?php $_smarty_tpl->tpl_vars['USERSLIST'] = new Smarty_variable(array(), null, 0);?><?php $_smarty_tpl->tpl_vars['CURRENT_USER_MODEL'] = new Smarty_variable(Users_Record_Model::getCurrentUserModel(), null, 0);?><?php $_smarty_tpl->tpl_vars['ACCESSIBLE_USERS'] = new Smarty_variable($_smarty_tpl->tpl_vars['CURRENT_USER_MODEL']->value->getAccessibleUsers(), null, 0);?><?php  $_smarty_tpl->tpl_vars['USER_NAME'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['USER_NAME']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['ACCESSIBLE_USERS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['USER_NAME']->key => $_smarty_tpl->tpl_vars['USER_NAME']->value){
$_smarty_tpl->tpl_vars['USER_NAME']->_loop = true;
?><?php $_smarty_tpl->createLocalArrayVariable('USERSLIST', null, 0);
$_smarty_tpl->tpl_vars['USERSLIST']->value[$_smarty_tpl->tpl_vars['USER_NAME']->value] = $_smarty_tpl->tpl_vars['USER_NAME']->value;?><?php } ?><?php $_smarty_tpl->createLocalArrayVariable('FIELD_INFO', null, 0);
$_smarty_tpl->tpl_vars['FIELD_INFO']->value['picklistvalues'] = $_smarty_tpl->tpl_vars['USERSLIST']->value;?><?php $_smarty_tpl->createLocalArrayVariable('FIELD_INFO', null, 0);
$_smarty_tpl->tpl_vars['FIELD_INFO']->value['type'] = 'picklist';?><?php }?><?php }?>data-fieldinfo='<?php echo Vtiger_Util_Helper::toSafeHTML(ZEND_JSON::encode($_smarty_tpl->tpl_vars['FIELD_INFO']->value));?>
'<?php if (!empty($_smarty_tpl->tpl_vars['SPECIAL_VALIDATOR']->value)){?>data-validator='<?php echo Zend_Json::encode($_smarty_tpl->tpl_vars['SPECIAL_VALIDATOR']->value);?>
'<?php }?>><?php if ($_smarty_tpl->tpl_vars['SOURCE_MODULE']->value!=$_smarty_tpl->tpl_vars['MODULE_MODEL']->value->get('name')){?>(<?php echo vtranslate($_smarty_tpl->tpl_vars['MODULE_MODEL']->value->get('name'),$_smarty_tpl->tpl_vars['MODULE_MODEL']->value->get('name'));?>
)  <?php echo vtranslate($_smarty_tpl->tpl_vars['FIELD_MODEL']->value->get('label'),$_smarty_tpl->tpl_vars['MODULE_MODEL']->value->get('name'));?>
<?php }else{ ?><?php echo vtranslate($_smarty_tpl->tpl_vars['FIELD_MODEL']->value->get('label'),$_smarty_tpl->tpl_vars['SOURCE_MODULE']->value);?>
<?php }?></option><?php }?><?php } ?></optgroup><?php } ?></select><?php }} ?>