<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:50:28
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/MaskedInput/MaskedInputFields.tpl" */ ?>
<?php /*%%SmartyHeaderCode:70519044960f21b4422a653-03093016%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f879ea5e01a85fbdfd3127b53aa2e46de31deead' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/MaskedInput/MaskedInputFields.tpl',
      1 => 1626475548,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '70519044960f21b4422a653-03093016',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'CURRENT_USER_MODEL' => 0,
    'MASKEDINPUT_FIELDS' => 0,
    'ID' => 0,
    'WIDTHTYPE' => 0,
    'MASKEDINPUT_FIELD' => 0,
    'MASKEDINPUT_FIELDS_COUNT' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21b4423e3f',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21b4423e3f')) {function content_60f21b4423e3f($_smarty_tpl) {?>
<?php $_smarty_tpl->tpl_vars['WIDTHTYPE'] = new Smarty_variable($_smarty_tpl->tpl_vars['CURRENT_USER_MODEL']->value->get('rowheight'), null, 0);?><?php $_smarty_tpl->tpl_vars['MASKEDINPUT_FIELDS_COUNT'] = new Smarty_variable(count($_smarty_tpl->tpl_vars['MASKEDINPUT_FIELDS']->value), null, 0);?><table class="table table-bordered listViewEntriesTable"><thead><tr><th colspan="5"><?php echo vtranslate('LBL_CONFIGURED','MaskedInput');?>
 <?php echo vtranslate('MaskedInput','MaskedInput');?>
 <?php echo vtranslate('LBL_FIELD','MaskedInput');?>
</th></tr></thead><tbody><tr class="listViewHeaders"><td nowrap class="medium" style="font-weight: bold;"><?php echo vtranslate('LBL_MODULE','MaskedInput');?>
</td><td nowrap class="medium" style="font-weight: bold;"><?php echo vtranslate('LBL_FIELD','MaskedInput');?>
</td><td nowrap class="medium" style="font-weight: bold;"><?php echo vtranslate('MaskedInput','MaskedInput');?>
</td><td nowrap colspan="2" class="medium" style="font-weight: bold;"><?php echo vtranslate('LBL_ACTIVE','MaskedInput');?>
</td></tr></tbody><?php  $_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD']->_loop = false;
 $_smarty_tpl->tpl_vars['ID'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['MASKEDINPUT_FIELDS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
 $_smarty_tpl->tpl_vars['smarty']->value['foreach']['maskedinput_fields_view']['index']=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD']->key => $_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD']->value){
$_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD']->_loop = true;
 $_smarty_tpl->tpl_vars['ID']->value = $_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD']->key;
 $_smarty_tpl->tpl_vars['smarty']->value['foreach']['maskedinput_fields_view']['index']++;
?><tr class="listViewEntries" data-id='<?php echo $_smarty_tpl->tpl_vars['ID']->value;?>
' data-type="MaskedInputField" id="MaskedInput_field_listView_row_<?php echo $_smarty_tpl->getVariable('smarty')->value['foreach']['maskedinput_fields_view']['index']+1;?>
"><td class="listViewEntryValue <?php echo $_smarty_tpl->tpl_vars['WIDTHTYPE']->value;?>
" nowrap><?php echo vtranslate($_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD']->value['module'],$_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD']->value['module']);?>
</td><td class="listViewEntryValue <?php echo $_smarty_tpl->tpl_vars['WIDTHTYPE']->value;?>
" nowrap><?php echo vtranslate($_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD']->value['fieldname'],$_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD']->value['module']);?>
</td><td class="listViewEntryValue <?php echo $_smarty_tpl->tpl_vars['WIDTHTYPE']->value;?>
" nowrap><?php echo $_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD']->value['masked_input'];?>
</td><td class="listViewEntryValue <?php echo $_smarty_tpl->tpl_vars['WIDTHTYPE']->value;?>
" nowrap><?php if ($_smarty_tpl->tpl_vars['MASKEDINPUT_FIELD']->value['active']=='1'){?><?php echo vtranslate('LBL_YES');?>
<?php }else{ ?><?php echo vtranslate('LBL_NO');?>
<?php }?></td><td nowrap class="<?php echo $_smarty_tpl->tpl_vars['WIDTHTYPE']->value;?>
"><div class="actions pull-right"><span class="actionImages"><a href='javascript: void(0);' class="editRecordButton" data-url="index.php?module=MaskedInput&view=EditAjax&mode=getConfiguredFieldForm&record=<?php echo $_smarty_tpl->tpl_vars['ID']->value;?>
"><i title="<?php echo vtranslate('LBL_EDIT');?>
" class="glyphicon glyphicon-pencil alignMiddle"></i></a>&nbsp;<a class="deleteRecordButton"><i title="<?php echo vtranslate('LBL_DELETE');?>
" class="glyphicon glyphicon-trash alignMiddle"></i></a></span></div></td></tr><?php } ?></table><!--added this div for Temporarily --><?php if ($_smarty_tpl->tpl_vars['MASKEDINPUT_FIELDS_COUNT']->value=='0'){?><table class="table table-bordered listViewEntriesTable"><tbody><tr><td><?php echo vtranslate('LBL_NO');?>
 <?php echo vtranslate('LBL_CONFIGURED','MaskedInput');?>
 <?php echo vtranslate('LBL_FIELD','MaskedInput');?>
 <?php echo vtranslate('LBL_FOUND');?>
.</td></tr></tbody></table><?php }?><br/>
<?php }} ?>