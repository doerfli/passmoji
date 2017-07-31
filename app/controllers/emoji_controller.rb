class EmojiController < ApplicationController

  def index
    @passmoji = nil
    @passmoji_imgs = []
    unless params['length'].nil?
      allowed_characters = Emoji.all.select{ |e| ! e.raw.nil? }
      @passmoji = ''
      @passmoji_imgs = []
      len = (params['length'] || '8').to_i
      (0...len).each { |i|
          t = allowed_characters.sample(1).first
          @passmoji += t.raw.encode('utf-8')
          @passmoji_imgs << view_context.image_path("emoji/#{t.image_filename}")
          logger.info t.unicode_version
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
