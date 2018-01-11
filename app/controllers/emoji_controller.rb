class EmojiController < ApplicationController

  def index
    @moji_categories = @moji_by_category.keys.map{ |c|
      moji_sample = @moji_by_category[c].sample(3)
      {
        :name => c.pluralize.humanize,
        :value => c,
        :sample => moji_sample.map{ |m| view_context.image_path("emoji/png/#{m['unicode']}.png")}
      }
    }.sort{ |a,b| a[:name] <=> b[:name] }
    @passmoji = {
      :chars => '',
      :imgs => []
    }
    unless params[:length].nil? || params[:categories].nil?
      logger.debug params[:categories]
      allowed_characters = params[:categories].map{ |c| @moji_by_category[c]}.flatten
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
