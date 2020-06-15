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


// ********* detalle producto pedido ******** CRUD
// LEER
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

// AGREGAR
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

// ELIMINAR
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

// ACTUALIZAR
router.post('/actualizar-detalle-producto-pedido', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE DETALLEPRODUCTOPEDIDO
                        SET
                        CANTIDADPEDIDO='${req.query.CANTIDADPEDIDO}', 
                        IDPEDIDO='${req.query.IDPEDIDO}', 
                        IDPRODUCTO='${req.query.IDPRODUCTO}'
                        WHERE IDDETALLE= '${req.query.IDDETALLE}'`; 
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then( (data: any) => {

        if(data.affectedRows !== 0 ) {
            const result = {
                respuesta: 1
            }
            
            res.json(1);
        } else {
            const result = {
                respuesta: 0
            }
            
            res.json(0);

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
// CREAR
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

// OBTENER
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

// ELIMINAR
router.post('/eliminar-empleado', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM EMPLEADOUES WHERE IDTRABAJADOR = '${req.query.IDTRABAJADOR}';`;
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

// ACTUALIZAR
router.post('/actualizar-empleado', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE EMPLEADOUES
                        SET
                        IDLOCAL='${req.query.IDLOCAL}', 
                        IDUBICACION='${req.query.IDUBICACION}', 
                        IDFACULTAD='${req.query.IDFACULTAD}',
                        NOMTRABAJADOR='${req.query.NOMTRABAJADOR}',
                        APETRABAJADOR='${req.query.APETRABAJADOR}'
                        WHERE IDTRABAJADOR= '${req.query.IDTRABAJADOR}'`; 
 
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then( (data: any) => {

        if(data.affectedRows !== 0 ) {
            const result = {
                respuesta: 1
            }
            
            res.json(1);
        } else {
            const result = {
                respuesta: 0
            }
            
            res.json(0);

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

// OBTENER
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


// ********* repartidor ********
// CREAR
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

// LEER
router.post('/obtener-repartidor', (req: Request, res: Response) => {
    console.log('obtener repartidor');

    let consulta = `SELECT * FROM REPARTIDOR WHERE IDREPARTIDOR = ${req.query.IDREPARTIDOR}`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });
});

// ACTUALIZAR
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

// ELIMINAR
router.post('/eliminar-repartidor', (req: Request, res: Response) => {
    
    console.log('eliminar repartidor');
    
    let query = `DELETE FROM REPARTIDOR WHERE IDREPARTIDOR = '${req.query.IDREPARTIDOR}';`;               
    
    // consulta estructurada con promesas
    mysql.query(query).then( (data: any) => {
        
        console.log('hizo la consulta', data);

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

// ********* login ********
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


// ********* productos ********
// LEER
router.post('/obtener-productos', (req: Request, res: Response) => {
    console.log('consulto api detalle producto');
    console.log(req.body);
    console.log(req.query);
    let consulta = `SELECT * FROM 
                    PRODUCTO 
                    WHERE IDLOCAL = ${req.query.IDLOCAL}
                    AND IDCATEGORIA = ${req.query.IDCATEGORIA}`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });

    // res.json({mensaje: 'probando api detalle producto'});
});

// AGREGAR
router.post('/registrar-producto', (req: Request, res: Response) => {
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

// ELIMINAR
router.post('/eliminar-producto', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM PRODUCTO WHERE IDPRODUCTO = '${req.query.IDPRODUCTO}';`;
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

// ACTUALIZAR
router.post('/actualizar-producto', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE PRODUCTO
                        SET
                        IDLOCAL='${req.query.IDLOCAL}', 
                        IDCATEGORIA='${req.query.IDCATEGORIA}', 
                        NOMBREPRODUCTO='${req.query.NOMBREPRODUCTO}',
                        PRECIOUNITARIO='${req.query.PRECIOUNITARIO}',
                        EXISTENCIA='${req.query.EXISTENCIA}'
                        WHERE IDPRODUCTO= '${req.query.IDPRODUCTO}'`; 
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then( (data: any) => {

        if(data.affectedRows !== 0 ) {
            const result = {
                respuesta: 1
            }
            
            res.json(1);
        } else {
            const result = {
                respuesta: 0
            }
            
            res.json(0);

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

// ********* encargado local ******** CRUD
// LEER
router.post('/obtener-encargado-local', (req: Request, res: Response) => {
    console.log('consulto api encargado local');

    let consulta = `SELECT * FROM ENCARGADOLOCAL WHERE IDENCARGADOLOCAL = ${req.query.IDENCARGADOLOCAL}`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });

    // res.json({mensaje: 'probando api detalle producto'});
});

// AGREGAR
router.post('/registrar-encargado-local', (req: Request, res: Response) => {
    console.log('entra a registrar encargado local');
    
    let query = `INSERT INTO ENCARGADOLOCAL (IDENCARGADOLOCAL, NOMENCARGADOLOCAL, APEENCARGADOLOCAL, TELENCARGADO)
                        VALUES ('${req.query.IDENCARGADOLOCAL}',
                        '${req.query.NOMENCARGADOLOCAL}',
                        '${req.query.APEENCARGADOLOCAL}',
                        '${req.query.TELENCARGADO}');`;
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

// ELIMINAR
router.post('/eliminar-encargado-local', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM ENCARGADOLOCAL WHERE IDENCARGADOLOCAL = '${req.query.IDENCARGADOLOCAL}';`;
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

// ACTUALIZAR
router.post('/actualizar-encargado-local', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE ENCARGADOLOCAL
                        SET
                        NOMENCARGADOLOCAL='${req.query.NOMENCARGADOLOCAL}', 
                        APEENCARGADOLOCAL='${req.query.APEENCARGADOLOCAL}', 
                        TELENCARGADO='${req.query.TELENCARGADO}'
                        WHERE IDENCARGADOLOCAL= '${req.query.IDENCARGADOLOCAL}'`; 
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then( (data: any) => {

        if(data.affectedRows !== 0 ) {
            const result = {
                respuesta: 1
            }
            
            res.json(1);
        } else {
            const result = {
                respuesta: 0
            }
            
            res.json(0);

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

// ********* local ******** CRUD
// LEER
router.post('/obtener-local', (req: Request, res: Response) => {
    console.log('consulto api local');

    let consulta = `SELECT * FROM LOCAL WHERE IDLOCAL = ${req.query.IDLOCAL}`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });

    // res.json({mensaje: 'probando api detalle producto'});
});

// AGREGAR
router.post('/registrar-local', (req: Request, res: Response) => {
    console.log('entra a registrar  local');
    
    let query = `INSERT INTO LOCAL (IDLOCAL, IDENCARGADOLOCAL, NOMBRELOCAL)
                        VALUES ('${req.query.IDLOCAL}',
                        '${req.query.IDENCARGADOLOCAL}',
                        '${req.query.NOMBRELOCAL}');`;
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

// ACTUALIZAR
router.post('/actualizar-local', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE LOCAL
                        SET
                        IDENCARGADOLOCAL='${req.query.IDENCARGADOLOCAL}', 
                        NOMBRELOCAL='${req.query.NOMBRELOCAL}'
                        WHERE IDLOCAL= '${req.query.IDLOCAL}'`; 
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then( (data: any) => {

        if(data.affectedRows !== 0 ) {
            const result = {
                respuesta: 1
            }
            
            res.json(1);
        } else {
            const result = {
                respuesta: 0
            }
            
            res.json(0);

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

// GET OBTENER
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


// ELIMINAR
router.post('/eliminar-local', (req: Request, res: Response) => {
    console.log('entra a eliminar local');
    
    let query = `DELETE FROM LOCAL WHERE IDLOCAL = '${req.query.IDLOCAL}';`;
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

// ********* menu ******** CRUD
// LEER
router.post('/obtener-menu', (req: Request, res: Response) => {
    console.log('consulto api local');

    let consulta = `SELECT * FROM MENU WHERE IDMENU = ${req.query.IDMENU}`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });

    // res.json({mensaje: 'probando api detalle producto'});
});

// AGREGAR
router.post('/registrar-menu', (req: Request, res: Response) => {
    console.log('entra a registrar  local');
    
    let query = `INSERT INTO MENU (IDMENU, PRECIOMENU, FECHADESDEMENU, FECHAHASTAMENU)
                        VALUES ('${req.query.IDMENU}',
                        '${req.query.PRECIOMENU}',
                        '${req.query.FECHADESDEMENU}',
                        '${req.query.FECHAHASTAMENU}');`;
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

// ACTUALIZAR
router.post('/actualizar-menu', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE MENU
                        SET
                        PRECIOMENU='${req.query.PRECIOMENU}', 
                        FECHADESDEMENU='${req.query.FECHADESDEMENU}',
                        FECHAHASTAMENU='${req.query.FECHAHASTAMENU}'
                        WHERE IDMENU= '${req.query.IDMENU}'`; 
    // consulta estructurada con promesas
    mysql.query(queryUpdate).then( (data: any) => {

        if(data.affectedRows !== 0 ) {
            const result = {
                respuesta: 1
            }
            
            res.json(1);
        } else {
            const result = {
                respuesta: 0
            }
            
            res.json(0);

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

// ELIMINAR
router.post('/eliminar-menu', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM MENU WHERE IDMENU = '${req.query.IDMENU}';`;
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

