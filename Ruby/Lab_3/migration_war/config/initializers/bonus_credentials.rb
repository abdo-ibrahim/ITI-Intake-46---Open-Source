# Bonus 3.2: Demo of using Rails encrypted credentials.
# This initializer exposes a few credential values as a constant
# so they can be referenced anywhere in the app.
#
# In production, NEVER commit config/master.key. It is .gitignored.
# The encrypted config/credentials.yml.enc IS committed.
#
# Usage examples:
#   Rails.application.credentials.secret_api_key
#   Rails.application.credentials.war_bot_name
#   Rails.application.credentials.dig(:nested, :key)
#   Rails.application.credentials.fetch(:bonus_added_at)
#
# To edit (locally only):
#   EDITOR="code --wait" rails credentials:edit
#
# In CI/prod, set RAILS_MASTER_KEY env var (never commit the key).

Rails.application.config.x.bonus_credentials = {
  secret_api_key: Rails.application.credentials.secret_api_key,
  war_bot_name:   Rails.application.credentials.war_bot_name,
  bonus_added_at: Rails.application.credentials.bonus_added_at
}

if Rails.application.config.x.bonus_credentials[:secret_api_key].present?
  Rails.logger.info "[Bonus 3.2] Encrypted credentials loaded for: #{Rails.application.config.x.bonus_credentials[:war_bot_name]}"
end
