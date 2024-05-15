import React from 'react';
import "./Metrics.css";
import { CheckmarkOutline, Store, DevicesApps, GroupPresentation, UserMultiple } from "@carbon/react/icons"
import "@carbon/charts/styles.css";
import {DataTableComponent} from "../data-table.component";
import ViewButton from "../view-button";
import {fourXheaders, rows, threeXHeaders} from "../../constants";
import dayjs from "dayjs";

const Metrics = (props) => {
  const { metricsData, dates } = props;
  const recordsCaptured = () => {
    let count = 0;
    metricsData?.forEach((record) => {
        record?.value?.dataentry?.forEach((item) => {
            count += item?.numberOfEntries;
        });
    });

    return count;
  }

  const facilityDetails = () => {
    const facility = [];
    let count = 0;
    metricsData?.forEach((record, index) => {
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
    metricsData?.forEach((record, index) => {
      if (record?.emrversion === "4.0.0-SNAPSHOT") {
        let count = 0;
        record?.value?.dataentry?.forEach((item) => {
          count += item?.numberOfEntries;
        });

        facility.push({
          id: `${index++}`,
          facility: record?.facilityname,
          triage: 100,
          clinician: 50,
          lab: 0,
          pharmacy: 0,

        })
      }
    });

    return facility;
  }
    return (
        <>
          <div className="tile-container">
            <div className="tile tile-margin">
              <div className="tile-header">
                <div className="tile-items-container">
                  <div className="tile-icon"><DevicesApps size={50}/></div>
                  <div> UgandaEMR</div>
                </div>
              </div>
              <div className="emr-details-table">
                <table>
                  <tbody>
                  <tr>
                    <td>Version:</td>
                    <td className="emr-version"> {'4.0.0-SNAPSHOT'} <CheckmarkOutline size={15}/></td>
                  </tr>
                  <tr>
                    <td>Tools:</td>
                    <td> 8 </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="tile tile-margin">
              <div className="tile-header">
                <div className="tile-items-container">
                  <div className="tile-icon"><Store size={50}/></div>
                  <div> Health Facilities</div>
                </div>
                <div className="tile-bottom-style">
                  <div className="tile-item-value"> {metricsData?.length + rows.length }</div>
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
                  <div className="tile-item-value"> {recordsCaptured() + facilityDetails().dataEntryCount} </div>
                  <ViewButton/>
                </div>
              </div>
            </div>
          </div>

          <div className="item-chart-container">
            <div className="item-chart item-chart-left">
              <div className="cds--cc--title">
                <p className="title" role="heading" aria-level="2">
                  UgandaEMR+ ({dayjs(dates[0]).format("DD/MMM/YYYY")} - {dayjs(dates[1]).format("DD/MMM/YYYY")})
                </p>
              </div>
              <DataTableComponent rows={facilityDetailsPlus()} headers={fourXheaders} />
            </div>
            <div className="item-chart">
              <div className="cds--cc--title">
                <p className="title" role="heading" aria-level="2">
                  UgandaEMR 3.x ({dayjs(dates[0]).format("DD/MMM/YYYY")} - {dayjs(dates[1]).format("DD/MMM/YYYY")})
                </p>
              </div>
              <DataTableComponent rows={facilityDetails().facility} headers={threeXHeaders}/>
            </div>
          </div>
        </>
    );
};

export default Metrics;
