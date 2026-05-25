import axios from "axios";

const baseUrl =  process.env.BASE_URL || 'http://localhost:4000';

export default function API({
    url = baseUrl,
    api,
    data,
    method
}) {
    return axios({
        method,
        data,
        url: `${url}/${api}`
    })
}