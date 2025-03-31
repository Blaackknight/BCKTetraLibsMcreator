if (${input$entity} instanceof LevelingEntity _levelingEntity && !${input$entity}.level().isClientSide())
    _levelingEntity.removeExperience(${input$type}, ${input$amount}, ${input$callback});