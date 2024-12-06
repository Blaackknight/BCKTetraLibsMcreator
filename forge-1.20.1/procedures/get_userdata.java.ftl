<#assign result = input$output>

<#if result?length == 2>
  <#assign result = "">
<#elseif result?length == 1>
  <#assign result = "">
<#elseif result?length == 0>
  <#assign result = "">
<#else>
  <#assign result = "(" + result?substring(1, result?length - 1) + ")">
</#if>

${result}Userdata.data(${input$key}, ${input$player}.level(), ${input$player})