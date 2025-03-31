if (${input$entity} instanceof LevelingEntity _levelingEntity && !${input$entity}.level().isClientSide())
    _levelingEntity.setLevel(${input$type}, (int)${input$amount}, ${input$callback});