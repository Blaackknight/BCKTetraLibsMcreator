<#assign hover_text = input$hoverText>
<#assign click_action = field$clickAction>
<#assign click_value = input$clickValue>
<#if hover_text?length == 0>
    <#assign hover_text = null>
</#if>
<#if click_value?length == 0>
    <#assign click_value = null>
</#if>
<#if click_action == "null">
    ${field$VAR?replace("local:", "")?replace("global:", "${JavaModName}Variables.")}.add(TetraPage.createText(${input$text}, ${hover_text}, null, ${click_value}));
<#else>
    ${field$VAR?replace("local:", "")?replace("global:", "${JavaModName}Variables.")}.add(TetraPage.createText(${input$text}, ${hover_text}, "${click_action}", ${click_value}));
</#if>
