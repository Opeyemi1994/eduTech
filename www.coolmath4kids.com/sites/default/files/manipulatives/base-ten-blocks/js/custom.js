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
  var one = new createjs.Container;
  var ten = new createjs.Container;
  var hundred = new createjs.Container;
  var rulerIconCont = new createjs.Container;
  var wrapper = new createjs.Container();
  
  //array variables
  var selectedBlocks = new Array();
  var deSelectedBlocks = new Array();
  var objectList = new Array();
  var matArray = new Array();
  var stripArray = new Array();
  var bitmaps = new Array();
  var cm_height;
  /*default variables starts here*/
  var da = 28, sa = 1;
  var nbImagePath = "/sites/default/files/manipulatives/base-ten-blocks/images/number_blocks";
  /*default variables ends here*/

  //enable mouse events 
  stage.enableMouseOver(50);
  stage.enableDOMEvents(true);
  createjs.Touch.enable(stage);
  var canvas = document.getElementById('workspace');
  canvas.onselectstart = function () {
    return false;
  };

//disable toolbar event
  function disable_toolbar() {
    var childrenCount = stage.getNumChildren();
    //console.log(childrenCount);	  
    if (childrenCount > 0) {
      $("#toolbar").unwrap();
      //$("#toolbar").removeClass("deselected_toolbar");
      //$('.keypad').off('click', handleKeypad).on('click', handleKeypad);
      $(".color_icons").off("click", updateColors).on("click", updateColors);
      $(".rotate_table_image").off('click', rotateBlock).on('click', rotateBlock);
      $(".duplicate_frame_image").off('click', handleClone).on('click', handleClone);
      $('.trash').off('click', trash).on('click', trash);
      $("#toolbar").removeClass("deselected_toolbar_number_group");
      $("#toolbar").removeClass("deselected_toolbar_number_ungroup");
      $("#toolbar").removeClass("deselected_toolbar_number_calc");
      //$("#drawing_pen").removeClass("pen_image_selected");
      //$("#drawing_pen").addClass("pen_image");
      //$("#top_menu_overlay").css("display", "none");
      $("#toolbar").removeClass("deselected_toolbar");
      $(".pick_color").removeClass("hover_class");

    } else {
      $("#toolbar").wrap("<div class='disable-left-tray'></div>");
      $("#toolbar").addClass("deselected_toolbar");
      $("#toolbar").addClass("deselected_toolbar_number_group");
      $("#toolbar").addClass("deselected_toolbar_number_ungroup");
      $("#toolbar").addClass("deselected_toolbar_number_calc");
      $(".duplicate_frame_image").off('click');
      $(".rotate_table_image").off("click");   // disabling rotateFrame
      //$(".keypad").off("click");
      $(".color_icons").off("click");
      $(".trash").off('click');
    }
  }
  disable_toolbar();

  //Bitmap Preload
  var bitmapArray = preload_bitmap(bitmaps);

  //Onload show a startup message and hide after 4 seconds
  var startUpMsg = new createjs.Bitmap(nbImagePath+"/start_here_animation.png");
  startUpMsg.name = "startmsg";
  startUpMsg.x = 345;
  startUpMsg.y = 100;
  stage.addChild(startUpMsg);
  stage.update();

  createjs.Ticker.addEventListener("tick", tickevent);
  function tickevent() {
    stage.update();
  }

//for paint

  //Setting dynamic width to canvas
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = 1100;
  //$(".manipulatives #toolbar").height(stage.canvas.height);
  if (window.innerHeight > 1100) {
    stage.canvas.height = window.innerHeight;   
  }
 
  $(window).resize(function () {  
    stage.canvas.width = window.innerWidth;
    if (window.innerHeight > 1100) {
      stage.canvas.height = window.innerHeight;
    }else{
      stage.canvas.height = 1100;      
    }
    cm_width = window.innerWidth;
    cm_height = stage.canvas.height;
    //topMenuPosition();
    //for dragging paint tool and calculator dialog 
    drag_toolbar();
	wrapper.cache(30, 90, cm_width, cm_height);
  });


  cm_height = stage.canvas.height;
  var cm_width = window.innerWidth;
  var label, shape, oldX, oldY, size, color;
  var p;
  var penArray = new Array();
  var i;
  var j;

  //Pen Tool
  /*
   * Pen Tool code begin
   * Functions below for canvas drawings
   */
  var flag = false;
  //color of line
  var pen_color = "#3ecfe1";

  //var size = 6;
  //eraser color
  var y = "#000001";
  //shape creation for all lines graphics
  //shape = new createjs.Shape();
  //pen tool
  shape = new createjs.Shape();
  stage.addChild(shape);
  // stage.addChild(shape);

  //initial tool bar opens with options
  var c = new Array();
  var paintOpen = false;
  //initial tool bar opens with options
  function drag_toolbar(){
	  jQuery("#button_options").draggable({
		//containment: [46, 90, 1281, 750]
		  containment: [46, 90, window.innerWidth-100, window.innerHeight]
	  });
	  jQuery("#calculatordialog").draggable({
		//containment: [50, 95, 1120, 740]
		  containment: [50, 95, window.innerWidth - 250, window.innerHeight]
	  });
  }
  
  drag_toolbar();
  /*var wrapper = new createjs.Container();
  var wide = window.innerWidth;
  wrapper.hitArea = new createjs.Shape(new createjs.Graphics().dr(30, 90, wide, 1100));
  wrapper.cache(30, 90, wide, 1100); // Caching the wrapper*/

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
    } else {
      $("#toolbar").wrap("<div class='disable-left-tray'></div>");
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
      $(".color_icons").off("click", updateColors).on("click", updateColors);
      $(".rotate_table_image").off('click', rotateBlock).on('click', rotateBlock);
      $(".duplicate_frame_image").off('click', handleClone).on('click', handleClone);
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
      //deselect();
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
      $(".color_icons").off("click", updateColors).on("click", updateColors);
      $(".rotate_table_image").off('click', rotateBlock).on('click', rotateBlock);
      $(".duplicate_frame_image").off('click', handleClone).on('click', handleClone);
      $('.trash').off('click', trash).on('click', trash);
      $("#workspace").addClass("cursor_canvas");
      $("#workspace").removeClass("cursor_canvas");
      multiSelection();
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

  /**
   * remove TargetContainer
   */
  function removeTargetContainer(targetContainer) {
    stage.removeChild(targetContainer);
    stage.update();
  }

  /**
   * set Top Header Icons
   */
  function setTopHeaderIcons() {
    //Draw left frame background
    background = new createjs.Shape;
    background.graphics.beginFill("#ffffff").drawRect(0, 0, 8000, 87);

    background.shadow = new createjs.Shadow('#DBDBDB', 3, 3, 3);
    container.addChild(background);

    //Draw top menu icons bitmap
    var cm4klink = bitmapArray['cm4klink'];
    cm4klink.y = 10;
    cm4klink.x = 37;
    container.addChild(cm4klink);
    cm4klink.cursor = 'pointer';
    cm4klink.on('click', function () {
      location.href = location.origin + '/manipulatives';
    });
    cm4klink.on("mouseover", function (evt) {
      var cm4klinkHoverimg = bitmapArray['cm4k_hover'];
      cm4klink.image = cm4klinkHoverimg.image;
      cm4klink.x = 37;
      cm4klink.y = 10;
    });
    cm4klink.on("mouseout", function (evt) {
      var cm4klinkHoverimg = bitmapArray['cm4klink2'];
      cm4klink.image = cm4klinkHoverimg.image;
      cm4klink.x = 37;
      cm4klink.y = 10;
    });
    var title = bitmapArray['title'];
    title.x = 37;
    title.y = 30;
    container.addChild(title);

    var separatorone = bitmapArray['divider1'];
    separatorone.x = 286;
    separatorone.y = 18;
    container.addChild(separatorone);

    //one
    var onenumber = bitmapArray['onenumber'];
    onenumber.x = 324;
    onenumber.y = 36;
    container.addChild(onenumber);
    var oneicon = bitmapArray['oneicon'];
    one.x = 344;
    one.y = 33;
    one.cursor = "pointer";
    one.on("mouseover", function () {
      var oneHoverimg = bitmapArray['oneicon_hover'];
      oneicon.image = oneHoverimg.image;
      one.x = 336;
      one.y = 25;
    });
    one.on("mouseout", function () {
      var oneicon2 = bitmapArray['oneicon2'];
      oneicon.image = oneicon2.image;
      one.x = 344;
      one.y = 33;
    });
    one.addChild(oneicon);
    container.addChild(one);

    //separator
    var separatortwo = bitmapArray['divider2'];
    separatortwo.x = 415;
    separatortwo.y = 18;
    container.addChild(separatortwo);

    //ten
    var tennumber = bitmapArray['tennumber'];
    tennumber.x = 458;
    tennumber.y = 36;
    container.addChild(tennumber);
    var tenicon = bitmapArray['tenicon'];
    ten.x = 487;
    ten.y = 35;
    ten.cursor = "pointer";
    ten.on("mouseover", function () {
      var oneHoverimg = bitmapArray['tenicon_hover'];
      tenicon.image = oneHoverimg.image;
      ten.x = 479;
      ten.y = 27;
    });
    ten.on("mouseout", function () {
      var oneHoverimg = bitmapArray['tenicon2'];
      tenicon.image = oneHoverimg.image;
      ten.x = 487;
      ten.y = 35;
    });
    ten.addChild(tenicon);
    container.addChild(ten);

    //separator
    var separatorthree = bitmapArray['divider3'];
    separatorthree.x = 691;
    separatorthree.y = 18;
    container.addChild(separatorthree);

    //hundred
    var hundrednumber = bitmapArray['hundrednumber'];
    hundrednumber.x = 733;
    hundrednumber.y = 36;
    container.addChild(hundrednumber);
    var hundredicon = bitmapArray['hundredicon'];
    hundred.x = 778;
    hundred.y = 10;
    hundred.cursor = "pointer";
    hundred.on("mouseover", function () {
      var oneHoverimg = bitmapArray['hundredicon_hover'];
      hundredicon.image = oneHoverimg.image;
      hundred.x = 772;
      hundred.y = 5;
    });
    hundred.on("mouseout", function () {
      var oneHoverimg = bitmapArray['hundredicon2'];
      hundredicon.image = oneHoverimg.image;
      hundred.x = 778;
      hundred.y = 10;
    });
    hundred.addChild(hundredicon);
    container.addChild(hundred);

    //separator
    var separatorfour = bitmapArray['divider4'];
    separatorfour.x = 898;
    separatorfour.y = 18;
    container.addChild(separatorfour);

    //separator
    var rulertitle = bitmapArray['rulertitle'];
    rulertitle.x = 940;
    rulertitle.y = 33;
    container.addChild(rulertitle);

    //ruler
    var rulericon = bitmapArray['rulericon'];
    rulerIconCont.x = 1008;
    rulerIconCont.y = 33;
    rulerIconCont.cursor = "pointer";
    rulerIconCont.on("mouseover", function (evt) {
      var oneHoverimg = bitmapArray['rulericon_hover'];
      rulericon.image = oneHoverimg.image;
      rulerIconCont.x = 1001;
      rulerIconCont.y = 26;
    });
    rulerIconCont.on("mouseout", function (evt) {
      var oneHoverimg = bitmapArray['rulericon2'];
      rulericon.image = oneHoverimg.image;
      rulerIconCont.x = 1008;
      rulerIconCont.y = 33;
    });
    rulerIconCont.addChild(rulericon);
    container.addChild(rulerIconCont);

    //add container 
    stage.addChild(container);
    stage.update();

    //press up functions for all top icons
    one.removeAllEventListeners('pressup');
    one.on("pressup", function (evt) {
      removeTargetContainer(oneContainer);
      if (evt.stageY > 110) {
        one.cursor = "pointer";
        color = 'blue';
        clone(evt, color, 1);
      }
    });
    ten.removeAllEventListeners('pressup');
    ten.on("pressup", function (evt) {
      removeTargetContainer(tenContainer);
      if (evt.stageY > 110) {
        one.cursor = "pointer";
        color = 'blue';
        clone(evt, color, 10);
      }
    });
    hundred.removeAllEventListeners('pressup');
    hundred.on("pressup", function (evt) {
      removeTargetContainer(hundredContainer);
      if (evt.stageY > 110) {
        one.cursor = "pointer";
        color = 'blue';
        clone(evt, color, 100);
      }
    });
    rulerIconCont.removeAllEventListeners('pressup');
    rulerIconCont.on("pressup", function (evt) {
      removeTargetContainer(rulerContainer);
      x = evt.stageX;
      y = evt.stageY;
      if (evt.stageY > 110) {
        createRuler(30, 290, x, y);
      }
    });
  }
  
  //click functions for all top icons
    one.removeAllEventListeners('click');
    one.on("click", function (evt) {
      disable_toolbar();
      clone(evt, 'blue', 1);
    });
    ten.removeAllEventListeners('click');
    ten.on("click", function (evt) {
      disable_toolbar();
      clone(evt, 'blue', 10);
    });
    hundred.removeAllEventListeners('click');
    hundred.on("click", function (evt) {
      disable_toolbar();
      clone(evt, 'blue', 100);
    });
	rulerIconCont.on("click", function (evt) {
      x = 1180;
      y = 135;
      createRuler(30, 290, x, y);
    });

  /*clone objects on mousedown starts here*/
  var oneContainer = new createjs.Container;
  var tenContainer = new createjs.Container;
  var hundredContainer = new createjs.Container;
  var rulerContainer = new createjs.Container;
  //one
  one.on("mousedown", function () {
    var tempicon = new createjs.Bitmap(nbImagePath+"/topmenu/1_header.png");
    one.on("pressmove", function (evt) {
      //tempicon.height = tempicon.height + 0.3;
      disable_toolbar();
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      oneContainer.addChild(tempicon);
      stage.addChild(oneContainer);
    });
  });
  //ten
  ten.on("mousedown", function () {
    var tempicon = new createjs.Bitmap(nbImagePath+"/topmenu/10_header.png");
    ten.on("pressmove", function (evt) {
      disable_toolbar();
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      tempicon.selected = 1;
      tenContainer.addChild(tempicon);
      stage.addChild(tenContainer);
    });
  });
  //hundred
  hundred.on("mousedown", function () {
    var tempicon = new createjs.Bitmap(nbImagePath+"/topmenu/100_header.png");
    hundred.on("pressmove", function (evt) {
      disable_toolbar();
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      tempicon.selected = 1;
      hundredContainer.addChild(tempicon);
      stage.addChild(hundredContainer);
    });
  });
  //rulerIconCont
  rulerIconCont.on("mousedown", function () {
    var tempicon = new createjs.Bitmap(nbImagePath+"/topmenu/ruler.png");
    rulerIconCont.on("pressmove", function (evt) {
      disable_toolbar();
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      tempicon.selected = 1;
      rulerContainer.addChild(tempicon);
      stage.addChild(rulerContainer);
    });
  });
  /*clone objects on mousedown ends here*/

//function to create ruler
  // function to create ruler
  var rulerArray = new Array();
  var rulerSelected = 0;
  function createRuler(width, length, x, y) {
    deselect();
    var rulerCont = new createjs.Container();
    var ruler = new createjs.Shape();
    if(x < 200){
		x = 200;
	}
	if(x > (cm_width - 100)){
		x = cm_width - 170;
	}
	rulerCont.x = x;
    rulerCont.y = y;
    rulerCont.length = length;
    rulerCont.width = width;
    rulerCont.orientation = 0;
    rulerCont.regX = length / 2;
    rulerCont.regY = width / 2;
    var spacing = 30 - 1;
    var arrow = new createjs.Bitmap(nbImagePath+'/arrow.png');
    var k;
    k = Math.floor((length - 5) / spacing);

    //For grey highlight
    var q = rulerCont.length, r = rulerCont.width;
    var yy = -1.5, zz = yy, A = q, B = 1.5 + r;

    ruler.graphics.setStrokeStyle(2.5).beginStroke("#c3c3c3");
	
    ruler.graphics.moveTo(yy, zz).lineTo(A + 5.5, zz).lineTo(A+21, 15).lineTo(A + 5.5 , B).lineTo(yy, B).lineTo(yy, zz).endStroke();  //rulerCont.addChild(highlight);

    ruler.graphics.beginFill("#ffffff");
    ruler.graphics.lineTo(length, 0).lineTo(length, width).lineTo(0, width).lineTo(0, 0).endStroke().endFill();

    ruler.graphics.moveTo(0, 3);
    ruler.graphics.beginStroke("#d7ffcc").setStrokeStyle(7);
    ruler.graphics.lineTo(length, 3).moveTo(length, width - 3).lineTo(0, width - 3).endStroke();
    rulerCont.addChild(ruler);
    //  rulerCont.addChild(arrow);
    stage.addChild(rulerCont);
    stage.update();

    arrow.x = length;
    arrow.y = 15;
    //arrow.regX = arrow.image.width/2;
    //arrow.regY = arrow.image.height/2;
    arrow.regX = 0;
    arrow.regY = 15.5;
    arrow.cursor = "pointer";
    for (var i = 1; i <= k; i++) {
      var text = new createjs.Text(i, "11px Helvetica ", "#3f3f3f");
      text.x = (i <= 9) ? spacing * i - 2.1 : spacing * i - 6;
      text.y = 10;
      text.type = "numbers";
      rulerCont.addChild(text);
      stage.update();
      ruler.graphics.beginStroke("#7b7b7b").setStrokeStyle(1.5);
      ruler.graphics.moveTo(spacing * i, -0.5);
      ruler.graphics.lineTo(spacing * i, 7);
      ruler.graphics.moveTo(spacing * i, 24).lineTo(spacing * i, 30.5);
    }
	arrow.on("mouseover", function (e) {
      var oneHoverimg = new createjs.Bitmap(nbImagePath+'/arrow_select.png');
      arrow.image = oneHoverimg.image;
    });
    arrow.on("mouseout", function () {
      var oneHoverimg = new createjs.Bitmap(nbImagePath+'/arrow.png');
      arrow.image = oneHoverimg.image;
    });

// rulerCont.addChild(text);
    rulerCont.addChild(arrow);
    selectRuler(rulerCont);
    stage.update();

    // dragging the ruler on canvas
    rulerCont.on('mousedown', function (e) {
      deselect();
      stage.setChildIndex(rulerCont, stage.getNumChildren() - 1);
      selected = 0;
      var posX = e.stageX;
      var posY = e.stageY;
      var newX = rulerCont.x;
      var newY = rulerCont.y;
      this.offset = {
        x: newX - posX,
        y: newY - posY,
        x1: this.x - posY,
      };
    });

    rulerCont.getChildAt(0).on('pressmove', function (e) {

      if (rulerCont.orientation == 0)
      {
        if ((e.stageX + rulerCont.offset.x > 50 + rulerCont.regX) && (e.stageY + rulerCont.offset.y > 90 + rulerCont.width / 2) && (e.stageX + rulerCont.offset.x < cm_width - rulerCont.length + rulerCont.regX - 15)) {
          var posX = e.stageX;
          var posY = e.stageY;
          rulerCont.x = posX + rulerCont.offset.x;
          rulerCont.y = posY + rulerCont.offset.y;
          stage.update();
        }
      }
      if (rulerCont.orientation == 1)
      {
        if ((e.stageX + rulerCont.offset.x > 50 + rulerCont.width / 2 ) && (e.stageY + rulerCont.offset.y > 90 + rulerCont.regX) && (e.stageX + rulerCont.offset.x < cm_width - rulerCont.regY  )) {

          var posX = e.stageX;
          var posY = e.stageY;
          rulerCont.x = posX + rulerCont.offset.x;
          rulerCont.y = posY + rulerCont.offset.y;
		  if(rulerCont.y > cm_height - 170){
			rulerCont.y = cm_height - 170;
		  }
          stage.update();
        }
      }
    });

    //rulerArray.push(rulerCont);

    //stage.addChild(rulerCont);
    //stage.update();

    var oldX, oldY;
    var oldArrowX, oldArrowY;
    //changing length of ruler by dragging arrow
    arrow.on('mousedown', function (e) {
      oldArrowX = this.x;
      oldX = e.stageX;
      oldArrowY = this.y;
      oldY = e.stageY;
    });
    arrow.on('pressmove', function (e) {
      {
        ruler.graphics.clear();
        rulerCont.removeAllChildren();
        //rulerCont.addChild(arrow);
        stage.update();

        var deltaX = e.stageX - oldX;
        var deltaY = e.stageY - oldY;
        if (rulerCont.orientation == 0) {
          if (e.stageX < window.innerWidth - 15) {
            var deltaX = e.stageX - oldX;
            var deltaY = e.stageY - oldY;
            length = oldArrowX + deltaX;
          }
        }
        if (rulerCont.orientation == 1) {
          if (e.stageY < window.innerHeight - 15) {
            var deltaX = e.stageX - oldX;
            var deltaY = e.stageY - oldY;
            length = oldArrowX + deltaY;
          }
        }

        if (length > 15) {
          rulerCont.length = length;
          rulerCont.width = width;
          //For grey highlight
          var q = rulerCont.length, r = rulerCont.width;
          var yy = -1.5, zz = yy, A = q, B = 1.5 + r;

	      ruler.graphics.setStrokeStyle(2.5).beginStroke("#c3c3c3");
		  ruler.graphics.moveTo(yy, zz).lineTo(A + 5.5, zz).lineTo(A+21, 15).lineTo(A + 5.5 , B).lineTo(yy, B).lineTo(yy, zz).endStroke();  //rulerCont.addChild(highlight);

          ruler.graphics.beginFill("#ffffff");
          ruler.graphics.lineTo(length, 0).lineTo(length, width).lineTo(0, width).lineTo(0, 0).endStroke().endFill();

          ruler.graphics.moveTo(0, 3);
          ruler.graphics.beginStroke("#d7ffcc").setStrokeStyle(7);
          ruler.graphics.lineTo(length - 1, 3).moveTo(length, width - 3).lineTo(0, width - 3).endStroke();

          rulerCont.addChild(ruler);
         // rulerCont.addChild(arrow);
          arrow.x = length;
          arrow.y = 15;
         // arrow.regX = arrow.image.width / 2;
          arrow.regX = 0;
        arrow.regY = arrow.image.height / 2;
          arrow.cursor = "pointer";
          k = Math.floor((length - 2) / spacing);

          for (var i = 1; i <= k; i++) {
            var text = new createjs.Text(i, "11px Helvetica ", "#3f3f3f");
            text.type = "numbers";
            if (rulerCont.orientation === 0) {
              text.x = (i <= 9) ? spacing * i - 2.1 : spacing * i - 6;
              text.y = 10;
              if (flag == -1)
                text.rotation = 0;

            } else if (rulerCont.orientation === 1) {
              text.x = spacing * i - 5.75;
              text.y = 18;
              if (i > 9)
                text.y = 21;
              text.rotation = -90;
            }

            /*if( flag == -1){
             text.x = (spacing*i ) ;
             text.y = 19;
             text.rotation = -180;
             }
             else {
             text.x = spacing*i;
             text.y = 11;
             
             }
             */
            rulerCont.addChild(text);
            ruler.graphics.beginStroke("#7b7b7b").setStrokeStyle(1.5);
            ruler.graphics.moveTo(spacing * i, -0.5);
            ruler.graphics.lineTo(spacing * i, 7);
            ruler.graphics.moveTo(spacing * i, 24).lineTo(spacing * i, 30.5);
            /*	if( flag == -1){
             text.x += 5 ;
             
             }
             */
          }
        }
        //	console.log("length "+rulerCont.length);
        rulerCont.addChild(text);
		rulerCont.addChild(arrow);
        stage.addChild(rulerCont);
        selectRuler(rulerCont);
        stage.update();
      }

    });

    arrow.on("pressup", function (e) {
      if ((rulerCont.length ) % 29 !== 0) {
        ruler.graphics.clear();
        rulerCont.removeAllChildren();
       // rulerCont.addChild(arrow);
        stage.update();

        rulerCont.length = (Math.floor(rulerCont.length / 29)) * 29;
        //console.log("in pressup"+ rulerCont.length);
        length = rulerCont.length;
        width = rulerCont.width;
        var q = rulerCont.length, r = rulerCont.width;
        var yy = -1.5, zz = yy, A = q, B = 1.5 + r;

		ruler.graphics.setStrokeStyle(2.5).beginStroke("#c3c3c3");
		ruler.graphics.moveTo(yy, zz).lineTo(A + 5.5, zz).lineTo(A+21, 15).lineTo(A + 5.5 , B).lineTo(yy, B).lineTo(yy, zz).endStroke();  //rulerCont.addChild(highlight);

        ruler.graphics.beginFill("#ffffff");
        ruler.graphics.lineTo(length, 0).lineTo(length, width).lineTo(0, width).lineTo(0, 0).endStroke().endFill();

        ruler.graphics.moveTo(0, 3);
        ruler.graphics.beginStroke("#d7ffcc").setStrokeStyle(7);
        ruler.graphics.lineTo(length - 1, 3).moveTo(length, width - 3).lineTo(0, width - 3).endStroke();

        rulerCont.addChild(ruler);
        //rulerCont.addChild(arrow);
        arrow.x = length;
        arrow.y = 15;
        //arrow.regX = arrow.image.width / 2;
        arrow.regY = arrow.image.height / 2;
        arrow.regX = 0;
        arrow.cursor = "pointer";
        k = Math.floor((length -2 ) / spacing);

        for (var i = 1; i <= k; i++) {
          var text = new createjs.Text(i, "11px Helvetica ", "#3f3f3f");
          text.type = "numbers";
          if (rulerCont.orientation === 0) {
            text.x = (i <= 9) ? spacing * i - 2.1 : spacing * i - 6;
            text.y = 10;
            if (flag == -1)
              text.rotation = 0;

          } else if (rulerCont.orientation === 1) {
            text.x = spacing * i - 5.75;
            text.y = 18;
            if (i > 9)
              text.y = 21;
            text.rotation = -90;
          }

          /*if( flag == -1){
           text.x = (spacing*i ) ;
           text.y = 19;
           text.rotation = -180;
           }
           else {
           text.x = spacing*i;
           text.y = 11;
           
           }
           */
          rulerCont.addChild(text);
          ruler.graphics.beginStroke("#7b7b7b").setStrokeStyle(1.5);
          ruler.graphics.moveTo(spacing * i, -0.5);
          ruler.graphics.lineTo(spacing * i, 7);
          ruler.graphics.moveTo(spacing * i, 24).lineTo(spacing * i, 30.5);
          /*	if( flag == -1){
           text.x += 5 ;
           
           }
           */

        }
      }
      rulerCont.addChild(text);
      rulerCont.addChild(arrow);
	  stage.addChild(rulerCont);
      selectRuler(rulerCont);
      stage.update();
    });

    // pressup ends
    rulerCont.on("click", function (e) {
      deselectRuler();
      deselect();
      selectRuler(this);
    });
  }

  //var highlightArray = new Array();
  function selectRuler(rulerCont) {
    rulerSelected = 1;
    var n = 6, o = 6;

    var q = rulerCont.length, r = rulerCont.width;
    var y = -n / 2, z = y, A = q, B = o / 2 + r;
    var highlight = new createjs.Shape();
    highlight.name = "highlight";
    highlight.graphics.setStrokeStyle(6).beginStroke("#CBEBF1");
    highlight.graphics.moveTo(y, z).lineTo(A + 8, z).lineTo(A + 21, 15 + z + 5).lineTo(A + 8, B).lineTo(y, B).lineTo(y, z).endStroke();
  //  rulerCont.addChild(highlight);
    $("#toolbar").addClass("deselected_toolbar_number_group");
    $("#toolbar").addClass("deselected_toolbar_number_ungroup");
     rulerCont.addChild(highlight);
    //rulerCont.removeChild(arrow);
    var arrow_select = new createjs.Bitmap(nbImagePath+'/arrow_select.png');
    arrow_select.x = rulerCont.length ;
    arrow_select.y = 15;
    //arrow_select.regX = arrow_select.image.width/2;
    //arrow_select.regY = arrow_select.image.height/2;
    arrow_select.regX = 0;
    arrow_select.regY = 15.5;
    arrow_select.cursor = "pointer";
    arrow_select.name = "arrow_select";
    rulerCont.addChild(arrow_select);

    stage.update();
    rulerArray.push(rulerCont);
  }

  function deselectRuler() {
    rulerSelected = 0;

    $("#toolbar").removeClass("deselected_toolbar_number_group");
    $("#toolbar").removeClass("deselected_toolbar_number_ungroup");
    if (rulerArray.length > 0) {
      for (var key in  rulerArray) {
        child = rulerArray[key].getChildByName("highlight");
        arrow_child = rulerArray[key].getChildByName("arrow_select");
        rulerArray[key].removeChild(child);
        rulerArray[key].removeChild(arrow_child);
        stage.update();
      }
      while (rulerArray.length > 0) {
        rulerArray.pop();
      }
    }
  }
  var flag = 0;
  //Rotate Frame
  //var rotation_flag; // 0 denotes 2n*90 rotation, 1 denotes (2n+1)*90 rotation
  $(".rotate_table_image").on('click', rotateBlock);
  /**
   * Function to rotate the block
   * @returns {undefined}
   */
  function rotateBlock() {
    if (selectedBlocks.length > 0) {
      for (var key in selectedBlocks) {
        if (selectedBlocks[key].count === 10) {
          selectedBlocks[key].rotation = selectedBlocks[key].rotation + 90;
          if ((selectedBlocks[key].rotation) % 90 === 0) {

            selectedBlocks[key].rotation_flag = ((selectedBlocks[key].rotation) / 90) % 2;
            if (selectedBlocks[key].rotation_flag === 1) {
              if (selectedBlocks[key].isVertical === true) {
                selectedBlocks[key].isVertical = false;
              } else {
                selectedBlocks[key].isVertical = true;
              }
              if (selectedBlocks[key].y < selectedBlocks[key].image.width + 87) {
                selectedBlocks[key].y = selectedBlocks[key].image.width - 72;
              }
            }
            if (selectedBlocks[key].rotation_flag === 0) {
              if (selectedBlocks[key].isVertical === true) {
                selectedBlocks[key].isVertical = false;
              } else {
                selectedBlocks[key].isVertical = true;
              }
              if (selectedBlocks[key].x < selectedBlocks[key].image.width + 47)
                selectedBlocks[key].x = selectedBlocks[key].image.width + 40;
            }
          }
          selectedBlocks[key].rotation = selectedBlocks[key].rotation % 360;
          //change rotated image
          position = (selectedBlocks[key].isVertical) ? "vertical" : "horizontal";
          count = selectedBlocks[key].count;
          color = selectedBlocks[key].color;
          var imageName = (count !== 10) ? (color + "_" + count + "_hover") : (color + "_" + count + "_" + position + "_hover");
          cube = bitmapArray[imageName];
          width = cube.image.width;
          height = cube.image.height;
          selectedBlocks[key].rotation = 0;
          selectedBlocks[key].image = cube.image;
          selectedBlocks[key].regX = width / 2;
          selectedBlocks[key].regY = height / 2;
          selectedBlocks[key].cursor = 'pointer';
          selectedBlocks[key].color = color;
          selectedBlocks[key].on("pressmove", dragIc);
          selectedBlocks[key].selected = 1;
          stage.update();
        }
      }
    }
    var numberArray = new Array();
    // To rotate ruler
    if (rulerArray.length > 0) {
      {
        //  for (var r in rulerArray)
        var r = rulerArray.length - 1;
        {
          rulerArray[r].regX = rulerArray[r].length / 2;
          rulerArray[r].regY = rulerArray[r].width / 2;
          spacing = 29;
          child = rulerArray[r].children;
          var objectTypes = ["numbers"];
          for (var ch in child) {
            if (objectTypes.indexOf(child[ch].type) !== -1) {
              numberArray.push(child[ch]);

            }
          }

          if (rulerArray[r].rotation == 0) {
            rulerArray[r].rotation = rulerArray[r].rotation + 90;
            for (var i = 0; i < numberArray.length; i++) {
              numberArray[i].rotation = numberArray[i].rotation - 90;
              numberArray[i].y = 18;
              numberArray[i].x = (spacing * (i + 1)) - 5.75;
              if (i > 8)
                numberArray[i].y = 21;
            }
            flag = -1;
          } else if (rulerArray[r].rotation == 90) {
            rulerArray[r].rotation = rulerArray[r].rotation - 90;

            if (flag == -1) {
              for (var i = 0; i < numberArray.length; i++) {
                numberArray[i].rotation = numberArray[i].rotation + 90;				
				numberArray[i].x = (i < 9) ? (spacing * (i+1)) - 2.1 : (spacing * (i+1)) - 6;
				numberArray[i].y = 10;            
              }
              //stage.update();
              flag == 0;
            }
          }


          rulerArray[r].rotation = rulerArray[r].rotation % 360;
          rulerArray[r].orientation = rulerArray[r].rotation / 90 % 4;
          for (var i = 0; i < numberArray.length; i++) {
            numberArray[i].rotation = numberArray[i].rotation % 360;

          }



          if (rulerArray[r].orientation === 0) {
            //console.log("rot 0"+flag);
            //  if (flag == -1) {
            //console.log("rot 0");
            //    flag = 1;

            /* spacing = 30 - 1;
             for (var i = 0; i < numberArray.length; i++) {
             if (rulerArray[r].regX == 150)
             {
             numberArray[i].x = spacing * (i + 1);
             }
             //numberArray[i].rotation += 180;
             numberArray[i].x = spacing * (i + 1);
             numberArray[i].y = 11;
             numberArray[i].rotation += 180;
             //console.log(numberArray[i].rotation);
             stage.update();
             */
          }





          if (rulerArray[r].x < 50 + rulerArray[r].length / 2)
            rulerArray[r].x = rulerArray[r].length / 2 + 50;
          //   }

          if (rulerArray[r].orientation === 1) {

            if (rulerArray[r].y < 90 + rulerArray[r].length / 2)
              rulerArray[r].y = rulerArray[r].length / 2 + 90 + 15;
          }

          /*
           
           if (rulerArray[r].orientation === 2) {
           var objectTypes = ["numbers"];
           for (var ch in child) {
           if (objectTypes.indexOf(child[ch].type) !== -1) {
           numberArray.push(child[ch]);
           flag = -1;
           }
           }
           spacing = 30 - 1;
           for (var i = 0; i < numberArray.length; i++) {
           numberArray[i].x = spacing * (i + 1) + 5;
           numberArray[i].y = 19;
           numberArray[i].rotation = -180;
           }
           if (rulerArray[r].x < 50 + rulerArray[r].length / 2)
           rulerArray[r].x = rulerArray[r].length / 2 + 50 + 15;
           }
           if (rulerArray[r].orientation === 3) {
           if (rulerArray[r].y < 90 + rulerArray[r].length / 2)
           rulerArray[r].y = rulerArray[r].length / 2 + 90 + 30;
           }
           */
        }
      }
    }
  }

  //clone object
  $(".duplicate_frame_image").on('click', handleClone);
  function handleClone() {
    clonedBlock = cloneObject(selectedBlocks);
    deselect();
    for (var c in clonedBlock) {
      selectedBlocks.push(clonedBlock[c]);
      stage.addChild(clonedBlock[c]);
      stage.update();
    }
	highlightGroupUngroup();
  }
  function cloneObject(selectedBlocks) {
    var clonedBlocks = new Array();
    for (var b in selectedBlocks) {
      var cloned = selectedBlocks[b].clone(true);
      cloned.x = cloned.x + 50;
      cloned.y = cloned.y + 50;
      cloned.selected = 1;
      cloned.color = selectedBlocks[b].color;
      cloned.count = selectedBlocks[b].count;
      if (selectedBlocks[b].count === 100) {
        cloned.name = 'mat';
      } else if (selectedBlocks[b].count === 10) {
        cloned.name = 'strip';
      } else {
        cloned.name = 'tile';
      }
      cloned.isVertical = selectedBlocks[b].isVertical;
      cloned.cursor = 'pointer';
	  cloned.on("dblclick", function(){
	    select(this);
	  });
      cloned.on("pressmove", dragIc);
      clonedBlocks.push(cloned);
    }
    return clonedBlocks;
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
   * add border to calc textBox
   */
  function textContainerBorder(containercalc) {
    //deselect();
    var calcTextBorder = new createjs.Shape();
    calcTextBorder.graphics.beginStroke("#a5e5fe");
    calcTextBorder.graphics.setStrokeStyle(4);
    calcTextBorder.graphics.drawRoundRect(2, 100, 230, 80, 14);
    calcTextBorder.visible = false;
    containercalc.addChild(calcTextBorder);
    arrayOfTextBorder.push(calcTextBorder);
    stage.update();
  }

function check_keypad(){  
if(calc_close == false && arrayofCalcContainer.length <= 1){
	$('.keypad').off('click', handleKeypad).on('click',handleKeypad);
}
else{ 
	  
          $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
		  $('.keypad').off('click', calc_clone).on('click',calc_clone);
		  //calc_clone();
          
}
}
  check_keypad();
  //$('.keypad').off('click', handleKeypad).on('click',handleKeypad);

  $(window).scroll(function () {
    var s = $(this).scrollTop(),
            d = $(document).height() - $(window).height(),
            scrollPercent = (s / d) * 100;
    //console.log(scrollPercent);
    check_kk(scrollPercent);
  });

  function check_kk(val) {
    scrollPer = val;
  }

  var check = 80;
  var check2 = 560;
  function check_width() {
	    //console.log(window.innerWidth / 2 + (scrollPer * 4 - 80) - check2);
	    //console.log("scrollPer" + (scrollPer * 4 - 80));
	    //console.log("scrollPer actual" + scrollPer);
	    //alert(scrollPer);
	    if (isNaN(scrollPer)) {
	      scrollPer = 75;
	    } else if(scrollPer < 50){
			//scrollPer -= 2; 
		}
		else if(scrollPer > 66 && scrollPer < 70){
			scrollPer = 65;
		}
		else if(scrollPer > 70 && scrollPer < 80){
			scrollPer = 75;
		}
		else if(scrollPer > 89 && scrollPer < 95){
			scrollPer = 85;
		}
		else if (scrollPer == 100) {
	      scrollPer = 95;
	    }
	    var check_wid = window.innerWidth / 2 + (scrollPer * 5 - check) - 600;
	    //console.log(check_wid);
	    //check += 10;
	    //check2 -= 3;
	    return check_wid;
	  }

  function handleKeypad() {
    //remove and add border
    //containercalc.removeChild(calcTextBorder);
  		//console.log("in keykpad");
    $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
    if (arrayofCalcContainer.length == 0) {
      deselect();
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
    //arrayOfTextBorder[keytext].visible = true;
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
      }else {
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
      //console.log(evt.target.name);
	  $("#toolbar").addClass("deselected_toolbar_number_group deselected_toolbar_number_ungroup");
      var fil = evt.target.name;
      arr = fil.replace("fil", "");
      //console.log("arr value " + arr);
      deselect();
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
	deselect();
	mouseDownAtEmpty();
  /*else{ 
	  $('#calculatordialog').dialog('open');
          $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
		  calc_clone();
          for (i = 0; i < arrayOfTextContainer.length; i++) {
            pressmovecalc(stage, arrayofCalcContainer[i]);
          }
  }*/
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
      }else {
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

  function color_finder(k) {
    //gray: #696969
    //blue: #22b9cd
	//green: #6cae28
	//orange: #ffa200
	//red: #f25050

    //console.log("k" + k);
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


  function calc_clone() {
    mouseDownAtEmpty();
 console.log("clone");
    if (arrayofCalcContainer != 0) {

      while (arrayOfTextContainer[keytext] == undefined) {
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
          deselect();
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
        deselect();
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
	  if(calc_close == false){
	    $('#calculatordialog').dialog('open');
		for (i = 0; i < arrayOfTextContainer.length; i++) {
            pressmovecalc(stage, arrayofCalcContainer[i]);
        }
	  }
    } else {
      handleKeypad();
    }
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
      multiSelection();
      mouseDownAtEmpty();
    },
    close: function () {
      $('.keypad').on('click', function () {
        $('#calculatordialog').dialog('open');
      });
    }

  });

  setTopHeaderIcons();
  /**
   * Function to clone the bitmap images one at a time
   * @param {type} evt - Event handler  
   * @param {type} color - Object color
   * @param {type} count - Count to clone 
   * @returns {undefined}
   */
  function clone(evt, color, count) {
    stage.removeChild(startUpMsg);
    deselect();
    deselectRuler();
    var h, w, boxClone, targetX, targetY;
    switch (count) {
      case 1:
        h = 55;
        w = 55;
        icon = bitmapArray['blue_1_hover'];
        boxClone = icon.clone();
        boxClone.name = 'tile';
        boxClone.count = 1;
        targetX = (evt.type == 'click') ? 341 : '';
        targetY = (evt.type == 'click') ? 135 : '';
        break;
      case 10:
        w = 316;
        h = 55;
        icon = bitmapArray['blue_10_horizontal_hover'];
        boxClone = icon.clone();
        boxClone.name = 'strip';
        boxClone.count = 10;
        targetX = (evt.type == 'click') ? 554 : '';
        targetY = (evt.type == 'click') ? 135 : '';
        break;
      case 100:
        w = 316;
        h = 317;
        icon = bitmapArray['blue_100_hover'];
        boxClone = icon.clone();
        boxClone.name = 'mat';
        boxClone.count = 100;
        targetX = (evt.type == 'click') ? 873 : '';
        targetY = (evt.type == 'click') ? 265 : '';
        break;
      default:

    }
    var imageWidth = (icon.image.width === 0) ? w : icon.image.width;
    var imageheight = (icon.image.height === 0) ? h : icon.image.height;
    var l = count;
    //for (var i = 0; i < l; i++) {

    boxClone.cursor = 'pointer';     
    boxClone.color = color;
    boxClone.selected = 1;
    boxClone.snapped=0;
    boxClone.rotation_flag = 0;
    boxClone.isVertical = false;
    boxClone.regX = imageWidth / 2;
    boxClone.regY = imageheight / 2;

    if (targetX == '' && targetY == '') {
      boxClone.x = evt.stageX;
      boxClone.rotation = 0;
      if (evt.stageX < 204 && (count === 100 || count === 10)) {
        boxClone.x = 204;
      } else if (count === 1 && evt.stageX < 75) {
        boxClone.x = 75;
      } else {
        boxClone.x = evt.stageX;
      }

      var xposition = parseInt(evt.stageX) + parseInt(boxClone.image.width / 2);
      if (xposition > cm_width) {
        boxClone.x = cm_width - parseInt(boxClone.image.width / 2);
      }

      if (evt.stageY < 245 && count === 100) {
        boxClone.y = 245;
      } else if (evt.stageY < 115 && count === 10) {
        boxClone.y = 115;
      } else {
        boxClone.y = evt.stageY;
      }
    } else {
		targetCoordinates = getTargetCoordinates(boxClone.name, targetX, targetY);
		if(targetCoordinates.length > 0 && targetCoordinates.length == 2){
			console.log(targetCoordinates);
			boxClone.x = targetCoordinates[0];
			boxClone.y = targetCoordinates[1];
		}else{
			boxClone.x = targetX;
			boxClone.y = targetY;
		}
    }
    if (boxClone.count > 1 && evt.type != 'click') {
      snapBlock(boxClone);
    }
    objectList.push(boxClone);
    boxClone.setBounds(boxClone.x, boxClone.y, imageWidth, imageheight);
    boxClone.on("click", function(){
	  //select(this);
	});
	boxClone.on("dblclick", function(){
	  select(this);
	});
	boxClone.on("pressmove", dragIc);
    boxClone.on("mousedown", function () {
      //select(this);
    });
    stage.addChild(boxClone);
    stage.update();
    selectedBlocks.push(boxClone);
	highlightGroupUngroup();
  }
  /**
   *  To getTargetCoordinates
   */
  function getTargetCoordinates(type, targetX, targetY){
	var isElementExist = false;
	var targetCoordinates = new Array();	
	var loopCount = 0;
	while(isElementExist == false ){
		loopCount = loopCount + 1;
		var test = stage.getObjectsUnderPoint(targetX, targetY, !0);
		if(test.length > 0 &&  test[0].name == type){
			if(type == 'mat'){
				console.log(loopCount);
				if(loopCount == 10){
					targetX = targetX - (15 * (loopCount - test.length)) + 15;
					targetY = targetY - (15 * (loopCount - test.length)) + 15;
					targetCoordinates = [];
					targetCoordinates.push(targetX, targetY);
					break;					
				}else{
					targetX = targetX + 15;
					targetY = targetY + 15;
				}
			}else if(type == 'strip'){
				targetX = targetX + 15;
				targetY = targetY + 30;
			}else{
				targetX = targetX + 15;
				targetY = targetY + 20;
			}
			targetCoordinates = [];
			targetCoordinates.push(targetX, targetY);
		}else{
			isElementExist = true;
		}
	}
	return targetCoordinates;
  }
  
  /**
   * Function to snap near the block
   * @param {type} boxClone
   * @returns {undefined}
   */
  function snapBlock(boxClone) {
    var object = stage.getObjectUnderPoint(boxClone.x, boxClone.y, 1);
    if (object === null) {
      right = boxClone.x + (boxClone.image.width);
      left = boxClone.x - (boxClone.image.width);
      topv = boxClone.y - (boxClone.image.height);
      bottom = boxClone.y + (boxClone.image.height);
      var object_right = stage.getObjectUnderPoint(right, boxClone.y, 1);
      var object_left = stage.getObjectUnderPoint(left, boxClone.y, 1);
      var object_top = stage.getObjectUnderPoint(boxClone.x, topv, 1);
      var object_bottom = stage.getObjectUnderPoint(boxClone.x, bottom, 1);
      if (object_right !== null && (object_right.count === boxClone.count)) {
        boxClone.x = object_right.x - (boxClone.image.width - 10);
        if (boxClone.x < 204) {
          boxClone.x = 204;
        }
        boxClone.y = object_right.y;
      } else if (object_left !== null && (object_left.count === boxClone.count)) {
        boxClone.x = object_left.x + (boxClone.image.width - 10);
        var xposition = parseInt(boxClone.x) + parseInt(boxClone.image.width / 2);
        if (xposition > cm_width) {
          boxClone.x = cm_width - parseInt(boxClone.image.width / 2);
        }
        boxClone.y = object_left.y;
      } else if (object_top !== null && (object_top.count === boxClone.count)) {
        boxClone.x = object_top.x;
        boxClone.y = object_top.y + (boxClone.image.height - 10);
      } else if (object_bottom !== null && (object_bottom.count === boxClone.count)) {
        boxClone.x = object_bottom.x;
        boxClone.y = object_bottom.y - (boxClone.image.height - 10);
        if (boxClone.y < 245 && boxClone.count === 100) {
          boxClone.y = 245;
        } else if (boxClone.y < 115 && boxClone.count === 10) {
          boxClone.y = 115;
        }
      }
    }
  }
  /**
   * To drag single icon
   * @param {evt} evt - objectInfo
   * @returns {undefined}  
   */
  function dragIc(evt) {  
   stage.setChildIndex(evt.currentTarget, stage.getNumChildren() - 1);
    if (selectedBlocks.length > 1) {
      oldX = evt.target.x;
      oldY = evt.target.y;
      xval = selectedBlocks[selectedBlocks.length - 1].x;
      if (xval <= cm_width) {
        dragBlock(evt, cm_height);
        dragMultipleIcons(evt, selectedBlocks, oldX, oldY);
      }
    } else {
      dragBlock(evt, cm_height);
    }
    stage.update();
  }

  /**
   * Function for dragging functionality
   * @param {type} evt
   * @param {type} cm_height
   * @returns {undefined}
   */
  function dragBlock(evt, cm_height) {
     stage.setChildIndex(evt.currentTarget, 150);
    var cm_width = window.innerWidth;
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
    if (typeof evt.currentTarget.count !== 'undefined' && typeof evt.currentTarget.isVertical !== 'undefined' && (evt.currentTarget.count === 10 && (evt.currentTarget.isVertical === true || evt.currentTarget.isVertical === 1))) {
      if (evt.stageY < 243) {
        evt.target.y = 243;
      }
      if (evt.stageX < 75) {
        evt.target.x = 75;
      }
      if (evt.stageX > cm_width - 30) {
        evt.target.x = cm_width - 30;
      }
      var ypos = "";
      if (evt.currentTarget.rotation === 0) {
        ypos = evt.currentTarget.image.height / 2;
      } else if (evt.currentTarget.rotation === 90 || evt.currentTarget.rotation === 270) {
        ypos = evt.currentTarget.image.width / 2;
      }
      var yposition = parseInt(evt.stageY) + parseInt(ypos);
      if (yposition > cm_height) {
        evt.target.y = cm_height - parseInt(ypos);
      }
    } else if (typeof evt.currentTarget.count !== 'undefined' && (evt.currentTarget.count === 10 || evt.currentTarget.count === 100)) {
      if (evt.stageX < 204) {
        evt.target.x = 204;
      }
      var xposition = parseInt(evt.stageX) + parseInt(evt.currentTarget.image.width / 2);
      if (xposition > cm_width) {
        evt.target.x = cm_width - parseInt(evt.currentTarget.image.width / 2);
      }
      if (evt.stageY < 245 && evt.currentTarget.count === 100) {
        evt.target.y = 245;
      }
      if (evt.stageY < 115 && evt.currentTarget.count === 10) {
        evt.target.y = 115;
      }
      var yposition = parseInt(evt.stageY) + parseInt(evt.currentTarget.image.height / 2);
      if (yposition > cm_height) {
        evt.target.y = cm_height - parseInt(evt.currentTarget.image.height / 2);
      }
    } else {
      if (evt.stageX < 75) {
        evt.target.x = 75;
      }
      if (evt.stageX > cm_width - 30) {
        evt.target.x = cm_width - 30;
      }
      if (evt.stageY < 115) {
        evt.target.y = 115;
      }
      if (evt.stageY > cm_height - 25) {
        evt.target.y = cm_height - 25;
      }
    }
    evt.currentTarget.snapped =0;    
    snapBlockNear(evt.currentTarget, evt);
  }
  /**
   * Drag and Snap functionality
   * @param {type} boxClone
   * @param {type} evt
   * @returns {undefined}
   */
  function snapBlockNear(boxClone, evt) {
    right = boxClone.x + (boxClone.image.width / 2) + 5;
    left = boxClone.x - (boxClone.image.width / 2) - 5;
    topv = boxClone.y - (boxClone.image.height / 2) - 5;
    bottom = boxClone.y + (boxClone.image.height / 2) + 5;

    var object_left = stage.getObjectUnderPoint(left, evt.stageY, 1);
    var object_right = stage.getObjectUnderPoint(right, boxClone.y, 1);
    var object_top = stage.getObjectUnderPoint(boxClone.x, topv, 1);
    var object_bottom = stage.getObjectUnderPoint(boxClone.x, bottom, 1);
    if (object_left === null && object_right === null && object_top === null && object_bottom === null) {
      return;
    } else if (object_left !== null) {
      if (object_left.name === null) {
        return;
      } else if (object_left.name !== 'tile' && object_left.name !== 'strip' && object_left.name !== 'mat') {
        return;
      }
    } else if (object_right !== null) {
      if (object_right.name === null) {
        return;
      } else if (object_right.name !== 'tile' && object_right.name !== 'strip' && object_right.name !== 'mat') {
        return;
      }
    } else if (object_top !== null) {
      if (object_top.name === null) {
        return;
      } else if (object_top.name !== 'tile' && object_top.name !== 'strip' && object_top.name !== 'mat') {
        return;
      }
    } else if (object_bottom !== null) {
      if (object_bottom.name === null) {
        return;
      } else if (object_bottom.name !== 'tile' && object_bottom.name !== 'strip' && object_bottom.name !== 'mat') {
        return;
      }
    }

    if (object_left !== null) {
      var xvalue = "";
      if (boxClone.count === 1 && ((object_left.count === 10 && object_left.isVertical === true) || object_left.count === 100)) {
        boxClone.y = evt.stageY;
      } else {        
        boxClone.y = object_left.y;
      }
      if (object_left.count === 1) {
        xvalue = object_left.x + (boxClone.image.width / 2) + 2;        
      } else if (object_left.count === 10 && object_left.isVertical === false) {

        if (boxClone.count === 10 && boxClone.isVertical === true) {
          xvalue = object_left.x + (object_left.image.width / 2) + 12;
        } else if (boxClone.count === 10 && boxClone.isVertical === false) {
          xvalue = object_left.x + (object_left.image.width) - 10;
        } else if (boxClone.count === 100) {
          xvalue = object_left.x + (object_left.image.width) - 8;
        } else if (boxClone.count === 1) {
          xvalue = object_left.x + (object_left.image.width / 2) + 12;
        }

      } else if (object_left.count === 10 && object_left.isVertical === true) {
        if (boxClone.count === 1) {
          xvalue = object_left.x + (object_left.image.width / 2) + 12;
        } else if ((boxClone.count === 10 && boxClone.isVertical === false) || boxClone.count === 100) {
          xvalue = object_left.x + (boxClone.image.width / 2) + 4;
          boxClone.y = evt.stageY;
        } else if (boxClone.count === 10 && boxClone.isVertical === true) {
          xvalue = object_left.x + (boxClone.image.width / 2) + 5;
        }
      } else if (object_left.count === 100) {
        if ((boxClone.count === 1)) {
          xvalue = object_left.x + (boxClone.image.width) + 107;
          boxClone.y = evt.stageY;
        }
        if ((boxClone.count === 10 && boxClone.isVertical === false)) {
          xvalue = object_left.x + (object_left.image.width) - 10;
          boxClone.y = evt.stageY;
        } else if (boxClone.count === 100) {
          xvalue = object_left.x + (object_left.image.width) - 8;
          boxClone.y = evt.stageY;
        }
        if ((boxClone.count === 10 && boxClone.isVertical === true)) {
          xvalue = object_left.x + (object_left.image.width / 2) + 12;
          //boxClone.y = evt.stageY;
        }
      } else {
        xvalue = object_left.x + (object_left.image.width / 2) + 12;
      }
      object_left.snapped = 1;
      boxClone.x = xvalue;
      boxClone.snapped = 1;
      
      var obj_bottom = 0;
      if (object_bottom !== null) {
        obj_bottom = stage.getChildIndex(object_bottom);
      }
      var lefindex = stage.getChildIndex(object_left);
      var index = 0;
      if (obj_bottom !== 0) {
        index = (obj_bottom > lefindex) ? obj_bottom : lefindex;
      } else {
        index = lefindex;
      }  
      var index1 = index + 1;  
      stage.setChildIndex(boxClone, index1);
      stage.update();
      
      if (boxClone.x > evt.stageX + 10) {
        stage.setChildIndex(boxClone, stage.getNumChildren() - 1);
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
	stopDrag(evt, boxClone);
        boxClone.snapped = 0;
      }
    }
    if (object_right !== null) {
      boxClone.y = object_right.y;
      if (object_right.count === 1) {
        if ((boxClone.count === 1 || boxClone.count === 10)) {
          xvalue = object_right.x - (boxClone.image.width / 2) - 10;
        } else if ((boxClone.count === 100)) {
          xvalue = object_right.x - (boxClone.image.width / 2) - 10;
          boxClone.y = evt.stageY;
        }
      } else if (object_right.count === 10 && object_right.isVertical === false) {
        if (boxClone.count === 1) {
          xvalue = object_right.x - (object_right.image.width / 2) - 20;
        } else if (boxClone.count === 10 && boxClone.isVertical !== true || boxClone.count === 100) {
          xvalue = object_right.x - (object_right.image.width);
        } else if (boxClone.count === 10 && boxClone.isVertical === true) {
          xvalue = object_right.x - (object_right.image.width / 2) - 19;
        }
      } else if (object_right.count === 10 && object_right.isVertical === true) {
        if (boxClone.count === 1) {
          xvalue = object_right.x - (object_right.image.width / 2) - 20;
          boxClone.y = evt.stageY;
        } else if (boxClone.count === 10 && boxClone.isVertical !== true) {
          xvalue = object_right.x - (boxClone.image.width / 2) - 12;
          boxClone.y = evt.stageY;
        } else if (boxClone.count === 10 && boxClone.isVertical === true) {
          xvalue = object_right.x - (object_right.image.width / 2) - 20;
        } else if (boxClone.count === 100) {
          xvalue = object_right.x - (boxClone.image.width / 2) - 12;
        }
      } else if (object_right.count === 100) {
        if (boxClone.count === 1) {
          xvalue = object_right.x - (object_right.image.width / 2) - 20;
          boxClone.y = evt.stageY;
        } else if (boxClone.count === 10 && boxClone.isVertical !== true) {
          xvalue = object_right.x - (boxClone.image.width) + 15;
          boxClone.y = evt.stageY;
        } else if (boxClone.count === 10 && boxClone.isVertical === true) {
          xvalue = object_right.x - (object_right.image.width / 2) - 20;
        } else if (boxClone.count === 100) {
          xvalue = object_right.x - (boxClone.image.width) + 15;
        }
      }
      boxClone.x = xvalue;
      boxClone.x = boxClone.x + 8;
      object_right.snapped = 1;
      boxClone.snapped = 1;
      var top_index =0;
      if(object_top!==null){       
         top_index = stage.getChildIndex(object_top);                
      }       
      var rt_index = stage.getChildIndex(object_right);      
      var index =0;
      if (top_index !== 0) {
        index = (top_index < rt_index) ? top_index : rt_index;
      } else {
        index = rt_index;
      }      
      var index1 = 0;
      if (index !== 0) {
        index1 = index - 1;
      } else {
        index1 = index;
      }
        
      stage.setChildIndex(boxClone, index1);

      
      if (boxClone.x < evt.stageX - 10) {
        stage.setChildIndex(boxClone, stage.getNumChildren() - 1);
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
	stopDrag(evt, boxClone);
        boxClone.snapped = 0;
      }
    }
    if (object_bottom !== null) {
      
      boxClone.x = object_bottom.x;

      if (object_bottom.count === 1) {
        if (boxClone.count === 1) {
          boxClone.y = object_bottom.y - (object_bottom.image.height) + 10;
        } else if (boxClone.count === 10 && boxClone.isVertical === false) {
          boxClone.y = object_bottom.y - (boxClone.image.height / 2) - 3;
        } else if (boxClone.count === 10 && boxClone.isVertical === true) {
          boxClone.y = object_bottom.y - (boxClone.image.height / 2) - 3;
        } else if (boxClone.count === 100) {
          boxClone.y = object_bottom.y - (boxClone.image.height / 2) - 4;
        }
      } else if (object_bottom.count === 10 && object_bottom.isVertical === false) {
        if (boxClone.count === 1) {
          boxClone.y = object_bottom.y - (object_bottom.image.height) + 10;
          boxClone.x = evt.stageX;
        } else if (boxClone.count === 10 && boxClone.isVertical === false) {
          boxClone.y = object_bottom.y - (boxClone.image.height / 2) - 3;
        } else if (boxClone.count === 10 && boxClone.isVertical === true) {
          boxClone.y = object_bottom.y - (boxClone.image.height / 2) - 3;
          boxClone.x = evt.stageX;
        } else if (boxClone.count === 100) {
          boxClone.y = object_bottom.y - (boxClone.image.height / 2) - 4;
        }
      } else if (object_bottom.count === 10 && object_bottom.isVertical === true) {
        if (boxClone.count === 1) {
          boxClone.y = object_bottom.y - (object_bottom.image.height / 2) - 10;
        } else if (boxClone.count === 10 && boxClone.isVertical === false) {
          boxClone.y = object_bottom.y - (object_bottom.image.height / 2) - 12;
        } else if (boxClone.count === 10 && boxClone.isVertical === true) {
          boxClone.y = object_bottom.y - (boxClone.image.height) + 25;
        } else if (boxClone.count === 100) {
          boxClone.y = object_bottom.y - (boxClone.image.height) + 25;
        }
      } else if (object_bottom.count === 100) {
        if (boxClone.count === 1) {
          boxClone.y = object_bottom.y - (object_bottom.image.height / 2) - 10;
          boxClone.x = evt.stageX;
        } else if (boxClone.count === 10 && boxClone.isVertical === false) {
          boxClone.y = object_bottom.y - (object_bottom.image.height / 2) - 12;
        } else if (boxClone.count === 10 && boxClone.isVertical === true) {
          boxClone.y = object_bottom.y - (boxClone.image.height) + 25;
          boxClone.x = evt.stageX;
        } else if (boxClone.count === 100) {
          boxClone.y = object_bottom.y - (boxClone.image.height) + 25;
        }
      }

      
      object_bottom.snapped = 1;
      boxClone.snapped = 1;      
      var left_index = 0;
      if (object_left !== null) {
        left_index = stage.getChildIndex(object_left);
      }
      var bottom_index = stage.getChildIndex(object_bottom);    
      var index = 0;
      if (left_index !== 0) {
        index = (left_index > bottom_index) ? left_index : bottom_index;
      } else {
        index = bottom_index;
      }
      var index3 = index + 1;
      stage.setChildIndex(boxClone,index3);
      stage.update();
      if (boxClone.y < evt.stageY - 10) {
        stage.setChildIndex(boxClone, stage.getNumChildren() - 1);
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
	stopDrag(evt, boxClone);
        boxClone.snapped = 0;
      }
    }
    if (object_top !== null) {
      if (typeof object_top.image !== 'undefined') {
        boxClone.x = object_top.x;
        if (object_top.count === 1) {
          boxClone.y = object_top.y + (boxClone.image.height / 2) + 2;
        } else if (object_top.count === 10 && object_top.isVertical === false) {
          if (boxClone.count === 1) {
            boxClone.y = object_top.y + (boxClone.image.height / 2) + 4;
            boxClone.x = evt.stageX;
          } else if (boxClone.count === 10 && boxClone.isVertical === false) {
            boxClone.y = object_top.y + (boxClone.image.height / 2) + 2;
          } else if (boxClone.count === 10 && boxClone.isVertical === true) {
            boxClone.y = object_top.y + (boxClone.image.height / 2) + 2;
            boxClone.x = evt.stageX;
          } else if (boxClone.count === 100) {
            boxClone.y = object_top.y + (boxClone.image.height / 2) + 2;
          }
        } else if (object_top.count === 10 && object_top.isVertical === true) {
          if (boxClone.count === 1) {
            boxClone.y = object_top.y + (object_top.image.height / 2) + 10;
          } else if (boxClone.count === 10 && boxClone.isVertical === false) {
            boxClone.y = object_top.y + (object_top.image.height / 2) + 10;
          } else if (boxClone.count === 10 && boxClone.isVertical === true) {
            boxClone.y = object_top.y + (object_top.image.height) - 8;
          } else if (boxClone.count === 100) {
            boxClone.y = object_top.y + (object_top.image.height) - 8;
          }
        } else if (object_top.count === 100) {
          if (boxClone.count === 1) {
            boxClone.y = object_top.y + (object_top.image.height / 2) + 11;
            boxClone.x = evt.stageX;
          } else if (boxClone.count === 10 && boxClone.isVertical === false) {
            boxClone.y = object_top.y + (object_top.image.height / 2) + 10;
          } else if (boxClone.count === 10 && boxClone.isVertical === true) {
            boxClone.y = object_top.y + (object_top.image.height) - 8;
            boxClone.x = evt.stageX;
          } else if (boxClone.count === 100) {
            boxClone.y = object_top.y + (object_top.image.height) - 8;
          }
        }
        
        object_top.snapped = 1;
        boxClone.snapped = 1;
        var rightIndex= 0;
        if(object_right!==null){
           rightIndex = stage.getChildIndex(object_right);
         }     
        var tpindex = stage.getChildIndex(object_top);
        var index = 0;
        if(rightIndex!==0){
           index = (rightIndex < tpindex) ? rightIndex : tpindex;
        }else{
          index = tpindex;
        }
        var index1 = 0;
        if (index !== 0) {
          index1 = index - 1;
        } else {
          index1 = index;
        }
        stage.setChildIndex(boxClone, index1);
        if (boxClone.y > evt.stageY + 10) {
          stage.setChildIndex(boxClone, stage.getNumChildren() - 1);
          evt.target.x = evt.stageX;
          evt.target.y = evt.stageY;
	  stopDrag(evt, boxClone);
          boxClone.snapped = 0;
        }
      }
    }
  }
  /**
   * Function to disallow dragging in the canvas regions 
   * @param {type} evt
   * @param {type} boxClone
   * @returns {undefined}
   */
  function stopDrag(evt, boxClone) {

    if (boxClone.count===100 && evt.target.x < 204) {
      evt.target.x = 204;
      stage.setChildIndex(boxClone, stage.getNumChildren() - 1);
    }
    else if (boxClone.count===10 && boxClone.isVertical==false && evt.target.x < 204) {
      evt.target.x = 204;
      stage.setChildIndex(boxClone, stage.getNumChildren() - 1);
    }
    else if (boxClone.count===1 && evt.target.x < 50) {
      evt.target.x = 50;
      stage.setChildIndex(boxClone, stage.getNumChildren() - 1);
    }
    if (boxClone.y < 245 && boxClone.count === 100) {
      boxClone.y = 245;
      stage.setChildIndex(boxClone, stage.getNumChildren() - 1);
    } else if (boxClone.y < 115 && boxClone.count === 10) {
      boxClone.y = 115;
      stage.setChildIndex(boxClone, stage.getNumChildren() - 1);
    }
    var xposition = parseInt(boxClone.x) + parseInt(boxClone.image.width / 2);
    if (xposition > cm_width) {
      boxClone.x = cm_width - parseInt(boxClone.image.width / 2);
      stage.setChildIndex(boxClone, stage.getNumChildren() - 1);
    }
  }
  
  function selectedCount(){
	var stripCount = 0;
	if (selectedBlocks.length > 0) {
	  for (i = 0; i < selectedBlocks.length; i++) {
		var block = selectedBlocks[i];
		if (block.name == 'strip') {
		  stripCount = stripCount + 1;
		}
	  }
	}
	return stripCount;
  } 
  
  //Ungroup object
  $("#ungroup_block").on("click", function () {
    if (selectedBlocks.length > 0) {
      for (i = 0; i < selectedBlocks.length; i++) {
        var block = selectedBlocks[i];
        if (block.name == 'mat') {
          matArray.push(block);
        } else if (block.name == 'strip') {
          stripArray.push(block);
        }
      }
	  if (stripArray.length > 0) {
        unGroupBlocks(stripArray);
      }
      if (matArray.length > 0) {
        unGroupBlocks(matArray);
      }
    }
	
  });

  /**
   * unGroupBlocks
   * @param {type} array
   * @returns {undefined}
   */
  function unGroupBlocks(array) {
    for (i = 0; i < array.length; i++) {
      var block = array[i];
      var targetName, targetImageName, targetCount, targetColor, isVertical = '';
      targetColor = block.color ? block.color : 'blue';
      if (block.name == 'mat') {
        targetName = 'strip';
        targetImageName = '10_vertical';
        targetCount = 10;
        isVertical = true;
      } else if (block.name == 'strip') {
        targetName = 'tile';
        targetImageName = '1';
        targetCount = 1;
        isVertical = block.isVertical ? block.isVertical : false;
      }
      if (targetImageName != '' && (targetName == 'tile' || targetName == 'strip')) {
        var h, w;
        switch (targetName) {
          case 'tile':
            h = 55;
            w = 55;
            var imageName = targetColor + "_1_hover";
            break;
          case 'strip':
            if (isVertical) {
              w = 55;
              h = 316;
              var imageName = targetColor + "_10_vertical_hover";
            } else {
              w = 316;
              h = 55;
              var imageName = targetColor + "_10_horizontal_hover";
            }
            break;
          default:

        }
        var icon = bitmapArray[imageName];
        var imageWidth = (icon.image.width === 0) ? w : icon.image.width;
        var imageheight = (icon.image.height === 0) ? h : icon.image.height;

        var extraWidth = block.image.width / 2;
        var extraHeight = block.image.height / 2;
        extraWidth = extraWidth + 1;
        extraHeight = extraHeight + 4;
        //ungrouped Elements
        var count = '10';
        var l = count;
        var x = block.x - extraWidth + 28;
        var y = block.y - extraHeight + 28;
        var loopCount = count;
        for (var j = 0; j < 10; j++) {
          var boxClone = icon.clone();
          boxClone.name = targetName;
          boxClone.cursor = 'pointer';
          boxClone.color = targetColor;
          boxClone.selected = 1;
          boxClone.count = targetCount;
          boxClone.isVertical = isVertical;
          boxClone.regX = imageWidth / 2;
          boxClone.regY = imageheight / 2;
          boxClone.on("pressmove", dragIc);
          if (block.isVertical === true) {
            boxClone.x = block.x;
            loopCount = loopCount - 1;
            boxClone.y = y + (loopCount * 29.45);
          } else {
            boxClone.x = x + (j * 29.25);
            boxClone.y = block.y;
          }
          objectList.push(boxClone);
          boxClone.setBounds(boxClone.x, boxClone.y, imageWidth, imageheight);
          stage.addChild(boxClone);
          stage.update();
          selectedBlocks.push(boxClone);
        }
        removeFromArray(selectedBlocks, block);
        stage.removeChild(block);
        stage.update();
      }
    }
    while (array.length > 0) {
      array.pop();
    }
	stripCount = selectedCount();
	if(stripCount == 10){
	  $("#toolbar").removeClass("deselected_toolbar_number_group");
	}else{
	  $("#toolbar").addClass("deselected_toolbar_number_ungroup");
    }
    $("#toolbar").removeClass("deselected_toolbar_number_group");	
  }

  //To remove specific element from the selectedArray	
  function removeFromArray(array, block) {
    var index = array.indexOf(block);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  //group objects
  $("#group_block").on("click", function () {
    if (selectedBlocks.length >= 10) {
      var tileCount = 0;
      var stripCount = 0;
      for (i = 0; i < selectedBlocks.length; i++) {
        if (selectedBlocks[i].name == 'tile') {
          tileCount = tileCount + 1;
        } else if (selectedBlocks[i].name == 'strip') {
          stripCount = stripCount + 1;
        }
      }
      //console.log('tileCount='+tileCount+' stripCount='+stripCount);
	  
      if (tileCount >= 10) {
        targetShapeCount = parseInt(tileCount / 10);
        groupElements('tile', 'strip', 'horizontal', 10, targetShapeCount);
      }
      if (stripCount >= 10) {
        targetShapeCount = parseInt(stripCount / 10);
        groupElements('strip', 'mat', '', 100, targetShapeCount);
      }
    }
  });

  /**
   * To remove Grouped Elements from SelectedBlocks array
   */
  function removeGroupedElements(groupedElements) {
    for (i = 0; i < groupedElements.length; i++) {
      var index = selectedBlocks.indexOf(groupedElements[i]);
      selectedBlocks.splice(index, 1);
    }
  }



  /**
   *  groupElements based on count values
   */
  function groupElements(groupedType, targetType, position, targetCellCount, targetShapeCount) {
    for (x = 1; x <= targetShapeCount; x++) {
      count = 0;
      var targetColor, targetX, targetY = '';
      var isVerticalCount = 0;
      var targetColorCount = 1;
      var groupedElements = new Array();
      for (i = 0; i < selectedBlocks.length; i++) {
        if (selectedBlocks[i].name == groupedType) {
          count = count + 1;
          if (count <= 10) {
            isVerticalCount = selectedBlocks[i].isVertical ? isVerticalCount + 1 : isVerticalCount;
            if (count % 10 == 1) {
              //get color,x and y values from the first block of ten blocks
              targetColor = selectedBlocks[i].color;
              targetX = selectedBlocks[i].x;
              targetY = selectedBlocks[i].y;
            } else if (targetColor == selectedBlocks[i].color) { //this condition satisfies all the 9 elements except first one
              targetColorCount = targetColorCount + 1;
            }
            if (count % 10 == 0 && targetColor != '') {
              targetColor = (targetColorCount == 10) ? targetColor : 'blue';
              //if all the ten elements are in vertical position x,y and posiotn values will be vary
              if (isVerticalCount == 10 && targetType == 'strip') {
                targetX = selectedBlocks[i].x - (4 * 32);
                targetY = selectedBlocks[i].y + (4 * 33.5);
                position = 'vertical';
              }
              groupBlock(targetType, position, targetCellCount, targetColor, targetX, targetY);			  
            }
            groupedElements.push(selectedBlocks[i]);
            stage.removeChild(selectedBlocks[i]);
            stage.update();
          }
        }
      }
      removeGroupedElements(groupedElements);
    }
	
	$("#toolbar").addClass("deselected_toolbar_number_group");
	$("#toolbar").removeClass("deselected_toolbar_number_ungroup");
	stripCount = selectedCount();
	if(stripCount == 10){
	  $("#toolbar").removeClass("deselected_toolbar_number_group");
	}
  }

  /**
   * Group Selected Elements
   */
  function groupBlock(targetType, position, targetCellCount, targetColor, targetX, targetY) {
    var color = targetColor;
    var imageName = (position == '') ? targetColor + '_' + targetCellCount + '_hover' : targetColor + '_' + targetCellCount + '_' + position + '_hover';
    var icon = bitmapArray[imageName];
    var imageWidth = icon.image.width;
    var imageheight = icon.image.height;
    var boxClone = icon.clone();
    boxClone.name = targetType;
    boxClone.count = targetCellCount;
    boxClone.cursor = 'pointer';
    boxClone.color = color;
    boxClone.selected = 1;
    boxClone.isVertical = (position == 'vertical') ? true : false;
    boxClone.regX = imageWidth / 2;
    boxClone.regY = imageheight / 2;
    boxClone.x = targetX + (4.65 * 28);
    boxClone.y = targetY;
    objectList.push(boxClone);
    boxClone.setBounds(boxClone.x, boxClone.y, imageWidth, imageheight);
    boxClone.on("pressmove", dragIc);
    boxClone.on("click", function () {
      select(this);
    });
    stage.addChild(boxClone);
    stage.update();
    selectedBlocks.push(boxClone);
  }

  //choose color for blocks
  $(".color_icons").on("click", function () {
    targetColor = $(this).attr('id');
    $(".selected").each(function () {
      $(this).removeClass("pink orange green blue gray");
      $(this).addClass(targetColor);
    });
  });


  $(".color_icons").on("click", updateColors);

  /**
   * Function to select the cuebs and change the color
   * @returns {undefined}
   */
  function updateColors() {
    var color = $(this).attr('id');
    for (var ky in selectedBlocks) {
      if (selectedBlocks[ky].selected === 1) {
        count = selectedBlocks[ky].count;
        position = (selectedBlocks[ky].isVertical) ? "vertical" : "horizontal";
        var imageName = (count !== 10) ? (color + "_" + count + "_hover") : (color + "_" + count + "_" + position + "_hover");
        cube = bitmapArray[imageName];
        width = cube.image.width;
        height = cube.image.height;
        selectedBlocks[ky].rotation = 0;
        selectedBlocks[ky].image = cube.image;
        selectedBlocks[ky].regX = width / 2;
        selectedBlocks[ky].regY = height / 2;
        selectedBlocks[ky].cursor = 'pointer';
        selectedBlocks[ky].color = color;
        selectedBlocks[ky].on("pressmove", dragIc);
        selectedBlocks[ky].selected = 1;
        stage.update();
        //selectedBlocks.push(selectedBlocks[ky]);
      }
    }
  }

  $('.trash').on('click', trash);

  /**
   * Function for Trash the selected objects in the canvas
   * @returns {undefined}
   */
  function trash() {
    if (selectedBlocks.length > 0) {
      for (var b in selectedBlocks) {
        stage.removeChild(selectedBlocks[b]);
        stage.update();
      }
      while (selectedBlocks.length > 0) {
        selectedBlocks.pop();
      }
    }
    if (rulerArray.length > 0) {
      for (var b in rulerArray) {
        stage.removeChild(rulerArray[b]);
        stage.update();
      }
      while (rulerArray.length > 0) {
        rulerArray.pop();
      }
    }

  }
  /**
   *  Multi selection
   */
  function multiSelection() {
    var mousePressed = false;
    //mousedown
    stage.on("stagemousedown", function (e) {
      if (stage._getObjectsUnderPoint(stage.mouseX, stage.mouseY) == null) {
        $("#workspace").addClass("cursor_canvas");
        mousePressed = true;

        dotted_line = new createjs.Shape,
                dotted_line.cursor = "crosshair",
                dotted_line.name = "selectionLine",
                dotted_line.graphics.clear(),
                ctx.lineWidth = 6,
                //ctx.webkitLineDash = [6], 
                //ctx.setLineDash([10]), 
                //ctx.mozDash = [10], 
                ctx.strokeStyle = "#ffffff",
                ctx.beginPath(),
                dotted_line.graphics.setStrokeStyle(5, "round", "round").beginStroke("#ffffff").beginFill("rgba(255,255,255,.01)");

        stage.addChild(dotted_line);
        stage.update();
      }
    });
    //mouseup
    stage.on("stagemouseup", function () {
      if (mousePressed) {
        $("#workspace").removeClass("cursor_canvas");
        mousePressed = false;

        d = [];
        if (deSelectedBlocks.length > 0) {
          //alert(deSelectedBlocks.length);console.log(deSelectedBlocks);
          for (i = 0; i < deSelectedBlocks.length; i++) {
            if (deSelectedBlocks[i].parent) {
              var e = deSelectedBlocks[i].parent.localToLocal(deSelectedBlocks[i].x, deSelectedBlocks[i].y, stage);
              if (dotted_line.hitTest(e.x, e.y)) {
                d.push(deSelectedBlocks[i]);
              }
            }
          }
        }//console.log(d);

        if (d.length > 0) {
          for (x = 0; x < d.length; x++) {
            var object = d[x];
            if (object.parent) {
              removeFromArray(deSelectedBlocks, object);
              color = object.color;
              count = object.count;
              position = (object.isVertical) ? "vertical" : "horizontal";
              var imageName = (count !== 10) ? (color + "_" + count + "_hover") : (color + "_" + count + "_" + position + "_hover");             
              var icon = bitmapArray[imageName];
              object.image = icon.image;              
              object.cursor = 'pointer';
              object.regX = icon.image.width / 2;
              object.regY = icon.image.height / 2;
              object.on("pressmove", dragIc);
              object.selected = 1;
             // if (typeof object.snapped === undefined || (typeof object.snapped !== undefined && object.snapped === 0))
                //stage.setChildIndex(object, stage.getNumChildren() - 1);             
              stage.update();
              selectedBlocks.push(object);             
              stage.update();
            }
          }
        }
        highlightGroupUngroup();
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
  }
  multiSelection();

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
      //$(".duplicate_frame_image").on("click", handleDuplicate);   // enabling  duplicte
      // $(".rotate_table_image").on("click", handleRotate);   // enabling rotateFrame
      //$('.keypad').on("click", handleKeypad);
      check_keypad();
      $(".color_icons").on("click", updateColors);
      $('.trash').on('click', trash);
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
    clearDrawings();
    stage.removeAllChildren();
    stage.update();
    disable_toolbar();
    objectList = [];
    //calculator
    arrayOfTextArray = [];
    arrayOfTextContainer = [];
    arrayofCalcContainer = [];
    arrayOfTextClick = [];
    textarray = [];
    arrayOfTextBorder = [];
    selectedBlocks = [];
    rulerArray = [];
    matArray = [];
    stripArray = [];
    penArray = [];
    setTopHeaderIcons();
    multiSelection();
    mouseDownAtEmpty();

  }
  /* clear-workspace script ends here  */

  function getCoordinates(a) {
    var b = a.position(),
            c = {
              x: b.left + a.width() / 2,
              y: b.top + a.height() / 2
            };
    return c
  }

  /**
   * Select specific block
   * @param {type} object
   * @returns {undefined}
   */
  function select(object) {
    if (object.selected !== 1) {
	  deselect();
	  removeFromArray(deSelectedBlocks,object);
      color = object.color;
      count = object.count;
      position = (object.isVertical) ? "vertical" : "horizontal";
      var imageName = (count !== 10) ? (color + "_" + count + "_hover") : (color + "_" + count + "_" + position + "_hover");
      var icon = bitmapArray[imageName];
      //icon.image.onload = function() { stage.update(); };
      width = icon.image.width;
      height = icon.image.height;
      object.image = icon.image;
      object.cursor = 'pointer';
      object.regX = width / 2;
      object.regY = height / 2;
      object.removeAllEventListeners('mousedown');
      object.removeAllEventListeners('click');
      object.removeAllEventListeners('pressmove');
      object.on("pressmove", dragIc);     
      object.selected = 1;
      //if(typeof object.snapped===undefined || (typeof object.snapped!==undefined && object.snapped ===0))
      //stage.setChildIndex(object, stage.getNumChildren() - 1);
      stage.update();
      selectedBlocks.push(object);
    }
    highlightGroupUngroup();	
  }

  /**
   * To set hilight class for group and ungroup icons
   */
  function highlightGroupUngroup() {
    if (selectedBlocks.length >= 1) {
	  var tileCount = 0;
	  var stripCount = 0;
	  var matCount = 0;
	  for (i = 0; i < selectedBlocks.length; i++) {
		if (selectedBlocks[i].name == 'tile') {
		  tileCount = tileCount + 1;
		} else if (selectedBlocks[i].name == 'strip') {
		  stripCount = stripCount + 1;
		} else if (selectedBlocks[i].name == 'mat') {
		  matCount = matCount + 1;
		}
	  }
	  $("#toolbar").addClass("deselected_toolbar_number_group deselected_toolbar_number_ungroup");
	  if(stripCount > 0 || matCount > 0){
		$("#toolbar").removeClass("deselected_toolbar_number_ungroup");
	  }
	  if(stripCount >=10 || tileCount >= 10){
		$("#toolbar").removeClass("deselected_toolbar_number_group");
	  }
    }else{
	  if(!$("#toolbar").hasClass("deselected_toolbar_number_group")){
	    $("#toolbar").addClass("deselected_toolbar_number_group");
	  }
	  if(!$("#toolbar").hasClass("deselected_toolbar_number_ungroup")){
	    $("#toolbar").addClass("deselected_toolbar_number_ungroup");
	  }
	}
  }
  
  /**
   * deselect all the blocks
   * @returns {Boolean}
   */
  function deselect() {
    if (selectedBlocks.length > 0) {
      for (var ky in selectedBlocks) {
        if (selectedBlocks[ky].selected === 1) {
          color = selectedBlocks[ky].color;
          count = selectedBlocks[ky].count;
          if (selectedBlocks[ky].isVertical === true) {
            position = 'vertical';
          } else {
            position = 'horizontal';
          }
          var imageName = (count !== 10) ? (color + "_" + count) : (color + "_" + count + "_" + position);
          var cube = bitmapArray[imageName];
          var h, w;
          switch (count) {
            case 1:
              h = 39;
              w = 39;
              break;
            case 10:
              if (position === "vertical") {
                w = 39;
                h = 300;
              } else {
                w = 300;
                h = 39;
              }
              break;
            case 100:
              w = 300;
              h = 300;
              break;
            default:

          }
          var width = (cube.image.width === 0) ? w : cube.image.width;
          var height = (cube.image.height === 0) ? h : cube.image.height;
          selectedBlocks[ky].image = cube.image;
          selectedBlocks[ky].cursor = 'pointer';
          selectedBlocks[ky].color = color;
          selectedBlocks[ky].selected = 0;
          selectedBlocks[ky].rotation = 0;
          selectedBlocks[ky].regX = width / 2;
          selectedBlocks[ky].regY = height / 2;
         // selectedBlocks[ky].on("pressmove", dragIc);
          selectedBlocks[ky].on("mousedown", function () {
            //this.selected = 0;
            select(this);
			this.on("pressmove", dragIc);
          });
          stage.update();
          deSelectedBlocks.push(selectedBlocks[ky]);
        }
      }
      while (selectedBlocks.length > 0) {
        selectedBlocks.pop();
      }
	  $("#toolbar").addClass("deselected_toolbar_number_group deselected_toolbar_number_ungroup");
    }
    //for removing calculator selection
    for (i = 0; i < arrayOfTextBorder.length; i++) {
      arrayOfTextBorder[i].visible = false;
    }
    $('.trash').off("click").on('click', trash);
    stage.update();
  }

  /**
   * deselect all the elements when stagemousedown action on empty area
   * @returns {undefined}
   */
  function mouseDownAtEmpty() {
    stage.on('stagemousedown', function (evt) {
      var obj = stage.getObjectsUnderPoint(evt.stageX, evt.stageY, 1);
      deselectRuler();
      if (obj.length <= 0) {
        deselect();
      }
	  highlightGroupUngroup();
    });
  }
  mouseDownAtEmpty();
  $("canvas").on("dblclick", function(){
	$("#toolbar").addClass("deselected_toolbar_number_group deselected_toolbar_number_ungroup");
  });
  
  /* clear-workspace script ends here  */
  if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {
    mobile = true;
  } else {
    mobile = false;
  }
  /* custom tool tip starts here */
  if (mobile === false) {
    $("#toolbar .left-icon").on("mouseover", function (evt) {
	  if($(this).attr('id') != 'clear_all'){
	    $("#toolbar").addClass('toolbar_hover');
	    $(this).find('.custom-tool-tip').remove();
	    var hovertext = $(this).attr("hovertext");
	    $(this).append('<span class="custom-tool-tip ' + hovertext + '"></span>');
	  }
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
  /**
   * Function to create the bitmap images on page load
   * @param {type} bitmap
   * @returns {unresolved}
   */
  function preload_bitmap(bitmap) {
    var colors = ["pink", "yellow", "green", "blue", "gray"];
    var countArry = [1, 10, 100];
    for (var c in  colors) {
      var color = colors[c];
      for (var cnt in countArry) {
        var count = countArry[cnt];
        if (count !== 10) {
          var bitmapimg = new createjs.Bitmap(nbImagePath+"/cubes/" + color + "/" + color + "_" + count + "_hover.png");
          bitmap[color + "_" + count + "_hover"] = bitmapimg;
          var bitmapimg = new createjs.Bitmap(nbImagePath+"/cubes/" + color + "/" + color + "_" + count + ".png");
          bitmap[color + "_" + count] = bitmapimg;
        } else {
          var bitmapimg = new createjs.Bitmap(nbImagePath+"/cubes/" + color + "/" + color + "_" + count + "_horizontal_hover.png");
          bitmap[color + "_" + count + "_horizontal_hover"] = bitmapimg;
          var bitmapimg = new createjs.Bitmap(nbImagePath+"/cubes/" + color + "/" + color + "_" + count + "_vertical_hover.png");
          bitmap[color + "_" + count + "_vertical_hover"] = bitmapimg;
          var bitmapimg = new createjs.Bitmap(nbImagePath+"/cubes/" + color + "/" + color + "_" + count + "_horizontal.png");
          bitmap[color + "_" + count + "_horizontal"] = bitmapimg;
          var bitmapimg = new createjs.Bitmap(nbImagePath+"/cubes/" + color + "/" + color + "_" + count + "_vertical.png");
          bitmap[color + "_" + count + "_vertical"] = bitmapimg;
        }
      }
    }
    var cm4klink = new createjs.Bitmap(nbImagePath+'/topmenu/cm4k_link.png');
    bitmap["cm4klink"] = cm4klink;
    var cm4klink2 = new createjs.Bitmap(nbImagePath+'/topmenu/cm4k_link.png');
    bitmap["cm4klink2"] = cm4klink2;
    var cm4k_hover = new createjs.Bitmap(nbImagePath+'/topmenu/cm4k_hover.png');
    bitmap["cm4k_hover"] = cm4k_hover;
    var title = new createjs.Bitmap(nbImagePath+'/topmenu/title.png');
    bitmap["title"] = title;
    var divider1 = new createjs.Bitmap(nbImagePath+'/topmenu/divider.png');
    bitmap["divider1"] = divider1;
    var divider2 = new createjs.Bitmap(nbImagePath+'/topmenu/divider.png');
    bitmap["divider2"] = divider2;
    var divider3 = new createjs.Bitmap(nbImagePath+'/topmenu/divider.png');
    bitmap["divider3"] = divider3;
    var divider4 = new createjs.Bitmap(nbImagePath+'/topmenu/divider.png');
    bitmap["divider4"] = divider4;

    //1 Icon
    var onenumber = new createjs.Bitmap(nbImagePath+'/topmenu/1-num.png');
    bitmap["onenumber"] = onenumber;
    var oneicon = new createjs.Bitmap(nbImagePath+'/topmenu/1_header.png');
    bitmap["oneicon"] = oneicon;
    var oneicon2 = new createjs.Bitmap(nbImagePath+'/topmenu/1_header.png');
    bitmap["oneicon2"] = oneicon2;
    var oneicon_hover = new createjs.Bitmap(nbImagePath+'/topmenu/1_header_hover.png');
    bitmap["oneicon_hover"] = oneicon_hover;

    //10 Icon
    var tennumber = new createjs.Bitmap(nbImagePath+'/topmenu/10-num.png');
    bitmap["tennumber"] = tennumber;
    var tenicon = new createjs.Bitmap(nbImagePath+'/topmenu/10_header.png');
    bitmap["tenicon"] = tenicon;
    var tenicon2 = new createjs.Bitmap(nbImagePath+'/topmenu/10_header.png');
    bitmap["tenicon2"] = tenicon2;
    var tenicon_hover = new createjs.Bitmap(nbImagePath+'/topmenu/10_header_hover.png');
    bitmap["tenicon_hover"] = tenicon_hover;

    //Hundred Icon
    var hundrednumber = new createjs.Bitmap(nbImagePath+'/topmenu/100-num.png');
    bitmap["hundrednumber"] = hundrednumber;
    var hundredicon = new createjs.Bitmap(nbImagePath+'/topmenu/100_header.png');
    bitmap["hundredicon"] = hundredicon;
    var hundredicon2 = new createjs.Bitmap(nbImagePath+'/topmenu/100_header.png');
    bitmap["hundredicon2"] = hundredicon2;
    var hundredicon_hover = new createjs.Bitmap(nbImagePath+'/topmenu/100_header_hover.png');
    bitmap["hundredicon_hover"] = hundredicon_hover;

    //Ruler
    var rulertitle = new createjs.Bitmap(nbImagePath+'/topmenu/ruler_title.png');
    bitmap["rulertitle"] = rulertitle;
    var rulericon = new createjs.Bitmap(nbImagePath+'/topmenu/ruler.png');
    bitmap["rulericon"] = rulericon;
    var rulericon2 = new createjs.Bitmap(nbImagePath+'/topmenu/ruler.png');
    bitmap["rulericon2"] = rulericon2;
    var rulericon_hover = new createjs.Bitmap(nbImagePath+'/topmenu/ruler_hover.png');
    bitmap["rulericon_hover"] = rulericon_hover;

    return bitmap;
  }
  /* custom tool tip ends here */
});