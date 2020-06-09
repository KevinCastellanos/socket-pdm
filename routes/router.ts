// archivo destinado a crear los api Resfull
import { Router, Request, Response } from 'express';
import Server from '../class/server';
import { usuarioConectados } from '../sockets/socket';
import * as mysql from '../database/sql';

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

router.post('/obtener-empleado', (req: Request, res: Response) => {
    
    let consulta = `SELECT * FROM EMPLEADOUES WHERE IDTRABAJADOR='${req.body.Idtrabajador}'`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data[0]);
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

router.post('/detalle-producto-pedido', (req: Request, res: Response) => {
    
    let consulta = `SELECT * FROM DETALLEPRODUCTOPEDIDO WHERE IDDETALLE = ${req.body.idDetalle}`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data[0]);
    }).catch( (err) => {
        res.status(500).json({ err });
    });
});

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

router.post('/registrar-empleado-ues', (req: Request, res: Response) => {
    
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
