exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable("cars",tbl=>{
    tbl.increments() //primary key
    tbl.string("vin",100).unique().notNullable()
    tbl.string("make",100).notNullable()
    tbl.string("model",100).notNullable()
    tbl.integer("mileage").notNullable()
    tbl.string("title",100)
    tbl.string("transmission",100)
    
})
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists("cars")
};
