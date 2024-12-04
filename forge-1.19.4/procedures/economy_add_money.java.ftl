if (${input$player} instanceof Player) {
    EconomyManager.addMoney((Player) ${input$player}, ${input$amount}, ${input$callback});
}