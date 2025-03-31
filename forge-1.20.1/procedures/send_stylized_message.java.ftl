if (${input$entity} instanceof Player _player && !_player.level().isClientSide())
	_player.displayClientMessage(BCKUtils.Text.toStyled(${input$message}), ${input$action_bar});