import {POSITION_STACK_URL, POSITION_STACK_ACCESS} from './env';
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


export {fetchCountryFromCoordinates}