/*
 * Code is from Philipp Antoni's project http://go.infinise.com/
 * 
 * RK: I have removed the go.infinise.com API calls which removes
 *     autocomplete and suggestions as you type. At some point it
 *     might be nice to replace with something that talks to Google
 *     et al directly and not through go.infinse.com
 */
 
var eng = {},
	current = {},
	fadeDur = 200,
	titlePrefix = "Search ",

	idxWidth = 700,
	idxLogoFull  = [225,80],
	idxLogoSmall = [157,56],
	idxMargin = 24,
	idxFadedOpacity = 0.3,

	idxHeight = 0;


$(function()
{
	// Create Engine Index

	indexCreate();

	// Behavior

	//$("#i").keyup(function(ev) 		{ fetchSuggestions(ev.which); });
	//$(document).click(function(ev) 	{ closeSugBox(ev.srcElement) });

	//$("#toggleInfo").click(function(){
	//	$("#infoBox").toggle(400);
	//});

	// Set up first engine
	var engine = localStorage["Ubuntu-Homepage.current.engine"];
  if (!eng.hasOwnProperty(engine)) {
    engine = firstProp(eng);
  }
	build(engine, false);
	
	// set focus
	setFocus(true);

});

function doSearch()
{
	var url = eng[current.engine].places[current.place][0];
		url = url.replace("%query%", encodeURIComponent($("#i").val()));
	if (typeof eng[current.engine].languages == "object")
		url = url.replace("%lang%", eng[current.engine].languages[current.language]);

	window.location.href = url;
	return false;
}


/*	ENGINE INDEX
	-----------------------------------------------------  */

function indexCreate()
{
	var row = 0,
		i = 0, // Reset every row
		j = 0, // Total
		offset = 0,
		cols = Math.floor(idxWidth/idxLogoSmall[0]);

	for (e in eng)
	{
		// If the offset hasn't been set yet
		// And the number of engines left to draw is <= items in the final row
		if (
			offset == 0 &&
			(numKeys(eng) - j) <= (numKeys(eng) % cols)
		) {
			offset = cols - numKeys(eng) % cols;
			offset = offset * (idxLogoSmall[0]+idxMargin) / 2;
		}

		$("#engines").prepend("<a id='"+e+"_logo' ref='"+e+"'><img src='engines/"+eng[e].logo+"'></a>");

		if (i == cols) { i=0; row++; };
		eng[e].idxPos = [
			(idxLogoSmall[0]+idxMargin)*i - idxWidth/2 + offset,
			(idxLogoSmall[1]+idxMargin)*row
		];
		i++; j++;
	}
	idxHeight = (row+1)*(idxLogoSmall[1]+idxMargin)-idxMargin;
	idxHeight = Math.max(idxHeight, idxLogoFull[1]);

	$("#engines a").click(function(){ build($(this).attr("ref"), true); setFocus(true); })

	$("#engines a").css({
		"left": "50%",
		"bottom": "0",
		"marginLeft": -idxLogoFull[0]/2+"px"
	});

	$("#engines").mouseenter(function(){ indexOpen(); });
	$("#engines").mouseleave(function(){ indexClose(); });
}

var idxState = false,
	idxClear = undefined;

function indexOpen()
{
	idxState = true;
	clearTimeout(idxClear);

	$("#engines").css({
		"height": idxHeight
	});

	for (e in eng)
	{
		var op = $("#"+e+"_logo").hasClass("active");
		$("#"+e+"_logo").stop().queue("fx",[]).animate({
			"marginLeft": eng[e].idxPos[0]+"px",
			"marginBottom": eng[e].idxPos[1]+"px",
			"opacity": (op) ? 1 : idxFadedOpacity,
			"width": idxLogoSmall[0],
			"height": idxLogoSmall[1],
		}, fadeDur);
	}
}

function indexClose()
{
	idxState = false;

	$("#engines").css({
		"height": idxLogoFull[1]
	});

	$("#engines a").each(function()
	{
		var op = $(this).hasClass("active");
		$(this).stop().queue("fx",[]).animate({
			"marginLeft": -idxLogoFull[0]/2+"px",
			"marginBottom": 0,
			"opacity": (op) ? 1 : 0,
			"width": idxLogoFull[0],
			"height": idxLogoFull[1]
		}, fadeDur);
	});

	// Because jQuery doesn't like me
	idxClear = setTimeout(function(){ $("#engines a:not(.active)").css("opacity",0) }, fadeDur);
}



/*	GENERATING THE SEARCH ENGINE PAGE
	-----------------------------------------------------  */

function build(e, animate)
{
	var methodFade = (animate) ? fadeDur : 0;

	current.engine = e;		// Just the engine's ID for reference
	localStorage["Ubuntu-Homepage.current.engine"] = e; // store current engine locally
	e = eng[e];				// Engine object

	//$("#title").html(titlePrefix+e.pageTitle);

	$("#method").stop().queue("fx",[]).animate({"opacity": 0}, methodFade);

	op = (idxState) ? idxFadedOpacity : 0;
	$("#engines a").stop().queue("fx",[]).removeClass("active");
	$("#"+current.engine+"_logo").addClass("active").animate({"opacity": 1}, fadeDur);
	$("#engines a:not(.active)").animate({"opacity": op}, fadeDur);

	if (typeof e.languages == "object") {
	  var lang = localStorage["Ubuntu-Homepage.current.language"];
    if (!e.languages.hasOwnProperty(lang)) {
      lang = firstProp(e.languages);
    }
	  setLang(lang);
	}
	else $("#lang").fadeOut(fadeDur);

	setTimeout(function()
	{
		$("#method").html("");
		for (place in e.places) $("#method").append("<a onclick='setPlace(this, true)'>"+place+"</a>");

		setPlace("#method a:first");

		$("#method").animate({"opacity": 1}, fadeDur);
	}, methodFade);
}

function setPlace(place, focus)
{
	current.place = $(place).html();

	$("#method a").removeClass("active");
	$(place).addClass("active");
	setFocus(focus);
}

function setLang(language, focus)
{
	current.language = language;
  localStorage["Ubuntu-Homepage.current.language"] = language;

	$("#lang").fadeIn(fadeDur).html(language);
	setFocus(focus);
}


/*	KEYBOARD SHORTCUTS
	-----------------------------------------------------  */

var isCtrl = false;
var isCmd = false;

$(document).keyup(function(e)
{
	if (e.which == 17) isCtrl=false;
	if (e.which == 91) isCmd=false;
}
).keydown(function(e)
{
	if (e.which == 17) isCtrl=true;
	if (e.which == 91) isCmd=true;

	if (e.which == 49 && isCtrl == true) 	{ /* Key "1" */ 	nextEngine(true); return false; }
	if (e.which == 50 && isCtrl == true) 	{ /* Key "2" */ 	nextPlace(); return false; }
	if (e.which == 51 && isCtrl == true) 	{ /* Key "3" */ 	nextLanguage(); return false; }

  // if search field doesn't have focus then read arrow keys
  if (!$('input.search').hasClass('focus')) {
	  if (e.which == 37) 						{ /* Arrow Left */  prevEngine(false); }
	  if (e.which == 39) 						{ /* Arrow Right */ nextEngine(false); }
  }
});

function setFocus(focus) {
  if (typeof focus !== "undefined" && focus) {
	  $("input.search").focus();
	}
}

function nextEngine(focus)
{
	build(findNext(eng, current.engine), true);
	setFocus(focus);
}

function prevEngine(focus)
{
	build(findPrev(eng, current.engine), true);
	setFocus(focus);
}

function nextPlace()
{
	var nextPlace = findNext(eng[current.engine].places, current.place);
	$("#method a").each(function()
	{
		if ($(this).html() == nextPlace) setPlace($(this), true);
	})
}

function nextLanguage()
{
	setLang(findNext(eng[current.engine].languages, current.language), true);
}

