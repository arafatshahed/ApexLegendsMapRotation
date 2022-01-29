function getBRImageName(t1){
    t1 = t1.slice(0, (t1.length-9));
    var i = t1.indexOf("_") + 1;
    const t2 = t1.charAt(0).toUpperCase() + t1.slice(1, i) + t1.charAt(i).toUpperCase() + t1.slice(i+1, t1.length)+".png";
    var t3 = "https://apexlegendsstatus.com//assets//maps//"+t2;
    return t3;
}
function getARImageName(t1){
    t1 = t1.replaceAll(' ', '_');
    var i = t1.indexOf("_") + 1;
    const ts = "Arena_" + t1.slice(0, i) + t1.charAt(i).toUpperCase() + t1.slice(i+1, t1.length)+".png";


    console.log(ts)
    var t3 = "https://apexlegendsstatus.com//assets//maps//"+ts;
    return t3;
}
function getTime(s1, s2){
    s1 = s1.slice(10, 16);
    s2 = s2.slice(10, 16);
    var rs = "From " + s1 + " To " + s2 + " UTC.";
    return rs;
}
async function getMapApi() {
    const jsonFormatData = await fetch(
        "https://api.mozambiquehe.re/maprotation?version=2&auth=6lfxuOGGI4GDqmSdHvqw"
    );
    const jsFormatData = await jsonFormatData.json();
    document.getElementById("cbr").innerHTML = jsFormatData.battle_royale.current.map;
    document.getElementById("cbrRem").innerHTML = jsFormatData.battle_royale.current.remainingTimer;
    document.getElementById("currBR").style.backgroundImage = "url(" + jsFormatData.battle_royale.current.asset + ")";
    var rs = getTime(jsFormatData.battle_royale.current.readableDate_start, jsFormatData.battle_royale.current.readableDate_end);
    document.getElementById("cbrTime").innerHTML = rs;

    document.getElementById("nbr").innerHTML = jsFormatData.battle_royale.next.map;
    var nbrImage = getBRImageName(jsFormatData.battle_royale.next.code);
    document.getElementById("nextBR").style.backgroundImage = "url(" + nbrImage + ")";
    var rs = getTime(jsFormatData.battle_royale.next.readableDate_start, jsFormatData.battle_royale.next.readableDate_end);
    document.getElementById("nbrTime").innerHTML = rs;

    document.getElementById("car").innerHTML = jsFormatData.arenas.current.map;
    document.getElementById("carRem").innerHTML = jsFormatData.arenas.current.remainingTimer;
    document.getElementById("currAR").style.backgroundImage = "url(" + jsFormatData.arenas.current.asset + ")";
    var rs = getTime(jsFormatData.arenas.current.readableDate_start, jsFormatData.arenas.current.readableDate_end);
    document.getElementById("carTime").innerHTML = rs;

    document.getElementById("nar").innerHTML = jsFormatData.arenas.next.map;
    var narImage = getARImageName(jsFormatData.arenas.next.map);
    console.log(narImage)
    document.getElementById("nextAR").style.backgroundImage = "url(" + narImage + ")";
    var rs = getTime(jsFormatData.arenas.next.readableDate_start, jsFormatData.arenas.next.readableDate_end);
    document.getElementById("narTime").innerHTML = rs;

    document.getElementById("brRank").innerHTML = jsFormatData.ranked.current.map;
    document.getElementById("rankBR").style.backgroundImage = "url(" + jsFormatData.ranked.current.asset + ")";

    document.getElementById("carr").innerHTML = jsFormatData.arenasRanked.current.map;
    document.getElementById("carrRem").innerHTML = jsFormatData.arenasRanked.current.remainingTimer;
    document.getElementById("currArRank").style.backgroundImage = "url(" + jsFormatData.arenasRanked.current.asset + ")";
    var rs = getTime(jsFormatData.arenasRanked.current.readableDate_start, jsFormatData.arenasRanked.current.readableDate_end);
    document.getElementById("carrTime").innerHTML = rs;

    document.getElementById("narr").innerHTML = jsFormatData.arenasRanked.next.map;
    var narImage = getARImageName(jsFormatData.arenasRanked.next.map);
    document.getElementById("nextArRank").style.backgroundImage = "url(" + narImage + ")";
    var rs = getTime(jsFormatData.arenasRanked.next.readableDate_start, jsFormatData.arenasRanked.next.readableDate_end);
    document.getElementById("narrTime").innerHTML = rs;
    
}
setInterval(getMapApi, 1000)
