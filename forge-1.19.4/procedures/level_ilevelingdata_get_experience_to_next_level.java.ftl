<#assign varName = field$LEVELING_DATA_VAR?replace("local:", "")?replace("global:", JavaModName + "Variables.")/>
(${varName} != null ? ${varName}.getExperienceToNextLevel(${input$type}) : 0)