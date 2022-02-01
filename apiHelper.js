function getApiKey() {
    var apikeys = ["6lfxuOGGI4GDqmSdHvqw", "m2pbuAyEKQ2X1e8ci96Y", "S37N0Vx3JA4ifDL8unq3", "4PXCb8hs9LUlWHYpOWHW", "EO3newH6HYWxxFb6lQGl", "2RPlQmEyCwN3EuXIXjDc", "lyPc4WEolzL4PRUzNtIE", "XgZ9mPawHp2S1btQ7Fbj", "BsGBP18ksTGRbrSDhFzq", "uUzLifV1Z7HIor4tb2Al"];
    var apiNum = Math.floor(Math.random() * (apikeys.length - 1));
    return apikeys[apiNum];
}