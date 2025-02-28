import React, {useEffect, useState} from 'react';
import "../ugandaemr-poc/UgandaemrPOC.css";
import {
  CheckmarkOutline,
  Store,
  DevicesApps,
  GroupPresentation,
  UserMultiple,
  ChevronLeft, ChevronRight
} from "@carbon/react/icons"
import "@carbon/charts/styles.css";
import { DataTableComponent } from "../../data-table/data-table.component";
import {
  allHIEExchange,
  exchangeHeaders,
  getProfiles
} from "../../../constants";
import dayjs from "dayjs";
import { DateFilterInput } from "../../date-picker/date-picker"
import {ProfileCard} from "../../hie-helper-components/profile-card";
import {Button, Toggle} from "@carbon/react";
import "./ugandaemr-hie.css";

const UgandaemrHIE = (props) => {
  const [data, setData] = useState([]);
  const [tileData, setTileData] = useState([]);
  const currentDate = new Date();
  const [dateArray, setDateArray] = useState([currentDate, currentDate]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { exchangeProfiles, maxPosition } = getProfiles();
  const [maxIndex] = useState(maxPosition);
  const [profiles, setProfiles] = useState(exchangeProfiles);
  const [isReporting, setIsReporting] = useState(true);
  const handleOnChangeRange = (dates) => {
    setDateArray(dates);
  };

  const handleToggle = () => {
    setIsReporting(!isReporting);
  };

  const updateDashboardMetrics = () => {
    fetchData();
    fetchTileData();
  };

  const fetchData = async () => {
    const from = dayjs(dateArray[0]).format("YYYY-MM-DD")
    const to = dayjs(dateArray[1]).format("YYYY-MM-DD")
    try {
      let url = `https://ugisl.mets.or.ug/hie?or=(is_reporting.eq.0,and(created.gte.${from},created.lte.${to}))&order=is_reporting.desc,fname.asc,created.desc`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTileData = async () => {
    const from = dayjs(dateArray[0]).format("YYYY-MM-DD")
    const to = dayjs(dateArray[1]).format("YYYY-MM-DD")
    try {
      let url = `https://ugisl.mets.or.ug/get_hie_stats?start_date=${from}&end_date=${to}`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Network response was not ok');
      }
      const jsonData = await response.json();
      setTileData(jsonData);
    } catch (error) {
      console.error('Error fetching data for Tiles:', error);
    }
  };


  useEffect(() => {
    if (tileData && tileData.length) {
      const cum = tileData.filter((item) => item?.is_ugemr4x === 1 && item?.aggtype === 'CUM');
      const highVol = cum.filter((item) => item?.is_hvol === 1)?.[0]?.total;
      const lowVol = cum.filter((item) => item?.is_hvol === 0)?.[0]?.total;

      const CUR = tileData.filter((item) => item?.is_ugemr4x === 1 && item?.aggtype === 'CUR');
      const updatedProfiles = exchangeProfiles.map((profile) => {
        if (profile.name === 'CUMULATIVE') {
          profile.total = highVol + lowVol;
          profile.highVol = highVol;
          profile.lowVol = lowVol;
        } else {
          let count = 0;
          CUR?.map((currentItem) => count += currentItem[profile.hieName]);
          profile.total = count;
        }
        return profile;
      });
      setProfiles(updatedProfiles);
    }
  }, [tileData]);


  const facilityDetailsPlus = (reportingIndicator) => {
    const facility = [];
    let count = 0;
    let listOfFacilites = [];
    reportingIndicator === 1 ?
      listOfFacilites = data?.filter((item) => item?.is_reporting === reportingIndicator && item?.ugemr4x === reportingIndicator)
      : listOfFacilites = data?.filter((item) => item?.is_reporting === reportingIndicator);

    listOfFacilites?.forEach((facilityItem, index) => {
      if (facilityItem?.is_reporting === reportingIndicator) {
        facility.push({
          id: `${index++}`,
          no: `${index++}`,
          created: facilityItem?.created,
          fname: facilityItem?.fname,
          tx_curr: `${facilityItem?.tx_curr}`,
          region: facilityItem?.region,
          agency: facilityItem?.agency,
          mechanism: facilityItem?.mechanism,
          hie_vl_program: (facilityItem?.hie_vl_program_send + facilityItem?.hie_vl_request + facilityItem?.hie_vl_send),
          hie_cbs: facilityItem?.hie_cbs,
          hie_mortality: facilityItem?.hie_mortality,
          hie_recency: facilityItem?.hie_recency,
          hie_pirs: facilityItem?.hie_pirs,
          hie_mpox: facilityItem?.hie_mpox,
          emr_poc: facilityItem?.emr_poc,
          hie_ehmis: facilityItem?.hie_ehmis,
          hie_art_access: facilityItem?.hie_art_access,
          his_emr_modules: facilityItem?.his_emr_modules,
          his_poc_data: facilityItem?.his_poc_data,
          his_internet: facilityItem?.his_internet,
          his_hmis_emr: facilityItem?.his_hmis_emr,
          is_hvol: facilityItem?.is_hvol === 1 ? 'YES' : 'NO',
          is_reporting: facilityItem?.is_reporting
        })
      }
    });

    return {
      facilityList: facility,
      count: listOfFacilites?.length
    };
  }

  useEffect(() => {
    fetchData();
    fetchTileData();
  }, []);

  const moveRight = () => {
    let newIndex;
    if (currentIndex + 1 <= maxIndex) {
      newIndex = currentIndex + 1;
    } else {
      newIndex = currentIndex;
    }

    setCurrentIndex(newIndex);
  };

  const moveLeft = () => {
    let newIndex;
    if (currentIndex - 1 >= 0) {
      newIndex = currentIndex - 1;
    } else {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
  };

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

      <div className="four-div-carousel">
            <div className="carousel-container">
              <Button
                as="div"
                kind="ghost"
                className="carousel-left-control"
                hasIconOnly
                renderIcon={ChevronLeft}
                onClick={moveLeft}
              />
              <div className="carousel-right-control-div">
                <Button
                  as="div"
                  kind="ghost"
                  className="carousel-right-control"
                  hasIconOnly
                  renderIcon={ChevronRight}
                  onClick={moveRight}
                />
              </div>

              <div
                className="carousel-content"
                style={{transform: `translateX(-${currentIndex * 100}%)`}}
              >
                {profiles?.map((fhirProfile, index) => (
                  <div className={`carousel-item ${fhirProfile?.className ?? ""}`} key={index}>
                    <ProfileCard
                      profile={fhirProfile}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

      <div className="item-chart-container">
        <div className="item-chart">
          <div className="cds--cc--title hie-header-container">
            <p className="title" role="heading" aria-level="2">
             Health Information Exchange as Of
              ({dayjs(dateArray[0]).format("DD/MMM/YYYY")} - {dayjs(dateArray[1]).format("DD/MMM/YYYY")})
            </p>
            <Toggle
              aria-labelledby={`toggle-facilities`}
              labelA={`Facilities Not Reporting`}
              labelB={`Reporting Facilities`}
              defaultToggled={true}
              onToggle={handleToggle}
            />
          </div>
          {
            <DataTableComponent
              rows={facilityDetailsPlus(isReporting ? 1 : 0)?.facilityList}
              headers={exchangeHeaders} indicator={true}
              showDownload={true}
            />
          }
        </div>
      </div>
    </>
  );
};

export default UgandaemrHIE;
