# encoding: utf-8
=begin
Loader for Rails translations.

Copyright (C) 2009 Andrey “A.I.” Sitnik <andrey@sitnik.ru>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
=end

require 'yaml'
require 'syck' if '1.8.' != RUBY_VERSION[0..3]

module R18n
  module Loader
    # Loader for translations in Rails I18n format:
    # 
    #   R18n::I18n.new('en', R18n::Loader::Rails.new)
    # 
    # It uses the simple directory loader in r18n-core/yaml-loader.rb
    # 
    #   R18n::I18n.new('en',
    #                  R18n::Loader::I18nFormat.new('locales'))
    class I18nFormat < YAML
      PLURAL_KEYS = { :zero  => 0, :one => 1, :few => 2, :many => 'n',
                      :other => 'other' }
      
      def load(locale)
        @translations = super(locale)
        @translations[locale.code.downcase]
      end
            
      protected
      
      # Change pluralization and keys to R18n format.
      def transform(value)
        #require 'ruby-debug'; debugger
        if value.is_a? Hash
          if value.empty?
            value
          elsif value.keys.inject(true) { |a, i| a and PLURAL_KEYS.include? i }
            R18n::Typed.new('pl', R18n::Utils.hash_map(value) { |k, v|
              [PLURAL_KEYS[k], transform(v)]
            })
          else
            R18n::Utils.hash_map(value) { |k, v| [k.to_s, transform(v)] }
          end
        elsif value.is_a? @private_type_class
          Typed.new(value.type_id, value.value)
        else
          value
        end
      end
    end
  end
end

# Filter to use Rails named variables:
#
# name: "My name is %{name}"
#
# i18n.name(name: 'Ivan') #=> "My name is Ivan"
R18n::Filters.add(String, :named_variables) do |content, config, params|
  if params.is_a? Hash
    content = content.clone
    params.each_pair do |name, value|
      v = config[:locale].localize(value)
      content.gsub! "%{#{name}}", v
      content.gsub! "{{#{name}}}", v
    end
  end
  content
end

# Pluralization by named variable <tt>%{count}</tt>.
R18n::Filters.add('pl', :named_pluralization) do |content, config, param|
  if param.is_a? Hash and param.has_key? :count
    type = config[:locale].pluralize(param[:count])
    type = 'n' if not content.has_key? type
    content[type]
  else
    content
  end
end

