const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

const sortModes = {
  createdAsc: 0,
  createdDesc: 1,
  edittedAsc: 2,
  edittedDesc: 3,
};

export { timeZone, sortModes };
