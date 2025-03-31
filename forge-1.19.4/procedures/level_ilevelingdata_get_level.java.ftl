<#assign varName = field$LEVELING_DATA_VAR?replace("local:", "")?replace("global:", JavaModName + "Variables.")/>
/*@int*/(${varName} != null ? ${varName}.getLevel(${input$type}) : 0)