<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:55:35
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/VTEProgressbar/Edit.tpl" */ ?>
<?php /*%%SmartyHeaderCode:90794649560f21c77684c42-48412047%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '6776e39c15894f2087595815905f0af509e30da5' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/VTEProgressbar/Edit.tpl',
      1 => 1626418882,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '90794649560f21c77684c42-48412047',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'MODULE' => 0,
    'RECORD' => 0,
    'ALL_MODULES' => 0,
    'MODULE_VALUES' => 0,
    'RECORDENTRIES' => 0,
    'SELECTED_MODULE_FIELDS' => 0,
    'BLOCK' => 0,
    'FIELD_ACTIVE' => 0,
    'RELATED_FIELDS' => 0,
    'FIELD_LBL' => 0,
    'EXCLUDED_FIELDS' => 0,
    'SELECTED_MODULE_NAME' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21c7769ea6',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21c7769ea6')) {function content_60f21c7769ea6($_smarty_tpl) {?>
<div class="container-fluid WidgetsManage"><div class="widget_header row"><div class="col-sm-6"><h4><label><?php echo vtranslate('Progress Bar','VTEProgressbar');?>
</label></div></div><hr><div class="clearfix"></div><div class="editViewPageDiv"><form id="EditView" action="index.php" method="post" name="EditVTEProgressbar"><input type="hidden" name="module" id="module" value="<?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
"><input type="hidden" name="action" value="SaveProgressbar" /><input type="hidden" name="record" id="record" value="<?php echo $_smarty_tpl->tpl_vars['RECORD']->value;?>
"><div class="col-sm-12 col-xs-12"><div class="col-sm-6 col-xs-6 form-horizontal"><div class="form-group"><label for="custom_expenses_module" class="control-label col-sm-3"><span><?php echo vtranslate('Module','VTEProgressbar');?>
</span><span class="redColor">*</span></label><div class="col-sm-8"><select class="inputElement select2" id="custom_module" name="custom_module" data-rule-required="true"><option value=""><?php echo vtranslate('Select an Option','VTEProgressbar');?>
</option><?php  $_smarty_tpl->tpl_vars['MODULE_VALUES'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['MODULE_VALUES']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['ALL_MODULES']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['MODULE_VALUES']->key => $_smarty_tpl->tpl_vars['MODULE_VALUES']->value){
$_smarty_tpl->tpl_vars['MODULE_VALUES']->_loop = true;
?><option value="<?php echo $_smarty_tpl->tpl_vars['MODULE_VALUES']->value->name;?>
" <?php if ($_smarty_tpl->tpl_vars['MODULE_VALUES']->value->name==$_smarty_tpl->tpl_vars['RECORDENTRIES']->value['module']){?>selected<?php }?>><?php echo vtranslate($_smarty_tpl->tpl_vars['MODULE_VALUES']->value->label,$_smarty_tpl->tpl_vars['MODULE_VALUES']->value->name);?>
</option><?php } ?></select></div></div><div class="form-group"><label for="custom_expenses_quantity" class="control-label col-sm-3"><span><?php echo vtranslate('Field','VTEProgressbar');?>
</span><span class="redColor">*</span></label><div class="col-sm-8"><select class="inputElement select2" id="field_name" name="field_name"  data-rule-required="true"><option value=""><?php echo vtranslate('LBL_SELECT_FIELD',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</option><?php $_smarty_tpl->tpl_vars['RELATED_FIELDS'] = new Smarty_variable(array('15','16','33'), null, 0);?><?php $_smarty_tpl->tpl_vars['EXCLUDED_FIELDS'] = new Smarty_variable(array('hdnTaxType','region_id'), null, 0);?><?php  $_smarty_tpl->tpl_vars['BLOCK'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['BLOCK']->_loop = false;
 $_smarty_tpl->tpl_vars['FIELD_LBL'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['SELECTED_MODULE_FIELDS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['BLOCK']->key => $_smarty_tpl->tpl_vars['BLOCK']->value){
$_smarty_tpl->tpl_vars['BLOCK']->_loop = true;
 $_smarty_tpl->tpl_vars['FIELD_LBL']->value = $_smarty_tpl->tpl_vars['BLOCK']->key;
?><?php $_smarty_tpl->tpl_vars['FIELD_ACTIVE'] = new Smarty_variable($_smarty_tpl->tpl_vars['BLOCK']->value->get('presence'), null, 0);?><?php if ($_smarty_tpl->tpl_vars['FIELD_ACTIVE']->value!=1&&in_array($_smarty_tpl->tpl_vars['BLOCK']->value->get('uitype'),$_smarty_tpl->tpl_vars['RELATED_FIELDS']->value)&&!in_array($_smarty_tpl->tpl_vars['FIELD_LBL']->value,$_smarty_tpl->tpl_vars['EXCLUDED_FIELDS']->value)){?><option value="<?php echo Vtiger_Util_Helper::toSafeHTML($_smarty_tpl->tpl_vars['FIELD_LBL']->value);?>
"<?php if ($_smarty_tpl->tpl_vars['FIELD_LBL']->value==decode_html($_smarty_tpl->tpl_vars['RECORDENTRIES']->value['field_name'])){?>selected="selected"<?php }?>><?php echo vtranslate($_smarty_tpl->tpl_vars['BLOCK']->value->get("label"),$_smarty_tpl->tpl_vars['SELECTED_MODULE_NAME']->value);?>
</option><?php }?><?php } ?></select></div></div><div class="form-group"><label for="active" class="control-label col-sm-3"><span><?php echo vtranslate('Status','VTEProgressbar');?>
</span></label><div class="col-sm-8"><select class="inputElement select2" id="active" name="active"><option value="Active" <?php if ($_smarty_tpl->tpl_vars['RECORDENTRIES']->value['active']==1||empty($_smarty_tpl->tpl_vars['RECORDENTRIES']->value['active'])){?>selected<?php }?>>Active</option><option value="Inactive" <?php if ($_smarty_tpl->tpl_vars['RECORDENTRIES']->value['active']==0){?>selected<?php }?>>Inactive</option></select></div></div><div class="form-group"><label for="active" class="control-label col-sm-3"><span><?php echo vtranslate('Read Only','VTEProgressbar');?>
</span></label><div class="col-sm-8"><select class="inputElement select2" id="readonly" name="readonly"><option value="No" <?php if ($_smarty_tpl->tpl_vars['RECORDENTRIES']->value['readonly']==0||empty($_smarty_tpl->tpl_vars['RECORDENTRIES']->value['readonly'])){?>selected<?php }?>>No</option><option value="Yes" <?php if ($_smarty_tpl->tpl_vars['RECORDENTRIES']->value['readonly']==1){?>selected<?php }?>>Yes</option></select></div></div></div><div class="col-sm-6 col-xs-6 predictive-field-info"><div class="label-info"><h5><span class="glyphicon glyphicon-info-sign"></span> Info</h5></div><span>Once the module is configured, the Progress Bar will show up on the record detail view.</br></br><b>Field: </b>Select the field you would like to display on the Progress Bar.<br><br><b>Status:</b> Turn this Progress Bar on or off.</span></div></div><div class="modal-overlay-footer clearfix"><div class="row clearfix"><div class="textAlignCenter col-lg-12 col-md-12 col-sm-12 "><button type="submit" class="btn btn-success buttonSave">Save</button>&nbsp;&nbsp;<a class="cancelLink" href="javascript:history.back()" type="reset">Cancel</a></div></div></div></form></div></div>
<?php }} ?>