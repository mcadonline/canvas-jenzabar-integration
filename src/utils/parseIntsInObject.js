export default obj => Object.entries(obj).reduce(
  (acc, [key, val]) => ({
    ...acc,
    [key]: /^-{0,1}\d+$/.test(val) ? Number.parseInt(val, 10) : val,
  }),
  {},
);
