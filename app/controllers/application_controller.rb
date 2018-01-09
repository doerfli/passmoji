class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :load_moji
  before_action :csp_header

  def load_moji
    unless Rails.cache.exist? :moji_index
      Rails.cache.write(:moji_index, Gemojione::Index.new)
      logger.info 'cached moji index'
    end
  end

  def csp_header
    @csp_nonce = SecureRandom.hex
    csp = "default-src 'self';"
    csp << "script-src 'self' 'nonce-#{@csp_nonce}' www.google-analytics.com;"
    csp << "img-src 'self' www.google-analytics.com;"
    response.headers['Content-Security-Policy'] = csp
  end
end
