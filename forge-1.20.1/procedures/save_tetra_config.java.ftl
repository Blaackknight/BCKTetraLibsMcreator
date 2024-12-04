<#assign verif = input$replace>
<#if verif?boolean == false>
    if(!ConfigManager.fileExist()) {
        ConfigManager.saveConfig(tetra_config);
    }
<#else>
    if(ConfigManager.fileExist()) {
        ConfigManager.saveConfig(tetra_config);
    }
</#if>