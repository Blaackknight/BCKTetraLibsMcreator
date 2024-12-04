<#assign soundName = field$sound>

<#if soundName?starts_with("CUSTOM:")>
    <#assign soundName = soundName?substring(7)>
    fr.bck.tetralibs.Util.playSound(${input$entity}, ForgeRegistries.SOUND_EVENTS.getValue(new ResourceLocation(${JavaModName}.MODID + ":${soundName}")), ${input$volume}, ${input$pitch});
<#elseif !soundName?starts_with("minecraft:")>
    <#assign soundName = "minecraft:" + soundName>
    fr.bck.tetralibs.Util.playSound(${input$entity}, ForgeRegistries.SOUND_EVENTS.getValue(new ResourceLocation("${soundName}")), ${input$volume}, ${input$pitch});
</#if>