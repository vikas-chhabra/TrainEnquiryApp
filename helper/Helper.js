import 'whatwg-fetch';

export const baseUrl='http://indianrailapi.com/api/v2/';
export const apiKey = 'f346b4bb633aa1115a1677d918c39004';
export const liveStatusUrl = 'livetrainstatus/apikey/';
export const pnrStatusUrl = 'PNRCheck/apikey/';

const Helper=(url,method,body)=>{
    if(body!==undefined){
        return(
            fetch(baseUrl+url,{
                method:method,
                headers:{
                    'Content-Type':'application/json'
                },
                body:body
            })
            .then((response)=>{
                return response.json();
            })
            .catch((err)=>{
                return err;
            })
        );
    }
    else{
        return(
            fetch(baseUrl+url,{
                method:method,
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then((response)=>{
                return response.json();
            })
            .catch((err)=>{
                return err;
            })
        );
    }
}

export default Helper;