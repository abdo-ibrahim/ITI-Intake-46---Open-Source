class ApplicationController < ActionController::Base
  # Bonus 3.1: Require authentication for all actions by default.
  # Controllers can opt out with `skip_before_action :authenticate_user!`.
  before_action :authenticate_user!
end
