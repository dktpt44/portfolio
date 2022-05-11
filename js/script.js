// when document is ready 
$(document).ready(() => {
  /* 0 = windows, 1 = Mac */
  var osStyle = 0;
  var winToggle = document.getElementById("winToggle");
  var macToggle = document.getElementById("macToggle");
  var winSwitch = document.getElementById("winSwitch");
  var macSwitch = document.getElementById("macSwitch");
  // event listeners for toggles 
  winToggle.addEventListener("change", (event) => {
    if (winToggle.checked) {
      osStyle = 0;
      macToggle.checked = false;
      macToggle.disabled = false;
      winToggle.disabled = true;
      winSwitch.classList.remove("switch_hover");
    }
  });
  macToggle.addEventListener("change", (event) => {
    if (macToggle.checked) {
      osStyle = 1;
      winToggle.checked = false;
      winToggle.disabled = false;
      macToggle.disabled = true;
      macSwitch.classList.remove("switch_hover");
    }
  });

  // adding hover effect only when the toggle buttons are clickable 
  winSwitch.addEventListener("mouseover", () => {
    if (!winToggle.checked) {
      winSwitch.classList.add("switch_hover");
    }
  });
  winSwitch.addEventListener("mouseleave", () => {
    winSwitch.classList.remove("switch_hover");
  });
  macSwitch.addEventListener("mouseover", () => {
    if (!macToggle.checked) {
      macSwitch.classList.add("switch_hover");
    }
  });
  macSwitch.addEventListener("mouseleave", () => {
    macSwitch.classList.remove("switch_hover");
  });

  // click event for proceed button 
  $("#procdBtn").on("click", () => {
    // load another screen 
    $(".welcomeScreen").fadeOut("slow", () => {
      $(".loadingScreen").fadeIn("slow", () => {
        // windows loading screen
        $(".windowsTxt").css("width", "250px");

      });

    });

    if (osStyle === 0) {
      /* Windows selected */


    } else {
      /* Mac selected*/


    }

    setTimeout(() => {
      $(".loadingScreen").fadeOut("slow", () => {
        $(".wholeDesktop").fadeIn("slow");
      });
    }, 3000);

  });



  // WINDOWS

  var isFolderOpen = false;
  var isFolderMinimized = false;
  var isSettingOpen = false;
  var windowsFolder = $(".windowsFolder");
  var windowsFoldTitle = $(".folderHeadName");
  var winFoldHeadIcon = $("#folderHeadIcon");



  //getting time
  let time = new Date();
  let h = time.getHours();
  let strtm = "AM";
  if (h > 12) {
    h -= 12;
    strtm = "PM";
  } else if (h === 0) {
    h = 12;
    strtm = "AM";
  }
  let m = time.getMinutes();
  if (h < 10) { h = "0" + h; }
  if (m < 10) { m = "0" + m; }
  let mnth = time.getMonth() + 1;
  if (mnth < 10) { mnth = "0" + mnth; }
  let dayy = time.getDate();
  if (dayy < 10) { dayy = "0" + mnth; }

  $("#tbtime").text(h + ":" + m + " " + strtm);
  $("#tbdate").text(mnth + "/" + dayy + "/" + time.getFullYear());


  // open mini settings 
  var miniSettings = $(".minisettings");
  $(".notific").on("click", () => {
    miniSettings.toggleClass("hideMinisettings");
  });
  $(".windesktopContent").on("click", (e) => {
    // to prevent collapsing when clicking on other elements 
    if (!$(e.currentTarget).is(".windesktopContent")) {
      return;
    }
    miniSettings.addClass("hideMinisettings");
  });

  // click handlers for taskbar items
  $("#winstart").on("click", () => {
    // click animation
    $("#winstart img").addClass("itemClickAnim");
    setTimeout(() => {
      $("#winstart img").removeClass("itemClickAnim");
    }, 350);
  });

  var taskbarWinExp = $("#winexplorer");
  var taskbarSetting = $("#winSettings");
  taskbarSetting.on("click", () => {

    // click animation
    $("#winSettings img").addClass("itemClickAnim");
    setTimeout(() => {
      $("#winSettings img").removeClass("itemClickAnim");
    }, 350);
    if (!isSettingOpen) {
      taskbarSetting.addClass("tbItemActive");
      isSettingOpen = true;

    } else {
      taskbarSetting.toggleClass("tbItemInActive");
    }
  });

  taskbarWinExp.on("click", () => {
    // click animation
    $("#winexplorer img").addClass("itemClickAnim");
    setTimeout(() => {
      $("#winexplorer img").removeClass("itemClickAnim");
    }, 350);
    if (isFolderOpen) {
      // folder is open minimize it or maximize it
      windowsFolder.toggleClass("minimizeFolder");
      taskbarWinExp.toggleClass("tbItemInActive");

    } else {
      isFolderOpen = true;
      windowsFolder.removeClass("closeFolder");
      windowsFoldTitle.text("File Explorer");
      taskbarWinExp.addClass("tbItemActive");
      taskbarWinExp.removeClass("tbItemInActive");
      winFoldHeadIcon.attr("src", "images/winicons/folder.png");
      document.getElementById('myGameId').src = document.getElementById('myGameId').src;
    }
  });

  // click handlers for desktop items
  $(".desktpItmHolder").on("click", (e) => {
    isFolderOpen = true;
    taskbarWinExp.addClass("tbItemActive");
    $(".foldContnt").hide();
    var clickedDskItem = $(e.currentTarget);
    // click animation
    clickedDskItem.addClass("itemClickAnim");
    setTimeout(() => {
      clickedDskItem.removeClass("itemClickAnim");
    }, 350);

    if (e.currentTarget === $("#dkptHolder")[0]) {
      // about me clicked
      windowsFoldTitle.text("About me");
      winFoldHeadIcon.attr("src", "images/winicons/profile.png");
      $(".aboutMeContent").fadeIn("2000");
      $(".folderContent").css("overflow-y", "scroll");

    } else if (e.currentTarget === $("#projFold")[0]) {
      // projects clicked
      windowsFoldTitle.text("Projects");
      winFoldHeadIcon.attr("src", "images/winicons/folder.png");
      $(".projFoldContent").fadeIn("2000");
      $(".folderContent").css("overflow-y", "hidden");

    }
    else if (e.currentTarget === $("#labFold")[0]) {
      // labs clicked
      windowsFoldTitle.text("Labs");
      winFoldHeadIcon.attr("src", "images/winicons/folder.png");
      $(".labFoldContent").fadeIn("2000");
      $(".folderContent").css("overflow-y", "hidden");

    }
    else if (e.currentTarget === $("#gamesFold")[0]) {
      // games clicked
      windowsFoldTitle.text("Games");
      winFoldHeadIcon.attr("src", "images/winicons/gamesfold.png");
      $(".folderContent").css("overflow-y", "hidden");
      $(".gamesFoldContent").fadeIn("2000");
      // reload game
      document.getElementById('myGameId').src = document.getElementById('myGameId').src;
    }
    windowsFolder.removeClass("closeFolder");
    windowsFolder.removeClass("minimizeFolder");
    taskbarWinExp.removeClass("tbItemInActive");

  });

  // click handler for theme {
  var msTheme = $("#mstheme");
  msTheme.on("click", () => {
    $(".wholeDesktop").toggleClass("wholeDesktopDark");
    msTheme.toggleClass("themeOn-Dark");
    $(".winTaskbar").toggleClass("winTaskbar_dark");
    $(".winTIconItem").toggleClass("winTIconItemDark");
    $(".notific").toggleClass("winTIconItemDark");
    $(".taskbarClock").toggleClass("winTIconItemDark");
    $(".notific").toggleClass("notificDark");
    $(".taskbarClock").toggleClass("taskbarClockDark");
    miniSettings.toggleClass("minisettingsDark");
    $(".folderHeader").toggleClass("folderHeaderDark");



  });
  $("#mswifi").on("click", () => {
    $("#mswifi").toggleClass("mswifiBg");
  });

  /* folder actions */
  // maximize folder
  $("#maximizeFolder").on("click", () => {
    windowsFolder.toggleClass("maximizeFolder");
    // games folder content
    $(".gameIframe").toggleClass("iframeFulScreen");
    $(".iframeHolder").toggleClass("iframeHolder2");
  });
  // minimize folder 
  $("#minmizeFolder").on("click", () => {
    windowsFolder.toggleClass("minimizeFolder");
    taskbarWinExp.addClass("tbItemInActive");
  });
  //close folder
  $("#closeFolder").on("click", () => {
    windowsFolder.addClass("closeFolder");
    isFolderOpen = false;
    taskbarWinExp.removeClass("tbItemActive");
  });


  // click handlers for about me page of portfolio
  // var abtMenuHeadTt = $(".abtMecontent");
  var abtMenuHeadTtt = $(".head11");
  var abtMenuHeadImg = $(".noCimg");
  var abtMenuHeaddesc = $("#abtMeDesc");
  $(".abtMenuItm").on("click", (e) => {
    // item animation
    abtMenuHeadTtt.addClass(["animate__animated ", "animate__fadeInUp"]);
    abtMenuHeadImg.addClass(["animate__animated ", "animate__fadeIn"]);
    abtMenuHeaddesc.addClass(["animate__animated ", "animate__fadeInUp"]);

    // reset items animation
    setTimeout(() => {
      abtMenuHeadTtt.removeClass(["animate__animated ", "animate__fadeInUp"]);
      abtMenuHeadImg.removeClass(["animate__animated ", "animate__fadeIn"]);
      abtMenuHeaddesc.removeClass(["animate__animated ", "animate__fadeInUp"]);
    }, 1200);
    // check which one is it
    $(".abtMenuItm").removeClass("abtMenuActive");
    e.currentTarget.classList.add("abtMenuActive");

    // checking which one was clicked 
    if (e.currentTarget === $("#abtMenuItm1")[0]) {
      abtMenuHeadTtt.text("Hackathon");
      abtMenuHeadImg.attr("src", "images/myimg/qc.jpg");
      abtMenuHeaddesc.text("NYUAD quantum computing hackathon, 2022");

    } else if (e.currentTarget === $("#abtMenuItm2")[0]) {
      abtMenuHeadTtt.text("Olympiad");
      abtMenuHeadImg.attr("src", "images/myimg/olymp.jfif");
      abtMenuHeaddesc.text("LAC A-level maths olympiad, 2019");

    } else if (e.currentTarget === $("#abtMenuItm3")[0]) {
      abtMenuHeadTtt.text("Football");
      abtMenuHeadImg.attr("src", "images/myimg/football.jpeg");
      abtMenuHeaddesc.text("Me in number 7, Interclassico, 2022");

    } else if (e.currentTarget === $("#abtMenuItm4")[0]) {
      abtMenuHeadTtt.text("Table Tennis");
      abtMenuHeadImg.attr("src", "images/myimg/tt.jpg");
      abtMenuHeaddesc.text("Me serving the ball, 2021");
    }

  });

  // project folder js 
  $(function () {
    $('.carousel-item').eq(0).addClass('active');
    var total = $('.carousel-item').length;
    var current = 0;
    // move right button
    $('#moveRight').on('click', function () {
      var next = current;
      current = current + 1;
      setSlide(next, current);
    });
    // move left button 
    $('#moveLeft').on('click', function () {
      var prev = current;
      current = current - 1;
      setSlide(prev, current);
    });
    // setSlide function 
    function setSlide(prev, next) {
      var slide = current;
      if (next > total - 1) {
        slide = 0;
        current = 0;
      }
      if (next < 0) {
        slide = total - 1;
        current = total - 1;
      }
      // css update 
      $('.carousel-item').eq(prev).removeClass('active');
      $('.carousel-item').eq(slide).addClass('active');
    }
  });

});



