class EmojiController < ApplicationController

  def index
    @moji_categories = @moji_by_category.keys.map{ |c| {:name => c.pluralize.humanize, :value => c}}.sort{ |a,b| a[:name] <=> b[:name] }
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
