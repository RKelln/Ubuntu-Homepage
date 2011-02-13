#!/usr/bin/env ruby
#
# Build script for Ubuntu Homepage
#
# 1) Get translations using webtranslateit
# 2) Staticmatic build
# 3) Fix staticmatic path bugs

unless `which wti`
  puts "WebTranslateIt not installed: [sudo] gem install wti"
  exit
end

unless `which staticmatic`
  puts "StaticMatic not installed: [sudo] gem install staticmatic"
  exit
end

system('wti pull --all')

system('staticmatic build .')

# remove extraneous slash at the beginning of stylesheet path
Dir.glob("site/index*.html").each do |arg|
  f = File.open(arg)
  working_file = f.read
  f.close
  working_file.gsub!(/^<link href=\"\/stylesheets/,'<link href="stylesheets')
  f = File.new(arg, "w")
  f.print(working_file)
  f.close
end
