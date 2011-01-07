Ubuntu Homepage with Help
======================

This is simply a replacement homepage for Ubuntu installations. It provides additional
help, links and search options. It is designed to be beautiful and more friendly to first
time users, while adding a few neat tricks for experienced users.

![v0.1 Ubuntu Homepage](https://github.com/RKelln/Ubuntu-Homepage/tree/master/doc/Ubuntu_homepage_v0.1.png "v0.1 Ubuntu Homepage")


Usage
-----
Copy the `site` directory to the Ubuntu install, then set the browser home page to be the `index.html` file inside of that directory.

The `src` and `config` directories are for development only.


Release History
--------------
See CHANGELOG for details.

* __0.1__: *06 Jan 2011* First commit.


Requirements
-----------
The built site can be simply viewed in Firefox or Chrome. It has never been tested on anything else.

To develop or change the site you'll need:

* Ruby (tested on 1.9.2)
* [StaticMatic gem](http://staticmatic.rubyforge.org/) (tested with v0.11.1)
* [HAML](http://haml-lang.com/) (tested with v3.0.22)
* [SASS](http://sass-lang.com/) 
* [Compass](http://compass-style.org/) (tested with v0.10.5)

You can just manually edit the index.html or style.css files for personal use, but I probably won't acccept any changes that way.


Getting Started
--------------
NOTE: tested on Ubuntu 10.04 only with Firefox 4, 3.6 and Chrome 9

1.  Clone or download from github

2.  Change to the ubuntuhomepage directory

3.  Preview with StaticMatic

        staticmatic preview .

4.  Go to <http://localhost:3000/> and you should see the site running.

5.  If you make changes and want to distribute the static html site then you need to build with StaticMatic:

        staticmatic build .

    However there is a bug or problem with the stylesheet path, such that you need to manually
    edit index.html and remove the extraneous / character:

         <link href="/stylesheets/style.css" media="all" rel="stylesheet" type="text/css"/>

    to:

         <link href="stylesheets/style.css" media="all" rel="stylesheet" type="text/css"/>


Thanks
------
Thanks to the SocialTech and Linux Education folks in Toronto. The current code,
images and design are based on:

* [Philipp Antoni's Go project](http://go.infinise.com/)
* [spiceofdesign's Ubuntu homepage](http://spiceofdesign.deviantart.com/art/Ubuntu-Homepage-189798952)
* [HTML5Boilerplate](http://html5boilerplate.com)
* [jQuery](http://jquery.com)


License
-------
Image-A-Day webserver software is released under the [GPL 3](http://www.gnu.org/licenses/gpl.html).

Copyright (C) 2011,  Ryan Kelln

Image-A-Day is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Image-A-Day is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

