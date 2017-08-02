class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :load_moji

  def load_moji
    @moji_index = Gemojione::Index.new
  end
end
