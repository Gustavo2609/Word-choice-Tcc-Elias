exports.up = function(knex) {
    return knex.schema.createTable('user', function (table){
      table.increments();
      table.string('NameUser').notNullable();
      table.string('Email').notNullable();
      table.string('Password').notNullable(); 
      table.string('NameFolder').notNullable(); 
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('user');
  };
  