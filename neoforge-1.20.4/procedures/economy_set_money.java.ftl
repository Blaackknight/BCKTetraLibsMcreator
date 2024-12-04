if (${input$player} instanceof Player) {
    EconomyManager.setMoney((Player) ${input$player}, ${input$amount}, ${input$callback});
}