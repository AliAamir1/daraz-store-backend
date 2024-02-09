const filterRequestFields = (location, expectedFields) => {
  return (req, res, next) => {
    const filteredBody = {};
    expectedFields.forEach((field) => {
      if (req[location][field] !== undefined) {
        filteredBody[field] = req[location][field];
      }
    });
    req[location] = filteredBody;
    next();
  };
};

export { filterRequestFields };
