Blockly.Extensions.register('custom_permission_variables',function () {
    this.getInput("permissionvar").appendField(new Blockly.FieldDropdown(getVariablesOfType("Permission")), 'PERMISSIONVAR');
});
Blockly.Extensions.register('custom_string_array_variables',function () {
    this.getInput("string_array_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("StringArray")), 'STRING_ARRAY_VAR');
});
Blockly.Extensions.register('custom_json_array_variables',function () {
    this.getInput("json_array_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("JsonArray")), 'JSON_ARRAY_VAR');
});
Blockly.Extensions.register('custom_json_object_variables',function () {
    this.getInput("json_object_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("JsonObject")), 'JSON_OBJECT_VAR');
});
Blockly.Extensions.register('custom_string_list_variables',function () {
    this.getInput("string_list_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("StringList")), 'STRING_LIST_VAR');
});
Blockly.Extensions.register('custom_help_page_variables', function () {
    const input = this.getInput("help_page_var")
    input.appendField(new Blockly.FieldDropdown(getVariablesOfType("HelpPage")), 'HELP_PAGE_VAR');
});