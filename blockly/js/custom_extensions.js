Blockly.Extensions.register('custom_permission_variables', function () {
    this.getInput("permissionvar").appendField(new Blockly.FieldDropdown(getVariablesOfType("Permission")), 'PERMISSIONVAR');
});
Blockly.Extensions.register('custom_string_array_variables', function () {
    this.getInput("string_array_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("StringArray")), 'STRING_ARRAY_VAR');
});
Blockly.Extensions.register('custom_bck_json_array_variables', function () {
    this.getInput("bck_json_array_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("JsonArray")), 'BCK_JSON_ARRAY_VAR');
});
Blockly.Extensions.register('custom_bck_json_object_variables', function () {
    this.getInput("bck_json_object_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("JsonObject")), 'BCK_JSON_OBJECT_VAR');
});
Blockly.Extensions.register('custom_string_list_variables', function () {
    this.getInput("string_list_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("StringList")), 'STRING_LIST_VAR');
});
Blockly.Extensions.register('custom_final_integer_variables', function () {
    this.getInput("final_integer_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("FinalInteger")), 'FINAL_INTEGER_VAR');
});
Blockly.Extensions.register('custom_final_double_variables', function () {
    this.getInput("final_double_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("FinalDouble")), 'FINAL_DOUBLE_VAR');
});
Blockly.Extensions.register('custom_final_float_variables', function () {
    this.getInput("final_float_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("FinalFloat")), 'FINAL_FLOAT_VAR');
});
Blockly.Extensions.register('custom_final_string_variables', function () {
    this.getInput("final_string_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("FinalString")), 'FINAL_STRING_VAR');
});
Blockly.Extensions.register('custom_final_boolean_variables', function () {
    this.getInput("final_boolean_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("FinalBoolean")), 'FINAL_BOOLEAN_VAR');
});
Blockly.Extensions.register('custom_integer_variables', function () {
    this.getInput("integer_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("int")), 'INTEGER_VAR');
});
Blockly.Extensions.register('custom_leveling_data_variables', function () {
    this.getInput("leveling_data_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("ILevelingData")), 'LEVELING_DATA_VAR');
});
Blockly.Extensions.register('custom_bck_recipe_variables', function () {
    this.getInput("bck_recipe_var").appendField(new Blockly.FieldDropdown(getVariablesOfType("BCKRecipe")), 'BCK_RECIPE_VAR');
});
Blockly.Extensions.register('custom_help_page_variables', function () {
    const input = this.getInput("help_page_var")
    input.appendField(new Blockly.FieldDropdown(getVariablesOfType("HelpPage")), 'HELP_PAGE_VAR');
});