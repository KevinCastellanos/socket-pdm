"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// archivo destinado a crear los api Resfull
const express_1 = require("express");
const server_1 = __importDefault(require("../class/server"));
const socket_1 = require("../sockets/socket");
const mysql = __importStar(require("../database/sql"));
//exportamos la constante router
exports.router = express_1.Router();
exports.router.get('/bienvenida', (req, res) => {
    // mensaj de bienvenida
    res.json({
        ok: true,
        message: 'Conectado al servidor de PDM-115 correctamente'
    });
});
// ********* detalle producto pedido ******** CRUD
// LEER
exports.router.post('/detalle-producto-pedido', (req, res) => {
    console.log('consulto api detalle producto');
    console.log(req.body);
    console.log(req.query);
    let consulta = `SELECT * FROM DETALLEPRODUCTOPEDIDO WHERE IDDETALLE = ${req.query.IDDETALLE}`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
    // res.json({mensaje: 'probando api detalle producto'});
});
// AGREGAR
exports.router.post('/registrar-detalle-producto-pedido', (req, res) => {
    console.log('entra a registrar detalle pedido');
    let query = `INSERT INTO DETALLEPRODUCTOPEDIDO (CANTIDADPEDIDO, IDDETALLE, IDPEDIDO, IDPRODUCTO)
                        VALUES ('${req.query.CANTIDADPEDIDO}',
                        '${req.query.IDDETALLE}',
                        '${req.query.IDPEDIDO}',
                        '${req.query.IDPRODUCTO}');`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ELIMINAR
exports.router.post('/eliminar-detalle-producto-pedido', (req, res) => {
    console.log('entra a registrar detalle pedido');
    let query = `DELETE FROM DETALLEPRODUCTOPEDIDO WHERE IDDETALLE = '${req.query.IDDETALLE}';`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ACTUALIZAR
exports.router.post('/actualizar-detalle-producto-pedido', (req, res) => {
    const queryUpdate = `UPDATE DETALLEPRODUCTOPEDIDO
                        SET
                        CANTIDADPEDIDO='${req.query.CANTIDADPEDIDO}', 
                        IDPEDIDO='${req.query.IDPEDIDO}', 
                        IDPRODUCTO='${req.query.IDPRODUCTO}'
                        WHERE IDDETALLE= '${req.query.IDDETALLE}'`;
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then((data) => {
        if (data.affectedRows !== 0) {
            const result = {
                respuesta: 1
            };
            res.json(1);
        }
        else {
            const result = {
                respuesta: 0
            };
            res.json(0);
        }
        console.log(data);
    }).catch((err) => {
        const result = {
            respuesta: 0,
            datos: err
        };
        res.status(500).json(result);
    });
});
// ********* pedido ********                                            CRUD
// LEER
exports.router.get('/obtener-pedido', (req, res) => {
    let consulta = `SELECT * FROM PEDIDO`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
});
// LEER
exports.router.post('/obtener-pedido', (req, res) => {
    console.log('consulto api local');
    let consulta = `SELECT * FROM PEDIDO WHERE IDPEDIDO = ${req.query.IDPEDIDO}`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
    // res.json({mensaje: 'probando api detalle producto'});
});
// AGREGAR
exports.router.post('/registrar-pedido', (req, res) => {
    console.log('entra a registrar  local');
    let query = `INSERT INTO PEDIDO (IDPEDIDO, IDRUTA, IDESTADOPEDIDO, IDTRABAJADOR, IDREPARTIDOR, IDUBICACION, FECHAPEDIDO, CLIENTE, PARALLEVAR)
                        VALUES ('${req.query.IDPEDIDO}',
                                '${req.query.IDRUTA}',
                                '${req.query.IDESTADOPEDIDO}',
                                '${req.query.IDTRABAJADOR}',
                                '${req.query.IDREPARTIDOR}',
                                '${req.query.IDUBICACION}',
                                '${req.query.FECHAPEDIDO}',
                                '${req.query.CLIENTE}'
                                '${req.query.PARALLEVAR}');`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ACTUALIZAR
exports.router.post('/actualizar-pedido', (req, res) => {
    const queryUpdate = `UPDATE PEDIDO
                        SET
                        IDRUTA='${req.query.IDRUTA}', 
                        IDESTADOPEDIDO='${req.query.IDESTADOPEDIDO}',
                        IDTRABAJADOR='${req.query.IDTRABAJADOR}',
                        IDREPARTIDOR='${req.query.IDREPARTIDOR}',
                        IDUBICACION='${req.query.IDUBICACION}',
                        FECHAPEDIDO='${req.query.FECHAPEDIDO}',
                        CLIENTE='${req.query.CLIENTE}',
                        PARALLEVAR='${req.query.PARALLEVAR}'
                        WHERE IDPEDIDO= '${req.query.IDPEDIDO}'`;
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then((data) => {
        if (data.affectedRows !== 0) {
            const result = {
                respuesta: 1
            };
            res.json(1);
        }
        else {
            const result = {
                respuesta: 0
            };
            res.json(0);
        }
        console.log(data);
    }).catch((err) => {
        const result = {
            respuesta: 0,
            datos: err
        };
        res.status(500).json(result);
    });
});
// ELIMINAR
exports.router.post('/eliminar-pedido', (req, res) => {
    console.log('entra a registrar detalle pedido');
    let query = `DELETE FROM PEDIDO WHERE IDPEDIDO = '${req.query.IDPEDIDO}';`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ********* empleado ********
// CREAR
exports.router.post('/registrar-empleado-ues', (req, res) => {
    let query = `INSERT INTO EMPLEADOUES (IDTRABAJADOR, IDLOCAL, IDUBICACION, IDFACULTAD, NOMTRABAJADOR, APETRABAJADOR, TELTRABAJADOR)
                        VALUES ('${req.query.idTrabajador}',
                        '${req.query.IdLocal}',
                        '${req.query.idUbicacion}',
                        '${req.query.idFacultad}', 
                        '${req.query.nombre}',
                        '${req.query.apellido}',
                        '${req.query.tel}');`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log(data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        const result = {
            respuesta: 0,
            datos: err
        };
        res.status(500).json(0);
    });
});
// OBTENER
exports.router.post('/obtener-empleado', (req, res) => {
    let consulta = `SELECT * FROM EMPLEADOUES WHERE IDTRABAJADOR='${req.query.Idtrabajador}'`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data[0]);
    }).catch((err) => {
        res.status(500).json({ err });
    });
});
// ELIMINAR
exports.router.post('/eliminar-empleado', (req, res) => {
    console.log('entra a registrar detalle pedido');
    let query = `DELETE FROM EMPLEADOUES WHERE IDTRABAJADOR = '${req.query.IDTRABAJADOR}';`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ACTUALIZAR
exports.router.post('/actualizar-empleado', (req, res) => {
    const queryUpdate = `UPDATE EMPLEADOUES
                        SET
                        IDLOCAL='${req.query.IDLOCAL}', 
                        IDUBICACION='${req.query.IDUBICACION}', 
                        IDFACULTAD='${req.query.IDFACULTAD}',
                        NOMTRABAJADOR='${req.query.NOMTRABAJADOR}',
                        APETRABAJADOR='${req.query.APETRABAJADOR}'
                        WHERE IDTRABAJADOR= '${req.query.IDTRABAJADOR}'`;
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then((data) => {
        if (data.affectedRows !== 0) {
            const result = {
                respuesta: 1
            };
            res.json(1);
        }
        else {
            const result = {
                respuesta: 0
            };
            res.json(0);
        }
        console.log(data);
    }).catch((err) => {
        const result = {
            respuesta: 0,
            datos: err
        };
        res.status(500).json(result);
    });
});
// OBTENER
exports.router.get('/empleado-ues', (req, res) => {
    let consulta = `SELECT * FROM EMPLEADOUES`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
});
// ********* repartidor ********
// CREAR
exports.router.post('/registrar-repartidor', (req, res) => {
    let query = `INSERT INTO EMPLEADOUES (IDTRABAJADOR, IDLOCAL, IDUBICACION, IDFACULTAD, NOMTRABAJADOR, APETRABAJADOR, TELTRABAJADOR)
                VALUES ('${req.body.idTrabajador}',
                        '${req.body.Idlocal}',
                        '${req.body.idUbicacion}',
                        '${req.body.idFacultad}', 
                        '${req.body.NombreTRabajador}',
                        '${req.body.Apellido}',
                        '${req.body.tel}');`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        // console.log(data);
        const result = {
            respuesta: 1
        };
        res.json(result);
    }).catch((err) => {
        const result = {
            respuesta: 0,
            datos: err
        };
        res.status(500).json(result);
    });
});
// LEER
exports.router.post('/obtener-repartidor', (req, res) => {
    console.log('obtener repartidor');
    let consulta = `SELECT * FROM REPARTIDOR WHERE IDREPARTIDOR = ${req.query.IDREPARTIDOR}`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
});
// ACTUALIZAR
exports.router.post('/actualizar-repartidor', (req, res) => {
    const queryUpdate = `UPDATE REPARTIDOR
                        SET
                        NOMREPARTIDOR='${req.body.Nomrepartidor}', 
                        APEREPARTIDOR='${req.body.Aperepartidor}', 
                        TELREPARTIDOR='${req.body.Telrepartidor}'
                        WHERE IDREPARTIDOR= '${req.body.Idrepartidor}'`;
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then((data) => {
        if (data.affectedRows !== 0) {
            const result = {
                respuesta: 1
            };
            res.json(result);
        }
        else {
            const result = {
                respuesta: 0
            };
            res.json(result);
        }
        console.log(data);
    }).catch((err) => {
        const result = {
            respuesta: 0,
            datos: err
        };
        res.status(500).json(result);
    });
});
// ELIMINAR
exports.router.post('/eliminar-repartidor', (req, res) => {
    console.log('eliminar repartidor');
    let query = `DELETE FROM REPARTIDOR WHERE IDREPARTIDOR = '${req.query.IDREPARTIDOR}';`;
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
exports.router.get('/repartidor', (req, res) => {
    let consulta = `SELECT * FROM REPARTIDOR`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
});
// ********* login ********
exports.router.post('/login', (req, res) => {
    console.log('consulto api detalle producto');
    // console.log(req.body);
    console.log(req.query);
    let consulta = `SELECT * 
                    FROM USUARIO 
                    WHERE NOMUSUARIO = '${req.query.usuario}'
                    AND CLAVE = '${req.query.password}';`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data[0]);
    }).catch((err) => {
        res.status(500).json({ err });
    });
    // res.json({mensaje: 'probando api detalle producto'});
});
// Servicios para obtener todos los IDs de los usuarios
exports.router.get('/usuarios', (req, res) => {
    // usamos la insancia de ioSockets para obtener los id conectados
    const server = server_1.default.instance;
    server.io.clients((err, clientes) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            clientes
        });
    });
});
// obtener usuarios y sus nombres
exports.router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: socket_1.usuarioConectados.getLista()
    });
});
// ********* productos ********
// LEER
exports.router.post('/obtener-productos', (req, res) => {
    console.log('consulto api detalle producto');
    console.log(req.body);
    console.log(req.query);
    let consulta = `SELECT * FROM 
                    PRODUCTO 
                    WHERE IDLOCAL = ${req.query.idlocal}
                    AND IDCATEGORIA = ${req.query.idcategoria}`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
    // res.json({mensaje: 'probando api detalle producto'});
});
exports.router.post('/obtener-productos-crud', (req, res) => {
    console.log('consulto api detalle producto');
    console.log(req.body);
    console.log(req.query);
    let consulta = `SELECT * FROM 
                    PRODUCTO 
                    WHERE IDPRODUCTO = ${req.query.IDPRODUCTO}`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data[0]);
    }).catch((err) => {
        res.status(500).json({ err });
    });
    // res.json({mensaje: 'probando api detalle producto'});
});
// AGREGAR
exports.router.post('/registrar-producto', (req, res) => {
    console.log('entra a registrar PRODUCTO');
    let query = `INSERT INTO PRODUCTO (IDPRODUCTO, IDLOCAL, IDCATEGORIA, NOMBREPRODUCTO, PRECIOUNITARIO, EXISTENCIA, PRO_LOCAL)
                        VALUES ('${req.query.IDPRODUCTO}',
                                '${req.query.IDLOCAL}',
                                '${req.query.IDCATEGORIA}',
                                '${req.query.NOMBREPRODUCTO}',
                                '${req.query.PRECIOUNITARIO}',
                                '${req.query.EXISTENCIA}',
                                '${req.query.PRO_LOCAL}');`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ELIMINAR
exports.router.post('/eliminar-producto', (req, res) => {
    console.log('entra a registrar detalle pedido');
    let query = `DELETE FROM PRODUCTO WHERE IDPRODUCTO = '${req.query.IDPRODUCTO}';`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ACTUALIZAR
exports.router.post('/actualizar-producto', (req, res) => {
    const queryUpdate = `UPDATE PRODUCTO
                        SET
                        IDLOCAL='${req.query.IDLOCAL}', 
                        IDCATEGORIA='${req.query.IDCATEGORIA}', 
                        NOMBREPRODUCTO='${req.query.NOMBREPRODUCTO}',
                        PRECIOUNITARIO='${req.query.PRECIOUNITARIO}',
                        EXISTENCIA='${req.query.EXISTENCIA}'
                        WHERE IDPRODUCTO= '${req.query.IDPRODUCTO}'`;
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then((data) => {
        if (data.affectedRows !== 0) {
            const result = {
                respuesta: 1
            };
            res.json(1);
        }
        else {
            const result = {
                respuesta: 0
            };
            res.json(0);
        }
        console.log(data);
    }).catch((err) => {
        const result = {
            respuesta: 0,
            datos: err
        };
        res.status(500).json(result);
    });
});
// ********* encargado local ******** CRUD
// LEER
exports.router.post('/obtener-encargado-local', (req, res) => {
    console.log('consulto api encargado local');
    let consulta = `SELECT * FROM ENCARGADOLOCAL WHERE IDENCARGADOLOCAL = ${req.query.IDENCARGADOLOCAL}`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
    // res.json({mensaje: 'probando api detalle producto'});
});
// AGREGAR
exports.router.post('/registrar-encargado-local', (req, res) => {
    console.log('entra a registrar encargado local');
    let query = `INSERT INTO ENCARGADOLOCAL (IDENCARGADOLOCAL, NOMENCARGADOLOCAL, APEENCARGADOLOCAL, TELENCARGADO)
                        VALUES ('${req.query.IDENCARGADOLOCAL}',
                        '${req.query.NOMENCARGADOLOCAL}',
                        '${req.query.APEENCARGADOLOCAL}',
                        '${req.query.TELENCARGADO}');`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ACTUALIZAR
exports.router.post('/actualizar-encargado-local', (req, res) => {
    const queryUpdate = `UPDATE ENCARGADOLOCAL
                        SET
                        NOMENCARGADOLOCAL='${req.query.NOMENCARGADOLOCAL}', 
                        APEENCARGADOLOCAL='${req.query.APEENCARGADOLOCAL}', 
                        TELENCARGADO='${req.query.TELENCARGADO}'
                        WHERE IDENCARGADOLOCAL= '${req.query.IDENCARGADOLOCAL}'`;
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then((data) => {
        if (data.affectedRows !== 0) {
            const result = {
                respuesta: 1
            };
            res.json(1);
        }
        else {
            const result = {
                respuesta: 0
            };
            res.json(0);
        }
        console.log(data);
    }).catch((err) => {
        const result = {
            respuesta: 0,
            datos: err
        };
        res.status(500).json(result);
    });
});
// ELIMINAR
exports.router.post('/eliminar-encargado-local', (req, res) => {
    console.log('entra a registrar detalle pedido');
    let query = `DELETE FROM ENCARGADOLOCAL WHERE IDENCARGADOLOCAL = '${req.query.IDENCARGADOLOCAL}';`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ********* local ******** CRUD
// LEER
exports.router.post('/obtener-local', (req, res) => {
    console.log('consulto api local');
    let consulta = `SELECT * FROM LOCAL WHERE IDLOCAL = ${req.query.IDLOCAL}`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
    // res.json({mensaje: 'probando api detalle producto'});
});
// AGREGAR
exports.router.post('/registrar-local', (req, res) => {
    console.log('entra a registrar  local');
    let query = `INSERT INTO LOCAL (IDLOCAL, IDENCARGADOLOCAL, NOMBRELOCAL)
                        VALUES ('${req.query.IDLOCAL}',
                        '${req.query.IDENCARGADOLOCAL}',
                        '${req.query.NOMBRELOCAL}');`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ACTUALIZAR
exports.router.post('/actualizar-local', (req, res) => {
    const queryUpdate = `UPDATE LOCAL
                        SET
                        IDENCARGADOLOCAL='${req.query.IDENCARGADOLOCAL}', 
                        NOMBRELOCAL='${req.query.NOMBRELOCAL}'
                        WHERE IDLOCAL= '${req.query.IDLOCAL}'`;
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then((data) => {
        if (data.affectedRows !== 0) {
            const result = {
                respuesta: 1
            };
            res.json(1);
        }
        else {
            const result = {
                respuesta: 0
            };
            res.json(0);
        }
        console.log(data);
    }).catch((err) => {
        const result = {
            respuesta: 0,
            datos: err
        };
        res.status(500).json(result);
    });
});
// GET OBTENER
exports.router.get('/locales', (req, res) => {
    let consulta = `SELECT * FROM LOCAL`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
});
// ELIMINAR
exports.router.post('/eliminar-local', (req, res) => {
    console.log('entra a eliminar local');
    let query = `DELETE FROM LOCAL WHERE IDLOCAL = '${req.query.IDLOCAL}';`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ********* menu ******** CRUD
// LEER
exports.router.post('/obtener-menu', (req, res) => {
    console.log('consulto api local');
    let consulta = `SELECT * FROM MENU WHERE IDMENU = ${req.query.IDMENU}`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
    // res.json({mensaje: 'probando api detalle producto'});
});
// AGREGAR
exports.router.post('/registrar-menu', (req, res) => {
    console.log('entra a registrar  local');
    let query = `INSERT INTO MENU (IDMENU, PRECIOMENU, FECHADESDEMENU, FECHAHASTAMENU)
                        VALUES ('${req.query.IDMENU}',
                        '${req.query.PRECIOMENU}',
                        '${req.query.FECHADESDEMENU}',
                        '${req.query.FECHAHASTAMENU}');`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ACTUALIZAR
exports.router.post('/actualizar-menu', (req, res) => {
    const queryUpdate = `UPDATE MENU
                        SET
                        PRECIOMENU='${req.query.PRECIOMENU}', 
                        FECHADESDEMENU='${req.query.FECHADESDEMENU}',
                        FECHAHASTAMENU='${req.query.FECHAHASTAMENU}'
                        WHERE IDMENU= '${req.query.IDMENU}'`;
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then((data) => {
        if (data.affectedRows !== 0) {
            const result = {
                respuesta: 1
            };
            res.json(1);
        }
        else {
            const result = {
                respuesta: 0
            };
            res.json(0);
        }
        console.log(data);
    }).catch((err) => {
        const result = {
            respuesta: 0,
            datos: err
        };
        res.status(500).json(result);
    });
});
// ELIMINAR
exports.router.post('/eliminar-menu', (req, res) => {
    console.log('entra a registrar detalle pedido');
    let query = `DELETE FROM MENU WHERE IDMENU = '${req.query.IDMENU}';`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ********* Cambio precio  ******** CRUD
// LEER
exports.router.post('/obtener-cambio-precio', (req, res) => {
    console.log('consulto api encargado local');
    let consulta = `SELECT * FROM CAMBIOPRECIOS WHERE IDCAMBIOPRECIO = ${req.query.IDCAMBIOPRECIO}`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
    // res.json({mensaje: 'probando api detalle producto'});
});
// AGREGAR
exports.router.post('/registrar-cambio-precio', (req, res) => {
    console.log('entra a registrar encargado local');
    let query = `INSERT INTO CAMBIOPRECIO (IDCAMBIOPRECIO, IDPRODUCTO, FECHACAMBIO, PRECIONUEVO)
                        VALUES ('${req.query.IDCAMBIOPRECIO}',
                                '${req.query.IDPRODUCTO}',
                                '${req.query.FECHACAMBIO}',
                                '${req.query.PRECIONUEVO}');`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
// ACTUALIZAR
exports.router.post('/actualizar-cambio-precio', (req, res) => {
    const queryUpdate = `UPDATE CAMBIOPRECIO
                        SET
                        IDPRODUCTO='${req.query.IDPRODUCTO}', 
                        FECHACAMBIO='${req.query.FECHACAMBIO}', 
                        PRECIONUEVO='${req.query.PRECIONUEVO}'
                        WHERE IDCAMBIOPRECIO= '${req.query.IDCAMBIOPRECIO}'`;
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then((data) => {
        if (data.affectedRows !== 0) {
            const result = {
                respuesta: 1
            };
            res.json(1);
        }
        else {
            const result = {
                respuesta: 0
            };
            res.json(0);
        }
        console.log(data);
    }).catch((err) => {
        const result = {
            respuesta: 0,
            datos: err
        };
        res.status(500).json(result);
    });
});
// ELIMINAR
exports.router.post('/eliminar-cambio-precio', (req, res) => {
    console.log('entra a registrar detalle pedido');
    let query = `DELETE FROM CAMBIOPRECIO WHERE IDCAMBIOPRECIO = '${req.query.IDCAMBIOPRECIO}';`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then((data) => {
        console.log('hizo la consulta', data);
        if (data.affectedRows === 1) {
            res.json(1);
        }
        else {
            res.json(0);
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).json(0);
    });
});
