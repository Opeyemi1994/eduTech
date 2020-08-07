/* 
 * Common Js file for functionalities like Color Change, Delete element, Clone, rotate, clear workspace, paint, calculator etc.
 */


/* global createjs */

/**
 * To remove frames from the stage
 * @param {frameArray} frameArray
 * @param {frameArray} frameArrayList
 * @param {frameArray} frameArrayListcont
 * @param {stage} stage
 * @returns {undefined}   
 */
function removeSelectedFrames(frameArray, frameArrayList, frameArrayListcont, stage) {
  for (var key in frameArray) {
    value = frameArray[key];
    childs = value.children;
    for (var child in childs) {
      if (typeof childs[child].type !== 'undefiend' && childs[child].type === 'cell') {
        frameArrayList.pop(childs[child]);
      }
    }
    frameArrayListcont.pop(value);
    stage.removeChild(value);
    stage.update();
  }
  while (frameArray.length > 0) {
    frameArray.pop();
  }
}

/**
 * To remove selected objects from the stage
 * @param {objectArray} objectArray
 * @param {stage} stage
 * @returns {undefined} 
 */
function removeSelectedObjects(objectArray, stage) {
  for (var key in objectArray) {
    value = objectArray[key];
    stage.removeChild(value);
  }
  while (objectArray.length > 0) {
    objectArray.pop();
  }
}

/**
 * To drag single icon
 * @param {evt} evt - objectInfo
 * @param {evt} cm_height - canvas height
 * @returns {undefined}  
 */
function dragIcon(evt, cm_height){
  
  cm_width = window.innerWidth;
  
  evt.target.x = evt.stageX;
  evt.target.y = evt.stageY;
  
  if(evt.stageX < 75){   
    evt.target.x = 75;
  }
  if(evt.stageX > cm_width-20){   
    evt.target.x = cm_width-30;
  }
  if(evt.stageY < 115){
    evt.target.y = 115;
  }
  if(evt.stageY > cm_height-25){
    evt.target.y = cm_height-25;
  }
  
}

/**
 * To drag multiple icons
 * @param {evt} evt objectInfo
 * @param {objectArray} objectArray
 * @param {oldX} oldX - target.x of mousedown element
 * @param {oldY} oldY - target.y of mousedown element
 * @returns {undefined} 
 */
function dragMultipleIcons(evt,objectArray,oldX,oldY){
  for(i=0; i<objectArray.length; i++){
    if(evt.target.id !== objectArray[i].id){
      var offset = {
        x: objectArray[i].x - oldX,
        y: objectArray[i].y - oldY
      };
      objectArray[i].x = evt.target.x + offset.x;
      objectArray[i].y = evt.target.y + offset.y;
    }
  }
}

/**
 * To clone frames
 * @param {frameArray} frameArray
 * @returns {clonedFrames} clonedFrames
 */
function cloneFrame(frameArray){
  if(frameArray.length > 0){
    var clonedFrames = new Array();
    for (var key in frameArray) {
      var frameClone = frameArray[key].clone(true);
      frameClone.cursor = 'pointer';
      frameClone.x = frameArray[key].x + 50;
      frameClone.y = frameArray[key].y + 50;
      frameClone.width = frameArray[key].width;
      frameClone.height = frameArray[key].height;
      frameClone.fivegrid = frameArray[key].fivegrid;
      frameClone.rotation = frameArray[key].rotation;
      frameClone.rotation_flag = frameArray[key].rotation_flag;
      clonedFrames.push(frameClone);
    }
    return clonedFrames;
  }
}
/**
 * function for rotate Frame functionality
 * @param {type} stage
 * @param {type} frameArray
 * @returns {undefined}
 */
function rotateFrame(stage, frameArray) {
  for (key = 0; key < frameArray.length; key++) {
    frameArray[key].rotation = frameArray[key].rotation + 90;

    if ((frameArray[key].rotation) % 90 === 0) {
      frameArray[key].rotation_flag = ((frameArray[key].rotation) / 90) % 2;
      if (frameArray[key].rotation_flag === 1) {
        if (frameArray[key].y < frameArray[key].width * 29 + 90)
          frameArray[key].y = frameArray[key].width * 29 + 90;
      }
      if (frameArray[key].rotation_flag === 0) {
        if (frameArray[key].x < frameArray[key].width * 29 + 70)
          frameArray[key].x = frameArray[key].width * 29 + 70;
      }
    }
    child = frameArray[key].children;
    frameArray[key].rotation = frameArray[key].rotation % 360;
    var objectTypes = ["minions", "monsters", "circle", "star", "cat", "bird", "apple", "cupcake"];
    for (var ch in child) {
      if (objectTypes.indexOf(child[ch].type) !== -1) {
        if (frameArray[key].rotation == 90) {
          child[ch].y = child[ch].y +60;
        } else if (frameArray[key].rotation == 270) {
          child[ch].y = child[ch].y - 60;
        } else if (frameArray[key].rotation == 180) {
          child[ch].x = child[ch].x + 60;
          child[ch].y = child[ch].y - 0;
        } else {
          child[ch].x = child[ch].x - 60;
        }
        child[ch].rotation = -frameArray[key].rotation;
      }
    }
    stage.update();
  }
}

 //Info section 
  $('#info').click(function () {
    $('#infopage').fadeIn();
	$("#toolbar").addClass('toolbar_new');
	$("#howitworksoverlay").css("display","block");
	$('html,body').scrollTop(0);
  });

  $("#infopage .close, #howitworksoverlay").click(function () {
    $("#infopage").fadeOut();
	$("#toolbar").removeClass('toolbar_new');
	$("#howitworksoverlay").css("display","none");
  });

  $("#infopage .title").click(function () {
    var a = $(this);
    a.hasClass("selected") || ($("#infopage .title.selected").removeClass("selected"), a.addClass("selected"), $("#infopage .contents").toggle(), $("#infopage .contents-wrapper").scrollTop(0));
  });
  
//remove stage event listeners for paint
  
  function removeEventLiserners(stage) {
    stage.removeAllEventListeners("stagemousedown");
    stage.removeAllEventListeners("stagemouseup");
    stage.removeAllEventListeners("stagemousemove");
  }
  
  /*
  *calculator functionality
  *
  */
  
//deleting calculator results
  
  function removeSelectedObj(stage, objectArray, arrayofCalcContainer, stage, key, arrayOfTextArray, arrayOfTextClick, arrayOfTextBorder) {
	var calckey;
	var result = false;
	var deleted;
	for(i=0;i<arrayofCalcContainer.length;i++){
		calckey = arrayofCalcContainer[i].name;
		if(calckey == key){
			deleted = i;
			stage.removeChild(arrayofCalcContainer[i]);
	        stage.removeChild(objectArray[i]);
			arrayofCalcContainer.splice(i,1);
	        objectArray.splice(i,1);
			arrayOfTextArray.splice(i,1);
			arrayOfTextClick.splice(i,1);
			arrayOfTextBorder.splice(i,1);
			result = true;
		}
		if(result && i < arrayofCalcContainer.length){
			console.log("value of i"+i);
			arrayofCalcContainer[i].name = "fil" + i;
			objectArray[i].name = "fil" + i;
		}
	}
	if(arrayofCalcContainer == 0){
		result = false;
		return 0;
	}else{
		result = false;
		return 1;
	}
}

//pressmove function of calculator array element

  function pressmovecalc(stage, result){
    result.on('mousedown', function (e) {
      var posX = e.stageX;
      var posY = e.stageY;
      this.oldX = this.x;
      this.oldY = this.y;
      this.offset = {
        x: this.x - posX,
        y: this.y - posY
      };

    });
	result.on('pressmove', function (e) {
	  var posX = e.stageX;
      var posY = e.stageY;
      this.x = posX + this.offset.x;
      this.y = posY + this.offset.y;
	});
  
  }
  
  //paint tool curve common function
  
//pen curve
  function Drawfunc(stage, x, flag, shape, penArray, i, j, color, wrapper, p){
    var isNumberLine = false;
	if(stage.name != null && stage.name == 'numberline_workspace'){
	  isNumberLine = true;
	}
    stage.on("stagemousedown", function (event) {
      //console.log("mousedown");
      color = x;
      var size;
      flag = true;
      if (flag) {
        shape = new createjs.Shape();
        wrapper.addChild(shape);
        penArray.push(shape);
        i = 0;
        j = 0;
		if(p==1)
		size = 6;
		else
		size = 40;
		if (isInteger(color)){
	      color = "#3ecfe1";
	    } 
        shape.graphics.beginStroke(color).setStrokeStyle(size, "round");
        wrapper.updateCache();
      }
    });

    stage.on("stagemouseup", function (event) {
      flag = false;
      shape.graphics.endStroke();
      wrapper.updateCache();
    });

    stage.on("stagemousemove", function (evt) {
      if (flag && (isNumberLine || evt.stageY > 90)) {
        if (p == 1)
        {
          console.log("in paint mousedown" + p);
          shape.graphics.moveTo(oldX, oldY)
                  .lineTo(evt.stageX, evt.stageY);
          wrapper.updateCache("source-overlay");
          stage.update();
        } else if (p == 0) {
          shape.compositeOperation = "destination-out";
          shape.graphics.moveTo(oldX, oldY)
                  .lineTo(evt.stageX, evt.stageY);
          wrapper.updateCache();
          stage.update();
        }
      }
      oldX = evt.stageX;
      oldY = evt.stageY;
    });
    stage.update();
  }
  //to find is integer for IE bug
  function isInteger(num) {
	return (num ^ 0) === num;
  }
/*
 * 
 //clear all workspace and delete array inside
function removeAll(stage, delarray) {
  stage.removeAllChildren();
  stage.update();
  var key;
  for (var key in delarray) {
    delarray[key] = [];
  }
}
  
  */