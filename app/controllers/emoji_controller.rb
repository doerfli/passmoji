class EmojiController < ApplicationController

  before_action :load_moji_from_cache

  def load_moji_from_cache
    @moji_index = Rails.cache.read(:moji_index)
  end

  def index
    @passmoji = {
      :chars => '',
      :imgs => []
    }
    unless params['length'].nil?
      allowed_characters = @moji_index.all.values
      len = (params['length'] || '8').to_i
      len = 128 if len > 128
      (0...len).each { |i|
          t = allowed_characters.sample
          #logger.info t
          @passmoji[:chars] += t['moji'].encode('utf-8')
          @passmoji[:imgs] <<  view_context.image_path("emoji/png/#{t['unicode']}.png")
      }
    end
    #logger.info @passmoji

    respond_to do |format|
      format.html
      format.json { render :json => @passmoji }
    end
  end

  def show
  end

end
