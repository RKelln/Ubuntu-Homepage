require "staticmatic/compass"

project_type = :staticmatic

ROOT = File.join(File.dirname(__FILE__), '..')
puts "Site root is: " + File.expand_path(ROOT)
project_path = ROOT               # must be set for Compass to work 

http_path = "/"
http_images_path = "/images"
sass_dir = "src/stylesheets" # dir containing Sass / Compass source files
css_dir = "site/stylesheets" # final CSS
images_dir = "site/images" # final images
output_style = :compact # CSS is nice and compact

line_comments = false # Tight

# To enable relative paths to assets via compass helper functions. Uncomment:
relative_assets = true
