class EmojiController < ApplicationController

  before_action :load_moji_from_cache

  def load_moji_from_cache
    @moji_index = Rails.cache.read(:moji_index)
    @moji_by_category = Rails.cache.read(:moji_by_category)
  end

  def index
    @moji_categories = @moji_by_category.keys.map{ |c| {:name => c.pluralize.humanize, :value => c}}
    @passmoji = {
      :chars => '',
      :imgs => []
    }
    unless params[:length].nil? || params[:categories].nil?
      logger.info params[:categories]
      # TODO build allowed_characters from categories
      allowed_characters = @moji_index.all.values
      len = (params[:length] || '8').to_i
      len = 128 if len > 128
      (0...len).each { |i|
          t = allowed_characters.sample
          @passmoji[:chars] += t['moji'].encode('utf-8')
          @passmoji[:imgs] <<  view_context.image_path("emoji/png/#{t['unicode']}.png")
      }
    end

    respond_to do |format|
      format.html
      format.json { render :json => @passmoji }
    end
  end

  def show
  end

end
