var host = "https://arafatshahed.github.io/ApexLegendsMapRotation/images/assets/";
var ar = 0,
    brc = 0,
    arr = 0;

function getBRImageName(t1) {
    t1 = t1.slice(0, (t1.length - 9));
    var i = t1.indexOf("_") + 1;
    const t2 = host + t1.charAt(0).toUpperCase() + t1.slice(1, i) + t1.charAt(i).toUpperCase() + t1.slice(i + 1, t1.length) + ".jpg";
    return t2;
}

function getARImageName(t1) {
    t1 = t1.replaceAll(' ', '_');
    var i = t1.indexOf("_") + 1;
    const ts = host + "Arena_" + t1.slice(0, i) + t1.charAt(i).toUpperCase() + t1.slice(i + 1, t1.length) + ".jpg";

    console.log(ts)
    return ts;
}

function getTime(s1, s2) {
    s1 = s1.slice(10, 16);
    s2 = s2.slice(10, 16);
    var rs = "From " + s1 + " To " + s2 + " UTC.";
    return rs;
}

function setCurrentBRMap(jsFormatData) {
    console.log("setCurrentBRMap");
    document.getElementById("cbr").innerHTML = jsFormatData.battle_royale.current.map;
    var cbrImage = getBRImageName(jsFormatData.battle_royale.current.code);
    document.getElementById("currBR").style.backgroundImage = "url(" + cbrImage + ")";
    var rs = getTime(jsFormatData.battle_royale.current.readableDate_start, jsFormatData.battle_royale.current.readableDate_end);
    document.getElementById("cbrTime").innerHTML = rs;
}

function setNextBRMap(jsFormatData) {
    document.getElementById("nbr").innerHTML = jsFormatData.battle_royale.next.map;
    var nbrImage = getBRImageName(jsFormatData.battle_royale.next.code);
    document.getElementById("nextBR").style.backgroundImage = "url(" + nbrImage + ")";
    var rs = getTime(jsFormatData.battle_royale.next.readableDate_start, jsFormatData.battle_royale.next.readableDate_end);
    document.getElementById("nbrTime").innerHTML = rs;
}

function setCurrentBRRankMap(jsFormatData) {
    document.getElementById("brRank").innerHTML = jsFormatData.ranked.current.map;
    var cbrImage = jsFormatData.ranked.current.map;
    cbrImage = cbrImage.replaceAll(' ', '_');
    const t1 = host + cbrImage + ".jpg";
    document.getElementById("rankBR").style.backgroundImage = "url(" + t1 + ")";
}

function setCurrentArenaMap(jsFormatData) {
    document.getElementById("car").innerHTML = jsFormatData.arenas.current.map;
    var narImage = getARImageName(jsFormatData.arenas.current.map);
    document.getElementById("currAR").style.backgroundImage = "url(" + narImage + ")";
    var rs = getTime(jsFormatData.arenas.current.readableDate_start, jsFormatData.arenas.current.readableDate_end);
    document.getElementById("carTime").innerHTML = rs;
}

function setNextArenaMap(jsFormatData) {
    document.getElementById("nar").innerHTML = jsFormatData.arenas.next.map;
    var narImage = getARImageName(jsFormatData.arenas.next.map);
    document.getElementById("nextAR").style.backgroundImage = "url(" + narImage + ")";
    var rs = getTime(jsFormatData.arenas.next.readableDate_start, jsFormatData.arenas.next.readableDate_end);
    document.getElementById("narTime").innerHTML = rs;
}

function setCurrentArenaRankedMap(jsFormatData) {
    document.getElementById("carr").innerHTML = jsFormatData.arenasRanked.current.map;
    var narImage = getARImageName(jsFormatData.arenasRanked.current.map);
    document.getElementById("currArRank").style.backgroundImage = "url(" + narImage + ")";
    var rs = getTime(jsFormatData.arenasRanked.current.readableDate_start, jsFormatData.arenasRanked.current.readableDate_end);
    document.getElementById("carrTime").innerHTML = rs;
}

function setNextArenaRankedMap(jsFormatData) {
    document.getElementById("narr").innerHTML = jsFormatData.arenasRanked.next.map;
    var narImage = getARImageName(jsFormatData.arenasRanked.next.map);
    document.getElementById("nextArRank").style.backgroundImage = "url(" + narImage + ")";
    var rs = getTime(jsFormatData.arenasRanked.next.readableDate_start, jsFormatData.arenasRanked.next.readableDate_end);
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
        "https://api.mozambiquehe.re/maprotation?version=5&auth=6lfxuOGGI4GDqmSdHvqw"
    );
    jsFormatData = await jsonFormatData.json();
    brc = jsFormatData.battle_royale.current.remainingSecs;
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
        "https://api.mozambiquehe.re/maprotation?version=5&auth=6lfxuOGGI4GDqmSdHvqw"
    );
    const jsFormatData = await jsonFormatData.json();
    getMapApi();
    setCurrentBRMap(jsFormatData);
    setNextBRMap(jsFormatData);
    setCurrentBRRankMap(jsFormatData);
    setCurrentArenaMap(jsFormatData);
    setNextArenaMap(jsFormatData);
    setCurrentArenaRankedMap(jsFormatData);
    setNextArenaRankedMap(jsFormatData);
}
getDataFromApi();