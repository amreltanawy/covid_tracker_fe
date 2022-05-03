import React from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'

export default () => {

    return (
        <MapContainer style={{ height: "50vh", width: "90vw" }} center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

        </MapContainer>
    )
}