class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  CATEGORIES_IGNORED = ['extras', 'modifier']

  before_action :csp_header
  before_action :init_mojis
  before_action :load_moji_from_cache

  def csp_header
    @csp_nonce = SecureRandom.hex
    csp = "default-src 'self';"
    csp << "script-src 'self' 'nonce-#{@csp_nonce}' www.google-analytics.com;"
    csp << "img-src 'self' www.google-analytics.com;"
    response.headers['Content-Security-Policy'] = csp
  end

  def init_mojis
    unless Rails.cache.exist? :moji_index
      Rails.cache.write(:moji_index, Gemojione::Index.new)
      logger.info 'cached moji index'
    end
    unless Rails.cache.exist? :moji_categories
      cache_by_category = {}
      idx = Gemojione::Index.new
      idx.all.values.each{ |m|
        cat = m['category']
        next if CATEGORIES_IGNORED.include? cat
        # logger.info cat
        cache_by_category[cat] = [] unless cache_by_category.has_key? cat
        cache_by_category[cat] << m
      }
      logger.info "loaded categories #{cache_by_category.keys}"
      Rails.cache.write(:moji_by_category, cache_by_category)
    end
  end

  def load_moji_from_cache
    @moji_index = Rails.cache.read(:moji_index)
    @moji_by_category = Rails.cache.read(:moji_by_category)
  end

end
