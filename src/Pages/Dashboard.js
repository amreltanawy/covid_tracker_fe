import React from 'react';
import {
    EuiSpacer,
    EuiPageTemplate} from "@elastic/eui";
import PatientForm from '../Component/PatientForm';
import Map from '../Component/Map';
import DataTable from "../Component/DataTable";

export default (props) => {

    let data = [
        {
            id: '1',
            name: 'john',
            country: 'egypt',
            temprature: 36,
            dateOfBirth: Date.now(),
            weight: 67,
            gender: "other",
            coordinates:{
                lon:35.1011,
                lat:-32.121
            }
        },
        {
            id: '1',
            name: 'amr',
            country: 'Tunisia',
            temprature: 35,
            dateOfBirth: Date.now(),
            weight: 67,
            gender: "other",
            coordinates:{
                lon:27.1011,
                lat:-32.121
            }
        },
        {
            id: '1',
            name: 'john',
            country: 'egypt',
            temprature: 36,
            dateOfBirth: Date.now(),
            weight: 67,
            gender: "other",
            coordinates:{
                lon:25.1011,
                lat:-32.121
            }
        },
        {
            id: '1',
            name: 'amr',
            country: 'Tunisia',
            temprature: 35,
            dateOfBirth: Date.now(),
            weight: 67,
            gender: "other",
            coordinates:{
                lon:31.1011,
                lat:-32.121
            }
        }
    ]

    return (
        <EuiPageTemplate
            restrictWidth={false}
            template="empty"
            pageHeader={{
                pageTitle: 'Dashboard',
            }}
        >
            <div style={{ width:'90vw', margin:"0 auto"}} className="dashBoardContainer">
            <div style={{position:"relative"}} className="mapContainer">
                <Map data={data} />
                <div style={{position:"absolute", zIndex:10,bottom:'10%', right:'5%'}}>
                    <PatientForm />
                </div>
            </div>
            <EuiSpacer />
            <div className="dashboardTable">
                <DataTable data={data} />
            </div>
        </div>
        </EuiPageTemplate>
    )
}