require 'compass'

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
@config_dir = File.expand_path(File.join(File.dirname(__FILE__), "config"))
@i18n_dir = File.join(@src_dir, "i18n")
require File.join(@config_dir, 'i18nloader.rb')
R18n.default_loader = R18n::Loader::I18nFormat

default_language = 'en' # requires restart of preview if changed
R18n.set R18n::I18n.new(default_language, @i18n_dir)

# preview
#R18n::Filters.add(R18n::Untranslated, :untranslated_html) do
# |content, config, translated_path, untranslated_path, path|
# "#{translated_path}<span style='color: red'>#{untranslated_path}</span>"
#end

#
# modify build steps to do translations
#
module StaticMatic::BuildMixin
  def build
    build_css
    if R18n and R18n.get
      # hide untranslated text
      R18n::Filters.add(R18n::Untranslated, :hide_untranslated) { '' }
      # build default language
      build_html
      # build for each locale
      R18n.get.available_locales.each do |locale|
        # TODO: set the active locale instead of setting the entire R18n object?
        R18n.set R18n::I18n.new(locale.code, @i18n_dir)
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
