Release History
=============

* __0.3: *12 Feb 2011* Internationalization initialized
    * easier to modify default language order
    * use HTML 5 localStorage for remembering search engine and language preference
    * add News search to Google
    * added help title text to language buttons
    * Improved Getting Started text
    * first tests on i18n
      * hacked in R18n support
      * EN, DE, PT translations mostly complete
      * hacked in translations support for js text
      * very basic language switcher
    * added fancy css transitions
    * use compass mixins in sass
    * updated translations to use webtranslateit.com service
      * custom loader for rails i18n format for r18n-core
    * added build.rb script (update translations, build, fix stylesheet paths)
    * added Spanish translation (thanks albertoi)
    * fix layout bug with sections
    * build index.html (in English) as well as index_en.html

* __0.2: *17 Jan 2011* Ready for trial installs__
    * added how to support Ubuntu text
    * fancy <a>
    * fancy <em>
    * fixed link css order
    * remove help icon (it is present in 10.04 only)
    * switch back to Google hosted Ubuntu font (strange regression with local fonts)
    * add Chrome help links
    * Fixes for github links and names. Thanks [BeSlayed](http://github.com/BeSlayed).

* 0.1.1: *07 Jan 2011* README updated to show screenshot.

* __0.1: *06 Jan 2011* First commit.__
    * combined HTML5Boilerplate, go.infinse.com, and spiceofdesign projects
    * removed go.infinse.com API calls
        * removed autocomplete and suggestions
    * changed key capture
        * added left/right arrow to select search engine
        * removed up/down arrow, ESC, etc
    * added svg ubuntu logo
    * added svg help icon
    * added white versions of Google and Wikipedia logos and switched to use them
    * added Ubuntu font files and usee them throughout


