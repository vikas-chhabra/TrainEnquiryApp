import 'whatwg-fetch';
const baseUrl='http://indianrailapi.com/api/v2/';
export const apiKey = 'f346b4bb633aa1115a1677d918c39004'
const Helper=(url,method,body)=>{
    if(body!==undefined){
        console.log(baseUrl+url)
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
        console.log(baseUrl+url)
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