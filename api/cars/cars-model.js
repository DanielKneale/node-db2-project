const db = require('../../data/db-config');

module.exports = {
    getAll,
    getById,
    create,
    getByVin
  };

  function getAll() {
    return db('cars');
  }

  function getById(id) {
    return db('cars')
      .where({ id })
      .first();
  }

  function create(car) {
    return db('cars')
      .insert(car)
      .then(ids => {
        return getById(ids[0]);
      });
  }

  function getByVin(vin) {
    return db("cars").where("vin",vin).first()
  }