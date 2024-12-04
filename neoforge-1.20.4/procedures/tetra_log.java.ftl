<#assign custom = input$custom>

<#if custom?boolean == false>
    LogLevel.tetraLog(${input$text}, ${input$level}, ${input$only});
<#else>
    LogLevel.tetraLog(${input$title}, ${input$text}, ${input$level}, ${input$only});
</#if>