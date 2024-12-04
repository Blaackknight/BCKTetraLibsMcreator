if (${input$player} instanceof Player) {
    EconomyManager.removeMoney((Player) ${input$player}, ${input$amount}, ${input$callback});
}