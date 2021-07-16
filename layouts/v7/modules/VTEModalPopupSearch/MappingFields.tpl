<select class="templateselect mappingField select2" name="{$FIELD_NAME}" data-field="primary" data-value="value" style="width: 200px">
    <option value="">{vtranslate('LBL_SELECT_OPTION', 'VTEModalPopupSearch')}</option>
    {foreach key=BLOCK_LABEL item=BLOCK_FIELDS from=$PRI_RECORD_STRUCTURE}
        <optgroup label='{vtranslate($BLOCK_LABEL, $PRIMODULE_NAME)}'>
            {foreach key=FIELD_NAME item=FIELD_MODEL from=$BLOCK_FIELDS}
                <option value="{$FIELD_MODEL->getCustomViewColumnName()}" data-field-name="{$FIELD_NAME}" {if $FIELD_MODEL->getCustomViewColumnName() == $FIELD_VALUE}selected{/if}>
                    ({vtranslate($PRIMODULE_NAME)}) {vtranslate($FIELD_MODEL->get('label'), $PRIMODULE_NAME)}
                </option>
            {/foreach}
        </optgroup>
    {/foreach}
</select>
