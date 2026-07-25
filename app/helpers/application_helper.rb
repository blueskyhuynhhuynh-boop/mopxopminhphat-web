module ApplicationHelper
  include UserAllowedMethods
  def view_render(*args)
    render *args
  end

  def full_asset_url(path)
    # ASSET_HOST is set-but-empty in production, and "" is truthy in Ruby, so a plain
    # `||` here silently yielded a bare path and made og:url/og:image relative.
    "#{ENV['ASSET_HOST'].presence || ENV['HOST']}#{path}"
  end

  def safe_eval_user_input(name)
    return name unless name.is_a?(String)
    name.gsub(/%[a-z_]+%/) do |m|
      method = m[1..-2].strip.to_sym
      if UserAllowedMethods.instance_methods.include?(method) 
        send(method)
      else
        m
      end
    end
  end
end

