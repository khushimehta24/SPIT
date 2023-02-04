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

export default { getNews, ex1 }