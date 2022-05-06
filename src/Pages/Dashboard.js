import React, {useEffect, useState} from 'react';
import {
    EuiSpacer,
    EuiPageTemplate} from "@elastic/eui";
import PatientForm from '../Component/PatientForm';
import Map from '../Component/Map';
import DataTable from "../Component/DataTable";
import {fetchTempratureData, postTempratureDate} from "../utils";
import {getAccessToken} from "../Services/AuthService";

export default (props) => {

    let [data, setData] = useState([])
    useEffect(()=>{
        fetchTempratureData(getAccessToken()).then((result)=>{
            setData(result);
        })
    },[])


    const onFormSubmit = async (formData) =>{
       let result =  await postTempratureDate(getAccessToken(),formData);

       console.log("post data result", result)
    }
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
                    <PatientForm  onSubmit={onFormSubmit}/>
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