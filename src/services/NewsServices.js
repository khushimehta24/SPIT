import httpCommon from "../http-common";

const getNews = () => {
    return httpCommon.get(`https://newsdata2.p.rapidapi.com/news`, {
        params: { q: 'cyber security ' },
        headers: {
            'X-RapidAPI-Key': '8ebdc8094bmsh0d977148f10dbf0p12a2b3jsnbf63ef4780c1',
            'X-RapidAPI-Host': 'newsdata2.p.rapidapi.com'
        }
    })
}

const ex1 = () => {
    return httpCommon.get('https://03dc-125-99-120-242.in.ngrok.io/data-discover')
}

const ex2 = () => {
    return httpCommon.get('https://03dc-125-99-120-242.in.ngrok.io/data-discover2')
}

const ex3 = () => {
    return httpCommon.get('https://03dc-125-99-120-242.in.ngrok.io/data-discover3')
}

const C2 = () => {
    return httpCommon.get('https://03dc-125-99-120-242.in.ngrok.io/private')
}

const P2P = () => {
    return httpCommon.get('https://03dc-125-99-120-242.in.ngrok.io/internalp2p')
}

const malwareControl = () => {
    return httpCommon.get('https://03dc-125-99-120-242.in.ngrok.io/malware-control')
}

const infectedHost = () => {
    return httpCommon.get('https://03dc-125-99-120-242.in.ngrok.io/infected-host')
}
const botnet = () => {
    return httpCommon.get('https://03dc-125-99-120-242.in.ngrok.io/botnet-inside')
}

const lateralBrute = () => {
    return httpCommon.get('https://03dc-125-99-120-242.in.ngrok.io/lateral-brute')
}

const lateralSpy = () => {
    return httpCommon.get('https://03dc-125-99-120-242.in.ngrok.io/lateral-spy')
}
export default { getNews, ex1, ex2, ex3, C2, P2P,malwareControl,infectedHost,botnet,lateralBrute,lateralSpy }