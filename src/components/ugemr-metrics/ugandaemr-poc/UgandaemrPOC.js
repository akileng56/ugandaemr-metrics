import React, {useEffect, useState} from 'react';
import "./UgandaemrPOC.css";
import { CheckmarkOutline, Store, DevicesApps, GroupPresentation, UserMultiple } from "@carbon/react/icons"
import "@carbon/charts/styles.css";
import { DataTableComponent } from "../../data-table/data-table.component";
import ViewButton from "../../home/view-button";
import {emrVersion, fourXheaders} from "../../../constants";
import dayjs from "dayjs";
import { DateFilterInput } from "../../date-picker/date-picker";
import {
  facilityDetailsPlus,
  uniqueFacilityByUUID
} from "../ugandaemr-coverage/functions"

const UgandaemrPOC = (props) => {
  const [data, setData] = useState([]);
  const currentDate = new Date();
  const [dateArray, setDateArray] = useState([currentDate, currentDate]);
  const handleOnChangeRange = (dates) => {
    setDateArray(dates);
  };

  const updateDashboardMetrics = () => {
    fetchData();
  };

  const fetchData = async () => {
    const from = dayjs(dateArray[0]).format("YYYY-MM-DD")
    const to = dayjs(dateArray[1]).format("YYYY-MM-DD")
    try {
      const response = await fetch(`https://ugisl.mets.or.ug/metrics?and=(daterun.gte.${from},daterun.lte.${to})`);
      if (!response.ok) {
        console.error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const recordsCaptured = () => {
    let count = 0;
    data?.forEach((record) => {
      const triage = record?.value?.dataentry?.[0]?.['Triage'] ?? 0;
      const clinician = record?.value?.dataentry?.[0]?.['Clinician'] ?? 0;
      const lab = record?.value?.dataentry?.[0]?.['Lab'] ?? 0;
      const pharmacy = record?.value?.dataentry?.[0]?.['Pharmacy'] ?? 0;

      count += (triage + clinician + lab + pharmacy);
    });

    return count;
  }

  const vlExchange = () => {
    let count = 0;
    data?.forEach((record) => {
      const vlSent = record?.value?.dataentry?.[0]?.['VL exchange send sample'] ?? 0
      const vlReceived = record?.value?.dataentry?.[0]?.['VL exchange receive'] ?? 0
      if (vlSent > 0 || vlReceived > 0) {
        count += 1;
      }
    });

    return count;
  }

  const facilityDetails = () => {
    const facility = [];
    let count = 0;
    data?.forEach((record, index) => {
      if (record?.emrversion !== "4.0.0-SNAPSHOT") {
        const latestRecord = record?.value?.poc_service_metrics;
        facility.push({
          id: `${index++}`,
          facility: record?.facilityname,
          version: record?.emrversion,
          triage: latestRecord?.triage,
          clinician: latestRecord?.clinician,
          lab: latestRecord?.lab,
          pharmacy: latestRecord?.pharmacy,
          counselor:latestRecord?.counselor
        })
        count += latestRecord?.triage ?? 0;
      }
    });

    return {
      facility: facility,
      dataEntryCount:  count
    };
  }
  const facilityDetailsPlus = () => {
    const facility = [];
    let count = 0;
    const ugandaEMRPlusFacilities = data.filter((facility) => facility?.emrversion === "4.0.0-SNAPSHOT");
    const uniqueFacilities = uniqueFacilityByUUID(ugandaEMRPlusFacilities);
    uniqueFacilities.forEach((uniqueFacility, index) => {

      let triage = 0, clinician = 0 , lab = 0, pharmacy = 0, vlSent = 0, vlReceived = 0;
      const dataForFacility = ugandaEMRPlusFacilities.filter((facility) => facility?.sourceid === uniqueFacility?.sourceid);
      dataForFacility.forEach((dataFacility) => {
        triage += dataFacility?.value?.dataentry?.[0]?.['Triage'] ?? 0;
        clinician += dataFacility?.value?.dataentry?.[0]?.['Clinician'] ?? 0;
        lab += dataFacility?.value?.dataentry?.[0]?.['Lab'] ?? 0;
        pharmacy += dataFacility?.value?.dataentry?.[0]?.['Pharmacy'] ?? 0;
        vlSent += dataFacility?.value?.dataentry?.[0]?.['VL exchange send sample'] ?? 0;
        vlReceived += dataFacility?.value?.dataentry?.[0]?.['VL exchange receive'] ?? 0;
      });

      facility.push({
        id: `${index++}`,
        no: `${index++}`,
        facility: uniqueFacility?.facilityname,
        triage: triage,
        clinician: clinician,
        lab: lab,
        pharmacy: pharmacy,
        vlSent: vlSent,
        vlReceived: vlReceived
      })
    });

    return { facility, count: uniqueFacilities?.length };
  }

  useEffect(() => {
    fetchData();
  }, []);

    return (
      <>

        <div className="switcher-date-container">
          <div></div>
          <div className="date-container-width date-input-container">
            <DateFilterInput
              handleOnChangeRange={handleOnChangeRange}
              updateDashboard={updateDashboardMetrics}
              dateValue={dateArray}
            />
          </div>
        </div>
          <div className="tile-container">
          <div className="tile tile-margin">
            <div className="tile-header">
              <div className="tile-items-container">
                <div className="tile-icon"><DevicesApps size={50}/></div>
                <div> UgandaEMR+ </div>
              </div>
            </div>
            <div className="emr-details-table">
              <table>
                <tbody>
                <tr>
                  <td>Version:</td>
                  <td className="emr-version"> {emrVersion}
                    <CheckmarkOutline size={15}/></td>
                </tr>
                <tr>
                  <td>Tools:</td>
                  <td> 8</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="tile tile-margin">
            <div className="tile-header">
              <div className="tile-items-container">
                <div className="tile-icon"><Store size={50}/></div>
                <div> POC Facilities</div>
              </div>
              <div className="tile-bottom-style">
                <div className="tile-item-value"> {facilityDetailsPlus().count}</div>
                <ViewButton/>
              </div>
            </div>
          </div>
          <div className="tile tile-margin">
            <div className="tile-header">
              <div className="tile-items-container">
                <div className="tile-icon"><GroupPresentation size={50}/>
                </div>
                <div>Patient Served</div>
              </div>
              <div className="tile-bottom-style">
                <div className="tile-item-value"> {recordsCaptured()} </div>
                <ViewButton/>
              </div>
            </div>
          </div>
          <div className="tile">
            <div className="tile-header">
              <div className="tile-items-container">
                <div className="tile-icon"><UserMultiple size={50}/></div>
                <div> Data Entry Statistics</div>
              </div>
              <div className="tile-bottom-style">
                <div
                  className="tile-item-value"> {recordsCaptured() + facilityDetails().dataEntryCount} </div>
                <ViewButton/>
              </div>
            </div>
          </div>
        </div>

        <div className="item-chart-container">
          <div className="item-chart">
            <div className="cds--cc--title">
              <p className="title" role="heading" aria-level="2">
                UgandaEMR+
                ({dayjs(dateArray[0]).format("DD/MMM/YYYY")} - {dayjs(dateArray[1]).format("DD/MMM/YYYY")})
              </p>
            </div>
            <DataTableComponent rows={facilityDetailsPlus().facility}
                                headers={fourXheaders} indicator={true} showDownload={facilityDetailsPlus().count > 0}/>
          </div>
        </div>
      </>
    );
};

export default UgandaemrPOC;
