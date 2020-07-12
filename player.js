let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "370",
    width: "660",
    videoId: "awtmTJW9ic8",
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
}

function onPlayerStateChange(event) {
  const playerButton = $(".player__start");
  switch (event.data) {
    case 1:
      $(".player__wrapper").addClass("player__wrapper--active");
      playerButton.addClass("paused");
      break;
    case 2:
      playerButton.removeClass("paused");
      break;
  }
}

function onPlayerReady() {
  const duration = player.getDuration();
  let interval;

  clearInterval(interval);

  interval = setInterval(() => {
    const completedSeconds = player.getCurrentTime();
    const percent = (completedSeconds / duration) * 100;

    $(".player__playback-button").css({
      left: `${percent}%`
    });
  }, 1000);
}

$(".player__start").on("click", e => {
  const btn = $(e.currentTarget);

  if (btn.hasClass("paused")) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

$(".player__duration-line").on("click", e => {
  e.preventDefault();
  const bar = $(e.currentTarget);
  const newButtonPosition = e.pageX - bar.offset().left;
  const clickedPercent = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() / 100) * clickedPercent;

  $(".player__playback-button").css({
    left: `${clickedPercent}%`
  });

  player.seekTo(newPlayerTime);
});

$(".player__splash").on("click", e => {
  player.playVideo();
});

// sound
setTimeout(function() {
  const volBtn = $(".player__volume-button");
  const posVolBtnPx = volBtn.css("left");
  const posVolBtn = parseInt(posVolBtnPx);
  const volBar = document.querySelector(".player__volume-line");
  const volBarStyle = getComputedStyle(volBar);
  const volBarWidth = parseInt(volBarStyle.width);

  const posVolumePercent = (posVolBtn / volBarWidth) * 100;
  console.log(posVolumePercent);
  player.setVolume(posVolumePercent);

  $(".player__volume-line").on("click", e => {
    e.preventDefault();
    const barVol = $(e.currentTarget);
    const newButtonVolPosition = e.pageX - barVol.offset().left;
    const clickedVolPercent = (newButtonVolPosition / barVol.width()) * 100;

    if (clickedVolPercent < 100) {
      $(".player__volume-button").css({
        left: `${clickedVolPercent}%`
      });
    } else {
      $(".player__volume-button").css({
        left: `100%`
      });
    }

    player.unMute();
    player.setVolume(clickedVolPercent);
  });

  $(".player__volume-pic").on("click", e => {
    if (player.isMuted()) {
      player.unMute();
      $(".player__volume-button").css({
        left: `${posVolumePercent}%`
      });
      player.setVolume(posVolumePercent);
    } else {
      player.mute();
      $(".player__volume-button").css({
        left: 0
      });
    }
  });
}, 2000);