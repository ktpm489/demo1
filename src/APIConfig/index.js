import axios from 'axios'

const BASE_URL = "https://makeup-uat.herokuapp.com/api/"
// const BASE_URL = 'http://192.168.10.8:3000/api/'

export async function get(url, params, header){
    try{
        const res = await axios({
            baseURL: BASE_URL,
            url: url,
            method: 'GET',
            params: params || {},
            headers: header || {}
        })

        console.log(`API get ${url} === `, res)

        return res.data
    }catch(e){
        console.log(`error gte ${url} === `, e)
        return e
    }
}

export async function post(url, data, header, params){
    try{
        const res = await axios({
            baseURL: BASE_URL,
            url: url,
            method: 'POST',
            params: params || {},
            headers: header || {},
            data: data || null
        })
        
        console.log(`API post ${url} === `, res)

        return res.data
    }catch(e){
        console.log(`error post ${url} === `, e)
        return e
    }
}