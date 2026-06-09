require_relative 'handler'

class EventRouter
  def initialize
    @handlers = []
  end

  def register(handler)
    unless handler.is_a?(Handler)
      raise ArgumentError, "Must provide a Handler"
    end
    @handlers << handler
  end

  def dispatch(event)
    @handlers.each do |handler|
      handler.handle(event)
    end
  end
end
