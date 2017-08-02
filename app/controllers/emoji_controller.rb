class EmojiController < ApplicationController

  def index
    @passmoji = nil
    @passmoji_imgs = []
    unless params['length'].nil?
      allowed_characters = @moji_index.all.values
      @passmoji = ''
      @passmoji_imgs = []
      len = (params['length'] || '8').to_i
      index =
      (0...len).each { |i|
          t = allowed_characters.sample(1).first
          logger.info t
          @passmoji += t['moji'].encode('utf-8')
          @passmoji_imgs <<  view_context.image_path("emoji/png/#{t['unicode']}.png")
      }
    end
    logger.info @passmoji

    respond_to do |format|
      format.html
      format.json { render :json => {
          passmoji: @passmoji,
          passmoji_imgs: @passmoji_imgs
        }
      }
    end
  end

  def show
  end

end
