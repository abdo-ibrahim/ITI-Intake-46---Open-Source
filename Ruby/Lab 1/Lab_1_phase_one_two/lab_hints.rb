require 'openssl'
require 'digest'
require 'base64'
require 'json'

def _lab_dir
  File.expand_path(File.dirname($0))
end

def _x9z
  _s = [?P, ?S].map(&:ord).sum
  _b = [0xCA, 0xD7, 0xCA, 0x8E, 0xCF, 0xC2, 0xC1, 0x8E,
        0x91, 0x93, 0x91, 0x95, 0x8E, 0xD1, 0xD6, 0xC1,
        0xDA, 0x8E, 0xCB, 0xC2, 0xCD, 0xC7, 0xD0, 0xCB,
        0xC2, 0xC8, 0xC6]
  _p = _b.map { |b| b ^ _s }.pack('C*')
  _h = Digest::SHA256.digest(File.binread(File.join(_lab_dir, 'lab_hints.rb')))
  Digest::SHA256.digest(_p + _h)
end

# Cooldown between hints: 0x03 * 0x3C = 3 * 60 = 180 seconds.
def _wait_seconds
  [0x03].pack('C*').unpack1('C') * [0x3C].pack('C*').unpack1('C')
end

def _dec(blob)
  raw       = Base64.strict_decode64(blob)
  iv        = raw[0, 16]
  encrypted = raw[16..]
  _alg      = [65, 69, 83, 45, 50, 53, 54, 45, 67, 66, 67].pack('C*')
  cipher    = OpenSSL::Cipher.new(_alg)
  cipher.decrypt
  cipher.key = _x9z
  cipher.iv  = iv
  cipher.update(encrypted) + cipher.final
rescue OpenSSL::Cipher::CipherError
  abort "\e[31mError: hints.enc is corrupted or was tampered with. Contact your instructor for a fresh copy.\e[0m"
end

def load_hints
  enc_path = File.join(_lab_dir, '._x9z.so')
  unless File.exist?(enc_path)
    abort "\e[31mError: required data file not found. Contact your instructor.\e[0m"
  end
  raw = _dec(File.read(enc_path).strip)
  JSON.parse(raw)
rescue JSON::ParserError
    abort "\e[31mError: lab_hints_exe.rb has been modified. Please contact your instructor for a fresh copy.\e[0m"
end

# ---------------------------------------------------------------------------
# Persistent hint log — survives Ctrl+C and restarts.
# HMAC-signed with _dk so editing the timestamps is detected.
# ---------------------------------------------------------------------------

def _log_path
  File.join(_lab_dir, '.hint_log')
end

def load_log
  return {} unless File.exist?(_log_path)
  raw  = JSON.parse(File.read(_log_path))
  data = raw['t'] || {}
  sig  = raw['s']
  expected = OpenSSL::HMAC.hexdigest('SHA256', _x9z, JSON.dump(data))
  return {} unless sig == expected
  data
rescue JSON::ParserError, TypeError
  {}
end

def save_log(data)
  sig = OpenSSL::HMAC.hexdigest('SHA256', _x9z, JSON.dump(data))
  File.write(_log_path, JSON.dump({ 't' => data, 's' => sig }))
end

def _hk(phase_key, hint_idx)
  "#{phase_key}_#{hint_idx}"
end

# Returns:
#   nil     — previous hint not yet seen (must view hints in order)
#   Integer — seconds still remaining on cooldown (0 means unlocked now)
def seconds_remaining(phase_key, hint_idx, log)
  return 0 if hint_idx == 0
  return 0 if log.key?(_hk(phase_key, hint_idx))  # already viewed, no re-wait
  prev_seen_at = log[_hk(phase_key, hint_idx - 1)]
  return nil if prev_seen_at.nil?
  elapsed   = Time.now.to_i - prev_seen_at.to_i
  remaining = _wait_seconds - elapsed
  remaining > 0 ? remaining : 0
end

def record_shown(phase_key, hint_idx, log)
  key = _hk(phase_key, hint_idx)
  return if log.key?(key)  # already recorded — don't reset the clock
  log[key] = Time.now.to_i
  save_log(log)
end

def fmt_time(seconds)
  "%d:%02d" % [seconds / 60, seconds % 60]
end

def fmt_unlock_at(seconds)
  Time.now + seconds
end

# ---------------------------------------------------------------------------
# Display helpers
# ---------------------------------------------------------------------------

def hr(char = '-', width = 50)
  char * width
end

def print_header
  puts
  puts "\e[1;36m" + hr('=') + "\e[0m"
  puts "\e[1;36m  Lab Hint System\e[0m"
  puts "\e[1;36m" + hr('=') + "\e[0m"
  puts
end

def choose_phase(hints)
  phases = hints.keys.sort_by(&:to_i)
  puts "Which phase are you working on?\n\n"
  phases.each_with_index do |key, idx|
    puts "  #{idx + 1}. #{hints[key]['phase_name']}"
  end
  puts
  print "> "
  input = gets&.chomp&.strip
  idx   = input.to_i - 1
  if idx < 0 || idx >= phases.length
    puts "\e[33mInvalid choice. Please enter a number from the list.\e[0m"
    return choose_phase(hints)
  end
  phases[idx]
end

def show_hints_for_phase(phase_data, phase_key, log)
  display_mode = phase_data['display_mode'] || 'sequential'
  if display_mode == 'menu'
    show_hints_menu(phase_data, phase_key, log)
  else
    show_hints_sequential(phase_data, phase_key, log)
  end
end

def show_hints_sequential(phase_data, phase_key, log)
  hints      = phase_data['hints']
  phase_name = phase_data['phase_name']
  count      = hints.length

  puts
  puts "\e[1m#{phase_name}\e[0m — #{count} hint#{count == 1 ? '' : 's'} available."

  hints.each_with_index do |hint, idx|
    puts
    remaining = seconds_remaining(phase_key, idx, log)

    if remaining.nil?
      puts "\e[90m  Hint #{idx + 1} is locked — view hint #{idx} first.\e[0m"
      next
    end

    if remaining > 0
      at = fmt_unlock_at(remaining).strftime("%H:%M")
      puts "\e[33m  Hint #{idx + 1} (#{hint['title']}) unlocks in \e[1m#{fmt_time(remaining)}\e[0m\e[33m" \
           " (at \e[1m#{at}\e[0m\e[33m) — close this and keep working!\e[0m"
      next
    end

    already = log.key?(_hk(phase_key, idx))
    label   = already ? " \e[90m(already viewed)\e[0m" : ""

    print "Show hint #{idx + 1} of #{count}: \e[1m#{hint['title']}\e[0m#{label}? (y/n) > "
    answer = gets&.chomp&.strip&.downcase

    if answer == 'y' || answer == 'yes'
      puts
      puts "\e[1;33m" + hr('-') + "\e[0m"
      puts "\e[1;33m  Hint #{idx + 1}: #{hint['title']}\e[0m"
      puts "\e[1;33m" + hr('-') + "\e[0m"
      puts
      hint['body'].each_line { |line| puts "  #{line}" }
      record_shown(phase_key, idx, log)
    else
      puts "\e[90m  (skipped)\e[0m"
    end
  end

  puts
  puts "\e[1;32mGood luck!\e[0m"
  puts
end

def show_hints_menu(phase_data, phase_key, log)
  hints      = phase_data['hints']
  phase_name = phase_data['phase_name']
  count      = hints.length

  puts
  puts "\e[1m#{phase_name}\e[0m — #{count} hint#{count == 1 ? '' : 's'} available."

  loop do
    puts
    hints.each_with_index do |hint, idx|
      rem     = seconds_remaining(phase_key, idx, log)
      already = log.key?(_hk(phase_key, idx))

      if rem.nil?
        puts "    \e[90m#{idx + 1}. #{hint['title']}  [locked — view previous hint first]\e[0m"
      elsif rem > 0
        at = fmt_unlock_at(rem).strftime("%H:%M")
        puts "    \e[33m#{idx + 1}. #{hint['title']}  [unlocks in #{fmt_time(rem)} at #{at}]\e[0m"
      else
        marker = already ? "\e[90m✓\e[0m" : " "
        puts "  #{marker} #{idx + 1}. #{hint['title']}"
      end
    end
    puts "    0. Done"
    puts
    print "Choose a hint > "
    input  = gets&.chomp&.strip
    choice = input.to_i

    break if choice == 0

    idx = choice - 1
    if idx < 0 || idx >= count
      puts "\e[33mInvalid choice. Enter a number from the list.\e[0m"
      next
    end

    rem = seconds_remaining(phase_key, idx, log)

    if rem.nil?
      puts "\e[33m  Hint #{idx + 1} is locked — view hint #{idx} first.\e[0m"
      next
    end

    if rem > 0
      at = fmt_unlock_at(rem).strftime("%H:%M")
      puts "\e[33m  Hint #{idx + 1} unlocks in \e[1m#{fmt_time(rem)}\e[0m\e[33m" \
           " (at \e[1m#{at}\e[0m\e[33m) — close this and keep working!\e[0m"
      next
    end

    puts
    puts "\e[1;33m" + hr('-') + "\e[0m"
    puts "\e[1;33m  Hint #{idx + 1}: #{hints[idx]['title']}\e[0m"
    puts "\e[1;33m" + hr('-') + "\e[0m"
    puts
    hints[idx]['body'].each_line { |line| puts "  #{line}" }
    record_shown(phase_key, idx, log)
  end

  puts
  puts "\e[1;32mGood luck!\e[0m"
  puts
end

def run
  hints = load_hints
  log   = load_log
  loop do
    print_header
    phase_key  = choose_phase(hints)
    phase_data = hints[phase_key]
    show_hints_for_phase(phase_data, phase_key, log)

    print "Work on a different phase? (y/n) > "
    again = gets&.chomp&.strip&.downcase
    break unless again == 'y' || again == 'yes'
  end
end

run
