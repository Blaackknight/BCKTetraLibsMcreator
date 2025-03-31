if (${input$entity} instanceof LevelingEntity _levelingEntity && !${input$entity}.level().isClientSide())
    _levelingEntity.setExperience(${input$type}, ${input$amount}, ${input$callback});