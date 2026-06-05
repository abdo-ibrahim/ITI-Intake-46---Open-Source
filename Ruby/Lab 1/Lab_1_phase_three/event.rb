class Event
  attr_reader :category, :description, :duration, :timestamp

  def initialize(category, description, duration)
    @category = category
    @description = description
    @duration = duration
    @timestamp = Time.now
  end

  def format
    "[#{@timestamp.strftime('%Y-%m-%d %H:%M')}] #{@category.upcase} — #{@description} (#{@duration} min)"
  end
end
