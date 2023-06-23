const { Diet } = require(`../db.js`)

//Esta funcion es llamada desde la funcion getAll(), se usa para hacer un llenado inicial de la tabla diets de DB
const initialSave = async () => {
  const initialState = [
    { name: "Gluten Free" },
    { name: "Ketogenic" },
    { name: "Vegetarian" },
    { name: "Lacto-Vegetarian" },
    { name: "Ovo-Vegetarian" },
    { name: "Vegan" },
    { name: "Pescetarian" },
    { name: "Paleo" },
    { name: "Primal" },
    { name: "Low FODMAP" },
    { name: "Whole30" },
  ];

  //El metodo bulkCreate() registra en DB todo el contenido de un array, en este caso es initialState
  const data = await Diet.bulkCreate( initialState ); 
  return data;
};

//Esta funcion retorna todos los diets que tenga en base de datos, si la tabla esta vacia hace un llenado inicial
const getAll = async () => {
  const diets = await Diet.findAll();

  if ( !diets.length ) {
    //Si esta vacio llena la Diet de DB con un array inicial y lo retorna
    return await initialSave();
  } else {
    //Si tiene contenido lo retorna
    return diets;
  }
};

module.exports = { getAll };