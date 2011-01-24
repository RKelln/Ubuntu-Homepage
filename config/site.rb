#require 'compass'

# Default is 3000
# configuration.preview_server_port = 3000
 
# Default is localhost
# configuration.preview_server_host = "localhost"
 
# Default is true
# When false .html & index.html get stripped off generated urls
# configuration.use_extensions_for_page_links = true
 
# Default is an empty hash
# configuration.sass_options = {}
configuration.sass_options = Compass.sass_engine_options
 
# Default is an empty hash
# http://haml-lang.com/docs/yardoc/file.HAML_REFERENCE.html#options
# configuration.haml_options = {}
configuration.haml_options = {
  :attr_wrapper => '"',
  :ugly => "true",
  :format => :html5
}

#
# R18n
#
require 'r18n-core'
preview_language = 'en' # requires restart of preview if changed
R18n.set(R18n::I18n.new(preview_language, File.join(@src_dir, 'i18n')))

#
# Haml filter
#
R18n::Filters.add('haml', :haml) do |content, config|
  require 'ruby-debug'; debugger
  #require 'haml'
  html = Haml::Engine.new(content, configuration.haml_options)
  html.render
end


#
# modify build steps to do translations
#
module StaticMatic::BuildMixin
  def build
    build_css
    if File.exist?(File.join(@src_dir, 'i18n'))
      R18n.get.available_locales.each do |locale|
        # TODO: set the active locale instead of setting the entire R18n object?
        R18n.set(R18n::I18n.new(locale.code, File.join(@src_dir, 'i18n')))
        build_html(locale.code)
      end
    else
      build_html
    end
  end

  def build_html(lang=nil)
    Dir["#{@src_dir}/pages/**/*.haml"].each do |path|
      next if File.basename(path) =~ /^\_/ # skip partials
      file_dir, template = source_template_from_path(path.sub(/^#{@src_dir}\/pages/, ''))
      html_file = lang.nil? ? template : "#{template}_#{lang}"
      save_page(File.join(file_dir, html_file), generate_html_with_layout(template, file_dir))
    end
  end
end
