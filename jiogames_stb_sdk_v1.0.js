var self = this;
this.version = "1.1";
var firstAdDelay = false;

var adSpotInterstitial = "rjq45low";
var isAdReady = false;
var adSpotRewardedVideo = "";
var isRVReady = false;
var isRewardUser = false;
var package = "com.gamesfly.cricketworldcupjgstb";

function sendScore(score) {
    postScore(score);
    // jioGames.postScore(score);
}

function postScore(score) {
    if (!score) {
        console.log("Jiogames: postScore() no value ", score);
    }
    if (window.DroidHandler) {
        console.log("Jiogames: postScore() " + score);
        window.DroidHandler.postScore(score);
    }
}

function cacheAdMidRoll(adKeyId, source) {
    console.log("Jiogames: cacheAdMidRoll() adkeyId: " + adKeyId + " source: " + source + " DroidHandler " + window.DroidHandler);
    if (!adKeyId || !source) {
        adKeyId ? null : (console.log("Jiogames: cacheAdMidRoll() no adKeyId to cacheAd ", adKeyId));
        source ? null : (console.log("Jiogames: cacheAdMidRoll() no source to cacheAd ", source));
        return;
    }
    if (window.DroidHandler && !isAdReady) {
        window.DroidHandler.cacheAd(adKeyId, source);
    }
    if (!firstAdDelay) {
        setTimeout(function () {
            firstAdDelay = true;
        }, 20000);
    }
}

function cacheRewardedVideo(adKeyId, source) {
    console.log("Jiogames: cacheRewardedVideo() for ", adKeyId + " source: " + source + " DroidHandler " + window.DroidHandler);
    if (!adKeyId || !source) {
        adKeyId ? null : (console.log("Jiogames: cacheRewardedVideo() no adKeyId to cacheAd ", adKeyId));
        source ? null : (console.log("Jiogames: cacheRewardedVideo() no source to cacheAd ", source));
        return;
    }

    if (window.DroidHandler && !isRVReady) {
        window.DroidHandler.cacheAdRewardedVideo(adKeyId, source);
    }
}

function showAdMidRoll(adKeyId, source) {
    console.log("Jiogames: showAdMidRoll() adKeyId: " + adKeyId + " source " + source + " firstAdDelay " + firstAdDelay + " DroidHandler " + window.DroidHandler);
    if (!adKeyId || !source) {
        adKeyId ? null : (console.log("Jiogames: showAdMidRoll() no adKeyId to cacheAd ", adKeyId));
        source ? null : (console.log("Jiogames: showAdMidRoll() no source to cacheAd ", source));
        return;
    }
    if (window.DroidHandler && firstAdDelay && isAdReady) {
        window.DroidHandler.showAd(adKeyId, source);
    }
}

function showRewardedVideo(adKeyId, source) {
    console.log("Jiogames: showRewardedVideo() adKeyId: " + adKeyId + " source " + source + " DroidHandler " + window.DroidHandler);
    if (!adKeyId || !source) {
        adKeyId ? null : (console.log("Jiogames: showRewardedVideo() no adKeyId to cacheAd ", adKeyId));
        source ? null : (console.log("Jiogames: showRewardedVideo() no source to cacheAd ", source));
        return;
    }
    if (window.DroidHandler && isRVReady) {
        isRewardUser = false;
        window.DroidHandler.ShowRewardedVideo(adKeyId, source);
    }
}

document.addEventListener("visibilitychange", onVisibilityChanged, false);
function onVisibilityChanged() {
    if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden) {
        //Pause Game
        console.log("Jiogames: Pause Game");
    } else {
        //Resume Game	
        console.log("Jiogames: Resume Game");
    }
};

function getUserProfile() {
    if (window.DroidHandler) {
        window.DroidHandler.getUserProfile();
    }
}

window.onUserProfileResponse = function (message) {
    console.log("onUserProfileResponse" + [JSON.stringify(message)]);
};


window.onAdReady = function (adSpotKey) {

    adSpotKey == adSpotInterstitial && (isAdReady = true, console.log("JioGames: onAdReady MidRoll " + isAdReady));
    adSpotKey == adSpotRewardedVideo && (isRVReady = true, console.log("JioGames: onAdReady RewardedVideo " + isRVReady));
    c3_callFunction("adAvailable");
};
window.onAdClose = function (adSpotKey) {
    adSpotKey == adSpotInterstitial && (isAdReady = false, console.log("JioGames: onAdClose MidRoll " + isAdReady));
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, console.log("JioGames: onAdClose RewardedVideo " + isRVReady));
    if (adSpotKey == adSpotRewardedVideo && isRewardUser) {
        //Gratify User
        c3_callFunction("gratifyUser");
    }
};
window.onAdError = function (adSpotKey, errorMessage) {
    adSpotKey == adSpotInterstitial && (isAdReady = false, console.log("JioGames: onAdError MidRoll " + isAdReady + " errorMessage " + errorMessage));
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, console.log("JioGames: onAdError RewardedVideo " + isRVReady + " errorMessage " + errorMessage));
    c3_callFunction("onAdError");
};
window.OnAdError = function (adSpotKey, errorMessage) {
    adSpotKey == adSpotInterstitial && (isAdReady = false, console.log("JioGames: OnAdError MidRoll " + isAdReady + " errorMessage " + errorMessage));
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, console.log("JioGames: OnAdError RewardedVideo " + isRVReady + " errorMessage " + errorMessage));
    c3_callFunction("onAdError");
};

// doubt
window.onAdMediaEnd = function (adSpotKey, success, value) {
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, isRewardUser = true, console.log("JioGames: onAdMediaEnd RewardedVideo " + isRVReady));
};

// doubt
window.onAdPrepared = function (adSpotKey) {
    console.log("JioGames: onAdPrepared " + adSpotKey.toString());
    adSpotKey == adSpotInterstitial && (isAdReady = true, console.log("JioGames: onAdPrepared MidRoll " + isAdReady));
    adSpotKey == adSpotRewardedVideo && (isRVReady = true, console.log("JioGames: onAdPrepared RewardedVideo " + isRVReady));
};

window.onAdClosed = function (data, pIsVideoCompleted, pIsEligibleForReward) {
    var localData = data.split(",");
    var adSpotKey = data;
    var isVideoCompleted = pIsVideoCompleted;
    var isEligibleForReward = pIsEligibleForReward;

    if (localData != null && localData.length > 1) {
        adSpotKey = localData[0].trim();
        isVideoCompleted = Boolean(localData[1].trim());
        isEligibleForReward = Boolean(localData[2].trim());
    }


    adSpotKey == adSpotInterstitial && (isAdReady = false, console.log("JioGames: onAdClose MidRoll " + isAdReady));
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, console.log("JioGames: onAdClose RewardedVideo " + isRVReady));

    if (adSpotKey == adSpotRewardedVideo && isVideoCompleted) {
        isRewardUser = isEligibleForReward;
        GratifyReward();
        //Gratify User
    }
    console.log("JioGames: onAdClosed " + data.toString(), "localData " + localData[0] + " " + localData[1] + " " + localData[2]);
};

// ?
window.onAdFailedToLoad = function (data, pDescription) {
    var localData = data.split(",");
    var adSpotKey = data;
    var description = pDescription;

    if (localData != null && localData.length > 1) {
        adSpotKey = localData[0].trim();
        description = localData[1].trim();
    }

    adSpotKey == adSpotInterstitial && (isAdReady = false, console.log("JioGames: onAdFailedToLoad MidRoll " + isAdReady + " description " + description));
    adSpotKey == adSpotRewardedVideo && (isRVReady = false, console.log("JioGames: onAdFailedToLoad RewardedVideo " + isRVReady + " description " + description));
    console.log("JioGames: onAdFailedToLoad " + data.toString() + " localData " + localData[0] + " " + localData[1]);
};

window.onAdClick = function (adSpotKey) { };
window.onAdMediaCollapse = function (adSpotKey) { };
window.onAdMediaExpand = function (adSpotKey) { };
window.onAdMediaStart = function (adSpotKey) { };
window.onAdRefresh = function (adSpotKey) { };
window.onAdRender = function (adSpotKey) { };
window.onAdSkippable = function (adSpotKey) { };
window.onAdView = function (adSpotKey) { };



function GratifyReward() {
    c3_callFunction("gratifyUser");
    console.log("GratifyReward Game user here");
};

function gratifyUser() {
    return isRewardUser;
};

function cacheAd() {
    if (!isAdReady) {
        cacheAdMidRoll(adSpotInterstitial, package);
    }
}
function cacheRewardedAd() {
    if (!isRVReady) {
        cacheRewardedVideo(adSpotRewardedVideo, package);
    }
}
function showAd() {
    if (isAdReady) {
        showAdMidRoll(adSpotInterstitial, package);
    }
    else {
        c3_callFunction("midRollAdNotAvailable");
    }
}
function showRewardedAd() {
    if (isRVReady) {
        showRewardedVideo(adSpotRewardedVideo, package);
    }
    else {
        c3_callFunction("rvAdNotAvailable");
    }
}