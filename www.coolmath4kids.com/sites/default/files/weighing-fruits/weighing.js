var Weighs = function(canvas)
{
	//////////////////////
    //    GAME SETUP 
    //////////////////////
    var ctx;
	var intervalId;
	var mouse_x=0, mouse_y=0;
	var mouse_up=true;
	var clicked=true;
	var mainGame=false;
	var state='';
	var bg;
	var rasio;
	var currentLevel=1;
	var completedLevel=0;
	var highLevel=localStorage.getItem("levels");
	var score=0;
	var times=720;
	var urut=0;
	var acak=0;
	var count=0;
	var move=true;
	var back=false;
	var position=[0,1,2];
	var type=[0,1,2];
	var jenis=[];
	var hadiah=[0,1,2];
	var nilaiArray=[10,8,7,6,5,4,3,2];
	var yPop=[0,1,2,3,4];
	var range=[0,10,10,10,10,10,10,10,10,10,10,10,26,29,54,75,70,65,60,56,52,48,45,42,39,36,33,31,29,27,25,23,21,20,19,18,17,16,15,14,13,12];
	var barArray=[2.4,2.4,2.4,2.4,2.4,2.4,2.4,2.4,2.4,2.4,2.4,3.6,10,12,24,36];
	var popArray=[];
	var soal=[];
	var massArray=[];
	var wArray=[];
	var countArray=[];		
	var posX=560;
	var	posY=325;
	var posX1=560;
	var	posY1=325;
	var posX2=560;
	var	posY2=325;
	var posX3=560;
	var	posY3=325;
	var item1, item2, item3;
	var itemY1, itemY2, itemY3;
	var weigh1, weigh2, weigh3;
	var	radius=80;
	var mass1=0;
	var mass2=0;
	var mass3=0;
	var mass4=0;
	var oz1=0;
	var oz2=0;
	var oz3=0;
	var oz4=0;
	var	oz=0; //Nilai gram
	var selected=0;
	var a1=0;
	var a2=0;
	var b1=0;
	var b2=0;
	var c1=0;
	var c2=0;
	var laju=0;
	var t1=0;
	var t2=0;
	var ms=0;
	var text1="";
	var text2="";
	var text3="";
	var text4="";
	var mainTxt="";
	var	subTxt1="";
	var	subTxt2="";
	var angle;
	var lineX; 
	var	lineY; 
    var sndPop = new Audio('sounds/snd_pop.mp3'); 
	var sndWin = new Audio('sounds/snd_win.mp3');
	var	sndUp = new Audio('sounds/snd_level.mp3'); 
	var	sndOver = new Audio('sounds/snd_over.mp3');
	
    this.boot = function()
	{
		canvas.style.backgroundColor = '#EFEFEF';
		ctx = canvas.getContext("2d");
		ctx.fillStyle = "#00CCFF";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = "#fff";
		ctx.font = "30pt Changa One";
		ctx.font = "30pt Carter One";
		ctx.textAlign="center";
		ctx.lineWidth=5;
		ctx.strokeStyle="black";
		ctx.strokeText("loading..", 360, 0.75*canvas.height);
		ctx.fillText("loading..", 360, 0.75*canvas.height);	
		var sources = {  
			bg : "img/bground.png",
			pop: "img/popup.png",
			fruit: "img/fruits.png",
			scaler: "img/poundscale.png",
			rotasi : "img/landscape.png",
			rules : "img/howWeigh.png",
			layar : "img/layer.png",
			logo : "img/coolmath-logo.jpg",
			next : "img/next.png",
			replay : "img/replay.png"			
		}
		loadImages(sources, initGame);			
        
    }
    function loadImages(sources, callback)
	{
		var images = {};
		var loadedImages = 0;
		var numImages = 0;
		for (var src in sources) 
		{
			numImages++;
		}
		for (var src in sources) 
		{
			images[src] = new Image();
			images[src].onload = function()
			{
				if (++loadedImages >= numImages) 
				{
					callback(images);
				}
			};
		images[src].src = sources[src];
		}
	}	
	function initGame(images)
	{
		bg = images.bg;
		fruit = images.fruit;
		rules = images.rules;
		pop=images.pop;
		layar=images.layar;
		logo=images.logo;
		rotasi=images.rotasi;
		scaler=images.scaler;
		next=images.next;
		replay=images.replay;
		levelStorage();
		state='load';
		clearInterval(intervalId);
		intervalId=setInterval(preloader, 500); 
	} 
	//===========================================================================================================================================//		
	function levelStorage() 
	{
		if(window.localStorage)
		{
			highLevel=localStorage.getItem('levels');
		}
		else
		{
			highLevel=1;
		}
	}
	function Reset() 
	{
		wArray=[];
		massArray=[];
		posX=560;
		posY=325;
		btnY=280;
		radius=80;
		ms=0;
		detik=0;
		add=1;
		count=0;
		speed=0;		
		mainTxt="";
		subTxt1="";
		subTxt2="";
		itemY1=Math.floor(Math.random()*3);
		itemY2=Math.floor(Math.random()*3);
		itemY3=Math.floor(Math.random()*3);
		if(currentLevel<=10)
		{
			countArray=[0,0,0,1,2,3,4,5,6,7,7];
			spin=countArray[currentLevel];
			speedTime=2.4;
			intervalTime=10;
		}
		else
		{
			countArray=[1,1,2,2,3,3,4,4,5,5,6,7,7];	
			countArray.sort(function(){return Math.round(Math.random()) - 0.5;});
			spin=countArray[count];
			if(currentLevel>=15)
			{
				speedTime=36;
				if(currentLevel>=41)
				{
					intervalTime=12;
				}
				else
				{
					intervalTime=range[currentLevel];
				}
			}
			else
			{
				speedTime=barArray[currentLevel];
				intervalTime=range[currentLevel];
			}	
		}		
		spinner();
		completedLevel=currentLevel-1;
	}
	function preloader() 
	{
		ctx.font = "12px 'KGSC Solid'";
		ctx.fillText("", 610, 430); 
		ctx.font = "32px 'Carter One'";
		ctx.fillText("", 610, 430); 
		ctx.drawImage(logo, 290,150);
		count+=1;
		if(count>=6)
		{
			count=0;
			state='front';
			Reset();
			$(canvas).mousedown(on_mouse_down).on({'touchstart' : startTouch});
			$(canvas).mouseup(on_mouse_up).on({'touchend' : endTouch});
			clearInterval(intervalId);
			intervalId=setInterval(startGame,40); 	
		}
	}
	function spinner()
	{
		if(spin==0)
		{
			acak=Math.floor(Math.random()*10);
			mass1=Math.floor(Math.random()*(1+15-10))+10;
			mass2=Math.floor(Math.random()*(1+21-16))+16;
			mass3=Math.floor(Math.random()*(1+30-22))+22;
			massArray=[mass1,mass2,mass3];
			massArray.sort(function(){return Math.round(Math.random()) - 0.5;});
			position.sort(function(){return Math.round(Math.random()) - 0.5;});
			item1=type[position[0]];
			item2=type[position[1]];
			item3=type[position[2]];
			weigh1=massArray[position[0]];
			weigh2=massArray[position[1]];
			weigh3=massArray[position[2]];
			wArray=[weigh1,weigh2,weigh3];
			wArray.sort(function(a,b){return a - b});
			oz1=weigh1;
			oz2=weigh2;
			oz3=weigh3;
			if(acak<=3)
			{	
				posX1=120;
				posY1=240;
				posX2=370;
				posY2=240;
				posX3=620;
				posY3=240;	
			}
			else if(acak>=7)
			{	
				posX2=120;
				posY2=240;
				posX1=370;
				posY1=240;
				posX3=620;
				posY3=240;	
			}	
			else
			{
				posX2=120;
				posY2=240;
				posX3=370;
				posY3=240;
				posX1=620;
				posY1=240;	
			}
		}
		else if(spin==1)
		{
			mass1=Math.floor(Math.random()*(1+15-10))+10;
			mass2=Math.floor(Math.random()*(1+21-16))+16;
			mass3=Math.floor(Math.random()*(1+30-22))+22;
			massArray=[mass1,mass2,mass3];
			massArray.sort(function(){return Math.round(Math.random()) - 0.5;});
			position.sort(function(){return Math.round(Math.random()) - 0.5;});
			item1=type[position[0]];
			item2=type[position[1]];
			item3=type[position[2]];
			weigh1=massArray[position[0]];
			weigh2=massArray[position[1]];
			weigh3=massArray[position[2]];
			wArray=[weigh1,weigh2,weigh3];
			wArray.sort(function(a,b){return a - b});
			oz1=weigh1+weigh3;
			oz2=weigh2;
			oz3=weigh3;
			acak=Math.floor(Math.random()*10);
			if(acak<=3)
			{	
				posX1=120;
				posY1=240;
				posX2=370;
				posY2=240;
				posX3=620;
				posY3=240;	
			}
			else if(acak>=7)
			{	
				posX2=120;
				posY2=240;
				posX1=370;
				posY1=240;
				posX3=620;
				posY3=240;	
			}	
			else
			{
				posX2=120;
				posY2=240;
				posX3=370;
				posY3=240;
				posX1=620;
				posY1=240;	
			}
		}
		else if(spin==2)
		{
			mass1=Math.floor(Math.random()*(1+15-10))+10;
			mass2=Math.floor(Math.random()*(1+21-16))+16;
			mass3=Math.floor(Math.random()*(1+30-22))+22;
			massArray=[mass1,mass2,mass3];
			massArray.sort(function(){return Math.round(Math.random()) - 0.5;});
			position.sort(function(){return Math.round(Math.random()) - 0.5;});
			item1=type[position[0]];
			item2=type[position[1]];
			item3=type[position[2]];
			weigh1=massArray[position[0]];
			weigh2=massArray[position[1]];
			weigh3=massArray[position[2]];
			wArray=[weigh1,weigh2,weigh3];
			wArray.sort(function(a,b){return a - b});
			oz1=weigh1;
			oz2=weigh2;
			oz3=weigh2+weigh3;
			acak=Math.floor(Math.random()*10);
			if(acak<=3)
			{	
				posX1=120;
				posY1=240;
				posX2=370;
				posY2=240;
				posX3=620;
				posY3=240;	
			}
			else if(acak>=7)
			{	
				posX2=120;
				posY2=240;
				posX1=370;
				posY1=240;
				posX3=620;
				posY3=240;	
			}	
			else
			{
				posX2=120;
				posY2=240;
				posX3=370;
				posY3=240;
				posX1=620;
				posY1=240;	
			}
		}
		else if(spin==3)
		{
			mass1=Math.floor(Math.random()*(1+15-10))+10;
			mass2=Math.floor(Math.random()*(1+21-16))+16;
			mass3=Math.floor(Math.random()*(1+30-22))+22;
			massArray=[mass1,mass2,mass3];
			massArray.sort(function(){return Math.round(Math.random()) - 0.5;});
			position.sort(function(){return Math.round(Math.random()) - 0.5;});
			item1=type[position[0]];
			item2=type[position[1]];
			item3=type[position[2]];
			weigh1=massArray[position[0]];
			weigh2=massArray[position[1]];
			weigh3=massArray[position[2]];
			wArray=[weigh1,weigh2,weigh3];
			wArray.sort(function(a,b){return a - b});
			oz1=weigh1+weigh2;
			oz2=weigh2;
			oz3=weigh2+weigh3;
			acak=Math.floor(Math.random()*10);
			if(acak<=3)
			{	
				posX1=120;
				posY1=240;
				posX2=370;
				posY2=240;
				posX3=620;
				posY3=240;	
			}
			else if(acak>=7)
			{	
				posX2=120;
				posY2=240;
				posX1=370;
				posY1=240;
				posX3=620;
				posY3=240;	
			}	
			else
			{
				posX2=120;
				posY2=240;
				posX3=370;
				posY3=240;
				posX1=620;
				posY1=240;	
			}
		}
		else if(spin==4)
		{
			mass1=Math.floor(Math.random()*(1+15-10))+10;
			mass2=Math.floor(Math.random()*(1+21-16))+16;
			mass3=Math.floor(Math.random()*(1+30-22))+22;
			massArray=[mass1,mass2,mass3];
			massArray.sort(function(){return Math.round(Math.random()) - 0.5;});
			position.sort(function(){return Math.round(Math.random()) - 0.5;});
			item1=type[position[0]];
			item2=type[position[1]];
			item3=type[position[2]];
			weigh1=massArray[position[0]];
			weigh2=massArray[position[1]];
			weigh3=massArray[position[2]];
			wArray=[weigh1,weigh2,weigh3];
			wArray.sort(function(a,b){return a - b});
			oz1=weigh1+weigh2;
			oz2=weigh2;
			oz3=weigh1+weigh3;
			acak=Math.floor(Math.random()*10);
			if(acak<=3)
			{	
				posX1=120;
				posY1=240;
				posX2=370;
				posY2=240;
				posX3=620;
				posY3=240;	
			}
			else if(acak>=7)
			{	
				posX2=120;
				posY2=240;
				posX1=370;
				posY1=240;
				posX3=620;
				posY3=240;	
			}	
			else
			{
				posX2=120;
				posY2=240;
				posX3=370;
				posY3=240;
				posX1=620;
				posY1=240;	
			}
		}
		else if(spin==5)
		{
			mass1=Math.floor(Math.random()*(1+15-10))+10;
			mass2=Math.floor(Math.random()*(1+30-18))+18;
			mass3=Math.floor(Math.random()*(1+38-32))+32;
			massArray=[mass1,mass2,mass3];
			massArray.sort(function(){return Math.round(Math.random()) - 0.5;});
			position.sort(function(){return Math.round(Math.random()) - 0.5;});
			item1=type[position[0]];
			item2=type[position[1]];
			item3=type[position[2]];
			weigh1=massArray[position[0]];
			weigh2=massArray[position[1]];
			weigh3=massArray[position[2]];
			wArray=[weigh1,weigh2,weigh3];
			wArray.sort(function(a,b){return a - b});
			oz1=weigh1+weigh1;
			oz2=weigh1+weigh2;
			oz3=weigh1+weigh3;
			acak=Math.floor(Math.random()*10);
			if(acak<=3)
			{	
				posX1=120;
				posY1=240;
				posX2=370;
				posY2=240;
				posX3=620;
				posY3=240;	
			}
			else if(acak>=7)
			{	
				posX2=120;
				posY2=240;
				posX1=370;
				posY1=240;
				posX3=620;
				posY3=240;	
			}	
			else
			{
				posX2=120;
				posY2=240;
				posX3=370;
				posY3=240;
				posX1=620;
				posY1=240;	
			}
		}
		else if(spin==6)
		{
			mass1=Math.floor(Math.random()*(1+15-10))+10;
			mass2=Math.floor(Math.random()*(1+30-18))+18;
			mass3=Math.floor(Math.random()*(1+38-32))+32;
			massArray=[mass1,mass2,mass3];
			massArray.sort(function(){return Math.round(Math.random()) - 0.5;});
			position.sort(function(){return Math.round(Math.random()) - 0.5;});
			item1=type[position[0]];
			item2=type[position[1]];
			item3=type[position[2]];
			weigh1=massArray[position[0]];
			weigh2=massArray[position[1]];
			weigh3=massArray[position[2]];
			wArray=[weigh1,weigh2,weigh3];
			wArray.sort(function(a,b){return a - b});
			oz1=weigh1+weigh1;
			oz2=weigh2+weigh3;
			oz3=weigh1+weigh3;
			acak=Math.floor(Math.random()*10);
			if(acak<=3)
			{	
				posX1=120;
				posY1=240;
				posX2=370;
				posY2=240;
				posX3=620;
				posY3=240;	
			}
			else if(acak>=7)
			{	
				posX2=120;
				posY2=240;
				posX1=370;
				posY1=240;
				posX3=620;
				posY3=240;	
			}	
			else
			{
				posX2=120;
				posY2=240;
				posX3=370;
				posY3=240;
				posX1=620;
				posY1=240;	
			}
		}
		else if(spin==7)
		{
			mass1=Math.floor(Math.random()*(1+15-10))+10;
			mass2=Math.floor(Math.random()*(1+31-16))+16;
			mass3=Math.floor(Math.random()*(1+38-32))+32;
			massArray=[mass1,mass2,mass3];
			massArray.sort(function(){return Math.round(Math.random()) - 0.5;});
			position.sort(function(){return Math.round(Math.random()) - 0.5;});
			item1=type[position[0]];
			item2=type[position[1]];
			item3=type[position[2]];
			weigh1=massArray[position[0]];
			weigh2=massArray[position[1]];
			weigh3=massArray[position[2]];
			wArray=[weigh1,weigh2,weigh3];
			wArray.sort(function(a,b){return a - b});
			oz1=weigh1+weigh2;
			oz2=weigh1+weigh3;
			oz3=weigh2+weigh3;
			acak=Math.floor(Math.random()*10);
			if(acak<=3)
			{	
				posX1=120;
				posY1=240;
				posX2=370;
				posY2=240;
				posX3=620;
				posY3=240;	
			}
			else if(acak>=7)
			{	
				posX2=120;
				posY2=240;
				posX1=370;
				posY1=240;
				posX3=620;
				posY3=240;	
			}	
			else
			{
				posX2=120;
				posY2=240;
				posX3=370;
				posY3=240;
				posX1=620;
				posY1=240;	
			}
		}
	}
	function tool()
	{
		ctx.beginPath();
		ctx.drawImage(scaler,posX-120,posY-136);
		ctx.arc(posX, posY, radius-72, 0, 2 * Math.PI, false);
		ctx.fillStyle = "#cc0000";
		ctx.fill();		
		ctx.closePath();
		ctx.restore();		
		ctx.translate(posX, posY);		
		ctx.lineWidth = 3; 		
		ctx.beginPath();
		angle = (Math.PI/40*oz);
		lineX = Math.sin(angle)*(radius);
		lineY = -Math.cos(angle)*(radius);
		ctx.moveTo(0,0);
		ctx.lineTo(lineX,lineY);
		ctx.strokeStyle = '#cc0000';
		ctx.stroke();   
		ctx.closePath();  				
		ctx.translate(-posX,-posY); 
	}
	function tool1()
	{
		if(spin==0)
		{
			ctx.drawImage(fruit,item1*100,itemY1*100,100,100,posX1-50,posY1-200,100,100);
		}
		else if(spin==1)
		{
			ctx.drawImage(fruit,item1*100,itemY1*100,100,100,posX1-100,posY1-200,100,100);
			ctx.drawImage(fruit,item3*100,itemY3*100,100,100,posX1,posY1-200,100,100);
		}
		else if(spin==2)
		{
			ctx.drawImage(fruit,item1*100,itemY1*100,100,100,posX1-50,posY1-200,100,100);
		}
		else if(spin==3 || spin==4)
		{
			ctx.drawImage(fruit,item1*100,itemY1*100,100,100,posX1-100,posY1-200,100,100);
			ctx.drawImage(fruit,item2*100,itemY2*100,100,100,posX1,posY1-200,100,100);
		}
		else if(spin==5 || spin==6)
		{
			ctx.drawImage(fruit,item1*100,itemY1*100,100,100,posX1-100,posY1-200,100,100);
			ctx.drawImage(fruit,item1*100,itemY1*100,100,100,posX1,posY1-200,100,100);
		}
		else if(spin==7)
		{
			ctx.drawImage(fruit,item1*100,itemY1*100,100,100,posX1-100,posY1-200,100,100);
			ctx.drawImage(fruit,item2*100,itemY2*100,100,100,posX1,posY1-200,100,100);
		}
		ctx.beginPath();
		ctx.drawImage(scaler,0,0,240,272,posX1-90,posY1-102,180,204);
		ctx.arc(posX1, posY1, radius-72, 0, 2 * Math.PI, false);
		ctx.fillStyle = "#cc0000";
		ctx.fill();		
		ctx.closePath();
		ctx.restore();		
		ctx.translate(posX1, posY1);		
		ctx.lineWidth = 3; 		
		ctx.beginPath();
		angle = (Math.PI/40*oz1);
		lineX = Math.sin(angle)*(radius-10);
		lineY = -Math.cos(angle)*(radius-10);
		ctx.moveTo(0,0);
		ctx.lineTo(lineX,lineY);
		ctx.strokeStyle = '#cc0000';
		ctx.stroke();   
		ctx.closePath();  				
		ctx.translate(-posX1,-posY1); 
	}
	function tool2()
	{
		if(spin<=4)
		{
			ctx.drawImage(fruit,item2*100,itemY2*100,100,100,posX2-50,posY2-200,100,100);
		}
		else if(spin==5)
		{
			ctx.drawImage(fruit,item1*100,itemY1*100,100,100,posX2-100,posY2-200,100,100);
			ctx.drawImage(fruit,item2*100,itemY2*100,100,100,posX2,posY2-200,100,100);
		}
		else if(spin==6)
		{
			ctx.drawImage(fruit,item2*100,itemY2*100,100,100,posX2-100,posY2-200,100,100);
			ctx.drawImage(fruit,item3*100,itemY3*100,100,100,posX2,posY2-200,100,100);
		}
		else if(spin==7)
		{
			ctx.drawImage(fruit,item1*100,itemY1*100,100,100,posX2-100,posY2-200,100,100);
			ctx.drawImage(fruit,item3*100,itemY3*100,100,100,posX2,posY2-200,100,100);
		}
		ctx.beginPath();
		ctx.drawImage(scaler,0,0,240,272,posX2-90,posY2-102,180,204);
		ctx.arc(posX2, posY2, radius-72, 0, 2 * Math.PI, false);
		ctx.fillStyle = "#cc0000";
		ctx.fill();		
		ctx.closePath();
		ctx.restore();		
		ctx.translate(posX2, posY2);		
		ctx.lineWidth = 3; 		
		ctx.beginPath();
		angle = (Math.PI/40*oz2);
		lineX = Math.sin(angle)*(radius-10);
		lineY = -Math.cos(angle)*(radius-10);
		ctx.moveTo(0,0);
		ctx.lineTo(lineX,lineY);
		ctx.strokeStyle = '#cc0000';
		ctx.stroke();   
		ctx.closePath();  				
		ctx.translate(-posX2,-posY2); 
	}
	function tool3()
	{
		if(spin<=1)
		{
			ctx.drawImage(fruit,item3*100,itemY3*100,100,100,posX3-50,posY3-200,100,100);
		}
		else if(spin==2)
		{
			ctx.drawImage(fruit,item2*100,itemY2*100,100,100,posX3-100,posY3-200,100,100);
			ctx.drawImage(fruit,item3*100,itemY3*100,100,100,posX3,posY3-200,100,100);
		}
		else if(spin==3)
		{
			ctx.drawImage(fruit,item2*100,itemY2*100,100,100,posX3-100,posY3-200,100,100);
			ctx.drawImage(fruit,item3*100,itemY3*100,100,100,posX3,posY3-200,100,100);
		}
		else if(spin>=4 && spin<=6)
		{
			ctx.drawImage(fruit,item1*100,itemY1*100,100,100,posX3-100,posY3-200,100,100);
			ctx.drawImage(fruit,item3*100,itemY3*100,100,100,posX3,posY3-200,100,100);
		}
		else if(spin==7)
		{
			ctx.drawImage(fruit,item2*100,itemY2*100,100,100,posX3-100,posY3-200,100,100);
			ctx.drawImage(fruit,item3*100,itemY3*100,100,100,posX3,posY3-200,100,100);
		}
		ctx.beginPath();
		ctx.drawImage(scaler,0,0,240,272,posX3-90,posY3-102,180,204);
		ctx.arc(posX3, posY3, radius-72, 0, 2 * Math.PI, false);
		ctx.fillStyle = "#cc0000";
		ctx.fill();		
		ctx.closePath();
		ctx.restore();		
		ctx.translate(posX3, posY3);		
		ctx.lineWidth = 3; 		
		ctx.beginPath();
		angle = (Math.PI/40*oz3);
		lineX = Math.sin(angle)*(radius-10);
		lineY = -Math.cos(angle)*(radius-10);
		ctx.moveTo(0,0);
		ctx.lineTo(lineX,lineY);
		ctx.strokeStyle = '#cc0000';
		ctx.stroke();   
		ctx.closePath();  				
		ctx.translate(-posX3,-posY3); 
	}
	
//==============================================PAGES==========================================//	
//*********************************************************************************************//
	var startGame = function()
	{
		posX=360;
		posY=290;
		radius=80;
		rasio=window.innerHeight/window.innerWidth;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.fillStyle = "#fff";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		if(rasio>=1)
		{ 
			ctx.drawImage(rotasi,0,0);
			return
		}		
		ctx.drawImage(bg, 0, 0);	
		tool();		
		ctx.drawImage(fruit,0,0,100,100,30,50,100,100);
		ctx.drawImage(fruit,1*100,0,100,100,130,150,100,100);
		ctx.drawImage(fruit,2*100,0,100,100,30,250,100,100);	
		ctx.drawImage(fruit,100,100,100,100,570,50,100,100);
		ctx.drawImage(fruit,1*100,200,100,100,470,150,100,100);
		ctx.drawImage(fruit,2*100,200,100,100,570,250,100,100);						
		ctx.textAlign = 'center';      
		ctx.fillStyle = "#04ae3c";
        ctx.font = "82px 'Changa One'";
		ctx.textAlign = 'center';
		ctx.lineWidth=6;
		ctx.strokeStyle="#000";
		ctx.fillText("WEIGHING", 360, 70); 
		ctx.strokeText("WEIGHING", 360, 70);
		ctx.fillText("FRUITS", 360, 150); 
		ctx.strokeText("FRUITS", 360, 150);
		ctx.lineWidth=2;
		ctx.strokeStyle="#fff";
		ctx.strokeText("WEIGHING", 360, 70);
		ctx.strokeText("FRUITS", 360, 150);
		ctx.fillStyle = "#ffffff";
        ctx.font = "52px 'KGSC Solid'";
		ctx.textAlign = 'center';
		ctx.lineWidth=3;
		ctx.strokeStyle="#000";
		ctx.fillText("PLAY", 610, 430); 
		ctx.strokeText("PLAY", 610, 430);
		ctx.fillText("RULES", 120, 430); 
		ctx.strokeText("RULES", 120, 430);
		splash();		
	}
	var howto = function()
	{
		posX=360;
		posY=290;
		radius=80;		
		rasio=window.innerHeight/window.innerWidth;
		ctx.clearRect(0,0,720,480);
		ctx.fillStyle = "#fff";
		ctx.fillRect(0,0,720,480);
		if(rasio>=1)
		{ 
			ctx.drawImage(rotasi,0,0);
			return
		}
		ctx.drawImage(bg, 0, 0);	
		tool();		
		ctx.drawImage(fruit,0,0,100,100,30,50,100,100);
		ctx.drawImage(fruit,1*100,0,100,100,130,150,100,100);
		ctx.drawImage(fruit,2*100,0,100,100,30,250,100,100);	
		ctx.drawImage(fruit,100,100,100,100,570,50,100,100);
		ctx.drawImage(fruit,1*100,200,100,100,470,150,100,100);
		ctx.drawImage(fruit,2*100,200,100,100,570,250,100,100);		
		ctx.drawImage(rules, 176, 15);	
		ctx.fillStyle = "#fff";
        ctx.font = "52px 'KGSC Solid'";
		ctx.textAlign = 'center';
		ctx.lineWidth=3;
		ctx.strokeStyle="#000";
		ctx.fillText("PLAY", 610, 430); 
		ctx.strokeText("PLAY", 610, 430);
		ctx.fillText("BACK", 120, 430); 
		ctx.strokeText("BACK", 120, 430);	
		splash();	
	}
	var playGame = function()
	{
		ctx.clearRect(0,0,720,480);
		ctx.fillStyle="#fff";
		ctx.fillRect(0,0,720,480);
		if(rasio>=1)
		{ 
			ctx.drawImage(rotasi,0,0);
			return
		}
		ctx.drawImage(bg, 0, 0);	
		ctx.drawImage(fruit,item1*100,itemY1*100,100,100,270+a1,360+a1,100-a2,100-a2);
		ctx.drawImage(fruit,item2*100,itemY2*100,100,100,420+b1,360+b1,100-b2,100-b2);		
		ctx.drawImage(fruit,item3*100,itemY3*100,100,100,570+c1,360+c1,100-c2,100-c2);		
		ctx.textAlign = 'center';      
		ctx.fillStyle = "#ffffff";
        ctx.strokeStyle="#000000";		
		ctx.font = "36px 'Changa One'";
		ctx.lineWidth=1;
		ctx.fillText("LEVEL "+currentLevel, 360, 30);
		ctx.strokeText("LEVEL "+currentLevel, 360, 30);
		ctx.lineWidth=2;
		ctx.font = "24px 'KGSC Solid'";
		ctx.fillText("Which fruit weighs", 140, 400);
		ctx.strokeText("Which fruit weighs", 140, 400);
		ctx.font = "24px 'KGSC Solid'";
		ctx.fillText("the most?", 140, 440);
		ctx.strokeText("the most?", 140, 440);
		tool1();
		tool2();
		tool3();
		timer();
		ctx.save();
		ctx.globalAlpha=layerY;
		ctx.drawImage(layar,0,0,720,480,0,0,720,480);
		if(state=='clear')
		{
			ctx.drawImage(next,0,0,125,125,310-t2,btnY-t2,125+t1,125+t1);
			animasi();
		}
		else if(state=='end')
		{
			ctx.drawImage(replay,0,0,125,125,310-t2,btnY-t2,125+t1,125+t1);
			animasi();
		}
		ctx.restore();
		ctx.fillStyle = "red";
        ctx.font = "64px 'KGSC Solid'";
		ctx.textAlign = 'center';
		ctx.lineWidth=4;
		ctx.strokeStyle="black";
		ctx.fillText(mainTxt, 360, 120); 
		ctx.strokeText(mainTxt, 360, 120);
		ctx.lineWidth=2;
		ctx.strokeStyle="#fff";
		ctx.strokeText(mainTxt, 360, 120);
		ctx.fillStyle = "#fff";
        ctx.font = "42px 'Changa One'";
		ctx.textAlign = 'center';
		ctx.lineWidth=2;
		ctx.strokeStyle="#000";
		ctx.fillText(subTxt1, 360, 190); 
		ctx.strokeText(subTxt1, 360, 190);
		ctx.fillText(subTxt2, 360, 240); 
		ctx.strokeText(subTxt2, 360, 240);	
	}
	function timer()
	{
		ms+=add;
		if(ms%100==0)
		{
			detik+=add;			
		}
		if(state=='play')
		{
			if(ms%intervalTime==0)
			{
				speed+=speedTime;			
			}
			times=720-speed;
		}	
		ctx.beginPath();
		ctx.fillStyle="#FF0000";
		ctx.fillRect(0,460,times,13);
		ctx.closePath();
		if(times<=0)
		{
			times=0;
			add=0;
			fail();
		}
	}
	function checkLevel()
	{
		//comLevel = parseInt(currentLevel);
		state='clear';
		sndUp.play();
		layerY=1;
		a1=0;
		a2=0;
		laju=0.1;
		mainTxt="YOU'RE RIGHT!";
		if(currentLevel>=10)
		{
			btnY=280;
			subTxt1="SPEED INCREASED!";
			subTxt2="";
		}
		else
		{
			btnY=180;
			subTxt1="";
			subTxt2="";
		}			
	}
	function readLevel()
	{
		btnY=280;
		if(highLevel!==null)
		{
			if(currentLevel>highLevel)
			{
				subTxt1="NEW HIGHEST LEVEL REACHED!"
				subTxt2="You reached level "+currentLevel;
				highLevel=currentLevel;
				if(window.localStorage)
				{
					localStorage.setItem('levels', highLevel);	
				}				
			}
			else
			{
				subTxt1="You reached level "+currentLevel;
				subTxt2="Highest level reached is "+highLevel;
			}
		}
		else
		{
			subTxt1="NEW HIGHEST LEVEL REACHED!";
			subTxt2="You reached level "+currentLevel;
			highLevel=currentLevel;
			if(window.localStorage)
			{
				localStorage.setItem('levels', highLevel);	
			}
		}
	}	
	function fail()
	{
		sndOver.play();
		state='end';		
		layerY=1;		
		if(times==0)
		{
			mainTxt="TIME'S UP";
			readLevel();
		}
		else
		{
			mainTxt="TRY AGAIN!";
			readLevel();
		}		
	}
	function animasi()
	{
		t1+=laju;
		t2=0.5*t1;
		if(t1>=6)
		{
			laju=-0.1;
			t1+=laju;
		}
		else if(t1<=0)
		{
			laju=0.1;
			t1+=laju;
		}
	}
	function popUp(pecahX,pecahY) 
	{
		var bub = new Object();
		bub.x=pecahX;
		bub.y=pecahY;
		bub.urut=0;
		popArray.push(bub);
	}
	function splash() 
	{
		for (p in popArray) 
		{
			popArray[p].urut+=1;
			ctx.drawImage(pop,0, yPop[popArray[p].urut]*200,200, 200, popArray[p].x, popArray[p].y, 150, 150);
			if(popArray[p].urut>=4)
			{
				popArray.splice(p, 1);
				p--;
				if(selected==1)
				{
					state='how';
					clearInterval(intervalId);
					intervalId=setInterval(howto,40);
					return
				}		
				else if(selected==2)
				{
					state='play';
					clicked=true;
					currentLevel=1;
					Reset();
					clearInterval(intervalId);
					intervalId=setInterval(playGame,10);
				}									
				else if(selected==3)
				{
					state='front';
					clearInterval(intervalId);
					intervalId=setInterval(startGame,40);
				}	
			}
		}
	}
//==================================================MOUSE============================================//
  	var checkDown = function(mouse_x, mouse_y)
	{	
		mouse_x -= parseFloat(canvas.style.marginLeft);
		mouse_y -= parseFloat(canvas.style.marginTop);
		mouse_x /= parseFloat(canvas.style.width) /720;
		mouse_y /= parseFloat(canvas.style.height)/480;
		if(state=='front')
		{
			mainGame=false;
			if(clicked && mouse_x>=20 && mouse_x<=220 && mouse_y>=390 && mouse_y<=450)
			{
				clicked=false;
				selected=1;
				sndPop.play();
				popUp(mouse_x-80,mouse_y-80);
			}
			if(clicked && mouse_x>=520 && mouse_x<=720 && mouse_y>=390 && mouse_y<=450)
			{
				clicked=false;
				selected=2;
				sndPop.play();
				popUp(mouse_x-80,mouse_y-80);				
			}
		}
		else if(state=='how')
		{
			if(mouse_x>=20 && mouse_x<=220 && mouse_y>=390 && mouse_y<=450)
			{
				selected=3;
				sndPop.play();
				popUp(mouse_x-80,mouse_y-80);
			}
			if(clicked && mouse_x>=520 && mouse_x<=720 && mouse_y>=390 && mouse_y<=450)
			{
				clicked=false;
				selected=2;
				sndPop.play();
				popUp(mouse_x-80,mouse_y-80);
			}			
		}
		else if(state=='play')
		{
			if(clicked && mouse_x>=270 && mouse_x<=370 && mouse_y>=360 && mouse_y<=460)
			{
				mainGame=true;
				sndPop.play();
				clicked=false;
				a1=5;
				a2=10;
				selected=1;			
			}
			if(clicked && mouse_x>=420 && mouse_x<=520 && mouse_y>=360 && mouse_y<=460)
			{
				mainGame=true;
				sndPop.play();				
				clicked=false;
				b1=5;
				b2=10;
				selected=2;				
			}
			if(clicked && mouse_x>=570 && mouse_x<=670 && mouse_y>=360 && mouse_y<=460)
			{
				mainGame=true;
				sndPop.play();
				clicked=false;
				c1=5;
				c2=10;
				selected=3;	
			}		
		}
		else if(state=='clear')
		{
			if(clicked && mouse_x>=100 && mouse_x<=500 && mouse_y>=btnY && mouse_y<=btnY+replay.height)
			{
				mainGame=false;
				sndPop.play();
				clicked=false;
				layerY=0;
				times=720;
				currentLevel+=1;
				Reset();
				state='play';
			}
		}
		else if(state=='end')
		{
			if(clicked && mouse_x>=100 && mouse_x<=500 && mouse_y>=btnY && mouse_y<=btnY+replay.height)
			{
				mainGame=false;
				sndPop.play();
				clicked=false;
				layerY=0;
				times=720;
				state='front';
				clearInterval(intervalId);
				intervalId=setInterval(startGame, 40); 
			}
		}
	}
	var endEvent = function(mouse_x, mouse_y)
	{	
		mouse_x -= parseFloat(canvas.style.marginLeft);
		mouse_y -= parseFloat(canvas.style.marginTop);
		mouse_x /= parseFloat(canvas.style.width) /720;
		mouse_y /= parseFloat(canvas.style.height)/480;	
		if(state=='play')
		{
			if(mainGame && selected==1)
			{
				if(weigh1==wArray[2])
				{
					sndUp.play();
					checkLevel();
				}
				else
				{
					fail();				
				}
				selected=0;
				a1=0;
				a2=0;
			}
			else if(mainGame && selected==2)
			{
				if(weigh2==wArray[2])
				{
					sndUp.play();
					checkLevel();
				}
				else
				{
					fail();				
				}				
				selected=0;
				b1=0;
				b2=0;
			}
			else if(mainGame && selected==3)
			{
				if(weigh3==wArray[2])
				{
					sndUp.play();
					checkLevel();
				}
				else
				{
					fail();				
				}				
				selected=0;
				c1=0;
				c2=0;	
			}
		}		
	}
//==================================================TOUCH============================================//
	var on_mouse_down = function(e) 
	{
		checkDown(e.pageX, e.pageY);
	}
	var on_mouse_up = function(e) 
	{
		clicked=true;
		endEvent(e.pageX, e.pageY);		
	}
	var startTouch = function(e)
	{
		e.preventDefault();
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        checkDown(touch.pageX, touch.pageY);	
    }
	var endTouch = function(e)
	{
        e.preventDefault();
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        clicked=true;	
		endEvent(touch.pageX, touch.pageY);		
    }	
}