Ubuntu Homepage with Help
======================

This is simply a replacement homepage for Ubuntu installations. It provides additional
help, links and search options. It is designed to be beautiful and more friendly to first
time users, while adding a few neat tricks for experienced users.

You can see the latest version of the code running at [newbuntu.org](http://newbuntu.org/).

![v0.1 Ubuntu Homepage](https://github.com/RKelln/Ubuntu-Homepage/raw/master/doc/Ubuntu_homepage_v0.1.png "v0.1 Ubuntu Homepage")


Usage
-----
Copy the `site` directory to the Ubuntu install, then set the browser home page to be the `index.html` file inside of that directory.

The `src` and `config` directories are for development only.


Release History
--------------
See CHANGELOG for details.

* __0.1__: *06 Jan 2011* First commit.
* __0.2__: *17 Jan 2011* Ready for trial installs.
* __0.3__: *12 Feb 2011* Internationalization initialized.

Requirements
-----------
The built site can be simply viewed in Firefox or Chrome. It has never been tested on anything else.

To develop or change the site you'll need:

* Ruby (tested on 1.9.2)
* [StaticMatic gem](http://staticmatic.rubyforge.org/) (tested with v0.11.1)
* [HAML](http://haml-lang.com/) (tested with v3.0.22)
* [SASS](http://sass-lang.com/) 
* [Compass](http://compass-style.org/) (tested with v0.10.5)
For localization / internationalization:
* [R18n](http://r18n.rubyforge.org/)
* [WebTranslateIt](https://github.com/AtelierConvivialite/webtranslateit/)

You can just manually edit the index.html or style.css files for personal use, but I probably won't acccept any changes that way. Please [fork the the project](http://help.github.com/forking/) for html or code changes or use the fantastic [Web Translate It](https://webtranslateit.com/en/projects/1574-Ubuntu-Start-page) service for translations.


Getting Started
--------------
NOTE: tested on Ubuntu 10.04 only with Firefox 4, 3.6 and Chrome 9

1.  Clone or download from github

2.  Change to the Ubuntu-Homepage directory

3.  Preview with StaticMatic

        staticmatic preview .

4.  Go to <http://localhost:3000/> and you should see the site running.

5.  If you make changes and want to distribute the static html site then you need to build it using the build script:

        ./build.rb


Translations
-----------

Thanks to [webtranslateit.com](https://webtranslateit.com), translating the page has become easier than ever.

[Make a request to join the translation team](https://webtranslateit.com/en/projects/1574-Ubuntu-Start-page/invitation_request) to update existing translations or request new ones.

Current translations generously provided by:

* JayPiEs (Jan Schuermann): Deutch
* allrod5 (Rodrigo Martins): Português
* albertoi: Español

Thanks everyone!

Thanks
------
Thanks to the SocialTech and Linux Education folks in Toronto. The current code,
images and design are based on:

* [Philipp Antoni's Go project](http://go.infinise.com/)
* [spiceofdesign's Ubuntu homepage](http://spiceofdesign.deviantart.com/art/Ubuntu-Homepage-189798952)
* [HTML5Boilerplate](http://html5boilerplate.com)
* [jQuery](http://jquery.com)

Other thanks:

* pmo for hosting on [noobuntu.org](http://noobuntu.org/)
* JayPiEs, allrod5, Stribianese91, for suggestions and bug fixes

License
-------
Ubuntu Homepage software is released under the [GPL 3](http://www.gnu.org/licenses/gpl.html).

Copyright (C) 2011,  Ryan Kelln

Ubuntu Homepage is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Ubuntu Homepage is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

