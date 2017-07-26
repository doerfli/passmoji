class EmojiController < ApplicationController

  def index
    allowed_characters = Emoji.all
    @password = ''
    len = (params['length'] || '8').to_i
    (0...len).each { |i|
        @password += allowed_characters.sample(1).first.raw
    }
    logger.info @password
  end

  def show
  end

end
