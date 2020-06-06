// conexion a mysql
const mysql = require('mysql');

// configuracion de base de datos tkontrol
// Create a MySQL pool
// Para la eficiencia, vamos a crear un pool de MySQL, 
// que nos permite utilizar múltiples conexiones a la vez en lugar de tener 
// que manualmente abrir y cerrar conexiones múltiples.
// Por último, a exportar la piscina de MySQL para poder utilizar la aplicación.
const config = {
  host     : '3.133.138.215',
  user     : 'tpi115',
  password : 'Tpi115.$',
  database : 'pdm1',
  connectTimeout: 20000,
  acquireTimeout: 20000
};
//db: tbGPStkontrol
//table: pescucha_evento
//campo: arreglo

// Create a MySQL pool
// Para la eficiencia, vamos a crear un pool de MySQL, 
// que nos permite utilizar múltiples conexiones a la vez en lugar de tener 
// que manualmente abrir y cerrar conexiones múltiples.
// Por último, a exportar la piscina de MySQL para poder utilizar la aplicación.
 export const pool = mysql.createPool(config);