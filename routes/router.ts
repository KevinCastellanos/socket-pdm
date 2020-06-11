// archivo destinado a crear los api Resfull
import { Router, Request, Response } from 'express';
import Server from '../class/server';
import { usuarioConectados } from '../sockets/socket';
import * as mysql from '../database/sql';
import { json } from 'body-parser';

//exportamos la constante router
export const router  = Router();

router.get('/bienvenida', (req: Request, res: Response) => {
    // mensaj de bienvenida
    res.json({
        ok: true,
        message: 'Conectado al servidor de PDM-115 correctamente'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    // leer la informacion que estoy recibiendo desde el cliente
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = {
        cuerpo,
        de
    }

    const server  = Server.instance;

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

// nueva ruta con parametros
router.post('/mensajes/:id', (req: Request, res: Response) => {
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
    const server = Server.instance;

    // nos vamos a referir a nuesro servidor de sockets
    // el in sirve para enviar mensaje a un cliente en una canal en paticular
    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

// Servicios para obtener todos los IDs de los usuarios
router.get('/usuarios', (req: Request, res: Response) => {

    // usamos la insancia de ioSockets para obtener los id conectados
    const server = Server.instance;
    server.io.clients( (err: any, clientes: string[])=> {
        if(err) {
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
router.get('/usuarios/detalle', (req: Request, res: Response) => {

    res.json({
        ok: true,
        clientes: usuarioConectados.getLista()
    });
});

// 
router.get('/locales', (req: Request, res: Response) => {
    
    let consulta = `SELECT * FROM LOCAL`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });
});


router.get('/repartidor', (req: Request, res: Response) => {
    
    let consulta = `SELECT * FROM REPARTIDOR`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });
});

router.get('/detalle-producto-pedido', (req: Request, res: Response) => {
    
    let consulta = `SELECT * FROM DETALLEPRODUCTOPEDIDO`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });
});



// ********* detalle producto pedido ********                           CRUD
router.post('/detalle-producto-pedido', (req: Request, res: Response) => {
    console.log('consulto api detalle producto');
    console.log(req.body);
    console.log(req.query);
    let consulta = `SELECT * FROM DETALLEPRODUCTOPEDIDO WHERE IDDETALLE = ${req.query.IDDETALLE}`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });

    // res.json({mensaje: 'probando api detalle producto'});
});

router.post('/registrar-detalle-producto-pedido', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    let query = `INSERT INTO DETALLEPRODUCTOPEDIDO (CANTIDADPEDIDO, IDDETALLE, IDPEDIDO, IDPRODUCTO)
                        VALUES ('${req.query.CANTIDADPEDIDO}',
                        '${req.query.IDDETALLE}',
                        '${req.query.IDPEDIDO}',
                        '${req.query.IDPRODUCTO}');`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then( (data: any) => {
        
        console.log('hizo la consulta',data);

        if(data.affectedRows === 1) {
            res.json(1);
        } else {
            res.json(0);
        }

    }).catch( (err) => {
        console.log(err);
        res.status(500).json(0);
    });
});

router.post('/eliminar-detalle-producto-pedido', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM DETALLEPRODUCTOPEDIDO WHERE IDDETALLE = '${req.query.IDDETALLE}';`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then( (data: any) => {
        
        console.log('hizo la consulta',data);

        if(data.affectedRows === 1) {
            res.json(1);
        } else {
            res.json(0);
        }

    }).catch( (err) => {
        console.log(err);
        res.status(500).json(0);
    });
});



// ********* pedido ********                                            CRUD
router.get('/pedido', (req: Request, res: Response) => {
    
    let consulta = `SELECT * FROM PEDIDO`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });
});



// ********* empleado ********
router.post('/registrar-empleado-ues', (req: Request, res: Response) => {
    
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
    mysql.query(query).then( (data: any) => {
        
        console.log(data);

        if(data.affectedRows === 1) {
            res.json(1);
        } else {
            res.json(0);
        }

    }).catch( (err) => {
        const result = {
            respuesta: 0,
            datos: err
        }

        res.status(500).json(0);
    });
});

router.post('/obtener-empleado', (req: Request, res: Response) => {
    
    let consulta = `SELECT * FROM EMPLEADOUES WHERE IDTRABAJADOR='${req.query.Idtrabajador}'`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data[0]);
    }).catch( (err) => {
        res.status(500).json({ err });
    });
});

router.get('/empleado-ues', (req: Request, res: Response) => {
    
    let consulta = `SELECT * FROM EMPLEADOUES`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });
});

router.post('/registrar-repartidor', (req: Request, res: Response) => {
    
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
    mysql.query(query).then( (data: any) => {
        // console.log(data);
        const result = {
            respuesta: 1
        }
        res.json(result);

    }).catch( (err) => {
        const result = {
            respuesta: 0,
            datos: err
        }

        res.status(500).json(result);
    });
});

router.post('/actualizar-repartidor', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE REPARTIDOR
                        SET
                        NOMREPARTIDOR='${req.body.Nomrepartidor}', 
                        APEREPARTIDOR='${req.body.Aperepartidor}', 
                        TELREPARTIDOR='${req.body.Telrepartidor}'
                        WHERE IDREPARTIDOR= '${req.body.Idrepartidor}'`; 
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then( (data: any) => {

        if(data.affectedRows !== 0 ) {
            const result = {
                respuesta: 1
            }
            
            res.json(result);
        } else {
            const result = {
                respuesta: 0
            }
            
            res.json(result);

        }
        console.log(data);
        
        

    }).catch( (err) => {
        const result = {
            respuesta: 0,
            datos: err
        }

        res.status(500).json(result);
    });
});

router.post('/login', (req: Request, res: Response) => {
    console.log('consulto api detalle producto');
    // console.log(req.body);
    console.log(req.query);
    let consulta = `SELECT * 
                    FROM USUARIO 
                    WHERE NOMUSUARIO = '${req.query.usuario}'
                    AND CLAVE = '${req.query.password}';`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data[0]);
    }).catch( (err) => {
        res.status(500).json({ err });
    });

    // res.json({mensaje: 'probando api detalle producto'});
});


// ********* productos ********
router.post('/obtener-productos', (req: Request, res: Response) => {
    console.log('consulto api detalle producto');
    console.log(req.body);
    console.log(req.query);
    let consulta = `SELECT * FROM 
                    PRODUCTO 
                    WHERE IDLOCAL = ${req.query.idlocal}
                    AND IDCATEGORIA = ${req.query.idcategoria}`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });

    // res.json({mensaje: 'probando api detalle producto'});
});