<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 15:03:20
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Import/Import_Saved_Maps.tpl" */ ?>
<?php /*%%SmartyHeaderCode:3357417460f19fb84d1b21-10806498%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'e7fb767c62546846fbb6d52bf7294a7a30d6b54a' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Import/Import_Saved_Maps.tpl',
      1 => 1626324014,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '3357417460f19fb84d1b21-10806498',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'MODULE' => 0,
    'SAVED_MAPS' => 0,
    '_MAP_ID' => 0,
    '_MAP' => 0,
    'FOR_MODULE' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f19fb84d7d8',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f19fb84d7d8')) {function content_60f19fb84d7d8($_smarty_tpl) {?>

<div class="row" style = "margin-bottom: 10px">
    <div class = "form-group">
        <div class = "col-lg-2" style="margin-top:8px">
            <label class ="control-label" for="saved_maps"><?php echo vtranslate('LBL_USE_SAVED_MAPS',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</label>
        </div>
        <div class="col-lg-4">
            <select name="saved_maps" id="saved_maps" class="select2 form-control" onchange="Vtiger_Import_Js.loadSavedMap();">
                <option id="-1" value="" selected>--<?php echo vtranslate('LBL_SELECT_SAVED_MAPPING',$_smarty_tpl->tpl_vars['MODULE']->value);?>
--</option>
                <?php  $_smarty_tpl->tpl_vars['_MAP'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['_MAP']->_loop = false;
 $_smarty_tpl->tpl_vars['_MAP_ID'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['SAVED_MAPS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['_MAP']->key => $_smarty_tpl->tpl_vars['_MAP']->value){
$_smarty_tpl->tpl_vars['_MAP']->_loop = true;
 $_smarty_tpl->tpl_vars['_MAP_ID']->value = $_smarty_tpl->tpl_vars['_MAP']->key;
?>
                    <option id="<?php echo $_smarty_tpl->tpl_vars['_MAP_ID']->value;?>
" value="<?php echo $_smarty_tpl->tpl_vars['_MAP']->value->getStringifiedContent();?>
"><?php echo $_smarty_tpl->tpl_vars['_MAP']->value->getValue('name');?>
</option>
                <?php } ?>
            </select>
        </div>
        <div id="delete_map_container" class ="col-lg-1" style="display:none; margin-top: 10px">
            <a class="glyphicon glyphicon-trash cursorPointer" onclick="Vtiger_Import_Js.deleteMap('<?php echo $_smarty_tpl->tpl_vars['FOR_MODULE']->value;?>
');" alt="<?php echo vtranslate('LBL_DELETE',$_smarty_tpl->tpl_vars['FOR_MODULE']->value);?>
"></a>
        </div>
    </div>
</div>


<?php }} ?>