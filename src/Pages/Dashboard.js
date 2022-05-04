import React from 'react';
import PatientForm from '../Component/PatientForm';
import Map from '../Component/Map';

export default (props) => {


    return (
        <div className="dashBoardContainer">
            <div style={{position:"relative", width:'90vw', margin:"0 auto"}} className="mapContainer">
                <Map />
                <div style={{position:"absolute", zIndex:10,bottom:'10%', right:'5%'}}>
                    <PatientForm />
                </div>
            </div>
        </div>
    )
}