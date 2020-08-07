/* 
 * Custom Js file for the Sample Animation using Easeljs
 */
/* global createjs, container, clock_cont */

$ = jQuery;
$(function () {
  var stage = new createjs.Stage("workspace");
  stage.name = 'numberline_workspace';
  var stage1 = new createjs.Stage("outer-workspace");
  var ctx = stage.canvas.getContext("2d");
  container = new createjs.Container;

  // Space between bitmap and rectangle border
  var rectX;
  var rectY;
  var rectWidth;
  var rectHeight;
  var rectRadius;
  var activate = 0;

  var snap = new Array();
  
  var numberLines = new Object();
  var bitmaps = new Array();
  var objectList = new Array();
  var nlImagePath = "/sites/default/files/manipulatives/number-line/images/number_line";
  //Bitmap Preload
  var bitmapArray = preload_bitmap(bitmaps);
  var wrapper = new createjs.Container();
  var clock;
  var scrollStatus = 0;
  //enable mouse events 
  stage.enableMouseOver(50);
  stage.enableDOMEvents(true);
  createjs.Touch.enable(stage);
  stage1.enableMouseOver(50);
  stage1.enableDOMEvents(true);
  createjs.Touch.enable(stage1);
  var canvas = document.getElementById('workspace');
  var h = $("#about_div").height();
  canvas.onselectstart = function () {
    return false;
  };
  var canvas = document.getElementById('outer-workspace');
  canvas.onselectstart = function () {
    return false;
  };
  createjs.Ticker.on("tick", tick);
  function tick(event) {
    // Other stuff
    stage.update(event);
    stage1.update(event);
  }
  $(document).ready(function () {
    if (window.innerHeight < 1132) {
      $("#blocks-workspace").css("width", window.innerWidth - 17);
      $("#blocks-workspace").css("height", "1132px");
    }
    if (window.innerHeight > 1132) {
      $("#blocks-workspace").css("height", window.innerHeight - 250);
      stage.canvas.height = window.innerHeight - 250;
      $("#toolbar").css("height", window.innerHeight - 87);
      $("#toolbar").css("min-height", "100px");
      $("#about_div").css("margin-bottom", "-33px");
      $(".slider_values").css("position", "relative");
    }

    $("#blocks-workspace").niceScroll({
      autohidemode: false,
      bouncescroll: false,
      railvalign: top,
      enablemousewheel: false,
      cursorwidth: "15px",
      railpadding: {top: 0, right: 0, left: 140, bottom: 0}
    });

    if (window.innerHeight < 1132) {
      $("#ascrail2000-hr").css("bottom", "17px");
      $("#ascrail2000-hr").css("position", "fixed");
      $("#ascrail2000-hr").css("z-index", "103");
      $(".slider_values").css("position", "fixed");
      $(".slider_values").css("bottom", "0px");
    }
    if (window.innerHeight > 1132) {
      stage.canvas.height = window.innerHeight - 250;
      $("#ascrail2000-hr").css("bottom", h + 17);
      $("#ascrail2000-hr").css("position", "relative");
    }
    $('#blocks-workspace').scroll(function (evt) {
	  wrapper.cache(0, 0, rulerWidth, stage.canvas.height); // Caching the wrapper	  
      console.log("Scrolling!!!");
      var left = evt.currentTarget.scrollLeft;
      //var left = $(this).getNiceScroll()[0].newscrollx;    
      // corrected = left + ((left/100)*2.8);
      // var min = Math.ceil(corrected / rulerSpacing);
      var min = Math.ceil(left / rulerSpacing);
      if (min === 0) {
        var string = textarray[min].text;
        var html = buildFraction(string);
        $("#min").html(html);
      } else {
        var string = textarray[min - 1].text;
        var html = buildFraction(string);
        $("#min").html(html);
      }
      var wid = evt.currentTarget.clientWidth / rulerSpacing;
      var m = left / rulerSpacing;
      var max = Math.floor(wid + m);

      if (max < 101) {
        var string = textarray[max - 2].text;
        var html = buildFraction(string);
        $("#max").html(html);
      } else {
        var string = textarray[max - 3].text;
        var html = buildFraction(string);
        $("#max").html(html);
      }      
    });
    if ($(window).scrollTop() == ($(document).height() - $(window).height()) == true) { 
      var endvalue = h + 17;
      $("#ascrail2000-hr").css("bottom", endvalue);
      $("#about_div").css("margin-bottom", "-33px");
      $("#ascrail2000-hr").css("position", "relative");
      $(".slider_values").css("position", "relative");
    } else {
      $("#ascrail2000-hr").css("bottom", "17px");
      $("#ascrail2000-hr").css("position", "fixed");
      $("#ascrail2000-hr").css("z-index", "103");
      $(".slider_values").css("position", "fixed");
    }



  });
  //for paint


  //Setting dynamic width to canvas
  stage1.canvas.width = window.innerWidth;
  $(window).resize(function () {
     $("#blocks-workspace").getNiceScroll().resize();
    stage1.canvas.width = window.innerWidth;
    h = $("#about_div").height();
    $("#blocks-workspace").css("width", window.innerWidth);
    if (window.innerHeight < 1132) {
      $("#ascrail2000-hr").css("bottom", "17px");
      $("#ascrail2000-hr").css("position", "fixed");
      $("#ascrail2000-hr").css("z-index", "103");
      $(".slider_values").css("position", "fixed");
      $(".slider_values").css("bottom", "0px");
      $("#blocks-workspace").css("width", window.innerWidth);
      $("#blocks-workspace").css("height", "1132px");
    }
    if (window.innerHeight > 1132) {
      $("#blocks-workspace").css("height", window.innerHeight - 250);
      stage.canvas.height = window.innerHeight - 250;
      $("#toolbar").css("height", window.innerHeight - 87);
      $("#toolbar").css("min-height", "100px");
      $("#ascrail2000-hr").css("bottom", h + 17);
      $("#about_div").css("margin-bottom", "-33px");
      $("#ascrail2000-hr").css("position", "relative");
      $(".slider_values").css("position", "relative");
    }
    if (window.innerHeight > 1700) {
      $("#about_div").css("margin-bottom", "-15px");
    }
    cm_width = window.innerWidth;
    cm_height = window.innerHeight;
    var canvas = document.getElementById('workspace');
    canvasWidth = canvas.width;
  });


  $(window).scroll(function () {
    //if ($(window).scrollTop()+$("#outer-workspace").height() > ($('#workspace').height() / 2)) {  
    if ($(window).scrollTop() == ($(document).height() - $(window).height()) == true) {      
      var endvalue = h + 17;
      $("#ascrail2000-hr").css("bottom", endvalue);
      //console.log(endvalue);
      $("#about_div").css("margin-bottom", "-33px");
      $("#ascrail2000-hr").css("position", "relative");
      $(".slider_values").css("position", "relative");
      if (detectOs() == 'mac') {
        if (navigator.userAgent.indexOf("Firefox") != -1 && detectOs() == "mac") {
          $("#ascrail2000-hr .nicescroll-cursors").css("margin-top", "8px");
          //console.log(detectOs());
        }
      }
    } else {
      $("#ascrail2000-hr").css("bottom", "17px");
      $("#ascrail2000-hr").css("position", "fixed");
      $("#ascrail2000-hr").css("z-index", "103");
      $(".slider_values").css("position", "fixed");
      //$("#ascrail2000-hr .nicescroll-cursors").css("margin-top", "24px");
      if (detectOs() == 'mac') {
          if (navigator.userAgent.indexOf("Firefox") != -1 && detectOs() == "mac") {
            $("#ascrail2000-hr .nicescroll-cursors").css("margin-top", "24px");
            //console.log(detectOs());
          }
        }
    }

  })

  var cm_height = stage.canvas.height;
  var cm_width = window.innerWidth;
  var label, shape, oldX, oldY, size, color;
  var p;
  var penArray = new Array();
  var i;
  var j;
  // drag related variables
  var dragok = false;
  var dragcok = false;
  var startX;
  var startY;
  var startcX;
  var startcY;
  var BB = canvas.getBoundingClientRect();
  var offsetX = BB.left;
  var offsetY = BB.top;
  var scrollPos = 1;
  var detectBrowser = detectBrowser();
  var selectedNumerType = 'wn';
  var selectedSubType = "1";
  var selectedJumpTag = "showjumplength";
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

  $(".open_toolbar").on('click', function () {
    /* remove overlay class to left-toolbar */
    if ($(".disable-left-tray").length) {
      // $("#toolbar").unwrap();
    }

    jQuery("#button_options").toggle();

    if ($("#drawing_pen").hasClass("pen_image_selected")) {
      //console.log("handleopen from open toolbar" + " p is " + p);
      handleOpenPen();
    }

    if ($("#drawing_eraser").hasClass("eraser_image_selected")) {
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

  function handleOpenPen() {
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
      $('.trash').off('click');
    } else if ($("#drawing_pen").hasClass("pen_image_selected")) {
      //$('.keypad').off('click', handleKeypad).on('click', handleKeypad);
      check_keypad();
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
      stage.addChild(wrapper); //Add wrapper for paint
      $('.trash').off('click');
    } else if ($("#drawing_eraser").hasClass("eraser_image_selected")) {
      $("#drawing_eraser").removeClass("eraser_image_selected");
      $("#drawing_eraser").addClass("eraser_image");

      //Enabling back all functionalities when pen de-selected
      paintOpen = false;
      removeEventLiserners(stage);
      $('.keypad').off('click', handleKeypad).on('click', handleKeypad);
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
  wrapper.cache(0, 0, cm_width, stage.canvas.height); // Caching the wrapper

  function paint(p) {
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
    if ($("#drawing_eraser").hasClass("eraser_image_selected")) {
      handleOpenEraser();
    }
    p = 0;
    $(".pick_color").removeClass("hover_class");

    for (var count = 2; count > 0; count--) {
      //wrapper.uncache();
      //wrapper.cache(0, 0, cm_width, cm_height);
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
    wrapper.cache(0, 0, rulerWidth, stage.canvas.height); // Caching the wrapper	
    // multiSelection();
    //mouseDownAtEmpty();
  }

  //ruler code
  var rulerCont = new createjs.Container();
  var pinkCont = new createjs.Container();
  var ruler = new createjs.Shape();
  var rulerbackground = new createjs.Shape();
  var tickcircle = new createjs.Shape();
  var numberText;
  var textarray = new Array();
  var tickCircleArray = new Array();
  var tickino;
  //createRuler(30,60);

  // function to create ruler
  rulerCont.x = 0;
  rulerCont.y = (cm_height / 5) + 15;
  var nlDivider = (rulerCont.y * 2) - 5;
  rulerSpacing = 50;
  //for pink circle
  pinkCont.x = 0;
  pinkCont.y = (cm_height / 5) + 15;
  var tickShape = 0;

  function createRuler(width, length, textarr, tickcheck) {
    var spacing = rulerSpacing;
    if (textarr) {
      numberLines.test = new Array();
      numberLines.test = textarr;
      textarray = [];
    } else {
      textarray = [];
    }

    tickCircleArray = [];
    //console.log(tickCircleArray.length);
    //rulerCont.removeChild(tickcircle,tickino, ruler);
    //stage.removeChild(rulerCont);
    stage.update();
    //var k = Math.floor(length / spacing);
    var k = 101;
    //if (clock.clicked === 1) {
    //  k = 61;
    //} else {
    if (negativeEnabled === 1) {
      k = 102;
    } else {
      k = 101;
    }
    //}

    //console.log("ec" + rulerCont);
    //horizonatal scale

    ruler.graphics.moveTo(rulerCont.x, rulerCont.y + 4.5);
    ruler.graphics.beginStroke("#9e9e9e").setStrokeStyle(4);
    ruler.graphics.lineTo(rulerCont.x + length - 1, rulerCont.y + 4.5).endStroke();
    rulerCont.addChild(ruler);
    rulerbackground.graphics.beginFill("#ffffff").drawRect(rulerCont.x, rulerCont.y + 15, 19000, 54);
    rulerCont.addChild(rulerbackground);
    //console.log(rulerCont);
    stage.update();
    var symbol = false;
    var j = 0;
    //numberLine.test = 
    //rulerCont.removeChild(numberText);

    //console.log(selectedNumerType+'='+whlnum);
    if (selectedNumerType == 'wn' && whlnum > 10) {
      tickShape = 1; //small_ellipse
    } else if (selectedNumerType == 'dn' && decnum != '.1') {
      tickShape = 1;
    } else {
      tickShape = 0;  //circle
    }


    var idea1 = selectedSubType.replace("1/", "");
    var n = 1;
    var m = 0;
    for (var i = 1; i < k; i++) {
      if (textarr) {
        if (selectedNumerType === 'fn') {
          var cont = new createjs.Container();
          numberText = new createjs.Text(numberLines.test[j].text, "24px ProximaNova", "#494949");
          numberText.x = rulerCont.x + spacing * i;
          numberText.y = rulerCont.y + 22;
          textarray.push(numberText);
          // var idea = selectedSubType.replace("1/", "");
          cont.x = rulerCont.x + spacing * i;
          cont.y = rulerCont.y + 22;

          if (n < idea1) {
            if (m !== 0) {
              var num1 = new createjs.Text(m, "24px ProximaNova", "#494949");
              num1.textAlign = "left";
              if (m < 10)
                num1.x = -10;
              else if (m >= 20 && m < 100)
                num1.x = -20;
              else
                num1.x = -15;
              num1.y = -5;
              var f1 = new createjs.Text(n, "13px ProximaNova", "#494949");
              f1.x = 0;
              f1.y = -7;
              var f2 = new createjs.Text("-", "13px ProximaNova", "#494949");
              f2.scaleX = 2;
              f2.x = 0;
              f2.y = 0;
              var f3 = new createjs.Text(idea1, "13px ProximaNova", "#494949");
              f3.x = 0;
              f3.y = 10;
              var frCont = new createjs.Container();
              frCont.addChild(f1, f2, f3);

              if (m < 10)
                frCont.x = 7;
              else if (m >= 20 && m < 100)
                frCont.x = 10;
              else
                frCont.x = 9;
              cont.addChild(num1, frCont);
              rulerCont.addChild(cont);
              //textarray[i].text = m + "(" + n + "/" + idea1 + ")";
            } else {
              //textarray[i].text = n + "/" + idea1;               

              var f1 = new createjs.Text(n, "15px ProximaNova", "#494949");
              f1.x = 0;
              f1.y = -7;
              var f2 = new createjs.Text("-", "15px ProximaNova", "#494949");
              f2.scaleX = 2;
              f2.x = 0;
              f2.y = 0;
              var f3 = new createjs.Text(idea1, "15px ProximaNova", "#494949");
              f3.x = 0;
              f3.y = 10;
              var frCont = new createjs.Container();
              frCont.addChild(f1, f2, f3);
              cont.addChild(frCont);
              rulerCont.addChild(cont);
            }
            n++;
          } else {
            var val = m + 1;
            var num1 = new createjs.Text(val, "24px ProximaNova", "#494949");
            num1.textAlign = "center";
            num1.y = -5;
            if (val < 10)
              num1.x = 3;
            else if (val < 99)
              num1.x = 4;
            cont.addChild(num1);
            rulerCont.addChild(cont);
            n = 1;
            m++;
          }
          j++;
        } else {
          if (selectedNumerType === 'wn' || selectedNumerType === 'dn') {
            numberText = new createjs.Text(" " + numberLines.test[j].text, "24px ProximaNova", "#494949");
            numberText.x = rulerCont.x + spacing * i;
            //console.log(numberText.x);
            numberText.textAlign = "center";
          } else {
            numberText = new createjs.Text(numberLines.test[j].text, "24px ProximaNova", "#494949");
            numberText.x = rulerCont.x + spacing * i;
            //console.log(numberText.x);
            numberText.textAlign = "center";
          }
          numberText.y = rulerCont.y + 22;
          textarray.push(numberText);
          rulerCont.addChild(numberText);
          j++;
        }
        //console.log(numberText);

      } else {
        //textarray = [];	
        numberText = new createjs.Text(" " + i, "24px ProximaNova", "#494949");
        numberText.x = rulerCont.x + spacing * i;
        numberText.textAlign = "center";
        //console.log(numberText.x);
        numberText.y = rulerCont.y + 22;

        textarray.push(numberText);
        rulerCont.addChild(numberText);
      }
      if (zoom_check === 2) {
        numberText.text = " " + (numberText.text).toString().trim();
        numberText.textAlign = 'center';
      } else if (zoom_check === 3) {
        numberText.text = " " + (numberText.text).toString().trim();
        numberText.textAlign = 'center';
      } else {
        numberText.text = " " + (numberText.text).toString().trim();
      }

      ruler.graphics.beginStroke("#f4efff").setStrokeStyle(2);
      ruler.graphics.moveTo(numberText.x + 3, rulerCont.y);
      ruler.graphics.lineTo(numberText.x + 3, rulerCont.y - 560);
      ruler.graphics.moveTo(numberText.x + 3, rulerCont.y + 21).lineTo(numberText.x + 3, rulerCont.y + 1480).endStroke();
      ruler.graphics.beginStroke("#6d62b1").setStrokeStyle(5);
      ruler.graphics.moveTo(numberText.x + 3, rulerCont.y - 5);
      ruler.graphics.lineTo(numberText.x + 3, rulerCont.y + 15).endStroke();

      //tickcircle point
      tickcircle.graphics.beginStroke("#8cc383").setStrokeStyle(6);
      tickcircle.graphics.moveTo(numberText.x + 3, rulerCont.y - 5);
      tickcircle.graphics.lineTo(numberText.x + 3, rulerCont.y + 15).endStroke();
      tickcircle.graphics.beginStroke("#4d9442").setStrokeStyle(6);
      tickcircle.graphics.moveTo(numberText.x + 3, rulerCont.y - 5);
      tickcircle.graphics.lineTo(numberText.x + 3, rulerCont.y + 5).endStroke();
      tickcircle.graphics.setStrokeStyle(1);
      tickcircle.graphics.beginStroke("#99e09e");
      tickcircle.visible = tickcheck;
      //circle
      var tickino = "ticki" + i;
      tickino = new createjs.Shape();

      var lecirclex = numberText.x;
      var lecircley = numberText.y;
      tickino.graphics.clear().beginStroke("#8cc383").setStrokeStyle(3).beginFill("#99e09e");
      if (tickShape == 0) {
        tickino.graphics.drawCircle(numberText.x + 4, rulerCont.y + 37, 22.5).endStroke().endFill();
      } else if (tickShape == 1) {
        tickino.graphics.drawEllipse(lecirclex - 35, lecircley - 6, 80, 50).endStroke().endFill();
      }
      /*else if (tickShape == 2) {
       tickino.graphics.drawEllipse(lecirclex - 55, lecircley - 6, 120, 60).endStroke().endFill();
       }*/
      tickino.selected = 1;
      tickino.name = "circle" + i;
      tickino.visible = tickcheck;
      tickCircleArray.push(tickino);
      rulerCont.addChild(tickino);
      rulerCont.addChild(tickcircle);
      //tickcircle.on("mousedown",selectcircle(tickCircleArray[]));
      tickino.on("click", function () {
        selectcircle(this);
      });
      //checkbackup();

    }
    stage.addChild(rulerCont, pinkCont);
    updateMinMax();
    stage.update();
    for (var b in purplecircleArray) {
      stage.setChildIndex(purplecircleArray[b], stage.getNumChildren() - 1);
    }
    if (startUpMsg) {
      if (startUpMsg.visible === true) {
        stage.setChildIndex(startUpMsg, stage.getNumChildren() - 1);
      }
    }
    //calculator behind the veritical lines
	if(arrayofCalcContainer.length > 0){
      for (var b in arrayofCalcContainer) {
		stage.setChildIndex(arrayofCalcContainer[b], stage.getNumChildren() - 1);
	  }
	}
	//paint behind the veritical lines
	if(penArray.length > 0){
	  for (var b in penArray) {
		stage.setChildIndex(penArray[b], stage.getNumChildren() - 1);
	  }
	  stage.setChildIndex(wrapper, stage.getNumChildren() - 1);
	} 
  }

  function selectcircle(circle) {
    //console.log("circle children" + circle.name);
    if (circle.alpha == 1) {
      circle.alpha = .2;
      var textvisible = Number(circle.name.replace("circle", "")) - 1;
      //console.log("textvisible " + textvisible);
      textarray[textvisible].visible = true;
      stage.update();
    } else {
      circle.alpha = 1;
      var textvisible = Number(circle.name.replace("circle", "")) - 1;
      //console.log("textvisible " + textvisible);
      textarray[textvisible].visible = false;
      stage.update();
    }
  }
  $("#darkcircle").click(function () {
    if (tickcircle.visible) {
      tickcircle.visible = false;
      for (i = 0; i < textarray.length; i++) {
        //console.log(i);
        tickCircleArray[i].visible = false;
        textarray[i].visible = true;
        //stage.update();
      }
      stage.update();
    } else {
      tickcircle.visible = true;
      //console.log(tickCircleArray.length);
      for (j = 0; j < textarray.length; j++) {
        tickCircleArray[j].visible = true;
        tickCircleArray[j].alpha = 1;
        textarray[j].visible = false;
        //stage.update();
      }
    }
    stage.update();
  });
  $("#workspace").click(function () {
    $(".first_submenu").css('display', 'none');
    $("#numbers_content").css('display', 'none');
    $("#fractions_content").css('display', 'none');
    $("#decimal_content").css('display', 'none');
  });

  $("#numbercircle").click(function () {
    $("#numbercircle_submenu").css("display", "block");
    $("#numbercircle_submenu_overlay").css("display", "block");
  });
  $("#numbercircle_submenu_overlay").click(function () {
    $("#numbercircle_submenu").css("display", "none");
    $("#numbercircle_submenu_overlay").css("display", "none");
  });

  $(".wholenumbers").mouseover(function () {
    $(".wholenumbers").css("color", "#51469d");
    $(".fractions,.decimals").css("color", "#ffffff");
    $("#numbers_content").css("display", "inline-block");
    $("#fractions_content").css("display", "none");
    $("#decimal_content").css("display", "none");
  });
  $(".fractions").mouseover(function () {
    $(".fractions").css("color", "#51469d");
    $(".wholenumbers,.decimals").css("color", "#ffffff");
    $("#fractions_content").css("display", "inline-block");
    $("#numbers_content").css("display", "none");
    $("#decimal_content").css("display", "none");
  });
  $(".decimals").mouseover(function () {
    $(".decimals").css("color", "#51469d");
    $(".wholenumbers,.fractions").css("color", "#ffffff");
    $("#decimal_content").css("display", "inline-block");
    $("#fractions_content").css("display", "none");
    $("#numbers_content").css("display", "none");
  });
  $(".nonumbers,.negative_numbers,.title").mouseover(function () {
    $(".wholenumbers,.fractions,.decimals").css("color", "#ffffff");
    $("#decimal_content,#fractions_content,#numbers_content").css("display", "none");
  });
  //pick a whole number
  var whlnum = 1;
  $(".wholenumber").click(function () {
    whlnum = $(this).attr("id");
    $("#whole-number-message").dialog("open");
    $("#numbercircle_submenu_overlay").css("display", "none");
  });
  $("#whole-number-message").dialog({
    autoOpen: false,
    modal: true,
    open: function () {
      $('#whole-number-message .no').on('click', function () {
        $('#whole-number-message').dialog('close');
      });
      $('#whole-number-message .yes').on('click', function () {
        if (clock_cont.visible == true) {
          //console.log("true");
          clock_cont.visible = false;
          clock.clicked = 0;
          stage.canvas.width = rulerWidth + 140;
          //stage.canvas.width = stage.canvas.width;
          stage.update();
        }
        if (!(clock.mouseEnabled)) {
          clock.mouseEnabled = true;
          clock.alpha = 1;
        }
        if (whlnum > 10) {
          tickShape = 1; //small_ellipse
        } else {
          tickShape = 0; //circle
        }

        if (zoom_check < 2 && whlnum > 5 && whlnum < 101) {
          zoomin();
          actJumpWidth = 3 * rulerSpacing;
        } else if (zoom_check >= 2 && whlnum < 10) {
          //console.log(zoom_check);
          zoomout();
          actJumpWidth = 5 * rulerSpacing;
        }
        wholeNumber(whlnum);
        removePurpleTicks();
        if (clock.clicked == 1) {
          createclock(0);
        }
      });
    },
    title: "Clear your work?"
  });
  var decnum = ".1";
  //pick a decimal number
  $(".decimal").click(function () {
    decnum = $(this).attr("id");
    $("#decimal-number-message").dialog("open");
    $("#numbercircle_submenu_overlay").css("display", "none");
  });
  $("#decimal-number-message").dialog({
    autoOpen: false,
    modal: true,
    open: function () {
      $('#decimal-number-message .no').on('click', function () {
        $('#decimal-number-message').dialog('close');
      });
      $('#decimal-number-message .yes').on('click', function () {
        if (clock_cont.visible == true) {
          //console.log("true");
          clock_cont.visible = false;
          clock.clicked = 0;
          stage.canvas.width = rulerWidth + 140;
        }
        clock.mouseEnabled = false;
        clock.alpha = 0.2;
        if (decnum == '.1') {
          tickShape = 0;
        }
        /*else if(decnum == '.001' || decnum == '.125'){
         tickShape = 2; //big_ellipse
         }
         else if(decnum == '.01' || decnum == '.5' || decnum == '.25'){*/
        else {
          tickShape = 1;
        }

        if (decnum == ".01") {
          decimalNumber(decnum, 1000);
        } else if (decnum == ".001") {
          decimalNumber(decnum, 1000);
        } else {
          decimalNumber(decnum, 10);
        }
        removePurpleTicks();
        if (clock.clicked == 1) {
          createclock(0);
        }
        if (zoom_check < 2) {
          zoomin();
        }
        actJumpWidth = 3 * rulerSpacing;
      });
    },
    title: "Clear your work?"
  });
  var fractnum;
  //pick a fration number
  $(".fraction").click(function () {
    fractnum = $(this).attr("id");
    $("#fraction-number-message").dialog("open");
    //console.log(z);		
    $("#numbercircle_submenu_overlay").css("display", "none");
  });
  $("#fraction-number-message").dialog({
    autoOpen: false,
    modal: true,
    open: function () {
      $('#fraction-number-message .no').on('click', function () {
        $('#fraction-number-message').dialog('close');
      });
      $('#fraction-number-message .yes').on('click', function () {
        if (clock_cont.visible == true) {
          //console.log("true");
          clock_cont.visible = false;
          clock.clicked = 0;
          stage.canvas.width = rulerWidth + 140;
        }
        clock.mouseEnabled = false;
        clock.alpha = 0.2;
        fractionNumber(fractnum);
        if (zoom_check > 1) {
          zoomout();
        }
        removePurpleTicks();
        /*if (clock.clicked == 1) {
         createclock(0);
         }*/
      });
    },
    title: "Clear your work?"
  });
  $(".nonumbers").click(function () {
    $("#no-number-message").dialog("open");
    $("#numbercircle_submenu_overlay").css("display", "none");
  });
  $("#no-number-message").dialog({
    autoOpen: false,
    modal: true,
    open: function () {
      $('#no-number-message .no').on('click', function () {
        $('#no-number-message').dialog('close');
      });
      $('#no-number-message .yes').on('click', function () {
        if (clock_cont.visible == true) {
          //console.log("true");
          clock_cont.visible = false;
          clock.clicked = 0;
          stage.canvas.width = rulerWidth + 140;
        }
        clock.mouseEnabled = false;
        clock.alpha = 0.2;
        for (j = 0; j < textarray.length; j++) {
          textarray[j].text = "";
          $("#numbercircle_submenu").css("display", "none");
          $('#no-number-message').dialog('close');
        }
        removePurpleTicks();
        /*if (clock.clicked == 1) {
         createclock(0);
         }*/
        selectedNumerType = 'nn';
        selectedSubType = '';
        stage.update();
      });
    },
    title: "Clear your work?"
  });
  $(".go_btn").click(function () {
    $("#go-whlnum-message").dialog("open");
    $("#numbercircle_submenu_overlay").css("display", "none");
  });
  $("#go-whlnum-message").dialog({
    autoOpen: false,
    modal: true,
    open: function () {
      $('#go-whlnum-message .no').on('click', function () {
        $('#go-whlnum-message').dialog('close');
      });
      $('#go-whlnum-message .yes').on('click', function () {
        var value = $("#custom_text_whole_number").val();
        var numcheck = Number(value);
		if (!(clock.mouseEnabled)) {
          clock.mouseEnabled = true;
          clock.alpha = 1;
        }
        //console.log(value);
        if (value > 0 && value < 101) {
          wholeNumber(value);
        }
        if (zoom_check < 2 && value > 1 && value < 101) {
          zoomin();
        }
        removePurpleTicks();
        stage.update();
      });
    },
    title: "Clear your work?"
  });

  function checkNegativeEnabled() {
    if ($("#neg-checkbox").is(':checked')) {
      toNegative();
    }
    /*else {
     //console.log("NOT CHECKED");
     }*/
  }



  var negativeEnabled = 0;
  // Show Negative Numbers checkbox is checked

  $("#neg-checkbox").change(function () {
    if (this.checked) {
      if (negativeEnabled != 1) {
        negativeEnabled = 1;
        toNegative();
      }
    } else {
      if (negativeEnabled != 0) {
        negativeEnabled = 0;
        toPositive();
      }
    }

  });

  numberLines.backupArray = new Array();

  //var backupArray=new Array();

  // Convert all the numbers to negative
  function toNegative() {
    var finalArray = new Array();
    numberLines.backupArray = new Array();
    for (var j = 0; j < textarray.length; j++) {
      numberLines.backupArray.push(textarray[j].text);
    }

    textarray = new Array();
    for (i = 0; i <= 101; i++) {
      numberText = new createjs.Text("" + i, "24px ProximaNova", "#494949");
      numberText.x = rulerCont.x + rulerSpacing * i;
      numberText.y = rulerCont.y + 22;
      textarray.push(numberText);
    }

    var bound = textarray.length / 2;
    for (var j = bound - 1; j > 0; j--) {
      var value = "" + textarray[j].text;
      finalArray.push("-" + value);
    }
    finalArray.push(textarray[0].text);
    for (var j = 1; j < bound; j++) {
      var value = "" + textarray[j].text;
      finalArray.push("" + value);
    }

    for (var j = 0; j < finalArray.length; j++) {
      textarray[j].text = finalArray[j];
    }

    window.setTimeout(function () {
      $("#numbercircle_submenu").css("display", "none");
    }, 1000);
    stage.canvas.width = stage.canvas.width + 40;
    ruler.graphics.clear();
    var tickcheck = tickcircle.visible;
    //rulerSpacing = 50;
    tickcircle.graphics.clear();
    rulerCont.removeAllChildren();
    stage.update();
    rulerWidth = (rulerSpacing + 1) * 100;
    createRuler(30, rulerWidth, textarray, tickcheck);

    updateMinMax();
    if (clock_cont.visible == true) {
        //console.log("true");
        clock_cont.visible = false;
        clock.clicked = 0;
        stage.canvas.width = rulerWidth + 180;
    }
    clock.mouseEnabled = false;
    clock.alpha = 0.2;
    if (jumpObjectsList.length > 0) {
        //console.log(jumpObjectsList);
        for (var b in jumpObjectsList) {
          stage.setChildIndex(jumpObjectsList[b], stage.getNumChildren() - 1);
          stage.update();
        }
      }
    stage.update();
  }

  // Convert all the numbers to positive
  function toPositive() {

    for (var j = 0; j < textarray.length; j++) {
      textarray[j].text = numberLines.backupArray[j];
    }
    window.setTimeout(function () {
      $("#numbercircle_submenu").css("display", "none");
    }, 1000);
    updateMinMax();
    stage.canvas.width = stage.canvas.width - 40;
    ruler.graphics.clear();
    var tickcheck = tickcircle.visible;
    //rulerSpacing = 50;
    tickcircle.graphics.clear();
    rulerCont.removeAllChildren();
    stage.update();
    rulerWidth = (rulerSpacing + 1) * 100;
    createRuler(30, rulerWidth, textarray, tickcheck);
    if (!(clock.mouseEnabled) && selectedNumerType == 'wn') {
      clock.mouseEnabled = true;
      clock.alpha = 1;
    }

    stage.update();
  }

  function decimalNumber(num, offset) {
    var dec = Number(num);
    var multi = Number(num);
    selectedSubType = num;
    selectedNumerType = 'dn';
    //console.log(textarray.length);
    for (j = 0; j < textarray.length; j++) {
      textarray[j].text = dec;
      dec = (dec * offset + multi * offset) / offset;
      //console.log(dec);
      //console.log(j + "j");
    }
    $("#numbercircle_submenu").css("display", "none");
    $("#decimal-number-message").dialog("close");
    checkNegativeEnabled();
    updateMinMax();
    stage.update();
  }

  function wholeNumber(num) {
    var wholenum = Number(num);
    var difference = Number(num);
    selectedNumerType = 'wn';
    selectedSubType = num;
    for (var j = 0; j < textarray.length; j++) {
      textarray[j].text = wholenum;
      wholenum = wholenum + difference;
      //console.log(wholenum);
    }
    $("#numbercircle_submenu").css("display", "none");
    if ($('#whole-number-message').dialog('isOpen')) {
      $('#whole-number-message').dialog('close');
    }
    if ($('#go-whlnum-message').dialog('isOpen')) {
      $('#go-whlnum-message').dialog('close');
    }
    checkNegativeEnabled();
    ruler.graphics.clear();
    var tickcheck = tickcircle.visible;
    tickcircle.graphics.clear();
    rulerCont.removeAllChildren();
    stage.update();
    rulerWidth = (rulerSpacing + 1) * 100;
    createRuler(30, rulerWidth, textarray, tickcheck);
    updateMinMax();
    stage.update();
  }

  function fractionNumber(num) {
    //console.log(num);
    var wholenum = num;
    var difference = num;
    var idea = num.replace("1/", "");

    selectedNumerType = 'fn';
    selectedSubType = num;

    var n = 1;
    var i = 0;
    for (var j = 0; j < textarray.length; j++) {
      if (n < idea) {
        if (i != 0) {
          textarray[j].text = i + "-" + n + "/" + idea + " ";
        } else {
          textarray[j].text = n + "/" + idea;
        }
        n++;
      } else {
        textarray[j].text = i + 1;
        n = 1;
        i++;
      }
      //console.log(num);
    }
    $("#numbercircle_submenu").css("display", "none");
    $('#fraction-number-message').dialog('close');
    checkNegativeEnabled();
    updateMinMax();
    //stage.update();

    ruler.graphics.clear();
    var tickcheck = tickcircle.visible;
    //rulerSpacing = 50;
    tickcircle.graphics.clear();
    rulerCont.removeAllChildren();
    stage.update();
    rulerWidth = (rulerSpacing + 1) * 100;
    createRuler(30, rulerWidth, textarray, tickcheck);
    stage.update();

  }

  var lightPurpleBorder = "#d1cdeb";
  var darkPurpleBorder = "#9288d0";
  var purpleBG = "#e8e6f7";

  var cirlceno = 1;
  var purpleTickArray = new Array();
  var purpleTickCircleArray = new Array();
  var purpleTickTextArray = new Array();
  var purplecircleArray = new Array();
  var numCountArray = new Array();
  var numcnt = purpleTickCircleArray.length;
  var cnt = 0;
  $("#purplecircle").click(function () {
    //tickcircle point

    // numcnt = purpleTickCircleArray.length+1;   

    if (scrollPos > 1 && cirlceno === 1) {
      //cirlceno = scrollPos;
    }

    var arr = Object.keys(numCountArray).map(function (key) {
      return numCountArray[key];
    });
    var max = Math.max.apply(null, arr);
    var av = [];
    function compare(a, b) {
      if (a < b)
        return -1;
      if (a > b)
        return 1;
      return 0;
    }
    numCountArray.sort(compare);
    for (var i = 1; i < max; i++)
    {
      if (numCountArray.indexOf(i) === -1) {
        av.push(i);
        break;
      }
    }
    if (av.length > 0) {
      numcnt = av[0];
    } else {
      numcnt = cirlceno;
    }
    numCountArray.push(numcnt);

    //deselect other purplecircles
    deselectpurplecircle();

    //pink container
    var pinkCont = new createjs.Container();
    pinkCont.x = 0;
    pinkCont.y = (rulerCont.y);
    pinkCont.type = "purplecircle";
    pinkCont.textspace = 16;
    pinkCont.cursor = "pointer";
    pinkCont.selected = 1;
    pinkCont.array = new Array();
    pinkCont.fontcolor = "#494949";
    pinkCont.numberCounter = 3;
	pinkCont.widthec = 75;
	pinkCont.dragZoomCheck = 0;
   // var lecirclex = rulerSpacing * numcnt + 3;
   pinkCont.x = rulerSpacing * numcnt + 3
    var lecirclex = 0;
	var lecircley = pinkCont.y;
    //purpleline
    var purpleline = new createjs.Shape();
    purpleline.name = 'purpleline';
    purpleline.graphics.clear().beginStroke("#6d62b1").setStrokeStyle(5);
    purpleline.graphics.moveTo(lecirclex, pinkCont.y + 5);
    purpleline.graphics.lineTo(lecirclex, pinkCont.y - 5).endStroke();
    purpleline.graphics.beginStroke("#a49bdf").setStrokeStyle(5);
    purpleline.graphics.moveTo(lecirclex, pinkCont.y + 5);
    purpleline.graphics.lineTo(lecirclex, pinkCont.y + 15).endStroke();
    purpleline.graphics.setStrokeStyle(2);

    //purpleBorder
    var purpleBorder = new createjs.Shape();
    purpleBorder.name = 'purpleBorder';

    //purplecircle
    var purplecircle = "purplecircule" + cirlceno;
    purplecircle = new createjs.Shape();
    purplecircle.selected = 1;
    purplecircle.name = "circle" + numcnt;
    purplecircle.alpha = 0.4;
	purplecircle.shape = 0; // 0 => circle and 1 => Ellipse
	//purplecircle.width = 80;
    //tickShape
    if (tickShape == 0) {
      purpleBorder.graphics.beginStroke(darkPurpleBorder).setStrokeStyle(3).drawCircle(lecirclex, pinkCont.y + 37, 22.5).endStroke().endFill();
      purplecircle.graphics.beginFill(purpleBG).drawCircle(lecirclex, pinkCont.y + 37, 21);
    }
    if (tickShape == 1) {
      purpleBorder.graphics.beginStroke(darkPurpleBorder).setStrokeStyle(3).drawEllipse(lecirclex - 37, lecircley + 15, purplecircle.width, 50).endStroke().endFill();
      purplecircle.graphics.beginFill(purpleBG).drawEllipse(lecirclex - 37, lecircley + 15, purplecircle.width, 50);
    }
    /*if (tickShape == 2) {
     purplecircle.graphics.drawEllipse(lecirclex - 55, lecircley + 16, 120, 60).endStroke().endFill();
     }*/

    //numberText
    var numberText = new createjs.Text('', "20px proximanova", "#494949");
    numberText.textBaseline = "top";
    numberText.x = rulerCont.x + 3 + numcnt * 50, numberText.y = pinkCont.y + 10;
    numberText.circleNum = numcnt;
    numberText.name = "numberText";

    purpleTickArray.push(purpleline);
    purpleTickCircleArray.push(purplecircle);
    purpleTickTextArray.push(numberText);
    cirlceno += 1;

    //tickcircle.on("mousedown",selectcircle(tickCircleArray[]));
    //on mouse down deselect the others and select only the selected circle
    // press move only the icons that is dragged
    //green color and purple color can be collided but the purple should be on the top
    //green is to hide the entire number and purple is to highlight what is needed

    //mousedown
	purplecircle.oldX = purplecircle.x;
    purplecircle.on('mousedown', function (e) {
      if (!this.selected) {
        selectpurplecircle(purplecircle);
      }
      var posX = e.stageX;
      var posY = e.stageY;
      this.parent.oldX = this.parent.x;
      this.parent.oldY = this.parent.y;
      this.parent.offset = {
        x: this.parent.x - posX,
        y: this.parent.y - posY
      };
      purplecircleClick(e);
    });

    purplecircle.on('click', function (e) {
      pcjumpKeypad(this.parent);
    });

    purplecircle.on('mouseup', function (e) {
      dragcok = false;
    });
    purplecircle.removeAllEventListeners('pressmove');
    purplecircle.on('pressmove', function (e) {
      var cicleCount = selectedCircleCount();
      var jumpCount = selectedJumpObjectsCount();
      //console.log(jumpCount);
      if (cicleCount > 1 || jumpCount > 0) {
        var posX = e.stageX;
        var posY = e.stageY;
        dragMultipleObjects(e, this);
      } else {
        var posX = e.stageX;
        var posY = e.stageY;
        this.parent.x = posX + this.parent.offset.x;
      //  purpleline.x = posX + this.offset.x;
      //  purpleBorder.x = posX + this.offset.x;
        //numberText.x = posX - 25;
        if (pinkCont.getChildByName('purplecircletextcont')) {
          var textpurple = pinkCont.getChildByName('purplecircletextcont');
       //   textpurple.x = posX + this.offset.x;
        }
        $("#jumpKeypadSection").css("display", "none");
        if (gg) {
          stage.removeChild(gg);
          //stage.update();
        }
        stage.update();
      }
    });

    purplecircleArray.push(pinkCont);
    pinkCont.addChild(purpleBorder, purplecircle, purpleline, numberText);
    stage.addChild(pinkCont);
    stage.update();
  });


  function purplecircleClick(e) {
    // get the current mouse position
    var mx = parseInt(e.stageX - offsetX);
    var my = parseInt(e.stageY - offsetY);

    // test each rect to see if mouse is inside
    dragcok = false;
    for (var i = 0; i < purpleTickCircleArray.length; i++) {
      var r = purpleTickCircleArray[i];
      // if yes, set that rects isDragging=true
      if (r.selected === 1) {
        dragcok = true;
      }
    }

    // save the current mouse position
    startcX = mx;
    startcY = my;
  }

  // To get selectedJumpObjectsCount
  function selectedJumpObjectsCount() {
    //console.log(jumpObjectsList.length);
    var jumpCount = 0;
    for (i = 0; i < jumpObjectsList.length; i++) {
      var jumpContainer = jumpObjectsList[i];
      if (jumpContainer.getChildAt(2).visible == true || jumpContainer.getChildAt(3).visible == true || jumpContainer.getChildAt(4).visible == true) {
        jumpCount = jumpCount + 1;
      }
    }
    return jumpCount;
  }

  // To get selectedCircleCount
  function selectedCircleCount() {
    var count = 0;
    for (i = 0; i < purpleTickCircleArray.length; i++) {
      if (purpleTickCircleArray[i].selected == 1) {
        count = count + 1;
      }
    }
    return count;
  }

  /**
   * To drag Multiple circles on ruler
   * @param {type} e
   * @param {type} contain
   * @returns {undefined}
   */
  function dragMultipleObjects(e, contain) {
    if (dragcok) {
      var mx = parseInt(e.stageX - offsetX);
      var my = parseInt(e.stageY - offsetY);
      var dx = mx - startcX;

      for (var i = 0; i < purpleTickCircleArray.length; i++) {
        if (purpleTickCircleArray[i].selected === 1) {
          purpleTickCircleArray[i].x += dx;
          purpleTickCircleArray[i].parent.getChildByName("purpleBorder").x += dx;
          purpleTickCircleArray[i].parent.getChildByName("purpleline").x += dx;
        }
      }
      for (var pl in purpleTickArray) {
        if (purpleTickArray[pl].selected === 1) {
          purpleTickArray[pl].x += dx;
        }
      }
      for (var pt in purpleTickTextArray) {
        if (purpleTickTextArray[pt].selected === 1) {
          purpleTickTextArray[pt].x += dx;
        }
      }
      startcX = mx;
      startcY = my;
    }
    contain.x = e.stageX + contain.offset.x;
    stage.update();
  }

  function selectpurplecircle(circle) {
    deselectJumpObjects();
    deselectpurplecircle();
    var pinkCont = circle.parent;
    var numcnt = circle.name.replace("circle", "");
    var lecirclex = rulerSpacing * numcnt + 3;
    var lecircley = pinkCont.y;
    var purpleBorder = circle.parent.getChildByName("purpleBorder");
    if (tickShape == 0) {
      //purpleBorder.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).drawCircle(lecirclex, pinkCont.y + 37, 22.5).endStroke().endFill();
      //circle.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).beginFill(purpleBG);
      //circle.graphics.drawCircle(lecirclex, pinkCont.y + 37, 22.5).endStroke().endFill();
    }
    if (tickShape == 1) {
      //purpleBorder.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).drawEllipse(lecirclex - 37, lecircley + 15, 80, 50).endStroke().endFill();
      //circle.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).beginFill(purpleBG);
      //circle.graphics.drawEllipse(lecirclex - 37, lecircley + 15, 80, 50).endStroke().endFill();
    }
    /*if (zoom_check === 3) {
     circle.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).beginFill(purpleBG);
     circle.graphics.drawEllipse(lecirclex - 55, lecircley + 16, 120, 60).endStroke().endFill();
     }*/
    //circle.alpha = 1;
    circle.selected = 1;
    circle.parent.selected = 1;
    stage.setChildIndex(circle.parent, stage.getNumChildren() - 1);
    stage.update();
  }

  function entertext(value, circle) {
    //console.log(value + " value");
    //console.log(circle.x + " circle");


    // text.name = "fil" + textarrayname;
    stage.update();
  }

  function deselectpurplecircle() {
    for (i = 0; i < purpleTickCircleArray.length; i++) {
      purpleTickCircleArray[i].selected = 0;
      purpleTickCircleArray[i].parent.selected = 0;
      var pinkCont = purpleTickCircleArray[i].parent;
      var purpleBorder = pinkCont.getChildByName("purpleBorder");
      var numcnt = purpleTickCircleArray[i].name.replace("circle", "");
      var lecirclex = rulerSpacing * numcnt + 3;
      var lecircley = pinkCont.y;
      if (tickShape == 0) {
        //purpleBorder.graphics.clear().beginStroke(lightPurpleBorder).setStrokeStyle(3).drawCircle(lecirclex, pinkCont.y + 37, 22.5).endStroke().endFill();
        //purpleTickCircleArray[i].graphics.clear().beginStroke(lightPurpleBorder).setStrokeStyle(3).beginFill(purpleBG);
        //purpleTickCircleArray[i].graphics.drawCircle(lecirclex, pinkCont.y + 37, 22.5).endStroke().endFill();

      }
      if (tickShape == 1) {
        //purpleBorder.graphics.clear().beginStroke(lightPurpleBorder).setStrokeStyle(3).drawEllipse(lecirclex - 37, lecircley + 15, 80, 50).endStroke().endFill();
        //purpleTickCircleArray[i].graphics.clear().beginStroke(lightPurpleBorder).setStrokeStyle(3).beginFill(purpleBG);
        //purpleTickCircleArray[i].graphics.drawEllipse(lecirclex - 37, lecircley + 15, 80, 50).endStroke().endFill();
      }
      /*if (zoom_check === 3) {
       purpleTickCircleArray[i].graphics.clear().beginStroke(lightPurpleBorder).setStrokeStyle(3).beginFill(purpleBG);
       purpleTickCircleArray[i].graphics.drawEllipse(lecirclex - 55, lecircley + 16, 120, 60).endStroke().endFill();
       }*/
    }
    for (i = 0; i < purpleTickArray.length; i++) {
      //purpleTickArray[i].alpha = .4;
      // purpleTickArray[i].selected = 0;
    }
    for (i = 0; i < purpleTickTextArray.length; i++) {
      // purpleTickTextArray[i].alpha = .4;
      // purpleTickTextArray[i].selected = 0;
    }
    stage.update();
  }
  /**
   * Deselect the purple circle
   * @returns {undefined}
   */
  function deselectPA() {
    for (i = 0; i < purplecircleArray.length; i++) {
      purplecircleArray[i].selected = 0;
      var child = purplecircleArray[i].children;
      for (var c in child) {
        //child[c].alpha = .4;
        child[c].selected = 0;
      }
    }
  }
  /**
   * Remove all PurpleTicks
   * @returns {undefined}
   */
  function removePurpleTicks() {
    for (var nl in purplecircleArray) {
      stage.removeChild(purplecircleArray[nl]);
    }
    for (var nl in jumpObjectsList) {
      stage.removeChild(jumpObjectsList[nl]);
    }
    jumpObjectsList = [];
    purplecircleArray = [];
    purpleTickCircleArray = [];
    purpleTickArray = [];
    purpleTickTextArray = [];
  }

  $(".duplicate_frame_image").off('click', handleClone).on('click', handleClone);

  /**
   * function for clone the purple circl and number jump
   * @returns {undefined}
   */
  function handleClone() {
    if (purplecircleArray.length > 0) {
      //var clonedPurplecircle = clonePurplecircle(purplecircleArray);
      var clonedPurplecircle = clonePurplecircle_new(purplecircleArray);
     // deselectpurplecircle();
      for (var c in clonedPurplecircle) {
        clonedPurplecircle[c].selected = 1;
        purplecircleArray.push(clonedPurplecircle[c]);
        stage.addChild(clonedPurplecircle[c]);
        stage.update();
      }
    }
    if (jumpObjectsList.length > 0) {
      clonednumberLine = numberLineObject(jumpObjectsList);
      deselectJumpObjects();
      for (var c in clonednumberLine) {
        jumpObjectsList.push(clonednumberLine[c]);
        stage.addChild(clonednumberLine[c]);
        stage.update();
      }
	  verticallimit_new();
    }
  }
  /**
   *  Function to clone tickmark
   * @param {type} purplecircleArray
   * @returns {Array}
   */
  function clonePurplecircle_new(purplecircleArray) {
    var duplicatePurplecircle = new Array();
    for (var pc in purplecircleArray) {
      if (purplecircleArray[pc].selected === 1) {
        var clonedpc = purplecircleArray[pc].clone(true);
       // clonedpc.x = 0;
        clonedpc.y = (rulerCont.y);
        clonedpc.type = "purplecircle";
        clonedpc.textspace = 16;
        clonedpc.cursor = "pointer";
        clonedpc.selected = 1;
        clonedpc.array = new Array();
        clonedpc.fontcolor = "#494949";
        clonedpc.numberCounter = 3;
        clonedpc.widthec = 80;
        var arr = Object.keys(numCountArray).map(function (key) {
          return numCountArray[key];
        });
        var max = Math.max.apply(null, arr);
        var av = [];
        function compare(a, b) {
          if (a < b)
            return -1;
          if (a > b)
            return 1;
          return 0;
        }
        numCountArray.sort(compare);
        for (var i = 1; i < max; i++)
        {
          if (numCountArray.indexOf(i) === -1) {
            av.push(i);
            break;
          }
        }
        if (av.length > 0) {
          numcnt = av[0];
        } else {
          numcnt = cirlceno;
        }
        numCountArray.push(numcnt);
        //deselect other purplecircles
        deselectpurplecircle();
        var lecirclex = 0;
	     clonedpc.x = rulerSpacing * numcnt + 3;
        var lecircley = clonedpc.y;

        //purpleline
        var purpleline = clonedpc.getChildByName('purpleline');
        purpleline.graphics.clear().beginStroke("#6d62b1").setStrokeStyle(5);
        purpleline.graphics.moveTo(lecirclex, clonedpc.y + 5);
        purpleline.graphics.lineTo(lecirclex, clonedpc.y - 5).endStroke();
        purpleline.graphics.beginStroke("#a49bdf").setStrokeStyle(5);
        purpleline.graphics.moveTo(lecirclex, clonedpc.y + 5);
        purpleline.graphics.lineTo(lecirclex, clonedpc.y + 15).endStroke();
        purpleline.graphics.setStrokeStyle(2);

        //purpleBorder
        var purpleBorder = clonedpc.getChildByName('purpleBorder');
        //purplecircle     
        var purplecircle = "";
        for (var c in clonedpc.children) {
          if (typeof clonedpc.children[c].name !== 'undefined' && (clonedpc.children[c].name).indexOf('circle') !== -1 && clonedpc.children[c].name !== 'purplecircletextcont') {
            purplecircle = clonedpc.children[c];
            purplecircle.new = 0;
            if (typeof purplecircle.graphics === 'undefined') {
              purplecircle.parent.removeChild(purplecircle);
              purplecircle = new createjs.Shape();
              purplecircle.new = 1;
            }
          }
        }
        purplecircle.selected = 1;
        purplecircle.name = "circle" + numcnt;       
        if (purplecircle.shape == 0) {
          if (purplecircle.new === 0) {
            purplecircle.graphics.clear().beginFill(purpleBG).drawCircle(lecirclex, clonedpc.y + 37, 21);
          } else {
            purplecircle.graphics.beginFill(purpleBG).drawCircle(lecirclex, clonedpc.y + 37, 21);
          }
          purpleBorder.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).drawCircle(lecirclex, clonedpc.y + 37, 22.5).endStroke().endFill();
        }
        if (purplecircle.shape == 1) {
          purpleBorder.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).drawEllipse(lecirclex - 37, lecircley + 15, purplecircle.width, 50).endStroke().endFill();
          purplecircle.graphics.clear().beginFill(purpleBG).drawEllipse(lecirclex - 37, lecircley + 15, purplecircle.width, 50);
        }

        //numberText
        var numberText = clonedpc.getChildByName('numberText');
        numberText.x = rulerCont.x + 3 + numcnt * 50, numberText.y = clonedpc.y + 10;
        numberText.circleNum = numcnt;

        purpleTickArray.push(purpleline);
        purpleTickCircleArray.push(purplecircle);
        purpleTickTextArray.push(numberText);
        cirlceno += 1;

        //mousedown
       /* purplecircle.on('mousedown', function (e) {
          if (!this.selected) {
            selectpurplecircle(purplecircle);
          }
          var posX = e.stageX;
          var posY = e.stageY;
          this.oldX = this.x;
          this.oldY = this.y;
          this.offset = {
            x: this.x - posX,
            y: this.y - posY
          };
          purplecircleClick(e);
        });
		*/
		
    purplecircle.on('mousedown', function (e) {
      if (!this.selected) {
        selectpurplecircle(purplecircle);
      }
      var posX = e.stageX;
      var posY = e.stageY;
      this.parent.oldX = this.parent.x;
      this.parent.oldY = this.parent.y;
      this.parent.offset = {
        x: this.parent.x - posX,
        y: this.parent.y - posY
      };
      purplecircleClick(e);
    });

        purplecircle.on('click', function (e) {
          pcjumpKeypad(this.parent);
        });

        purplecircle.on('mouseup', function (e) {
          dragcok = false;
        });
        purplecircle.removeAllEventListeners('pressmove');
        purplecircle.on('pressmove', function (e) {
          var cicleCount = selectedCircleCount();
          var jumpCount = selectedJumpObjectsCount();
          //console.log(jumpCount);
          if (cicleCount > 1 || jumpCount > 0) {
            var posX = e.stageX;
            var posY = e.stageY;
            dragMultipleObjects(e, this);
          } else {
            var posX = e.stageX;
            var posY = e.stageY;
            this.parent.x = posX + this.parent.offset.x;
            //purpleline.x = posX + this.offset.x;
            //purpleBorder.x = posX + this.offset.x;
            if (clonedpc.getChildByName('purplecircletextcont')) {
              var textpurple = clonedpc.getChildByName('purplecircletextcont');
              //textpurple.x = posX + this.offset.x;
            }
            $("#jumpKeypadSection").css("display", "none");
            if (gg) {
              stage.removeChild(gg);
              //stage.update();
            }
          }
        });
        clonedpc.addChild(purpleBorder, purplecircle, purpleline, numberText);      
        var purplecircletextcont = clonedpc.getChildByName('purplecircletextcont');
        if (purplecircletextcont) {
          purplecircle.alpha = 1;
          clonedpc.setChildIndex(purplecircletextcont, clonedpc.getNumChildren() - 1);
        } else {
          purplecircle.alpha = 0.4;
        }
        duplicatePurplecircle.push(clonedpc);
      }
    }
    return duplicatePurplecircle;
  }
  /**
   * clonePurplecircle
   * @param {type} purplecircleArray
   * @returns {Array}
   */
  /*function clonePurplecircle(purplecircleArray) {

    var duplicatePurplecircle = new Array();
    for (var pc in purplecircleArray) {
      if (purplecircleArray[pc].selected === 1) {
        var clonedpc = purplecircleArray[pc].clone(true);
        numCountArray.push(cirlceno);
        //clonedpc.x = clonedpc.x + 50;
        clonedpc.selected = 1;
        clonedpc.cursor = "pointer";
        clonedpc.removeAllEventListeners();

        var pcChild = clonedpc.children;
        for (var ch in  pcChild) {

          if (typeof pcChild[ch].name !== 'undefined' && pcChild[ch].name === 'purpleline') {
            purplelineCloned = pcChild[ch];
            purplelineCloned.cnt = cirlceno;
            purpleTickArray.push(purplelineCloned);
          }
          if (typeof pcChild[ch].name !== 'undefined' && pcChild[ch].name === 'numberText') {
            numberTextCloned = pcChild[ch];
            numberTextCloned.circleNum = cirlceno;
            purpleTickTextArray.push(numberTextCloned);
          }

          pcChild[ch].selected = 1;
          pcChild[ch].removeAllEventListeners();

          if (typeof pcChild[ch].name !== 'undefined' && (pcChild[ch].name).indexOf('circle') !== -1) {

            pcChild[ch].name = "circle" + cirlceno;
            pcChild[ch].selected = 0;
            var lecirclex = (rulerSpacing * (cirlceno - 1)) + 3;
            pcChild[ch].x = lecirclex;
            pcChild[ch].cnt = cirlceno;
            selectpurplecircle(pcChild[ch]);
            pcChild[ch].on('mousedown', function (e) {
              if (!this.selected) {
                selectpurplecircle(this);
              }
              var posX = e.stageX;
              var posY = e.stageY;
              this.oldX = this.x;
              this.oldY = this.y;
              this.offset = {
                x: this.x - posX,
                y: this.y - posY
              };
              purplecircleClick(e);
            });

            pcChild[ch].on('pressmove', function (evt) {
              var cicleCount = selectedCircleCount();
              var jumpCount = selectedJumpObjectsCount();
              if (cicleCount > 1 || jumpCount > 0) {
                var posX = evt.stageX;
                //this.x = posX + this.offset.x;
                //purplelineCloned.x = posX + this.offset.x;
                // numberTextCloned.x = posX - 25;
                dragMultipleObjects(evt, this);
              } else {
                var posX = evt.stageX;

                for (var pt in purpleTickArray) {
                  if (purpleTickArray[pt].cnt === this.cnt) {
                    purplelineCloned = purpleTickArray[pt];
                  }
                }
                purplelineCloned.x = posX + this.offset.x;
                this.x = posX + this.offset.x;
                numberTextCloned.x = posX - 25;

                var purpleBorderCloned = this.parent.getChildByName("purpleBorder");
                purpleBorderCloned.x = purplelineCloned.x - (lecirclex);
                if (pinkCont.getChildByName('purplecircletextcont')) {
                  var textpurple = pinkCont.getChildByName('purplecircletextcont');
                  //pinkCont.x = posX - 25;
                  textpurple.x = posX + this.offset.x;
                }
              }
            });
            purpleTickCircleArray.push(pcChild[ch]);
          }
        }
        cirlceno++;
        duplicatePurplecircle.push(clonedpc);
      }
    }
    return duplicatePurplecircle;
  }*/
  /**
   * numberLineObject clone
   * @param {type} numberLineArray
   * @returns {Array}
   */
  function numberLineObject(numberLineArray) {
    var duplicateShapes = new Array();
    for (var b in numberLineArray) {
      if (numberLineArray[b].selected === 1) {
	var cloned = numberLineArray[b].clone(true);
	cloned.color = numberLineArray[b].color;
	cloned.jumpWidth = numberLineArray[b].jumpWidth;
	cloned.index = numberLineArray[b].index;
	cloned.x = cloned.x + rulerSpacing;
	cloned.y = cloned.y + 50;
	cloned.selected = 1;
	cloned.cursor = 'pointer';
	var indexv = cloned.index;
	var innerbase = cloned.getChildByName('innerbase');
	var shape = cloned.getChildByName('base');
		
	var rightbitmap = cloned.getChildByName('right');
	var leftbitmap = cloned.getChildByName('left');
	var topbitmap = cloned.getChildByName('top');
	
	snap[snapIndex] = {};
	snap[snapIndex].rectX = snap[indexv].rectX;
	snap[snapIndex].rectY = snap[indexv].rectY;
	snap[snapIndex].rectWidth = snap[indexv].rectWidth;
	snap[snapIndex].rectHeight = snap[indexv].rectHeight;
	snap[snapIndex].rectRadius = snap[indexv].rectRadius;
	snap[snapIndex].targetWidth = snap[indexv].rectWidth;
		
	snap[snapIndex].activate = snap[indexv].activate;

	if (cloned.color === 'red') {
	  shape.graphics.clear().beginFill(red_shape_color).drawRoundRect(rightbitmap.x - 6, rightbitmap.y - 9, snap[snapIndex].targetWidth, snap[snapIndex].rectHeight, snap[snapIndex].rectRadius);
	} else {
	  shape.graphics.clear().beginFill(blue_shape_color).drawRoundRect(leftbitmap.x - 5, leftbitmap.y - 9, snap[snapIndex].targetWidth, snap[snapIndex].rectHeight, snap[snapIndex].rectRadius);
	}
		
	cloned.index = snapIndex;
	cloned.leftCrossedRight = numberLineArray[b].leftCrossedRight;
	cloned.rightCrossedLeft = numberLineArray[b].rightCrossedLeft;
	snapIndex = snapIndex + 1;
	
	innerbase.widthi = innerBaseWidth;
	cloned.type = numberLineArray[b].type;
	cloned.fontcolor = numberLineArray[b].fontcolor;
	cloned.textspace = numberLineArray[b].textspace;
	cloned.removeAllEventListeners();
	jumpIconActions(cloned);
	duplicateShapes.push(cloned);
      }
    }
    return duplicateShapes;
  }

  var defaultJumpX = 108;
  var defaultJumpY = 220;
  function getTargetJumpXY() {
    jumpX = defaultJumpX;
    jumpY = defaultJumpY;
    var anl2Count = 0;
    var bnlCount = 0;
    var isJumpExist = false;
    var temp = new Array();
    while (isJumpExist == false) {
      var jumpCount = stage.getObjectsUnderPoint(jumpX, jumpY, !0);
      //console.log(jumpCount);
      if (jumpCount.length > 0) {
        jumpX = jumpX + (6 * rulerSpacing);
        if (jumpX > cm_width) {
          jumpX = defaultJumpX + (anl2Count * (6 * rulerSpacing));
          jumpY = 470;
          anl2Count = anl2Count + 1;
          if (jumpX > cm_width) {
            jumpX = defaultJumpX + (bnlCount * (6 * rulerSpacing));
            jumpY = 700;
            bnlCount = bnlCount + 1;
            if (jumpX > cm_width) {
              break;
            }
          }
        }
      } else {
        isJumpExist = true;
        temp.push(jumpX);
        temp.push(jumpY);
      }
    }

    /*if(jumpCount.length > 0){
     console.log('jumpCount--'+jumpCount);
     
     for(i=0; i<jumpCount.length; i++){
     if(jumpCount[i].name && jumpCount[i].name == 'base'){
     count = count + 1;
     }
     }
     temp.push(count*(defaultJumpX + (5*rulerSpacing)));
     temp.push(defaultJumpY);
     }*/
    return temp;
  }

  var actJumpWidth = 250;
  function setTopHeaderIcons() {
    //Draw left frame background
    background = new createjs.Shape;
    background.graphics.beginFill("#ffffff").drawRect(0, 0, 100000, 87);

    background.shadow = new createjs.Shadow('#dddddd', 3, 3, 3);
    container.addChild(background);

    //Draw top menu icons bitmap
    var cm4klink = new createjs.Bitmap(nlImagePath+'/topmenu/cm4k_link.png');
    cm4klink.y = 15;
    cm4klink.x = 53;
    container.addChild(cm4klink);
    cm4klink.cursor = 'pointer';
    cm4klink.on('click', function () {
      location.href = location.origin + '/manipulatives';
    });
    cm4klink.on("mouseover", function (evt) {
      var cm4klinkHoverimg = new createjs.Bitmap(nlImagePath+'/topmenu/cm4k_hover.png');
      cm4klink.image = cm4klinkHoverimg.image;
      cm4klink.x = 53;
      cm4klink.y = 15;
    });
    cm4klink.on("mouseout", function (evt) {
      var cm4klinkHoverimg = new createjs.Bitmap(nlImagePath+'/topmenu/cm4k_link.png');
      cm4klink.image = cm4klinkHoverimg.image;
      cm4klink.x = 53;
      cm4klink.y = 15;
    });

    var title = new createjs.Bitmap(nlImagePath+'/topmenu/title.png');
    title.x = 53;
    title.y = 37;
    container.addChild(title);

    var separatorone = new createjs.Bitmap(nlImagePath+'/topmenu/divider.png');
    separatorone.x = 283;
    separatorone.y = 29;
    container.addChild(separatorone);

    var newjump = new createjs.Bitmap(nlImagePath+'/topmenu/newjump.png');
    newjump.x = 347;
    newjump.y = 14;
    newjump.cursor = "pointer";
    container.addChild(newjump);
    newjump.on("mouseover", function (evt) {
      var newjumpHoverimg = new createjs.Bitmap(nlImagePath+'/topmenu/new_jump_hover.png');
      newjump.image = newjumpHoverimg.image;
      newjump.x = 347;
      newjump.y = 14;
    });
    newjump.on("mouseout", function (evt) {
      var newjumpHoverimg = new createjs.Bitmap(nlImagePath+'/topmenu/newjump.png');
      newjump.image = newjumpHoverimg.image;
      newjump.x = 347;
      newjump.y = 14;
    });

    // On click on New Jump icon, creates new jump object
    newjump.on("click", function (evt) {
      //console.log("JUMP MOUSE CLICK");
      startUpMsg.visible = false;
      stage.update();

      var jumpX, jumpY;
      var targetJumpXY = getTargetJumpXY();
      //console.log(targetJumpXY);
      if (targetJumpXY.length == 2) {
        jumpX = targetJumpXY[0];
        jumpY = targetJumpXY[1];
      } else {
        jumpX = defaultJumpX;
        jumpY = defaultJumpY;
      }
      //console.log(jumpX+'--'+cm_width);
      createJump(actJumpWidth, jumpX, jumpY, 'blue', '', '');
      snapLeft();

    });

    var jumplabel = new createjs.Bitmap(nlImagePath+'/topmenu/jumplabel.png');
    jumplabel.x = 454;
    jumplabel.y = 63;
    container.addChild(jumplabel);

    var showjumplength = new createjs.Bitmap(nlImagePath+'/topmenu/showjumplength_hover.png');
    showjumplength.x = 452;
    showjumplength.y = 30;
    showjumplength.clicked = 1;
    showjumplength.cursor = "pointer";
    container.addChild(showjumplength);
    showjumplength.on("mouseover", function (evt) {
      var showjumpHoverimg = new createjs.Bitmap(nlImagePath+'/topmenu/showjumplength_hover.png');
      showjumplength.image = showjumpHoverimg.image;
      showjumplength.x = 452;
      showjumplength.y = 30;
    });
    showjumplength.on("mouseout", function (evt) {
      if (this.clicked !== 1) {
        var showjumpHoverimg = new createjs.Bitmap(nlImagePath+'/topmenu/showjumplength.png');
        showjumplength.image = showjumpHoverimg.image;
        showjumplength.x = 452;
        showjumplength.y = 30;
      }
    });
    //trigger custom keypad
    showjumplength.on("click", function (evt) {
      //jumpKeypad();     
      customDisplayOff();
      chnageHightlight("showjumplength_hover", "addjumplength", "hidejumplength");
      this.clicked = 1;
      selectedJumpTag = "showjumplength";
    });

    var addjumplength = new createjs.Bitmap(nlImagePath+'/topmenu/addjumplength.png');
    addjumplength.x = 515;
    addjumplength.y = 30;
    addjumplength.clicked = 0;
    addjumplength.cursor = "pointer";
    container.addChild(addjumplength);
    addjumplength.on("mouseover", function (evt) {
      var addjumplengthHoverimg = new createjs.Bitmap(nlImagePath+'/topmenu/addjumplength_hover.png');
      addjumplength.image = addjumplengthHoverimg.image;
      addjumplength.x = 515;
      addjumplength.y = 30;
    });
    addjumplength.on("mouseout", function (evt) {
      if (this.clicked !== 1) {
        var addjumplengthimg = new createjs.Bitmap(nlImagePath+'/topmenu/addjumplength.png');
        addjumplength.image = addjumplengthimg.image;
        addjumplength.x = 515;
        addjumplength.y = 30;
      }
    });

    //trigger custom keypad
    addjumplength.on("click", function (evt) {
      //jumpKeypad();   
      customDisplayOn();
      chnageHightlight("showjumplength", "addjumplength_hover", "hidejumplength");
      this.clicked = 1;
      selectedJumpTag = "addjumplength";
    });

    var hidejumplength = new createjs.Bitmap(nlImagePath+'/topmenu/hidejumplength.png');
    hidejumplength.x = 575;
    hidejumplength.y = 30;
    hidejumplength.clicked = 0;
    hidejumplength.cursor = "pointer";
    container.addChild(hidejumplength);
    hidejumplength.on("mouseover", function (evt) {
      var hidejumplengthHover = new createjs.Bitmap(nlImagePath+'/topmenu/hidejumplength_hover.png');
      hidejumplength.image = hidejumplengthHover.image;
      hidejumplength.x = 575;
      hidejumplength.y = 30;
    });
    hidejumplength.on("mouseout", function (evt) {
      if (this.clicked !== 1) {
        var hidejumplengthimg = new createjs.Bitmap(nlImagePath+'/topmenu/hidejumplength.png');
        hidejumplength.image = hidejumplengthimg.image;
        hidejumplength.x = 575;
        hidejumplength.y = 30;
      }
    });

    //turn off all text
    hidejumplength.on("click", function (evt) {      //jumpKeypad();

      turnOfAllText();
      chnageHightlight("showjumplength", "addjumplength", "hidejumplength_hover");
      this.clicked = 1;
      selectedJumpTag = "hidejumplength";
    });

    /**
     * Function to changing the hightlight of the Jump tags icons
     * @param {type} arg1
     * @param {type} arg2
     * @param {type} arg3
     * @returns {undefined}
     */
    function chnageHightlight(arg1, arg2, arg3) {
      var show = new createjs.Bitmap(nlImagePath+'/topmenu/' + arg1 + ".png");
      var add = new createjs.Bitmap(nlImagePath+'/topmenu/' + arg2 + ".png");
      var hide = new createjs.Bitmap(nlImagePath+'/topmenu/' + arg3 + ".png");
      showjumplength.image = show.image;
      showjumplength.clicked = 0;
      addjumplength.image = add.image;
      addjumplength.clicked = 0;
      hidejumplength.image = hide.image;
      hidejumplength.clicked = 0;
      stage.update();
    }

    var separatorone = new createjs.Bitmap(nlImagePath+'/topmenu/divider.png');
    separatorone.x = 665;
    separatorone.y = 29;
    container.addChild(separatorone);

    var canvas = document.getElementById('workspace');
    var width = canvas.width;
    var height = canvas.height;

    //clock tick	
    clock = new createjs.Bitmap(nlImagePath+'/topmenu/clock.png');
    clock.x = 716;
    clock.y = 27;
    clock.cursor = "pointer";
    clock.clicked = 0;
    clock.on("mouseover", function (evt) {
      var clockHoverimg = new createjs.Bitmap(nlImagePath+'/topmenu/clock_hover.png');
      clock.image = clockHoverimg.image;
      clock.x = 716;
      clock.y = 27;
    });
    clock.on("mouseout", function (evt) {
      if (this.clicked !== 1) {
        var clockHoverimg = new createjs.Bitmap(nlImagePath+'/topmenu/clock.png');
        clock.image = clockHoverimg.image;
        clock.x = 716;
        clock.y = 27;
      }
    });
    //clock.graphics.beginFill("black").drawCircle(75, 0, 13);
    container.addChild(clock);
    stage1.update();
    //alert("here");
    createclock();
    rulerWidth = (rulerSpacing + 1) * 100;
    createRuler(30, rulerWidth);
    stage1.addChild(container);
    stage1.update();
    clock_cont.visible = false;
    clock.on("click", function () {
      var clockHoverimg = new createjs.Bitmap(nlImagePath+'/topmenu/clock_hover.png');
      clock.image = clockHoverimg.image;
      if (clock_cont.visible == true) {
        //console.log("true");
        clock_cont.visible = false;
        this.clicked = 0;
        stage.canvas.width = rulerWidth + 140;
        ruler.graphics.clear();
        var tickcheck = tickcircle.visible;
        //rulerSpacing = 50;
        tickcircle.graphics.clear();
        rulerCont.removeAllChildren();
        stage.update();
        createRuler(30, rulerWidth);
        for (var b in jumpObjectsList) {
          stage.setChildIndex(jumpObjectsList[b], stage.getNumChildren() - 1);
        }
        stage.update();
      } else {
        this.clicked = 1;
        //420;
        if (zoom_check == 3) {
          stage.canvas.width = rulerWidth - 4820;
        } else if (zoom_check == 2) {
          //rulerSpacing = rulerSpacing - 35;
          stage.canvas.width = rulerWidth - 3220;

        } else {
          stage.canvas.width = rulerWidth - 1875;
        }        

        ruler.graphics.clear();
        var tickcheck = tickcircle.visible;
        //rulerSpacing = 50;
        tickcircle.graphics.clear();
        rulerCont.removeAllChildren();
        stage.update();
        createRuler(30, rulerWidth);

        if (jumpObjectsList.length > 0) {
          //console.log(jumpObjectsList);
          for (var b in jumpObjectsList) {
            stage.setChildIndex(jumpObjectsList[b], stage.getNumChildren() - 1);
            stage.update();
          }
          verticallimit_new();
        } else {
          if (startUpMsg.visible == true) {
            stage.setChildIndex(startUpMsg, stage.getNumChildren() - 1);
          }
          createclock(0);
        }
      }
      stage.update();
    });
  }


  /********** zoom in and out code starts here ***********/
  var zoom_check = 1;
  //zoomout click
  $(".zoomout_image").click(function () {
    if (zoom_check > 1 && zoom_check <= 3) {
      zoomout();
      actJumpWidth = 5 * rulerSpacing;
    }
  });
  //zoomin click
  $(".zoomin_image").click(function () {
    if (zoom_check > 0 && zoom_check < 3) {
      zoomin();
      actJumpWidth = 5 * rulerSpacing;
    }
  });
  //To update rulerGraphics and NumberJump zoomout
  function zoomout() {
    ruler.graphics.clear();
    var tickcheck = tickcircle.visible;
    tickcircle.graphics.clear();
    rulerCont.removeAllChildren();
    stage.update();
    var rulerOldDiff = rulerSpacing;
    if (zoom_check == 3) {
      rulerSpacing = rulerSpacing - 40;
      if (clock_cont.visible == true) {
        stage.canvas.width = rulerWidth - 7250;
      } else {
        stage.canvas.width = ((rulerSpacing + 2) * 100) + 50;
      }
    } else if (zoom_check == 2) {
      rulerSpacing = rulerSpacing - 35;
      if (clock_cont.visible == true) {
        stage.canvas.width = rulerWidth - 5370;
      } else {
        stage.canvas.width = ((rulerSpacing + 2) * 100) + 50;
      }
    } else {
      if (clock_cont.visible == true) {
        stage.canvas.width = rulerWidth - 4820;
      } else {
        stage.canvas.width = ((rulerSpacing + 2) * 100) + 50;
      }
    }
    zoom_check--;
    //update innerBaseWidth
    innerBaseWidth = (3 * rulerSpacing) - 20;
    //update ruler width
    rulerWidth = (rulerSpacing + 1) * 100;
    createRuler(30, rulerWidth, textarray, tickcheck);
    //for clock and start up message infront of ruler
    if (clock_cont.visible == true) {
      stage.setChildIndex(clock_cont, stage.getNumChildren() - 1);
    }
    var temp = [];
    var tempCustomText = [];
    for (var b in jumpObjectsList) {
      stage.setChildIndex(jumpObjectsList[b], stage.getNumChildren() - 1);
      var count = Math.round(jumpObjectsList[b].jumpWidth / rulerOldDiff);
      var width = count * rulerSpacing;
      var color = jumpObjectsList[b].color;
      oldX = jumpObjectsList[b].x;
      oldY = jumpObjectsList[b].y;
      oldPos = Math.round(oldX / rulerOldDiff);
      var tempTopbitmap = jumpObjectsList[b].getChildByName('top');
      if (jumpObjectsList[b].getChildAt(9) != undefined) {
        checkcont = jumpObjectsList[b].getChildAt(9);
        if (checkcont.children != undefined) {
          tempCustomText = checkcont.children;
        }
      }
      stage.removeChild(jumpObjectsList[b]);
      temp.push(jumpObjectsList[b]);
      newContainX = oldPos * rulerSpacing;
      createJump(width, newContainX, oldY, color, tempTopbitmap.y, tempCustomText);
      stage.update();
      tempCustomText = [];
	  snapLeft();
    }
    for (var t in temp) {
      removeFromArray(jumpObjectsList, temp[t]);
    }
    //snapLeft();
    for (var p in purplecircleArray) {
      stage.setChildIndex(purplecircleArray[p], stage.getNumChildren() - 1);
      var purplecircle = purplecircleArray[p].children[1];
      numcnt = purplecircle.name.replace("circle", "");
      numcnt =  (purplecircleArray[p].x - 3)/rulerOldDiff;
	  purplecircleArray[p].x += numcnt * ( rulerSpacing - rulerOldDiff);
	 
    }
  }
  
  //To update rulerGraphics and NumberJump on zoomin
  function zoomin() {
    ruler.graphics.clear();
    var tickcheck = tickcircle.visible;
    tickcircle.graphics.clear();
    rulerCont.removeAllChildren();
    stage.update();
    //update rulerSpacing
    var rulerOldDiff = rulerSpacing;
    if (zoom_check == 1) {
      rulerSpacing = rulerSpacing + 35;
      if (clock_cont.visible == true) {
        stage.canvas.width = rulerWidth + 250;
      } else {
        stage.canvas.width = ((rulerSpacing + 2) * 100) + 50;
      }
    } else if (zoom_check == 2) {
      rulerSpacing = rulerSpacing + 40;
      if (clock_cont.visible == true) {
        stage.canvas.width = rulerWidth - 850; 
      } else {
        stage.canvas.width = ((rulerSpacing + 2) * 100) + 50;
      }
    }
    zoom_check++;
    //update innerBaseWidth
    innerBaseWidth = (3 * rulerSpacing) - 20; 
    //update ruler width
    rulerWidth = (rulerSpacing + 1) * 100;

    createRuler(30, rulerWidth, textarray, tickcheck);
    //for clock and start up message infront of ruler
    if (clock_cont.visible == true) {
      stage.setChildIndex(clock_cont, stage.getNumChildren() - 1);
    }
	//For numberJumps
    var tempArray = [];
    var tempCustomText = [];
    for (var i in jumpObjectsList) {
      stage.setChildIndex(jumpObjectsList[i], stage.getNumChildren() - 1);
      var count = Math.round(jumpObjectsList[i].jumpWidth / rulerOldDiff);
      var width = count * rulerSpacing;
      var color = jumpObjectsList[i].color;
      oldX = jumpObjectsList[i].x;
      oldY = jumpObjectsList[i].y;
      oldPos = Math.round(oldX / rulerOldDiff);
      var tempTopbitmap = jumpObjectsList[i].getChildByName('top');
      //check text on innershape 
      if (jumpObjectsList[i].getChildAt(9) != undefined) {
        checkcont = jumpObjectsList[i].getChildAt(9);
        if (checkcont.children != undefined) {
          tempCustomText = checkcont.children;
        }
      }
      stage.removeChild(jumpObjectsList[i]);
      tempArray.push(jumpObjectsList[i]);
      newContainX = oldPos * rulerSpacing;
      createJump(width, newContainX, oldY, color, tempTopbitmap.y, tempCustomText);
      stage.update();
      tempCustomText = [];
	  snapLeft();
    }
    for (var t in tempArray) {
      removeFromArray(jumpObjectsList, tempArray[t]);
    }
	//snapLeft();
	//For tickMarkers
    for (var p in purplecircleArray) {
      stage.setChildIndex(purplecircleArray[p], stage.getNumChildren() - 1);
      var purplecircle = purplecircleArray[p].children[1];
      numcnt = purplecircle.name.replace("circle", "");
	  numcnt =  (purplecircleArray[p].x - 3)/rulerOldDiff;
	  purplecircleArray[p].x += numcnt * (rulerSpacing - rulerOldDiff);
    } 
  }  
  /********** zoom in and out code ends here ***********/

  //To remove specific element from the jumpObjectsList	
  function removeFromArray(array, block) {
    var index = array.indexOf(block);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  /*
   *create clock
   */
  function createclock(numberjumpvalue) {
    if (stage.getChildByName("clock_cont")) {
      stage.removeChild(clock_cont);
      stage.update();
    }
    clock_cont = new createjs.Container(); // container to hold the clock
    stage.addChild(clock_cont);
    clock_cont.x = 135;
    clock_cont.y = 230;
    clock_cont.width = 9;
    clock_cont.height = 125;
    clock_cont.name = "clock_cont";
    // center the container
    //clock_cont.beginFill("blue");
    // create the clock minute markers
    var outs1 = new createjs.Shape();
    outs1.graphics.beginFill("#78c7f0").drawCircle(0, 0, 71);
    //outs1.rotation = deg; // draw markers for all 60 minutes
    //clock_cont.addChild(outs1);
    var clock_background = bitmapArray['clock_background'];  
    clock_background.x = -100;
    clock_background.y = -200;
    clock_cont.addChild(clock_background);
    clock_cont.visible = true;
    stage.update();
    for (deg = 0; deg <= 360; deg += 6) { // rotate to create 60 markers
      var armheight = 3.5; // default size of markers
      var armwidth = 0.6;
      if (deg % 30 == 0) {
        armheight = 6;	// bigger ones for 5, 10, 15, ... minutes
        armwidth = 2;
      }
      if (deg % 90 == 0) {
        armheight = 6; // even bigger markers for 15, 30, 45, 60 mins
        armwidth = 2;
      }

      var s1 = new createjs.Shape();
      s1.graphics.beginFill("#ffffff").drawRect(62, 0, armheight, armwidth);
      s1.rotation = deg; // draw markers for all 60 minutes
      //clock_cont.addChild(s1);
    }
    clock_imag = new createjs.Bitmap(nlImagePath+"/clock.png");
    //clock_imag.x = 150;
    //clock_imag.y = 200;
    clock_imag.x = -78;
    clock_imag.y = -120;
    clock_imag.regX = clock_cont.width - clock_cont.width / 2;
    clock_imag.regY = clock_cont.height - clock_cont.height / 2;
    clock_cont.addChild(clock_imag);
    sec = new createjs.Bitmap(nlImagePath+"/arm_new.png");
    sec.x = -5;
    sec.y = -107;
    sec.regX = clock_cont.width - clock_cont.width / 2;
    sec.regY = clock_cont.height - clock_cont.height / 2;
    clock_cont.addChild(sec);
    
    
    var text_background = bitmapArray['text_background'];    
    text_background.x =-55;
    text_background.y =-15;
    clock_cont.addChild(text_background); 
    var num ="";
    if(numberjumpvalue<10){
      num = "0:0"+numberjumpvalue;
    }else if(numberjumpvalue>59){
      var n = (parseInt(numberjumpvalue)-parseInt(60));
      if(n<10){
        num = "0:0"+n;
      }else{
        num = "0:"+n;
      }      
    }
    else{
      num = "0:"+numberjumpvalue;
    }
    var keytext = new createjs.Text(num, "bold 20px Courier", "#5aacd6");
    keytext.x = -28;
    keytext.y = -13;   
    if(detectBrowser==="FIREFOX"){
       keytext.y = -10;
    }
    clock_cont.addChild(keytext);
    stage.update();
    
    
    // window as tick listener
    // createjs.Ticker.addEventListener("tick", handtick);
    handtick(numberjumpvalue);
  }

  function handtick(numberjumpvalue) {
    //console.log(selectedNumerType);
    if (selectedNumerType == "fn") {
      var textsum = String(numberjumpvalue);
      var res = textsum.split(" ");
      //console.log(parseFloat(res[1]));
      if (res[1]) {
        //console.log("rest " + res[1]);
        tecsecond = res[1];
        //console.log(tecsecond);
        var tec2 = tecsecond.split("/");
        second = Number(tec2[0]) / Number(tec2[1]);
        // console.log(second);
      } else {
        var second = 0;
      }
      numberjumpvalue = parseFloat(res[0]) + second;
      //console.log(second);
    }
    if (selectedNumerType == "dn") {
      var textsumdecimal = Number(numberjumpvalue);
      //console.log(textsumdecimal);
      numberjumpvalue = parseFloat(Number(numberjumpvalue));
    }
    //console.log(parseFloat(numberjumpvalue));
    //if (typeof jumpObjectsList[0] != 'undefined' && typeof jumpObjectsList[0].text != 'undefined') {
    sec.rotation = numberjumpvalue * 6;
    stage.update();
    createjs.Ticker.removeEventListener("tick", handtick);
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
    //console.log("kvalue "+ k);
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

  function check_keypad() {
    if (calc_close == false && arrayofCalcContainer.length <= 1) {
      $('.keypad').off('click', handleKeypad).on('click', handleKeypad);
    } else {

      $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
      $('.keypad').off('click', calc_clone).on('click', calc_clone);
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
    } else if (scrollPer < 50) {
      //scrollPer -= 2; 
    } else if (scrollPer > 66 && scrollPer < 70) {
      scrollPer = 65;
    } else if (scrollPer > 70 && scrollPer < 80) {
      scrollPer = 75;
    } else if (scrollPer > 89 && scrollPer < 95) {
      scrollPer = 85;
    } else if (scrollPer == 100) {
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
      //arrayofCalcContainer[keytext].x = 560, arrayofCalcContainer[keytext].y = 30;
      arrayofCalcContainer[keytext].x = window.innerWidth / 2 - 176, arrayofCalcContainer[keytext].y = window.innerHeight / 6 - 170;
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
        var test2;
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
      //console.log("kvalue "+ k);
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

  function color_finder(k) {

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
    //console.log("clone");
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
      calc.x = window.innerWidth / 2 - 176;
      calc.y = window.innerHeight / 6 - 170;
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
      if (calc_close == false) {
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

  mouseDownAtEmpty();
  /**
   * deselect all the elements when stagemousedown action on empty area
   * @returns {undefined}
   */
  function mouseDownAtEmpty() {
    stage.on('stagemousedown', function (evt) {
      var obj = stage.getObjectsUnderPoint(evt.stageX, evt.stageY, 1);
      //deselectRuler();
      if (obj.length <= 0) {
        deselect();
        deselectpurplecircle();
        deselectJumpObjects();
        deselectPA();
      }
      if ($("#jumpKeypadSection:visible").length > 0) {
        $("#jumpKeypadSection").css("display", "none");
      }
    });
  }

  /**
   * deselectJumpObjects
   * @returns {undefined}
   */
  function deselectJumpObjects() {
    //console.log(jumpObjectsList.length);
    //console.log(jumpObjectsList);
    if (jumpObjectsList.length > 0) {
      for (i = 0; i < jumpObjectsList.length; i++) {
        var targetContainer = jumpObjectsList[i];
        jumpObjectsList[i].selected = 0;
        var targetChildren = jumpObjectsList[i].children;
        //console.log(targetChildren);
        targetContainer.getChildAt(2).visible = false;
        targetContainer.getChildAt(3).visible = false;
        targetContainer.getChildAt(4).visible = false;
        targetContainer.on("mousedown", function () {
          this.selected = 1;
          //jumpObjectsList.push(this);
        });
      }
    }

  }

  /**
   * deselect all the lines
   * @returns {Boolean}
   */
  function deselect() {
    //for removing calculator selection
    for (i = 0; i < arrayOfTextBorder.length; i++) {
      arrayOfTextBorder[i].visible = false;
    }
    $('.trash').off("click").on('click', trash);
    stage.update();
  }

  $('.trash').off("click").on('click', trash);
  /**
   * trash
   * @returns {undefined}
   */
  function trash() {
    var tempPA = new Array();
    if (purplecircleArray.length > 0) {
      for (var obj in purplecircleArray) {
        if (purplecircleArray[obj].selected === 1) {
          cirlceno--;
          tempPA.push(purplecircleArray[obj]);
          stage.removeChild(purplecircleArray[obj]);
          var childn = purplecircleArray[obj].children;
          for (var ch in childn) {
            var pcChild = childn[ch]
            if (typeof pcChild.name !== 'undefined' && pcChild.name === 'purpleline') {
              var pti = purpleTickArray.indexOf(pcChild);
              purpleTickArray.splice(pti, 1);
            }
            if (typeof pcChild.name !== 'undefined' && pcChild.name === 'numberText') {
              var rem = numCountArray.indexOf(pcChild.circleNum);
              numCountArray.splice(rem, 1);
              //purpleTickTextArray.push(numberTextCloned);
              var pni = purpleTickTextArray.indexOf(pcChild);
              purpleTickTextArray.splice(pni, 1);
            }

            if (typeof pcChild.name !== 'undefined' && (pcChild.name).indexOf('circle') !== -1) {
              var ci = purpleTickCircleArray.indexOf(pcChild);
              purpleTickCircleArray.splice(ci, 1);
            }
          }
          stage.update();
        }
      }
    }
    purplecircleArray = purplecircleArray.filter(function (x) {
      return tempPA.indexOf(x) < 0;
    });
    if (jumpObjectsList.length > 0) {
      for (var obj in jumpObjectsList) {
        if (jumpObjectsList[obj].selected === 1) {
          stage.removeChild(jumpObjectsList[obj]);
        }
      }
      var tempArray = new Array();
      for (var obj in jumpObjectsList) {
        if (jumpObjectsList[obj].selected !== 1) {
          tempArray.push(jumpObjectsList[obj]);
        }
      }
      jumpObjectsList = tempArray;
      verticallimit_new();
    }
    stage.update();
  }
  setTopHeaderIcons();

  /**
   * To drag single icon
   * @param {evt} evt - objectInfo
   * @returns {undefined}  
   */
  function dragIc(evt) {
    if (evt.stageY > 115 && evt.stageX < 1375 && evt.stageX > 75 && evt.stageY < 1075) {
      evt.target.x = evt.stageX;
      evt.target.y = evt.stageY;
    }
    stage.update();
  }

  /**
   * Remove select class from canvas elements
   * on stagemousedown action at empty area
   */
  stage.on('stagemousedown', function (evt) {
    $("#blocks-workspace").find('canvas').each(function () {
      if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
      }
    });
  });

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
                //ctx.lineWidth = 6,
                //ctx.webkitLineDash = [6], 
                //ctx.setLineDash([10]), 
                //ctx.mozDash = [10], 
                ctx.strokeStyle = "#ffffff",
                ctx.beginPath(),
                dotted_line.graphics.setStrokeStyle(5, "round", "round").beginStroke("#AEA5E6").beginFill("rgba(255,255,255,.01)");

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
        /** hitTest for purpleObjects **/
        if (purpleTickTextArray.length > 0) {
          //alert(purpleTickTextArray.length);//console.log(purpleTickTextArray);
          for (i = 0; i < purpleTickTextArray.length; i++) {
            var targetShape = purpleTickTextArray[i];
            if (targetShape.parent) {
              var e = targetShape.parent.localToLocal(targetShape.x, targetShape.y, stage);
              if (dotted_line.hitTest(e.x, e.y)) {
                d.push(targetShape);
              }
            }
          }
        }

        //alert(d.length);//console.log(d);
        if (d.length > 0) {
          for (x = 0; x < d.length; x++) {
            var circle = nlGetChildByName(d[x]);
            nlGetChildLine(d[x]);
            if (circle !== '' && circle.selected === 0) {
              var pinkCont = circle.parent;
              var numcnt = circle.name.replace("circle", "");
              var lecirclex = rulerSpacing * numcnt + 3;
              var lecircley = pinkCont.y;
              var purpleBorder = circle.parent.getChildByName("purpleBorder");
              if (tickShape == 0) {
                purpleBorder.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).drawCircle(lecirclex, pinkCont.y + 37, 22.5).endStroke().endFill();
                //circle.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).beginFill(purpleBG);
                //circle.graphics.drawCircle(lecirclex, pinkCont.y + 37, 22.5).endStroke().endFill();
              }
              if (tickShape == 1) {
                purpleBorder.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).drawEllipse(lecirclex - 37, lecircley + 15, 80, 50).endStroke().endFill();
                //circle.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).beginFill(purpleBG);
                //circle.graphics.drawEllipse(lecirclex - 37, lecircley + 15, 80, 50).endStroke().endFill();
              }
              /*if (zoom_check === 3) {
               circle.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).beginFill(purpleBG);
               circle.graphics.drawEllipse(lecirclex - 55, lecircley + 16, 120, 60).endStroke().endFill();
               }*/
              //circle.alpha = 1;
              circle.selected = 1;
              circle.parent.selected = 1;
              stage.setChildIndex(circle.parent, stage.getNumChildren() - 1);
              stage.update();
            }
          }
        }
        /** hitTest for jumpObjects **/
        if (jumpObjectsList.length > 0) {
          //alert(jumpObjectsList.length);//console.log(jumpObjectsList);
          for (i = 0; i < jumpObjectsList.length; i++) {
            var targetContainer = jumpObjectsList[i];
            var jumpHitTest = false;
            //console.log(targetContainer);
            var j = 2;
            while (j <= 4) {
              var targetShape = targetContainer.getChildAt(j);
              if (targetShape.parent) {
                var e = targetShape.parent.localToLocal(targetShape.x, targetShape.y, stage);
                if (dotted_line.hitTest(e.x, e.y)) {
                  jumpHitTest = true;
                  break;
                }
              }
              j++;
            }
            if (jumpHitTest) {
              if (!targetContainer.getChildAt(2).visible) {
                targetContainer.getChildAt(2).visible = true;
              }
              if (!targetContainer.getChildAt(3).visible) {
                targetContainer.getChildAt(3).visible = true;
              }
              if (!targetContainer.getChildAt(4).visible) {
                targetContainer.getChildAt(4).visible = true;
              }
              targetContainer.selected = 1;
            }
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
  }
  multiSelection();


  function nlGetChildByName(textObject) {
    var targetShape = '';
    var stageChildren = textObject.parent.children;
    var targetName = 'circle' + d[x].circleNum;
    for (i = 0; i < stageChildren.length; i++) {
      child = stageChildren[i];
      if (typeof child.name != 'undefined' && child.name == targetName) {
        targetShape = stageChildren[i];
      }
    }
    return targetShape;
  }

  function nlGetChildLine(textObject) {
    var stageChildren = textObject.parent.children;
    for (i = 0; i < stageChildren.length; i++) {
      child = stageChildren[i];
      if (typeof child.name !== 'undefined' && child.name === "purpleline" || child.name === "numberText") {
        stageChildren[i].selected = 1;
        stageChildren[i].alpha = 1;

      }
    }
  }



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
        removePurpleTicks();
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
      $(".duplicate_frame_image").on("click", handleClone); // enabling  duplicte      
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
    $("numbercircle_submenu").css("display", "none");
    $("#jumpKeypadSection").css("display", "none");
    if (gg) {
      stage.removeChild(gg);
      //stage.update();
    }
    clearDrawings();
    ruler.graphics.clear();
    //var tickcheck = tickcircle.visible;
    //console.log(tickcheck);
    tickcircle.graphics.clear();
    rulerCont.removeAllChildren();
    pinkCont.removeAllChildren();
    stage.removeAllChildren();

    stage.update();
    objectList = [];
    //calculator
    arrayOfTextArray = [];
    arrayOfTextContainer = [];
    arrayofCalcContainer = [];
    arrayOfTextClick = [];
    textarray = [];
    arrayOfTextBorder = [];
    
    //ruler array remote
    textarray = [];
    tickCircleArray = [];
    numberLines.test = [];
    numberLines.backupArray = [];
    purpleTickArray = [];
    purpleTickCircleArray = [];
    purpleTickTextArray = [];
    jumpObjectsList = [];
    finalArray = [];

    stage.update();
    cirlceno = 1;
    setTopHeaderIcons();
    targetWidth = 198; //set default targetWidth on clear 
    //console.log('beforeClear--'+zoom_check+'--'+rulerSpacing);
    if (zoom_check == 2) {
      zoomout();
    }
    if (zoom_check == 3) {
      zoomout();
      zoomout();
    }
    zoom_check = 1;
    actJumpWidth = 5 * rulerSpacing;
    selectedSubType = "1";
	wrapper.cache(0, 0, rulerWidth, stage.canvas.height); // Caching the wrapper
    //console.log('afterClear--'+zoom_check+'--'+rulerSpacing+'=='+actJumpWidth);
  }

  //Info section 
  $('#info').click(function () {
    $('#infopage').fadeIn();
    $("#toolbar").addClass('toolbar_new');
    $("#howitworksoverlay").css("display", "block");
    $("#howitworksoverlay").css("height", "1585");
    $("#toolbar").css("height", "1498");
    stage.canvas.height = 1450;
    $('html,body').scrollTop(0);
  });

  $("#infopage .close, #howitworksoverlay").click(function () {
    $("#infopage").fadeOut();
    $("#toolbar").removeClass('toolbar_new');
    $("#howitworksoverlay").css("display", "none");
    if (window.innerHeight > 1100) {
      stage.canvas.height = window.innerHeight;
      $("#toolbar").css("height", "106%");
    } else {
      stage.canvas.height = 1100;
      $("#toolbar").css("min-height", "1152px");
    }
  });

  $("#infopage .title").click(function () {
    var a = $(this);
    a.hasClass("selected") || ($("#infopage .title.selected").removeClass("selected"), a.addClass("selected"), $("#infopage .contents").toggle(), $("#infopage .contents-wrapper").scrollTop(0));
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
  /* custom tool tip ends here */

  // Verify Show Negative Numbers checkbox is selected			
  checkNegativeEnabled();
  stage.update();

  // Horizontal scrollbar for ruler  
  var string = textarray[0].text;
  var html = buildFraction(string);
  $("#min").html(html);


  // var canvas = document.getElementById('workspace');
  //canvasWidth = canvas.width;
  //var max = "" + Math.floor((rulerCont.x + canvasWidth - 40) / rulerSpacing);
  // $("#max").text("" + textarray[max - 1].text);
  //$("#max").text("" + Math.floor((Math.abs(canvasWidth/50))-1));

  numberLines.sliderCurrentValue = 0;

  /*$("#slider-2").slider({
   min: 0,
   max: 3720,
   animate: "slow",
   orientation: "horizontal",
   slide: function (event, ui) {
   //console.log(ui.value);
   numberLines.sliderCurrentValue = ui.value;
   if (ui.value > 0) {
   rulerCurrentVal = 23 - ui.value;
   }
   rulerCont.x = rulerCurrentVal;
   var min = Math.ceil((ui.value) / rulerSpacing);
   scrollPos = min;
   rulerCont.x = (min < 2) ? rulerCont.x = 23 : rulerCont.x = rulerCurrentVal;
   if (min == 0) {
   $("#min").text("" + textarray[min].text);
   } else {
   $("#min").text("" + textarray[min - 1].text);
   }
   for (var pt in purpleTickCircleArray) {
   purpleTickCircleArray[pt].x = rulerCont.x - 23;
   }
   for (var pt in purpleTickArray) {
   purpleTickArray[pt].x = rulerCont.x - 23;
   }
   for (var pt in purpleTickTextArray) {
   purpleTickTextArray[pt].x = rulerCont.x - 23;
   }
   if (rulerCont.x > 0) {
   //$("#max").text("" + Math.floor((rulerCont.x + 1324)/rulerSpacing));
   var max = "" + Math.floor((rulerCont.x + canvasWidth - 40) / rulerSpacing);
   $("#max").text(textarray[max - 1].text);
   } else {
   //$("#max").text("" + Math.abs(Math.floor((rulerCont.x - 1290)/rulerSpacing)));
   var max = "" + Math.abs(Math.floor((rulerCont.x - canvasWidth + 80) / rulerSpacing));
   if (max <= 100)
   $("#max").text(textarray[max - 1].text);
   }
   }
   });*/
  /**
   * Function to update the scroll bar min max value while changing the number type
   * @returns {undefined}
   */
  function updateMinMax() {

    var min = Math.ceil($('#blocks-workspace').scrollLeft() / rulerSpacing);
    if (selectedNumerType === 'fn') {
      if (min === 0) {
        var string = textarray[min].text;
        var html = buildFraction(string);
        $("#min").html(html);

      } else {
        var string = textarray[min - 1].text;
        var html = buildFraction(string);
        $("#min").html(html);
      }

      var max = Math.floor((window.innerWidth - 47) / rulerSpacing);
      var string = textarray[max - 1].text;
      var html = buildFraction(string);
      $("#max").html(html);

    } else {
      if (min === 0) {
        $("#min").text("" + textarray[min].text);
      } else {
        $("#min").text("" + textarray[min - 1].text);
      }
      var max = Math.floor((window.innerWidth - 47) / rulerSpacing);
      $("#max").text(textarray[max - 1].text);
    }
  }


  //Horizontal scrollbar for ruler

  //Set default Min value in the scroll bar
  var string = textarray[0].text;
  var html = buildFraction(string);
  $("#min").html(html);

  //Set default Max value in the scroll bar
  canvasWidth = window.innerWidth - 47;
  var max = Math.floor((rulerCont.x + canvasWidth) / rulerSpacing);
  var string = textarray[max - 1].text;
  var html = buildFraction(string);
  $("#max").html(html);


  var jumpObjectsList = new Array();


  WIDTH = 250;



  var shadowJumpObjects = 0;
  var jumpObjectCount = 0;
  var newJumpGlobals = new Object();
  newJumpGlobals.x = 70;
  newJumpGlobals.y = 160;
  newJumpGlobals.leftPos = 30;
  newJumpGlobals.width = 200;

  var cp1x;
  var cp1y;
  var cpx;
  var cpy;
  var transp_white = "rgba(255,255,255,.09)";
  //var transp_white = "blue";
  var baseWidth = 249;
  var targetWidth = 250;
  var baseHeight = 40;
  var innerBaseWidth = 130;
  var innerBaseHeight = 30;
  var cornerRadius = 2;
  var lineStroke = 3;

  var blue_line_color = '#6ec7f5';
  var blue_shape_color = '#75cefc';
  var blue_innershape_color = '#22abf2';

  var red_line_color = '#ff8d98';
  var red_shape_color = '#ff97a1';
  var red_innershape_color = '#f95a69';

  var snapIndex = 0;
  //createjump method starts here
  function createJump(jumpWidth, containX, containY, color, topbitmapY, customTextArray) {
    //console.log(color + '-' + jumpWidth + '=' + containX + '--' + rulerSpacing + '=' + selectedNumerType);


    /*if (selectedNumerType == 'dn'){
     rulerSpacing = 85;
     jumpWidth = 85 * 3; 
     }*/

    var leftbitmap, rightbitmap, topbitmap, arrow, shape_color, innershape_color;
    switch (color) {
      case 'blue':
        leftbitmap = new createjs.Bitmap(nlImagePath+"/scale_icon_blue.png");
        rightbitmap = new createjs.Bitmap(nlImagePath+"/scale_icon_blue.png");
        topbitmap = new createjs.Bitmap(nlImagePath+"/blue_icon_top.png");
        arrow = new createjs.Bitmap(nlImagePath+"/arrow_blue_right.png");
        //colors
        shape_color = blue_shape_color;
        innershape_color = blue_innershape_color;
        line_color = blue_line_color;
        break;
      case 'red':
        leftbitmap = new createjs.Bitmap(nlImagePath+"/scale_icon_red.png");
        rightbitmap = new createjs.Bitmap(nlImagePath+"/scale_icon_red.png");
        topbitmap = new createjs.Bitmap(nlImagePath+"/red_icon_top.png");
        arrow = new createjs.Bitmap(nlImagePath+"/arrow_red_left.png");
        //shape colors
        shape_color = red_shape_color;
        innershape_color = red_innershape_color;
        line_color = red_line_color;
        break;
    }
    deselectpurplecircle();
    deselectJumpObjects();
    jumpObjectCount = jumpObjectCount + 1;

    //container for number jump
    var contain = new createjs.Container;
    contain.y = containY;
    contain.x = containX;
    contain.name = 'jumpObject' + jumpObjectCount;
    //contain.array = new Array();
    contain.textspace = 16;
    contain.type = "numberjump";
    contain.fontcolor = "white";
    contain.activate = 0;
	contain.snapRed = 0;
	
	contain.index = snapIndex;
	contain.leftCrossedRight = 0;
	contain.rightCrossedLeft = 0;
	
	snapIndex = snapIndex + 1;

    var hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(0, 0, 21, 21);

    //right cube    
    rightbitmap.name = 'right';
    rightbitmap.x = (color == 'blue') ? jumpWidth - 30 : 0;
    rightbitmap.y = 0;
    rightbitmap.hitArea = hit;

    //left cube    
    leftbitmap.name = 'left';
    leftbitmap.x = (color == 'blue') ? 0 : jumpWidth - 30;
    leftbitmap.y = 0;
    leftbitmap.hitArea = hit;

    //top cube    
    topbitmap.name = 'top';
    topbitmap.x = ((leftbitmap.x + rightbitmap.x) / 2);
    topbitmap.hitArea = hit;
    if (topbitmapY == '') {
      topbitmap.y = (contain.y > nlDivider) ? 180 : -180;
    } else {
      topbitmap.y = topbitmapY;
    }

    //shape for base_line for number jump
    var shape = new createjs.Shape();
    shape.name = 'base';
    shape.widthi = jumpWidth;

    var innershape = new createjs.Shape();
    innershape.name = 'innerbase';
    //innershape.widthi = innerBaseWidth;
    innershape.visible = false;

    var expInnerWid = (rulerSpacing * 2) + 23;
    innershape.widthi = (jumpWidth > expInnerWid) ? jumpWidth - expInnerWid : 0;

    //text on base_line
    //var num = jumpWidth / rulerSpacing;
    //var number = calculateN(num);
    var num = calculateN(Math.round(jumpWidth / rulerSpacing));
    var fr = getFraction(num);

    if (selectedNumerType !== 'fn') {
      var numberjumptext = new createjs.Text();
      numberjumptext.set({
        text: '' + num,
        textAlign: 'center',
        textBaseline: 'hanging',
        font: "bold 24px ProximaNova",
        color: 'white'
      });
    } else {
      numberjumptext = fr;
    }

    numberjumptext.name = 'textvalue';
    numberjumptext.x = ((leftbitmap.x + rightbitmap.x) / 2) + 9;
    if (detectBrowser == "IE") {
      numberjumptext.y = -4;
    } else if (detectBrowser == "SAFARI" || detectBrowser == "couldnt detect") {
      numberjumptext.y = -5;
    } else if (detectBrowser == "EDGE") {
      numberjumptext.y = -6;
    } else if (detectBrowser == "CHROME") {
      numberjumptext.y = 0;
    } else {
      numberjumptext.y = -1;
    }

    //createclock(numberjumptext.x);
    //text.x = newJumpGlobals.x + newJumpGlobals.leftPos+(shape.widthi/2);
    //text.y = newJumpGlobals.y;
    /*text.x = (shape.widthi/2);
     text.y = 12;
     text.text = (Math.ceil((rightbitmap.x - leftbitmap.x)/50));
     text.jumpIndex = 1;*/

    var cp1x = leftbitmap.x - 5;
    var cp1y = leftbitmap.y - 5;
    var cpx = cp1x + shape.widthi;
    var cpy = cp1y;

    //arrow    
    arrow.name = 'arrow';
    arrow.cursor = "pointer";

    //curve line
    var controlPoints = getControlPoints(leftbitmap.x, leftbitmap.y, rightbitmap.x, rightbitmap.y, topbitmap.x, topbitmap.y);
    var px = controlPoints[0];
    var py = controlPoints[1];
    var line = new createjs.Shape();
    line.name = 'line';
    line.graphics.setStrokeStyle(lineStroke);

    //jump background
    var bg = new createjs.Shape();
    bg.name = 'bg';
    bg.graphics.setStrokeStyle(1);

    //arrow
    arrow.regX = arrow.image.width / 2;
    arrow.regY = arrow.image.height / 2;


    if (color == 'blue') {
      //shape
	  
	  var index = contain.index;
	  snap[index] = {};
	  snap[index].rectX = leftbitmap.x - 5;
	  snap[index].rectY = leftbitmap.y - 9;
	  snap[index].rectWidth = shape.widthi;
	  
	  snap[index].rectHeight = baseHeight;
	  snap[index].rectRadius = cornerRadius;
	  
      shape.graphics.clear().beginFill(shape_color).drawRoundRect(leftbitmap.x - 5, leftbitmap.y - 9, shape.widthi, baseHeight, cornerRadius);
      innershape.graphics.clear().beginFill(innershape_color).drawRoundRect(leftbitmap.x + rulerSpacing + 5, leftbitmap.y - 4, innershape.widthi, innerBaseHeight, cornerRadius);
      //above NumberLine
      if (contain.y < nlDivider) {
        //line
        line.graphics.beginStroke(line_color).moveTo(leftbitmap.x - 4, leftbitmap.y - 14).quadraticCurveTo(px + 20, py - 40, rightbitmap.x + 18, rightbitmap.y - 20);
        bg.graphics.beginFill(transp_white).moveTo(leftbitmap.x, leftbitmap.y - 14).quadraticCurveTo(px + 20, py - 40, rightbitmap.x + 16, rightbitmap.y - 20);
        //arrow
        /* arrow.x = rightbitmap.x + 8 + arrow.image.width/2;
         arrow.y = rightbitmap.y - 30 + arrow.image.height/2;
         arrow.rotation = -7;
         */
        arrow.x = rightbitmap.x + 9 + 9;
        arrow.y = rightbitmap.y - 27 + 9;
        var sx = topbitmap.x, sy = topbitmap.y - 30, ex = arrow.x + 9, ey = arrow.y;
        var ang = findAngle(sx, sy, ex, ey);
        arrow.rotation = (ang - 64);
      } else {//below NumberLine
        //line
        line.graphics.clear().setStrokeStyle(lineStroke).beginStroke(blue_line_color).moveTo(leftbitmap.x - 4, leftbitmap.y - 14 + 48).quadraticCurveTo(px + 20, py + 40, rightbitmap.x + 18, rightbitmap.y - 11 + 48);
        bg.graphics.clear().beginFill(transp_white).moveTo(leftbitmap.x - 4, leftbitmap.y - 14 + 48).quadraticCurveTo(px + 20, py + 40, rightbitmap.x + 18, rightbitmap.y - 11 + 48);
        //arrow
        /* arrow.x = rightbitmap.x + 24;
         arrow.y = rightbitmap.y + 48;
         arrow.rotation = 190;
         */
        arrow.x = rightbitmap.x + 27 - 9;
        arrow.y = rightbitmap.y + 46 - 9;

        var sx = topbitmap.x, sy = topbitmap.y + 30, ex = arrow.x + 9, ey = arrow.y;
        var ang = findAngle(sx, sy, ex, ey);
        //console.log("angle abcd"+ (ang)+"btmp"+topbitmap.y);
        arrow.rotation = (ang - 109);


      }
      //For red color
    } else { //Above the NumberLine
      //shape
	  var index = contain.index;
	  snap[index] = {};
	  snap[index].rectX = rightbitmap.x - 6;
	  snap[index].rectY = rightbitmap.y - 9;
	  snap[index].rectWidth = shape.widthi;
	  
	  snap[index].rectHeight = baseHeight;
	  snap[index].rectRadius = cornerRadius;
	  
      shape.graphics.clear().beginFill(shape_color).drawRoundRect(rightbitmap.x - 6, rightbitmap.y - 9, shape.widthi, baseHeight, cornerRadius);
      innershape.graphics.clear().beginFill(innershape_color).drawRoundRect(rightbitmap.x + rulerSpacing + 5, rightbitmap.y - 4, innershape.widthi, innerBaseHeight, cornerRadius);
      //above NumberLine
      if (contain.y < nlDivider) {
        //line			
        line.graphics.clear().setStrokeStyle(lineStroke).beginStroke(line_color).moveTo(rightbitmap.x, rightbitmap.y - 20).quadraticCurveTo(px + 20, py - 40, leftbitmap.x + 17, leftbitmap.y - 15);
        bg.graphics.clear().beginFill(transp_white).moveTo(rightbitmap.x, rightbitmap.y - 14).quadraticCurveTo(px + 20, py - 40, leftbitmap.x + 16, leftbitmap.y - 20);
        //arrow
        /* arrow.x = rightbitmap.x - 5;
         arrow.y = rightbitmap.y - 30;
         arrow.rotation = 25;
         */

        arrow.x = rightbitmap.x - 6 + 9;
        arrow.y = rightbitmap.y - 28 + 9;
        var sx = topbitmap.x, sy = topbitmap.y - 30, ex = arrow.x + 9, ey = arrow.y;
        var ang = findAngle(sx, sy, ex, ey);
        arrow.rotation = (ang - 120);

      } else {//below NumberLine
        //line			
        line.graphics.clear().setStrokeStyle(lineStroke).beginStroke(line_color).moveTo(rightbitmap.x + 5, rightbitmap.y + 40).quadraticCurveTo(px + 20, py + 40, leftbitmap.x + 20, leftbitmap.y + 30);
        bg.graphics.clear().beginFill(transp_white).moveTo(rightbitmap.x, rightbitmap.y + 40).quadraticCurveTo(px + 20, py + 40, leftbitmap.x + 20, leftbitmap.y + 30);
        //arrow
        arrow.x = rightbitmap.x + 12 - 9;
        arrow.y = rightbitmap.y + 51 - 9;
        var sx = topbitmap.x, sy = topbitmap.y + 30, ex = arrow.x + 9, ey = arrow.y;
        var ang = findAngle(sx, sy, ex, ey);
        arrow.rotation = (ang - 90);
      }
    }

    //customTextArray is not empty
    if (customTextArray != '' && customTextArray.length > 0) {
      var checkcont = new createjs.Container();
      checkcont.name = "numberjumptextcont";
      var space = 0;
      for (i = 0; i < customTextArray.length; i++) {
        //console.log(customTextArray[i].text);
        var keytext = new createjs.Text(customTextArray[i].text, "bold 24px ProximaNova", "white");
        keytext.x = topbitmap.x - ((customTextArray.length - i) * 5) + (i * 12);
        //keytext.y
        if (detectBrowser == "FIREFOX") {
          keytext.y = 0;
        } else if (detectBrowser == "IE") {
          keytext.y = -3;
        } else if (detectBrowser == "CHROME") {
          keytext.y = -4;
        } else {
          keytext.y = -4;
        }
        checkcont.addChild(keytext);
      }
      contain.addChild(bg, shape, rightbitmap, leftbitmap, topbitmap, line, arrow, innershape, numberjumptext, checkcont);
    } else {
      //adding to container
      contain.addChild(bg, shape, rightbitmap, leftbitmap, topbitmap, line, arrow, innershape, numberjumptext);
    }

    contain.jumpWidth = jumpWidth;
    if (clock.clicked == 1) {
      //verticallimit(contain);
      verticallimit_new();
    }
    //jumpIconActions
    jumpIconActions(contain);

    contain.cursor = 'pointer';
    contain.selected = 1;
    contain.color = color;
    jumpObjectsList.push(contain);
    stage.addChild(contain);

    // add all the shapes to container    
    newJumpGlobals.leftPos = newJumpGlobals.leftPos + shape.widthi + 50;

    if (selectedJumpTag === 'showjumplength') {
      innershape.visible = false;
    } else if (selectedJumpTag === 'addjumplength') {
      customDisplayOn();
    } else if (selectedJumpTag === 'hidejumplength') {
      turnOfAllText();
    }
    stage.update();
  }
  //createjump method ends here

  //var declare for keypad child error
  var gg;

  function findAngle(sx, sy, ex, ey) {
    // make sx and sy at the zero point
    // var radian = Math.atan2((ex - sx), (ey - sy));
    var radian = Math.atan2((ey - sy), (ex - sx));
    var degree = radian / Math.PI * 180;

    return degree;
  }

  function getControlPoints(leftX, leftY, rightX, rightY, topX, topY) {
    var controlPoints = new Array();
    var px = topX * 2 - (leftX + rightX + 16) / 2;
    var py = topY * 2 - (leftY - 14 + rightY - 20) / 2;
    controlPoints.push(px, py);
    return controlPoints;
  }

  /**
   * To set mousedown + pressmove + pressup actions for each 
   */
  function jumpIconActions(contain) {
    var bg = contain.getChildByName('bg');
    var shape = contain.getChildByName('base');
    var rightbitmap = contain.getChildByName('right');
    var leftbitmap = contain.getChildByName('left');
    var topbitmap = contain.getChildByName('top');
    var line = contain.getChildByName('line');
    var arrow = contain.getChildByName('arrow');
    var innershape = contain.getChildByName('innerbase');
    var numberjumptext = contain.getChildByName('textvalue');

    //updateBlueContain
    function updateBlueContain(evt) {
      if (contain.activate === 1) {
        contain.activate = 2;
      }
      //update bitmap images
      leftbitmap.image = bitmapArray['scale_blue'].image;
      rightbitmap.image = bitmapArray['scale_blue'].image;
      topbitmap.image = bitmapArray['scale_blue_top'].image;
      //numberjumptext
      num = calculateN(Math.round(contain.jumpWidth / rulerSpacing));

      if (selectedNumerType !== 'fn') {
        numberjumptext.text = num;
      } else {
        var fr = getFraction(num);
        contain.removeChild(numberjumptext);
        numberjumptext = fr;
        contain.addChild(numberjumptext);
      }

      numberjumptext.x = ((leftbitmap.x + rightbitmap.x) / 2) + 9;
      //topbitmap
      topbitmap.x = ((leftbitmap.x + rightbitmap.x) / 2);
      //controlPoint
      var controlPoint = getControlPoints(leftbitmap.x, leftbitmap.y, rightbitmap.x, rightbitmap.y, topbitmap.x, topbitmap.y);
      var px = controlPoint[0];
      var py = controlPoint[1];
      //color
      contain.color = 'blue';
      //shape
      var index = contain.index;
	  
	  snap[index].rectX = leftbitmap.x - 5;
	  snap[index].rectY = leftbitmap.y - 9;
	  snap[index].rectWidth = contain.jumpWidth;
	  
	  snap[index].rectHeight = baseHeight;
	  snap[index].rectRadius = cornerRadius;
      shape.graphics.clear().beginFill(blue_shape_color).drawRoundRect(leftbitmap.x - 5, leftbitmap.y - 9, contain.jumpWidth, baseHeight, cornerRadius);
      innershape.graphics.clear().beginFill(blue_innershape_color).drawRoundRect(leftbitmap.x + rulerSpacing + 5, leftbitmap.y - 4, innershape.widthi, innerBaseHeight, cornerRadius);
      //arrow			
      arrow.image = bitmapArray['arrow_blue_right'].image;
      var wid = Math.round(contain.jumpWidth / rulerSpacing);
      /** above number_line **/
      if (contain.y <= nlDivider) {
        //line
        line.graphics.clear().setStrokeStyle(lineStroke).beginStroke(blue_line_color).moveTo(leftbitmap.x - 4, leftbitmap.y - 12).quadraticCurveTo(px + 20, py - 40, rightbitmap.x + 18, rightbitmap.y - 20);
        bg.graphics.clear().beginFill(transp_white).moveTo(leftbitmap.x - 4, leftbitmap.y - 14).quadraticCurveTo(px + 20, py - 40, rightbitmap.x + 18, rightbitmap.y - 20);
        //arrow coordinates


        arrow.x = rightbitmap.x + 9 + 9;
        arrow.y = rightbitmap.y - 29 + 9;
        //var sx = px + 15, sy = py - 40, 
        var sx = topbitmap.x, sy = topbitmap.y - 30, ex = arrow.x + 9, ey = arrow.y;
        var ang = findAngle(sx, sy, ex, ey);
        //console.log("angle"+ (ang-64));
        //arrow.rotation = -(ang / 2) ;
        arrow.rotation = (ang - 64);
		if(arrow.rotation > 5){
			arrow.rotation = 5;
		}
		
      } else {	//below number_line
        //line
        line.graphics.clear().setStrokeStyle(lineStroke).beginStroke(blue_line_color).moveTo(leftbitmap.x - 4, leftbitmap.y - 15 + 48).quadraticCurveTo(px + 20, py + 40, rightbitmap.x + 18, rightbitmap.y -5 + 48);
        bg.graphics.clear().beginFill(transp_white).moveTo(leftbitmap.x - 4, leftbitmap.y - 14 + 48).quadraticCurveTo(px + 20, py + 40, rightbitmap.x + 18, rightbitmap.y - 11 + 48);
        //arrow coordinates
        arrow.x = rightbitmap.x + 27 - 9;
        arrow.y = rightbitmap.y + 50 - 9;

        var sx = topbitmap.x, sy = topbitmap.y + 30, ex = arrow.x + 9, ey = arrow.y;
        var ang = findAngle(sx, sy, ex, ey);
        //console.log("angle abcd"+ (ang)+"btmp"+topbitmap.y);
        arrow.rotation = (ang - 109);

		if(arrow.rotation < -175){
			arrow.rotation = -175;
		}//console.log(arrow.rotation);
      }
    }

    //updateRedContain
    function updateRedContain(evt) {
      //update bitmap images
      contain.activate = 1;

      leftbitmap.image = bitmapArray['scale_red'].image;
      rightbitmap.image = bitmapArray['scale_red'].image;
      topbitmap.image = bitmapArray['scale_red_top'].image;
      //numberjumptext
      num = calculateN(Math.round(targetWidth / rulerSpacing));
      if (selectedNumerType !== 'fn') {
        numberjumptext.text = num;
      } else {
        var fr = getFraction(num);
        contain.removeChild(numberjumptext);
        numberjumptext = fr;
        contain.addChild(numberjumptext);
      }
      numberjumptext.x = ((leftbitmap.x + rightbitmap.x) / 2) + 9;
      //topbitmap
      topbitmap.x = ((leftbitmap.x + rightbitmap.x) / 2);
      //controlPoint
      var controlPoint = getControlPoints(leftbitmap.x, leftbitmap.y, rightbitmap.x, rightbitmap.y, topbitmap.x, topbitmap.y);
      var px = controlPoint[0];
      var py = controlPoint[1];
      //color
      contain.color = 'red';
      // Space between bitmap and rectangle border
      var index = contain.index;
	  
	  snap[index].rectX = rightbitmap.x - 6;
	  snap[index].rectY = rightbitmap.y - 9;
	  snap[index].rectWidth = snap[index].targetWidth;
	  snap[index].rectHeight = baseHeight;
	  snap[index].rectRadius = cornerRadius;

      //shape
      shape.graphics.clear().beginFill(red_shape_color).drawRoundRect(rightbitmap.x - 6, rightbitmap.y - 9, snap[index].rectWidth, baseHeight, cornerRadius);
      innershape.graphics.clear().beginFill(red_innershape_color).drawRoundRect(rightbitmap.x + rulerSpacing + 5, rightbitmap.y - 4, innershape.widthi, innerBaseHeight, cornerRadius);
      //arrow			
      arrow.image = bitmapArray['arrow_red_left'].image;
      var wid = Math.round(contain.jumpWidth / rulerSpacing);
      /** above number_line **/
      if (contain.y <= nlDivider) {
        //line			
        line.graphics.clear().setStrokeStyle(lineStroke).beginStroke(red_line_color).moveTo(rightbitmap.x, rightbitmap.y - 20).quadraticCurveTo(px + 20, py - 40, leftbitmap.x + 19, leftbitmap.y - 13);
        bg.graphics.clear().beginFill(transp_white).moveTo(rightbitmap.x, rightbitmap.y - 20).quadraticCurveTo(px + 20, py - 40, leftbitmap.x + 16, leftbitmap.y - 30);
		//console.log("right ");
        //arrow coordinates
        arrow.x = rightbitmap.x - 7 + 9;
        arrow.y = rightbitmap.y - 29 + 9;

        var sx = topbitmap.x, sy = topbitmap.y - 30, ex = arrow.x + 9, ey = arrow.y;
        var ang = findAngle(sx, sy, ex, ey);
        arrow.rotation = (ang - 120);
		//console.log("ang"+arrow.rotation);
		if(arrow.rotation < -15){
			arrow.rotation = -15;
		}
		
      } 
	  /** below number_line **/
	  else {
        //line			
        line.graphics.clear().setStrokeStyle(lineStroke).beginStroke(red_line_color).moveTo(rightbitmap.x + 2 , rightbitmap.y + 40).quadraticCurveTo(px + 20, py + 40, leftbitmap.x + 23, leftbitmap.y + 33);
        bg.graphics.clear().beginFill(transp_white).moveTo(rightbitmap.x, rightbitmap.y + 40).quadraticCurveTo(px + 20, py + 40, leftbitmap.x + 20, leftbitmap.y + 30);
        //arrow coordinates
        arrow.x = rightbitmap.x + 10 - 9;
        arrow.y = rightbitmap.y + 51 - 9;
        var sx = topbitmap.x, sy = topbitmap.y + 30, ex = arrow.x + 9, ey = arrow.y;
        var ang = findAngle(sx, sy, ex, ey);
        arrow.rotation = (ang - 85);
		//console.log("ang"+arrow.rotation);
		
		if(arrow.rotation > -195){
			arrow.rotation = -195;
		}

      }
    }

    /***************** innerrshape mousedown **********/
    innershape.on("click", function (e) {
      r = this.parent;
      jumpKeypad(r);
    })

    /***************** rightbitmap mousedown + pressmove + pressup **********/
    var xval = 30;
    var oldx;	//for right pointer varibale
    rightbitmap.on('mousedown', function (e) {
      var posX = e.stageX;
      var posY = e.stageY;
      oldx = e.stageX;
      this.oldX = this.x;
      this.oldY = this.y;
      this.offset = {
        x: this.x - posX,
        y: this.y - posY
      };
    });
    rightbitmap.on("pressmove", dragic);
    var check1 = 0;
    rightbitmap.on('pressup', function (e) {
      trigger_run();
      //if (clock_cont.visible == true) {
      //verticallimit(contain, contain.jumpWidth);
      //}
    });
    //right drag event
    function dragic(evt) {
      contain.removeAllEventListeners('pressmove');
      rightbitmap.x = evt.stageX + this.offset.x;
      check1 = evt.stageX - oldx;
      targetWidth = (leftbitmap.x > evt.target.x) ? (leftbitmap.x - evt.target.x) : (evt.target.x - leftbitmap.x);
	  
	  if (contain.snapRed === 1) {
		targetWidth = targetWidth + 31;
	  } else {
		targetWidth = targetWidth + 30;
	  }
      //targetWidth = targetWidth + 30;
	   
	  snap[contain.index].targetWidth = targetWidth;
      contain.jumpWidth = targetWidth;
      //update innershape width
      var expInnerWid = (rulerSpacing * 2) + 23;
      innershape.widthi = (targetWidth > expInnerWid) ? targetWidth - expInnerWid : 0;
      num = calculateN(Math.round(targetWidth / rulerSpacing));
      if (selectedNumerType !== 'fn') {
        numberjumptext.text = num;
      } else {
        var fr = getFraction(num);
        contain.removeChild(numberjumptext);
        numberjumptext = fr;
        contain.addChild(numberjumptext);
      }
      numberjumptext.x = topbitmap.x + 10;
      //createclock(numberjumptext.text);
      //to make the text center while dragging.
      var textsp = 0;
      /*if (contain.array.length > 0) {
       contain.getChildAt(4).x = topbitmap.x;
       var maxlimitn = contain.array.length - 1;
       //var textspace = 5;
       //console.log(contain.r.getChildAt(4));
       var centerpoint = Math.round(maxlimitn / 2);
       contain.array[centerpoint].x = topbitmap.x;
       //console.log(contain.array[centerpoint]);
       for (i = 0; i < contain.array.length; i++) {
       if (i < centerpoint) {
       textarrayjump[i].x = topbitmap.x + textsp;
       textsp += 10;
       } else {
       // console.log("ii");
       textarrayjump[i].x = topbitmap.x + textsp;
       textsp += 10;
       }
       }
       }*/
      if (contain.getChildAt(9) != undefined) {
        if (contain.getChildAt(9).children.length > 0) {
          //console.log("we are here");
          contain.getChildAt(9).x = contain.getChildByName('top').x - 90;
        }
      }
      if (leftbitmap.x <= evt.target.x) {
        updateBlueContain(evt);
      } else {
        updateRedContain(evt);
      }
	  
	  if (evt.target.x >= leftbitmap.x + leftbitmap.image.width) {
		if (contain.snapRed === 1) {
			contain.snapRed = 2;
		}
	  }
	  
	  if (evt.target.x <= leftbitmap.x && contain.rightCrossedLeft === 0) {
	   if ((leftbitmap.x + leftbitmap.image.width) % 50 != 0 && contain.leftCrossedRight === 0) {
			leftbitmap.x = leftbitmap.x-1;
			//contain.rightCrossedLeft = 1;
		} else {
			contain.rightCrossedLeft = 1;
			//contain.leftCrossedRight = 1;
			//leftbitmap.x = leftbitmap.x-7;
			
			if (contain.snapRed != 1) {
				leftbitmap.x = leftbitmap.x-7;
			}
		}
      } else if (evt.target.x <= leftbitmap.x && contain.rightCrossedLeft === 1 ) {
      } else if (evt.target.x > leftbitmap.x + leftbitmap.image.width && contain.rightCrossedLeft === 1) {
		if ((leftbitmap.x) % 50 != 0) {
			leftbitmap.x = leftbitmap.x + 1;
		} else {
			contain.rightCrossedLeft = 0;
			contain.leftCrossedRight = 0;
		}
      }
    }
    //rightbitmap pressup
    rightbitmap.on('pressup', function (evt) {
      targetWidth = (rightbitmap.x > leftbitmap.x) ? (rightbitmap.x - leftbitmap.x) : (leftbitmap.x - rightbitmap.x);
      targetWidth = targetWidth + 30;
      var rem = targetWidth % rulerSpacing;
      if (rem < 25) {
        targetWidth -= rem;
      } else {
        targetWidth += (rulerSpacing - rem);
      }
	  snap[contain.index].targetWidth = targetWidth;
      contain.jumpWidth = targetWidth;
      //update innershape width
      var expInnerWid = (rulerSpacing * 2) + 23;
      innershape.widthi = (contain.jumpWidth > expInnerWid) ? contain.jumpWidth - expInnerWid : 0;
      if (leftbitmap.x <= rightbitmap.x) { // for blue color			
        rightbitmap.x = leftbitmap.x + targetWidth - 30;
        updateBlueContain(evt);
      } else { //Red above the num line		        
        rightbitmap.x = leftbitmap.x - targetWidth + 25;
        updateRedContain(evt);
      }
      //console.log(targetWidth);
      if (contain.getChildAt(9) != undefined) {
        if (contain.getChildAt(9).children.length > 0) {
          //console.log("we are here");
          contain.getChildAt(9).x = contain.getChildByName('top').x - 90;
        }
      }
      if (leftbitmap.x < rightbitmap.x) {
		contain.leftCrossedRight = 0;
		contain.rightCrossedLeft = 0;
	  }
	  
		if (contain.snapRed === 1) {
			contain.snapRed = 2;
		}
    });


    /********** leftbitmap mousedown + pressmove + pressup ***********/
    var oldx2;
    var oldRightbitmapX = rightbitmap.x;	//for left pointer varibale
    leftbitmap.on('mousedown', function (e) {
      // shape.widthi = shape.widthi + check1 - check;	 
      var posX = e.stageX;
      var posY = e.stageY;
      oldx2 = e.stageX;
      this.oldX = this.x;
      this.oldY = this.y;
      this.offset = {
        x: this.x - posX,
        y: this.y - posY
      };
    });
    leftbitmap.on("pressmove", ldragic);
    var check = 0;
    leftbitmap.on('pressup', function (e) {
      trigger_run();
      //if (clock_cont.visible == true) {
      //   verticallimit(contain, contain.jumpWidth);
      //}
    });
    //left drag event
    function ldragic(evt) {
      contain.removeAllEventListeners('pressmove');
      leftbitmap.x = evt.stageX + this.offset.x;
      targetWidth = (rightbitmap.x > evt.target.x) ? (rightbitmap.x - evt.target.x) : (evt.target.x - rightbitmap.x);
      targetWidth = targetWidth + 30;
	  snap[contain.index].targetWidth = targetWidth;
	  
      contain.jumpWidth = targetWidth;
      //update innershape width
      var expInnerWid = (rulerSpacing * 2) + 23;
      innershape.widthi = (targetWidth > expInnerWid) ? targetWidth - expInnerWid : 0;
      //text on innershape
      num = calculateN(Math.round(targetWidth / rulerSpacing));
      if (selectedNumerType !== 'fn') {
        numberjumptext.text = num;
      } else {
        var fr = getFraction(num);
        contain.removeChild(numberjumptext);
        numberjumptext = fr;
        contain.addChild(numberjumptext);
      }
      if (contain.getChildAt(9) != undefined) {
        if (contain.getChildAt(9).children.length > 0) {
          contain.getChildAt(9).x = contain.getChildByName('top').x - 90;
        }
      }
      numberjumptext.x = topbitmap.x + 10;
      //createclock(numberjumptext.text);
      //check dragging direction based on x co-ordinate
      /* if (rightbitmap.x > evt.target.x) { //For blue color dragging			
       if(contain.color == 'red'){
       //rightbitmap.x = oldRightbitmapX -33;
       console.log("behen");}
       updateBlueContain(evt);
       } else { // For red color dragging	
       if(contain.color == 'blue'){
       //rightbitmap.x = oldRightbitmapX +33;
       console.log("bhai");}
       updateRedContain(evt);
       }
       */

      if (rightbitmap.x >= evt.target.x) { //For blue color dragging			
        updateBlueContain(evt);
      } else { // For red color drgging			
        updateRedContain(evt);
      }
	  
	  if (evt.target.x >= rightbitmap.x + rightbitmap.image.width) {
		if (contain.snapRed === 0) {
			contain.snapRed = 1;
		} else if (contain.snapRed === 2) {
			contain.snapRed = 1;
		}
	  }
	  
	  
	  if (evt.target.x >= rightbitmap.x + rightbitmap.image.width && contain.leftCrossedRight === 0) {
	  
		if ((rightbitmap.x) % 50 != 0 && contain.rightCrossedLeft === 0) {
		
			rightbitmap.x = rightbitmap.x + 1;
		} else {
		
			contain.leftCrossedRight = 1;
			contain.noChange = 1;
			//rightbitmap.x = rightbitmap.x + 7;
		}
      } else if (evt.target.x >= rightbitmap.x + rightbitmap.image.width && contain.rightCrossedLeft === 1) {
		
      } else if (evt.target.x > rightbitmap.x+ rightbitmap.image.width && contain.leftCrossedRight === 1) {
      } else if (evt.target.x < rightbitmap.x && contain.leftCrossedRight === 1) {
		if ((rightbitmap.x+ rightbitmap.image.width) % 50 != 0) {
			rightbitmap.x = rightbitmap.x-1;
			
		} else {
		
			contain.leftCrossedRight = 0;
			rightbitmap.x = rightbitmap.x-7;
		}
      } else if (evt.target.x < rightbitmap.x && contain.rightCrossedLeft === 1) {
		if ((rightbitmap.x) % 50 != 0) {
			rightbitmap.x = rightbitmap.x-1;
			
		} else {
		
			contain.leftCrossedRight = 0;
			contain.rightCrossedLeft = 0;
			rightbitmap.x = rightbitmap.x-7;
		}
      }
    }
    //leftbitmap pressup
    leftbitmap.on('pressup', function (evt) {
      targetWidth = (rightbitmap.x > leftbitmap.x) ? (rightbitmap.x - leftbitmap.x) : (leftbitmap.x - rightbitmap.x);
      targetWidth = targetWidth + 30;
      var rem = targetWidth % rulerSpacing;
      if (rem < 25) {
        targetWidth -= rem;
      } else {
        targetWidth += (rulerSpacing - rem);
      }
      contain.jumpWidth = targetWidth;
	  snap[contain.index].targetWidth = targetWidth;
	  
      //update innershape width
      var expInnerWid = (rulerSpacing * 2) + 23;
      innershape.widthi = (contain.jumpWidth > expInnerWid) ? contain.jumpWidth - expInnerWid : 0;
      if (leftbitmap.x <= rightbitmap.x) { // for blue color
        leftbitmap.x = rightbitmap.x - targetWidth + 30;
        updateBlueContain(evt);
      } else { //Red above the num line
        leftbitmap.x = rightbitmap.x + targetWidth - 30;
        updateRedContain(evt);
      }
      if (contain.getChildAt(9) != undefined) {
        if (contain.getChildAt(9).children.length > 0) {
          contain.getChildAt(9).x = contain.getChildByName('top').x - 90;
        }
      }
      snapLeft();
      //console.log(contain.x + '--' + rightbitmap.x);
	  if (leftbitmap.x < rightbitmap.x) {
		contain.leftCrossedRight = 0;
		contain.rightCrossedLeft = 0;
	  }
    });

    /********** topbitmap mousedown + pressmove + pressup ********/
    topbitmap.on('mousedown', function (e) {
      var posX = e.stageX;
      var posY = e.stageY;
      this.oldX = this.x;
      this.oldY = this.y;
      this.offset = {
        x: this.x - posX,
        y: this.y - posY
      };
    });
    topbitmap.on("pressmove", tdragic);
    topbitmap.on('pressup', function (e) {
      trigger_run();
    });
    //pressmove
    function tdragic(evt) {
      contain.removeAllEventListeners('pressmove');
      topbitmap.y = evt.stageY + this.offset.y;
      var limitSize = 60;
      if (contain.y <= nlDivider) { //Above the number line	
        //For restricting the top bitmap
        if (topbitmap.y > -limitSize)
          topbitmap.y = -limitSize;

        if (leftbitmap.x <= rightbitmap.x) {	//For blue color	 	
          updateBlueContain();
          //console.log(topbitmap.y+'=='+arrow.rotation);
          /*if (-topbitmap.y < 80) {
           arrow.x = arrow.x - 4;
           arrow.y = arrow.y + 2;
           arrow.rotation = arrow.rotation - 5;
           }*/
        } else { // For red color
          updateRedContain();
        }
      } else {	//below the num line
        //For restricting the top bitmap
        if (topbitmap.y < limitSize)
          topbitmap.y = limitSize;

        if (leftbitmap.x <= rightbitmap.x) {  // For blue color 
          updateBlueContain();
          
        } else { // For red color
          updateRedContain();
        }
      }
      stage.update();
    }

    /********** container mousedown + pressmove + pressup ********/
    function trigger_run() {
      contain.on('mousedown', cmouse);
      contain.on("pressmove", cdragic);
      contain.on('pressup', function () {
        snapLeft(this);
      });
    }
    trigger_run();


    //container mousedown
    function cmouse(e) {
      deselectpurplecircle();
      if (e.currentTarget.selected !== 1)
        deselectJumpObjects();
      if (!contain.getChildAt(2).visible) {
        contain.getChildAt(2).visible = true;
      }
      if (!contain.getChildAt(3).visible) {
        contain.getChildAt(3).visible = true;
      }
      if (!contain.getChildAt(4).visible) {
        contain.getChildAt(4).visible = true;
      }
      contain.selected = 1;
      //if (clock.clicked == 1) {
      //  verticallimit(contain);
      //}
      var posX = e.stageX;
      var posY = e.stageY;
      this.oldX = this.x;
      this.oldY = this.y;
      this.offset = {
        x: this.x - posX,
        y: this.y - posY
      };
      selectContainer(e, this);
    }

    //container pressmove
    function cdragic(evt) {
      targetWidth = (leftbitmap.x > rightbitmap.x) ? (leftbitmap.x - rightbitmap.x) : (rightbitmap.x - leftbitmap.x);
      targetWidth = targetWidth + 30;
	  snap[contain.index].targetWidth = targetWidth;
      contain.x = evt.stageX + this.offset.x;
      contain.y = evt.stageY + this.offset.y;
      $("#jumpKeypadSection").css("display", "none");
      if (gg) {
        stage.removeChild(gg);
      }
      //console.log(contain.color+'=='+topbitmap.y);
      //if jumpIcon crosses main ruler
      topbitmap.y = (topbitmap.y < 0) ? topbitmap.y : -topbitmap.y;
      if (contain.y > nlDivider) {	// Below the number line  
        topbitmap.y = (topbitmap.y < 0) ? -topbitmap.y : topbitmap.y;
        if (contain.color == 'blue') { // For blue color
          updateBlueContain();
          /* if (topbitmap.y < 80) {
           arrow.x = arrow.x - 6;
           arrow.y = arrow.y + 3;
           arrow.rotation = arrow.rotation + 25;
           }
           */
        } else {		// For red color
          updateRedContain();
        }
      } else {//Above the number line
        if (contain.color == 'blue') {	// For blue color
          updateBlueContain();
          /*if (-topbitmap.y < 80) {
           arrow.x = arrow.x - 4;
           arrow.y = arrow.y + 2;
           arrow.rotation = arrow.rotation - 5;
           }
           */
        } else {	 // For red color
          updateRedContain();
        }
      }
      dragContainer(evt, this);
    }
    stage.update();
  }
  //jumpIconActions ends here

  /**
   * Update Numbers based on number type selected
   * @param {type} num
   * @returns {div|custom_L7.calculateN.div|number|custom_L7.calculateN.num|Array|di|custom_L7.calculateN.di|Number|String}
   */
  function calculateN(num) {
    number = "";
    if (selectedNumerType === 'fn') {
      var di = selectedSubType.split("/");
      var div = Math.floor(num / di[1]);
      var rem = num % di[1];
      if (rem > 0 && div > 0) {
        number = div + "-" + rem + "/" + di[1];
      } else if (rem > 0 && div === 0) {
        number = rem + "/" + di[1];
      } else {
        number = div;
      }
    } else if (selectedNumerType === 'dn') {
      var di = selectedSubType;
      number = num * di;
      if (parseFloat(di) === parseFloat(.1)) {
        number = number.toFixed(1);
      }
      if (parseFloat(di) === parseFloat(.001)) {
        number = number.toFixed(3);
      }
      if (parseFloat(di) === parseFloat(.01)) {
        number = number.toFixed(2);
      }
      if (parseFloat(di) === parseFloat(.5)) {
        number = number.toFixed(1);
      }
      if (parseFloat(di) === parseFloat(.25)) {
        number = number.toFixed(2);
      }
      if (parseFloat(di) === parseFloat(.125)) {
        number = number.toFixed(3);
      }

    } else if (selectedNumerType === 'wn') {
      var di = selectedSubType;
      number = num * di;
      //console.log(di+'=='+num);
    } else if (selectedNumerType === 'nn') {
      number = '';
    }
    return number;
  }
  /**
   * Function set the offset on clicking 
   * @param {type} e
   * @param {type} contain
   * @returns {undefined}
   */
  function selectContainer(e, contain) {
    deselectpurplecircle();
    if (e.currentTarget.selected !== 1) {
      deselectJumpObjects();
    }
    //deselectJumpObjects();
    if (!contain.getChildAt(2).visible) {
      contain.getChildAt(2).visible = true;
    }
    if (!contain.getChildAt(3).visible) {
      contain.getChildAt(3).visible = true;
    }
    if (!contain.getChildAt(4).visible) {
      contain.getChildAt(4).visible = true;
    }
    contain.selected = 1;
    var posX = e.stageX;
    var posY = e.stageY;
    contain.oldX = contain.x;
    contain.oldY = contain.y;
    contain.offset = {
      x: contain.x - posX,
      y: contain.y - posY
    };
    // get the current mouse position
    var mx = parseInt(e.stageX - offsetX);
    var my = parseInt(e.stageY - offsetY);

    // test each rect to see if mouse is inside
    dragok = false;
    for (var i = 0; i < jumpObjectsList.length; i++) {
      var r = jumpObjectsList[i];
      // if yes, set that rects isDragging=true
      if (r.selected === 1) {
        dragok = true;
      }
    }
    // save the current mouse position
    startX = mx;
    startY = my;
  }

  /**
   * function to drag the container
   * @param {type} e
   * @param {type} contain
   * @returns {undefined}
   */

  function dragContainer(e, contain) {
    if (dragok) {
      var mx = parseInt(e.stageX - offsetX);
      var my = parseInt(e.stageY - offsetY);
      var dx = mx - startX;
      var dy = my - startY;
      for (var i = 0; i < jumpObjectsList.length; i++) {
        var r = jumpObjectsList[i];
        if (r.selected === 1) {
          r.x += dx;
          r.y += dy;
        }
      }
      startX = mx;
      startY = my;
    }
    contain.x = e.stageX + contain.offset.x;
    contain.y = e.stageY + contain.offset.y;
  }

  /**
   * Vertical line snap
   * @returns {Boolean}
   */
  function snapLeft() {
    for (var j in jumpObjectsList) {
      var container = jumpObjectsList[j];
      if (container.selected === 1) {
        var rem = (container.x - 8) % rulerSpacing;
        rem = Math.abs(rem);
        var half = rulerSpacing / 2;
        if (rem > half) {
          var add = (rulerSpacing - rem);
          container.x = container.x + add;
          //verticallimit(container);
        } else {
          container.x = container.x - rem;
          //verticallimit(container);
        }
        if (container.activate === 1) {
          snapping();
        } else if (container.activate === 2) {
          snappingBack();
        }
      }
    }
    verticallimit_new();
    return false;
  }

  /**
   * Vertical line snap
   * @returns {Boolean}
   */
  function snapping() {
    var delta;
    var diff;
    for (var j in jumpObjectsList) {
      var container = jumpObjectsList[j];
      if (container.selected === 1) {
		// Space between bitmap and rectangle border
		var rightbitmap = container.getChildByName('right');
		var leftbitmap = container.getChildByName('left');
		var topbitmap = container.getChildByName('top');
		var shape = container.getChildByName('base');
		
		var bg = container.getChildByName('bg');
		var line = container.getChildByName('line');
		var arrow = container.getChildByName('arrow');
		
		var numberjumptext = container.getChildByName('textvalue');
	
		var index = container.index;
		if (leftbitmap.x > rightbitmap.x) {
		  diff = Math.abs((snap[index].rectX+snap[index].rectWidth)-(leftbitmap.x+rightbitmap.image.width));
		} else {
			diff = Math.abs((snap[index].rectX+snap[index].rectWidth)-(rightbitmap.x+rightbitmap.image.width));
		}
		if (diff < 12) {
			  delta = 12 - diff;
		}
		var half = rulerSpacing / 2;
		rem = (snap[index].rectX) % rulerSpacing;
			  
		// To snap the rectangle
		if (rem > half) {
				var add = (rulerSpacing - rem);
				snap[index].rectX = snap[index].rectX + add;
		} else {
				snap[index].rectX = snap[index].rectX - rem;
		}
		snap[index].rectWidth = snap[index].rectWidth + delta;
			
		// To change the rectangle width
		rem = (snap[index].rectWidth) % rulerSpacing;
		if (rem > half) {
				var add = (rulerSpacing - rem);
				snap[index].rectWidth = snap[index].rectWidth + add;
		} else {
				snap[index].rectWidth = snap[index].rectWidth - rem;
		}
		
		shape.graphics.clear().beginFill(red_shape_color).drawRoundRect(snap[index].rectX - 4.2, snap[index].rectY, snap[index].rectWidth-1, snap[index].rectHeight, snap[index].rectRadius);
		leftbitmap.x = snap[index].rectX + snap[index].rectWidth - leftbitmap.image.width - 8;
		rightbitmap.x = snap[index].rectX;
		snap[index].rectX = snap[index].rectX - 4.2;
		
		//controlPoint
		var controlPoint = getControlPoints(leftbitmap.x, leftbitmap.y, rightbitmap.x, rightbitmap.y, topbitmap.x, topbitmap.y);
		var px = controlPoint[0];
		var py = controlPoint[1];
	  
		/** above number_line **/
		if (container.y <= nlDivider) {
			//line			
	      line.graphics.clear().setStrokeStyle(lineStroke).beginStroke(red_line_color).moveTo(rightbitmap.x, rightbitmap.y - 20).quadraticCurveTo(px + 20, py - 40, leftbitmap.x + 19, leftbitmap.y - 13);
          bg.graphics.clear().beginFill(transp_white).moveTo(rightbitmap.x, rightbitmap.y - 20).quadraticCurveTo(px + 20, py - 40, leftbitmap.x + 16, leftbitmap.y - 30);
		  //console.log("right ");
          //arrow coordinates
          arrow.x = rightbitmap.x - 7 + 9;
          arrow.y = rightbitmap.y - 29 + 9;

			var sx = topbitmap.x, sy = topbitmap.y - 30,ex = arrow.x + 9, ey = arrow.y;
			var ang = findAngle(sx, sy, ex, ey);
			arrow.rotation = (ang - 120);
		if(arrow.rotation < -15){
			arrow.rotation = -15;
		}
		} else {
			//line			
			line.graphics.clear().setStrokeStyle(lineStroke).beginStroke(red_line_color).moveTo(rightbitmap.x + 2 , rightbitmap.y + 40).quadraticCurveTo(px + 20, py + 40, leftbitmap.x + 23, leftbitmap.y + 33);
        bg.graphics.clear().beginFill(transp_white).moveTo(rightbitmap.x, rightbitmap.y + 40).quadraticCurveTo(px + 20, py + 40, leftbitmap.x + 20, leftbitmap.y + 30);
        //arrow coordinates
        arrow.x = rightbitmap.x + 10 - 9;
        arrow.y = rightbitmap.y + 51 - 9;
        var sx = topbitmap.x, sy = topbitmap.y + 30, ex = arrow.x + 9, ey = arrow.y;
        var ang = findAngle(sx, sy, ex, ey);
        arrow.rotation = (ang - 85);

		if(arrow.rotation > -195){
			arrow.rotation = -195;
		}
		}
		numberjumptext.x = ((leftbitmap.x + rightbitmap.x) / 2) + 9;
		
		//console.log("topbitmap.x:", topbitmap.x);
		//console.log("leftbitmap.x:", leftbitmap.x);
		//console.log("rightbitmap.x:", rightbitmap.x);
		
		// To align top bitmap in between left/right bitmaps
		if (topbitmap.x === ((leftbitmap.x + rightbitmap.x) / 2)) {
			//console.log("TRUE");
		} else {
			//console.log("FALSE");
			topbitmap.x = (leftbitmap.x + rightbitmap.x) / 2;
		}
		
	  }
    }
    return false;
  }

  /**
   * Vertical line snap
   * @returns {Boolean}
   */
  function snappingBack() {
    var delta;
    var diff;
    for (var j in jumpObjectsList) {
      var container = jumpObjectsList[j];
      if (container.selected === 1) {
		// Space between bitmap and rectangle border
		var rightbitmap = container.getChildByName('right');
		var leftbitmap = container.getChildByName('left');
		var topbitmap = container.getChildByName('top');
		var shape = container.getChildByName('base');
		
		var bg = container.getChildByName('bg');
		var line = container.getChildByName('line');
		var arrow = container.getChildByName('arrow');
		var numberjumptext = container.getChildByName('textvalue');
		
		var index = container.index;
		
		if (leftbitmap.x > rightbitmap.x) {
		  diff = Math.abs((snap[index].rectX+snap[index].rectWidth)-(leftbitmap.x+rightbitmap.image.width));
		} else {
			diff = Math.abs((snap[index].rectX+snap[index].rectWidth)-(rightbitmap.x+rightbitmap.image.width));
		}
				
		var half = rulerSpacing / 2;
		rem = (snap[index].rectX) % rulerSpacing;
			  
		if (rem > half) {
				var add = (rulerSpacing - rem);
				snap[index].rectX = snap[index].rectX + add;
		} else {
				snap[index].rectX = snap[index].rectX - rem;
		}
			
		rem = (snap[index].rectWidth) % rulerSpacing;
		if (rem > half) {
				var add = (rulerSpacing - rem);
				snap[index].rectWidth = snap[index].rectWidth + add;
		} else {
				snap[index].rectWidth = snap[index].rectWidth - rem;
		}
	  
	    if (contain.snapRed === 1) {
			contain.snapRed = 2;
		}
		
		shape.graphics.clear().beginFill(blue_shape_color).drawRoundRect(snap[index].rectX - 4, snap[index].rectY, snap[index].rectWidth, snap[index].rectHeight, snap[index].rectRadius);
		leftbitmap.x = snap[index].rectX + 2;
		rightbitmap.x = snap[index].rectX + snap[index].rectWidth - rightbitmap.image.width - 8;
		
		//controlPoint
		var controlPoint = getControlPoints(leftbitmap.x, leftbitmap.y, rightbitmap.x, rightbitmap.y, topbitmap.x, topbitmap.y);
		var px = controlPoint[0];
		var py = controlPoint[1];
	  
		/** above number_line **/
		if (container.y <= nlDivider) {
			//line
		  line.graphics.clear().setStrokeStyle(lineStroke).beginStroke(blue_line_color).moveTo(leftbitmap.x - 4, leftbitmap.y - 12).quadraticCurveTo(px + 20, py - 40, rightbitmap.x + 18, rightbitmap.y - 20);
        bg.graphics.clear().beginFill(transp_white).moveTo(leftbitmap.x - 4, leftbitmap.y - 14).quadraticCurveTo(px + 20, py - 40, rightbitmap.x + 18, rightbitmap.y - 20);
        //arrow coordinates


        arrow.x = rightbitmap.x + 9 + 9;
        arrow.y = rightbitmap.y - 29 + 9;
        //var sx = px + 15, sy = py - 40, 
        var sx = topbitmap.x, sy = topbitmap.y - 30, ex = arrow.x + 9, ey = arrow.y;
        var ang = findAngle(sx, sy, ex, ey);
        //console.log("angle"+ (ang-64));
        //arrow.rotation = -(ang / 2) ;
        arrow.rotation = (ang - 64);
		if(arrow.rotation > 5){
			arrow.rotation = 5;
		}
		} else {	//below number_line
			//line
			  line.graphics.clear().setStrokeStyle(lineStroke).beginStroke(blue_line_color).moveTo(leftbitmap.x - 4, leftbitmap.y - 15 + 48).quadraticCurveTo(px + 20, py + 40, rightbitmap.x + 18, rightbitmap.y -5 + 48);
        bg.graphics.clear().beginFill(transp_white).moveTo(leftbitmap.x - 4, leftbitmap.y - 14 + 48).quadraticCurveTo(px + 20, py + 40, rightbitmap.x + 18, rightbitmap.y - 11 + 48);
        //arrow coordinates
        arrow.x = rightbitmap.x + 27 - 9;
        arrow.y = rightbitmap.y + 50 - 9;

        var sx = topbitmap.x, sy = topbitmap.y + 30, ex = arrow.x + 9, ey = arrow.y;
        var ang = findAngle(sx, sy, ex, ey);
        //console.log("angle abcd"+ (ang)+"btmp"+topbitmap.y);
        arrow.rotation = (ang - 109);

		if(arrow.rotation < -175){
			arrow.rotation = -175;
		}}
		numberjumptext.x = ((leftbitmap.x + rightbitmap.x) / 2) + 9;
		
		//console.log("topbitmap.x:", topbitmap.x);
		//console.log("leftbitmap.x:", leftbitmap.x);
		//console.log("rightbitmap.x:", rightbitmap.x);
		
		// To align top bitmap in between left/right bitmaps
		if (topbitmap.x === ((leftbitmap.x + rightbitmap.x) / 2)) {
			//console.log("TRUE");
		} else {
			//console.log("FALSE");
			topbitmap.x = (leftbitmap.x + rightbitmap.x) / 2;
		}
		
      }
    }
    return false;
  }

  stage.update();
  //Onload show a startup message and hide after 4 seconds
  var startUpMsg = new createjs.Bitmap(nlImagePath+"/start_here_animation.png");
  startUpMsg.x = 207;
  startUpMsg.y = 10;
  stage.addChild(startUpMsg);
  stage.update();
  function preload_bitmap(bitmap) {
    var arrow_blue_right = new createjs.Bitmap(nlImagePath + '/arrow_blue_right.png');
    bitmap["arrow_blue_right"] = arrow_blue_right;
    var arrow_red_left = new createjs.Bitmap(nlImagePath + '/arrow_red_left.png');
    bitmap["arrow_red_left"] = arrow_red_left;
    var scale_red = new createjs.Bitmap(nlImagePath + '/scale_icon_red.png');
    bitmap["scale_red"] = scale_red;
    var scale_blue = new createjs.Bitmap(nlImagePath + '/scale_icon_blue.png');
    bitmap["scale_blue"] = scale_blue;
    var scale_blue_top = new createjs.Bitmap(nlImagePath + '/blue_icon_top.png');
    bitmap["scale_blue_top"] = scale_blue_top;
    var scale_red_top = new createjs.Bitmap(nlImagePath + '/red_icon_top.png');
    bitmap["scale_red_top"] = scale_red_top;
    
    var clock_background = new createjs.Bitmap(nlImagePath + '/rounded_rectangle.png');
    bitmap["clock_background"] = clock_background;
   
    var text_background = new createjs.Bitmap(nlImagePath + '/text_rect.png');
    bitmap["text_background"] = text_background;
    
   
    
    return bitmap;
  }
  /*
   custome display on
   */
  function customDisplayOn() {
    for (var i = 0; i < jumpObjectsList.length; i++) {
      jumpObjectsList[i].getChildAt(8).visible = false;
      jumpObjectsList[i].getChildAt(7).visible = true;
      if (jumpObjectsList[i].getChildAt(9) != undefined) {
        jumpObjectsList[i].getChildAt(9).visible = true;
      }
    }
  }
  /*
   custome display off
   */
  function customDisplayOff() {
    for (var i = 0; i < jumpObjectsList.length; i++) {
      jumpObjectsList[i].getChildAt(8).visible = true;
      jumpObjectsList[i].getChildAt(7).visible = false;
      if (jumpObjectsList[i].getChildAt(9) != undefined) {
        jumpObjectsList[i].getChildAt(9).visible = false;
      }
    }
    $("#jumpKeypadSection").css("display", "none");
    if (gg) {
      stage.removeChild(gg);
    }
  }

  /*
   custom keypad and text off
   */
  function turnOfAllText() {
    for (var i = 0; i < jumpObjectsList.length; i++) {
      jumpObjectsList[i].getChildAt(8).visible = false;
      jumpObjectsList[i].getChildAt(7).visible = false;
      if (jumpObjectsList[i].getChildAt(9) != undefined) {
        jumpObjectsList[i].getChildAt(9).visible = false;
      }
    }
  }

  /*
   keypad execution
   */
  function keypadPostion(r) {
    var check = document.getElementById("jumpKeypadSection");
    var gg = new createjs.DOMElement(check);
    stage.addChild(gg);
    if (r.type == "numberjump") {
      var innerbase = r.getChildByName('innerbase');
      gg.x = r.x + innerbase.widthi + 80;
      gg.y = r.y - 280;
      stage.update();
    } else if (r.type == "purplecircle") {
      if (r.getChildByName('purpleline')) {
        var numberTxt = r.getChildByName("numberText");        
        gg.x = r.getChildByName('purpleline').x + ((numberTxt.circleNum) * rulerSpacing) - 50;
        gg.y = pinkCont.y - ($(check).height() / 2 + 50);
        //console.log("check child" + r.getChildAt(1).name.replace("circle", ""));
      } else {        
        gg.x = r.getChildByName('purpleline').x;
        gg.y = nlDivider
        //console.log("no child"+((r.getChildAt(0).name.replace("circle","")) * 10));
      }
      stage.update();
    }
  }
  /**
   * Purple circle custom text keypad
   * @param {type} r
   * @returns {undefined}
   */
  function pcjumpKeypad(r) {
    if (r.selected === 1) {
      //console.log(r);
      var purpleBorder = r.getChildByName('purpleBorder');
      var purpleline = r.getChildByName('purpleline');
      var numberTxt = r.getChildByName('numberText');
      jump_color = r.fontcolor;
      $("#jumpKeypadSection").css("display", "block");
      $(".close_icon").on("click", function () {
        $("#jumpKeypadSection").css("display", "none");
        stage.removeChild(gg);
      });
      var numcnt;
      //for position of the keypad display
      keypadPostion(r);

      numcnt = numberTxt.circleNum;
      
      if (r.getChildByName('purplecircletextcont') !== null) {
        checkcont = r.getChildByName('purplecircletextcont');       
      } else {
        var checkcont = new createjs.Container();
        checkcont.name = "purplecircletextcont";       
        r.addChildAt(checkcont,r.getNumChildren());               
        stage.update();
      }
      //checkcont.x = purpleline.x;
		checkcont.x = -6; // for position of number text inside tickmark
       var xpos = 50 * numcnt - 4;
      
      //on keypad clik
      $(".digits,.keypadsym, .keyspace, .keybackspace").off("click").on("click", function () {        
       var purplecircle = "";
        for (var i in r.children) {
          var child = r.children[i];
          if (typeof child.name !== 'undefined' && (child.name).indexOf('circle') !== -1 && child.name !== 'purplecircletextcont') {
            purplecircle = child;
          }
        }
        
        purplecircle.alpha = 1;   
	
        var val = $(this).attr("id");
		var jumpval;
        if(val !=="backspace"){
			jumpval = $(this).attr("id");
        }
		if (jumpval == "space") {
          jumpval = '';
        } 
		
		for (var i = 0; i < checkcont.children.length; i++) {
          if(val == "backspace"){
			  checkcont.children[i].x = checkcont.children[i].x + 9;
		  }else{
			   checkcont.children[i].x = checkcont.children[i].x - 9;
          }
          stage.update();
        }
		var keytext = new createjs.Text(jumpval, "24px ProximaNova", jump_color);
        keytext.textBaseline = "top";      
        if (zoom_check < 2) {
          //lecirclex = 50 * numcnt - 4;
          lecirclex = 0;
		  keytext.y = numberTxt.y + 10;
          keytext.x = lecirclex;
        }
        if (zoom_check === 2) {
          //lecirclex = 85 * numcnt - 4;
          lecirclex = 0;
		  keytext.x = lecirclex;
          keytext.y = numberTxt.y + 10;
        }
        if (zoom_check === 3) {
          //lecirclex = 125 * numcnt - 4;
          lecirclex = 0;
		  keytext.x = lecirclex;
          keytext.y = numberTxt.y + 10;
        }
        if (checkcont.children && checkcont.children.length > 0 && r.selected === 1) {
			//for backspace
			if (val == "backspace"){ 
			  checkcont.removeChildAt(checkcont.children.length - 1);
			  if (checkcont.children.length == 0) {
				  purplecircle.alpha = .4;
					}
			  if (checkcont.children.length > 2) {	
			     keytext.x = checkcont.children[checkcont.children.length - 1].x - r.textspace ;
				 r.widthec = r.widthec - r.textspace  ;
				 r.numberCounter--;
				 var lecirclex = keytext.x - r.numberCounter * 16.5 + 3 ;
				 var lecircley = keytext.y;
				 purpleBorder.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).drawEllipse(lecirclex + 12 , lecircley - 5, r.widthec, 40).endStroke().endFill();
                 purplecircle.graphics.clear().beginFill(purpleBG).drawEllipse(lecirclex + 12, lecircley - 5, r.widthec, 40);
			  } 

			 if (checkcont.children.length <= 2) { 
               purpleBorder.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).drawCircle(0, pinkCont.y + 37, 22.5).endStroke().endFill();
               purplecircle.graphics.clear().beginFill(purpleBG).drawCircle(0,pinkCont.y + 37, 21);
             }
			 stage.update();
			 }
			//
			else
			{		 
		      keytext.x = checkcont.children[checkcont.children.length - 1].x + r.textspace ;
         //keytext.x = 0;
		 if (checkcont.children.length > 2) {
            purplecircle.shape = 1; // 1 for ellipse and 0 for circle
			r.widthec = r.widthec + r.textspace  ;
            xpos = xpos - (r.textspace / 2);      
            r.numberCounter++;
            var lecirclex = keytext.x - r.numberCounter * 16.5 + 3 ;
            var lecircley = keytext.y;
			purpleBorder.graphics.clear().beginStroke(darkPurpleBorder).setStrokeStyle(3).drawEllipse(lecirclex , lecircley - 5, r.widthec, 40).endStroke().endFill();
            purplecircle.graphics.clear().beginFill(purpleBG).drawEllipse(lecirclex, lecircley - 5, r.widthec, 40);
           }
			}
        }
        stage.update();
        if (r.selected === 1 && val !== "backspace") {
          checkcont.addChild(keytext);
          r.addChildAt(checkcont,r.getNumChildren());  
          stage.update();
		  }
      });

//on color selection
      $(".keycolor_splash").on('click', function () {
        jump_color = $(this).attr("id");
        ctitle = $(this).attr("title");
        jump_color = jump_color.replace("_d", "");
        //r.fontcolor = jump_color;
        if ($(".keycolor_splash").hasClass("calc_hover_class")) {
          $(".keycolor_splash").removeClass("calc_hover_class");
          $(this).addClass("calc_hover_class");
        } else {
          $(this).addClass("calc_hover_class");
        }
        if (r.selected === 1) {
          for (var i = 0; i < checkcont.children.length; i++) {
            checkcont.children[i].color = jump_color;
          }
          r.fontcolor = jump_color;
        }
        stage.update();
      });
    } else {
      $("#jumpKeypadSection").css("display", "none");
    }
  }

  /*
   * 
   * keypad for number jump*/
  //innershape
  //var texttest = 60;
  function jumpKeypad(r) {
    if (r.selected == 1) {
      //console.log(r);
      jump_color = r.fontcolor;
      //console.log(jump_color);
      $("#jumpKeypadSection").css("display", "block");
      $(".close_icon").on("click", function () {
        $("#jumpKeypadSection").css("display", "none");
        stage.removeChild(gg);
      });
      var numcnt;
      //for position of the keypad display
      keypadPostion(r);
      if (r.type == "numberjump") {
        //var textbox = r.getChildAt(7);
        if (r.getChildAt(9) != undefined) {
          checkcont = r.getChildAt(9);
        } else {
          var checkcont = new createjs.Container();
          checkcont.name = "numberjumptextcont";
          r.addChild(checkcont);
          stage.update();
        }
      } else if (r.type == "purplecircle") {
        numcnt = r.getChildAt(1).name.replace("circle", "");
        if (r.getChildAt(3) != undefined) {
          checkcont = r.getChildAt(3);
        } else {
          var checkcont = new createjs.Container();
          checkcont.name = "purplecircletextcont";
          //r.getChildAt(0).x = r.getChildAt(0).x;
          r.addChild(checkcont);
          stage.update();
        }
      }
      //on keypad clik
      $(".digits,.keypadsym, .keyspace").off("click").on("click", function () {
        var jumpval = $(this).attr("id");
        if (jumpval == "space") {
          jumpval = '';
        }
        //console.log(checkcont);
        for (var i = 0; i < checkcont.children.length; i++) {
          checkcont.children[i].x = checkcont.children[i].x - 8;
          stage.update();
        }
        var keytext = new createjs.Text(jumpval, "bold 24px ProximaNova", jump_color);
        //bold 27px Arial
        keytext.textBaseline = "top";
        if (checkcont.children.length > 0 && r.selected === 1) {
          //console.log("length is empty");	
          keytext.x = checkcont.children[checkcont.children.length - 1].x + r.textspace;
          //keytext.y
          if (detectBrowser == "FIREFOX") {
            keytext.y = 0;
          } else if (detectBrowser == "IE") {
            keytext.y = -3;
          } else if (detectBrowser == "CHROME") {
            keytext.y = -4;
          } else {
            keytext.y = -4;
          }
        } else {
          if (r.type == "numberjump" && r.selected === 1) {
            keytext.x = r.getChildAt(4).x + 5;
            //console.log(keytext.x+'--'+detectBrowser);
            //keytext.y
            if (detectBrowser == "FIREFOX") {
              keytext.y = 0;
            } else if (detectBrowser == "IE") {
              keytext.y = -3;
            } else if (detectBrowser == "CHROME") {
              keytext.y = -4;
            } else {
              keytext.y = -4;
            }
          } else if (r.type == "purplecircle") {
            if (zoom_check < 2) {
              lecirclex = 50 * numcnt - 4;
              keytext.y = r.getChildAt(2).y + 7;
              console.log(lecirclex);
              keytext.x = lecirclex;
            }
            if (zoom_check == 2) {
              lecirclex = 85 * numcnt - 4;
              keytext.x = lecirclex;
              keytext.y = r.getChildAt(2).y + 10;
            }
            if (zoom_check == 3) {
              lecirclex = 125 * numcnt - 4;
              keytext.x = lecirclex;
              keytext.y = r.getChildAt(2).y + 15;
            }
            stage.update();
          }
        }
        if (r.selected === 1) {
          checkcont.addChild(keytext);
          stage.update();
        }
      });
      //for back space click
      $(".keybackspace").off("click").on("click", function () {
        var jumpval = $(this).attr("id");

        if (checkcont.children.length > 0) {
          //r.textspace -= 10;
          for (i = 0; i < checkcont.children.length; i++) {
            checkcont.children[i].x = checkcont.children[i].x + 8;
          }
          checkcont.removeChildAt(checkcont.children.length - 1);
        }
        stage.update();
      });
      //on color selection
      $(".keycolor_splash").on('click', function () {
        jump_color = $(this).attr("id");
        ctitle = $(this).attr("title");
        jump_color = jump_color.replace("_d", "");
        //r.fontcolor = jump_color;
        if ($(".keycolor_splash").hasClass("calc_hover_class")) {
          $(".keycolor_splash").removeClass("calc_hover_class");
          $(this).addClass("calc_hover_class");
        } else {
          $(this).addClass("calc_hover_class");
        }
        if (r.selected === 1) {
          for (var i = 0; i < checkcont.children.length; i++) {
            checkcont.children[i].color = jump_color;
          }
          r.fontcolor = jump_color;
        }
        stage.update();
      });
    } else {
      $("#jumpKeypadSection").css("display", "none");
    }
  }
  /**
   * Function to Add the fraction format for the scroll bar
   * @param {type} string
   * @returns {String}
   */
  function buildFraction(string) {
    string = string.toString();
    var html = "";
    var start = string.indexOf("-");
    var start2 = string.indexOf("/");
    if (start > -1 && start2 > -1) {
      var split1 = string.split("-");
      var mainS = split1[0];
      var sub = split1[1].split("/");
      html = '<p class= "maintxt">' + mainS + '</p><p class="subtxt"><span class="toptxt">' + sub[0] + '</span><span class="bottomtxt">' + sub[1] + '</span></p>';
    } else {
      var str = string.indexOf("/");
      if (str > -1) {
        var sub = string.split("/");
        html = '<p class="subtxt"><span class="toptxt">' + sub[0] + '</span><span class="bottomtxt">' + sub[1] + '</span></p>';
      } else {
        html = '<p class= "maintxt">' + string + '</p>';
      }
    }
    return html;
  }
  /**
   * Function to build fraction number for fractiontype
   * @param {type} num
   * @returns {createjs.Container}
   */
  function getFraction(num) {
    var string = num.toString();
    if (selectedNumerType === 'fn') {
      var cont = new createjs.Container();
      var start = string.indexOf("-");
      if (start > -1) {
        var split1 = string.split("-");
        var m = split1[0];
        var sub = split1[1].split("/");
        var n = sub[0];
        var idea1 = sub[1];
        var num1 = new createjs.Text(m, "bold 24px ProximaNova", "#ffffff");
        num1.textAlign = "left";
        if (m < 10)
          num1.x = -10;
        else if (m >= 20 && m < 100)
          num1.x = -20;
        else
          num1.x = -15;
        num1.y = -5;
        var f1 = new createjs.Text(n, "bold 13px ProximaNova", "#ffffff");
        f1.x = 0;
        f1.y = -6;
        var f2 = new createjs.Text("-", "bold 13px ProximaNova", "#ffffff");
        f2.scaleX = 2;
        f2.x = 0;
        f2.y = 1;
        var f3 = new createjs.Text(idea1, "bold 13px ProximaNova", "#ffffff");
        f3.x = 0;
        f3.y = 11;
        var frCont = new createjs.Container();
        frCont.addChild(f1, f2, f3);
        if (m < 10)
          frCont.x = 7;
        else if (m >= 20 && m < 100)
          frCont.x = 10;
        else
          frCont.x = 9;
        cont.addChild(num1, frCont);
      } else {
        var str = string.indexOf("/");
        if (str > -1) {
          var sub = string.split("/");
          var n = sub[0];
          var idea1 = sub[1];
          var f1 = new createjs.Text(n, "bold 15px ProximaNova", "#ffffff");
          f1.x = 0;
          f1.y = -7;
          var f2 = new createjs.Text("-", "bold 15px ProximaNova", "#ffffff");
          f2.scaleX = 2;
          f2.x = 0;
          f2.y = 0;
          var f3 = new createjs.Text(idea1, "bold 15px ProximaNova", "#ffffff");
          f3.x = 0;
          f3.y = 10;
          var frCont = new createjs.Container();
          frCont.addChild(f1, f2, f3);
          cont.addChild(frCont);
        } else {
          var val = string;
          var num1 = new createjs.Text(val, "bold 24px ProximaNova", "#ffffff");
          num1.textAlign = "center";
          num1.y = num1.y - 5;
          cont.addChild(num1);
        }
      }
    }
    return cont;
  }
  //console.log(detbrowser);

  function detectBrowser() {
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;

    if (isFirefox) {
      return "FIREFOX";
    } else if (isSafari) {
      return "SAFARI";
    } else if (isIE) {
      return "IE";
    } else if (isChrome) {
      return "CHROME";
    } else if (isEdge) {
      return "EDGE";
    } else {
      return "couldnt detect";
    }
  }

  function detectOs() {
    if (navigator.appVersion.indexOf("Win") !== -1) {
      OSName = "win";
    }
    if (navigator.appVersion.indexOf("Mac") !== -1) {
      OSName = "mac";
    }
    if (navigator.appVersion.indexOf("X11") !== -1) {
      OSName = "unix";
    }
    if (navigator.appVersion.indexOf("Linux") !== -1) {
      OSName = "linux";
    }
    return OSName;
  }
  var colorfinder = false;

  /*function verticallimit(contain, sign){
   //console.log(contain);
   var shape = contain.getChildByName('base');
   var zoomspace;
   if(sign){
   shape.widthi = sign;
   }
   var containcolor = contain.color;
   //console.log(containcolor);
   
   if(zoom_check < 2 ){
   zoomspace = 50;
   }
   if(zoom_check == 2){
   zoomspace = 85;
   }
   if (zoom_check == 3) {
   zoomspace = 125;
   }
   var colorfinder = false;
   var textarraynumber = ((contain.x - 8) + shape.widthi )/ zoomspace;
   var redminval = 0;
   for (i = 0; i < jumpObjectsList.length; i++) {
   var containerelement = jumpObjectsList[i];
   var shape2 = containerelement.getChildByName('base');
   var textarraynumber2 = ((containerelement.x - 8) + shape2.widthi )/ zoomspace;
   if (containerelement.color == "blue" && textarraynumber < textarraynumber2 && colorfinder == false) {
   textarraynumber = textarraynumber2;
   }
   if(containerelement.color == "red"){
   textarraynumber = ((containerelement.x - 33)/ (zoomspace)) - (containerelement.getChildByName('textvalue').text - 1);
   console.log(textarraynumber);
   if(redminval == 0){
   redminval = textarraynumber + 0.5;	
   }else{
   if(textarraynumber > redminval){
   textarraynumber = redminval;
   console.log("redmin" + redminval);
   }
   }
   
   colorfinder = true;
   }
   if (clock.clicked == 1) {
   console.log(textarraynumber);	
   createclock(textarraynumber);
   }
   }	
   
   }*/
  function getMin(array) {
    return Math.min.apply(Math, array);
  }

  function getMax(array) {
    return Math.max.apply(Math, array);
  }

  function verticallimit_new() {
    var colorfinder = false;
    var Redarraynumber = new Array();
    var bluearraynumber = new Array();
    for (i = 0; i < jumpObjectsList.length; i++) {
      contain = jumpObjectsList[i];

      if (contain.color === 'red') {
        var right = contain.getChildByName("right");
        var left = contain.getChildByName("left");
        var point = stage.localToGlobal(right.x, right.y);

        if (left.x === 0) {
          c = contain.x - Math.abs(point.x);
        } else if (right.x < 0) {
          c = contain.x - Math.abs(point.x);
        } else if (left.x > right.x) {
          c = contain.x + Math.abs(point.x);
        }
        var result = Math.round(c / rulerSpacing);
        Redarraynumber.push(result);
        result = getMin(Redarraynumber);
        colorfinder = true;
        if (clock.clicked == 1) {
          createclock(result);
        }
      } else if (contain.color === "blue" && colorfinder == false) {
        var right = contain.getChildByName("right");
        var point = stage.localToGlobal(right.x, right.y);
        c = contain.x + Math.abs(point.x);
        var result = Math.round(c / rulerSpacing);
        bluearraynumber.push(result);
        result = getMax(bluearraynumber);
        if (clock.clicked == 1) {
          createclock(result);
        }
      }
    }

  }
});