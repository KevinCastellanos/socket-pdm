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
exports.router.post('/mensajes', (req, res) => {
    // leer la informacion que estoy recibiendo desde el cliente
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        cuerpo,
        de
    };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de
    });
});
// nueva ruta con parametros
exports.router.post('/mensajes/:id', (req, res) => {
    // leer la informacion que estoy recibiendo desde el cliente
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    // obtener el id
    const id = req.params.id;
    const payload = {
        de,
        cuerpo
    };
    // Aqui tenemos que agregar nuestro servicio rest con el servidor de sockets
    // para que la app obtenga los mensaje en tiempo real
    // declaramos la instancia de nuestro server
    // como usa el patron singleton, es la misma instancia del servidor de sockets corriendo
    const server = server_1.default.instance;
    // nos vamos a referir a nuesro servidor de sockets
    // el in sirve para enviar mensaje a un cliente en una canal en paticular
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
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
// 
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
exports.router.get('/detalle-producto-pedido', (req, res) => {
    let consulta = `SELECT * FROM DETALLEPRODUCTOPEDIDO`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
});
// ********* detalle producto pedido ********
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
exports.router.post('/registrar-detalle-producto-pedido', (req, res) => {
    let query = `INSERT INTO DETALLEPRODUCTOPEDIDO (CANTIDADPEDIDO, IDDETALLE, IDPEDIDO, IDPRODUCTO)
                        VALUES ('${req.query.CANTIDADPEDIDO}',
                        '${req.query.IDDETALLE}',
                        '${req.query.IDPEDIDO}',
                        '${req.query.IDPRODUCTO}');`;
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
        res.status(500).json(0);
    });
});
exports.router.get('/pedido', (req, res) => {
    let consulta = `SELECT * FROM PEDIDO`;
    // consulta estructurada con promesas
    mysql.query(consulta).then((data) => {
        // console.log(data);
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
});
// ********* empleado ********
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
        res.json(data);
    }).catch((err) => {
        res.status(500).json({ err });
    });
    // res.json({mensaje: 'probando api detalle producto'});
});
