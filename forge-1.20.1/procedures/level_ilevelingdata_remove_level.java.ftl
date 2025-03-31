<#assign varName = field$LEVELING_DATA_VAR?replace("local:", "")?replace("global:", JavaModName + "Variables.")/>
if(${varName} != null)
    ${varName}.setLevel(${input$type}, (${varName}.getLevel(${input$type}) - (int)${input$amount}));