<#assign varName = field$LEVELING_DATA_VAR?replace("local:", "")?replace("global:", JavaModName + "Variables.")/>
(${varName} != null ? ${varName}.getExperience(${input$type}) : 0)