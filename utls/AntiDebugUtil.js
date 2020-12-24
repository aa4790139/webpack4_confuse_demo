//*************************************************************************
//     创建日期:     2020-12-23 04:12:52
//     文件名称:     AntiDebugUtil.js
//     创建作者:     Harry
//     版权所有:     剑齿虎
//     开发版本:     V1.0
//     相关说明:     反调试程序
//*************************************************************************

//-------------------------------------------------------------------------
function AntiDebugUtils() {

}

//-------------------------------------------------------------------------
/**
 * 监听按键 + 鼠标右键
 * */
AntiDebugUtils.prototype.registerKeyDown = function () {
  console.log("hook----->registerKeyDown");
  /*监听F12、Ctrl + Shift + I、Ctrl + S*/
  document.onkeydown = function (event) {
    if (event.key === "F12") {
      console.log("KeyDown: F12");
      event.returnValue = false;
    } else if (event.ctrlKey && event.shiftKey && event.key === "I") {//此处I必须大写
      console.log("KeyDown: Ctrl + Shift + I");
      event.returnValue = false;
    } else if (event.ctrlKey && event.key === "s") {//此处s必须小写
      console.log("KeyDown: Ctrl + S");
      event.returnValue = false;
    }
  };

  /*
* 监听右键菜单
* */
  document.oncontextmenu = function (event) {
    console.log("KeyDown: 鼠标右键");
    event.returnValue = false;
  };
}
//-------------------------------------------------------------------------
/*
* 检测控制台是否打开
* */
AntiDebugUtils.prototype.registerConsoleWindow = function () {
  console.log("hook----->registerConsoleWindow");
  setInterval(function () {
    const before = new Date();
    (function () {
    }).constructor("debugger")();
    // debugger;
    const after = new Date();
    const cost = after.getTime() - before.getTime();
    if (cost > 100) {
      console.log("registerConsoleWindow: 检测到打开了调试窗口");
      window.location = "about:blank";
    }
  }, 1000);
}
//-------------------------------------------------------------------------
/*
* 检测DevTools 是否打开
* */
AntiDebugUtils.prototype.registerDevTools = function () {
  console.log("hook----->registerDevTools");
  let div = document.createElement('div');
  let loop = setInterval(() => {
    console.log(div);
    console.clear();
  });
  Object.defineProperty(div, "id", {
    get: () => {
      clearInterval(loop);
      window.location = "about:blank";
    }
  });
}
//-------------------------------------------------------------------------
AntiDebugUtils.prototype.hook = function () {
  console.log("hook----->");
  this.registerKeyDown();
  // this.registerConsoleWindow();
  // this.registerDevTools();
}
//-------------------------------------------------------------------------
const antiDebugUtils = new AntiDebugUtils();
export default antiDebugUtils;

