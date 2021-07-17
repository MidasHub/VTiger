<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:50:28
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/MaskedInput/Settings.tpl" */ ?>
<?php /*%%SmartyHeaderCode:145138829860f21b442220b3-01180858%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'db0b351dec30a49d1a44313b6e07b972d7ee806d' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/MaskedInput/Settings.tpl',
      1 => 1626475548,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '145138829860f21b442220b3-01180858',
  'function' => 
  array (
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21b442285a',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21b442285a')) {function content_60f21b442285a($_smarty_tpl) {?>
<div class="container-fluid">
    <div class="widget_header row-fluid">
        <h3><?php echo vtranslate('LBL_MASKED_FIELD_INPUT','MaskedInput');?>
</h3>
    </div>
    <hr>
    <div class="clearfix"></div>
    <div class="contents row-fluid">
        <div class="col-lg-6">
                <button class="btn addButton addRecordButton" data-url="index.php?module=MaskedInput&view=EditAjax&mode=getConfiguredFieldForm">
                    <i class="fa fa-plus fa-lg"></i>&nbsp;
                    <strong><?php echo vtranslate('LBL_ADD_FIELD','MaskedInput');?>
 </strong>
                </button>
            <div class="clearfix"></div>
            <div class="listViewContentDiv" id="MaskedInputFieldList" style="padding-top:10px;">
                <?php echo $_smarty_tpl->getSubTemplate (vtemplate_path('MaskedInputFields.tpl','MaskedInput'), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

            </div>
        </div>
        <div class="col-lg-6">
			<button class="btn addButton addRecordButton" data-url="index.php?module=MaskedInput&view=EditAjax&mode=getCustomInputForm">
                <i class="fa fa-plus fa-lg"></i>&nbsp;
                <strong><?php echo vtranslate('Create','MaskedInput');?>
 <?php echo vtranslate('LBL_CUSTOM','MaskedInput');?>
 <?php echo vtranslate('MaskedInput','MaskedInput');?>
</strong>
            </button>
            <div class="clearfix"></div>
            <div class="listViewContentDiv" id="MaskedInputList" style="padding-top:10px;">
                <?php echo $_smarty_tpl->getSubTemplate (vtemplate_path('MaskedInputs.tpl','MaskedInput'), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

            </div>
        </div>
    </div>
</div>

<?php }} ?>