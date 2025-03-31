Blockly.Blocks['bck_item_list_mutator_container'] = {
    init: function () {
        this.appendDummyInput().appendField(javabridge.t('blockly.block.bck_item_list_mutator.container'));
        this.appendStatementInput('STACK');
        this.contextMenu = false;
        this.setColour(350);
    }
};

Blockly.Blocks['bck_item_list_mutator_input'] = {
    init: function () {
        this.appendDummyInput().appendField(javabridge.t('blockly.block.bck_item_list_mutator.input'));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
        this.fieldValues_ = [];
        this.setColour(350);
    }
};

Blockly.Extensions.registerMutator('bck_item_list_mutator', simpleRepeatingInputMixin(
        'bck_item_list_mutator_container', 'bck_item_list_mutator_input', 'entry',
        function(thisBlock, inputName, index) {
            const newInputName = inputName + index;
            thisBlock.appendValueInput(inputName + index).setCheck('MCItem').setAlign(Blockly.Input.Align.RIGHT)
                .appendField(javabridge.t('blockly.block.bck_item_list.ingredient') + ' ' + index + ':');
            thisBlock.moveInputBefore(newInputName, 'output_count');
        }),
    undefined, ['bck_item_list_mutator_input']);

Blockly.Blocks['bck_recipe_item_list_mutator_container'] = {
    init: function () {
        this.appendDummyInput().appendField(javabridge.t('blockly.block.bck_recipe_item_list_mutator.container'));
        this.appendStatementInput('STACK');
        this.contextMenu = false;
        this.setColour(350);
    }
};

Blockly.Blocks['bck_recipe_item_list_mutator_input'] = {
    init: function () {
        this.appendDummyInput().appendField(javabridge.t('blockly.block.bck_recipe_item_list_mutator.input'));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.contextMenu = false;
        this.fieldValues_ = [];
        this.setColour(350);
    }
};

Blockly.Extensions.registerMutator('bck_recipe_item_list_mutator', simpleRepeatingInputMixin(
        'bck_recipe_item_list_mutator_container', 'bck_recipe_item_list_mutator_input', 'entry',
        function(thisBlock, inputName, index) {
            const newInputName = inputName + index;
            thisBlock.appendValueInput(inputName + index).setCheck('MCItem').setAlign(Blockly.Input.Align.RIGHT)
                .appendField(javabridge.t('blockly.block.bck_recipe_item_list.ingredient') + ' ' + index + ':');
            thisBlock.moveInputBefore(newInputName, 'SLOTS');
        }),
    undefined, ['bck_recipe_item_list_mutator_input']);