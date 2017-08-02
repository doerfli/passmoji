class EmojiController < ApplicationController

  def index
    @passmoji = {
      :chars => '',
      :imgs => []
    }
    unless params['length'].nil?
      allowed_characters = @moji_index.all.values
      len = (params['length'] || '8').to_i
      index =
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
