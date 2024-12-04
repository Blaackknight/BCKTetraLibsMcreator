Blockly.Extensions.register('custom_permission_variables',function () {
    this.getInput("permissionvar").appendField(new Blockly.FieldDropdown(getVariablesOfType("Permission")), 'PERMISSIONVAR');
});
Blockly.Extensions.register('custom_help_page_variables', function () {
    const input = this.getInput("help_page_var")
    console.log(input);
    input.appendField(new Blockly.FieldDropdown(getVariablesOfType("HelpPage")), 'HELP_PAGE_VAR');
});