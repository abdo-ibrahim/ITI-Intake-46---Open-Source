class Handler
  def handle(event)
    raise NotImplementedError, "#{self.class} has not implemented method '#{__method__}'"
  end
end
