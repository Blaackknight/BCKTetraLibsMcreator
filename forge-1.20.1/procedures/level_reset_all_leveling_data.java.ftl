if (${input$entity} instanceof LevelingEntity _levelingEntity && !${input$entity}.level().isClientSide())
    _levelingEntity.resetAllLevelingData(${input$callback});