<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:55:25
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Quoter/Settings.tpl" */ ?>
<?php /*%%SmartyHeaderCode:27683783260f21c6d05f7f2-18332633%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '6983bdce4c5c5ed726575ef2eec2dbb2073d31fb' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Quoter/Settings.tpl',
      1 => 1626475498,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '27683783260f21c6d05f7f2-18332633',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'QUALIFIED_MODULE' => 0,
    'SETTINGS' => 0,
    'MODULE' => 0,
    'TOTAL_SETTINGS' => 0,
    'SECTIONS_SETTINGS' => 0,
    'MODULE_SETTING' => 0,
    'SETTING' => 0,
    'COLUMN_DEFAULT' => 0,
    'TOTAL_SETTING' => 0,
    'FIELD_NAME' => 0,
    'FIELD_VALUE' => 0,
    'FIELD_MODEL' => 0,
    'COLUMN' => 0,
    'MAPPED_COLUMNS' => 0,
    'SECTION_VALUES' => 0,
    'SECTION_VALUE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21c6d09df2',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21c6d09df2')) {function content_60f21c6d09df2($_smarty_tpl) {?>
<div class="container-fluid"><h4><?php echo vtranslate('Item Details Customizer (Advanced)',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</h4><hr><div class="clearfix"></div><input type="hidden" name="module" value="<?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
"/><input type="hidden" name="action" value="SaveAjax"/><div class="related-tabs summaryWidgetContainer "><ul class="nav nav-tabs"><?php  $_smarty_tpl->tpl_vars['SETTING'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['SETTING']->_loop = false;
 $_smarty_tpl->tpl_vars['MODULE'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['SETTINGS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
 $_smarty_tpl->tpl_vars['SETTING']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['SETTING']->key => $_smarty_tpl->tpl_vars['SETTING']->value){
$_smarty_tpl->tpl_vars['SETTING']->_loop = true;
 $_smarty_tpl->tpl_vars['MODULE']->value = $_smarty_tpl->tpl_vars['SETTING']->key;
 $_smarty_tpl->tpl_vars['SETTING']->index++;
 $_smarty_tpl->tpl_vars['SETTING']->first = $_smarty_tpl->tpl_vars['SETTING']->index === 0;
 $_smarty_tpl->tpl_vars['smarty']->value['foreach']['SETTING_NAME']['first'] = $_smarty_tpl->tpl_vars['SETTING']->first;
?><li  class="tab-item <?php if ($_smarty_tpl->getVariable('smarty')->value['foreach']['SETTING_NAME']['first']){?>active<?php }?>" ><a href="#module_<?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
" data-toggle="tab" class="textOverflowEllipsis"><strong><?php echo vtranslate($_smarty_tpl->tpl_vars['MODULE']->value,$_smarty_tpl->tpl_vars['MODULE']->value);?>
</strong></a></li><?php } ?><li class="pull-right"><a target="_blank" href="https://www.vtexperts.com/vtiger-item-details-customizer-advanced-upgrading-vtiger-7/"><?php echo vtranslate('LBL_UPGRADING_FROM_VTIGER6',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</a></li></ul><div class="tab-content col-lg-12 col-md-12"><?php  $_smarty_tpl->tpl_vars['MODULE_SETTING'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['MODULE_SETTING']->_loop = false;
 $_smarty_tpl->tpl_vars['MODULE'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['SETTINGS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
 $_smarty_tpl->tpl_vars['MODULE_SETTING']->index=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['MODULE_SETTING']->key => $_smarty_tpl->tpl_vars['MODULE_SETTING']->value){
$_smarty_tpl->tpl_vars['MODULE_SETTING']->_loop = true;
 $_smarty_tpl->tpl_vars['MODULE']->value = $_smarty_tpl->tpl_vars['MODULE_SETTING']->key;
 $_smarty_tpl->tpl_vars['MODULE_SETTING']->index++;
 $_smarty_tpl->tpl_vars['MODULE_SETTING']->first = $_smarty_tpl->tpl_vars['MODULE_SETTING']->index === 0;
 $_smarty_tpl->tpl_vars['smarty']->value['foreach']['SETTING_NAME']['first'] = $_smarty_tpl->tpl_vars['MODULE_SETTING']->first;
?><?php $_smarty_tpl->tpl_vars["TOTAL_SETTING"] = new Smarty_variable($_smarty_tpl->tpl_vars['TOTAL_SETTINGS']->value[$_smarty_tpl->tpl_vars['MODULE']->value], null, 0);?><?php $_smarty_tpl->tpl_vars["SECTION_VALUES"] = new Smarty_variable($_smarty_tpl->tpl_vars['SECTIONS_SETTINGS']->value[$_smarty_tpl->tpl_vars['MODULE']->value], null, 0);?><div class="tab-pane moduleTab  <?php if ($_smarty_tpl->getVariable('smarty')->value['foreach']['SETTING_NAME']['first']){?>active<?php }?>" id="module_<?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
"><div class="row"><div class="col-lg-6 col-md-6"><input type="hidden" name="module_name" value="<?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
"><ul class="nav nav-pills" style="display:  block; margin-top: 10px; margin-bottom:0;"><li role="presentation" class='active'><a href="#ItemField_<?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
"  data-toggle = "pill"><?php echo vtranslate('LBL_ITEMS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</a></li><li role="presentation"><a href="#totalsTab_<?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
"  data-toggle = "pill"><?php echo vtranslate('LBL_TOTALS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</a></li><li role="presentation"><a href="#sectionTab_<?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
"  data-toggle = "pill"><?php echo vtranslate('LBL_SECTIONS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</a></li></ul></div><div class="col-lg-6 col-md-6 select_field_container"><span class="display_field_name"></span><span class="copy_icon"><img src="layouts\vlayout\modules\Quoter\images\copy-icon.png" alt=""/></span><select class="select2 select_field_name" style="width: 220px"><option value=""><?php echo vtranslate('LBL_SELECT_OPTIONS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option><?php  $_smarty_tpl->tpl_vars['SETTING'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['SETTING']->_loop = false;
 $_smarty_tpl->tpl_vars['COLUMN'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['MODULE_SETTING']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['SETTING']->key => $_smarty_tpl->tpl_vars['SETTING']->value){
$_smarty_tpl->tpl_vars['SETTING']->_loop = true;
 $_smarty_tpl->tpl_vars['COLUMN']->value = $_smarty_tpl->tpl_vars['SETTING']->key;
?><?php if (in_array($_smarty_tpl->tpl_vars['SETTING']->value->columnName,$_smarty_tpl->tpl_vars['COLUMN_DEFAULT']->value)){?><option value="<?php echo $_smarty_tpl->tpl_vars['SETTING']->value->columnName;?>
"><?php echo vtranslate($_smarty_tpl->tpl_vars['SETTING']->value->columnName,$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option><?php }else{ ?><?php if ($_smarty_tpl->tpl_vars['SETTING']->value->customHeader){?><option value="<?php echo $_smarty_tpl->tpl_vars['SETTING']->value->columnName;?>
"><?php echo $_smarty_tpl->tpl_vars['SETTING']->value->customHeader;?>
</option><?php }?><?php }?><?php } ?><?php  $_smarty_tpl->tpl_vars['FIELD_VALUE'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['FIELD_VALUE']->_loop = false;
 $_smarty_tpl->tpl_vars['FIELD_NAME'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['TOTAL_SETTING']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['FIELD_VALUE']->key => $_smarty_tpl->tpl_vars['FIELD_VALUE']->value){
$_smarty_tpl->tpl_vars['FIELD_VALUE']->_loop = true;
 $_smarty_tpl->tpl_vars['FIELD_NAME']->value = $_smarty_tpl->tpl_vars['FIELD_VALUE']->key;
?><option value="<?php echo $_smarty_tpl->tpl_vars['FIELD_NAME']->value;?>
"><?php echo vtranslate($_smarty_tpl->tpl_vars['FIELD_VALUE']->value['fieldLabel'],'Quoter');?>
</option><?php } ?><?php  $_smarty_tpl->tpl_vars['FIELD_MODEL'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['FIELD_MODEL']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['MODULE_SETTING']->value['all_field']; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['FIELD_MODEL']->key => $_smarty_tpl->tpl_vars['FIELD_MODEL']->value){
$_smarty_tpl->tpl_vars['FIELD_MODEL']->_loop = true;
?><option value="<?php echo $_smarty_tpl->tpl_vars['FIELD_MODEL']->value->get('name');?>
"><?php echo vtranslate($_smarty_tpl->tpl_vars['FIELD_MODEL']->value->get('label'),$_smarty_tpl->tpl_vars['MODULE']->value);?>
</option><?php } ?></select></div></div><div class="tab-content fieldBlockContainer"><div class="tab-pane itemTab active" id="ItemField_<?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
"><form name="frmColumn" class="frmColumn"><div class="colContainer " ><?php  $_smarty_tpl->tpl_vars['SETTING'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['SETTING']->_loop = false;
 $_smarty_tpl->tpl_vars['COLUMN'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['MODULE_SETTING']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['SETTING']->key => $_smarty_tpl->tpl_vars['SETTING']->value){
$_smarty_tpl->tpl_vars['SETTING']->_loop = true;
 $_smarty_tpl->tpl_vars['COLUMN']->value = $_smarty_tpl->tpl_vars['SETTING']->key;
?><?php if (is_numeric($_smarty_tpl->tpl_vars['COLUMN']->value)){?><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("ColumnsDetails.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('SETTING'=>$_smarty_tpl->tpl_vars['SETTING']->value,'MODULE'=>$_smarty_tpl->tpl_vars['MODULE']->value,'COLUMN_DEFAULT'=>$_smarty_tpl->tpl_vars['COLUMN_DEFAULT']->value,'MAPPED_COLUMN'=>$_smarty_tpl->tpl_vars['MAPPED_COLUMNS']->value[$_smarty_tpl->tpl_vars['MODULE']->value][$_smarty_tpl->tpl_vars['COLUMN']->value]), 0);?>
<?php }?><?php } ?></div><div class="base_column"><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("ColumnsDetails.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('SETTING'=>$_smarty_tpl->tpl_vars['MODULE_SETTING']->value['base_column'],'MODULE'=>$_smarty_tpl->tpl_vars['MODULE']->value,'COLUMN_DEFAULT'=>$_smarty_tpl->tpl_vars['COLUMN_DEFAULT']->value,'BASE'=>'hide','MAPPED_COLUMN'=>$_smarty_tpl->tpl_vars['MAPPED_COLUMNS']->value[$_smarty_tpl->tpl_vars['MODULE']->value]['base_column']), 0);?>
</div><div style="margin-top: 20px;"><span class="pull-left"><button class="btn btn-success btnSaveSettings" type="submit" ><?php echo vtranslate('LBL_SAVE');?>
</button></span><span class="pull-right"><button class="btn btn-default btnAddNewColumn" type="button" ><i class="fa fa-plus"></i> &nbsp; <strong><?php echo vtranslate('LBL_ADD_NEW_COLUMN',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</strong></button></span><span class="clearfix"></span></div></form></div><div class="tab-pane totalTab" id="totalsTab_<?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
"><form name="frmTotal" class="frmTotal"><div class="fieldTotalContainer" style="padding-top: 10px;" ><table class="table table-bordered tblTotalFieldsContainer"><tbody><tr><th><?php echo vtranslate('LBL_TOOLS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</th><th><?php echo vtranslate('LBL_LABEL_FIELD',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
<span class="redColor">*</span></th><th><?php echo vtranslate('LBL_FORMULA',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</th><th><?php echo vtranslate('LBL_DATA_ENTRY',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</th><th><?php echo vtranslate('LBL_RUNNING_SUBTOTAL',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</th></tr><?php if (empty($_smarty_tpl->tpl_vars['TOTAL_SETTING']->value)){?><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("TotalField.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('FIELD_VALUE'=>array(),'FIELD_NAME'=>''), 0);?>
<?php }else{ ?><?php  $_smarty_tpl->tpl_vars['FIELD_VALUE'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['FIELD_VALUE']->_loop = false;
 $_smarty_tpl->tpl_vars['FIELD_NAME'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['TOTAL_SETTING']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
 $_smarty_tpl->tpl_vars['smarty']->value['foreach']['total_field']['iteration']=0;
foreach ($_from as $_smarty_tpl->tpl_vars['FIELD_VALUE']->key => $_smarty_tpl->tpl_vars['FIELD_VALUE']->value){
$_smarty_tpl->tpl_vars['FIELD_VALUE']->_loop = true;
 $_smarty_tpl->tpl_vars['FIELD_NAME']->value = $_smarty_tpl->tpl_vars['FIELD_VALUE']->key;
 $_smarty_tpl->tpl_vars['smarty']->value['foreach']['total_field']['iteration']++;
?><?php $_smarty_tpl->tpl_vars['INDEX_TOTAL'] = new Smarty_variable($_smarty_tpl->getVariable('smarty')->value['foreach']['total_field']['iteration']-1, null, 0);?><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("TotalField.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('FIELD_VALUE'=>$_smarty_tpl->tpl_vars['FIELD_VALUE']->value,'FIELD_NAME'=>$_smarty_tpl->tpl_vars['FIELD_NAME']->value), 0);?>
<?php } ?><?php }?></tbody></table><table class="hide fieldBasic"><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("TotalField.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('FIELD_VALUE'=>array(),'FIELD_NAME'=>''), 0);?>
</table></div><div style="margin-top: 20px;"><span class="pull-left"><button class="btn btn-success btnSaveTotalsSettingField" type="submit" id=""><?php echo vtranslate('LBL_SAVE');?>
</button></span><span class="pull-right"><button class="btn btn-default addNewTotalField" type="button" ><i class="fa fa-plus"></i> &nbsp; <strong><?php echo vtranslate('LBL_ADD_NEW_FIELD',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</strong></button></span><span class="clearfix"></span></div></form></div><div class="tab-pane sectionTab" id="sectionTab_<?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
"><form name="frmSection" class="frmSection"><div class="row-fluid sectionsContainer" style="width: 70%; padding: 10px;" ><table class="table table-bordered blockContainer tblSectionsContainer"><tbody><tr><th width="5%"><?php echo vtranslate('LBL_TOOLS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</th><th><?php echo vtranslate('LBL_SECTIONS',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</th></tr><?php if (empty($_smarty_tpl->tpl_vars['SECTION_VALUES']->value)){?><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("Section.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('SECTION_VALUE'=>'','INDEX_SECTION'=>''), 0);?>
<?php }else{ ?><?php  $_smarty_tpl->tpl_vars['SECTION_VALUE'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['SECTION_VALUE']->_loop = false;
 $_smarty_tpl->tpl_vars['INDEX_SECTION'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['SECTION_VALUES']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['SECTION_VALUE']->key => $_smarty_tpl->tpl_vars['SECTION_VALUE']->value){
$_smarty_tpl->tpl_vars['SECTION_VALUE']->_loop = true;
 $_smarty_tpl->tpl_vars['INDEX_SECTION']->value = $_smarty_tpl->tpl_vars['SECTION_VALUE']->key;
?><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("Section.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('SECTION_VALUE'=>$_smarty_tpl->tpl_vars['SECTION_VALUE']->value), 0);?>
<?php } ?><?php }?></tbody></table><table class="hide fieldBasic"><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("Section.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('SECTION_VALUE'=>'','INDEX_SECTION'=>''), 0);?>
</table></div><div style="margin-top: 20px;"><span class="pull-left"><button class="btn btn-success btnSaveSectionsValue" type="submit" ><?php echo vtranslate('LBL_SAVE');?>
</button></span><span class="pull-right"><button class="btn btn-default addNewSection" type="button" ><i class="fa fa-plus"></i> &nbsp; <strong><?php echo vtranslate('LBL_ADD_NEW_VALUE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</strong></button></span><span class="clearfix"></span></div></form></div></div></div><?php } ?></div></div></div><?php }} ?>