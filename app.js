var ar = 0,
    brc = 0,
    arr = 0;

var apiKey = getApiKey();

function getBRImageName(t1) {
    t1 = t1.slice(0, (t1.length - 9));
    var t2
    var i = t1.indexOf("_") + 1;
    if (t1.indexOf("_") == -1) {
        t2 = "./assets/images/" + t1.slice(1, i) + t1.charAt(i).toUpperCase() + t1.slice(i + 1, t1.length) + ".jpg";
    } else {
        t2 = "./assets/images/" + t1.charAt(0).toUpperCase() + t1.slice(1, i) + t1.charAt(i).toUpperCase() + t1.slice(i + 1, t1.length) + ".jpg";
    }

    return t2;
}

function getARImageName(t1) {
    t1 = t1.replaceAll(' ', '_');
    var i = t1.indexOf("_") + 1;
    const ts = "./assets/images/" + "Arena_" + t1.slice(0, i) + t1.charAt(i).toUpperCase() + t1.slice(i + 1, t1.length) + ".jpg";
    console.log(ts)
    return ts;
}

function getTime(ms1, ms2) {
    ms1 *= 1000;
    ms2 *= 1000;
    var msd1 = new Date(ms1);
    var d1 = msd1.toString();
    var d2 = d1.slice(16, 21);
    var msd2 = new Date(ms2);
    var d3 = msd2.toString();
    var d4 = d3.slice(16, 21) + d3.slice(24, 33);
    var rs = "From " + d2 + " To " + d4;
    return rs;
}

function setCurrentBRMap(jsFormatData) {
    console.log("setCurrentBRMap");
    document.getElementById("cbr").innerHTML = jsFormatData.battle_royale.current.map;
    var cbrImage = getBRImageName(jsFormatData.battle_royale.current.code);
    document.getElementById("currBR").style.backgroundImage = "url(" + cbrImage + ")";
    var rs = getTime(jsFormatData.battle_royale.current.start, jsFormatData.battle_royale.current.end);
    document.getElementById("cbrTime").innerHTML = rs;
}

function setNextBRMap(jsFormatData) {
    // if (jsFormatData.battle_royale.next.map == jsFormatData.battle_royale.current.map) {
    //     document.getElementById("nextBR").style.display = "none";
    // }
    document.getElementById("nbr").innerHTML = jsFormatData.battle_royale.next.map;
    var nbrImage = getBRImageName(jsFormatData.battle_royale.next.code);
    document.getElementById("nextBR").style.backgroundImage = "url(" + nbrImage + ")";
    var rs = getTime(jsFormatData.battle_royale.next.start, jsFormatData.battle_royale.next.end);
    document.getElementById("nbrTime").innerHTML = rs;
}

function setCurrentBRRankMap(jsFormatData) {
    document.getElementById("brRank").innerHTML = jsFormatData.ranked.current.map;
    var cbrImage = jsFormatData.ranked.current.map;
    cbrImage = cbrImage.replaceAll(' ', '_');
    const t1 = "./assets/images/" + cbrImage + ".jpg";
    document.getElementById("rankBR").style.backgroundImage = "url(" + t1 + ")";
}

function setCurrentArenaMap(jsFormatData) {
    document.getElementById("car").innerHTML = jsFormatData.arenas.current.map;
    var narImage = getARImageName(jsFormatData.arenas.current.map);
    document.getElementById("currAR").style.backgroundImage = "url(" + narImage + ")";
    var rs = getTime(jsFormatData.arenas.current.start, jsFormatData.arenas.current.end);
    document.getElementById("carTime").innerHTML = rs;
}

function setNextArenaMap(jsFormatData) {
    document.getElementById("nar").innerHTML = jsFormatData.arenas.next.map;
    var narImage = getARImageName(jsFormatData.arenas.next.map);
    document.getElementById("nextAR").style.backgroundImage = "url(" + narImage + ")";
    var rs = getTime(jsFormatData.arenas.next.start, jsFormatData.arenas.next.end);
    document.getElementById("narTime").innerHTML = rs;
}

function setCurrentArenaRankedMap(jsFormatData) {
    document.getElementById("carr").innerHTML = jsFormatData.arenasRanked.current.map;
    var narImage = getARImageName(jsFormatData.arenasRanked.current.map);
    document.getElementById("currArRank").style.backgroundImage = "url(" + narImage + ")";
    var rs = getTime(jsFormatData.arenasRanked.current.start, jsFormatData.arenasRanked.current.end);
    document.getElementById("carrTime").innerHTML = rs;
}

function setNextArenaRankedMap(jsFormatData) {
    document.getElementById("narr").innerHTML = jsFormatData.arenasRanked.next.map;
    var narImage = getARImageName(jsFormatData.arenasRanked.next.map);
    document.getElementById("nextArRank").style.backgroundImage = "url(" + narImage + ")";
    var rs = getTime(jsFormatData.arenasRanked.next.start, jsFormatData.arenasRanked.next.end);
    document.getElementById("narrTime").innerHTML = rs;
}

function updateRem(jsFormatData) {
    console.log(brc)
    var brcRem = new Date(brc * 1000).toISOString().substr(11, 8);
    document.getElementById("cbrRem").innerHTML = brcRem;
    if (brc == 0) { // || jsFormatData.battle_royale.current.DurationInSecs - brc < 5
        setCurrentBRMap(jsFormatData);
        setNextBRMap(jsFormatData);
        getDataFromApi();
    }
    brc -= 1;
    var arRem = new Date(ar * 1000).toISOString().substr(11, 8);
    document.getElementById("carRem").innerHTML = arRem;
    if (ar == 0) { // || jsFormatData.arenas.current.DurationInSecs - ar < 5
        setCurrentArenaMap(jsFormatData);
        setNextArenaMap(jsFormatData);
        getDataFromApi();
    }
    ar -= 1;
    var arrRem = new Date(arr * 1000).toISOString().substr(11, 8);
    document.getElementById("carrRem").innerHTML = arrRem;
    if (arr == 0) { // || jsFormatData.arenasRanked.current.DurationInSecs - arr < 5
        setCurrentArenaRankedMap(jsFormatData);
        setNextArenaRankedMap(jsFormatData);
        getDataFromApi();
    }
    arr -= 1;

}



async function getMapApi() {
    const jsonFormatData = await fetch(
        "https://api.mozambiquehe.re/maprotation?version=5&auth=" + apiKey
    );
    jsFormatData = await jsonFormatData.json();
    // brc = jsFormatData.battle_royale.current.remainingSecs;
    ar = jsFormatData.arenas.current.remainingSecs;
    arr = jsFormatData.arenasRanked.current.remainingSecs;
    setInterval(updateRem, 1000, jsFormatData);
    console.log("getMapApi");
    if (brc == 0 || jsFormatData.battle_royale.current.DurationInSecs - brc < 5) {

        getMapApi();
    }

}
async function getDataFromApi() {
    const jsonFormatData = await fetch(
        "https://api.mozambiquehe.re/maprotation?version=5&auth=" + apiKey
    );
    const jsFormatData = await jsonFormatData.json();
    setCurrentBRMap(jsFormatData);
    setNextBRMap(jsFormatData);
    setCurrentBRRankMap(jsFormatData);
    setCurrentArenaMap(jsFormatData);
    setNextArenaMap(jsFormatData);
    setCurrentArenaRankedMap(jsFormatData);
    setNextArenaRankedMap(jsFormatData);
    getMapApi();
}
getDataFromApi();

function expand() {
    var content = document.getElementById("content");
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
}