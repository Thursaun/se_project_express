const handleError = (err, res) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: 'Validation failed. Check input fields.'});
  }
  if (err.name === "DocumentNotFoundError" || err.statusCode === 404) {
    return res.status(404).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).send({ message: 'Invalid ID format.'});
  }
  return res.status(500).send({ message: 'Internal server error'})
};


module.exports = handleError;