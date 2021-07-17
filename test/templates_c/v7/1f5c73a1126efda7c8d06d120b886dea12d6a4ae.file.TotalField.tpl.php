<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:55:25
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Quoter/TotalField.tpl" */ ?>
<?php /*%%SmartyHeaderCode:14831083460f21c6d169b62-38172721%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '1f5c73a1126efda7c8d06d120b886dea12d6a4ae' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Quoter/TotalField.tpl',
      1 => 1626475498,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '14831083460f21c6d169b62-38172721',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'MODULE' => 0,
    'FIELD_NAME' => 0,
    'INDEX_TOTAL' => 0,
    'FIELD_VALUE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21c6d17181',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21c6d17181')) {function content_60f21c6d17181($_smarty_tpl) {?>
<tr class="totalField"><td width="5%" style="vertical-align: middle; text-align: center;"><img src="layouts/vlayout/skins/images/drag.png" class="moveIcon" border="0" title="Drag" style="cursor: move;">&nbsp;&nbsp;<i class="fa fa-trash deleteTotalRow cursorPointer" title="<?php echo vtranslate('LBL_DELETE',$_smarty_tpl->tpl_vars['MODULE']->value);?>
"></i></td><td class="fieldValue medium" width="20%" style="vertical-align:middle;"><input type="hidden" class="fieldName" value="<?php echo $_smarty_tpl->tpl_vars['FIELD_NAME']->value;?>
"><input type="text" name="totalLabel<?php echo $_smarty_tpl->tpl_vars['INDEX_TOTAL']->value;?>
" maxlength="40" class="fieldLabel inputElement"  data-rule-required="true" value="<?php echo vtranslate($_smarty_tpl->tpl_vars['FIELD_VALUE']->value['fieldLabel'],'Quoter');?>
" <?php if ($_smarty_tpl->tpl_vars['FIELD_VALUE']->value['isDefault']){?> disabled="disabled"  <?php }?>><span class="dropdown"><a class="dropdown-toggle fieldInfo" data-toggle="dropdown" href="#" title="Show field name"><span class="fa fa-info-circle"></span></a><ul class="dropdown-menu _tooltip"><span style="color: #000">$<?php echo $_smarty_tpl->tpl_vars['FIELD_NAME']->value;?>
$</span></ul></span></td><td class="fieldValue medium"><textarea rows="2" class="fieldFormula inputElement textAreaElement"><?php echo $_smarty_tpl->tpl_vars['FIELD_VALUE']->value['fieldFormula'];?>
</textarea></td><td class="fieldValue " width="10%" style="text-align: center;"><input type="checkbox" class="fieldType " <?php if ($_smarty_tpl->tpl_vars['FIELD_VALUE']->value['fieldType']==1){?> checked="" <?php }?>/></td><td class="fieldValue " width="13%" style="text-align: center;"><input type="checkbox" class="isRunningSubTotal " <?php if ($_smarty_tpl->tpl_vars['FIELD_VALUE']->value['isRunningSubTotal']==1){?> checked="" <?php }?>/></td></tr><?php }} ?>