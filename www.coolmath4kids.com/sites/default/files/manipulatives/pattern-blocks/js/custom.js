/* 
 * Custom Js file for the Sample Animation using Easeljs
 */
/* global createjs */

$ = jQuery;
var scrollPer;
$(function () {
  var stage = new createjs.Stage("workspace");
  var ctx = stage.canvas.getContext("2d");

  var container = new createjs.Container;
  var hexagon = new createjs.Container;
  var square = new createjs.Container;
  var trapezoid = new createjs.Container;
  var rhombus = new createjs.Container;
  var triangle = new createjs.Container;
  var shapex = new createjs.Container;
  var protractor = new createjs.Container;
  protractor.name = "protractorCont";
  var patternbutton = new createjs.Container;
  var patterntxt = new createjs.Container;
  var wrapper = new createjs.Container();
  var index = 0;
  var counterOpened = 0;
  // Array Decelarations
  var selectedShapes = new Array();
  var deselectedShapes = new Array();
  var selectedPuzzles = new Array();
  var bitmaps = new Array();

  //Global variables  
  var rotate = 0;
  var move = 0;
  var cm_width, cm_height;
  var label, shape, oldX, oldY, size, color, p, i, j;
  var penArray = new Array();
  var flag = false;
  var pen_color = "#3ecfe1";
  var y = "#000001";
  var pbImagePath = "/sites/default/files/manipulatives/pattern-blocks/images/pattern_blocks";
  //enable mouse events 
  stage.enableMouseOver(50);
  stage.enableDOMEvents(true);
  createjs.Touch.enable(stage);
  var canvas = document.getElementById('workspace');
  canvas.onselectstart = function () {
    return false;
  };

  //Bitmap Preload
  var bitmapArray = preload_bitmap(bitmaps);
  var patternbutton_image = bitmapArray['patternbutton'].image;
  var patternbutton_hover_image = bitmapArray['patternbutton_hover'].image;
  var patternbuttonicon = bitmapArray['patternbutton'];
  var protractorImage = bitmapArray['protractor'].image;
  var protractorHoverImage = bitmapArray['protractor_hover'].image;
  //Onload show a startup message and hide after 4 seconds
  var startUpMsg = bitmapArray["startUpMsg"];
  startUpMsg.name = "startmsg";
  startUpMsg.x = 352;
  startUpMsg.y = 100;
  stage.addChild(startUpMsg);
  //stage.update();

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", function () {
    stage.update();
    if ($("#overlayDivCounter").is(":visible")) {
      patterntxt.visible = false;
    } else {
      patterntxt.visible = true;
    }

  });

  //Setting dynamic width to canvas  
  stage.canvas.width = window.innerWidth;

  stage.canvas.height = 1100;
  if (window.innerHeight > 1100) {
    stage.canvas.height = window.innerHeight;
  }
  $(window).resize(function () {
    stage.canvas.width = window.innerWidth;
    if (window.innerHeight > 1100) {
      stage.canvas.height = window.innerHeight;
    } else {
      stage.canvas.height = 1100;
    }
    cm_width = stage.canvas.width;
    cm_height = stage.canvas.height;
  });
  cm_width = stage.canvas.width;
  cm_height = stage.canvas.height;

  setTopHeaderIcons();

  /**
   * set Top Header Icons
   */
  function setTopHeaderIcons() {
    //Draw left frame background
    background = new createjs.Shape;
    background.graphics.beginFill("#ffffff").drawRect(0, 0, 8000, 89);

    background.shadow = new createjs.Shadow('#DBDBDB', 3, 3, 3);
    container.addChild(background);

    //Draw top menu icons bitmap
    var cm4klink = bitmapArray['cm4klink'];
    cm4klink.x = 30;
    cm4klink.y = 15;
    cm4klink.cursor = 'pointer';
    cm4klink.on('click', function () {
      location.href = location.origin + '/manipulatives';
    });
    cm4klink.on("mouseover", function (evt) {
      var cm4klinkHoverimg = bitmapArray['cm4k_hover'];
      cm4klink.image = cm4klinkHoverimg.image;
    });
    cm4klink.on("mouseout", function (evt) {
      var cm4klinkHoverimg = bitmapArray['cm4klink2'];
      cm4klink.image = cm4klinkHoverimg.image;
    });
    container.addChild(cm4klink);

    //title
    var title = bitmapArray['title'];
    title.x = 31;
    title.y = 36;
    container.addChild(title);

    var separatorone = bitmapArray['divider1'];
    separatorone.x = 287;
    separatorone.y = 22;
    container.addChild(separatorone);

    //hexagon
    var hexagon_image = bitmapArray['hexagon'].image;
    var hexagon_hover_image = bitmapArray['hexagon_hover'].image;
    var hexagonicon = bitmapArray['hexagon'];
    hexagon.x = 321;
    hexagon.y = 20;
    hexagon.cursor = "pointer";
    hexagonicon.name = "hexagonicon";
    hexagon.addChild(hexagonicon);
    //hexagon.regX = hexagonicon.image.width/2;
    //hexagon.regY = hexagonicon.image.height/2;
    hexagon.on("mouseover", function (evt) {
      hexagonicon.image = hexagon_hover_image;
      hexagon.x = 318;
      hexagon.y = 17;
    });
    hexagon.on("mouseout", function (evt) {
      hexagonicon.image = hexagon_image;
      hexagon.x = 321;
      hexagon.y = 20;
    });
    container.addChild(hexagon);

    //square
    var square_image = bitmapArray['square'].image;
    var square_hover_image = bitmapArray['square_hover'].image;
    var squareicon = bitmapArray['square'];
    square.x = 403;
    square.y = 20;
    square.cursor = "pointer";
    squareicon.name = "squareicon";
    //square.regX =squareicon.image.width/2;
    //square.regY =squareicon.image.height/2;
    square.addChild(squareicon);
    square.on("mouseover", function (evt) {
      squareicon.image = square_hover_image;
      square.x = 400;
      square.y = 17;
    });
    square.on("mouseout", function (evt) {
      squareicon.image = square_image;
      square.x = 403;
      square.y = 20;
    });
    container.addChild(square);

    //trapezoidicon
    var trapezoid_image = bitmapArray['trapezoid'].image;
    var trapezoid_hover_image = bitmapArray['trapezoid_hover'].image;
    var trapezoidicon = bitmapArray['trapezoid'];
    trapezoid.x = 472;
    trapezoid.y = 21;
    trapezoid.cursor = "pointer";
    trapezoidicon.name = "trapezoidicon";
    //trapezoid.regX = trapezoidicon.image.width/2;
    //trapezoid.regY = trapezoidicon.image.height/2;
    trapezoid.addChild(trapezoidicon);
    trapezoid.on("mouseover", function (evt) {
      trapezoidicon.image = trapezoid_hover_image;
      trapezoid.x = 469;
      trapezoid.y = 18;
    });
    trapezoid.on("mouseout", function (evt) {
      trapezoidicon.image = trapezoid_image;
      trapezoid.x = 472;
      trapezoid.y = 21;
    });
    container.addChild(trapezoid);

    //rhombus
    var rhombus_image = bitmapArray['rhombus'].image;
    var rhombus_hover_image = bitmapArray['rhombus_hover'].image;
    var rhombusicon = bitmapArray['rhombus'];
    rhombus.x = 580;
    rhombus.y = 21;
    rhombus.cursor = "pointer";
    rhombusicon.name = "rhombusicon";
    rhombus.addChild(rhombusicon);
    //rhombus.regX = rhombusicon.image.width/2;
    //rhombus.regY = rhombusicon.image.height/2;
    rhombus.on("mouseover", function (evt) {
      rhombusicon.image = rhombus_hover_image;
      rhombus.x = 577;
      rhombus.y = 18;
    });
    rhombus.on("mouseout", function (evt) {
      rhombusicon.image = rhombus_image;
      rhombus.x = 580;
      rhombus.y = 21;
    });
    container.addChild(rhombus);

    //triangle
    var triangle_image = bitmapArray['triangle'].image;
    var triangle_hover_image = bitmapArray['triangle_hover'].image;
    var triangleicon = bitmapArray['triangle'];
    triangle.x = 668;
    triangle.y = 22;
    triangle.cursor = "pointer";
    triangleicon.name = "triangleicon";
    triangle.addChild(triangleicon);
    //triangle.regX = triangleicon.image.width/2;
    //triangle.regY = triangleicon.image.height/2;
    triangle.on("mouseover", function (evt) {
      triangleicon.image = triangle_hover_image;
      triangle.x = 665;
      triangle.y = 19;
    });
    triangle.on("mouseout", function (evt) {
      triangleicon.image = triangle_image;
      triangle.x = 668;
      triangle.y = 22;
    });
    container.addChild(triangle);

    //shapex
    var shapex_image = bitmapArray['shapex'].image;
    var shapex_hover_image = bitmapArray['shapex_hover'].image;
    var shapexicon = bitmapArray['shapex'];
    shapex.x = 729;
    shapex.y = 18;
    shapex.cursor = "pointer";
    shapexicon.name = "shapexicon";
    //shapex.regX = shapexicon.image.width/2;
    //shapex.regY = shapexicon.image.height/2;
    shapex.addChild(shapexicon);
    shapex.on("mouseover", function (evt) {
      shapexicon.image = shapex_hover_image;
      shapex.x = 725;
      shapex.y = 15;
    });
    shapex.on("mouseout", function (evt) {
      shapexicon.image = shapex_image;
      shapex.x = 729;
      shapex.y = 18;
    });
    container.addChild(shapex);

    //separator
    var separatortwo = bitmapArray['divider2'];
    separatortwo.x = 821;
    separatortwo.y = 22;
    container.addChild(separatortwo);

	//protractor
    var protractorIcon = bitmapArray['protractor'];
	protractor.x = 848;
    protractor.y = 15;
    protractor.cursor = "pointer";
    protractorIcon.name = "protractorIcon";
	protractor.addChild(protractorIcon);
	protractor.on("mouseover", function (evt) {
      protractorIcon.image = protractorHoverImage;
      protractor.x = 848;
      protractor.y = 11;
    });
    protractor.on("mouseout", function (evt) {
      if(protractor.hover == false){	
        protractorIcon.image = protractorImage;
        protractor.x = 848;
        protractor.y = 15;
      }
    });
	container.addChild(protractor);
	
	//separator
    var separatorthree = bitmapArray['divider3'];
    separatorthree.x = 950;
    separatorthree.y = 22;
    container.addChild(separatorthree);
	
    //patternbuttonicon
    patternbutton.x = 999;
    patternbutton.y = 16;
    patternbutton.cursor = "pointer";
    patternbuttonicon.name = "patternbuttonicon";
    //patternbutton.regX = patternbuttonicon.image.width/2;
    //patternbutton.regY = patternbuttonicon.image.height/2;    
    patternbutton.addChild(patternbuttonicon);
    patternbutton.on("mouseover", function (evt) {
      patternbuttonicon.image = patternbutton_hover_image;
      patternbuttonicon.cursor = "pointer";
      patternbutton.x = 995;
      patternbutton.y = 12;
    });
    patternbutton.on("mouseout", function (evt) {
      if (counterOpened == 0) {
        patternbuttonicon.image = patternbutton_image;
        patternbuttonicon.cursor = "pointer";
        patternbutton.x = 999;
        patternbutton.y = 16;
      }
    });
    container.addChild(patternbutton);

    var patternpuzzles_title = bitmapArray['pattern_puzzles_title'];
    patterntxt.x = 1013;
    patterntxt.y = 70;
    patterntxt.name = "patterntxt";
    patterntxt.addChild(patternpuzzles_title);
    container.addChild(patterntxt);
    //add container 
    stage.addChild(container);
    stage.update();
  }

  /**
   * remove TargetContainer
   */
  function removeTargetContainer(targetContainer) {
    stage.removeChild(targetContainer);
    stage.update();
  }

  /*clone objects on click starts here*/
  hexagon.on("click", function (evt) {
    var attr = [];
    attr.x = 5;
    attr.y = 28;
    addShape(evt, 'yellow', 'hexagon', attr);
  });
  square.on("click", function (evt) {
    var attr = [];
    attr.x = 20;
    attr.y = 34;
    addShape(evt, 'orange', 'square', attr);
  });
  trapezoid.on("click", function (evt) {
    var attr = [];
    attr.x = 5;
    attr.y = 55;
    addShape(evt, 'red', 'trapezoid', attr);
  });
  rhombus.on("click", function (evt) {
    var attr = [];
    attr.x = 10;
    attr.y = 55;
    addShape(evt, 'blue', 'rhombus', attr);
  });
  triangle.on("click", function (evt) {
    var attr = [];   
	attr.x = 12;
    attr.y = 40;	
    addShape(evt, 'green', 'triangle', attr);
  });
  shapex.on("click", function (evt) {
    var attr = [];
    attr.x = 25;
    attr.y = 30;
    addShape(evt, 'beige', 'shapex', attr);
  });
  /*clone objects on click ends here*/

  /*clone objects on mousedown + pressmove + pressup starts here*/
  var hexagonContainer = new createjs.Container;
  var squareContainer = new createjs.Container;
  var trapezoidContainer = new createjs.Container;
  var rhombusContainer = new createjs.Container;
  var triangleContainer = new createjs.Container;
  var shapexContainer = new createjs.Container;
  //hexagon
  hexagon.on("mousedown", function () {
    var tempicon = new createjs.Bitmap(pbImagePath + "/hexagon/hexagon.png");
    hexagon.on("pressmove", function (evt) {
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.cursor = 'pointer';
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      hexagonContainer.addChild(tempicon);
      stage.addChild(hexagonContainer);
    });
  });
  //square
  square.on("mousedown", function () {
    var tempicon = new createjs.Bitmap(pbImagePath + "/square/square.png");
    square.on("pressmove", function (evt) {
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.cursor = 'pointer';
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      squareContainer.addChild(tempicon);
      stage.addChild(squareContainer);
    });
  });
  //trapezoid
  trapezoid.on("mousedown", function () {
    var tempicon = new createjs.Bitmap(pbImagePath + "/trapezoid/trapezoid.png");
    trapezoid.on("pressmove", function (evt) {
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.cursor = 'pointer';
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      trapezoidContainer.addChild(tempicon);
      stage.addChild(trapezoidContainer);
    });
  });
  //rhombus
  rhombus.on("mousedown", function () {
    var tempicon = new createjs.Bitmap(pbImagePath + "/rhombus/rhombus.png");
    rhombus.on("pressmove", function (evt) {
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.cursor = 'pointer';
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      rhombusContainer.addChild(tempicon);
      stage.addChild(rhombusContainer);
    });
  });
  //triangle
  triangle.on("mousedown", function () {
    var tempicon = new createjs.Bitmap(pbImagePath + "/triangle/triangle.png");
    triangle.on("pressmove", function (evt) {
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.cursor = 'pointer';
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      triangleContainer.addChild(tempicon);
      stage.addChild(triangleContainer);
    });
  });
  //shapex
  shapex.on("mousedown", function () {
    var tempicon = new createjs.Bitmap(pbImagePath + "/shapex/shapex.png");
    shapex.on("pressmove", function (evt) {
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.cursor = 'pointer';
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      shapexContainer.addChild(tempicon);
      stage.addChild(shapexContainer);
    });
  });
  //shapes pressup actions
  hexagon.removeAllEventListeners('pressup');
  hexagon.on("pressup", function (evt) {
    if (evt.stageY > 110) {
      color = 'yellow';
      var attr = [];
      attr.x = 5;
      attr.y = 28;
      addShape(evt, color, "hexagon", attr);
    }
    removeTargetContainer(hexagonContainer);
  });
  square.removeAllEventListeners('pressup');
  square.on("pressup", function (evt) {
    if (evt.stageY > 110) {
      color = 'orange';
      var attr = [];
      attr.x = 20;
      attr.y = 32;
      addShape(evt, color, "square", attr);
    }
    removeTargetContainer(squareContainer);
  });
  trapezoid.removeAllEventListeners('pressup');
  trapezoid.on("pressup", function (evt) {
    if (evt.stageY > 110) {
      color = 'red';
      var attr = [];
      attr.x = 5;
      attr.y = 55;
      addShape(evt, color, "trapezoid", attr);
    }
    removeTargetContainer(trapezoidContainer);
  });
  rhombus.removeAllEventListeners('pressup');
  rhombus.on("pressup", function (evt) {
    if (evt.stageY > 110) {
      color = 'blue';
      var attr = [];
      attr.x = 10;
      attr.y = 55;
      addShape(evt, color, "rhombus", attr);
    }
    removeTargetContainer(rhombusContainer);
  });
  triangle.removeAllEventListeners('pressup');
  triangle.on("pressup", function (evt) {
    if (evt.stageY > 110) {
      color = 'green';
      var attr = [];
      attr.x = 12;
      attr.y = 40;
      addShape(evt, color, "triangle", attr);
    }
    removeTargetContainer(triangleContainer);
  });
  shapex.removeAllEventListeners('pressup');
  shapex.on("pressup", function (evt) {
    if (evt.stageY > 110) {
      color = 'beige';
      var attr = [];
      attr.x = 25;
      attr.y = 30;
      addShape(evt, color, "shapex", attr);
    }
    removeTargetContainer(shapexContainer);
  });
  /*clone objects on  + pressmove + pressup ends here*/

//Code for Protractor starts here
  //$("#protractor").on("click", handleProtractor);
  protractor.on('click',function(){
    handleProtractor();
	//protractorIcon.image = "";
	if(protractor.hover == false){
	  protractor.hover = true;
	}else{
      protractor.hover = false;
	}	
  });
  protractor.clicked = false;
  protractor.hover = false;
  /**
   * To create protractor shape
   */
  var protractorCont;
  function handleProtractor() {
    //console.log(protractor.clicked);
    if (protractor.clicked == false) {
      var pro_circle = new createjs.Shape();
      var pro_circle2 = new createjs.Shape();
      pro_circle.name = "protractor_circle";
      pro_circle2.name = "protractor_circle2";
      protractorCont = new createjs.Container();
      var circleCont = new createjs.Container();
	  circleCont.cursor = "pointer";
	  var rotateTextCont = new createjs.Container();
      rotateTextCont.name = "rotateTextCont";
      var angleArc = new createjs.Shape();
      var angleRectangle = new createjs.Shape();
      angleArc.name = "angleArc";
      var radius = 200;
      var width = 40,
      actual_radius = radius - width / 2,
      tick_start = radius - 40;

      //Code for Rotate Arm
	  var rotateCont = new createjs.Container();
      var rotateArm = new createjs.Shape();
      rotateArm.graphics.setStrokeStyle(5, "round").beginStroke("#5280f1").moveTo(0, 0).lineTo(radius + 40, 0).endStroke();
	  var rotateIcon = new createjs.Bitmap(pbImagePath + '/rotate.png');
      rotateIcon.x = radius + 40;
      rotateIcon.y = 0;
      rotateIcon.regY = 15;
      rotateIcon.regX = 15;
      rotateIcon.cursor = "pointer";
	  rotateCont.addChild(rotateArm, rotateIcon);
	  
	  //Code for Resize Arm
	  var resizeCont = new createjs.Container();
      var resizeArm = new createjs.Shape();
	  resizeArm.graphics.setStrokeStyle(5, "round").beginStroke("#5280f1").moveTo(0, 0).lineTo(0, -(radius + 40)).endStroke();
      var resizeIcon = new createjs.Bitmap(pbImagePath + '/resize.png');
      resizeIcon.x = 0;
      resizeIcon.y = -(radius + 40);
      resizeIcon.regY = 32;
      resizeIcon.regX = 32;
      resizeIcon.cursor = "pointer";
      resizeCont.addChild(resizeArm, resizeIcon);

      protractorCont.addChild(rotateCont, resizeCont);
      stage.addChild(protractorCont);
      stage.update();

      anglecheck = (Math.atan2(rotateIcon.x - resizeIcon.x, rotateIcon.y - resizeIcon.y) * 180 / Math.PI);
      var startAngle = 0 * Math.PI / 180;
      var endAngle = 360 * Math.PI / 180;
      anglecheck = -(2 * anglecheck) * Math.PI / 180;
      pro_circle.graphics.setStrokeStyle(width).beginStroke("#9eaff9");
      pro_circle.graphics.arc(0, 0, actual_radius, anglecheck, startAngle).endStroke();
      
      pro_circle2.graphics.setStrokeStyle(width).beginStroke("#e2eaf6");
      pro_circle2.graphics.arc(0, 0, actual_radius, anglecheck, endAngle).endStroke();

      angleArc.graphics.setStrokeStyle(5, 'round').beginStroke("#5280f1");
      angleArc.graphics.arc(0, 0, actual_radius / 6, anglecheck, startAngle).endStroke();

      resizeIcon.angle = (Math.atan2(rotateIcon.x - resizeIcon.x, rotateIcon.y - resizeIcon.y) * 180 / Math.PI);
      resizeIcon.angle *= 2;

	  var showAngle = new createjs.Text(resizeIcon.angle + "\u00B0", "bold 18px Helvetica ", "#5280f1");
      showAngle.name = "showAngle";
      showAngle.x = actual_radius / 4 - 10;
      showAngle.y = -actual_radius / 4 - 10;
	  var angleRectangleImage = new createjs.Bitmap(pbImagePath+'/rounded_rect.png');
	  angleRectangleImage.x = showAngle.x - 10;
	  angleRectangleImage.y = showAngle.y;
	
	  rotateTextCont.x = 50;
	  rotateTextCont.y = -60;
	  rotateTextCont.regX = 50;
	  rotateTextCont.regY = -50;
	  rotateTextCont.addChild(angleRectangleImage,showAngle);
	  circleCont.addChild(pro_circle2, pro_circle,angleArc,rotateTextCont);
      stage.update();

      for (var h = 5; h <= 360; h += 5) {
        f = Math.cos((Math.PI / 180) * h);
        g = Math.sin((Math.PI / 180) * h);
        pro_circle.graphics.setStrokeStyle(2).beginStroke("white");
        pro_circle.graphics.moveTo(f * tick_start, g * tick_start).lineTo(f * (tick_start + 10), g * (tick_start + 10)).
                moveTo(f * (radius - 10), g * (radius - 10)).lineTo(f * radius, g * radius);
        pro_circle2.graphics.setStrokeStyle(2).beginStroke("white");
        pro_circle2.graphics.moveTo(f * tick_start, g * tick_start).lineTo(f * (tick_start + 10), g * (tick_start + 10)).
                moveTo(f * (radius - 10), g * (radius - 10)).lineTo(f * radius, g * radius);

      }

      for (var h = 0; h < 360; h += 10) {
        var multiplier = h;
        if (h < 100) {
          multiplier += 2;
        } else {
          multiplier += 2.5;
        }

        f = Math.cos((Math.PI / 180) * h);
        g = Math.sin(-(Math.PI / 180) * h);
        pro_circle.graphics.setStrokeStyle(2).beginStroke("white");
        pro_circle.graphics.moveTo(f * tick_start, g * tick_start).lineTo(f * (tick_start + 15), g * (tick_start + 15)).
                moveTo(f * (radius - 15), g * (radius - 15)).lineTo(f * radius, g * radius).endStroke();
        pro_circle2.graphics.setStrokeStyle(2).beginStroke("white");
        pro_circle2.graphics.moveTo(f * tick_start, g * tick_start).lineTo(f * (tick_start + 15), g * (tick_start + 15)).
                moveTo(f * (radius - 15), g * (radius - 15)).lineTo(f * radius, g * radius).endStroke();

        var text = new createjs.Text(h, "12px Helvetica ", "#3046da");
        f = Math.cos((Math.PI / 180) * multiplier);
        g = Math.sin(-(Math.PI / 180) * multiplier);

        text.x = (f * (radius - 15));
        text.y = (g * (radius - 15));
        text.type = "numbers";
        text.rotation += (90 - h);
        circleCont.addChild(text);
		text.on('pressmove', function (e) {
			var posX = e.stageX;
			var posY = e.stageY;
			protractorCont.x = posX + protractorCont.offset.x;
			protractorCont.y = posY + protractorCont.offset.y;
      //protractor_drag_regions(protractorCont, e);
		});

      }

      protractorCont.x = 800;
      protractorCont.y = 450;
      protractorCont.addChild(circleCont);

      //Pressmove of rotate arm
      var oldX, oldY, oldRotateIconX, oldRotateIconY;
      rotateIcon.on('mousedown', function (e) {
        oldX = e.stageX;
        oldY = e.stageY;
        //console.log("befor" + rotateIcon.x);
        oldRotateIconX = rotateIcon.x;
        oldRotateIconY = rotateIcon.y;
      });

      rotateIcon.on('pressmove', function (e) {
        var a, b;
        var angle = Math.atan2(stage.mouseY - protractorCont.y, stage.mouseX - protractorCont.x);
        angle = (angle * (180 / Math.PI)) - 90;
        if (angle < 0) {
          angle = 360 - (-angle);
        }
        protractorCont.rotation = 90 + angle;
			rotateTextCont.x = 50;
			rotateTextCont.y = -70;
			rotateTextCont.regX = 40;
			rotateTextCont.regY = -66;
			rotateTextCont.rotation = - protractorCont.rotation;
      });


      // Pressmove of resizeIcon arm 
      resizeIcon.on('mousedown', function (e) {
        var a = e.stageX - protractorCont.x,
                b = e.stageY - protractorCont.y;
        var newX = resizeIcon.x;
        var newY = resizeIcon.y;
        this.offset = {
          x: newX - a,
          y: newY - b
        };
      });

      resizeIcon.on('pressmove', function(evt) {
	        var a = evt.stageX - protractorCont.x,
	            b = evt.stageY - protractorCont.y,
	            c = a + this.offset.x,
	            d = b + this.offset.y;
	        var oldX = resizeIcon.x;
	        var oldY = resizeIcon.y;
	        var offset_x = resizeIcon.x - oldX;
	        var offset_y = resizeIcon.y - oldY;
	        //radius = Math.sqrt(resizeIcon.x * resizeIcon.x + resizeIcon.y * resizeIcon.y) - 40;
			//console.log(radius);
			
			var angle = Math.atan2(stage.mouseY - protractorCont.y, stage.mouseX - protractorCont.x);
	        angle = (angle * (180 / Math.PI)) - 90;
	        
	        if (angle < 0) {
	            angle = 360 - (-angle);
	        }
	        //console.log('before--'+resizeCont.rotation);
	        resizeCont.rotation = 180 + angle - protractorCont.rotation;
			//console.log('after--'+resizeCont.rotation);
			radius = 200;
			actual_radius = radius - width / 2;
			
			
					
			var xtext = a;
			var ytext = b;
			resizeIcon.angle = (Math.atan2(rotateIcon.x - xtext, rotateIcon.y - ytext) * 180 / Math.PI);
			resizeIcon.angle *= 2;
			for (var h = 0; h < 360; h++) {
				var mul = h;
				if (h < 100) {
				  mul += 2;
				} else {
				  mul += 2.5;
				}
				var text = new createjs.Text(h, "0px Helvetica ", "#3046da");
				f = Math.cos((Math.PI / 180) * mul);
				g = Math.sin(-(Math.PI / 180) * mul);

				text.x = (f * (radius - 15));
				text.y = (g * (radius - 15));
				text.type = "hidenNumbers";
				text.name = "hidenNumbers";
				text.rotation += (90 - h);
				circleCont.addChild(text);
			}
			for (var ch in circleCont.children) {
			  var child = circleCont.children[ch];
			  if (child.name === 'hidenNumbers') {
				var pt = child.localToLocal(100, 0, resizeArm);
				if (resizeArm.hitTest(pt.x, pt.y)) {
				  var degree = parseInt(child.text) - 27;
				}
			  }
			}
			
			resizeIcon.angle = degree;
			if(resizeIcon.angle < 0){
				resizeIcon.angle = 360 + (resizeIcon.angle) ;
			}
			
			pro_circle.graphics.clear();
			pro_circle2.graphics.clear();
			angleArc.graphics.clear();
			angleRectangle.graphics.clear();
			circleCont.removeAllChildren();
			
			rotateTextCont.removeAllChildren();
			protractorCont.removeChild(circleCont);
			protractorCont.addChild(circleCont);
			anglecheck = -(Math.abs(resizeIcon.angle)) * Math.PI / 180;
			
			pro_circle.graphics.setStrokeStyle(width).beginStroke("#9eaff9");
			pro_circle.graphics.arc(0, 0, actual_radius, anglecheck, startAngle).endStroke();
			
			pro_circle2.graphics.setStrokeStyle(width).beginStroke("#e2eaf6");
			pro_circle2.graphics.arc(0, 0, actual_radius, anglecheck, endAngle).endStroke();
			
			angleArc.graphics.setStrokeStyle(5,'round').beginStroke("#5280f1");
			angleArc.graphics.arc(0, 0, actual_radius/6, anglecheck, startAngle).endStroke();
			if (resizeIcon.angle < 0) {
			  resizeIcon.angle = Math.abs(resizeIcon.angle);
			}
			var showAngle = new createjs.Text(Math.floor(resizeIcon.angle) + "\u00B0", "bold 18px Helvetica ", "#5280f1");
			showAngle.name = "showAngle";
			showAngle.x = actual_radius/4 - 10;
			showAngle.y = -actual_radius/4 - 10;
			var angleRectangleImage = new createjs.Bitmap(pbImagePath+'/rounded_rect.png');
			angleRectangleImage.x = showAngle.x - 10;
			angleRectangleImage.y = showAngle.y;
			rotateTextCont.addChild(angleRectangleImage,showAngle);
			circleCont.addChild(pro_circle2, pro_circle,angleArc,rotateTextCont);
	   
			for (var h = 5; h <= 360; h += 5) {
				f = Math.cos((Math.PI / 180) * h);
				g = Math.sin(-(Math.PI / 180) * h);
				pro_circle.graphics.setStrokeStyle(2).beginStroke("#f8fbff");
				pro_circle.graphics.moveTo(f * tick_start, g * tick_start).lineTo(f * (tick_start + 10), g * (tick_start + 10)).
				moveTo(f * (radius - 10), g * (radius - 10)).lineTo(f * radius, g * radius).endStroke();
				pro_circle2.graphics.setStrokeStyle(2).beginStroke("#f8fbff");
				pro_circle2.graphics.moveTo(f * tick_start, g * tick_start).lineTo(f * (tick_start + 10), g * (tick_start + 10)).
				moveTo(f * (radius - 10), g * (radius - 10)).lineTo(f * radius, g * radius).endStroke();
			}

			for (var h = 0; h < 360; h += 10) {
				var multiplier = h;
				if (h < 100) {
					multiplier += 2;
				} else {
					multiplier += 2.5;
				}
				f = Math.cos((Math.PI / 180) * h);
				g = Math.sin(-(Math.PI / 180) * h);
				pro_circle.graphics.setStrokeStyle(2).beginStroke("#f8fbff");
				pro_circle.graphics.moveTo(f * tick_start, g * tick_start).lineTo(f * (tick_start + 15), g * (tick_start + 15)).
				moveTo(f * (radius - 15), g * (radius - 15)).lineTo(f * radius, g * radius).endStroke();

				var text = new createjs.Text(h, "12px Helvetica ", "#3046da");
				f = Math.cos((Math.PI / 180) * multiplier);
				g = Math.sin(-(Math.PI / 180) * multiplier);

				text.x = (f * (radius - 15));
				text.y = (g * (radius - 15));
				text.type = "numbers";
				text.rotation += (90 - h);
				circleCont.addChild(text);
				text.on('pressmove', function (e) {
					var posX = e.stageX;
					var posY = e.stageY;
					protractorCont.x = posX + protractorCont.offset.x;
					protractorCont.y = posY + protractorCont.offset.y;
          //protractor_drag_regions(protractorCont, e);
          
				});
			}

			rotateArm.graphics.clear();
			rotateArm.graphics.setStrokeStyle(5, "round").beginStroke("#5280f1").moveTo(0, 0).lineTo(radius + 40, 0).endStroke();

			rotateIcon.x = radius + 40;
			rotateIcon.y = 0;
			rotateIcon.regY = 15;
			rotateIcon.regX = 15;
				
	    });

      //To drag the protractor
      protractorCont.on('mousedown', function (e) {
        stage.setChildIndex(e.currentTarget, stage.getNumChildren() - 1);
        var posX = e.stageX;
        var posY = e.stageY;
        var newX = protractorCont.x;
        var newY = protractorCont.y;
        this.offset = {
          x: newX - posX,
          y: newY - posY,
          x1: this.x - posY
        };
      });
      protractorCont.on('pressup', function (e) {
        //protractor_drag_regions(this, e);
      });
      circleCont.getChildByName("protractor_circle").on('pressmove', function (e) {
        var posX = e.stageX;
        var posY = e.stageY;
        protractorCont.x = posX + protractorCont.offset.x;
        protractorCont.y = posY + protractorCont.offset.y;
        //protractor_drag_regions(protractorCont, e);
      });
      circleCont.getChildByName("protractor_circle2").on('pressmove', function (e) {
        var posX = e.stageX;
        var posY = e.stageY;
        protractorCont.x = posX + protractorCont.offset.x;
        protractorCont.y = posY + protractorCont.offset.y;
        //protractor_drag_regions(protractorCont, e);
      });
      protractor.clicked = true;
    } else {
      
      if (protractorCont.visible) {
        protractorCont.visible = false;
      } else {
        protractorCont.visible = true;
      }
    }
  }

  /**
   * Function to add the shapes
   * @param {type} evt
   * @param {type} color
   * @param {type} type
   * @param {type} attr
   * @returns {undefined}
   */
  var oldAngle;
  function addShape(evt, color, type, attr) {
    stage.removeChild(startUpMsg);
    var targetX, targetY;
    switch (type) {
      case 'hexagon':
        targetX = (evt.type == 'click') ? 201 : '';
        targetY = (evt.type == 'click') ? 235 : '';
        break;
      case 'square':
        targetX = (evt.type == 'click') ? 361 : '';
        targetY = (evt.type == 'click') ? 235 : '';
        break;
      case 'trapezoid':
        targetX = (evt.type == 'click') ? 421 : '';
        targetY = (evt.type == 'click') ? 235 : '';
        break;
      case 'rhombus':
        targetX = (evt.type == 'click') ? 581 : '';
        targetY = (evt.type == 'click') ? 235 : '';
        break;
      case 'triangle':
        targetX = (evt.type == 'click') ? 641 : '';
        targetY = (evt.type == 'click') ? 235 : '';
        break;
      case 'shapex':
        targetX = (evt.type == 'click') ? 801 : '';
        targetY = (evt.type == 'click') ? 235 : '';
        break;
    }
    deselectShape();
    var shape, shape_rotate;
    var shapeContainer = new createjs.Container;
    var imageName = type + "_" + color + "_hover";
    var hover_shape = bitmapArray[imageName];
    shape = hover_shape.clone();
    shape.x = attr.x;
    shape.y = attr.y;
    shape.name = "shapeicon";
    shape.index = index;
    shapeContainer.cursor = 'pointer';
    shapeContainer.color = color;
    shapeContainer.selected = 1;
    shapeContainer.type = type;
    shapeContainer.index = index;
    shapeContainer.actualAngle = 0;
    var rotaeimageName = type + "_rotate";
    var shape_rotate_sel = bitmapArray[rotaeimageName];
    shape_rotate = shape_rotate_sel.clone();
    shape_rotate.x = 0;
    shape_rotate.y = 0;
    shape_rotate.index = 1;
    shape_rotate.name = 'shape_rotate';
    shape_rotate.cursor = "pointer";
    if (targetX == '' && targetY == '') {
      shapeContainer.x = evt.stageX;
      shapeContainer.y = evt.stageY;
    } else {
      var targetCoordinates = new Array();
      targetCoordinates = getTargetCoordinates(type, targetX, targetY);
      if (targetCoordinates.length > 0) {
        shapeContainer.x = targetCoordinates[0];
        shapeContainer.y = targetCoordinates[1];
      } else {
        shapeContainer.x = targetX;
        shapeContainer.y = targetY;
      }
    }
    shapeContainer.addChild(shape);
    shapeContainer.addChild(shape_rotate);
    shapeContainer.regX = shape_rotate.image.width / 2;
    shapeContainer.regY = shape_rotate.image.height / 2;
    shape_rotate.removeAllEventListeners();
    shape_rotate.on('mousedown', function () {
      rotate = 1;
      move = 0;
      var angle = Math.atan2(stage.mouseY - shapeContainer.y, stage.mouseX - shapeContainer.x);
      angle = angle * (180 / Math.PI);
      angle = angle + 90;
      oldAngle = angle - shapeContainer.rotation;
      //console.log("OA"+oldAngle);


    });
    shape_rotate.on("pressmove", function (evt) {
      rotate = 1;
      move = 0;
      if (rotate === 1) {
        rotate_shape(shapeContainer);
      }
    });
    shape.removeAllEventListeners();
    shape.on('mousedown', function () {
      rotate = 0;
      move = 1;
    });
    //shapeContainer.removeAllEventListeners();
    shapeContainer.on("pressmove", function (evt) {
      if (move === 1) {
        shape_rotate.visible = false;
        dragShape(evt);
      }
    });
    shapeContainer.on("pressup", function (evt) {
      shape_rotate.visible = true;      
      //prevent_drag_regions(this, evt);
    });
    stage.addChild(shapeContainer);
    selectedShapes.push(shapeContainer);
    prevent_drag_regions(shapeContainer, evt);
    stage.update();
    index = index + 1;
  }

  /**** patternPuzzles starts here ****/
  patternbutton.on('click', function () {
    if (counterOpened == 0) {
      openPatternPuzzles();
    } else {
      closePatternPuzzles();
    }
  });

  function openPatternPuzzles() {
    $("#pattern-puzzles").slideDown("slow");
    $("#overlayDivCounter").css("display", "block");
    counterOpened = 1;
    patternbuttonicon.image = patternbutton_hover_image;
    patternbuttonicon.cursor = "pointer";
    patternbutton.x = 995;
    patternbutton.y = 12;
  }

  function closePatternPuzzles() {
    $("#pattern-puzzles").slideUp("slow");
    $("#overlayDivCounter").css("display", "none");
    counterOpened = 0;
    patternbuttonicon.image = patternbutton_image;
    patternbuttonicon.cursor = "pointer";
    patternbutton.x = 999;
    patternbutton.y = 16;
  }

  $("#overlayDivCounter").on('click', function () {
    $("#pattern-puzzles").slideToggle("slow");
    $("#overlayDivCounter").css("display", "none");
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      counterOpened = 0;
    } else {
      counterOpened = 0;
    }
    patternbuttonicon.image = patternbutton_image;
    patternbuttonicon.cursor = "pointer";
    patternbutton.x = 999;
    patternbutton.y = 16;
  });
  /**** patternPuzzles ends here ****/

  //getTargetCoordinates
  function getTargetCoordinates(type, targetX, targetY) {
    var isElementExist = false;
    var targetCoordinates = new Array();
    var loopCount = 0;
    while (isElementExist == false) {
      loopCount = loopCount + 1;
      var test = stage.getObjectsUnderPoint(targetX, targetY, !0);
      if (test.length > 0) {
        targetX = targetX + 15;
        targetY = targetY + 15;
        targetCoordinates = [];
        targetCoordinates.push(targetX, targetY);
      } else {
        isElementExist = true;
      }
    }
    return targetCoordinates;
  }

  /**
   * Function to roate the shape
   * @param {type} shapeContainer
   * @returns {undefined}
   */
  function rotate_shape(shapeContainer) {
    var angle = Math.atan2(stage.mouseY - shapeContainer.y, stage.mouseX - shapeContainer.x);
    angle = angle * (180 / Math.PI);
    angle = 90 + angle;
    if (angle < 0)
    {
      //angle = 360 - (-angle);
    }
    //shapeContainer.rotation = 90 + angle;
    shapeContainer.rotation = -oldAngle + angle;

  }
  /**
   * Drag the shapes
   * @param {type} evt
   * @returns {undefined}
   */
  function dragShape(evt) {
    if (selectedShapes.length === 1) {
      selectedShapes[0].x = evt.stageX;
      selectedShapes[0].y = evt.stageY;
      if (selectedShapes[0].getChildByName('shape_rotate')) {
        selectedShapes[0].getChildByName('shape_rotate').visible = false;
      }
      prevent_drag_regions(selectedShapes[0], evt);
    }
    if (selectedShapes.length > 1) {
      var oldX = evt.currentTarget.x;
      var oldY = evt.currentTarget.y;
      for (i = 0; i < selectedShapes.length; i++) {
        //console.log(selectedShapes.length+'=='+evt.target.id + '--' + selectedShapes[i].id);
        if (evt.target.id !== selectedShapes[i].id && selectedShapes[i].selected == 1) {
          var offset = {
            x: selectedShapes[i].x - oldX,
            y: selectedShapes[i].y - oldY
          };
          selectedShapes[i].x = evt.stageX + offset.x;
          selectedShapes[i].y = evt.stageY + offset.y;
        }
        selectedShapes[i].getChildByName('shape_rotate').visible = false;
      }
    }
    stage.update();
  }
  /**
   * Function to prevent dragging the protractor on left/right/top/bottom regions
   * @param {type} container
   * @param {type} evt
   * @returns {undefined}
   */
  function protractor_drag_regions(container, evt) {
    var innerWidth = window.innerWidth;
    var canvasHeight =canvas.height;  
    if(container.x<306){
      container.x = 306;
    }
    if(container.y<346){
      container.y = 347;
    }
    if(container.y >  canvasHeight-255){
      container.y = canvasHeight-260;
    }
    if(container.x >  innerWidth-255){
      container.x = innerWidth-260;
    }
   
  }
  /**
   * Function to prevent dragging the shapes on left/right/top/bottom regions
   * @param {type} container
   * @param {type} evt
   * @returns {undefined}
   */
  function prevent_drag_regions(container, evt) {
    var innerWidth = window.innerWidth;
    var canvasHeight =canvas.height;   
    if (container.type === 'hexagon' || container.type === 'trapezoid') {
      if (evt.stageX < 153) {
        container.x = 153;
      }
      if (evt.stageY < 196) {
        container.y = 196;
      }         
      
    } else if (container.type === 'square') {
      if (evt.stageX < 127) {
        container.x = 127;
      }
      if (evt.stageY < 167) {
        container.y = 167;
      }
    } else if (container.type === 'rhombus') {
      if (evt.stageX < 140) {
        container.x = 140;
      }
      if (evt.stageY < 182) {
        container.y = 182;
      }
    } else if (container.type === 'triangle') {
      if (evt.stageX < 118) {
        container.x = 118;
      }
      if (evt.stageY < 160) {
        container.y = 160;
      }
    }
    else if (container.type === 'shapex') {
      if (evt.stageX < 144) {
        container.x = 144;
      }
      if (evt.stageY < 185) {
        container.y = 185;
      }
    }    
    var rs = container.getChildByName('shape_rotate');
    if (rs !== null) {
      var wid = rs.image.width / 2;
      var hig = rs.image.height / 2;
      if (evt.stageX > (innerWidth - wid)) {
        container.x = innerWidth - (wid + 10);
      }
      if (evt.stageY > (canvasHeight - hig)) {
        container.y = canvasHeight - (hig);
      }
    }
  }      
  
  /**
   * Function to select the shapes 
   * @param {type} container
   * @returns {undefined}
   */
  function selectShape(container) {
    var selectedshape, shape_rotate;
    var selectedContainer = new createjs.Container;
    var type = container.type;
    var color = container.color;
    var selectedImageName = type + "_" + color + "_selected";
    var selectedimg = bitmapArray[selectedImageName];
    selectedshape = selectedimg.clone();
    var shapeicon = container.getChildByName('shapeicon');
    selectedshape.x = shapeicon.x;
    selectedshape.y = shapeicon.y;
    selectedshape.name = "shapeicon";

    selectedContainer.cursor = 'pointer';
    selectedContainer.color = color;
    selectedContainer.selected = 1;
    selectedContainer.x = container.x;
    selectedContainer.y = container.y;
    selectedContainer.type = type;
    selectedContainer.rotation = container.rotation;
    var rotaeimageName = type + "_rotate";
    var img_rotate = bitmapArray[rotaeimageName];
    shape_rotate = img_rotate.clone();
    shape_rotate.x = 0;
    shape_rotate.y = 0;
    shape_rotate.name = 'shape_rotate';
    shape_rotate.cursor = "pointer";

    selectedContainer.addChild(selectedshape,shape_rotate);
    selectedContainer.regX = shape_rotate.image.width/ 2;
    selectedContainer.regY = shape_rotate.image.height/ 2;  
    shape_rotate.on('mousedown', function () {
      rotate = 1;
      move = 0;
      var angle = Math.atan2(stage.mouseY - selectedContainer.y, stage.mouseX - selectedContainer.x);
      angle = angle * (180 / Math.PI);
      angle = angle + 90;
      oldAngle = angle - selectedContainer.rotation;

    });
    shape_rotate.removeAllEventListeners('pressmove');
    shape_rotate.on("pressmove", function (evt) {
      rotate = 1;
      move = 0;
      if (rotate === 1) {
        rotate_shape(selectedContainer);
      }
    });
    selectedshape.on('mousedown', function () {
      rotate = 0;
      move = 1;
    });
    selectedContainer.on("pressmove", function (evt) {
      if (move === 1) {
        shape_rotate.visible = false;
        dragShape(evt);
      }
    });
    selectedContainer.on("pressup", function (evt) {
      if (selectedShapes.length == 1) {
        shape_rotate.visible = true;
      }
      if (selectedShapes.length > 1) {
        for (i = 0; i < selectedShapes.length; i++) {
          if (!selectedShapes[i].getChildByName('shape_rotate').visible) {
            selectedShapes[i].getChildByName('shape_rotate').visible = true;
          }
        }
      }
      prevent_drag_regions(selectedContainer, evt);
    });
    stage.removeChild(container);
    stage.addChild(selectedContainer);
    stage.update();
    selectedShapes.push(selectedContainer);
    //remove from deselectedShapes array
    var indexD = deselectedShapes.indexOf(container);
    deselectedShapes.splice(indexD, 1);
    //console.log('after selection ---');
    //console.log(selectedShapes);
  }

  /**
   * Function to deselect the shapes 
   * @returns {undefined}
   */
  function  deselectShape() {
    //for removing calculator selection
    for (i = 0; i < arrayOfTextBorder.length; i++) {
      arrayOfTextBorder[i].visible = false;
    }
    var deselectedShape = "";
    if (selectedShapes.length > 0) {
      for (var ky in selectedShapes) {
        if (selectedShapes[ky].selected === 1) {
          var color = selectedShapes[ky].color;
          var type = selectedShapes[ky].type;
          var imageName = type + "_" + color;
          var deselectedimg = bitmapArray[imageName];
          deselectedShape = deselectedimg.clone();
          selectedShapes[ky].removeAllEventListeners();
          var shapeicon = selectedShapes[ky].getChildByName('shapeicon');
          shapeicon.removeAllEventListeners();
          deselectedShape.x = shapeicon.x;
          deselectedShape.y = shapeicon.y;  
		      deselectedShape.regX = shapeicon.regX - 4;
          deselectedShape.regY = shapeicon.regY - 4;		  
          deselectedShape.name = "shapeicon";
          var shape_rotate = selectedShapes[ky].getChildByName("shape_rotate");
          selectedShapes[ky].removeChild(shape_rotate);
          selectedShapes[ky].removeChild(shapeicon);
          selectedShapes[ky].addChild(deselectedShape);
          selectedShapes[ky].selected = 0;
          width = deselectedShape.image.width;
          height = deselectedShape.image.height;
          selectedShapes[ky].regX = shape_rotate.image.width / 2;
          selectedShapes[ky].regY = shape_rotate.image.height / 2;		  
          deselectedShapes.push(selectedShapes[ky]);
          selectedShapes[ky].on("mousedown", function () {
            deselectShape();
            selectShape(this);
          });
          selectedShapes[ky].on("pressmove", function (evt) {
            dragShape(evt);            
          });
          selectedShapes[ky].on("pressup", function (evt) {          
            selectedShapes[0].getChildByName('shape_rotate').visible = true;
            var t = selectedShapes[0].getChildByName('shape_rotate');
            prevent_drag_regions(t.parent, evt);
          });
          stage.update();
        }
      }
    }
    selectedShapes = [];
    move = 0;
    rotate = 0;
  }

  /**Pattern puzzle functionality start**/
  function dragPuzzle(evt) {
    if (selectedPuzzles.length === 1) {
      selectedPuzzles[0].x = evt.stageX;
      selectedPuzzles[0].y = evt.stageY;
    }
  }
  function selectPuzzle(puzzleContainer) {
    var puzzle = puzzleContainer.getChildByName('puzzle');
    var pType = puzzleContainer.type;
    if (puzzleContainer.status == 'q') {
      puzzle.image = bitmapArray['pattern_' + pType + '_sel'].image;
      selectedPuzzles.push(puzzleContainer);
    } else {
      puzzle.image = bitmapArray['pattern_' + pType + '_sol'].image;
      selectedPuzzles.push(puzzleContainer);
    }
  }
  function deSelectPuzzles() {
    if (selectedPuzzles.length > 0) {
      var temp = [];
	  var tPuzzle = '';
      for (i = 0; i < selectedPuzzles.length; i++) {
        pContainer = selectedPuzzles[i];
		tPuzzle = pContainer.getChildByName('puzzle');
        if (pContainer.status == 'q') {
		  tPuzzle.image = bitmapArray['pattern_' + pContainer.type].image;
        } else {
		  tPuzzle.image = bitmapArray['pattern_' + pContainer.type + '_sol'].image;
        }
		tPuzzle.regX = tPuzzle.image.width / 2;
		tPuzzle.regY = tPuzzle.image.height / 2;
        temp.push(selectedPuzzles[i]);
      }
      for (var t in temp) {
        var index = selectedPuzzles.indexOf(temp[t]);
        selectedPuzzles.splice(index, 1);
      }
    }
  }
  $('.canvaswrapper').css("overflow","hidden");
 var puzzleArray = [];
  //selectedPuzzles = new Array();
  var showSolImage = bitmapArray['show-solution'].image;
  var showSolHoverImage = bitmapArray['show-solution-hover'].image;
  var hideSolImage = bitmapArray['hide-solution'].image;
  var hideSolHoverImage = bitmapArray['hide-solution-hover'].image;
  var puzzleCount = 0;
  $(".puzzlestop .puzzle").on('click', function (e) {
    closePatternPuzzles();
    deSelectPuzzles();
    var puzzleContainer = new createjs.Container();
    var pType = $(this).attr('data-type');  
    
    puzzleContainer.type = pType;
    puzzleContainer.name = "puzzleContainer-" + puzzleCount;
    puzzleContainer.selected = 0;
    puzzleContainer.cursor = "pointer";
    puzzleContainer.status = 'q';
    //puzzle
    var puzzle = new createjs.Bitmap();
    puzzle.image = bitmapArray['pattern_' + pType].image;
    puzzle.name = 'puzzle';
    puzzle.x = puzzle.image.width / 2;
    puzzle.y = puzzle.image.height / 2;
    puzzle.regX = puzzle.image.width / 2;
    puzzle.regY = puzzle.image.height / 2;
    
     if (puzzleArray.length > 0) {
      var recentpuzzle = puzzleArray[puzzleArray.length - 1];
      var child = recentpuzzle.getChildByName("puzzle");
      var xv = child.regX+ puzzle.regX+10;     
      puzzleContainer.x = recentpuzzle.x+ xv;
      puzzleContainer.y = recentpuzzle.y;      
      var i = puzzleContainer.x+parseInt(puzzle.regX);      
      if(i>stage.canvas.width){
        stage.canvas.width = stage.canvas.width+ (i-stage.canvas.width);
        $("#about_div").width(stage.canvas.width);
        $('.canvaswrapper').css("overflow","inherit");
      }else{
        $('.canvaswrapper').css("overflow","hidden");
      }    
    } else {
      puzzleContainer.x = 400;
      puzzleContainer.y = 460;
    }
    
    puzzleArray.push(puzzleContainer);
    
    //mousedown
    puzzle.on('mousedown', function () {
      deSelectPuzzles();
      selectPuzzle(puzzleContainer);
		puzzle.regX = puzzle.image.width / 2;
		puzzle.regY = puzzle.image.height / 2;
    });
    //click
    puzzle.on('click', function () {
      deSelectPuzzles();
	  selectPuzzle(puzzleContainer);
	  puzzle.regX = puzzle.image.width / 2;
	  puzzle.regY = puzzle.image.height / 2;
    });
    //button
    var hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(0, 0, 80, 13);
    var button = new createjs.Bitmap();
    button.image = bitmapArray['show-solution'].image;
    button.hitArea = hit;
    button.name = 'button';
    button.cursor = 'Pointer';
    button.x = puzzle.image.width / 2;
    button.y = puzzle.image.height + 60;
    button.regX = button.image.width / 2;
    button.regY = button.image.height / 2;
    //mouseover
    button.on('mouseover', function () {
      if (puzzleContainer.status == 'q') {
        button.image = showSolHoverImage;
      } else {
        button.image = hideSolHoverImage;
      }
    });
    //mouseout
    button.on('mouseout', function () {
      if (puzzleContainer.status == 'q') {
        button.image = showSolImage;
      } else {
        button.image = hideSolImage;
      }
    });
    //click
    button.on('click', function (e) {
      if (puzzleContainer.status == 'q') {
        button.image = hideSolImage;
        puzzle.image = bitmapArray['pattern_' + pType + '_sol'].image;
        puzzleContainer.status = 'a';
      } else {
        button.image = showSolImage;
        puzzle.image = bitmapArray['pattern_' + pType].image;
        puzzleContainer.status = 'q';
      }
    });
    puzzleContainer.regX = puzzle.image.width / 2;
    puzzleContainer.regY = puzzle.image.height / 2;
    puzzleContainer.addChild(puzzle, button);
    puzzleContainer.on("pressmove", dragPuzzle);
    stage.addChild(puzzleContainer);
    puzzleCount = puzzleCount + 1;
  });
  /**Pattern puzzle functionality end**/

  /**
   * Handle the Shape Duplicates
   */
  $(".duplicate_frame_image").on('click', handleDuplicate);
  function handleDuplicate() {
    duplicatedShapes = duplicateShapes(selectedShapes);
    deselectShape();
    for (var c in duplicatedShapes) {
      selectedShapes.push(duplicatedShapes[c]);
      stage.addChild(duplicatedShapes[c]);
      stage.update();
    }
  }
  /**
   * Function to duplicate the shapes 
   * @param {type} selectedShapes
   * @returns {Array}
   */
  function duplicateShapes(selectedShapes) {
    var duplicateShapes = new Array();
    for (var b in selectedShapes) {
      var cloned = selectedShapes[b].clone(true);
      cloned.x = cloned.x + 50;
      cloned.y = cloned.y + 50;
      cloned.selected = 1;
      cloned.type = selectedShapes[b].type;
      cloned.color = selectedShapes[b].color;
      cloned.cursor = 'pointer';
      cloned.removeAllEventListeners();
      for (var cl in cloned.children) {
        cloned.children[cl].removeAllEventListeners();
        if (typeof cloned.children[cl].name !== 'undefined' && cloned.children[cl].name === "shapeicon") {
          cloned.children[cl].on('mousedown', function () {
            rotate = 0;
            move = 1;
          });
        }
        if (typeof cloned.children[cl].name !== 'undefined' && cloned.children[cl].name === "shape_rotate") {
          shape_rotate = cloned.children[cl];
          cloned.children[cl].on('mousedown', function () {
            rotate = 1;
            move = 0;
            var angle = Math.atan2(stage.mouseY - cloned.y, stage.mouseX - cloned.x);
            angle = angle * (180 / Math.PI);
            angle = angle + 90;
            oldAngle = angle - cloned.rotation;

          });
        }
      }
      shape_rotate.on("pressmove", function (evt) {
        rotate = 1;
        move = 0;
        if (rotate === 1) {
          rotate_shape(cloned);
        }
      });
      cloned.on("pressmove", function (evt) {
        if (move === 1) {
          cloned.removeChild(shape_rotate);
          dragShape(evt);
        }
      });
      cloned.on("pressup", function (evt) {
        cloned.addChild(shape_rotate);
        prevent_drag_regions(cloned, evt);
      });
      duplicateShapes.push(cloned);
    }
    return duplicateShapes;
  }
  /**
   * Function to deselect while clicking on empty canvas
   * @returns {undefined}
   */
  function mouseDownAtEmpty() {
    stage.on('stagemousedown', function (evt) {
      closePatternPuzzles();
      var obj = stage.getObjectsUnderPoint(evt.stageX, evt.stageY, 1);
      if (obj.length <= 0) {
        deselectShape();
        deselect();
        deSelectPuzzles();
      }
    });
  }
  mouseDownAtEmpty();

  $('.trash').on('click', trash);

  /**
   * Function for Trash the selected objects in the canvas
   * @returns {undefined}
   */
  function trash() {
    if (selectedShapes.length > 0) {
      for (var b in selectedShapes) {
        stage.removeChild(selectedShapes[b]);
        stage.update();
      }
      while (selectedShapes.length > 0) {
        selectedShapes.pop();
      }
    }
    //remove selected puzzleContainer
    if (selectedPuzzles.length > 0) {
      for (var b in selectedPuzzles) {
        stage.removeChild(selectedPuzzles[b]);
        stage.update();
      }
      while (selectedPuzzles.length > 0) {
        selectedPuzzles.pop();
      }
    }
    stage.update();
  }



  $(".open_toolbar").on('click', function () {
    /* remove overlay class to left-toolbar */
    if ($(".disable-left-tray").length) {
      // $("#toolbar").unwrap();
    }

    jQuery("#button_options").toggle();

    if ($("#drawing_pen").hasClass("pen_image_selected"))
    {
      //console.log("handleopen from open toolbar" + " p is " + p);
      handleOpenPen();
    }

    if ($("#drawing_eraser").hasClass("eraser_image_selected"))
    {
      handleOpenEraser();
    }

    if (jQuery(".open_toolbar").hasClass("selected")) {
      $("#workspace").removeClass("cursor_canvas");

      jQuery(".open_toolbar").removeClass("selected");
      $("#top_menu_overlay").css("display", "none");
      $("#toolbar").removeClass("deselected_toolbar");

      $("#color_picker").addClass("hiddentab");
      $(".colorpane").hide();
      //multiSelection();
      //mouseDownAtEmpty();
      p = 0;

    } else {
      jQuery(".open_toolbar").addClass("selected");
    }

  });

  /** updateColors starts here **/
  $(".color_icons").on("click", function () {
    updateColors(this.id);
  });
  // To update colors for selected shapes
  function updateColors(color) {
    //console.log(selectedShapes.length);
    var tempArray = new Array();
    if (selectedShapes.length > 0) {
      for (k = 0; k < selectedShapes.length; k++) {
        var selectedShape = selectedShapes[k];
        //console.log(selectedShape);
        if (typeof selectedShape.type !== 'undefined') {
          var shape, shape_rotate;
          var shapeContainer = new createjs.Container;
          var imageName = selectedShape.type + '_' + color + "_hover";
          var hover_shape = bitmapArray[imageName];
          shape = hover_shape.clone();
          shape.x = selectedShape.getChildByName('shapeicon').x;
          shape.y = selectedShape.getChildByName('shapeicon').y;
          shape.name = "shapeicon";
          shape.index = selectedShape.index;
          shapeContainer.cursor = 'pointer';
          shapeContainer.color = color;
          shapeContainer.selected = 1;
          shapeContainer.type = selectedShape.type;
          shapeContainer.index = selectedShape.index;
          var rotaeimageName = selectedShape.type + "_rotate";
          var shape_rotate_sel = bitmapArray[rotaeimageName];
          shape_rotate = shape_rotate_sel.clone();
          shape_rotate.x = 0;
          shape_rotate.y = 0;          
          shape_rotate.index = 1;
          shape_rotate.name = 'shape_rotate';
          shape_rotate.cursor = "pointer";
          shapeContainer.x = selectedShape.x;
          shapeContainer.y = selectedShape.y;
          shapeContainer.addChild(shape);
          shapeContainer.addChild(shape_rotate);
          shapeContainer.regX = shape_rotate.image.width / 2;
          shapeContainer.regY = shape_rotate.image.height / 2;
          shapeContainer.rotation = selectedShape.rotation;
          shape_rotate.removeAllEventListeners();
          shape_rotate.on('mousedown', function () {
            rotate = 1;
            move = 0;
            var angle = Math.atan2(stage.mouseY - shapeContainer.y, stage.mouseX - shapeContainer.x);
            angle = angle * (180 / Math.PI);
            angle = angle + 90;
            oldAngle = angle - shapeContainer.rotation;

          });
          shape_rotate.on("pressmove", function (evt) {
            rotate = 1;
            move = 0;
            if (rotate === 1) {
              rotate_shape(shapeContainer);
            }
          });
          shape.removeAllEventListeners();
          shape.on('mousedown', function () {
            rotate = 0;
            move = 1;
          });
          //shapeContainer.removeAllEventListeners();
          shapeContainer.on("pressmove", function (evt) {
            if (move === 1) {
              shapeContainer.removeChild(shape_rotate);
              dragShape(evt);
            }
          });
          shapeContainer.on("pressup", function (evt) {
            shapeContainer.addChild(shape, shape_rotate);
            prevent_drag_regions(this, evt);
          });
          tempArray.push(shapeContainer);
          stage.addChild(shapeContainer);
          stage.removeChild(selectedShape);
          stage.update();
        }
      }
      while (selectedShapes.length > 0) {
        selectedShapes.pop();
      }
      if (tempArray.length > 0) {
        for (i = 0; i < tempArray.length; i++) {
          selectedShapes.push(tempArray[i]);
        }
        tempArray = [];
      }
    }
  }
  /** updateColors ends here **/

  function drag_toolbar() {
	    jQuery("#button_options").draggable({
	      //containment: [46, 90, 1281, 750]
	      containment: [46, 90, window.innerWidth - 100, window.innerHeight]
	    });
	    jQuery("#calculatordialog").draggable({
	      //containment: [50, 95, 1120, 740]
	      containment: [50, 95, window.innerWidth - 250, window.innerHeight]
	    });
	  }

	  drag_toolbar();
  
//pick color from id for paint
  $(".pick_color").on('click', handlePickColor);
  function handlePickColor() {
    if (!$("#drawing_pen").hasClass("pen_image_selected")) {
      handleOpenPen();
    }
    //if (p == 1){
    pen_color = $(this).attr("id");
    pen_color = pen_color.replace("_c", "");
    clickedColor = this;
    if ($(".pick_color").hasClass("hover_class")) {
      $(".pick_color").removeClass("hover_class");
      $(this).addClass("hover_class");
    } else {
      $(this).addClass("hover_class");
    }
    paint(p);
    //}
  }
  // var p;
  var clickedColor;
  //open pen smooth line
  $(".openpen").on('click', handleOpenPen);
  function  handleOpenPen() {
    /* add/remove class to left-toolbar for overlay */
    if ($(".disable-left-tray").length) {
      $("#toolbar").unwrap();
      if (deselectedShapes.length > 0) {
        for (var i in deselectedShapes) {
          deselectedShapes[i].mouseEnabled = true;
        }
      }
      $(".color_icons").on("click", function () {
        updateColors(this.id);
      });
    } else {
      $("#toolbar").wrap("<div class='disable-left-tray'></div>");
      deselectShape();
      if (deselectedShapes.length > 0) {
        for (var i in deselectedShapes) {
          deselectedShapes[i].mouseEnabled = false;
        }
      }

    }
    if ($("#drawing_pen").hasClass("pen_image")) {
      $("#drawing_pen").removeClass("pen_image");
      $("#drawing_pen").addClass("pen_image_selected");
      $("#top_menu_overlay").css("display", "block");
      $("#toolbar").addClass("deselected_toolbar");
      p = 1;
      paint(p);
      var hoverChecker = $(".pick_color").hasClass("hover_class");
      // console.log("handle open pen" + $(".pick_color").hasClass("hover_class"));
      /* add/remove class to left-toolbar for overlay */
      //x = "#3ecfe1";
      var colorChecker = "#3ecfe1";
      if (hoverChecker === false && pen_color === colorChecker) {
        //  console.log("abc" + "x ix " + x);
        //$(".color_blue").addClass("hover_class");
        $(".color_blue").addClass("hover_class");
      } else {
        // console.log("inside else part");
        if (typeof clickedColor == 'undefined') {
          $(".color_blue").addClass("hover_class");
        } else {
          $(clickedColor).addClass("hover_class");
        }
      }

      //Disabling all other functionalities when pen selected
      paintOpen = true;
      stage.addChild(wrapper); //Add wrapper for paint
      $(".duplicate_frame_image").off('click');
      $(".rotate_table_image").off("click");   // disabling rotateFrame
      $('.keypad').off("click");
      $(".color_icons").off("click");
      $('.trash').off('click');
    } else if ($("#drawing_pen").hasClass("pen_image_selected")) {
      //$('.keypad').off('click', handleKeypad).on('click', handleKeypad);
      check_keypad();
      //$(".color_icons").off("click", updateColors).on("click", updateColors);
      $(".duplicate_frame_image").off('click', handleDuplicate).on('click', handleDuplicate);
      $('.trash').off('click', trash).on('click', trash);

      $("#drawing_pen").removeClass("pen_image_selected");
      $("#drawing_pen").addClass("pen_image");
      $("#top_menu_overlay").css("display", "none");
      $("#toolbar").removeClass("deselected_toolbar");
      $(".pick_color").removeClass("hover_class");
      //clickedColor = $(".pick_color").attr("id");

      //Enabling back all functionalities when pen de-selected
      paintOpen = false;
      removeEventLiserners(stage);
      $("#workspace").addClass("cursor_canvas");
      $("#workspace").removeClass("cursor_canvas");
      multiSelection();
      mouseDownAtEmpty();
    }

    if ($("#drawing_eraser").hasClass("eraser_image_selected")) {
      $("#drawing_eraser").removeClass("eraser_image_selected");
      $("#drawing_eraser").addClass("eraser_image");
    }

  }

  //selecting the eraser
  $(".openeraser").on('click', handleOpenEraser);
  function handleOpenEraser() {
    // handlePickColor();

    if ($("#drawing_eraser").hasClass("eraser_image")) {
      $(".pick_color").removeClass("hover_class");
      $("#drawing_eraser").removeClass("eraser_image");
      $("#drawing_eraser").addClass("eraser_image_selected");
      p = 0;
      paint(p);
      //Disabling all other functionalities when eraser selected
      paintOpen = true;
      //deselectFrame();
      //deselectShape();
      //deSelectFrameIcons();
      stage.addChild(wrapper); //Add wrapper for paint
      //$(".duplicate_frame_image").off('click');
      //$(".rotate_table_image").off("click");   // disabling rotateFrame
      //$('.keypad').off("click");
      //$("#pink,#yellow,#green,#blue,#gray").off("click");
      $('.trash').off('click');
    } else if ($("#drawing_eraser").hasClass("eraser_image_selected")) {
      $("#drawing_eraser").removeClass("eraser_image_selected");
      $("#drawing_eraser").addClass("eraser_image");

      //Enabling back all functionalities when pen de-selected
      paintOpen = false;
      removeEventLiserners(stage);
      $('.keypad').off('click', handleKeypad).on('click', handleKeypad);
      //$(".color_icons").off("click", updateColors).on("click", updateColors);

      $(".duplicate_frame_image").off('click', handleDuplicate).on('click', handleDuplicate);
      $('.trash').off('click', trash).on('click', trash);
      $("#workspace").addClass("cursor_canvas");
      $("#workspace").removeClass("cursor_canvas");
      //multiSelection();
      mouseDownAtEmpty();
    }

    if ($("#drawing_pen").hasClass("pen_image_selected")) {
      $("#drawing_pen").removeClass("pen_image_selected");
      $("#drawing_pen").addClass("pen_image");
    }

  }

  wrapper.hitArea = new createjs.Shape(new createjs.Graphics().dr(30, 90, cm_width, cm_height));
  wrapper.cache(30, 90, cm_width, cm_height); // Caching the wrapper

  function paint(p)
  {
    //console.log("in paint:" + p + "x is" + x);
    $("#workspace").addClass("cursor_canvas");
    removeEventLiserners(stage);
    // add handler for stage mouse events:
    Drawfunc(stage, pen_color, flag, shape, penArray, i, j, color, wrapper, p);
    stage.update();
  }

  //animation of color panel
  $(".opencolorpane").on('click', function (evt) {
    if ($("#color_picker").hasClass("hiddentab")) {
      $(".colorpane").show();
      $(".colorpane").animate({
        "margin-left": "115px"
      });
      $("#color_picker").removeClass("hiddentab");
    } else {
      $(".colorpane").animate({
        "margin-left": "0px"
      });
      $(".colorpane").delay(30).fadeOut();
      $("#color_picker").addClass("hiddentab");
    }
  });

  //clear entire canvas drawings done by shape
  $(".clean_line").on('click', function () {
    $("#clean-line-message").dialog("open");
  });
  $("#clean-line-message").dialog({
    autoOpen: false,
    modal: true,
    open: function () {
      $('#clean-line-message .no').on('click', function () {
        $('#clean-line-message').dialog('close');
      });
      $('#clean-line-message .yes').on('click', clearDrawings);
    },
    title: "Clear your work?"
  });

  //function to clear all drawings on canvas
  function clearDrawings() {
    if ($("#drawing_pen").hasClass("pen_image_selected")) {
      handleOpenPen();
    }
    if ($("#drawing_eraser").hasClass("eraser_image_selected"))
    {
      handleOpenEraser();
    }
    p = 0;
    $(".pick_color").removeClass("hover_class");

    for (var count = 2; count > 0; count--) {
      wrapper.uncache();
      wrapper.cache(30, 90, cm_width, cm_height);
      stage.addChild(wrapper);
      var u = 0;
      while (penArray.length > 0) {
        //console.log(penArray.length);
        // console.log(u);
        var x = penArray.slice().reverse()[u].visible;
        //console.log(x);
        if (x == true && u <= penArray.length) {
          // console.log("pen array length" + penArray.length);
          penArray.slice().reverse()[u].visible = false;
          // console.log("in false loop " + u);
          stage.update();
          //break;
        }
        penArray.pop();
        stage.update();
      }
    }
    $("#top_menu_overlay").css("display", "none");
    removeEventLiserners(stage);
    //stage.update();
    //console.log(stage);
    $('#clean-line-message').dialog('close');
    // multiSelection();
    //mouseDownAtEmpty();
  }

  //pick color from id
  var k;
  k = "#696969";
  var ctitle = 'Gray Text';
  $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
  $(".color_splash").on('click', function () {
    k = $(this).attr("id");
    ctitle = $(this).attr("title");
    k = k.replace("_d", "");
    if ($(".color_splash").hasClass("calc_hover_class")) {
      $(".color_splash").removeClass("calc_hover_class");
      $(this).addClass("calc_hover_class");
    } else {
      $(this).addClass("calc_hover_class");
    }
    arrayOfTextArray[key].color = k;
    arrayOfTextArray[key].ctitle = ctitle;
    for (var i = 0; i < arrayOfTextArray[key].length; i++) {
      arrayOfTextArray[key][i].color = k;
    }
    stage.update();
  });

//Open the calculator keypad

  var calc_close = false;
  var calcontainername = 0;
  var textarrayname = 0;
  containercalc = new createjs.Container;
  textContainer = new createjs.Shape;
  var click;
  var containerLength = 180;
  var erased = 0;
  var textArray = new Array();
  //array for textarray
  var arrayOfTextArray = new Array();
  arrayOfTextArray.push(textArray);
  //array for textshape
  var arrayOfTextContainer = new Array();
  arrayOfTextContainer.push(textContainer);
  //array for containers
  var arrayofCalcContainer = new Array();
  arrayofCalcContainer.push(containercalc);
  //array for click event
  var arrayOfTextClick = new Array();
  //click = 0;
  //array of textContainerBorder
  var arrayOfTextBorder = new Array();

  //arrayOfTextClick.push(click);
  var key, keytext, keytest;
  var dbclick_flag = false;
  var z;
  var cl;
  var arrayno;

  /**
   * textContainerBorder
   * @param {type} containercalc
   * @returns {undefined}
   */
  function textContainerBorder(containercalc) {
    var calcTextBorder = new createjs.Shape();
    calcTextBorder.graphics.beginStroke("#a5e5fe");
    calcTextBorder.graphics.setStrokeStyle(4);
    calcTextBorder.graphics.drawRoundRect(2, 100, 230, 80, 14);
    calcTextBorder.visible = false;
    containercalc.addChild(calcTextBorder);
    arrayOfTextBorder.push(calcTextBorder);
    stage.update();
  }
  /**
   * check_keypad
   * @returns {undefined}
   */
  function check_keypad() {
    if (calc_close === false && arrayofCalcContainer.length <= 1) {
      $('.keypad').off('click', handleKeypad).on('click', handleKeypad);
    } else {
      $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
      $('.keypad').off('click', calc_clone).on('click', calc_clone);
    }
  }
  check_keypad();

  $(window).scroll(function () {
    var s = $(this).scrollTop(), d = $(document).height() - $(window).height(), scrollPercent = (s / d) * 100;
    check_kk(scrollPercent);
  });

  function check_kk(val) {
    scrollPer = val;
  }

  var check = 80;
  var check2 = 560;
  function check_width() {
    if (isNaN(scrollPer)) {
      scrollPer = 75;
    } else if (scrollPer < 50) {
      //scrollPer -= 2; 
    } else if (scrollPer > 66 && scrollPer < 70) {
      scrollPer = 65;
    } else if (scrollPer > 70 && scrollPer < 80) {
      scrollPer = 75;
    } else if (scrollPer > 89 && scrollPer < 95) {
      scrollPer = 85;
    } else if (scrollPer === 100) {
      scrollPer = 95;
    }
    var check_wid = window.innerWidth / 2 + (scrollPer * 5 - check) - 600;
    return check_wid;
  }
  /**
   * handleKeypad
   * @returns {undefined}
   */
  function handleKeypad() {
    $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
    if (arrayofCalcContainer.length == 0) {
      deselectShape();
      calcontainername = 0;
      containercalc = new createjs.Container;
      textContainer = new createjs.Shape;
      arrayOfTextContainer = new Array();
      arrayOfTextContainer.push(textContainer);
      textArray = new Array();
      arrayOfTextArray = new Array();
      arrayOfTextArray.push(textArray);
      arrayofCalcContainer = new Array();
      arrayofCalcContainer.push(containercalc);
      arrayOfTextClick = new Array();
      arrayOfTextClick[keytext] = 0;
    }
    removeEventLiserners(stage);
    keytext = arrayOfTextContainer.length;
    keytext = keytext - 1;
    textContainerBorder(containercalc);
    arrayOfTextBorder[keytext].visible = true;
    if (calcontainername == 0) {

      arrayOfTextContainer[keytext].graphics.beginFill("rgba(200,200,200,0.4)").drawRoundRect(2, 100, 230, 80, 13), arrayOfTextContainer[keytext].name = "fil" + calcontainername, arrayOfTextContainer[keytext].cursor = "pointer";
      arrayofCalcContainer[keytext].x = 560, arrayofCalcContainer[keytext].y = 30;
      arrayofCalcContainer[keytext].name = "fil" + calcontainername;
      arrayofCalcContainer[keytext].cursor = "pointer";
      arrayofCalcContainer[keytext].addChild(arrayOfTextContainer[keytext]);
      arrayOfTextContainer[keytext].scaleX = arrayOfTextBorder[keytext].scaleX = 1;
      stage.addChild(arrayofCalcContainer[keytext]);
      k = "#696969";
      stage.update();
    }
    arrayOfTextClick[keytext] = 20;
    $('#calculatordialog').dialog('open');

    $('.numbers,.operators,#space').off('click').on('click', function () {
      key = arrayOfTextArray.length;
      key = key - 1;

      arrayOfTextArray[key].name = "fil" + calcontainername;
      if (arrayno && arrayOfTextClick[keytext] == "20") {

        keytext = calcontainername;
        key = calcontainername;
        //console.log("textl");
      } else {
        keytext = calcontainername;
        key = calcontainername;
      }
      if (dbclick_flag) {
        var test;

        for (i = 0; i < arrayofCalcContainer.length; i++) {
          test = arrayofCalcContainer[i].name;
          if (test.replace("fil", "") == arrayno) {
            arrayno = i;
          }
        }
        keytext = arrayno;
        key = arrayno;
        textarrayname = key;
        arrayOfTextBorder[keytext].visible = true;
        color_finder(arrayOfTextArray[key].color);
        if (arrayOfTextArray[key].length > 0) {
          if (arrayOfTextArray[key][0].color) {
            k = (arrayOfTextArray[key][0].color);
            textarrayname = calcontainername;
            color_finder(arrayOfTextArray[key][0].color);
            //console.log("if loop k" + k);
          } else {
            k = arrayOfTextArray[key].color;
            color_finder(arrayOfTextArray[key].color);
          }
        } else {
          k = "#696969";
          $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
        }
        if (arrayOfTextArray[key].color) {
          k = arrayOfTextArray[key].color;
          //console.log("color" + k);
          //console.log("title"+arrayOfTextArray[key].title);
          color_finder(arrayOfTextArray[key].color);
          //$(".color_splash[title='"+arrayOfTextArray[keytext].title+"']").addClass("calc_hover_class");
        }

      }

      var number = $(this).attr("id");
      var text = new createjs.Text(number, "300 57px proximanova", k);
      text.textBaseline = "top";
      text.x = arrayOfTextClick[keytext], text.y = 100;
      text.name = "fil" + keytext;
      text.on("dblclick", function (event) {
        $("#calculatordialog").dialog("open");
        var a = event.target;
        var k = a.name;
        arrayno = k.replace("fil", "");
        keytext = arrayno;
        key = arrayno;
        dbclick_flag = true;
        $("#toolbar").addClass("deselected_toolbar_number_group deselected_toolbar_number_ungroup");
      });
      if (number == 'space') {
        number = "  ";
        var text = new createjs.Text(number);
        arrayOfTextClick[keytext] = arrayOfTextClick[keytext] + 15;
        if (arrayOfTextArray[key].length >= 5) {
          arrayOfTextContainer[keytext].scaleX += 0.12;
          arrayOfTextBorder[keytext].scaleX += 0.12;
          stage.update();
        }
      } else {
        arrayOfTextClick[keytext] = arrayOfTextClick[keytext] + 40;
        if (arrayOfTextArray[key].length >= 5) {
          arrayOfTextContainer[keytext].scaleX += 0.17;
          arrayOfTextBorder[keytext].scaleX += 0.17;
          stage.update();
        }
      }
      arrayOfTextArray[key].push(text);
      arrayofCalcContainer[keytext].addChild(text);
      stage.update();
      if (z != 0) {
        z--;
      }
    });
    arrayOfTextContainer[keytext].off("dblclick");
    arrayOfTextContainer[keytext].on("dblclick", function (event) {
      $("#toolbar").addClass("deselected_toolbar_number_group deselected_toolbar_number_ungroup");
      $("#calculatordialog").dialog("open");
      var a = event.target;
      var k = a.name;
      arrayno = k.replace("fil", "");
      keytext = arrayno;
      key = arrayno;
      dbclick_flag = true;
      //var ne = arrayOfTextArray[keytext].color+"_d";
      color_finder(arrayOfTextArray[arrayno].color);
      arrayOfTextBorder[keytext].visible = true;
    });
    arrayOfTextContainer[keytext].on("click", function (event) {
      $("#toolbar").addClass("deselected_toolbar_number_group deselected_toolbar_number_ungroup");
    });
    pressmovecalc(stage, arrayofCalcContainer[keytext]);
    arrayofCalcContainer[keytext].on("click", function (evt) {
      $("#toolbar").addClass("deselected_toolbar_number_group deselected_toolbar_number_ungroup");
      var fil = evt.target.name;
      arr = fil.replace("fil", "");
      deselectShape();
      arrayOfTextBorder[arr].visible = true;
      $(".trash").off("click").on("click", function (evt) {
        var result = removeSelectedObj(stage, arrayOfTextContainer, arrayofCalcContainer, stage, fil, arrayOfTextArray, arrayOfTextClick, arrayOfTextBorder);
        //console.log("result " + result);
        if (result == 0) {
          $('#calculatordialog').dialog('close');
          //console.log("we are here");
          $('.trash').off("click").on('click', trash);
        }
        if (result == 1) {
          calcontainername = calcontainername - 1;
          keytext = keytext - 1;
          key = key - 1;
          textarrayname--;
          $('.trash').off("click").on('click', trash);
        }
        stage.update();
      });
    });
    //calcStatus = true;
    deselectShape();
    keytext = arrayOfTextContainer.length;
    keytext = keytext - 1;
    arrayOfTextBorder[keytext].visible = true;
    mouseDownAtEmpty();
  }

  $('#backspace').on('click', function () {
    for (z = 0; z <= arrayOfTextArray[key].length; z++) {
      if (arrayOfTextArray[key].slice().reverse()[z].text == null || arrayOfTextArray[key].slice().reverse()[z].text == "  " || arrayOfTextArray[key].slice().reverse()[z].text == "") {
        arrayOfTextClick[keytext] = arrayOfTextClick[keytext] - 15;
        //console.log("we are in empty");
        if (arrayOfTextArray[key].length > 5) {
          arrayOfTextContainer[keytext].scaleX -= 0.12;
          arrayOfTextBorder[keytext].scaleX -= 0.12;
          //console.log("scaledx minus");
          stage.update();
        }
      } else {
        arrayOfTextClick[keytext] = arrayOfTextClick[keytext] - 40;
        //console.log("text is present");
        if (arrayOfTextArray[key].length > 5) {
          arrayOfTextContainer[keytext].scaleX -= 0.17;
          arrayOfTextBorder[keytext].scaleX -= 0.17;
          //console.log("scaledx minus");
          stage.update();
        }
      }
      arrayofCalcContainer[keytext].removeChild(arrayOfTextArray[key].slice().reverse()[z]);
      arrayOfTextArray[key].pop();
      //console.log(z);
      stage.update();
      break;
    }
  });
  /**
   * color_finder
   * @param {type} k
   * @returns {undefined}
   */
  function color_finder(k) {
    $(".color_splash").removeClass("calc_hover_class");
    switch (k) {
      case "#f25050":
        //console.log("Red Text");
        $(".color_splash[title='Red Text']").addClass("calc_hover_class");
        break;
      case "#ffa200":
        //console.log("Orange Text");
        $(".color_splash[title='Orange Text']").addClass("calc_hover_class");
        break;
      case "#6cae28":
        //console.log("Green Text");
        $(".color_splash[title='Green Text']").addClass("calc_hover_class");
        break;
      case "#22b9cd":
        //console.log("Blue Text");
        $(".color_splash[title='Blue Text']").addClass("calc_hover_class");
        break;
      default:
        //default 
        //console.log("Gray Text");
        $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
    }

  }

  /**
   * calc_clone
   * @returns {undefined}
   */
  function calc_clone() {
    mouseDownAtEmpty();
    if (arrayofCalcContainer != 0) {

      while (arrayOfTextContainer[keytext] === undefined) {
        keytext = keytext - 1;
        arrayOfTextClick.push(arrayOfTextClick[keytext]);
      }
      for (i = 0; i < arrayOfTextBorder.length; i++) {
        arrayOfTextBorder[i].visible = false;
      }
      //containercalc.removeChild(calcTextBorder);
      //arrayOfTextBorder[keytext].scaleX = 1;
      calcontainername = calcontainername + 1;
      //arrayno = keytext;
      cl = arrayOfTextContainer[keytext].clone(false);
      cl.name = "fil" + calcontainername;
      //console.log("calcontainername" + calcontainername);
      cl.scaleX = 1;
      var calc = arrayofCalcContainer[keytext].clone(false);
      calc.x = 560;
      calc.y = 30;
      calc.name = "fil" + calcontainername;
      calc.cursor = "pointer";
      k = "#696969";
      arrayOfTextContainer.push(cl);
      //containercalc = calc;
      arrayOfTextClick[calcontainername] = 20;
      //arrayOfTextContainer[keytext].alpha = 0.6;
      textContainerBorder(calc);

      textArray = new Array();
      arrayOfTextArray.push(textArray);
      calc.addChild(cl);
      arrayofCalcContainer.push(calc);
      stage.addChild(calc);
      calc_close = false;
      //console.log(arrayOfTextClick);
      stage.update();

      //keytext = keytext + 1;
      for (i = 0; i < arrayOfTextContainer.length; i++) {
        arrayOfTextContainer[i].off("dblclick");
        arrayOfTextContainer[i].on("dblclick", function (event) {
          $("#toolbar").addClass("deselected_toolbar_number_group deselected_toolbar_number_ungroup");
          $("#calculatordialog").dialog("open");
          var a = event.target;
          var k = a.name;
          arrayno = k.replace("fil", "");
          keytext = arrayno;
          key = arrayno;
          dbclick_flag = true;
          color_finder(arrayOfTextArray[arrayno].color);
          deselectShape();
          arrayOfTextBorder[arrayno].visible = true;
        });
        arrayOfTextContainer[i].on("click", function (event) {
          $("#toolbar").addClass("deselected_toolbar_number_group deselected_toolbar_number_ungroup");
        });
      }

      calc.on("click", function (evt) {
        //console.log(evt.target.name);
        var fil = evt.target.name;
        arr = fil.replace("fil", "");
        //console.log("arr value " + arr);
        //highlight_calc(keytext);
        //arrayOfTextContainer[keytext].alpha = 1;
        deselectShape();
        arrayOfTextBorder[arr].visible = true;
        $(".trash").off("click").on("click", function (evt) {
          var result = removeSelectedObj(stage, arrayOfTextContainer, arrayofCalcContainer, stage, fil, arrayOfTextArray, arrayOfTextClick, arrayOfTextBorder);
          if (result == 0) {
            $('#calculatordialog').dialog('close');
            $('.trash').off("click").on('click', trash);
          }
          if (result == 1) {
            calcontainername = calcontainername - 1;
            keytext = keytext - 1;
            key = key - 1;
            textarrayname--;
            $('.trash').off("click").on('click', trash);
          }
          stage.update();

        });
      });


      keytext = keytext + 1;
      key = key + 1;
      textarrayname++;
      if (calc_close == false) {
        $('#calculatordialog').dialog('open');
        for (i = 0; i < arrayOfTextContainer.length; i++) {
          pressmovecalc(stage, arrayofCalcContainer[i]);
        }
      }
    } else {
      handleKeypad();
    }

    //for removing calculator selection
    for (i = 0; i < arrayOfTextBorder.length - 1; i++) {
      arrayOfTextBorder[i].visible = false;
    }
    arrayOfTextBorder[arrayOfTextBorder.length - 1].visible = true;
  }

  $("#calculatordialog").dialog({
    autoOpen: false,
    modal: false,
    width: 240,
    height: 400,
    //position: { 'my': 'center', 'at': 'center' },
    resizable: false,
    open: function () {
      $('.keypad').off('click').on('click', function () {
        $('#calculatordialog').dialog('close');
        if (calc_close) {
          $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
          calc_clone();
          for (i = 0; i < arrayOfTextContainer.length; i++) {
            pressmovecalc(stage, arrayofCalcContainer[i]);
          }
        } else {
          handleKeypad();
          $(".color_splash").removeClass("calc_hover_class");
          $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
        }
      });
      $('.close_icon').off('click').on('click', function () {
        $('#calculatordialog').dialog('close');
        calc_close = true;
        dbclick_flag = false;
        $(".color_splash").removeClass("calc_hover_class");
      });
      //multiSelection();
      mouseDownAtEmpty();
    },
    close: function () {
      $('.keypad').on('click', function () {
        $('#calculatordialog').dialog('open');
      });
    }

  });


  /**
   * Function to create the bitmap images on page load
   * @param {type} bitmap
   * @returns {unresolved}
   */
  function preload_bitmap(bitmap) {

    //var colors = ["red","orange","yellow","green", "blue", "gray"];
    var shapeType = ["hexagon", "square", "trapezoid", "rhombus", "triangle", "shapex"];
    var colors = ["yellow", "blue", "green", "orange", "red", "beige"];
    //var shapeType = ["hexagon"];
    for (var c in  colors) {
      var color = colors[c];
      for (var cnt in shapeType) {
        var type = shapeType[cnt];
        var bitmapimg = new createjs.Bitmap(pbImagePath + "/" + type + "/" + type + "_" + color + ".png");
        bitmap[type + "_" + color] = bitmapimg;
        var bitmapimg_hover = new createjs.Bitmap(pbImagePath + "/" + type + "/" + type + "_" + color + "_hover.png");
        bitmap[type + "_" + color + "_hover"] = bitmapimg_hover;
        var bitmapimg_selected = new createjs.Bitmap(pbImagePath + "/" + type + "/" + type + "_" + color + "_hover.png");
        bitmap[type + "_" + color + "_selected"] = bitmapimg_selected;
        var bitmapimg_rotate = new createjs.Bitmap(pbImagePath + "/" + type + "/" + type + "_rotate.png");
        bitmap[type + "_rotate"] = bitmapimg_rotate;


      }
    }

    var startUpMsg = new createjs.Bitmap(pbImagePath + "/start_here_animation.png");
    bitmap["startUpMsg"] = startUpMsg;
    var cm4klink = new createjs.Bitmap(pbImagePath + '/topmenu/cm4k_link.png');
    bitmap["cm4klink"] = cm4klink;
    var cm4klink2 = new createjs.Bitmap(pbImagePath + '/topmenu/cm4k_link.png');
    bitmap["cm4klink2"] = cm4klink2;
    var cm4k_hover = new createjs.Bitmap(pbImagePath + '/topmenu/cm4k_hover.png');
    bitmap["cm4k_hover"] = cm4k_hover;
    var title = new createjs.Bitmap(pbImagePath + '/topmenu/title.png');
    bitmap["title"] = title;
    var divider1 = new createjs.Bitmap(pbImagePath + '/topmenu/divider.png');
    bitmap["divider1"] = divider1;
    var divider2 = new createjs.Bitmap(pbImagePath + '/topmenu/divider.png');
    bitmap["divider2"] = divider2;
    var divider3 = new createjs.Bitmap(pbImagePath + '/topmenu/divider.png');
    bitmap["divider3"] = divider3;
    var divider4 = new createjs.Bitmap(pbImagePath + '/topmenu/divider.png');
    bitmap["divider4"] = divider4;

    //1 Icon
    var hexagon = new createjs.Bitmap(pbImagePath + '/topmenu/hexagon.png');
    bitmap["hexagon"] = hexagon;
    var hexagon_hover = new createjs.Bitmap(pbImagePath + '/topmenu/hexagon_hover.png');
    bitmap["hexagon_hover"] = hexagon_hover;
    var square = new createjs.Bitmap(pbImagePath + '/topmenu/square.png');
    bitmap["square"] = square;
    var square_hover = new createjs.Bitmap(pbImagePath + '/topmenu/square_hover.png');
    bitmap["square_hover"] = square_hover;
    var trapezoid = new createjs.Bitmap(pbImagePath + '/topmenu/trapezoid.png');
    bitmap["trapezoid"] = trapezoid;
    var trapezoid_hover = new createjs.Bitmap(pbImagePath + '/topmenu/trapezoid_hover.png');
    bitmap["trapezoid_hover"] = trapezoid_hover;
    var rhombus = new createjs.Bitmap(pbImagePath + '/topmenu/rhombus.png');
    bitmap["rhombus"] = rhombus;
    var rhombus_hover = new createjs.Bitmap(pbImagePath + '/topmenu/rhombus_hover.png');
    bitmap["rhombus_hover"] = rhombus_hover;
    var triangle = new createjs.Bitmap(pbImagePath + '/topmenu/triangle.png');
    bitmap["triangle"] = triangle;
    var triangle_hover = new createjs.Bitmap(pbImagePath + '/topmenu/triangle_hover.png');
    bitmap["triangle_hover"] = triangle_hover;
    var shapex = new createjs.Bitmap(pbImagePath + '/topmenu/shapex.png');
    bitmap["shapex"] = shapex;
    var shapex_hover = new createjs.Bitmap(pbImagePath + '/topmenu/shapex_hover.png');
    bitmap["shapex_hover"] = shapex_hover;
	var protractor = new createjs.Bitmap(pbImagePath + '/topmenu/protractor.png');
    bitmap["protractor"] = protractor;
	var protractor_hover = new createjs.Bitmap(pbImagePath + '/topmenu/protractor_hover.png');
    bitmap["protractor_hover"] = protractor_hover;
    var patternbutton = new createjs.Bitmap(pbImagePath + '/topmenu/pattern-button.png');
    bitmap["patternbutton"] = patternbutton;
    var patternbutton_hover = new createjs.Bitmap(pbImagePath + '/topmenu/pattern-button_hover.png');
    bitmap["patternbutton_hover"] = patternbutton_hover;

    var pattern_puzzles_title = new createjs.Bitmap(pbImagePath + '/topmenu/pattern-puzzles.png');
    bitmap["pattern_puzzles_title"] = pattern_puzzles_title;



    var patternA = ['snow1', 'snow2', 'snow3', 'snow4', 'flower1', 'flower2', 'flower3', 'flower4', 'wheel', 'tree', 'heart', 'train', 'dino', 'duck', 'bunny', 'rocket'];
    for (var pt in patternA) {
      bitmap["pattern_" + patternA[pt]] = new createjs.Bitmap(pbImagePath + '/pattern/pattern-' + patternA[pt] + '.png');
      bitmap["pattern_" + patternA[pt] + "_sol"] = new createjs.Bitmap(pbImagePath + '/pattern/pattern-' + patternA[pt] + '-sol.png');
      bitmap["pattern_" + patternA[pt] + "_sel"] = new createjs.Bitmap(pbImagePath + '/pattern/pattern-' + patternA[pt] + '-sel.png');
    }

    var solution = ['show', 'hide'];
    for (var s in solution) {
      bitmap[solution[s] + "-solution"] = new createjs.Bitmap(pbImagePath + '/pattern/' + solution[s] + '-solution.png');
      bitmap[solution[s] + "-solution-hover"] = new createjs.Bitmap(pbImagePath + '/pattern/' + solution[s] + '-solution-hover.png');
    }

    var patternbutton_hover = new createjs.Bitmap(pbImagePath + '/topmenu/pattern-button_hover.png');
    bitmap["patternbutton_hover"] = patternbutton_hover;

    return bitmap;
  }
  /* custom tool tip ends here */
  /* clear-workspace script starts here  */
  $("#clear_all").on('click', function () {
    $("#startover-message").dialog("open");
  });
  $("#startover-message").dialog({
    autoOpen: false,
    modal: true,
    open: function () {
      $('#startover-message .no').on('click', function () {
        $('#startover-message').dialog('close');
      });
      $('#startover-message .yes').off('click').on('click', function () {
        clearAllMyWork();
        //removePurpleTicks();
        $('#startover-message').dialog('close');
      });
    },
    title: "Clear your work?"
  });

  function clearAllMyWork() {
    if ($('#calculatordialog').dialog('isOpen')) {
      $('#calculatordialog').dialog('close');
    }
    //clickedColor = "#3ecfe1"; 
    //x = "#3ecfe1";
    if ($(".open_toolbar").hasClass("selected")) {
      $("#button_options").toggle();
      $(".open_toolbar").removeClass("selected");
      $(".duplicate_frame_image").off("click", handleDuplicate).on("click", handleDuplicate);
      $('.keypad').on("click", handleKeypad);
      //$('.trash').on('click', handleTrash);
      $("#top_menu_overlay").css("display", "none");
      $("#toolbar").removeClass("deselected_toolbar");
      if ($(".pick_color").hasClass("hover_class")) {
        $(".pick_color").removeClass("hover_class");
      }
      if ($("#drawing_eraser").hasClass("eraser_image_selected")) {
        $("#drawing_eraser").removeClass("eraser_image_selected");
        $("#drawing_eraser").addClass("eraser_image");
      }
    }
    $("#workspace").removeClass("cursor_canvas");
    stage.removeAllChildren();
    //stage.update();
    selectedShapes = [];
    deselectedShapes = [];
    puzzleArray = [];
    bitmaps = [];
    clearDrawings();
    //calculator
    arrayOfTextArray = [];
    arrayOfTextContainer = [];
    arrayofCalcContainer = [];
    arrayOfTextClick = [];
    textarray = [];
    arrayOfTextBorder = [];
    setTopHeaderIcons();
    //protractor 
	protractor.getChildByName("protractorIcon").image = protractorImage;
    protractor.clicked = false;
	protractor.hover = false;
    //protractorCont.visible;
    mouseDownAtEmpty();
    multiSelection();
    stage.update();
  }

  /* multi-selection starts here */
  function multiSelection() {
    var mousePressed = false;
    //mousedown
    stage.on("stagemousedown", function (e) {
      if (stage._getObjectsUnderPoint(stage.mouseX, stage.mouseY) == null) {
        $("#workspace").addClass("cursor_canvas");
        mousePressed = true;
        dotted_line = new createjs.Shape();
        dotted_line.name = 'dotted_line';
        dotted_line.cursor = "crosshair";
        dotted_line.graphics.setStrokeStyle(7, "round", "round").beginStroke("#FEB942").beginFill("rgba(255,255,255,.01)");
        dotted_line.graphics.closePath();
        stage.addChild(dotted_line);
        stage.update();
      }
    });
    //mouseup
    stage.on("stagemouseup", function (e) {
      if (mousePressed) {
        $("#workspace").removeClass("cursor_canvas");
        mousePressed = false;

        d = [];
        //console.log('before--');
        //console.log(deselectedShapes);
        if (deselectedShapes.length > 0) {
          //alert(deselectedShapes.length);console.log(deselectedShapes);
          for (i = 0; i < deselectedShapes.length; i++) {
            if (deselectedShapes[i].parent) {
              var e = deselectedShapes[i].parent.localToLocal(deselectedShapes[i].x, deselectedShapes[i].y, stage);
              if (dotted_line.hitTest(e.x, e.y)) {
                d.push(deselectedShapes[i]);
              }
            }
          }
        }
        //console.log('multiselection ---');
        //console.log(d);

        if (d.length > 0) {
          for (x = 0; x < d.length; x++) {
            var object = d[x];
            selectShape(object);
          }
        }
        stage.removeChild(dotted_line);
        stage.update();
      }
    });
    //mousemove
    stage.on("stagemousemove", function (evt) {
      if (mousePressed) {
        dotted_line.graphics.lineTo(evt.stageX, evt.stageY);
        stage.update();
      }
    });
    //mouseleave
    stage.on("stagemouseleave", function (e) {
      mousePressed = false;
    });
  }
  multiSelection();

  /**
   * deselect the calculator shape
   * @returns {Boolean}
   */
  function deselect() {
    //for removing calculator selection  
    for (i = 0; i < arrayOfTextBorder.length; i++) {
      arrayOfTextBorder[i].visible = false;
    }
    //$('.trash').off("click").on('click', trash);
    stage.update();
  }

  if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
    mobile = true;
  } else {
    mobile = false;
  }
  /* custom tool tip starts here */
  if (mobile === false) {
    $("#toolbar .left-icon").on("mouseover", function (evt) {
      $("#toolbar").addClass('toolbar_hover');
      $(this).find('.custom-tool-tip').remove();
      var hovertext = $(this).attr("hovertext");
      $(this).append('<span class="custom-tool-tip ' + hovertext + '"></span>');
    });
    $("#toolbar .left-icon").on("mouseout", function (evt) {
      $(this).find('.custom-tool-tip').remove();
      $("#toolbar").find('.toolbar_hover').remove();
      $("#toolbar").removeClass('toolbar_hover');
    });
    $("#pen_icons .pen_tool_icons").on("mouseover", function () {
      $("#button_options").addClass('pentool_hover');
      $(this).find('.custom-tool-tip').remove();
      var hovertext = $(this).attr("hovertext");
      $(this).append('<span class="custom-tool-tip ' + hovertext + '"></span>');
    });
    $("#pen_icons .pen_tool_icons").on("mouseout", function () {
      $(this).find('.custom-tool-tip').remove();
      $("#button_options").find('.pentool_hover').remove();
      $("#button_options").removeClass('pentool_hover');
    });
  }

});