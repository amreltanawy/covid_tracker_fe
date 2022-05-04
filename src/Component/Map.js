import React, {useState} from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup } from 'react-leaflet'
import geoData from '../map.geo.json';
export default (props) => {

    const [onselect, setOnselect] = useState({});
    const mapStyle = {
        height: '55vh',
        width: '100%',
        margin: '0 auto',
        zIndex: 0
    }

    const mapPolygonColorToDensity=(density => {
        return density > 15
            ? '#a50f15'
            : density > 12
                ? '#de2d26'
                : density > 9
                    ? '#fb6a4a'
                    : density > 6
                        ? '#fc9272'
                        : density > 3
                            ? '#fcbba1'
                            : '#fee5d9';
    })

    const style = (feature => {
        return ({
            fillColor: mapPolygonColorToDensity(feature.properties.Desnity),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
    const resetHighlight= (e =>{
        setOnselect({});
        e.target.setStyle(style(e.target.feature));
    });

    const highlightFeature = (e=> {
        var layer = e.target;

        layer.setStyle({
            weight: 1,
            color: "white",
            fillOpacity: 1
        });
    });

    const onEachFeature= (feature, layer)=> {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }
    return (
        <MapContainer style={{ height: "50vh", width: "100%", zIndex:0 }} center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            />
            <GeoJSON
                attribution="&copy; credits due..."
                data={geoData}
                style={style}
                onEachFeature={onEachFeature}
            />

        </MapContainer>
    )
}