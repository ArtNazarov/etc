	
	var tarotList = 
	` «Дурак» («Шут»), «Маг», «Жрица», «Императрица», «Император», «Иерофант» («Первосвященник»), «Влюблённые» («Выбор»), «Колесница», «Справедливость» («Правосудие»), «Отшельник», «Колесо Фортуны» («Зеркало»), «Сила», «Повешенный», «Смерть», «Умеренность» («Время»), «Дьявол», «Башня», «Звезда», «Луна», «Солнце», «Страшный суд» («Суд»), «Мир»`.split(',');
	
	var Ms = `Жезлы, пики, чаши,  монеты`.split(',');
	var Arc = 'Король, Королева, Принц, Принцесса'.split(',');
	for (var i=1;i<=10;i++) { Arc.push(i); };
	for (var i=0;i<Ms.length;i++){
		for (var j=0;j<Arc.length;j++){
			tarotList.push(Ms[i]+' '+Arc[j]);
		}
	};
	
	function shuffle(array) {
		for(var i=0;i<=50;i++){
			give = false;
			while(!give) {
				a = Math.floor(Math.random()*array.length);
				b = Math.floor(Math.random()*array.length);
				if (a!=b) {give = true; break; };
				};
				tmp = array[a];
				array[a]=array[b];
				array[b] = tmp;
		};
}

	shuffle(tarotList);
	console.log(tarotList);
	
	console.log(tarotList.length);
	
	
	
	class Block {
	  constructor(){ 
	   this.id = Math.floor(Math.random()*9999);
	   this.top = 0; 
	   this.left = 0; 
	   this.text = ''; 
	   this.width=0; 
	   this.height=0; 
	   this.connect = null;
	   this.connected = false;
	   this.items = [];
	   this.styles = '';
	  }
	  acc(){ return document.getElementById('block_'+this.id); }
	  set_style(css) { this.styles = css; }
	  get_styles(){return this.styles;}
	  add_child(obj){
		  this.items.push(obj);
	  }
	  set_connect(owner)
		{this.connect = owner;
		 this.connected = true;
		 owner.add_child(this);
		};
	  get_html(){
		return `<div id='block_${this.id}'>${this.text}</div>`;
	  }
	  get_style(){
	   return `<style>#block_${this.id}
					{
						top:${this.top};
						left:${this.left};
						width:${this.width};
						height:${this.height};
						${this.get_styles()}
					}</style>`;
	  }
	  rect(left,top,width, height){ this.left = left;this.top=top;this.height=height; this.width=width;
	  //if (this.connected)  this.owner.repaint();
	  }
	  set_text(text){this.text = text;  //if (this.connected)  this.owner.repaint();
	  }
	  repaint() {
		 
		  if (this.items.length>0) { 
		    console.log('Component');
		    var html = this.get_style()+`<div id='block_${this.id}'>`;
			for (var i=0;i<this.items.length;i++) { 
						html = html + `\t\t` + this.items[i].repaint(); 
			};
			return html + "</div>";
		  }
		  else { return this.get_style()+this.get_html(); };
		  
	}
	  draw(el) {
		  document.getElementById(el).innerHTML = this.repaint();
	}
	}
	
	var randomRGB = function(){ 
	   var r = Math.floor(Math.random()*255);
	   var g = Math.floor(Math.random()*255);
	   var b = Math.floor(Math.random()*255);
	   return `rgb(${r}, ${g}, ${b})`;
	}
 
	var c = new Block();
	c.rect(0,0,'100%', '100%');
	c.set_style(`background-image:url("https://burninghut.ru/wp-content/uploads/2020/03/tarot-cover-1920x1250.jpg"); 
		background-position:center center;
		background-repeat: no-repeat;
		position:fixed; 
		`);
	var blocks = [];
	card = 0;
	for (var i=0;i<9;i++){
		blocks[i] = new Block();
		blocks[i].set_style(
		`
		color:black;
		text-shadow:1px 1px 1px #000;
		background-image:url("https://365psd.com/images/istock/previews/8089/80896797-old-paper-background-with-celtic-border.jpg");
		background-size:cover;
		background-position: center center;
		background-repeat:no-repeat;
		text-align:center;
		position:absolute;
		z-index:1;
		border-bottom:1px solid red;
		box-shadow:1px 1px #000`);
		blocks[i].rect(`${20+i*30}px`, `${20+i*30}px`,'200px','300px');
		sel = false;
		while(!sel){
		card = Math.floor(tarotList.length*Math.random());
		if (card<tarotList.length) sel = true; break;
		};
       blocks[i].set_text(`Вам досталась карта<br/> ${tarotList[card]}`);
	    tarotList.splice(card, 1);
	   blocks[i].set_connect(c);
	};
	
	document.write(c.repaint());
	
 window.selectedElem = null;
 window.maxZ = 9999;
 
 

 
 function getSelected(){
	  return window.selectedElem;
 }
	
function followPointer(ev){ 
	
	element = getSelected(); if (!element) return ;
    element.style.left = ev.pageX - element.offsetWidth / 2 + 'px';
    element.style.top = ev.pageY - element.offsetHeight / 2 + 'px';

}
  
 document.onmousemove = function(ev) {
	element = getSelected(); if (!element) return ;
    followPointer(ev)
  }
  
  var draggable = function(element) { return function(e) { 
   if (getSelected()!==null) {window.selectedElem = null; return; }
   window.selectedElem = element;
  // подготовить к перемещению
  // 2. разместить на том же месте, но в абсолютных координатах
  element = getSelected(); if (!element) return ;
  element.style.zIndex = maxZ;
  maxZ+=1;

 
  followPointer(e);
 }
  
  }
  
  
 
  
  
  for (var i=0;i<9;i++){
	   blocks[i].acc().onclick = draggable(blocks[i].acc())  ;
  }
  
  // touch events
  
  document.addEventListener('touchmove', function(event) {
  element = getSelected(); if (!element) return ;
  element.style.zIndex = maxZ;
  maxZ+=1;
  element.style.left = event.touches[0].clientX;
  element.style.top = event.touches[0].clientY;
  

}, false);

for (var i=0;i<9;i++){
	   blocks[i].acc().addEventListener('touchstart',  function(event) {
		   window.selectedElem = this;
	   });
	    blocks[i].acc().addEventListener('touchend',  function(event) {
		   window.selectedElem = null;
	   });
  }
