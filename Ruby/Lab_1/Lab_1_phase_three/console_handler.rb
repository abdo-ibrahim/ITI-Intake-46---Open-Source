require_relative 'handler'

class ConsoleHandler < Handler
  def handle(event)
    puts
    puts event.format
    puts "✓ Event logged."
    puts
  end
end
