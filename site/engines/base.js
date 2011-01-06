/*
 * Code is from Philipp Antoni's project http://go.infinise.com/
 * 
 * RK: I have removed the go.infinise.com API calls which removes
 *     autocomplete and suggestions as you type. At some point it
 *     might be nice to replace with something that talks to Google
 *     et al directly and not through go.infinse.com
 */
 
/*	GOOGLE
	----------------------------------------------------- */

eng.google = {
	pageTitle: "Google",
	logo: "google-white.png",
	places: {
		'Web'    : ["http://www.google.com/search?q=%query%&hl=en",		false],
		'Images' : ["http://images.google.com/images?q=%query%&hl=en",	false],
		'Maps'   : ["http://maps.google.com/maps?q=%query%",			false]
	}
};


/*	WIKIPEDIA
	----------------------------------------------------- */

eng.wikipedia = {
	pageTitle: "Wikipedia",
	logo: "wikipedia-white.png",
	places: {
		'Go to Article' : ["http://%lang%.wikipedia.org/wiki/Special:Search?search=%query%&go=Go", false],
		'Search'        : ["http://%lang%.wikipedia.org/wiki/Special:Search?search=%query%&fulltext=Search", false],
	},
	languages: {
		'EN': 'en',
		'DE': 'de',
		'FR': 'fr',
		'IT': 'it',
		'ES': 'es'
	}
};


/*	YOUTUBE
	----------------------------------------------------- */

eng.youtube = {
	pageTitle: "YouTube",
	logo: "youtube.png",
	places: {
		'Videos' : ["http://www.youtube.com/results?search_query=%query%", false]
	},
};


/*	TWITTER
	----------------------------------------------------- */

eng.twitter = {
	pageTitle: "Twitter",
	logo: "twitter.png",
	places: {
		'Search Twitter' : ["http://twitter.com/search?q=%query%", false]
	}
};
