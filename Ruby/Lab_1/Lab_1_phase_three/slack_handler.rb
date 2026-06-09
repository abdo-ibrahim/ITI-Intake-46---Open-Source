require_relative 'handler'

class SlackHandler < Handler
  def handle(event)
    # Simulates sending a slack notification
    # puts "[SLACK NOTIFICATION] #{event.format}"
  end
end
