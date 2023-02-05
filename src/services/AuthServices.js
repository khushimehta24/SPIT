import httpCommon from "../http-common";

const login = (data) => {
    return httpCommon.post(`/accounts/login/`, data);
};

const signup = (data) => {
    return httpCommon.post(`/accounts/register/`, data);
};

const detect = (website) => {
    return httpCommon.get('https://wot-web-risk-and-safe-browsing.p.rapidapi.com/targets', {
        params: { t: website },
        headers: {
            'X-RapidAPI-Key': '8ebdc8094bmsh0d977148f10dbf0p12a2b3jsnbf63ef4780c1',
            'X-RapidAPI-Host': 'wot-web-risk-and-safe-browsing.p.rapidapi.com'
        }
    })
}

const details = (ip) => {
    return httpCommon.get(`https://ipinfo.io/${ip}?token=d2fce087e7fbe2`)
}

export default {
    login,
    signup, detect,
    details
}