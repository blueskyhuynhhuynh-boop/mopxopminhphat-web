module MetaTagsHelper
  def all_meta_tags
    default_meta_tags + 
    googlebot_meta_tags + 
    locale_meta_tags + 
    seo_meta_tags +
    custom_meta_tags
  end

  def default_meta_tags
    [
      { :content => "text/html; charset=UTF-8", "http-equiv" => "Content-Type" },
      { :content => "width=device-width, initial-scale=1.0", :name => "viewport" }
    ]
  end

  def googlebot_meta_tags
    if seo_index?
      [
        { content: 'index, follow', name: 'robots' },
        { content: 'index, follow', name: 'googlebot-news' },
        { content: 'index, follow', name: 'googlebot' },
        { content: 'snippet', name: 'googlebot-news' }
      ]
    else
      [
        { :content =>  "noindex, nofollow", :name => "robots" },
        { :content =>  "noindex, nofollow", :name => "googlebot-news" },
        { :content =>  "noindex, nofollow", :name => "googlebot" },
        { :content => "nosnippet", :name => "googlebot-news" }
      ]
    end
  end

  def locale_meta_tags
    [
      {:content => "Vietnamese", "http-equiv" => "content-language"},
      {:content => "vi", "http-equiv" => "Content-Language"},
      {:content => "vn", :name => "Language"}
    ]
  end

  def geo_meta_tags
    [
      {:content => "VN-HN", :name => "geo.region"},
      {:content => "Hà Nội", :name => "geo.placename"},
      {:content => "21.024813;105.853297", :name => "geo.position"},
      {:content => "21.024813, 105.853297", :name => "ICBM"}
    ]
  end

  def seo_meta_tags
    [
      {:content => "website", :property => "og:type"},
      {:content => meta_description, :name => "description"},
      {:content => meta_title, :name => "title"},
      {:content => meta_link, :name => "url"},
      {:content => meta_image, :name => "image"},
      {:content => meta_link, :property => "og:url"},
      {:content => meta_image, :property => "og:image"},
      {:content => meta_title, :property => "og:image:alt"},
      {:content => meta_title, :property => "og:title"},
      {:content => meta_description, :property => "og:description"},
      {:content => (web_config("website.name").presence || "Mốp Xốp Minh Phát"), :property => "og:site_name"},
      {:content => "vi_VN", :property => "og:locale"},
      {:content => "summary_large_image", :name => "twitter:card"},
      {:content => meta_title, :name => "twitter:title"},
      {:content => meta_description, :name => "twitter:description"},
      {:content => meta_image, :name => "twitter:image"},
      {:content => meta_title, :name => "twitter:image:alt"},
      {:content => meta_description, :name => "Abstract"}
    ]
  end

  def custom_meta_tags
    WebConfig.for('seo.meta_tags') || []
  end

  def seo_index?
    return false if @theme_option_seo_noindex

    web_config('seo.index_all') && meta_content.seo_index?
  end

  def meta_content
    @meta_content ||= (content || Page.home.content)
  end

  def meta_content_owner
    @meta_content_owner ||= meta_content.owner
  end

  def meta_description
    safe_eval_user_input(
      meta_content.meta_description.presence || meta_content_owner.description.presence
    )    
  end

  def meta_title
    safe_eval_user_input(
      meta_content.meta_title.presence || meta_content_owner.name.presence
    )    
  end

  def meta_image
    full_asset_url(meta_content.meta_image_url.presence || meta_content_owner.try(:image_url).presence || web_config("logo_url"))
  end

  def meta_link
    full_asset_url path_for(meta_content_owner)
  end

  def canonical_url
    full_url_for_record meta_content_owner
  end

  def organization_schema
    {
      "@context" => "https://schema.org",
      "@type" => "Organization",
      "name" => (web_config("website.name").presence || "Mốp Xốp Minh Phát"),
      "url" => "https://mopxopminhphat.com",
      "logo" => (web_config("logo_url").to_s.start_with?("http") ? web_config("logo_url") : "https://mopxopminhphat.com#{web_config("logo_url")}"),
      "description" => (web_config("seo.organization_description").presence || "Công ty TNHH sản xuất thương mại Mốp Xốp Cách Nhiệt Minh Phát - chuyên cung cấp các loại mốp xốp, panel EPS cách nhiệt, xốp định hình."),
      "address" => {
        "@type" => "PostalAddress",
        "streetAddress" => (web_config("office_address2").presence || "983 Kha Vạn Cân, Khu Phố 2, Phường Linh Xuân"),
        "addressLocality" => "Thành Phố Thủ Đức",
        "addressRegion" => "Thành Phố Hồ Chí Minh",
        "addressCountry" => "VN"
      },
      "telephone" => (web_config("phone").presence || "+84 911 813 699").to_s.strip,
      "email" => (web_config("email").presence || "huynhminh.minhphat@gmail.com"),
      "sameAs" => [
        web_config("social.facebook_link"),
        web_config("social.youtube_link"),
        web_config("social.zalo_link")
      ].compact.reject(&:blank?)
    }
  end

  def website_schema
    {
      "@context" => "https://schema.org",
      "@type" => "WebSite",
      "name" => (web_config("website.name").presence || "Mốp Xốp Minh Phát"),
      "url" => "https://mopxopminhphat.com"
    }
  end

end
