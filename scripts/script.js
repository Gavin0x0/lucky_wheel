// luckywheel animation with Greensock  ---------------------------------

$(document).ready(function () {
  // 礼物数量：[特等奖，一等奖，二等奖，三等奖，参与奖]
  var giftNums = [2, 6, 8, 20, 50];
  // 区域设置
  var sectorsList = [
    { startA: 0, endA: 15, color: "#B2A4FF", text: "特等奖🌟", level: 0 },
    { startA: 15, endA: 45, color: "#3AB4F2", text: "三等奖🥉", level: 3 },
    { startA: 45, endA: 60, color: "#B6E2A1", text: "参与奖🎁", level: 4 },
    { startA: 60, endA: 90, color: "#F49D1A", text: "二等奖🥈", level: 2 },
    { startA: 90, endA: 120, color: "#3AB4F2", text: "三等奖🥉", level: 3 },
    { startA: 120, endA: 135, color: "#FFE15D", text: "一等奖🥇", level: 1 },
    { startA: 135, endA: 180, color: "#B6E2A1", text: "参与奖🎁", level: 4 },
    { startA: 180, endA: 195, color: "#F49D1A", text: "二等奖🥈", level: 2 },
    { startA: 195, endA: 225, color: "#B6E2A1", text: "参与奖🎁", level: 4 },
    { startA: 225, endA: 240, color: "#3AB4F2", text: "三等奖🥉", level: 3 },
    { startA: 240, endA: 270, color: "#B6E2A1", text: "参与奖🎁", level: 4 },
    { startA: 270, endA: 285, color: "#FFE15D", text: "一等奖🥇", level: 1 },
    { startA: 285, endA: 300, color: "#3AB4F2", text: "三等奖🥉", level: 3 },
    { startA: 300, endA: 360, color: "#B6E2A1", text: "参与奖🎁", level: 4 },
  ];
  var textPlacehold = Array(36).fill("&nbsp").join("");

  //  Setup variables
  var $btnPlay = $("#btnPlay"),
    $btnTest = $("#btnTest");
  // Loads the tick audio sound in to an audio object.
  let audio = new Audio("tick.mp3");

  // This function is called when the sound is to be played.
  function playSound() {
    // Stop and rewind the sound if it already happens to be playing.
    audio.pause();
    audio.currentTime = 0;

    // Play the sound.
    audio.play();
  }
  function wheelTo(deg) {
    var wheel = $(".wheel"),
      active = $(".active"),
      currentRotation,
      lastRotation = 0,
      lastTickPosition = 0,
      tolerance;
    //  Creating the Timeline
    var indicator = new TimelineMax();
    var spinWheel = new TimelineMax();
    indicator.timeScale(1).seek(0);
    spinWheel.timeScale(1).seek(0);
    indicator
      .to(active, 0.13, {
        rotation: -10,
        transformOrigin: "65% 36%",
        ease: Power1.easeOut,
      })
      .to(active, 0.13, { rotation: 3, ease: Power4.easeOut })
      .add("end");

    //  Luckywheel animation
    spinWheel.to(wheel, 5, {
      rotation: deg,
      transformOrigin: "50% 50%",
      ease: Power4.easeOut,
      onUpdate: function () {
        currentRotation = Math.round(this.target[0]._gsTransform.rotation); //_gsTransform: current position of the wheel
        tolerance = currentRotation - lastRotation;

        // console.log("lastRot: " + lastRotation);
        // console.log("currentRot: " + (currentRotation % 360));
        // console.log("tol: " + tolerance);
        // console.log(indicator.progress());
        // console.log("spinwheelprogress: " + spinWheel.progress());

        // console.log(
        //   "360360360 : " + (360 - ((currentRotation - offset) % 360))
        // );
        setResultText(
          getLevelByAngle(360 - ((currentRotation - offset) % 360))
        );
        if (spinWheel.progress() > 0.5) {
          tolerance = 0;
        }
        if (Math.round(currentRotation) % (360 / 24) <= tolerance) {
          if (currentRotation - lastTickPosition > 0.5) {
            // console.log("tick" + (Math.round(currentRotation) % (360 / 24)));
            // console.log("play sound at: " + currentRotation);
            playSound();
            lastTickPosition = currentRotation;
          }
        }
        if (Math.round(currentRotation) % (360 / 24) <= tolerance) {
          if (indicator.progress() > 0.2 || indicator.progress() === 0) {
            indicator.play(0);
          }
        }
        lastRotation = currentRotation;
      },
    });
    spinWheel.add("end");
  }
  function startconfetti() {
    var end = Date.now() + 3 * 1000;

    // go Buckeyes!
    var colors = ["#fc7800", "#ffffff", "#ff2288"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  var circle_center = [365, 365];
  /** 在SVG的sectors中添加扇形
   * @param {number} startAngle - 开始角度
   * @param {number} endA - 结束角度
   */
  function addSector(startAngle, endA, color) {
    // 圆心X坐标
    var cx = circle_center[0];
    // 圆心Y坐标
    var cy = circle_center[1];
    // 半径
    var r = 330;
    // 起始点X坐标
    var x1 = cx + r * Math.cos(startAngle);
    // 起始点Y坐标
    var y1 = cy + r * Math.sin(startAngle);
    // 终点X坐标
    var x2 = cx + r * Math.cos(endA);
    // 终点Y坐标
    var y2 = cy + r * Math.sin(endA);
    // 扇形的大弧标志
    var largeArcFlag = endA - startAngle <= Math.PI ? "0" : "1";
    // 在 sectors 里 添加 <path> 元素
    var sectors = document.getElementsByClassName("sectors");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M" +
        cx +
        "," +
        cy +
        " L" +
        x1 +
        "," +
        y1 +
        " A" +
        r +
        "," +
        r +
        " 0 " +
        largeArcFlag +
        ",1 " +
        x2 +
        "," +
        y2 +
        " Z"
    );
    path.setAttribute("fill", color);
    sectors[0].appendChild(path);
  }
  /** 在SVG的sectors中添加文字
   * @param {string} textString - 文字内容
   * @param {number} angle - 文字旋转角度
   */
  function addTextToSector(textString, angle) {
    var texts = document.getElementsByClassName("texts");
    var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", 365);
    text.setAttribute("y", 365);
    text.setAttribute("fill", "#246");
    text.setAttribute("font-size", "30");
    text.setAttribute("font-family", "SmileySans-Oblique");
    text.setAttribute("text-anchor", "start");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute(
      "transform",
      "rotate(" + (angle * 360) / (2 * Math.PI) + ", 365, 365)"
    );
    text.innerHTML = textString;
    texts[0].appendChild(text);
  }
  function DegToAngle(deg) {
    return (deg * Math.PI) / 180;
  }
  /** 围绕圆心绘制sticks
   */
  function addSticks(angle) {
    var sticks = document.getElementsByClassName("sticks");
    var tick = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    // 圆心
    var cx = circle_center[0];
    var cy = circle_center[1];
    // 半径
    var r = 365;
    // 起始点X坐标
    var x1 = cx + r;
    // 起始点Y坐标
    var y1 = r;
    // 宽度
    var width = 10;
    // 高度
    var height = 10;
    // 旋转角度
    var rotateAngle = angle;
    // 设置属性
    tick.setAttribute("x", x1 - 32);
    tick.setAttribute("y", y1 - height / 2);
    tick.setAttribute("width", width);
    tick.setAttribute("height", height);
    tick.setAttribute("rx", 6);
    tick.setAttribute("ry", 6);
    tick.setAttribute("transform", "rotate(" + angle + ",365,365)");
    var dot = tick.cloneNode(true);
    dot.setAttribute("fill", "#feae00");
    tick.setAttribute("width", 30);
    sticks[0].appendChild(tick);
    sticks[0].appendChild(dot);
  }
  // 绘制扇形奖项区域
  for (let s of sectorsList) {
    //添加addSector
    addSector(DegToAngle(s.startA), DegToAngle(s.endA), s.color);
    addTextToSector(
      textPlacehold + s.text,
      (DegToAngle(s.startA) + DegToAngle(s.endA)) / 2
    );
  }
  //绘制一圈点点
  for (var i = 0; i < 360; i += 15) {
    addSticks(i);
  }
  function sum(arr) {
    return arr.reduce((a, b) => a + b);
  }
  // 通过奖项数量计算各奖项概率
  function getProbability() {
    var totalGiftNums = sum(giftNums);
    var probabilityList = giftNums.map((item) => {
      return item / totalGiftNums;
    });
    return probabilityList;
  }
  // 获取一个0-1之间的随机数，来判断落在哪个奖项区域
  function getRandomGift() {
    var randomNum = Math.random();
    var probabilityList = getProbability();
    var sum = 0;
    for (let i = 0; i < probabilityList.length; i++) {
      sum += probabilityList[i];
      if (randomNum <= sum) {
        return i;
      }
    }
  }
  // 获取两数字之间的随机整数
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // 数组 sectorsList 中寻找 level 为 n 的所有奖项区域
  function findSector(n) {
    var sectorList = [];
    sectorsList.forEach((item, index) => {
      if (item.level === n) {
        sectorList.push(index);
      }
    });
    return sectorList;
  }
  // 获取区域角度范围数组
  function getRangeList(sectorList) {
    var rangeList = [];
    sectorList.forEach((item) => {
      rangeList.push([sectorsList[item].startA, sectorsList[item].endA]);
    });
    return rangeList;
  }
  // 判断一个整数是否在一个区间数组的区间内
  function isInRange(num, rangeList) {
    var flag = false;
    rangeList.forEach((item) => {
      if (num > item[0] && num < item[1]) {
        flag = true;
      }
    });
    return flag;
  }
  // 获取属于获奖区域的随机整数
  function getRandomSectorAngle(sectorList) {
    var res = 0;
    while (!isInRange(res, getRangeList(sectorList))) {
      res = getRandomInt(0, 360);
    }
    return res;
  }
  // level 转奖项等级
  function levelToText(level) {
    var text = "";
    switch (level) {
      case 0:
        text = "特等奖";
        break;
      case 1:
        text = "一等奖";
        break;
      case 2:
        text = "二等奖";
        break;
      case 3:
        text = "三等奖";
        break;
      case 4:
        text = "参与奖";
        break;
      default:
        text = "再来一次";
        break;
    }
    return text;
  }
  // 向下取到最接近360的整数倍
  function getAngleTo360(angle) {
    return Math.floor(angle / 360) * 360;
  }

  // 设置h2 result的内容
  function setResultText(level) {
    var text = levelToText(level);
    var result = document.getElementById("result");
    result.innerHTML = "当前是：🎊" + text+"🎊";
  }

  // 通过角度获取当前指向区域的等级
  function getLevelByAngle(wheelAngle) {
    var sectorAngle = wheelAngle;
    var level = 0;
    sectorsList.forEach((item) => {
      if (sectorAngle > item.startA && sectorAngle < item.endA) {
        level = item.level;
      }
    });
    return level;
  }
  // 旋转角度
  var last_deg = 0;
  // 固定偏移量
  var offset = 328;
  // 转动事件
  $btnPlay.click(function () {
    // getProbability();
    var randomGift = getRandomGift();
    var sectorList = findSector(randomGift);
    console.log(
      "转到的是" +
        randomGift +
        " 【" +
        levelToText(randomGift) +
        "】 获奖概率为：" +
        (getProbability()[randomGift] * 100).toFixed(2) +
        "%"
    );
    var finalAngle = 360 - getRandomSectorAngle(sectorList);
    // console.log("区间数组是");
    // console.log(getRangeList(sectorList));
    // console.log("奖项角度是" + finalAngle);
    var deg =
      getAngleTo360(last_deg) + getRandomInt(3, 5) * 360 + finalAngle + offset;
    // console.log("转盘最终角度是" + deg);
    wheelTo(deg);
    last_deg = deg;
    startconfetti();
  });
});
