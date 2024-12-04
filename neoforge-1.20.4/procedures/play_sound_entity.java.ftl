<#assign soundName = field$sound>

<#if soundName?starts_with("CUSTOM:")>
    <#assign soundName = soundName?substring(7)>
    Util.playSound(${input$entity}, BuiltInRegistries.SOUND_EVENT.getValue(new ResourceLocation(${JavaModName}.MODID + ":${soundName}")), ${input$volume}, ${input$pitch});
<#elseif !soundName?starts_with("minecraft:")>
    <#assign soundName = "minecraft:" + soundName>
    Util.playSound(${input$entity}, BuiltInRegistries.SOUND_EVENT.getValue(new ResourceLocation("${soundName}")), ${input$volume}, ${input$pitch});
</#if>