class Themes::Mopxopminhphat::Scripts::Migrate
  def migrate
    website_name = ENV['WEB']

    raise 'WEB not found' unless website_name

    # Create config
    unless WebConfig.current
      WebConfig.create!(key: 'default')
    end

    # Create theme
    unless Theme.current
      Theme.create!(
        name: 'default',
        is_default: true,
        source: 'local',
        path: website_name
      )
    end

    # Create pages
    pages = [
      { name: 'Home', slug:'/' },
      { name: 'Phương pháp sư phạm', slug:'phuong-phap-su-pham' },
      { name: 'Đội ngũ giáo viên', slug:'doi-ngu-giao-vien' },
      { name: 'Câu chuyện tiến bộ', slug:'cau-chuyen-tien-bo' },
      { name: 'Clevai captain', slug:'clevaicaptain' },
      { name: 'Clevai mars', slug:'clevaimars' },
      { name: 'Đăng ký thành công', slug:'dang-ky-thanh-cong' },
      { name: 'Đăng ký', slug:'dang-ky' },
      { name: 'Đội ngũ', slug:'doi-ngu-clevai' },
      { name: 'Liên hệ', slug:'lien-he' },
      { name: 'Smarttp10', slug:'smarttp10' },
      { name: 'Smart1200', slug:'smart1200' },
      { name: 'Toán theo khối', slug:'toan-theo-khoi' },
      { name: 'Sự kiện', slug:'su-kien' },
      { name: 'Đăng nhập', slug:'dang-nhap' },
      { name: 'Quyền lợi & chính sách', slug:'quyen-loi-va-chinh-sach' },
      { name: 'Điều khoản sử dụng', slug:'dieu-khoan-su-dung-dich-vu' },
      { name: 'Bảo mật thông tin cá nhân', slug:'bao-mat-thong-tin-ca-nhan' },
      { name: 'Giao hàng & trả hàng', slug:'giao-hang-va-tra-hang' },
      { name: 'Phương thức thanh toán', slug:'phuong-thuc-thanh-toan' },
      { name:'Sự kiện & Tin tức', slug:'su-kien' },
      { name:'Toán theo khối 3', slug:'toan-theo-khoi-3' },
      { name:'Toán theo khối 4', slug:'toan-theo-khoi-4' },
      { name:'Toán theo khối 5', slug:'toan-theo-khoi-5' },
      { name:'Toán theo khối 6', slug:'toan-theo-khoi-6' },
      { name:'Toán theo khối 7', slug:'toan-theo-khoi-7' },
      { name:'Toán theo khối 8', slug:'toan-theo-khoi-8' },
      { name:'Toán theo khối 9', slug:'toan-theo-khoi-9' },
      { name: 'Tech for study', slug: 'tech-for-study' },
      { name:'Hiểu con yêu', slug: 'hieu-con-yeu' }
    ]

    pages.each do |page|
      next if Page.where(slug: page[:slug]).exists?

      Page.create!(page.merge(status: 'published'))
    end
  end

  def update_category_slug
    Category.all.each do |cate|
      cate.update_columns(slug: cate.slug.sub('hieu-con-yeu/', ''))
      cate.global_slugs.each do |slug|
        slug.update_columns(name: slug.name.sub('hieu-con-yeu/', ''))
      end
    end
  end
end
