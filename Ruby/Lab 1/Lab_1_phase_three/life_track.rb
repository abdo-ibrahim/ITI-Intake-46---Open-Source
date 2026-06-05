require_relative 'event'
require_relative 'event_router'
require_relative 'console_handler'
require_relative 'file_handler'
require_relative 'sqlite_handler'
require_relative 'slack_handler'

class LifeTrack
  def initialize
    @router = EventRouter.new
    @router.register(ConsoleHandler.new)
    @router.register(FileHandler.new("life_track.log"))
    
    begin
      @router.register(SqliteHandler.new("life_track.db"))
    rescue LoadError, StandardError => e
      puts "Warning: SQLite handler failed to load (#{e.message}). Skipping."
    end
    
    @router.register(SlackHandler.new)
  end

  def run
    puts "=== LifeTrack ==="
    loop do
      puts "1. Log a work session"
      puts "2. Log a study session"
      puts "3. Log an exercise session"
      puts "4. Log a meal"
      puts "5. Exit"
      print "\nChoose an option: "

      choice = gets.chomp

      case choice
      when '1' then prompt_event("Work")
      when '2' then prompt_event("Study")
      when '3' then prompt_event("Exercise")
      when '4' then prompt_event("Meal")
      when '5'
        break
      else
        puts "Invalid choice. Please try again.\n\n"
      end
    end
  end

  private

  def prompt_event(category)
    print "Description: "
    description = gets.chomp
    print "Duration (minutes): "
    duration = gets.chomp.to_i

    event = Event.new(category, description, duration)
    @router.dispatch(event)
  end
end

if __FILE__ == $0
  app = LifeTrack.new
  app.run
end
