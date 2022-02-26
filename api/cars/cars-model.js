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

  async function create(car){
    const [vin] = await db("cars").insert(car)
    return getById(vin)
  }

  function getByVin(vin){
    return db("cars").where("vin",vin).first()
  }