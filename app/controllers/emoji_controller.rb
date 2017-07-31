class EmojiController < ApplicationController

  def index
    @password = nil
    unless params['length'].nil?
      allowed_characters = Emoji.all.select{ |e| ! e.raw.nil? }
      @password = ''
      len = (params['length'] || '8').to_i
      (0...len).each { |i|
          t = allowed_characters.sample(1).first
          @password += t.raw.encode('utf-8')
          logger.info t.unicode_version
      }
    end
    logger.info @password

    respond_to do |format|
      format.html
      format.json { render :json => {
          passmoji: @password.force_encoding('UTF-8')
        }
      }
    end
  end

  def show
  end

end
