function safeName(s) 
{
	return s.toLowerCase().replace(/[^a-z0-9_]/gi, '');
}

function firstProp(obj) 
{
	var first = true;
	for (var prop in obj) {
		if (first) { return(prop) }
		first = false;
	}
}

function lastProp(obj) 
{
  // this is ridiculous
  var last;
	for (var prop in obj) {
    last = prop
	}
	return last;
}

function findNext(where, now) 
{
	var isNext = false;
	var next = null;
	for (var item in where) {
		if (isNext) {
			next = item;
			isNext = false;
		}
		if (item == now) isNext = true;
	}
	if (next == null) next = firstProp(where);
	return next;
}

function findPrev(where, now) 
{
	var prev = lastProp(where);
  for (var item in where) {
    if (item == now) 
      break;
    else {
      prev = item;
    }
  }
	return prev;
}

function inArray(needle, haystack) 
{
	return ((','+haystack.toString()+',').indexOf(','+needle+',')!==-1)
}

function numKeys(obj)
{
    var count = 0;
    for(var prop in obj)
    {
        count++;
    }
    return count;
}
