var tiles = [];	
var counter = 0;
function getStartX() { return 100; }
function getStartY() { return 20; }
function calcPosition(){
	console.log(tiles);
	 for (var i=1;i<=tiles.length;i++){
		 //console.log(i/4*50);
		 //		 console.log(i);
		 tiles[i-1].x = getStartX() + i%12*70; 
		 tiles[i-1].y = getStartY() + Math.ceil(i/12)*70;
		
	 }
}





function place(){
		 for (var i=1;i<=tiles.length;i++){
		 document.getElementById('elem_'+String(i)).style.left = tiles[i-1].x;
		 document.getElementById('elem_'+String(i)).style.top = tiles[i-1].y;
		 document.getElementById('elem_'+String(i)).style.position = 'absolute';
	 }
}

function startPosition(){ 
	calcPosition();
	place();
}
  
function deleteTiles(id1, id2){
	document.getElementById(id1).remove();
	document.getElementById(id2).remove();
}

function deleteFromTiles(index1, index2){
	tiles.splice(index1, 1);
	tiles.splice(index2, 1);
}

function getRnd(){
	return Math.floor(Math.random()*tiles.length);
}

function swapTiles(id1, id2){
	var tmp = { x : 0, y : 0 };
	tmp.x = tiles[id1].x;
	tmp.y = tiles[id1].y;
	tiles[id1].x = tiles[id2].x;
	tiles[id1].y = tiles[id2].y;
	tiles[id2].x = tmp.x;
	tiles[id2].y = tmp.y;
}

function shuffle(){
	var id1=0;
	var id2=0;
	for (var i=0;i<=100;i++){
		id1 = getRnd();
		id2 = getRnd();
		while (id1==id2){
			id1 = getRnd();
			id2 = getRnd();
		};
		if (id1!=id2) 	swapTiles(id1, id2);
		
	};
	place();
	highlight();
}



function addPair(i, t, shift) {
	 tiles.push(
  {
	  x    : 0,
	  y    : 0,
	  html : `<div class='tile' data-master="no" data-tile='${t}_${String(i)}' id='elem_${String(i*2-1+shift)}'><img src='${t}_${String(i)}.png'/></div>`,
	  id   : "elem_"+String(i*2),
	  type : t
  });
  	 tiles.push(
  {
	  x     : 0,
	  y		: 0,
	  html : `<div class='tile' data-master="no" data-tile='${t}_${String(i)}' id='elem_${String(i*2+shift)}'><img src='${t}_${String(i)}.png'/></div>`,
	  id   : "elem_"+String(i*2),
	  type : t
  });
  
}

function addMaster(i, t, shift) {
	 tiles.push(
  {
	  x    : 0,
	  y    : 0,
	  html : `<div class='tile' data-master="yes" data-tile='${t}_${String(i)}' id='elem_${String(i+shift)}'><img src='${t}_${String(i)}.png'/></div>`,
	  id   : "elem_"+String(i+shift),
	  type : t
  });
 
  
}


function addGroup(count, t, shift){
	
	for (var i=1;i<=count;i++){
   addPair(i, t, shift);

  };
}

function addMasterGroup(count, t, shift){
	
	for (var i=1;i<=count;i++){
   addMaster(i, t, shift);

  };
}

function redrawCounter(){
		document.getElementById('counter').innerHTML = String(counter);
}

function updateCounter(){
	if (counter>0){
	counter -=2;
	};
	redrawCounter();
}

 function loadTiles(){
 var html = "";
 addGroup(9, 'dots',0);
 addGroup(9, 'bamboo',tiles.length);
 addGroup(9, 'symbols', tiles.length);
 addGroup(3, 'dragons', tiles.length);
 addMasterGroup(4, 'winds', tiles.length);
 addMasterGroup(4, 'flowers', tiles.length);
 addMasterGroup(4, 'seasons', tiles.length);
 console.log(tiles);
 for (var i=0; i<tiles.length;i++){
		html = html + tiles[i].html;
 };
 document.getElementById('field').innerHTML = html;
 counter = tiles.length;
 redrawCounter();
 }
 
 function actionDelete(current, last){
	 				console.log('Can delete');
				deleteTiles(current.id, last.id);
				current.tile = "";
				current.id = "";
				current.master = "";
				last.id = "";
				last.tile = "";
				last.master = "";
				updateCounter();
				highlight();
 }
 function el(id) { return 

 document.getElementById(id); 
 
 };


function dist(elem1, elem2){
	return Math.abs(parseInt(elem1.style.left)-parseInt(elem2.style.left));
}
 
 
 
 function isNearLeft(elem1, elem2, delta) {
	 //console.log(elem2);
  var elCx1 = parseInt(elem1.style.left);
  //console.log(elCx1);
  //console.log(elem2);
  var elCx2 = parseInt(elem2.style.left);
  //console.log(elCx2);
  var d = dist(elem1, elem2);
  if ((d==delta) && (elCx2<elCx1)&&(elem1.style.top==elem2.style.top)) {
 	return true;
  } else { return false; };
 }
 
  function isNearRight(elem1, elem2, delta) {
	 //console.log(elem2);
  var elCx1 = parseInt(elem1.style.left);
  //console.log(elCx1);
  //console.log(elem2);
  var elCx2 = parseInt(elem2.style.left);
  //console.log(elCx2);
  var d = dist(elem1, elem2);
  if ((d==delta) && (elCx2>elCx1)&&(elem1.style.top==elem2.style.top)) {
 	return true;
  } else { return false; };
 }
 
 
 function checkLeft(elem, delta){
	 var result = false;
	 var checks = document.getElementsByClassName('tile');
	 //console.log(checks);
	 for (var i=0;i<checks.length;i++){
		 
		 if (elem.id != checks[i].id){
			 if (isNearLeft(elem, checks[i], 70	)){
				 //checks[i].style.border = "green 2px solid";
				 result = true;
				 break;
			 };
		 };
	 };
	 return result;
 }
 
  function checkRight(elem, delta){
	 var result = false;
	 var checks = document.getElementsByClassName('tile');
	 //console.log(checks);
	 for (var i=0;i<checks.length;i++){
		 
		 if (elem.id != checks[i].id){
			 if (isNearRight(elem, checks[i], 70	)){
				 //checks[i].style.border = "blue 2px solid";
				 result = true;
				 break;
			 };
		 };
	 };
	 return result;
 }
 
 // Y is top
 
 function distY(elem1, elem2){
	return Math.abs(parseInt(elem1.style.top)-parseInt(elem2.style.top));
}

  function isNearUpper(elem1, elem2, delta) {
	 //console.log(elem2);
  var elCy1 = parseInt(elem1.style.top);
  //console.log(elCx1);
  //console.log(elem2);
  var elCy2 = parseInt(elem2.style.top);
  //console.log(elCx2);
  var d = distY(elem1, elem2);
  if ((d==delta) && (elCy2<elCy1)&&(elem1.style.left==elem2.style.left)) {
 	return true;
  } else { return false; };
 }
 
  function checkTop(elem, delta){
	 var result = false;
	 var checks = document.getElementsByClassName('tile');
	 //console.log(checks);
	 for (var i=0;i<checks.length;i++){
		 
		 if (elem.id != checks[i].id){
			 if (isNearUpper(elem, checks[i], 70	)){
				 //checks[i].style.border = "yellow 2px solid";
				 result = true;
				 break;
			 };
		 };
	 };
	 return result;
 }
 
   function isNearLower(elem1, elem2, delta) {
	 //console.log(elem2);
  var elCy1 = parseInt(elem1.style.top);
  //console.log(elCx1);
  //console.log(elem2);
  var elCy2 = parseInt(elem2.style.top);
  //console.log(elCx2);
  var d = distY(elem1, elem2);
  if ((d==delta) && (elCy2>elCy1)&&(elem1.style.left==elem2.style.left)) {
 	return true;
  } else { return false; };
 }
 
   function checkDown(elem, delta){
	 var result = false;
	 var checks = document.getElementsByClassName('tile');
	 //console.log(checks);
	 for (var i=0;i<checks.length;i++){
		 
		 if (elem.id != checks[i].id){
			 if (isNearLower(elem, checks[i], 70	)){
				// checks[i].style.border = "violet 2px solid";
				 result = true;
				 break;
			 };
		 };
	 };
	 return result;
 }
 
 
 
 
 function isFree(elem){
	 var u = checkTop(elem);
	 var d = checkDown(elem);
	 var r = checkRight(elem);
	 var l = checkLeft(elem);
	 var r = u && d && r && l;
	 return !r;
 }
 
 
 function highlight(){
		 var checks = document.getElementsByClassName('tile');
		//console.log(checks);
		for (var i=0;i<checks.length;i++){ 
			!isFree(checks[i]) ? checks[i].style.border = "blue 1px dashed" : checks[i].style.border = "none";
		};
 };
 
 loadTiles();
 startPosition();
 shuffle();
 
  counter = tiles.length;
 var current = {tile : "", id : "" };
 var last = {tile : "", id : "" };
 for (var i=0;i<tiles.length;i++){
	 document.getElementById('elem_'+String(i+1)).onclick = function(){
		 if (!isFree(this)) {
			 console.log('Skip!');
			 return ;
		 };
		 console.log(checkLeft(this));
		 console.log(checkRight(this));
		 console.log(checkTop(this));
		 console.log(checkDown(this));
		 console.log('Free:'+isFree(this));
		 
		
		 
		 console.log(this.getAttribute('data-tile'));
		 current.tile = this.getAttribute('data-tile');
		 current.id = this.id;
		 current.master = this.getAttribute('data-master');
		 highlight();
		 this.style.border = "";
		 this.classList.toggle('selected');
		 
		if (current.tile == last.tile ) {
			if (current.id != last.id) {
					 actionDelete(current, last);
			};
		} else 
			if ((current.master=="yes")&&(current.master == last.master)&&(current.id != last.id)){
				actionDelete(current, last);
		    };
		console.log(current);
		console.log(last);
		last.tile = current.tile;
		last.id = current.id;
		last.master = current.master;
		
	 };
 }
 
 document.getElementById('shuffle').onclick = function(){
	  shuffle();
	  highlight();
 }