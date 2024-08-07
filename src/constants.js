export const fourXheaders = [
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
    key: 'facility',
    header: 'Facility',
  },
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
