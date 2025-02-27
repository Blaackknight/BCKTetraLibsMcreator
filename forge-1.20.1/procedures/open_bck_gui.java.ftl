if (${input$entity} instanceof ServerPlayer _ent) {
	BlockPos _bpos = BlockPos.containing(${input$x}, ${input$y}, ${input$z});
	NetworkHooks.openScreen((ServerPlayer) _ent, new MenuProvider() {
		@Override
		public Component getDisplayName() {
			return Component.literal("BCK");
		}

		@Override
		public AbstractContainerMenu createMenu(int id, Inventory inventory, Player player) {
			return new BCKMenu(id, inventory, new FriendlyByteBuf(Unpooled.buffer()).writeBlockPos(_bpos));
		}
	}, _bpos);
}
