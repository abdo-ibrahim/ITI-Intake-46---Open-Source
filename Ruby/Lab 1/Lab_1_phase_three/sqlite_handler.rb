begin
  require 'sqlite3'
rescue LoadError
  # The sqlite3 gem is not installed
end
require_relative 'handler'

class SqliteHandler < Handler
  def initialize(db_path = "events.db")
    unless defined?(SQLite3::Database)
      puts "SQLite3 gem not found. SQLiteHandler will be disabled."
      @disabled = true
      return
    end
    @disabled = false
    @db = SQLite3::Database.new(db_path)
    setup_db
  end

  def handle(event)
    return if @disabled
    @db.execute("INSERT INTO events (category, description, duration, timestamp) VALUES (?, ?, ?, ?)",
                [event.category, event.description, event.duration, event.timestamp.to_s])
  end

  private

  def setup_db
    @db.execute <<-SQL
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY,
        category TEXT,
        description TEXT,
        duration INTEGER,
        timestamp TEXT
      );
    SQL
  end
end
