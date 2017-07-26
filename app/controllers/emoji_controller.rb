class EmojiController < ApplicationController

  def index
    @password = nil
    unless params['length'].nil?
      allowed_characters = Emoji.all.select{ |e| ! e.raw.nil? }
      @password = ''
      len = (params['length'] || '8').to_i
      (0...len).each { |i|
          @password += allowed_characters.sample(1).first.raw
      }
    end
    logger.info @password
  end

  def show
  end

end
