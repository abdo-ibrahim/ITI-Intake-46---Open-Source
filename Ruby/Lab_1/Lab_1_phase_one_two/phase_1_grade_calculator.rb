puts "How many scores?"
count = gets.chomp.to_i

scores = []

count.times do |i|
  loop do
    print "Enter score #{i + 1}: "

    input = gets.chomp

    begin
      score = Integer(input)

      if score.between?(0, 100)
        scores << score
        break
      else
        puts "score must be between 0 and 100"
      end

    rescue ArgumentError
      puts "please enter a valid number."
    end
  end
end

average = scores.sum.to_f / scores.length

grade = ""
if average >= 90
  grade = "A"
elsif average >= 80
  grade = "B"
elsif average >= 70
  grade = "C"
elsif average >= 60
  grade = "D"
else
  grade = "F"
end

puts "\nResults:"
puts "  Average : #{average.round(2)}"
puts "  Grade   : #{grade}"
puts "  Highest : #{scores.max}"
puts "  Lowest  : #{scores.min}"