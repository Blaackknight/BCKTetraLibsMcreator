Executors.newSingleThreadScheduledExecutor().schedule(() -> {
    ${statement$state}
}, ${input$time}, java.util.concurrent.TimeUnit.MILLISECONDS);