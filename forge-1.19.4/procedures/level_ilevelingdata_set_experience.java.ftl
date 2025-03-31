<#assign varName = field$LEVELING_DATA_VAR?replace("local:", "")?replace("global:", JavaModName + "Variables.")/>
if(${varName} != null)
    ${varName}.setExperience(${input$type}, ${input$amount});