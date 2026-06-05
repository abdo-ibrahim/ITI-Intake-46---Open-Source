require_relative 'handler'

class FileHandler < Handler
  def initialize(file_path = "events.log")
    @file_path = file_path
  end

  def handle(event)
    File.open(@file_path, "a") do |f|
      f.puts(event.format)
    end
  end
end
