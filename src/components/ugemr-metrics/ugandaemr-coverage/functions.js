export const facilityDetailsPlus = (data) => {
  const facility = [];
  let count = 0;
  // const uniqueFacilities = uniqueFacilityByUUID(data);
  data?.forEach((record, index) => {
    facility.push({
      id: `${index++}`,
      no: `${index++}`,
      facility_id: record?.sourceid,
      facility: record?.facilityname,
      version:record?.emrversion,
      level: record?.ftype,
      district: record?.district,
      ip: record?.ip,
      agency: record?.agency,
      functionality: record?.poc_active === 1 ? "POC" : "Retrospective",
      active: record?.off_last_3_days === 0 ? "Yes" : "No",
      long: record?.long,
      lat: record?.lat,
      date: record?.created,
    });

    count += 1;
  });

  return { facility,count, total: data?.length };
};

export const coverageByPartner = (data, agency) => {
  const facilities = data?.filter((item) => item?.agency === agency);
  const uniqueIPs = getUniqueIP(facilities);
  const coverageByAgency = [];

  uniqueIPs?.map((selectedIP) => {
    const POCFacilities = facilities?.filter((item) => item?.ip === selectedIP?.ip && item?.poc_active === 1);
    const RDEFacilities = facilities?.filter((item) => item?.ip === selectedIP?.ip && item?.poc_active === 0);
    coverageByAgency.push({
      group: "POC",
      key: selectedIP?.ip,
      value: POCFacilities?.length ?? 0
    });

    coverageByAgency.push({
      group: "Retrospective",
      key: selectedIP?.ip,
      value: RDEFacilities?.length ?? 0
    });
  });

  return {
    facilities: coverageByAgency,
    totalCount: facilities?.length
  };
}

export const coverageMechanism = (data, agency) => {
  const facilities = data?.filter((item) => item?.agency === agency);

  return { totalCount: facilities?.length }
}

export const coverageByLevel = (data) => {
  const uniqueFacilityLevels = getUniqueLevels(data);
  const coverageLevelStacked = [];
  const coverageLevelPie = [];

  uniqueFacilityLevels?.map((selectedFacility) => {
    const POCFacilities = data?.filter((item) => item?.ftype === selectedFacility?.ftype && item?.poc_active === 1);
    const RDEFacilities = data?.filter((item) => item?.ftype === selectedFacility?.ftype && item?.poc_active === 0);
    coverageLevelStacked.push({
      group: "POC",
      key: selectedFacility?.ftype,
      value: POCFacilities?.length ?? 0
    });

    coverageLevelStacked.push({
      group: "Retrospective",
      key: selectedFacility?.ftype,
      value: RDEFacilities?.length ?? 0
    });

    coverageLevelPie.push({
      group: selectedFacility.ftype,
      value: data?.filter((item) => item?.ftype === selectedFacility.ftype)?.length ?? 0
    })
  });

  return {
    stackedData: coverageLevelStacked,
    pieData:coverageLevelPie
  };
}


export function getUniqueIP(IPCategoryArray){
  const uniqueIPCategory = new Set(
    IPCategoryArray?.map((IPCategory) => IPCategory?.ip).filter((ip) => ip !==null)
  );

  const newIPCategoryArray = Array.from(
    uniqueIPCategory
  ).map((ip) => {
      return IPCategoryArray?.find((item) => item.ip === ip);
    })
    .filter((item) => !!item);

  return newIPCategoryArray;
}

export function getUniqueLevels(facilityArray){
  const uniqueFacilityLevel = new Set(
    facilityArray?.map((facility) => facility?.ftype).filter((ftype) => ftype !== null)
  );

  const newFacilityLevel = Array.from(
    uniqueFacilityLevel
  ).map((ftype) => {
    return facilityArray?.find((item) => item.ftype === ftype);
  }).filter((item) => !!item);

  return newFacilityLevel;
}


export function facilityByFunctionality(data) {
  const facilities = facilityDetailsPlus(data).facility;
  const POCFacilities = facilities.filter((facility) => facility?.functionality === "POC");
  const RDEFacilities = facilities.filter((facility) => facility?.functionality === "Retrospective");

  return {
    POC: POCFacilities?.length,
    RDE: RDEFacilities?.length
  }
}

export function uniqueFacilityByUUID (data) {
  const seen = new Set();

  return data.filter(item => {
    const duplicate = seen.has(item?.sourceid);
    seen.add(item?.sourceid);
    return !duplicate;
  });
}

export const coverageOthers = (data, allFacilities) => {
  const CDC_Upgraded = coverageByPartner(data, "CDC").totalCount;
  const totalCDC = coverageMechanism(allFacilities,"CDC").totalCount;

  const USAID_Upgraded = coverageByPartner(data, "USAID").totalCount;
  const totalUSAID = coverageMechanism(allFacilities,"USAID").totalCount;

  const DOD_Upgraded = coverageByPartner(data, "DOD").totalCount;
  const totalDOD = coverageMechanism(allFacilities,"DOD").totalCount;

  const others_Upgraded = data?.length - (CDC_Upgraded + USAID_Upgraded + DOD_Upgraded);
  const totalOthers = allFacilities?.length - (totalCDC + totalUSAID + totalDOD);

  return {others_Upgraded, totalOthers};
}
