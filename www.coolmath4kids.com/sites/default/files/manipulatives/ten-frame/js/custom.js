/*
 * Custom Js file for the Sample Animation using Easeljs
 */
/* global createjs, container, one, five, monster_one, monster_five, framecontainer  */
$ = jQuery;
$(function () {
  var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  var stage = new createjs.Stage("workspace");
  var ctx = stage.canvas.getContext("2d");
  var cm_height = stage.canvas.height;
  var cm_width = window.innerWidth;
  var key_pressed = 0;
  var click = 0;
  var clickno = 0;
  var label, shape, oldX, oldY, size, color;
  var objectArray = new Array();
  var frameArray = new Array();
  var frameArrayList = new Array();
  var frameArrayListcont = new Array();
  var objectList = new Array();
  var selectedArray = new Array();
  var objectListToFrame = new Array();
  var frameObjectArray = new Array();
  var frameArrayList2 = new Array();
  var track = [];
  var changed = 0;
  var diffLength = 1;
  var selectedtype_left = 'minions';
  var selectedtype_right = 'minions';
  var selectedcolor_left = 'blue';
  var selectedcolor_right = 'orange';
  var hightlightContainer = new createjs.Container;
  //var framecontainer = new createjs.Container;
  var objectlistcount = 0;
  var highlightArray = [];
  var objectSelected = 0;
  var frameOpened = 0;
  var counterOpened = 0;
  var deselectFrameObj = [];
  var mouseDown = 0;
  var canvasWidth = 1200;
  var mobile;
  var cm_height;
  var tfImagePath = "/sites/default/files/manipulatives/ten-frame/images/ten_frame";
  //Array and init variables for for paint functionality
  var penArray = new Array();
  var i;
  var j;
  var calcTextBorder = new createjs.Shape();
  container = new createjs.Container;
  var one = new createjs.Container;
  var five = new createjs.Container;
  var ten = new createjs.Container;
  var monster_one = new createjs.Container;
  var monster_five = new createjs.Container;
  var monster_ten = new createjs.Container;
  var frameicon = new createjs.Container;
  var wrapper = new createjs.Container();
  var frameimg = new createjs.Bitmap(tfImagePath+'/topmenu/frame.png');
  var choosecounter = new createjs.Container;
  var countericon = new createjs.Bitmap(tfImagePath+'/topmenu/counter.png');
  var cm4klink = new createjs.Bitmap(tfImagePath+'/topmenu/cm4k_link.png');
  var cm_nf_title = new createjs.Bitmap(tfImagePath+'/topmenu/title.png');
  var separatorone = new createjs.Bitmap(tfImagePath+'/topmenu/divider.png');
  var separatortwo = new createjs.Bitmap(tfImagePath+'/topmenu/divider.png');
  var separatorthree = new createjs.Bitmap(tfImagePath+'/topmenu/divider.png');
  var separatorfour = new createjs.Bitmap(tfImagePath+'/topmenu/divider.png');
  var oneicon = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-one.png');
  var fiveicon = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-five.png');
  var tenicon = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-ten.png');
  var monster = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-one.png');
  var monster_five_icon = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-five.png');
  var monster_ten_icon = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-ten.png');
  var framex = "";
  var framey = "";
  var frameCount = 0;
  stage.enableMouseOver(10);
  stage.enableDOMEvents(true);
  createjs.Touch.enable(stage);
  var canvas = document.getElementById('workspace');
  canvas.onselectstart = function () {
    return false;
  };
  //Setting dynamic width to canvas
  stage.canvas.width = window.innerWidth;
  stage.canvas.height = 1100;
  //$(".manipulatives #toolbar").height(stage.canvas.height);
    if (window.innerHeight > 1100) {
    stage.canvas.height = window.innerHeight;   
	$(".manipulatives #toolbar").height(stage.canvas.height + 65);
  }
  $(window).resize(function () {
    stage.canvas.width = window.innerWidth;
    if (window.innerHeight > 1100) {
      stage.canvas.height = window.innerHeight;
	  $(".manipulatives #toolbar").height(stage.canvas.height + 65);
    }else{
      stage.canvas.height = 1100;
    }
    cm_width = window.innerWidth;
    topMenuPosition();
    cm_height = stage.canvas.height;
    //for dragging paint tool and calculator dialog
    drag_toolbar();
	wrapper.cache(30, 90, cm_width, cm_height);
  });
    cm_height = stage.canvas.height;
  //Top menu position changes for lower resolutions
  function topMenuPosition() {
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      cm4klink.x = 27;
      cm_nf_title.x = 27;
      separatorone.x = 210;
      frameicon.x = 244;
      separatortwo.x = 360;
      one.x = 390;
      five.x = 480;
      ten.x = 580;
      separatorthree.x = 710;
      monster_one.x = 740;
      monster_five.x = 830;
      monster_ten.x = 925;
      separatorfour.x = 1050;
      choosecounter.x = 1075;
      frameicon.on("mouseover", function (evt) {
        var frameHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/button1_hover.png');
        frameimg.image = frameHoverimg.image;
        frameicon.x = 240;
        frameicon.y = 18;
      });
      frameicon.on("mouseout", function (evt) {
        if (frameOpened == 0) {
          var frameHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/frame.png');
          frameimg.image = frameHoverimg.image;
          frameicon.x = 244;
          frameicon.y = 22;
        }
      });
      one.on("mouseover", function (evt) {
        var oneHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-one_hover.png');
        oneicon.image = oneHoverimg.image;
        one.x = 390;
        one.y = 6;
      });
      one.on("mouseout", function (evt) {
        var oneHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-one.png');
        oneicon.image = oneHoverimg.image;
        one.x = 390;
        one.y = 10;
      });
      five.on("mouseover", function (evt) {
        var fiveHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-five_hover.png');
        fiveicon.image = fiveHoverimg.image;
        five.x = 480;
        five.y = 6;
      });
      five.on("mouseout", function (evt) {
        var fiveHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-five.png');
        fiveicon.image = fiveHoverimg.image;
        five.x = 480;
        five.y = 10;
      });
      ten.on("mouseover", function (evt) {
        var tenHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-ten_hover.png');
        tenicon.image = tenHoverimg.image;
        ten.x = 580;
        ten.y = 6;
      });
      ten.on("mouseout", function (evt) {
        var tenHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-ten.png');
        tenicon.image = tenHoverimg.image;
        ten.x = 580;
        ten.y = 10;
      });
      monster_one.on("mouseover", function (evt) {
        var oneHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-one_hover.png');
        monster.image = oneHoverimg.image;
        monster_one.x = 740;
        monster_one.y = 6;
      });
      monster_one.on("mouseout", function (evt) {
        var oneHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-one.png');
        monster.image = oneHoverimg.image;
        monster_one.x = 740;
        monster_one.y = 10;
      });
      monster_five.on("mouseover", function (evt) {
        var fiveHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-five_hover.png');
        monster_five_icon.image = fiveHoverimg.image;
        monster_five.x = 830;
        monster_five.y = 6;
      });
      monster_five.on("mouseout", function (evt) {
        var fiveHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-five.png');
        monster_five_icon.image = fiveHoverimg.image;
        monster_five.x = 830;
        monster_five.y = 10;
      });
      monster_ten.on("mouseover", function (evt) {
        var tenHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-ten_hover.png');
        monster_ten_icon.image = tenHoverimg.image;
        monster_ten.x = 925;
        monster_ten.y = 6;
      });
      monster_ten.on("mouseout", function (evt) {
        var tenHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-ten.png');
        monster_ten_icon.image = tenHoverimg.image;
        monster_ten.x = 925;
        monster_ten.y = 10;
      });
      choosecounter.on("mouseover", function (evt) {
        var counterHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/button2_hover.png');
        countericon.image = counterHoverimg.image;
        choosecounter.x = 1070;
        choosecounter.y = 17;
      });
      choosecounter.on("mouseout", function (evt) {
        if (counterOpened == 0) {
          var counterHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/counter.png');
          countericon.image = counterHoverimg.image;
          choosecounter.x = 1075;
          choosecounter.y = 22;
        }
      });
    } else {
      cm4klink.x = 37;
      cm_nf_title.x = 37;
      separatorone.x = 240;
      frameicon.x = 294;
      separatortwo.x = 437;
      one.x = 473;
      five.x = 564;
      ten.x = 666;
      separatorthree.x = 818;
      monster_one.x = 856;
      monster_five.x = 945;
      monster_ten.x = 1048;
      separatorfour.x = 1196;
      choosecounter.x = 1255;
      frameicon.on("mouseover", function (evt) {
        var frameHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/button1_hover.png');
        frameimg.image = frameHoverimg.image;
        frameicon.x = 290;
        frameicon.y = 18;
      });
      frameicon.on("mouseout", function (evt) {
        if (frameOpened == 0) {
          var frameHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/frame.png');
          frameimg.image = frameHoverimg.image;
          frameicon.x = 294;
          frameicon.y = 22;
        }
      });
      one.on("mouseover", function (evt) {
        var oneHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-one_hover.png');
        oneicon.image = oneHoverimg.image;
        one.x = 473;
        one.y = 6;
      });
      one.on("mouseout", function (evt) {
        var oneHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-one.png');
        oneicon.image = oneHoverimg.image;
        one.x = 473;
        one.y = 10;
      });
      five.on("mouseover", function (evt) {
        var fiveHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-five_hover.png');
        fiveicon.image = fiveHoverimg.image;
        five.x = 564;
        five.y = 6;
      });
      five.on("mouseout", function (evt) {
        var fiveHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-five.png');
        fiveicon.image = fiveHoverimg.image;
        five.x = 564;
        five.y = 10;
      });
      ten.on("mouseover", function (evt) {
        var tenHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-ten_hover.png');
        tenicon.image = tenHoverimg.image;
        ten.x = 666;
        ten.y = 6;
      });
      ten.on("mouseout", function (evt) {
        var tenHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-blue-ten.png');
        tenicon.image = tenHoverimg.image;
        ten.x = 666;
        ten.y = 10;
      });
      monster_one.on("mouseover", function (evt) {
        var oneHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-one_hover.png');
        monster.image = oneHoverimg.image;
        monster_one.x = 856;
        monster_one.y = 6;
      });
      monster_one.on("mouseout", function (evt) {
        var oneHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-one.png');
        monster.image = oneHoverimg.image;
        monster_one.x = 856;
        monster_one.y = 10;
      });
      monster_five.on("mouseover", function (evt) {
        var fiveHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-five_hover.png');
        monster_five_icon.image = fiveHoverimg.image;
        monster_five.x = 945;
        monster_five.y = 6;
      });
      monster_five.on("mouseout", function (evt) {
        var fiveHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-five.png');
        monster_five_icon.image = fiveHoverimg.image;
        monster_five.x = 945;
        monster_five.y = 10;
      });
      monster_ten.on("mouseover", function (evt) {
        var tenHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-ten_hover.png');
        monster_ten_icon.image = tenHoverimg.image;
        monster_ten.x = 1048;
        monster_ten.y = 6;
      });
      monster_ten.on("mouseout", function (evt) {
        var tenHoverimg = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-ten.png');
        monster_ten_icon.image = tenHoverimg.image;
        monster_ten.x = 1048;
        monster_ten.y = 10;
      });
      choosecounter.on("mouseover", function (evt) {
        var counterHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/button2_hover.png');
        countericon.image = counterHoverimg.image;
        choosecounter.x = 1250;
        choosecounter.y = 17;
      });
      choosecounter.on("mouseout", function (evt) {
        if (counterOpened == 0) {
          var counterHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/counter.png');
          countericon.image = counterHoverimg.image;
          choosecounter.x = 1255;
          choosecounter.y = 22;
        }
      });
    }
  }
  topMenuPosition();

  //Onload show a startup message and hide after 4 seconds
  var startUpMsgStatus = 1;
  var startUpMsg = new createjs.Bitmap(tfImagePath+"/start_here_animation.png");
  startUpMsg.x = 213;
  startUpMsg.y = 100;
  stage.addChild(startUpMsg);
  stage.update();

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
    cm4klink.y = 10;
    cm_nf_title.y = 30;
    container.addChild(cm4klink);
    container.addChild(cm_nf_title);
    cm4klink.cursor = 'pointer';
    cm4klink.on('click', function () {
      location.href = location.origin+'/manipulatives';
    });
    separatorone.y = 12;
    container.addChild(separatorone);

    frameicon.y = 22;
    frameicon.cursor = "pointer";
    frameicon.on("click", function (evt) {     
      if (startUpMsgStatus == 1) {
        startUpMsg.visible = false;
        stage.update();
        startUpMsgStatus++;
      }
      drawframe();
      deselect();
      openFrameChooser();
    });
    frameicon.addChild(frameimg);
    container.addChild(frameicon);

    separatortwo.y = 12;
    container.addChild(separatortwo);

    //Draw top one minions bitmap
    one.y = 10; 
    one.cursor = "pointer";
    one.type = "minions";
    one.color = "blue";
    one.on("pressmove", function (evt) {
      one.cursor = "pointer";
      var offset = {
        x: oneicon.x - evt.stageX,
        y: oneicon.y - evt.stageY
      };
      evt.target.x = evt.stageX + offset.x;
      evt.target.y = evt.stageY + offset.y;
      stage.update();

    });
    one.addChild(oneicon);
    container.addChild(one);

    //Draw top 5 circle bitmap

    five.y = 10;
    five.cursor = "pointer";
    five.addChild(fiveicon);
    container.addChild(five);

    var count = 0;
    five.on("pressmove", function (evt) {
      var offset = {
        x: oneicon.x - evt.stageX,
        y: oneicon.y - evt.stageY
      };
      evt.target.x = evt.stageX + offset.x;
      evt.target.y = evt.stageY + offset.y;
      stage.update();
    });

    //Draw top 10 circle bitmap

    ten.y = 10;
    ten.cursor = "pointer";
    ten.addChild(tenicon);
    container.addChild(ten);

    var count = 0;
    ten.on("pressmove", function (evt) {
      var offset = {
        x: oneicon.x - evt.stageX,
        y: oneicon.y - evt.stageY
      };
      evt.target.x = evt.stageX + offset.x;
      evt.target.y = evt.stageY + offset.y;
      stage.update();
    });
    separatorthree.y = 12;
    container.addChild(separatorthree);

    //Draw top one monsters bitmap

    monster_one.y = 10;
    monster_one.cursor = "pointer";
    monster_one.type = "minions";
    monster_one.color = "orange";

    monster_one.on("pressmove", function (evt) {
      monster_one.cursor = "pointer";
      var offset = {
        x: oneicon.x - evt.stageX,
        y: oneicon.y - evt.stageY
      };
      evt.target.x = evt.stageX + offset.x;
      evt.target.y = evt.stageY + offset.y;
      stage.update();

    });
    monster_one.addChild(monster);
    container.addChild(monster_one);

    //Draw monsters 5 bitmap
    monster_five.y = 10;
    monster_five.cursor = "pointer";
    //var monster_five_icon = new createjs.Bitmap(tfImagePath+'/counters/minions/counter-top-minions-orange-five.png');
    monster_five.addChild(monster_five_icon);
    container.addChild(monster_five);

    var count = 0;
    monster_five.on("pressmove", function (evt) {
      var offset = {
        x: oneicon.x - evt.stageX,
        y: oneicon.y - evt.stageY
      };
      evt.target.x = evt.stageX + offset.x;
      evt.target.y = evt.stageY + offset.y;
      stage.update();
    });

    //Draw monsters 10 bitmap
    monster_ten.y = 10;
    monster_ten.cursor = "pointer";
    monster_ten.addChild(monster_ten_icon);
    container.addChild(monster_ten);

    var count = 0;
    monster_ten.on("pressmove", function (evt) {
      var offset = {
        x: oneicon.x - evt.stageX,
        y: oneicon.y - evt.stageY
      };
      evt.target.x = evt.stageX + offset.x;
      evt.target.y = evt.stageY + offset.y;
      stage.update();
    });

    separatorfour.y = 12;
    container.addChild(separatorfour);

    choosecounter.y = 22;
    choosecounter.cursor = "pointer";
    choosecounter.on("click", function (evt) {
      openChooseCounter();
    });
    choosecounter.addChild(countericon);
    container.addChild(choosecounter);


    stage.addChild(container);
    stage.update();
  }
  setTopHeaderIcons();

  /**
   * remove TargetContainer
   */
  function removeTargetContainer(targetContainer) {
    stage.removeChild(targetContainer);
    stage.update();
  }

  /*clone objects on mousedown starts here*/
  var oneContainer = new createjs.Container;
  var fiveContainer = new createjs.Container;
  var tenContainer = new createjs.Container;
  var monOneContainer = new createjs.Container;
  var monFiveContainer = new createjs.Container;
  var monTenContainer = new createjs.Container;
  one.on("mousedown", function () {
    oneContainer.name = "temp";
    type = selectedtype_left;
    color = selectedcolor_left;
    var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + ".png");
    //pressmove
    one.on("pressmove", function (evt) {
	  tempicon.height = tempicon.height + 0.3;
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      tempicon.selected = 1;
      oneContainer.addChild(tempicon);
      stage.addChild(oneContainer);
    });
  });
  five.on("mousedown", function () {
    fiveContainer.name = "temp";
    type = selectedtype_left;
    color = selectedcolor_left;
    var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + "-five.png");
    //pressmove
    five.on("pressmove", function (evt) {
      tempicon.height = tempicon.height + 0.3;
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      tempicon.selected = 1;
      fiveContainer.addChild(tempicon);
      stage.addChild(fiveContainer);
    });
  });
  ten.on("mousedown", function () {
    tenContainer.name = "temp";
    type = selectedtype_left;
    color = selectedcolor_left;
    var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + "-ten.png");
    //pressmove
    ten.on("pressmove", function (evt) {
      tempicon.height = tempicon.height + 0.3;
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      tempicon.selected = 1;
      tenContainer.addChild(tempicon);
      stage.addChild(tenContainer);
    });
  });
  monster_one.on("mousedown", function () {
    monOneContainer.name = "temp";
    type = selectedtype_right;
    color = selectedcolor_right;
    var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + ".png");
    //pressmove
    monster_one.on("pressmove", function (evt) {
      tempicon.height = tempicon.height + 0.3;
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      tempicon.selected = 1;
      monOneContainer.addChild(tempicon);
      stage.addChild(monOneContainer);
    });
  });
  monster_five.on("mousedown", function () {
    monFiveContainer.name = "temp";
    type = selectedtype_right;
    color = selectedcolor_right;
    var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + "-five.png");
    //pressmove
    monster_five.on("pressmove", function (evt) {
      tempicon.height = tempicon.height + 0.3;
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      tempicon.selected = 1;
      monFiveContainer.addChild(tempicon);
      stage.addChild(monFiveContainer);
    });
  });
  monster_ten.on("mousedown", function () {
    monTenContainer.name = "temp";
    type = selectedtype_right;
    color = selectedcolor_right;
    var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + "-ten.png");
    //pressmove
    monster_ten.on("pressmove", function (evt) {
      tempicon.height = tempicon.height + 0.3;
      tempicon.x = evt.stageX;
      tempicon.y = evt.stageY;
      tempicon.regX = tempicon.image.width / 2;
      tempicon.regY = tempicon.image.height / 2;
      tempicon.selected = 1;
      monTenContainer.addChild(tempicon);
      stage.addChild(monTenContainer);
    });
  });
  /*clone objects on mousedown ends here*/

  /*clone objects on pressup starts here*/
  one.on("pressup", function (evt) {
    removeTargetContainer(oneContainer);
    if (evt.stageY > 110) {
      one.cursor = "pointer";
      while (objectListToFrame.length > 0) {
        objectListToFrame.pop();
      }
      if (changed !== 1) {
        clone(evt, this.type, this.color, 1);
      }
    }
  });
  five.on("pressup", function (evt) {
    removeTargetContainer(fiveContainer);
    while (objectListToFrame.length > 0) {
      objectListToFrame.pop();
    }
    if (evt.stageY > 110) {
      if (changed !== 1) {
        clone_multiple(evt, "minions", "blue", 5);
      }
    }
  });

  ten.on("pressup", function (evt) {
    removeTargetContainer(tenContainer);
    while (objectListToFrame.length > 0) {
      objectListToFrame.pop();
    }
    if (evt.stageY > 110) {
      if (changed !== 1) {
        clone_multiple(evt, "minions", "blue", 10);
      }
    }
  });
  monster_one.on("pressup", function (evt) {
    removeTargetContainer(monOneContainer);
    if (evt.stageY > 110) {
      one.cursor = "pointer";
      while (objectListToFrame.length > 0) {
        objectListToFrame.pop();
      }
      if (changed !== 1) {
        clone(evt, this.type, this.color, 1);
      }
    }
  });
  monster_five.on("pressup", function (evt) {
    removeTargetContainer(monFiveContainer);
    while (objectListToFrame.length > 0) {
      objectListToFrame.pop();
    }
    if (evt.stageY > 110) {
      if (changed !== 1) {
        clone_multiple(evt, "minions", "orange", 5);
      }
    }
  });

  monster_ten.on("pressup", function (evt) {
    removeTargetContainer(monTenContainer);
    while (objectListToFrame.length > 0) {
      objectListToFrame.pop();
    }
    if (evt.stageY > 110) {
      if (changed !== 1) {
        clone_multiple(evt, "minions", "orange", 10);
      }
    }
  });
  /*clone objects on pressup ends here*/


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
    clickedColor = "#3ecfe1"; 
    x = "#3ecfe1";
    if ($(".open_toolbar").hasClass("selected")) {
      $("#button_options").toggle();
      $(".open_toolbar").removeClass("selected");
      //$(".duplicate_frame_image").on("click", handleDuplicate);   // enabling  duplicte
      //$(".rotate_table_image").on("click", handleRotate);   // enabling rotateFrame
      $('.keypad').on("click", handleKeypad);
      $("#pink,#orange,#green,#blue,#gray").on("click", handleColors);
      $('.trash').on('click', handleTrash);
      $("#top_menu_overlay").css("display", "none");
      $("#toolbar").removeClass("deselected_toolbar");
      container.mouseChildren = true;
      monster_one.mouseEnabled = true;
      frameicon.mouseEnabled = true;
      one.mouseEnabled = true;
      five.mouseEnabled = true;
      ten.mouseEnabled = true;
      monster_one.mouseEnabled = true;
      monster_five.mouseEnabled = true;
      monster_ten.mouseEnabled = true;
      choosecounter.mouseEnabled = true;
      if ($(".pick_color").hasClass("hover_class")) {
        $(".pick_color").removeClass("hover_class");
      }
      /*if ($("#drawing_eraser").hasClass("eraser_image_selected")) {
        $("#drawing_eraser").removeClass("eraser_image_selected");
        $("#drawing_eraser").addClass("eraser_image");
      }*/
    }
    $("#workspace").removeClass("cursor_canvas");
    clearDrawings();
    stage.removeAllChildren();
    stage.update();
    selectedArray = [];
    objectArray = [];
    frameArrayListcont = [];
    frameArrayList = [];
    frameObjectArray = [];
    frameArrayList2 = [];
    deselectFrameObj = [];
    frameArray = [];
    objectListToFrame = [];
     
    //calculator
	  arrayOfTextArray = [];
    arrayOfTextContainer = [];
    arrayofCalcContainer = [];
    arrayOfTextClick = [];
    textarray = [];
    arrayOfTextBorder = [];
     /*
    //adding all existing array into single array
    var delarray = new Array();
    delarray.push(selectedArray);
    delarray.push(objectArray);
    delarray.push(frameArray);
    delarray.push(frameArrayListcont);
    delarray.push(frameArrayList);
    delarray.push(frameObjectArray);
    delarray.push(deselectFrameObj);
    delarray.push(objectListToFrame);
    //commmon function to clear children and array
    removeAll(stage, delarray);
    */

    setTopHeaderIcons();
    updateTrayOnCounterChooser(selectedtype_left, selectedcolor_left, selectedtype_right, selectedcolor_right);
    multiSelection();
    mouseDownAtEmpty();

  }
  /* clear-workspace script ends here  */

  createjs.Ticker.addEventListener("tick", handleTick);

  function handleTick() {
    stage.update();
  }
  //pen tool
  shape = new createjs.Shape();
  stage.addChild(shape);


  //onclick function for clicking on the color change the color of the icon/bitmap image in the canvas
  $("#pink,#orange,#green,#blue,#gray").on('click', handleColors);
  function handleColors() {
    var color = $(this).attr('id');
    var l = objectArray.length;
    var tempObjArr = [];
    for (var i = 0; i < l; i++) {
      if (typeof objectArray[i].type !== 'undefined') {
        var variations = (objectArray[i].type === 'minions') ? 9 : 5;
        var newbitmap = new createjs.Bitmap(tfImagePath+"/counters/" + objectArray[i].type + "/counter-" + objectArray[i].type + "-" + color + "_hover.png");
        var newcont = newbitmap.clone();
        newcont.x = objectArray[i].x;
        newcont.y = objectArray[i].y;
        newcont.selected = 1;
        newcont.regX = objectArray[i].regX;
        newcont.regY = objectArray[i].regY;
        newcont.cursor = "pointer";
        newcont.type = objectArray[i].type;
        newcont.color = color;
        newcont.on("pressmove", drag);
        newcont.on("click", function () {
          select(this);
          $("#toolbar").removeClass('icon_disabled');
        });
        tempObjArr.push(newcont);
        stage.removeChild(objectArray[i]);
        stage.update();
       // selectedArray.push(newcont); //push element into selectedArray after deselect
        stage.addChild(newcont);
        stage.update();
      }

    }
    if (frameObjectArray.length > 0) {
      for (var i in frameObjectArray) {
        if (typeof frameObjectArray[i].object.type !== 'undefined' && frameObjectArray[i].object.selected == 1) {
          frameName = frameObjectArray[i].frame_name;
          var frame = stage.getChildByName(frameName);
          //var variations = (frameObjectArray[i].object.type === 'minions') ? 5 : 5;
          var new_bitmap = new createjs.Bitmap(tfImagePath+"/counters/" + frameObjectArray[i].object.type + "/counter-" + frameObjectArray[i].object.type + "-" + color + "_hover.png");
          frameObjectArray[i].object.image = new_bitmap.image;
          //frameObjectArray[i].object.x = frameObjectArray[i].object.x - variations;
          // frameObjectArray[i].object.y = frameObjectArray[i].object.y - variations;
          frameObjectArray[i].object.regX = frameObjectArray[i].object.regX;
          frameObjectArray[i].object.regY = frameObjectArray[i].object.regY;
          frameObjectArray[i].object.color = color;
          frameObjectArray[i].object.selected = 1;
          frameObjectArray[i].object.colorUpdate = 1;
          frameObjectArray[i].object.removeAllEventListeners("click");
          frameObjectArray[i].object.removeAllEventListeners("pressmove");
          frameObjectArray[i].object.removeAllEventListeners("pressup");
          frameObjectArray[i].object.on("click", function () {
            if(paintOpen == false){
            this.selected = 0;
            if (key_pressed === 1) {
              selectFrameIcons(frame, this);
            } else {
              deSelectFrameIcons();
              selectFrameIcons(frame, this);

            }
          }
          });
        }
      }
    }
    // while (frameObjectArray.length > 0) {
    //  frameObjectArray.pop();
    // }
    while (objectArray.length > 0) {
      objectArray.pop();
    }
    objectArray = tempObjArr.slice(0);
    $("#toolbar").addClass('icon_disabled');
  }

  //Removing the selected child
  $('.trash').on('click', handleTrash);
  function handleTrash() {
    //delete frames
    if (frameArray.length > 0) {
      removeSelectedFrames(frameArray, frameArrayList, frameArrayListcont, stage);
    }
    //delete selected objects
    if (objectArray.length > 0) {
      removeSelectedObjects(objectArray, stage);
    }
    //delete selected Frame Icons
    var tempArry = [];
    for (var f in deselectFrameObj) {
      frame = deselectFrameObj[f];
      for (var key in frame.children) {      
        if (typeof frame.children[key].type !== 'undefined' && frame.children[key].type !== 'fivegrid' && frame.children[key].type !== 'cell' && frame.children[key].selected !== 0) {
          frame.removeChild(frame.children[key]);
          var cell = frame.getObjectUnderPoint(frame.children[key].x, frame.children[key].y, 0);
          tempArry.push(cell);            
        }          
      }
    }
    for(var key in tempArry){
      ind = frameArrayList2.indexOf(tempArry[key]);
      frameArrayList2.splice(ind,1);
    }
    stage.update();
  }

  /**
   * Function for the drag event
   * @param {type} evt
   * @returns {undefined}
   */
  function drag(evt) {
    if (paintOpen == false) {
      if (objectArray.length === 0) {
        dragIcon(evt, cm_height);
      } else {
        oldX = evt.target.x;
        oldY = evt.target.y;
        xval = objectArray[objectArray.length - 1].x;
        if (xval <= cm_width && objectArray[0].x > 75) {
          dragIcon(evt, cm_height);
          dragMultipleIcons(evt, objectArray, oldX, oldY);
        } else {
          dragIcon(evt, cm_height);
        }
      }
    }
  }

  /**
   * Function for the drag event
   * @param {type} evt
   * @returns {undefined}
   */
  /*function drag_current(evt) {
   evt.currentTarget.x = evt.stageX;
   evt.currentTarget.y = evt.stageY;
   stage.update();
   }
   */

  /**
   * Function to clone the bitmap images one at a time
   * @param {type} evt - Event handler
   * @param {type} type - Object type
   * @param {type} color - Object color
   * @param {type} count - Count to clone
   * @returns {undefined}
   */
  function clone(evt, type, color, count) {
    deselect();
    var icon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + "_hover.png");
    var imageWidth = icon.image.width;
    var imageheight = icon.image.height;
    var l = count;
    for (var i = 0; i < l; i++) {
      var boxClone = icon.clone();
      boxClone.cursor = 'pointer';
      boxClone.type = type;
      boxClone.name = type;
      boxClone.color = color;
      boxClone.selected = 1;
      boxClone.regX = boxClone.image.width / 2;
      boxClone.regY = boxClone.image.height / 2;
      boxClone.x = evt.stageX;
      boxClone.y = evt.stageY;
      objectList.push(boxClone);
      //objectArray.push(boxClone);
      objectListToFrame.push(boxClone);
      boxClone.setBounds(boxClone.x, boxClone.y, imageWidth, imageheight);
      boxClone.on("pressmove", drag);
      boxClone.on("click", function (evt) {
        $("#toolbar").removeClass('icon_disabled');
      });
      boxClone.on("pressup", function (evt) {
        frames = checkIntersection();
        if (frames)
          setIconIntoFrame(evt);
        //var operator = "-";
        //setintoFrame(boxClone,operator);
      });
      stage.addChild(boxClone);
      stage.update();
      //selectedArray.push(boxClone);
    }
    setIconIntoFrame(boxClone);
  }

  /**
   * Function to set single selected icon into frame
   * @param {type} evt
   * @param {operator} operator
   * @returns {undefined}
   */
  function setintoFrame(evt, operator) {
    var frames = checkIntersection();
    if (frames) {
      childFrame = frames.innerFrame;
      parentFrame = frames.outerFrame;
      variation = setVariation(evt);
      xValue = childFrame.x - variation;
      yValue = childFrame.y - variation;
      width = (evt.image.width === 0) ? 60 : evt.image.width;
      height = (evt.image.height === 0) ? 60 : evt.image.height;
      evt.x = xValue;
      evt.y = yValue;
      if (evt.type === 'apple') {
        variation = 3;
        evt.y = evt.y - variation;
      }
      evt.regX = childFrame.regX;
      evt.regY = childFrame.regY;
      var index = objectArray.indexOf(evt);
      objectArray.splice(index, 1);
      parentFrame.addChild(evt);
      addRotation(parentFrame, evt);
      deselectFrameObj.push(parentFrame);
      stage.update();
      //deselectOneIcon(parentFrame, evt);
      return true;
    }
    return false;
  }

  /**
   * Function to deseclect single icon in the frame
   * @param {type} frame
   * @param {type} icon
   * @returns {undefined}
   */
  /*function deselectOneIcon(frame, icon) {
   // console.log(icon);
   if (typeof icon.type !== 'undefined' && icon.selected === 1) {
   var variations = (icon.type === 'minions') ? 9 : 5;
   var newbitmap = new createjs.Bitmap(tfImagePath+"/counters/" + icon.type + "/counter-" + icon.type + "-" + icon.color + ".png");
   var newcont = newbitmap.clone();
   newcont.x = icon.x + variations;
   newcont.y = icon.y + variations;
   newcont.cursor = "pointer";
   newcont.type = icon.type;
   newcont.name = icon.name;
   newcont.color = icon.color;
   newcont.selected = 0;
   newcont.on('click', function () {
   select2(frame, this);
   });
   frame.removeChild(icon);
   stage.update();
   frame.addChild(newcont);
   stage.update();
   }
   
   }*/

  /**
   * Function to check the inter section of the object
   * @returns {custom_L7.checkIntersection.customAnonym$0}
   */
  function checkIntersection() {
    var count = 0;
    var parentframeArray = childframeArray = "";
    for (var keytop in frameArrayListcont) {
      count = count + 1;
      var child = frameArrayListcont[keytop];
      var pt = child.globalToLocal(stage.mouseX, stage.mouseY);
      if (stage.mouseInBounds && child.hitTest(pt.x, pt.y)) {
        var l = frameArrayList.length;
        for (var i = 0; i < l; i++) {
          var child1 = frameArrayList[i];
          var pt1 = child1.globalToLocal(stage.mouseX, stage.mouseY);
          if (stage.mouseInBounds && child1.hitTest(pt1.x, pt1.y)) {
            parentframeArray = child;
            childframeArray = child1;
          }
        }
        count++;
      }
    }
    if (parentframeArray !== '' && parentframeArray !== '') {
      return {outerFrame: parentframeArray, innerFrame: childframeArray};
    }

  }

  /**
   * Function to check the frame intersection with the object
   * @returns {Boolean}
   */
  function checkOuterFrameIntersection() {
    for (var keytop in frameArrayListcont) {
      var l = frameArrayListcont[keytop].getNumChildren();
      for (var i = 0; i < l; i++) {
        var child = frameArrayListcont[keytop].getChildAt(i);
        var pt = child.globalToLocal(stage.mouseX, stage.mouseY);
        if (stage.mouseInBounds && child.hitTest(pt.x, pt.y)) {
          return frameArrayListcont[keytop];

        }
      }

    }
    return false;
  }


  /**
   * Function to set icons into the frame while dragging from top header
   * @param {type} evt
   * @returns {Boolean}
   */
  function setIconIntoFrame(evt) {
    if (!checkOuterFrameIntersection()) {
      for (var key in objectListToFrame) {
        stage.removeChild(objectListToFrame[key]);
        stage.addChild(objectListToFrame[key]);
        var ind = objectArray.indexOf(objectListToFrame[key]);
        objectArray.slice(ind, 1);
        objectArray.push(objectListToFrame[key]);
      }
    } else {
      var frames = checkIntersection();
      if (frames) {
        var innerFrame = frames.innerFrame;
        var outerFrame = frames.outerFrame;
        var outerFrameChildren = outerFrame.children;
        objLength = objectListToFrame.length;
        endlength = 0;
        var cellArray = [];
        for (var f in  outerFrameChildren) {
          if (outerFrameChildren[f].type === 'cell') {
            cellArray.push(outerFrameChildren[f]);
          }
        }
        var objectListToFrame2 = [];
        var indexval = cellArray.indexOf(innerFrame);
        var indexval1 = frameArrayList.indexOf(innerFrame);
        var frameLengthTotal = frameArrayList.length;
        frameLength = frameLengthTotal - indexval;
        variation = 5;
        keystart = 0;

        for (key1 = indexval; key1 <= cellArray.length; key1++) {
          if (typeof cellArray[key1] !== "undefined" && endlength < objLength && diffLength > 0) {
            value = cellArray[key1];
            if (frameArrayList2.indexOf(value) === -1) {
              index = objectArray.indexOf(objectListToFrame[keystart]);
              objectArray.splice(index, 1);
              frameArrayList2.push(value);
              objectListToFrame[keystart].x = value.x;
              objectListToFrame[keystart].selected = 0;
              objectListToFrame[keystart].y = value.y;
              objectListToFrame[keystart].regX = value.regX;
              objectListToFrame[keystart].regY = value.regY;
              objectListToFrame[keystart].removeAllEventListeners("click");
              objectListToFrame2.push(objectListToFrame[keystart]);
              outerFrame.addChild(value, objectListToFrame[keystart]);
              //var objectframe = {"frame_name": outerFrame.name, "object": objectListToFrame[keystart]};
              //frameObjectArray.push(objectframe);
              //deSelectFrameIcons(outerFrame, objectListToFrame[keystart]);
              selectFrameIcons(outerFrame, objectListToFrame[keystart]);

              stage.update();
              endlength++;
              keystart++;
            }
          }
        }
        //diff1 = outerFrameChildren.filter(x => frameArrayList2.indexOf(x) < 0 );
        diff1 = outerFrameChildren.filter(function (x) {
          return frameArrayList2.indexOf(x) < 0;
        });
        var diff2 = [];
        for (var keys in diff1) {
          if (diff1[keys].type === 'cell') {
            value = diff1[keys];
            diff2.push(value);
          }
        }
        diffLength = diff2.length;             
        if (diffLength>0) {       
          diff2.reverse();
          for (k = indexval1 + 1; k < frameArrayList.length; k++) {
            if (endlength < objLength) {
              value = frameArrayList[k];
              if (frameArrayList2.indexOf(value) === -1 && value !== 'undefined' && diff2.indexOf(value)!==-1) {
                index = objectArray.indexOf(objectListToFrame[keystart]);
                objectArray.splice(index, 1);
                frameArrayList2.push(value);
                objectListToFrame[keystart].x = value.x;
                objectListToFrame[keystart].selected = 0;
                objectListToFrame[keystart].y = value.y;
                objectListToFrame[keystart].regX = value.regX;
                objectListToFrame[keystart].regY = value.regY;
                objectListToFrame[keystart].removeAllEventListeners("click");
                objectListToFrame2.push(objectListToFrame[keystart]);
                outerFrame.addChild(value, objectListToFrame[keystart]);
                selectFrameIcons(outerFrame, objectListToFrame[keystart]);
                stage.update();
                endlength++;
                keystart++;
              }
            }
          }
        }

        diff1 = outerFrameChildren.filter(function (x) {
          return frameArrayList2.indexOf(x) < 0;
        });
        var diff2 = [];
        for (var keys in diff1) {
          if (diff1[keys].type === 'cell') {
            value = diff1[keys];
            diff2.push(value);
          }
        }
        diffLength = diff2.length;
        diff2.reverse();
        if (endlength < objLength) {
          for (var key1 in diff2) {           
            value = diff2[key1];
            if (typeof objectListToFrame[keystart] !== 'undefined') {
              frameArrayList2.push(value);
              index = objectArray.indexOf(objectListToFrame[keystart]);
              objectArray.splice(index, 1);
              objectListToFrame[keystart].x = value.x;
              objectListToFrame[keystart].y = value.y;
              objectListToFrame[keystart].regX = value.regX;
              objectListToFrame[keystart].regY = value.regY;
              objectListToFrame[keystart].selected = 0;
              objectListToFrame[keystart].removeAllEventListeners("click");
              objectListToFrame2.push(objectListToFrame[keystart]);
              outerFrame.addChild(value, objectListToFrame[keystart]);
              // deSelectFrameIcons(outerFrame, objectListToFrame[keystart]);
              selectFrameIcons(outerFrame, objectListToFrame[keystart]);
              // var objectframe = {"frame_name": outerFrame.name, "object": objectListToFrame[keystart]};
              //frameObjectArray.push(objectframe);

              stage.update();
              endlength++;
              keystart++;
            }
          }
        }

        if (typeof outerFrame.fivegrid !== 'undefined' && outerFrame.fivegrid === 1) {
          fiveGrid(outerFrame);
        }

        deselectFrameObj.push(outerFrame);
        wid = (outerFrame.rotation === 90) ? outerFrame.height : outerFrame.width;
        var total = parseInt(wid * 28) + parseInt(outerFrame.x);

        for (key = keystart; key < objectListToFrame.length; key++) {
          total = total + 58;
          variationv = (objectListToFrame[key].type === 'minions') ? 9 : 0;
          objectListToFrame[key].x = total;
          objectListToFrame[key].y = outerFrame.y + 4;
          objectListToFrame[key].selected = 1;
          select(objectListToFrame[key]);
          //index = objectArray.indexOf(objectListToFrame[key]);
          //if(index < 0)
          objectArray.push(objectListToFrame[key]);
          stage.addChild(objectListToFrame[key]);
          stage.update();
          keystart++;

        }
        while (objectListToFrame.length > 0) {
          objectListToFrame.pop();
        }
        return true;
      }
    }
  }
  /**
   *Function to set rotation to the object
   * @param {type} frame
   * @param {type} object
   * @returns {Boolean}
   */
  function addRotation(frame, object) {
    object.rotation = -frame.rotation;
    if (frame.rotation === 90) {
      object.y = object.y + 60;
    } else if (frame.rotation === 270) {
      object.x = object.x + 60;
    } else if (frame.rotation === 180) {
      object.x = object.x + 60;
      object.y = object.y + 60;
    }
  }

  /*
   function intersect(obj1, obj2, parent) {
   var objBounds1 = obj1.getBounds().clone();
   var objBounds2 = obj2.getBounds().clone();
   var xval = parent.x + objBounds2.x;
   var yval = parent.y + objBounds2.y;
   var pt = obj1.globalToLocal(xval, yval);
   var h1 = -(objBounds1.height / 2 + objBounds2.height);
   var h2 = objBounds2.width / 2;
   var w1 = -(objBounds1.width / 2 + objBounds2.width);
   var w2 = objBounds2.width / 2;
   if (pt.x > w2 || pt.x < w1)
   return false;
   if (pt.y > h2 || pt.y < h1)
   return false;
   
   return true;
   }*/
  var clonedobj = [];

  /**
   * Function to clone the bitmap images 5/10 at a time
   * @param {type} evt - Event handler
   * @param {type} type - Object type
   * @param {type} color - Object color
   * @param {type} count - Count to clone
   * @returns {undefined}
   */
  function clone_multiple(evt, type, color, count) {
    deselect();
    var checkFrameHit = checkOuterFrameIntersection();
    var l = count;
    var width = 10;
    var height = 10;
    var padding = 45;
    var cols = 20;
    var icon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + "_hover.png");
    for (var i = 0; i < l; i++) {
      var boxClone = icon.clone();
      var xposition = evt.stageX + (width + padding) * (i % cols);
      var yposition = evt.stageY + (height + padding) * (i / cols | 0);
      if (window.innerWidth > xposition) {
        var xposition1 = evt.stageX + (width + padding) * (i % cols);
        var yposition1 = evt.stageY + (height + padding) * (i / cols | 0);
      } else {
        xposition = xposition1;
        yposition1 = yposition1 + 58;
        yposition = yposition1;
      }
      boxClone.x = evt.stageX;
      boxClone.y = yposition;
      boxClone.cursor = "pointer";
      boxClone.color = color;
      boxClone.name = type;
      boxClone.type = type;
      boxClone.index = i;
      boxClone.shadow = color;
      boxClone.selected = 1;
      boxClone.regX = boxClone.image.width / 2;
      boxClone.regY = boxClone.image.height / 2;
      boxClone.on("pressmove", drag);
      objectList.push(boxClone);
      boxClone.on("pressup", function (evt) {
        frames = checkIntersection();
        if (frames) {
          setIconIntoFrame(evt);
        }

      });
      if (typeof checkFrameHit !== 'undefined' && !checkFrameHit) {
        createjs.Tween.get(boxClone, {
          override: true
        })
                .to({
                  x: xposition - 20,
                  y: boxClone.y
                }, 600)
                .call(handleTick);
      }
      clonedobj.push(boxClone);
      objectListToFrame.push(boxClone);
      stage.update();
      //selectedArray.push(boxClone);
    }
    setIconIntoFrame(evt);
  }
  var variation = "";
  //Highlight the object based on selection
  function select(object) {
    if(paintOpen === false){
    deSelectFromSelected(object.id);// remove elements from selectedArray as they were selected
    if (object.selected !== 1) {
      stage.removeChild(object);
      stage.update();
      var icon = new createjs.Bitmap(tfImagePath+"/counters/" + object.type + "/counter-" + object.type + "-" + object.color + "_hover.png");
      variation = (object.type === 'minions') ? 9 : 5;
      var boxClone = icon.clone();
      width = (boxClone.image.width === 0) ? 60 : boxClone.image.width;
      height = (boxClone.image.height === 0) ? 60 : boxClone.image.height+0.3;
      boxClone.cursor = 'pointer';
      boxClone.type = object.type;
      boxClone.color = object.color;
      boxClone.x = object.x;
      boxClone.name = object.type;
      boxClone.y = object.y;
      boxClone.regX = width / 2;
      boxClone.regY = height / 2;
      boxClone.on("pressmove", drag);
      boxClone.selected = 1;
      boxClone.on("pressup", function (evt) {
        frames = checkIntersection();
        if (frames) {
          setIconIntoFrame(evt);
        }
      });
      if (key_pressed === 1) {
        objectArray.push(boxClone);
        objectListToFrame.push(boxClone);
      } else {
        deselect();
        objectListToFrame.push(boxClone);
        objectArray.push(boxClone);
      }
      stage.addChild(boxClone);
      stage.update();
    }
    }
  }
  //Deselect all the objects while clicking outside of the object in stage
  function mouseDownAtEmpty() {
    stage.on('stagemousedown', function (evt) {
      var mouseDownStatus = true;
      var obj = stage.getObjectsUnderPoint(evt.stageX, evt.stageY, 1);
      if (obj.length <= 0) {
        deselect();
      }
      containercalc.removeChild(calcTextBorder);
    });
  }
  mouseDownAtEmpty();

  //Function to de-select all the objects clicking on the the canvas
  function deselect() {
	    deSelectFrameIcons();
	    var l = objectArray.length;
	    for (var i = 0; i < l; i++) {
	      if (typeof objectArray[i].type !== 'undefined' && objectArray[i].selected === 1 && objectArray[i].type !== "frame") {
	        var icon = new createjs.Bitmap(tfImagePath+"/counters/" + objectArray[i].type + "/counter-" + objectArray[i].type + "-" + objectArray[i].color + ".png");
	        objectArray[i].image = icon.image;
	        objectArray[i].name = objectArray[i].type;
	        width = (objectArray[i].image.width === 0) ? 50 : objectArray[i].image.width;
	        height = (objectArray[i].image.height === 0) ? 51 : objectArray[i].image.height+0.3;
	        objectArray[i].regX = width / 2;
	        objectArray[i].regY = height / 2;
	        objectArray[i].selected = 0;
          objectArray[i].removeAllEventListeners('pressmove');      
          objectArray[i].on("mousedown", function () {            
	          select(this);
              this.on("pressmove",drag); //jumping issue in chrome very rarely
	        });
	        objectListToFrame.push(objectArray[i]);
	        objectArray[i].on("pressup", function (evt) {
	          frames = checkIntersection();
	          if (frames) {
	            setIconIntoFrame(evt);
	          }
	        });
	        stage.update();
	        selectedArray.push(objectArray[i]); //push element into selectedArray after deselect
	      }
	    }
	    while (objectArray.length > 0) {
	      objectArray.pop();
	    }
	    while (objectListToFrame.length > 0) {
	      objectListToFrame.pop();
	    }
	    for (var key in  frameArray) {
	      child = frameArray[key].getChildByName("highlight");
	      frameArray[key].removeChild(child);
	      stage.update();
	    }
	    while (highlightArray.length > 0) {
	      highlightArray.pop();
	    }
	    while (frameArray.length > 0) {
	      frameArray.pop();
	    }
	    //for removing calculator selection
	    for(i=0; i<arrayOfTextBorder.length; i++){
		      arrayOfTextBorder[i].visible = false;
		}
	    $('.trash').off("click").on('click', handleTrash);
	    stage.update();

	  }
  //Frame functionality section starts here

  //framechooser - open & close
  function closeFrameChooser() {
    $("#framechooser").slideUp("slow");
    $("#overlayDivFrame").css("display", "none");
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      var frameHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/frame.png');
      frameimg.image = frameHoverimg.image;
      frameicon.x = 244;
      frameicon.y = 22;
      frameOpened = 0;
    } else {
      var frameHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/frame.png');
      frameimg.image = frameHoverimg.image;
      frameicon.x = 294;
      frameicon.y = 22;
      frameOpened = 0;
    }
  }

  function openFrameChooser(evt) {
    $("#framechooser").slideDown("slow");
    $("#overlayDivFrame").css("display", "block");
    frameOpened = 1;
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      var frameHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/button1_hover.png');
      frameimg.image = frameHoverimg.image;
      frameicon.x = 240;
      frameicon.y = 18;
    } else {
      var frameHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/button1_hover.png');
      frameimg.image = frameHoverimg.image;
      frameicon.x = 290;
      frameicon.y = 18;
    }
  }
  $("#overlayDivFrame").on('click', function () {
    $("#framechooser").slideToggle("slow");
    $("#overlayDivFrame").css("display", "none");
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      var frameHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/frame.png');
      frameimg.image = frameHoverimg.image;
      frameicon.x = 244;
      frameicon.y = 22;
      frameOpened = 0;
    } else {
      var frameHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/frame.png');
      frameimg.image = frameHoverimg.image;
      frameicon.x = 294;
      frameicon.y = 22;
      frameOpened = 0;
    }
  });
  //Close the frame chooser
  $("#framechooser .close").on('click', function () {
    closeFrameChooser();
  });

  //framechooser - click
  $(".framechooser-frame .frame-image-wrapper").mousedown(function (evt) {
    closeFrameChooser();
    var width = parseInt($(this).attr("data-width")),
            height = parseInt($(this).attr("data-height"));
    var fivegrid = 1;
    createframe("cell", width, height, fivegrid);
  });

  // Function to draw the frame while clicking the framechooser-frame-up
  var selectedRow = 6;
  var selectedCol = 6;
  function drawframe() {
    for (var b = $('<table id="frame-creator"></table>'), c = 1; 12 >= c; c++) {
      for (var d = $("<tr></tr>"), e = 1; 12 >= e; e++) {
        if (c <= selectedRow && e <= selectedCol) {
          var f = $('<td class="active"></td>');
        } else {
          var f = $("<td></td>");
        }
        f.attr("data-y", c).attr("data-x", e), d.append(f);
      }
      b.append(d);
    }
    b.find("td").on("mouseenter mousedown touchstart touchmove", function (b) {
      var c;
      b.preventDefault(), mouseDown || "mousedown" === b.type ? (c = $(this),
              setFrameCreator(c.attr("data-x"),
                      c.attr("data-y"))) : ("touchstart" === b.type || "touchmove" === b.type) &&
              (c = $(document.elementFromPoint(b.originalEvent.changedTouches[0].pageX,
                      b.originalEvent.changedTouches[0].pageY)),
                      c.attr("data-x") && c.attr("data-y") && setFrameCreator(c.attr("data-x"),
                      c.attr("data-y")));

    });
    setFrameCreator = function (a, b) {
      var c = this;
      var symbol = '&times;';
      a = parseInt(a), b = parseInt(b), framex = a, framey = b, $("#frame-creator td").each(function () {
        var c = $(this);
        parseInt(c.attr("data-x")) <= a && parseInt(c.attr("data-y")) <= b ? c.addClass("active") : c.removeClass("active");
      }), $("#framechooser .frame-size-indicator").html(b + symbol + a + "=" + a * b);
      selectedRow = b;
      selectedCol = a;
    };
    $("#framechooser .frame-creator-wrapper").empty().append(b);
  }

  //Create the frame by clickibg use this button after selection
  $("#framechooser .frame-use-this-button").on('click', function () {
    framex = !framex ? selectedRow : framex;
    framey = !framey ? selectedCol : framey;
    var fivegrid = 0;
    createframe("cell", framex, framey, fivegrid);
    closeFrameChooser();
  });

  /**
   *  Function to create frame
   * @param {type} type
   * @param {type} width
   * @param {type} height
   * @param {type} fivegrid
   * @returns {undefined}
   */
  function createframe(type, width, height, fivegrid) {
    stage.removeChild(wrapper);
    var framecontainer = new createjs.Container;
    stage.addChild(framecontainer);
    frameCount = frameCount + 1;
    //framecontainer.x = 90;
    //framecontainer.y = 110;
    framecontainer.x = width * 29 + 200; //dynamically fixing position of a frame on workspace
    framecontainer.y = height * 29 + 100;
    framecontainer.regX = width * 29; // dynamically setting the registration point of a frame
    framecontainer.regY = height * 29;
    framecontainer.width = width;
    framecontainer.fivegrid = fivegrid;
    framecontainer.height = height;
    framecontainer.name = "frame_" + frameCount;
    framecontainer.type = "frame";
    /*framecontainer.addEventListener("pressmove", function (evt) {
     evt.currentTarget.set({
     x: evt.stageX,
     y: evt.stageY
     });
     stage.update();
     });*/
    framecontainer.rotation = 0;
    framecontainer.rotation_flag = 0;

    framecontainer.on('mousedown', function (e) {
      var posX = e.stageX;
      var posY = e.stageY;
      this.oldX = this.x;
      this.oldY = this.y;
      this.offset = {
        x: this.x - posX,
        y: this.y - posY
      };

    });
    framecontainer.on('pressmove', function (e) {
      if (paintOpen == false) {
        if (this.rotation_flag === 0) {
          if (((e.stageY + this.offset.y) > this.height * 29 + 90) && (e.stageX + this.offset.x > this.width * 29 + 70) && (e.stageX + this.offset.x< window.innerWidth-this.width * 30 - 10)) {
            var posX = e.stageX;
            var posY = e.stageY;
            this.x = posX + this.offset.x;
            this.y = posY + this.offset.y;
          }
        } else {

          if (((e.stageX + this.offset.x) > this.height * 29 + 70) && (e.stageY + this.offset.y > this.width * 29 + 90) && (e.stageX + this.offset.x< window.innerWidth - this.height * 30 - 10)) {
            var posX = e.stageX;
            var posY = e.stageY;
            this.x = posX + this.offset.x;
            this.y = posY + this.offset.y;
          }
        }
      }
    });

    var size = 60;
    // Add a border
    var border = new createjs.Shape();
    border.graphics.beginStroke("#696969");
    border.graphics.beginFill("#fff");
    border.graphics.setStrokeStyle(5);
    border.graphics.drawRect(0, 0, size * width, size * height);
    framecontainer.addChild(border);

    // Add cells
    var square = new createjs.Shape();
    square.graphics.beginStroke('#858585').beginFill("#fff");
    square.graphics.drawRect(0, 0, size, size);

    for (row = 0; row < height; row++) {
      for (col = 0; col < width; col++) {
        var cellClone = square.clone();
        cellClone.x = col * size;
        cellClone.y = row * size;
        cellClone.cursor = "pointer";
        cellClone.name = 'cell';
        cellClone.type = type;
        cellClone.index = col;
        cellClone.setBounds(cellClone.x, cellClone.y, size, size);

        frameArrayList.push(cellClone);
        framecontainer.addChild(cellClone);
      }
    }
    var n = 3, o = 3;
    var size = 60;
    var q = framecontainer.width * size, r = framecontainer.height * size;
    var y = -n - o / 2, z = y, A = o + q + 2 * n, B = o + r + 2 * n;
    var highlight = new createjs.Shape();
    highlight.name = "highlight";
    highlight.graphics.setStrokeStyle(3).beginStroke("#90e5f0").drawRect(y, z, A, B);
    highlightArray.push(highlight);
    framecontainer.addChild(highlight);
    frameArray.push(framecontainer);

    framecontainer.on("click", function (evt) {
      if (paintOpen == false) {
        if (key_pressed === 1 && !paintOpen) {
          selectFrame(this);
        } else {
          deselectFrame();
          deSelectFrameIcons();
          selectFrame(this);
        }
      }
    });
    if (fivegrid === 1) {
      fiveGrid(framecontainer);
    }
    frameArrayListcont.push(framecontainer);
    stage.update();
    stage.addChild(wrapper);
  }
  /**
   * Function to add boder to every 5 column and 2 rows
   * @param {type} framecontainer
   * @returns {undefined}
   */
  function fiveGrid(framecontainer) {
    var a = framecontainer.rotation;
    var size = 60;
    var b = framecontainer, c = new createjs.Container;
    b.fivegridOrientation = a;
    c.name = "fivegrid";
    for (var d = Math.floor((b.width - 1) / 5), e = 0; d > e; e++) {
      var f = new createjs.Shape;
      f.name = "v" + e, f.graphics.moveTo(0, -1).setStrokeStyle(3).beginStroke("#696969").lineTo(0, b.height * size + 1);
      var g = 5 * size * (e + 1);
      switch (a) {
        case 0:
        case 90:
          f.x = g;
          break;
        case 180:
        case 270:
          f.x = b.width * size - g;
      }
      c.removeChild(f);
      c.addChild(f);
    }

    for (var h = Math.floor((b.height - 1) / 2), i = 0; h > i; i++) {
      var j = new createjs.Shape;
      j.name = "h" + i, j.graphics.moveTo(-1, 0).setStrokeStyle(3).beginStroke("#696969").lineTo(b.width * size + 1, 0);
      var k = 2 * size * (i + 1);
      switch (a) {
        case 0:
        case 270:
          j.y = k;
          break;
        case 90:
        case 180:
          j.y = b.height * size - k;
      }
      c.removeChild(j);
      c.addChild(j);
    }

    b.addChild(c);
  }
  /**
   * Function to select the frame
   * @param {type} frame
   * @returns {undefined}
   */
  function selectFrame(frame) {
   if(paintOpen == false){
    var fchildren = frame.children;
    var objectselected = 0;
    for (var ch in fchildren) {
      if (typeof fchildren[ch].selected !== 'undefined' && fchildren[ch].selected === 1) {
        objectselected = 1;
      }
    }
    if (frame.children.indexOf(highlightArray[0]) === -1 && !paintOpen && objectselected === 0) {
      if(key_pressed===0){
        deselect();
      }      
      frame.on('pressmove', function (e) {
        if (paintOpen === false) {
          if (this.rotation_flag === 0) {
            if (((e.stageY + this.offset.y) > this.height * 29 + 90) && (e.stageX + this.offset.x > this.width * 29 + 70) && (e.stageX + this.offset.x< window.innerWidth-this.width * 30 - 10)) {
              var posX = e.stageX;
              var posY = e.stageY;
              this.x = posX + this.offset.x;
              this.y = posY + this.offset.y;
            }
          } else {

            if (((e.stageX + this.offset.x) > this.height * 29 + 70) && (e.stageY + this.offset.y > this.width * 29 + 90) && (e.stageX + this.offset.x< window.innerWidth-this.height * 30 - 10)) {
              var posX = e.stageX;
              var posY = e.stageY;
              this.x = posX + this.offset.x;
              this.y = posY + this.offset.y;
            }
          }
        }
      });

      var n = 3, o = 3;
      var size = 60;
      var q = frame.width * size, r = frame.height * size;
      var y = -n - o / 2, z = y, A = o + q + 2 * n, B = o + r + 2 * n;
      var highlight = new createjs.Shape();
      highlight.name = "highlight";
      highlight.graphics.setStrokeStyle(3).beginStroke("#90e5f0").drawRect(y, z, A, B);
      highlightArray.push(highlight);
      frame.addChild(highlight);
      frameArray.push(frame);
    }
   }
  }
  /**
   * function to Deselet Frame
   * @returns {undefined}
   */
  function deselectFrame() {
    if (frameArray.length > 0) {
      for (var key in  frameArray) {
        child = frameArray[key].getChildByName("highlight");
        frameArray[key].removeChild(child);
        stage.update();
      }
      while (frameArray.length > 0) {
        frameArray.pop();
      }
    }
  }

  //function for clicking on frame deselect all objected added inside
  function deSelectFrameIcons() {
    for (var f in deselectFrameObj) {
      frame = deselectFrameObj[f];
      for (var key in frame.children) {
        if (typeof frame.children[key].type !== 'undefined' && frame.children[key].type !== 'fivegrid' && frame.children[key].type !== 'cell' && frame.children[key].selected !== 0) {
          var object = frame.children[key];
          frameObjectArray.pop(object);
          //var index = objectArray.indexOf(object);
          //objectArray.splice(index, 1);
          stage.update();
          var icon = new createjs.Bitmap(tfImagePath+"/counters/" + object.type + "/counter-" + object.type + "-" + object.color + ".png");
          object.image = icon.image;
          object.cursor = 'pointer';
          object.name = object.type;
          object.shadow = object.color;
          variation = getVariation(object);
          if (object.type !== 'monsters') {
            object.regX = object.regX - 5;
            object.regY = object.regY - 5;
          }
          object.x = object.x + 0;
          object.y = object.y + 0;
          object.selected = 0;
          //deSelectRotation(frame, object);
          object.removeAllEventListeners('pressmove');
          object.on('mousedown', function (evt) {
            if (key_pressed === 1) {
              selectFrameIcons(frame, this);
            } else {
              //deSelectFrameIcons();
              deselect();
              selectFrameIcons(frame, this);
            }

          });
          //frame.addChild(boxClone);
          stage.update();
          selectedArray.push(object);
        }
      }
    }
    while (deselectFrameObj.length > 0) {
      deselectFrameObj.pop();
    }

  }
  /**
   * function to set variation
   * @param {type} boxClone
   * @returns {Number|String}
   */
  function getVariation(boxClone) {
    variation = "";
    switch (boxClone.type) {
      case "monsters":
        variation = 0;
        break;
      case "minions":
      case "circle":
      case "star":
      case "cat":
      case "bird":
      case "apple":
      case "cupcake":
        variation = 5;
        break;
      default:
    }
    return variation;
  }
  /**
   * function to set variation
   */
  function setVariation(boxClone) {
    variation = "";
    switch (boxClone.type) {
      case "monsters":
        variation = 2;
        break;
      case "star":
        variation = 1;
        break;
      case "minions":
      case "circle":
      case "cat":
      case "bird":
      case "apple":
      case "cupcake":
        variation = 0;
        break;
      default:
    }
    return variation;
  }
  /**
   * Function to select the object inside the frame
   * @param {type} frame
   * @param {type} object
   * @returns {undefined}
   */
  function selectFrameIcons(frame, object) {
    if (paintOpen === false) {
      var donepush = 0;
      if (object.selected !== 1) {
        var icon = new createjs.Bitmap(tfImagePath+"/counters/" + object.type + "/counter-" + object.type + "-" + object.color + "_hover.png");
        variationVal = (object.type === 'minions') ? 5 : 5;
        object.image = icon.image;
        object.name = object.type;
        object.regX = icon.regX;
        object.regY = icon.regY;
        variation = setVariation(object);
        if (object.type === 'monsters') {
          object.regX = icon.regX + 2;
          object.regY = icon.regY + 2;
        }
        if (object.type === 'apple') {
          object.regY = icon.regY + 2;
        }
        object.selected = 1;
        object.removeAllEventListeners("pressmove");
        object.removeAllEventListeners("pressup");
        var objectframe = {
          "frame_name": frame.name,
          "object": object
        };
        frameObjectArray.push(objectframe);
        if (frame.rotation !== object.rotation && frame.rotation !== -object.rotation) {
          addRotation(frame, object);
        }
        object.on("pressmove", function (evt) {
          frame.removeAllEventListeners("pressmove");
        if (evt.stageY > 110) {
          evt.currentTarget.x = evt.stageX;
          evt.currentTarget.y = evt.stageY;
          stage.update();
        }
          if (donepush !== 1) {
            objectframe = {
              "frame_name": frame.name,
              "object": object
            };
          object.regX = object.image.width / 2;
          object.regY = object.image.height / 2;
          object.removeAllEventListeners("mousedown");
          object.removeAllEventListeners("click");
          this.rotation = 0;
          object.selected = 1;
          frame.removeChild(this);
          deSelectFromSelected(this.id);// remove elements from selectedArray as they were selected
          // objectArray.push(this);
          frames = checkIntersection();
          if (frames) {
            ind = frameArrayList2.indexOf(frames.innerFrame);
            frameArrayList2.splice(ind, 1);
            }
          objectListToFrame.push(this);
          stage.addChild(this);
          stage.update();
            donepush = 1;
          }
          frameObjectArray.pop(objectframe);

        });
        object.on("pressup", function (evt) {
          setIconIntoFrame(evt);
        });
        object.removeAllEventListeners("click");
      object.on("mousedown", function () {
         if (key_pressed === 1) {
         selectFrameIcons(frame, this);
         } else {
         deSelectFrameIcons();
         selectFrameIcons(frame, this);
         }
      });
        stage.update();
      }
    }
  }
  //duplicate frame
  $(".duplicate_frame_image").on('click', handleDuplicate);
  function handleDuplicate() { 
    clonedFrames = cloneFrame(frameArray);
    deselectFrame();
    for (var key in clonedFrames) {
      var frameClone = clonedFrames[key];
      frameClone.on('mousedown', function (e) {
        {
          var posX = e.stageX;
          var posY = e.stageY;
          this.oldX = this.x;
          this.oldY = this.y;
          this.offset = {
            x: this.x - posX,
            y: this.y - posY
          };
        }
      });
      frameClone.on('pressmove', function (e) {
        if (paintOpen == false) {
          if (this.rotation_flag === 0) {
            if (((e.stageY + this.offset.y) > this.height * 29 + 90) && (e.stageX + this.offset.x > this.width * 29 + 70) && (e.stageX + this.offset.x< window.innerWidth-this.width * 30 - 10)) {
              var posX = e.stageX;
              var posY = e.stageY;
              this.x = posX + this.offset.x;
              this.y = posY + this.offset.y;
            }
          } else {

            if (((e.stageX + this.offset.x) > this.height * 29 + 70) && (e.stageY + this.offset.y > this.width * 29 + 90)&& (e.stageX + this.offset.x< window.innerWidth - this.height * 30 - 10)) {
              var posX = e.stageX;
              var posY = e.stageY;
              this.x = posX + this.offset.x;
              this.y = posY + this.offset.y;
            }
          }
        }
      });
      var cellArray =[];
      var objArray = [];
      for (var j in frameClone.children) {
         if(typeof frameClone.children[j].name !== 'undefined' && frameClone.children[j].name !== 'fivegrid' && frameClone.children[j].name !== null && frameClone.children[j].name !== "highlight"){
           if(frameClone.children[j].name === 'cell'){
             var cell= frameClone.children[j];
             cellArray.push(cell);
           }
           if(frameClone.children[j].name !== 'cell'){
             var obj = frameClone.children[j];
             selectedArray.push(obj);
             objArray.push(obj);
           }
           
         }
        if (typeof frameClone.children[j].name !== 'undefined' && frameClone.children[j].name === 'cell') {
          frameClone.children[j].type = 'cell';
          frameClone.children[j].cursor = "pointer";
          frameArrayList.push(frameClone.children[j]);
        }
        if (typeof frameClone.children[j].name !== 'undefined' && frameClone.children[j].name !== 'fivegrid' && frameClone.children[j].name !== 'cell' && frameClone.children[j].name !== null && frameClone.children[j].name !== "highlight") {
          frameClone.children[j].type = frameClone.children[j].name;
          frameClone.children[j].selected = 0;
          frameClone.children[j].color = frameClone.children[j].shadow;
          frameClone.children[j].removeAllEventListeners('click');
          frameClone.children[j].on('mousedown', function () {
            if(paintOpen === false){
            if (key_pressed === 1) {
              selectFrameIcons(frameClone, this);
            } else {
              deselect();
              selectFrameIcons(frameClone, this);
            }
           }
          });
        }

      }
      for(var i in cellArray){
        for(var j in objArray){
          if(cellArray[i].x === objArray[j].x && cellArray[i].y === objArray[j].y ){
             frameArrayList2.push(cellArray[i]);
          }
        }
      }

      frameArray.push(frameClone);
      //deselectFrameObj.push(frameClone);
      frameClone.on("click", function (evt) {
        if(paintOpen == false){
        if (key_pressed === 1) {
          selectFrame(this);
        } else {
          deselectFrame();
          deSelectFrameIcons();
          selectFrame(this);
        }
       }
        //deSelectFrameIcons(frameClone, objectArray);
      });
      frameClone.on("pressup", function (evt) {
        //setintoFrame(evt);
      });
      frameArrayListcont.push(frameClone);
      stage.addChild(frameClone);
      stage.update();
    }
  }

  //Rotate Frame
  //var rotation_flag; // 0 denotes 2n*90 rotation, 1 denotes (2n+1)*90 rotation
  $(".rotate_table_image").on('click', handleRotate);
  function handleRotate() {      
    rotateFrame(stage, frameArray);
  }

  /** Counter Chooser functionality starts here **/
  $(".counterchooser-frame-up").on('click', function () {
    $("#counterchooser").css("display", "block");
  });
  $("#counterchooser .close").on('click', function () {
    //$("#counterchooser").css("display", "none");
    closeChooseCounter();
  });
  function openChooseCounter() {
    //$("#counterchooser").css("display", "block");
    $("#counterchooser").slideDown("slow");
    $("#overlayDivCounter").css("display", "block");
    counterOpened = 1;
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      var counterHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/button2_hover.png');
      countericon.image = counterHoverimg.image;
      choosecounter.x = 1070;
      choosecounter.y = 17;
    } else {
      var counterHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/button2_hover.png');
      countericon.image = counterHoverimg.image;
      choosecounter.x = 1250;
      choosecounter.y = 17;
    }
  }
  function closeChooseCounter() {
    //$("#counterchooser").css("display", "none");
    $("#counterchooser").slideUp("slow");
    $("#overlayDivCounter").css("display", "none");
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      var counterHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/counter.png');
      countericon.image = counterHoverimg.image;
      counterOpened = 0;
      choosecounter.x = 1075;
      choosecounter.y = 22;
    } else {
      var counterHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/counter.png');
      countericon.image = counterHoverimg.image;
      counterOpened = 0;
      choosecounter.x = 1255;
      choosecounter.y = 22;
    }
  }
  $("#overlayDivCounter").on('click', function () {
    $("#counterchooser").slideToggle("slow");
    $("#overlayDivCounter").css("display", "none");
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      var counterHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/counter.png');
      countericon.image = counterHoverimg.image;
      counterOpened = 0;
      choosecounter.x = 1075;
      choosecounter.y = 22;
    } else {
      var counterHoverimg = new createjs.Bitmap(tfImagePath+'/topmenu/counter.png');
      countericon.image = counterHoverimg.image;
      counterOpened = 0;
      choosecounter.x = 1255;
      choosecounter.y = 22;
    }
  });
  //Update Left choose counters section icons based on color selection
  var objectTypes = ["minions", "monsters", "circle", "star", "cat", "bird", "apple", "cupcake"];
  $(".left_counters_wrapper .change_counter_color .highlight").on('click', function () {
    selectedcolor_left = $(this).attr("color");
    $(".left_counters_wrapper .counterchooser-counter .icon").each(function (index, value) {
      var url_update = tfImagePath+"/counters/" + objectTypes[index] + "/counter-" + objectTypes[index] + "-" + selectedcolor_left + ".png";
      $(this).attr('src', url_update);
      $(this).attr('color', selectedcolor_left);
    });
    $(".left_counters_wrapper .counterchooser-counter .highlight").each(function (index, value) {
      var url_update = tfImagePath+"/counters/" + objectTypes[index] + "/counter-" + objectTypes[index] + "-" + selectedcolor_left + "_hover.png";
      $(this).attr('src', url_update);
      $(this).attr('color', selectedcolor_left);
    });
    updateTrayOnCounterChooser(selectedtype_left, selectedcolor_left, selectedtype_right, selectedcolor_right);
  });
  //Update Right choose counters section icons based on color selection
  $(".right_counters_wrapper .change_counter_color .highlight").on('click', function () {
    selectedcolor_right = $(this).attr("color");
    $(".right_counters_wrapper .counterchooser-counter .icon").each(function (index, value) {
      var url_update = tfImagePath+"/counters/" + objectTypes[index] + "/counter-" + objectTypes[index] + "-" + selectedcolor_right + ".png";
      $(this).attr('src', url_update);
      $(this).attr('color', selectedcolor_right);
    });
    $(".right_counters_wrapper .counterchooser-counter .highlight").each(function (index, value) {
      var url_update = tfImagePath+"/counters/" + objectTypes[index] + "/counter-" + objectTypes[index] + "-" + selectedcolor_right + "_hover.png";
      $(this).attr('src', url_update);
      $(this).attr('color', selectedcolor_right);
    });
    updateTrayOnCounterChooser(selectedtype_left, selectedcolor_left, selectedtype_right, selectedcolor_right);
  });

  //Left Choosecounter
  $(".left_counters_wrapper .counterchooser-counter .highlight").on('click', function () {
    selectedtype_left = $(this).parents(".counterchooser-counter").attr("data-type");
    selectedcolor_left = $(this).attr("color");
    updateTrayOnCounterChooser(selectedtype_left, selectedcolor_left, selectedtype_right, selectedcolor_right);
  });

  //Right Choosecounter
  $(".right_counters_wrapper .counterchooser-counter .highlight").on('click', function () {
    selectedtype_right = $(this).parents(".counterchooser-counter").attr("data-type");
    electedcolor_right = $(this).attr("color");
    updateTrayOnCounterChooser(selectedtype_left, selectedcolor_left, selectedtype_right, selectedcolor_right);
  });


  //function for top header icon update on left choose counter selection
  function left_counterchooser_top_icon_update(type, color) {    
    if(type ==='monsters' || type ==='apple'){
      one.y = five.y = ten.y =6;     
    }else if(type ==='circle' || type ==='cat'){
      one.y = five.y = ten.y =11;  
    }else if(type ==='cupcake'){
      one.y = five.y = ten.y =9;  
    } else{
      one.y = five.y = ten.y = 10;      
    }
    var oneimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one.png");
    var fiveimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five.png");
    var tenimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten.png");
    //cursor icon
    var oneContainer = new createjs.Container;
    var fiveContainer = new createjs.Container;
    var tenContainer = new createjs.Container;
    //One icon update
    one.removeAllChildren();

    one.removeAllEventListeners();
    //cursor icon
    one.on("mousedown", function () {
      oneContainer.name = "temp";
      type = selectedtype_left;
      color = selectedcolor_left;
      var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + ".png");
      //pressmove
      one.on("pressmove", function (evt) {
        tempicon.x = evt.stageX;
        tempicon.y = evt.stageY;
        tempicon.regX = tempicon.image.width / 2;
        tempicon.regY = tempicon.image.height / 2;
        tempicon.selected = 1;
        oneContainer.addChild(tempicon);
        stage.addChild(oneContainer);
      });
    });
    one.on("pressup", function (evt) {
      removeTargetContainer(oneContainer);
      one.cursor = "pointer";
      count = 1;
      while (objectListToFrame.length > 0) {
        objectListToFrame.pop();
      }
      if (evt.stageY > 110) {
        clone(evt, selectedtype_left, color, count);
      }
    });
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      if (type == "monsters") {
        console.log("monsters");
        one.on("mouseover", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one_hover.png");
          oneimg.image = oneHoverimg.image;
          one.x = 390;
          one.y = 7;
        });
        one.on("mouseout", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one.png");
          oneimg.image = oneHoverimg.image;
          one.x = 390;
          one.y = 10;
        });
      } else {
        one.on("mouseover", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one_hover.png");
          oneimg.image = oneHoverimg.image;
          one.x = 390;
          one.y = 6;
        });
        one.on("mouseout", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one.png");
          oneimg.image = oneHoverimg.image;
          one.x = 390;
          one.y = 10;
        });
      }
    } else {
      if (type == "monsters") {
        one.on("mouseover", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one_hover.png");
          oneimg.image = oneHoverimg.image;
          one.x = 473;
          one.y = 7;
        });
        one.on("mouseout", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one.png");
          oneimg.image = oneHoverimg.image;
          one.x = 473;
          one.y = 10;
        });
      } else {
        one.on("mouseover", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one_hover.png");
          oneimg.image = oneHoverimg.image;
          one.x = 473;
          one.y = 6;
        });
        one.on("mouseout", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one.png");
          oneimg.image = oneHoverimg.image;
          one.x = 473;
          one.y = 10;
        });
      }
    }
    one.addChild(oneimg);

    //Five icon update
    five.removeAllChildren();
    five.removeAllEventListeners();
    //cursor icon
    five.on("mousedown", function () {
      fiveContainer.name = "temp";
      type = selectedtype_left;
      color = selectedcolor_left;
      var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + "-five.png");
      //pressmove
      five.on("pressmove", function (evt) {
        tempicon.x = evt.stageX;
        tempicon.y = evt.stageY;
        tempicon.regX = tempicon.image.width / 2;
        tempicon.regY = tempicon.image.height / 2;
        tempicon.selected = 1;
        fiveContainer.addChild(tempicon);
        stage.addChild(fiveContainer);
      });
    });
    five.on("pressup", function (evt) {
      removeTargetContainer(fiveContainer);
      one.cursor = "pointer";
      count = 5;
      while (objectListToFrame.length > 0) {
        objectListToFrame.pop();
      }
      if (evt.stageY > 110) {
        clone_multiple(evt, selectedtype_left, color, count);
      }
      // setIconIntoFrame(evt);
    });
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      if (type == "apple" || type == "bird") {
        console.log("apple");
        five.on("mouseover", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five_hover.png");
          fiveimg.image = fiveHoverimg.image;
          five.x = 480;
          five.y = 5;
          console.log(five.y);
        });
        five.on("mouseout", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five.png");
          fiveimg.image = fiveHoverimg.image;
          five.x = 480;
          five.y = 10;
        });
      } else {
        five.on("mouseover", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five_hover.png");
          fiveimg.image = fiveHoverimg.image;
          five.x = 480;
          five.y = 6;
        });
        five.on("mouseout", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five.png");
          fiveimg.image = fiveHoverimg.image;
          five.x = 480;
          five.y = 10;
        });
      }
    } else {
      if (type == "apple" || type == "bird") {
        console.log("apple");
        five.on("mouseover", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five_hover.png");
          fiveimg.image = fiveHoverimg.image;
          five.x = 564;
          five.y = 5;
          console.log(five.y);
        });
        five.on("mouseout", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five.png");
          fiveimg.image = fiveHoverimg.image;
          five.x = 564;
          five.y = 10;
        });
      } else {
        five.on("mouseover", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five_hover.png");
          fiveimg.image = fiveHoverimg.image;
          five.x = 564;
          five.y = 6;
        });
        five.on("mouseout", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five.png");
          fiveimg.image = fiveHoverimg.image;
          five.x = 564;
          five.y = 10;
        });
      }
    }
    five.addChild(fiveimg);

    //Ten icon update
    ten.removeAllChildren();
    ten.removeAllEventListeners();
    //cursor icon
    ten.on("mousedown", function () {
      tenContainer.name = "temp";
      type = selectedtype_left;
      color = selectedcolor_left;
      var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + "-ten.png");
      //pressmove
      ten.on("pressmove", function (evt) {
        tempicon.x = evt.stageX;
        tempicon.y = evt.stageY;
        tempicon.regX = tempicon.image.width / 2;
        tempicon.regY = tempicon.image.height / 2;
        tempicon.selected = 1;
        tenContainer.addChild(tempicon);
        stage.addChild(tenContainer);
      });
    });
    ten.on("pressup", function (evt) {
      removeTargetContainer(tenContainer);
      ten.cursor = "pointer";
      count = 10;
      while (objectListToFrame.length > 0) {
        objectListToFrame.pop();
      }
      if (evt.stageY > 110) {
        clone_multiple(evt, selectedtype_left, color, count);
      }
      // setIconIntoFrame(evt);
    });
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      if (type == "apple" || type == "bird") {
        console.log("apple");
        ten.on("mouseover", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten_hover.png");
          tenimg.image = tenHoverimg.image;
          ten.x = 580;
          ten.y = 5;
        });
        ten.on("mouseout", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten.png");
          tenimg.image = tenHoverimg.image;
          ten.x = 580;
          ten.y = 10;
        });
      } else {
        ten.on("mouseover", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten_hover.png");
          tenimg.image = tenHoverimg.image;
          ten.x = 580;
          ten.y = 6;
        });
        ten.on("mouseout", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten.png");
          tenimg.image = tenHoverimg.image;
          ten.x = 580;
          ten.y = 10;
        });
      }
    } else {
      if (type == "apple" || type == "bird") {
        console.log("apple");
        ten.on("mouseover", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten_hover.png");
          tenimg.image = tenHoverimg.image;
          ten.x = 666;
          ten.y = 5;
        });
        ten.on("mouseout", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten.png");
          tenimg.image = tenHoverimg.image;
          ten.x = 666;
          ten.y = 10;
        });
      } else {
        ten.on("mouseover", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten_hover.png");
          tenimg.image = tenHoverimg.image;
          ten.x = 666;
          ten.y = 6;
        });
        ten.on("mouseout", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten.png");
          tenimg.image = tenHoverimg.image;
          ten.x = 666;
          ten.y = 10;
        });
      }
    }
    ten.addChild(tenimg);

    stage.update();
    changed = 1;
  }

  //function for top header icon update on right choose counter selection
  function right_counterchooser_top_icon_update(type, color) {
    if(type ==='monsters' || type ==='apple'){
      monster_one.y = monster_five.y = monster_ten.y =6;     
    }else if(type ==='circle' || type ==='cat'){
      monster_one.y = monster_five.y = monster_ten.y =11;  
    }else if(type ==='cupcake'){
      monster_one.y = monster_five.y = monster_ten.y =9;  
    } else{
      monster_one.y = monster_five.y = monster_ten.y = 10;      
    }
    var oneimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one.png");
    var fiveimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five.png");
    var tenimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten.png");
    //cursor icon
    var monOneContainer = new createjs.Container;
    var monFiveContainer = new createjs.Container;
    var monTenContainer = new createjs.Container;
    //One icon update
    monster_one.removeAllChildren();
    monster_one.removeAllEventListeners();
    //cursor icon
    monster_one.on("mousedown", function () {
      monOneContainer.name = "temp";
      type = selectedtype_right;
      color = selectedcolor_right;
      var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + ".png");
      //pressmove
      monster_one.on("pressmove", function (evt) {
        tempicon.x = evt.stageX;
        tempicon.y = evt.stageY;
        tempicon.regX = tempicon.image.width / 2;
        tempicon.regY = tempicon.image.height / 2;
        tempicon.selected = 1;
        monOneContainer.addChild(tempicon);
        stage.addChild(monOneContainer);
      });
    });
    monster_one.on("pressup", function (evt) {
      removeTargetContainer(monOneContainer);
      monster_one.cursor = "pointer";
      count = 1;
      while (objectListToFrame.length > 0) {
        objectListToFrame.pop();
      }
      if (evt.stageY > 110) {
        clone(evt, selectedtype_right, color, count);
      }
    });
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      if (type == "monsters") {
        console.log("monsters");
        monster_one.on("mouseover", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one_hover.png");
          oneimg.image = oneHoverimg.image;
          monster_one.x = 740;
          monster_one.y = 7;
        });
        monster_one.on("mouseout", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one.png");
          oneimg.image = oneHoverimg.image;
          monster_one.x = 740;
          monster_one.y = 10;
        });
      } else {
        monster_one.on("mouseover", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one_hover.png");
          oneimg.image = oneHoverimg.image;
          monster_one.x = 740;
          monster_one.y = 6;
        });
        monster_one.on("mouseout", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one.png");
          oneimg.image = oneHoverimg.image;
          monster_one.x = 740;
          monster_one.y = 10;
        });
      }
    } else {
      if (type == "monsters") {
        console.log("monsters");
        monster_one.on("mouseover", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one_hover.png");
          oneimg.image = oneHoverimg.image;
          monster_one.x = 856;
          monster_one.y = 7;
        });
        monster_one.on("mouseout", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one.png");
          oneimg.image = oneHoverimg.image;
          monster_one.x = 856;
          monster_one.y = 10;
        });
      } else {
        monster_one.on("mouseover", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one_hover.png");
          oneimg.image = oneHoverimg.image;
          monster_one.x = 856;
          monster_one.y = 6;
        });
        monster_one.on("mouseout", function (evt) {
          var oneHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-one.png");
          oneimg.image = oneHoverimg.image;
          monster_one.x = 856;
          monster_one.y = 10;
        });
      }
    }
    monster_one.addChild(oneimg);
    //Five icon update
    monster_five.removeAllChildren();
    monster_five.removeAllEventListeners();
    //cursor icon
    monster_five.on("mousedown", function () {
      monFiveContainer.name = "temp";
      type = selectedtype_right;
      color = selectedcolor_right;
      var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + "-five.png");
      //pressmove
      monster_five.on("pressmove", function (evt) {
        tempicon.x = evt.stageX;
        tempicon.y = evt.stageY;
        tempicon.regX = tempicon.image.width / 2;
        tempicon.regY = tempicon.image.height / 2;
        tempicon.selected = 1;
        monFiveContainer.addChild(tempicon);
        stage.addChild(monFiveContainer);
      });
    });
    monster_five.on("pressup", function (evt) {
      removeTargetContainer(monFiveContainer);
      monster_five.cursor = "pointer";
      count = 5;
      while (objectListToFrame.length > 0) {
        objectListToFrame.pop();
      }
      if (evt.stageY > 110) {
        clone_multiple(evt, selectedtype_right, color, count);
      }
      //setIconIntoFrame(evt);
    });
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      if (type == "apple" || type == "bird") {
        console.log("apple");
        monster_five.on("mouseover", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five_hover.png");
          fiveimg.image = fiveHoverimg.image;
          monster_five.x = 830;
          monster_five.y = 5;
        });
        monster_five.on("mouseout", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five.png");
          fiveimg.image = fiveHoverimg.image;
          monster_five.x = 830;
          monster_five.y = 10;
        });
      } else {
        monster_five.on("mouseover", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five_hover.png");
          fiveimg.image = fiveHoverimg.image;
          monster_five.x = 830;
          monster_five.y = 6;
        });
        monster_five.on("mouseout", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five.png");
          fiveimg.image = fiveHoverimg.image;
          monster_five.x = 830;
          monster_five.y = 10;
        });
      }
    } else {
      if (type == "apple" || type == "bird") {
        console.log("apple");
        monster_five.on("mouseover", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five_hover.png");
          fiveimg.image = fiveHoverimg.image;
          monster_five.x = 945;
          monster_five.y = 5;
        });
        monster_five.on("mouseout", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five.png");
          fiveimg.image = fiveHoverimg.image;
          monster_five.x = 945;
          monster_five.y = 10;
        });
      } else {
        monster_five.on("mouseover", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five_hover.png");
          fiveimg.image = fiveHoverimg.image;
          monster_five.x = 945;
          monster_five.y = 6;
        });
        monster_five.on("mouseout", function (evt) {
          var fiveHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-five.png");
          fiveimg.image = fiveHoverimg.image;
          monster_five.x = 945;
          monster_five.y = 10;
        });
      }
    }
    monster_five.addChild(fiveimg);

    //Ten icon update
    monster_ten.removeAllChildren();
    monster_ten.removeAllEventListeners();
    //cursor icon
    monster_ten.on("mousedown", function () {
      monTenContainer.name = "temp";
      type = selectedtype_right;
      color = selectedcolor_right;
      var tempicon = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-" + type + "-" + color + "-ten.png");
      //pressmove
      monster_ten.on("pressmove", function (evt) {
        tempicon.x = evt.stageX;
        tempicon.y = evt.stageY;
        tempicon.regX = tempicon.image.width / 2;
        tempicon.regY = tempicon.image.height / 2;
        tempicon.selected = 1;
        monTenContainer.addChild(tempicon);
        stage.addChild(monTenContainer);
      });
    });
    monster_ten.on("pressup", function (evt) {
      removeTargetContainer(monTenContainer);
      monster_ten.cursor = "pointer";
      count = 10;
      while (objectListToFrame.length > 0) {
        objectListToFrame.pop();
      }
      if (evt.stageY > 110) {
        clone_multiple(evt, selectedtype_right, color, count);
      }
      //setIconIntoFrame(evt);
    });
    if ((screen.width > 1024) && (screen.width <= 1300)) {
      if (type == "apple" || type == "bird") {
        console.log("apple");
        monster_ten.on("mouseover", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten_hover.png");
          tenimg.image = tenHoverimg.image;
          monster_ten.x = 925;
          monster_ten.y = 5;
        });
        monster_ten.on("mouseout", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten.png");
          tenimg.image = tenHoverimg.image;
          monster_ten.x = 925;
          monster_ten.y = 10;
        });
      } else {
        monster_ten.on("mouseover", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten_hover.png");
          tenimg.image = tenHoverimg.image;
          monster_ten.x = 925;
          monster_ten.y = 6;
        });
        monster_ten.on("mouseout", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten.png");
          tenimg.image = tenHoverimg.image;
          monster_ten.x = 925;
          monster_ten.y = 10;
        });
      }
    } else {
      if (type == "apple" || type == "bird") {
        console.log("apple");
        monster_ten.on("mouseover", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten_hover.png");
          tenimg.image = tenHoverimg.image;
          monster_ten.x = 1048;
          monster_ten.y = 5;
        });
        monster_ten.on("mouseout", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten.png");
          tenimg.image = tenHoverimg.image;
          monster_ten.x = 1048;
          monster_ten.y = 10;
        });
      } else {
        monster_ten.on("mouseover", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten_hover.png");
          tenimg.image = tenHoverimg.image;
          monster_ten.x = 1048;
          monster_ten.y = 6;
        });
        monster_ten.on("mouseout", function (evt) {
          var tenHoverimg = new createjs.Bitmap(tfImagePath+"/counters/" + type + "/counter-top-" + type + "-" + color + "-ten.png");
          tenimg.image = tenHoverimg.image;
          monster_ten.x = 1048;
          monster_ten.y = 10;
        });
      }
    }
    monster_ten.addChild(tenimg);
    stage.update();
    changed = 1;
  }

  //Update left and right choose-counter sections on icon select and color selection
  function updateTrayOnCounterChooser(selectedtype_left, selectedcolor_left, selectedtype_right, selectedcolor_right) {
    //alert(selectedtype_left+'='+selectedcolor_left+'='+selectedtype_right+'='+selectedcolor_right);
    left_counterchooser_top_icon_update(selectedtype_left, selectedcolor_left);
    right_counterchooser_top_icon_update(selectedtype_right, selectedcolor_right);
  }
  /** Counter Chooser functionality ends here **/

  //Pen Tool
  /*
   * Pen Tool code begin
   * Functions below for canvas drawings
   */
  var flag = false;
  //color of line
  var x = "#3ecfe1";

  //var size = 6;
  //eraser color
  var y = "#000001";
  //shape creation for all lines graphics
  //shape = new createjs.Shape();
  eraser = new createjs.Shape();
  stage.addChild(shape);

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
  
  $(".open_toolbar").on('click', function () {
      /* remove overlay class to left-toolbar */
    if ($(".disable-left-tray").length) {
     // $("#toolbar").unwrap();
    }

    jQuery("#button_options").toggle();

    if ($("#drawing_pen").hasClass("pen_image_selected"))
    {console.log("handleopen from open toolbar"+ " p is "+ p);
	      handleOpenPen();
    }

	if( $("#drawing_eraser").hasClass("eraser_image_selected") )
	{
		handleOpenEraser();
	}

    if (jQuery(".open_toolbar").hasClass("selected")) {
      $("#workspace").removeClass("cursor_canvas");
     
	 jQuery(".open_toolbar").removeClass("selected");
	  $("#top_menu_overlay").css("display","none");
	  $("#toolbar").removeClass("deselected_toolbar");
     
      $("#color_picker").addClass("hiddentab");
      $(".colorpane").hide();
      multiSelection();
      mouseDownAtEmpty();
	  p=0;

    } else {
      jQuery(".open_toolbar").addClass("selected");
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
    if( $("#drawing_pen").hasClass("pen_image_selected") ) {
		handleOpenPen();
	 }
	 if( $("#drawing_eraser").hasClass("eraser_image_selected") )
		{
			handleOpenEraser();
		}
	p=0;
	  $(".pick_color").removeClass("hover_class");
      
    for (var count = 2; count > 0; count--) {
      wrapper.uncache();
      wrapper.cache(30, 90, cm_width, cm_height);
      stage.addChild(wrapper);
      var u = 0;
      while (penArray.length > 0) {
        //console.log(penArray.length);
        console.log(u);
        var x = penArray.slice().reverse()[u].visible;
        console.log(x);
        if (x == true && u <= penArray.length) {
          console.log("pen array length" + penArray.length);
          penArray.slice().reverse()[u].visible = false;
          console.log("in false loop " + u);
          stage.update();
          //break;
        }
        penArray.pop();
        stage.update();
      }
    }
    removeEventLiserners(stage);
    //stage.update();
    //console.log(stage);
    $('#clean-line-message').dialog('close');
    multiSelection();
    mouseDownAtEmpty();
  }

 var p;

//pick color from id for paint
  $(".pick_color").on('click', handlePickColor);
  function handlePickColor() {
    if (!$("#drawing_pen").hasClass("pen_image_selected")) {
      handleOpenPen();
    }
    //if (p == 1){
    x = $(this).attr("id");
    x = x.replace("_c", "");
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
  var  clickedColor;
  //open pen smooth line
  $(".openpen").on('click', handleOpenPen);
  function  handleOpenPen() {
  console.log("handle open pen");
    /* add/remove class to left-toolbar for overlay */

    if ($(".disable-left-tray").length) {
      $("#toolbar").unwrap();
    } else {
      $("#toolbar").wrap("<div class='disable-left-tray'></div>");
    }
    if ($("#drawing_pen").hasClass("pen_image")) {
	  $("#drawing_pen").removeClass("pen_image");
	  $("#drawing_pen").addClass("pen_image_selected");
	  $("#top_menu_overlay").css("display","block");
	  $("#toolbar").addClass("deselected_toolbar");
	  p=1;
	  paint(p);
	  var hoverChecker = $(".pick_color").hasClass("hover_class");
	  console.log("handle open pen" + $(".pick_color").hasClass("hover_class"));
	  /* add/remove class to left-toolbar for overlay */
	  //x = "#3ecfe1";
		var colorChecker = "#3ecfe1";
		if (hoverChecker === false &&  x === colorChecker) {
			console.log("abc"+"x ix "+x);
			//$(".color_blue").addClass("hover_class");
		   $(".color_blue").addClass("hover_class");
		}else{
		  console.log("inside else part");
		  if(typeof clickedColor == 'undefined'){
		    $(".color_blue").addClass("hover_class"); 
		  }else{
		    $(clickedColor).addClass("hover_class");	 
		  }
		}

      //Disabling all other functionalities when pen selected
      paintOpen = true;
      deselectFrame();
      deselect();
      deSelectFrameIcons();
      stage.addChild(wrapper); //Add wrapper for paint
      $(".duplicate_frame_image").off('click');
      $(".rotate_table_image").off("click");   // disabling rotateFrame
      $('.keypad').off("click");
      $("#pink,#orange,#green,#blue,#gray").off("click");
      $('.trash').off('click');
      container.mouseChildren = false;
      monster_one.mouseEnabled = false;
      frameicon.mouseEnabled = false;
      one.mouseEnabled = false;
      five.mouseEnabled = false;
      ten.mouseEnabled = false;
      monster_one.mouseEnabled = false;
      monster_five.mouseEnabled = false;
      monster_ten.mouseEnabled = false;
      choosecounter.mouseEnabled = false;
    } else if ($("#drawing_pen").hasClass("pen_image_selected")) {
      $("#drawing_pen").removeClass("pen_image_selected");
      $("#drawing_pen").addClass("pen_image");
	  $("#top_menu_overlay").css("display","none");
	  $("#toolbar").removeClass("deselected_toolbar");
      $(".pick_color").removeClass("hover_class");
 //clickedColor = $(".pick_color").attr("id");
 
      //Enabling back all functionalities when pen de-selected
      paintOpen = false;
      removeEventLiserners(stage);
      $(".duplicate_frame_image").on("click", handleDuplicate);   // enabling  duplicte
      $(".rotate_table_image").on("click", handleRotate);   // enabling rotateFrame
      $('.keypad').on("click", handleKeypad);
      $("#pink,#orange,#green,#blue,#gray").on("click", handleColors);
      $('.trash').on('click', handleTrash);
      $("#workspace").addClass("cursor_canvas");
      container.mouseChildren = true;
      monster_one.mouseEnabled = true;
      frameicon.mouseEnabled = true;
      one.mouseEnabled = true;
      five.mouseEnabled = true;
      ten.mouseEnabled = true;
      monster_one.mouseEnabled = true;
      monster_five.mouseEnabled = true;
      monster_ten.mouseEnabled = true;
      choosecounter.mouseEnabled = true;
      multiSelection();
      mouseDownAtEmpty();
      $("#workspace").removeClass("cursor_canvas");

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
      deselectFrame();
      deselect();
      deSelectFrameIcons();
      stage.addChild(wrapper); //Add wrapper for paint
      $(".duplicate_frame_image").off('click');
      $(".rotate_table_image").off("click");   // disabling rotateFrame
      $('.keypad').off("click");
      $("#pink,#orange,#green,#blue,#gray").off("click");
      $('.trash').off('click');
      container.mouseChildren = false;
      monster_one.mouseEnabled = false;
      frameicon.mouseEnabled = false;
      one.mouseEnabled = false;
      five.mouseEnabled = false;
      ten.mouseEnabled = false;
      monster_one.mouseEnabled = false;
      monster_five.mouseEnabled = false;
      monster_ten.mouseEnabled = false;
      choosecounter.mouseEnabled = false;
    } else if ($("#drawing_eraser").hasClass("eraser_image_selected")) {
      $("#drawing_eraser").removeClass("eraser_image_selected");
      $("#drawing_eraser").addClass("eraser_image");

      //Enabling back all functionalities when pen de-selected
      paintOpen = false;
      removeEventLiserners(stage);
      $(".duplicate_frame_image").on("click", handleDuplicate);   // enabling  duplicte
      $(".rotate_table_image").on("click", handleRotate);   // enabling rotateFrame
      $('.keypad').on("click", handleKeypad);
      $("#pink,#orange,#green,#blue,#gray").on("click", handleColors);
      $('.trash').on('click', handleTrash);
      $("#workspace").addClass("cursor_canvas");
      container.mouseChildren = true;
      monster_one.mouseEnabled = true;
      frameicon.mouseEnabled = true;
      one.mouseEnabled = true;
      five.mouseEnabled = true;
      ten.mouseEnabled = true;
      monster_one.mouseEnabled = true;
      monster_five.mouseEnabled = true;
      monster_ten.mouseEnabled = true;
      choosecounter.mouseEnabled = true;
      multiSelection();
      mouseDownAtEmpty();
      $("#workspace").removeClass("cursor_canvas");
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
    console.log("in paint:" + p + "x is" + x);
    $("#workspace").addClass("cursor_canvas");
    removeEventLiserners(stage);
    // add handler for stage mouse events:
    Drawfunc(stage, x, flag, shape, penArray, i, j, color, wrapper, p);
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

  //open pen straight line
  $(".openpenstraight").on('click', function (evt) {
    $("#workspace").addClass("cursor_canvas");
    //console.log("straight pen");
    // add handler for stage mouse events
    stage.on("stagemousedown", function (event) {
      color = x;
      //size = 10;
      flag = true;
      if (flag) {
        shape.graphics.beginStroke(color)
                .setStrokeStyle(size, "round")
                .moveTo(event.stageX, event.stageY);
        stage.update();
      }
    });
    stage.on("stagemouseup", function (event) {
      shape.graphics.lineTo(event.stageX, event.stageY);
      shape.graphics.endStroke();
      stage.update();
    });
    stage.update();
  });



  //undo paint work
  $(".undo").click(function () {
    //console.log('undo clicked');
    //console.log(penArray);
    for (var m = 0; m <= penArray.length; m++) {
      //console.log("index " + penArray.length);
      var x = penArray[m].visible;
      if (x == true && i <= penArray.length) {
        i = Math.abs(i);
        //console.log("i : " + i);
        penArray.slice().reverse()[i].visible = false;
        //console.log("in false loop " + i);
        stage.update();
        break;
      } else {
        //console.log("else");
      }
    }
    i = i + 1;
    // console.log("afer the looop : " + i);
    stage.update();
  });

  //undo paint work
  $(".redo").click(function () {
    for (var m = 0; m <= penArray.length; m++) {
      //console.log("index " + penArray.length);
      var x = penArray[m].visible;
      //console.log(penArray.length);
      if (x == false && j <= penArray.length) {
        //j = Math.abs(j);
        //console.log("j : " + j);
        penArray.slice().reverse()[j].visible = true;
        //console.log("in true loop " + j);
        stage.update();
        break;
      } else {
        //console.log("else");
      }
    }
    j = j + 1;
    console.log("afer the looop : " + j);
    stage.update();
  });

//pick color from id
  var k;
  k = "#818181";
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
  function textContainerBorder(containercalc){
    //deselect();
    var calcTextBorder = new createjs.Shape();
	calcTextBorder.graphics.beginStroke("#a5e5fe");
	calcTextBorder.graphics.setStrokeStyle(4);
	calcTextBorder.graphics.drawRoundRect(2, 100, 230, 80, 14);
	containercalc.addChild(calcTextBorder);
	arrayOfTextBorder.push(calcTextBorder);
	stage.update();
  }
  
  var calcStatus = false;
  $('.keypad').off('click', handleKeypad).on('click', function(){
	if(!calcStatus){
	  handleKeypad();  
	}
  });
  function handleKeypad() {
	//remove and add border
	//containercalc.removeChild(calcTextBorder);
	  deselect();
    console.log("in keykpad");
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
	arrayOfTextBorder[keytext].visible = true;
    if (calcontainername == 0) {
	
      arrayOfTextContainer[keytext].graphics.beginFill("rgba(200,200,200,0.4)").drawRoundRect(2, 100, 230, 80, 13), arrayOfTextContainer[keytext].name = "fil" + calcontainername, arrayOfTextContainer[keytext].cursor = "pointer";
      arrayofCalcContainer[keytext].x = 560, arrayofCalcContainer[keytext].y = 30;
      arrayofCalcContainer[keytext].name = "fil" + calcontainername;
      arrayofCalcContainer[keytext].cursor = "pointer";
      arrayofCalcContainer[keytext].addChild(arrayOfTextContainer[keytext]);
      arrayOfTextContainer[keytext].scaleX = arrayOfTextBorder[keytext].scaleX = 1;
      stage.addChild(arrayofCalcContainer[keytext]);
      k = "#818181";
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
            console.log("if loop k" + k);
          } else {
            k = arrayOfTextArray[key].color;
            color_finder(arrayOfTextArray[key].color);
            console.log("else loop k " + k);
          }
        } else {
          k = "#818181";
          $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
        }
        if (arrayOfTextArray[key].color) {
          k = arrayOfTextArray[key].color;
          console.log("color" + k);
          //console.log("title"+arrayOfTextArray[key].title);
          color_finder(arrayOfTextArray[key].color);
          //$(".color_splash[title='"+arrayOfTextArray[keytext].title+"']").addClass("calc_hover_class");
        }

      }

      var number = $(this).attr("id");
      var text = new createjs.Text(number, "300 57px proximanova", k);
      text.textBaseline = "top";
      text.x = arrayOfTextClick[keytext], text.y = 100;
      text.name = "fil" + textarrayname;
      text.on("dblclick", function (event) {
        $("#calculatordialog").dialog("open");
        var a = event.target;
        var k = a.name;
        arrayno = k.replace("fil", "");
        keytext = arrayno;
        key = arrayno;
        dbclick_flag = true;
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
      $("#calculatordialog").dialog("open");
      var a = event.target;
      var k = a.name;
      arrayno = k.replace("fil", "");
      keytext = arrayno;
      key = arrayno;
      dbclick_flag = true;
      console.log("color of array " + arrayOfTextArray[arrayno].color);
      //var ne = arrayOfTextArray[keytext].color+"_d";
      color_finder(arrayOfTextArray[arrayno].color);
      console.log("keytext" + keytext);
      console.log(arrayOfTextArray[keytext]);
	  arrayOfTextBorder[keytext].visible = true;
    });
    
    pressmovecalc(stage, arrayofCalcContainer[keytext]);
    arrayofCalcContainer[keytext].on("click", function (evt) {
      console.log(evt.target.name);
      var fil = evt.target.name;
      arr = fil.replace("fil", "");
      console.log("arr value " + arr);
	  deselect();
	  arrayOfTextBorder[arr].visible = true;
      $(".trash").off("click").on("click", function (evt) {
        var result = removeSelectedObj(stage, arrayOfTextContainer, arrayofCalcContainer, stage, fil, arrayOfTextArray, arrayOfTextClick, arrayOfTextBorder);
        console.log("result " + result);
        if (result == 0) {
          $('#calculatordialog').dialog('close');
          console.log("we are here");
          $('.trash').off("click").on('click', handleTrash);	
        }
        if (result == 1) {
          calcontainername = calcontainername - 1;
          keytext = keytext - 1;
          key = key - 1;
          textarrayname--;
          $('.trash').off("click").on('click', handleTrash);
        }
        stage.update();
      });
    });
    calcStatus = true;
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
    
    console.log("k" + k);
    $(".color_splash").removeClass("calc_hover_class");
    switch (k) {
      case "#f47676":
        console.log("Red Text");
        $(".color_splash[title='Red Text']").addClass("calc_hover_class");
        break;
      case "#f7ab56":
        console.log("Orange Text");
        $(".color_splash[title='Orange Text']").addClass("calc_hover_class");
        break;
      case "#82df28":
        console.log("Green Text");
        $(".color_splash[title='Green Text']").addClass("calc_hover_class");
        break;
      case "#3ecfe1":
        console.log("Blue Text");
        $(".color_splash[title='Blue Text']").addClass("calc_hover_class");
        break;
      default:
        //default 
        console.log("Gray Text");
        $(".color_splash[title='Gray Text']").addClass("calc_hover_class");
    }

  }


  function calc_clone() {
	  deselect();

    if (arrayofCalcContainer != 0) {

      while (arrayOfTextContainer[keytext] == undefined) {
        keytext = keytext - 1;
        arrayOfTextClick.push(arrayOfTextClick[keytext]);
      }
	  for(i=0;i<arrayOfTextBorder.length;i++){
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
      k = "#818181";
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
      console.log(arrayOfTextClick);
      stage.update();
      
      //keytext = keytext + 1;
      for (i = 0; i < arrayOfTextContainer.length; i++) {
        arrayOfTextContainer[i].off("dblclick");
        arrayOfTextContainer[i].on("dblclick", function (event) {
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
      }

      calc.on("click", function (evt) {
        console.log(evt.target.name);
        var fil = evt.target.name;
        arr = fil.replace("fil", "");
        console.log("arr value " + arr);
        //highlight_calc(keytext);
        //arrayOfTextContainer[keytext].alpha = 1;
		deselect();
	     arrayOfTextBorder[arr].visible = true;
        $(".trash").off("click").on("click", function (evt) {
          var result = removeSelectedObj(stage, arrayOfTextContainer, arrayofCalcContainer, stage, fil, arrayOfTextArray, arrayOfTextClick, arrayOfTextBorder);
          if (result == 0) {
            $('#calculatordialog').dialog('close');
            $('.trash').off("click").on('click', handleTrash);
          }
          if (result == 1) {
            calcontainername = calcontainername - 1;
            keytext = keytext - 1;
            key = key - 1;
            textarrayname--;
            $('.trash').off("click").on('click', handleTrash);
          }
          stage.update();

        });
      });
	  
	  
      keytext = keytext + 1;
      key = key + 1;
      textarrayname++;
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

  $(document).on('keydown', function (e) {
    if (e.keyCode === 16 || e.keyCode === 17) {
      key_pressed = 1;
    } else {
      key_pressed = 0;
    }
  });

  $(document).on('keyup', function (e) {
    key_pressed = 0;
  });
  $(document).mousedown(function () {
    mouseDown = !0;
  });
  $(document).mouseup(function () {
    mouseDown = !1;
  });
  /* eraser function to get mouse event */

  var shapename;
  function handleMouseEvent(evt) {
    console.log("evt.target: " + evt.target + ", evt.type: " + evt.type);
    console.log(evt.target.name);
    shapename = evt.target.name;
    // to save CPU, we're only updating when we need to, instead of on a tick:1
    stage.update();
  }

  /* multi-selection starts here */
  function multiSelection() {
    var mousePressed = false;
    var firstX, lastX, lastY;
    //mousedown
    stage.on("stagemousedown", function (e) {
      if (stage._getObjectsUnderPoint(stage.mouseX, stage.mouseY) == null) {
        $("#workspace").addClass("cursor_canvas");
        mousePressed = true;
        dotted_line = new createjs.Shape();
        dotted_line.name = 'dotted_line';
        dotted_line.cursor = "crosshair";
        dotted_line.graphics.setStrokeStyle(7, "round", "round").beginStroke("#ffffff").beginFill("rgba(255,255,255,.01)");
        dotted_line.graphics.closePath();
        stage.addChild(dotted_line);
        stage.update();
      }
    });
    //mouseup
    stage.on("stagemouseup", function (e) {
      //ctx.setLineDash([0]);
      if (mousePressed) {
        $("#workspace").removeClass("cursor_canvas");
        mousePressed = false;
        lastX = e.stageX;
        lastY = e.stageY;

        d = [];
        if (selectedArray.length > 0) {
          //alert(selectedArray.length);console.log(selectedArray);
          for (i = 0; i < selectedArray.length; i++) {
            if (selectedArray[i].parent) {
              var e = selectedArray[i].parent.localToLocal(selectedArray[i].x, selectedArray[i].y, stage);
              if (dotted_line.hitTest(e.x, e.y)) {
                d.push(selectedArray[i]);
              }
            }
          }
        }

        if (d.length > 0) {
          for (x = 0; x < d.length; x++) {
            var object = d[x];
            if(object.parent == null || object.parent.name == null){
            	stage.removeChild(object);
                stage.update();
	            var icon = new createjs.Bitmap(tfImagePath+"/counters/" + object.type + "/counter-" + object.type + "-" + object.color + "_hover.png");
	            var boxClone = icon.clone();
	            boxClone.cursor = 'pointer';
	            boxClone.type = object.type;
	            boxClone.color = object.color;
	            boxClone.x = object.x;
	            boxClone.y = object.y;
	            width = (boxClone.image.width === 0) ? 60 : boxClone.image.width;
	            height = (boxClone.image.height === 0) ? 60 : boxClone.image.height;
	            boxClone.regX = width / 2;
	            boxClone.regY = height / 2;
	            boxClone.selected = 1;
	            boxClone.on("pressmove", drag);
	            boxClone.on('pressup', function (evt) {
	              frames = checkIntersection();
	              if (frames)
	                setIconIntoFrame(evt);
	            });
	            objectArray.push(boxClone);
	            objectListToFrame.push(boxClone);
	            deSelectFromSelected(object.id);// remove elements from selectedArray as they were selected
	            stage.addChild(boxClone);
	            stage.update();
            }else{
        	  selectFrameIcons(object.parent, object);//select Frame Icons
        	  deselectFrameObj.push(object.parent);// move selected frame-icons-parent to deselectFrameObj
        	  deSelectFromSelected(object.id);// remove elements from selectedArray as they were selected
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
        //ctx.webkitLineDash = [6], ctx.setLineDash([13]), ctx.mozDash = [20];
        dotted_line.graphics.lineTo(evt.stageX, evt.stageY);
        oldX = evt.stageX;
        oldY = evt.stageY;
        stage.update();
      }
    });
    //mouseleave
    stage.on("stagemouseleave", function (e) {
      mousePressed = false;
    });
  }
  multiSelection();

  //To remove specific element from the selectedArray
  function deSelectFromSelected(id) {
    if (selectedArray.length > 0) {
      for (y = 0; y < selectedArray.length; y++) {
        if (id == selectedArray[y].id) {
          selectedArray.splice(y, 1);
        }
      }
    }
  }
  /* multi-selection ends here */
 
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
  /* custom tool tip ends here */
});