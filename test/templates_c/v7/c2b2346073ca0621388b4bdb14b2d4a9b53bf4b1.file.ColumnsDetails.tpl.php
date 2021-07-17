<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:55:25
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Quoter/ColumnsDetails.tpl" */ ?>
<?php /*%%SmartyHeaderCode:87827246260f21c6d0a3307-61115173%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'c2b2346073ca0621388b4bdb14b2d4a9b53bf4b1' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Quoter/ColumnsDetails.tpl',
      1 => 1626475498,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '87827246260f21c6d0a3307-61115173',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'SETTING' => 0,
    'COLUMN_DEFAULT' => 0,
    'COLUMN' => 0,
    'BASE' => 0,
    'IS_DEFAULT' => 0,
    'QUALIFIED_MODULE' => 0,
    'INDEX' => 0,
    'MODULE' => 0,
    'PRODUCT_RECORD_STRUCTURE' => 0,
    'CURRENT_FIELD' => 0,
    'SERVICE_RECORD_STRUCTURE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21c6d0cb54',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21c6d0cb54')) {function content_60f21c6d0cb54($_smarty_tpl) {?>
<?php if (in_array($_smarty_tpl->tpl_vars['SETTING']->value->columnName,$_smarty_tpl->tpl_vars['COLUMN_DEFAULT']->value)){?><?php $_smarty_tpl->tpl_vars['IS_DEFAULT'] = new Smarty_variable(1, null, 0);?><?php }else{ ?><?php $_smarty_tpl->tpl_vars['IS_DEFAULT'] = new Smarty_variable(0, null, 0);?><?php }?><?php if (is_numeric($_smarty_tpl->tpl_vars['COLUMN']->value)){?><?php $_smarty_tpl->tpl_vars['INDEX'] = new Smarty_variable($_smarty_tpl->tpl_vars['COLUMN']->value, null, 0);?><?php }else{ ?><?php $_smarty_tpl->tpl_vars['INDEX'] = new Smarty_variable('', null, 0);?><?php }?><div class="colItemField <?php echo $_smarty_tpl->tpl_vars['BASE']->value;?>
 <?php if ($_smarty_tpl->tpl_vars['SETTING']->value->columnName=='item_name'){?>noSortable<?php }?>" data-is-default = "<?php echo $_smarty_tpl->tpl_vars['IS_DEFAULT']->value;?>
"><input type="hidden" name="itemColumn" value="<?php echo $_smarty_tpl->tpl_vars['SETTING']->value->columnName;?>
"><div class="colHeader"><?php if ($_smarty_tpl->tpl_vars['IS_DEFAULT']->value==1){?><span style="margin: 3px 0;display: inline-block;"><?php echo vtranslate($_smarty_tpl->tpl_vars['SETTING']->value->columnName,$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</span><span class="dropdown"><a class="dropdown-toggle fieldInfo" data-toggle="dropdown" href="#" title="Show column name"><span class="fa fa-info-circle"></span></a><ul class="dropdown-menu _tooltip"><span style="color: #000">$<?php echo $_smarty_tpl->tpl_vars['SETTING']->value->columnName;?>
$</span></ul></span><?php }else{ ?><span class="redColor" style="margin-right: 2px;">*</span><input name="customHeader<?php echo $_smarty_tpl->tpl_vars['INDEX']->value;?>
" maxlength="40" placeholder="<?php echo vtranslate('LBL_TYPE_IN_THE_HEADER_FIELD',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
" value="<?php if ($_smarty_tpl->tpl_vars['SETTING']->value->customHeader){?><?php echo $_smarty_tpl->tpl_vars['SETTING']->value->customHeader;?>
<?php }?>" data-rule-required="true" style="width: 65%;margin: 0;color: #333;line-height: 19px;"><span class="dropdown"><a class="dropdown-toggle fieldInfo" data-toggle="dropdown" href="#" title="Show column name"><span class="fa fa-info-circle"></span></a><ul class="dropdown-menu _tooltip"><span style="color: #000">$<?php echo $_smarty_tpl->tpl_vars['SETTING']->value->columnName;?>
$</span></ul></span><i class="fa fa-trash deleteColumn cursorPointer" title="<?php echo vtranslate('LBL_DELETE',$_smarty_tpl->tpl_vars['MODULE']->value);?>
"></i><span class="clearfix"></span><?php }?></div><div class="colContent"><div class="rowCell"><span class="pull-left textAlignRight"><span class="redColor" style="margin-right: 2px;">*</span><?php echo vtranslate('LBL_PRODUCT',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</span><span class="pull-right productField" style="width: 60%"><?php if ($_smarty_tpl->tpl_vars['IS_DEFAULT']->value==1&&$_smarty_tpl->tpl_vars['SETTING']->value->columnName!='item_name'){?><select class="select2" <?php if ($_smarty_tpl->tpl_vars['IS_DEFAULT']->value==1){?> disabled="disabled" <?php }?> style="width: 100%"  data-rule-required="true"><option value="<?php echo $_smarty_tpl->tpl_vars['SETTING']->value->productField;?>
" selected><?php echo vtranslate($_smarty_tpl->tpl_vars['SETTING']->value->productField,$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option></select><?php }else{ ?><?php $_smarty_tpl->tpl_vars['CURRENT_FIELD'] = new Smarty_variable($_smarty_tpl->tpl_vars['SETTING']->value->productField, null, 0);?><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("FieldSelect.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('MULTIPLE'=>0,'NOCHOSEN'=>0,'RECORD_STRUCTURE'=>$_smarty_tpl->tpl_vars['PRODUCT_RECORD_STRUCTURE']->value,'CURRENT_FIELD'=>$_smarty_tpl->tpl_vars['CURRENT_FIELD']->value,'SOURCE_MODULE'=>'Products','IS_DEFAULT'=>$_smarty_tpl->tpl_vars['IS_DEFAULT']->value,'BASE'=>$_smarty_tpl->tpl_vars['BASE']->value), 0);?>
<?php }?></span><span class="clearfix"></span></div><div class="rowCell"><span class="pull-left textAlignRight" ><span class="redColor" style="margin-right: 2px;">*</span><?php echo vtranslate('LBL_SERVICE',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</span><span class="pull-right serviceField" style="width: 60%"><?php if ($_smarty_tpl->tpl_vars['IS_DEFAULT']->value==1&&$_smarty_tpl->tpl_vars['SETTING']->value->columnName!='item_name'){?><select class="select2" <?php if ($_smarty_tpl->tpl_vars['IS_DEFAULT']->value==1){?> disabled="disabled" <?php }?> data-rule-required="true"  style="width: 100%"><option value="<?php echo $_smarty_tpl->tpl_vars['SETTING']->value->serviceField;?>
" selected><?php echo vtranslate($_smarty_tpl->tpl_vars['SETTING']->value->serviceField,$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</option></select><?php }else{ ?><?php $_smarty_tpl->tpl_vars['CURRENT_FIELD'] = new Smarty_variable($_smarty_tpl->tpl_vars['SETTING']->value->serviceField, null, 0);?><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("FieldSelect.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('MULTIPLE'=>0,'NOCHOSEN'=>0,'RECORD_STRUCTURE'=>$_smarty_tpl->tpl_vars['SERVICE_RECORD_STRUCTURE']->value,'SOURCE_MODULE'=>'Services','CURRENT_FIELD'=>$_smarty_tpl->tpl_vars['CURRENT_FIELD']->value,'IS_DEFAULT'=>$_smarty_tpl->tpl_vars['IS_DEFAULT']->value,'BASE'=>$_smarty_tpl->tpl_vars['BASE']->value), 0);?>
<?php }?></span><span class="clearfix"></span></div><div class="rowCell"><span class="pull-left textAlignRight" ><?php echo vtranslate('LBL_MANDATORY',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
</span><span class="pull-right " style="width: 60%"><select name="isMandatory" class="<?php if (empty($_smarty_tpl->tpl_vars['BASE']->value)){?>select2<?php }?>" <?php if ($_smarty_tpl->tpl_vars['IS_DEFAULT']->value==1){?> disabled="disabled" <?php }?> style="width: 100%"><option <?php if ($_smarty_tpl->tpl_vars['SETTING']->value->isMandatory=='1'){?> selected <?php }?> value="1"><?php echo vtranslate('LBL_YES');?>
</option><option <?php if ($_smarty_tpl->tpl_vars['SETTING']->value->isMandatory=='0'){?> selected <?php }?> value="0"><?php echo vtranslate('LBL_NO');?>
</option></select></span><span class="clearfix"></span></div><div class="rowCell"><span class="pull-left textAlignRight" ><?php echo vtranslate('Active');?>
</span><span class="pull-right" style="width: 60%"><select name="isActive" class="<?php if (empty($_smarty_tpl->tpl_vars['BASE']->value)){?>select2<?php }?>"   style="width: 100%"><option <?php if ($_smarty_tpl->tpl_vars['SETTING']->value->isActive=='active'){?> selected <?php }?> value="active"><?php echo vtranslate('Active');?>
</option><option <?php if ($_smarty_tpl->tpl_vars['SETTING']->value->isActive=='inactive'){?> selected <?php }?> value="inactive"><?php echo vtranslate('Inactive');?>
</option></select></span><span class="clearfix"></span></div><div class="rowCell"><span class="pull-left textAlignRight" style="padding-top: 12px;" ><?php ob_start();?><?php echo vtranslate('LBL_WIDTH',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
<?php $_tmp1=ob_get_clean();?><?php echo $_tmp1;?>
</span><span class="pull-right" style="width: 60%"><input name="columnWidth" class="inputElement" type="text" style="width: 80%;margin-right: 5%;margin-top: 4px;" value="<?php echo $_smarty_tpl->tpl_vars['SETTING']->value->columnWidth;?>
">px<input type="hidden" name="columnWidthUnit" value="px"></span><span class="clearfix"></span></div><div class="rowCell"><div class="textAlignCenter" style="width: 100%;margin-bottom: 5px;" ><strong style="font-size: 1em;"><?php ob_start();?><?php echo vtranslate('LBL_FORMULA',$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value);?>
<?php $_tmp2=ob_get_clean();?><?php echo $_tmp2;?>
</strong></div><div  style="width: 100%;" ><textarea class="textAreaElement" rows="3" name="formula"><?php echo $_smarty_tpl->tpl_vars['SETTING']->value->formula;?>
</textarea></div><span class="clearfix"></span></div></div></div><?php }} ?>