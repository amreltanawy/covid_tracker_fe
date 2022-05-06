import {POSITION_STACK_URL, POSITION_STACK_ACCESS, BACKEND_URL} from './env';
const fetchCountryFromCoordinates = async (geoLocationData) => {

    if (!geoLocationData || !geoLocationData.coords){
        throw Error("invalid location data");
    }
    let lat = geoLocationData.coords.latitude;
    let lon = geoLocationData.coords.longitude;
    let baseUrl = `${POSITION_STACK_URL}/reverse`;
    let query = `?access_key=${POSITION_STACK_ACCESS}&query=${lat},${lon}`
    let res = await fetch(`${baseUrl}${query}`)

    let result = await res.json();
    console.log("here is the fetched data", result);

    let {data} = result;
    if(!data || !data.length){
        console.error("received malformated object from positionstack",result)
       throw Error("invalid response")
    }
    return data[0].country.toLowerCase();
}

const genericCompare = (a,b) => {
    if(!a && !b) return 0;
    if(!a) return -1;
    if(!b) return 1;
    if(typeof a === "string"){
        a = a.toLowerCase();
        b = b.toLowerCase();
    }
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}


const getPaginatedData = (data = [],pageIndex,pageSize,sortField,sortDirection) =>{

    let pageOfItems = []
    let totalItemCount = data.length || 0;

    let sortingDirection = sortDirection === "asc"? 1 : -1;

    data.sort((a,b)=> sortingDirection * genericCompare(a[sortField],b[sortField]))

    pageOfItems = data.slice((pageIndex)*pageSize,(pageIndex+1)*pageSize);
    console.log("debugging getPaginated data",{data,pageOfItems})
    return {pageOfItems,totalItemCount}
}

const fetchTempratureData = async (accessToken) => {
   let response = await fetch(`${BACKEND_URL}/entries`);

   return await response.json();
}

const postTempratureDate = async (accessToken,data) => {
    let response = await fetch(`${BACKEND_URL}/entries`,{
        method:'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return await response.json();
}


export {
    fetchCountryFromCoordinates,
    getPaginatedData,
    fetchTempratureData,
    postTempratureDate
}