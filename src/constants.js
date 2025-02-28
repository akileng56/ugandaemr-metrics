import {
  BuildingInsights_2,
  Chat,
  Collaborate,
  DataCenter,
  Datastore,
  Db2Database,
  GroupAccess,
  IbmMq,
  LoadBalancerPool,
  LogicalPartition,
  Microscope,
  Product,
  Rss, Store,
} from "@carbon/react/icons";
export const fourXheaders = [
  {
    key: 'no',
    header: 'No',
  },
  {
    key: 'facility',
    header: 'Facility',
  },
  {
    key: 'triage',
    header: 'Triage',
  },
  {
    key: 'clinician',
    header: 'Clinician',
  },
  {
    key: 'lab',
    header: 'Lab',
  },
  {
    key: 'pharmacy',
    header: 'Pharmacy',
  },
  {
    key: 'vlSent',
    header: 'VL Sent',
  },
  {
    key: 'vlReceived',
    header: 'VL Results',
  }
];

export const threeXHeaders = [
  {
    key: 'facility',
    header: 'Facility',
  },
  {
    key: 'version',
    header: 'EMR Version',
  },
  {
    key: 'triage',
    header: 'Triage',
  },
  {
    key: 'clinician',
    header: 'Clinician',
  },
  {
    key: 'lab',
    header: 'Lab',
  },
  {
    key: 'pharmacy',
    header: 'Pharmacy',
  },
];

export const facilityHeaders = [
  {
    key: 'no',
    header: 'No',
  },
  {
    key: 'facility_id',
    header: 'Facility ID',
  },
  {
    key: 'facility',
    header: 'Facility Name',
  },
  {
    key: 'version',
    header: 'EMR Version',
  },
  {
    key: 'level',
    header: 'Level',
  },
  {
    key: 'district',
    header: 'District',
  },
  {
    key: 'ip',
    header: 'IP',
  },
  {
    key: 'agency',
    header: 'Agency',
  },
  {
    key: 'functionality',
    header: '(POC / RDE)',
  },
  {
    key: 'date',
    header: 'Last Updated',
  },
  {
    key: 'active',
    header: 'Active (Past 3 days)',
  }
];

export const donutEMRCoverageOptions = {
  title: "UgandaEMR+ Coverage",
  resizable: true,
  donut: {
    center: {
      label: "Facilities",
    },
  },
  height: "450px",
};

export const donutVLCoverageOptions = {
  title: "Viral Load Coverage",
  resizable: true,
  donut: {
    center: {
      label: "Total Facilities",
    },
  },
  color: {
    pairing: {
      option: 3
    }
  },
  height: "400px",
};


export const pieChartRDEPOCOptions = {
  title: "POC Vs Retrospective",
  resizable: true,
  height: "400px",
  color: {
    scale: {
      POC: "#009d9a",
      Retrospective: "#9f1853"
    }
  },
}

export const pieChartLevelsRDEPOCOptions = {
  title: "Coverage by Level (Pie)",
  resizable: true,
  height: "400px",
}

export const stackedChartByCDCPartners = {
  title: "Coverage By IP - CDC",
  axes: {
    left: {
      scaleType: "labels"
    },
    bottom: {
      stacked: true
    },
  },
  color: {
    scale: {
      POC: "#198038",
      Retrospective: "#ff832b"
    }
  },
  height: "500px"
};

export const stackedChartByUSAIDPartners = {
  title: "Coverage By IP - USAID",
  axes: {
    left: {
      scaleType: "labels",
    },
    bottom: {
      stacked: true
    },
  },
  height: "500px",
  color: {
    scale: {
      POC: "#005d5d",
      Retrospective: "#9f1853"
    }
  },
};

export const stackedChartByLevel = {
  title: "Coverage By Level (Stacked)",
  axes: {
    left: {
      scaleType: "labels"
    },
    bottom: {
      stacked: true
    }
  },
  height: "400px"
};

export const exchangeHeaders = [
  {
    key: 'no',
    header: 'No',
  },
  {
    key: 'created',
    header: 'DATE',
  },
  {
    key: 'tx_curr',
    header: 'TX_CURR',
  },
  {
    key: 'region',
    header: 'REGION',
  },
  {
    key: 'agency',
    header: 'AGENCY',
  },
  {
    key: 'fname',
    header: 'FACILITY NAME',
  },
  {
    key: 'mechanism',
    header: 'MECHANISM',
  },
  {
    key: 'is_hvol',
    header: 'HIGH VOLUME',
  },
  {
    key: 'hie_vl_program',
    header: 'VL',
  },
  {
    key: 'hie_cbs',
    header: 'DATA REPLICATION',
  },
  {
    key: 'hie_mortality',
    header: 'MORTALITY',
  },
  {
    key: 'hie_recency',
    header: 'RECENCY',
  },
  {
    key: 'hie_pirs',
    header: 'PIRS',
  },
  {
    key: 'hie_mpox',
    header: 'MPOX',
  },
  {
    key: 'emr_poc',
    header: 'EMR PoC',
  },
  {
    key: 'hie_ehmis',
    header: 'eHMIS',
  },
  {
    key: 'hie_art_access',
    header: 'ART ACCESS',
  },
  {
    key: 'his_emr_modules',
    header: 'HIS_EMR_MODULES',
  },
  {
    key: 'his_poc_data',
    header: 'HIS_POC_DATA',
  },
  {
    key: 'his_internet',
    header: 'HIS_INTERNET',
  },
  {
    key: 'his_hmis_emr',
    header: 'HIS_HMIS_EMR',
  }
];


export function getProfiles() {
  const profiles = [
    {
      uuid: "6aab2c93-0517-4aa0-82e8-dec9065f3f26",
      name: "CUMULATIVE",
      type: "fhirProfile",
      icon: <Store size={50} />,
      className: "first-carousel-item",
      total: 0,
      highVol: 0,
      lowVol: 0
    },
    {
      uuid: "6aab2c93-0517-4aa0-82e8-dec9065f3f26",
      name: "VIRAL LOAD",
      type: "fhirProfile",
      icon: <LoadBalancerPool size={40} />,
      hieName: "hf_vl",
      total: 0,
    },

    {
      uuid: "3e2de79f-1145-44db-ac4b-bcfb630f429a",
      name: "MORTALITY",
      type: "fhirProfile",
      icon: <Product size={40} />,
      hieName: "hf_mortality",
      total: 0,
    },
    {
      uuid: "3eec4bbc-702e-4669-9edb-412194021c44",
      name: "DATA REPLICATION",
      type: "fhirProfile",
      icon: <Rss size={40} />,
      className: "fourth-carousel-item",
      hieName: "hf_cbs",
      total: 0,
    },
    {
      uuid: "acfe0df4-8c9c-44af-8b3b-f80b960eb7c8",
      name: "RECENCY",
      type: "syncTask",
      icon: <Chat size={40} />,
      className: "fifth-carousel-item",
      hieName: "hf_recency",
      total: 0,
    },
    {
      uuid: "7c65ca72-343e-4e7b-9fd7-aa1d4d72bb0a",
      name: "ART ACCESS",
      type: "fhirProfile",
      icon: <GroupAccess size={35} />,
      hieName: "hf_art_access",
      total: 0,
    },
    {
      uuid: "cdec473b-90e0-4155-8b9d-677016f39dac",
      name: "PIRS",
      type: "fhirProfile",
      icon: <LogicalPartition size={35} />,
      hieName: "hf_pirs",
      total: 0,
    },
    {
      uuid: "47bb67f3-9acc-4e86-8400-b2a7b681f5f3",
      name: "eHMIS",
      type: "fhirProfile",
      icon: <DataCenter size={35} />,
      hieName: "hf_ehmis",
      total: 0,
    },
    {
      uuid: "dab00e39-9ac4-483e-b57e-421033293ebd",
      name: "MPOX",
      type: "fhirProfile",
      icon: <IbmMq size={35} />,
      className: "fifth-carousel-item",
      hieName: "hf_mpox",
      total: 0,
    },
  ];

  let maxIndex;
  if (profiles.length > 0) {
    const index = profiles.length / 6;
    const mod = profiles.length % 6;
    if (mod >= 1 && mod <= 5) {
      maxIndex = 1;
    } else {
      maxIndex = 6 - 1;
    }
  }

  return {
    exchangeProfiles: profiles,
    maxPosition: maxIndex,
  };
}

export const allHIEExchange = ["VL_PROGRAM_SEND","VL_REQUEST","VL_SEND","CRPDDP_SEND","MORTALITY","CBS","eHMIS","eCBSS","RECENCY"];

export const emrVersion = "4.0.3";
