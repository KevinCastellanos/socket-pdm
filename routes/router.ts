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

// LEER
router.get('/obtener-pedido', (req: Request, res: Response) => {
    
    let consulta = `SELECT * FROM PEDIDO`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data);
    }).catch( (err) => {
        res.status(500).json({ err });
    });
});

// LEER
router.post('/obtener-pedido', (req: Request, res: Response) => {
    console.log('consulto api pedido');

    let consulta = `SELECT * FROM PEDIDO WHERE IDPEDIDO = ${req.query.IDPEDIDO}`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        console.log(data);
        res.json(data[0]);
    }).catch( (err) => {
        res.status(500).json({ err });
    });

    // res.json({mensaje: 'probando api detalle producto'});
});

// AGREGAR
router.post('/registrar-pedido', (req: Request, res: Response) => {
    console.log('entra a registrar  local');
    
    let query = `INSERT INTO PEDIDO (IDPEDIDO, IDRUTA, IDESTADOPEDIDO, IDTRABAJADOR, IDREPARTIDOR, IDUBICACION, FECHAPEDIDO, CLIENTE, PARALLEVAR)
                        VALUES ('${req.query.IDPEDIDO}',
                                '${req.query.IDRUTA}',
                                '${req.query.IDESTADOPEDIDO}',
                                '${req.query.IDTRABAJADOR}',
                                '${req.query.IDREPARTIDOR}',
                                '${req.query.IDUBICACION}',
                                '${req.query.FECHAPEDIDO}',
                                '${req.query.CLIENTE}', 
                                '${req.query.PARALLEVAR}');`;
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

// AGREGAR PEDIDO FLUJO NORMAL
// AGREGAR
router.post('/registrar-pedido-flujo', (req: Request, res: Response) => {
    console.log('entra a registrar  pedido', req.query);

    

    /****************** obtenemos los datos para procesarlos *******************/
    // id pedido
    const idPedido = req.query.idPedido;
    // obtenemos el id de un repartidor disponible
    const numAleatorio = Math.floor(Math.random() * 6) + 1;
    // obtenemos el id ruta
    const idRuta = 1;
    // obtenemos el id trabajador
    const idEstadoPedido = 1;
    // es para llevar 1 = si, 0 = no
    const esParaLlevar = req.query.esParaLlevar;
    // obtenemos  el idUnicacion
    const idUbicacion = req.query.idUbicacion;
    // obtenemos el idTrabajador
    const idTrabajador = 1;
    // fecha de pedido
    const fechaPedido = req.query.fechaPedido;
    // nombre cliente
    const nombreCliente = req.query.nombreCliente;
    /****************** /obtenemos los datos para procesarlos *******************/



    
    let query = `INSERT INTO PEDIDO (IDPEDIDO, IDRUTA, IDESTADOPEDIDO, IDTRABAJADOR, IDREPARTIDOR, IDUBICACION, FECHAPEDIDO, CLIENTE, PARALLEVAR)
                        VALUES ('${idPedido}',
                                '${idRuta}',
                                '${idEstadoPedido}',
                                '${idTrabajador}',
                                '${numAleatorio}',
                                '${idUbicacion}',
                                '${fechaPedido}',
                                '${nombreCliente}',
                                '${esParaLlevar}');`;
    // console.log(query);                
    // consulta estructurada con promesas
    mysql.query(query).then( (data: any) => {

        // data.insertId
        // convertimos los detalles en JSON

        // const obj = JSON.parse(req.query.detalle);

        var arrayOfObjects = [{
            "id": 28,
            "Title": "Sweden"
          }, {
            "id": 56,
            "Title": "USA"
          }, {
            "id": 89,
            "Title": "England"
          }];
        
        console.log('objeto convertido',arrayOfObjects);
        console.log('objeto convertido',arrayOfObjects.length);
        console.log('id insertado: ', idPedido);
    
        // insertamos los detalles de productos escogidos
        
       
            
        console.log('DETALLE: ', req.query.detalle);
        for (let i in req.query.detalle) {
            console.log('array separado: ', req.query.detalle[i].split(',')[0]);
            // console.log( i + ' - cantidad pedido: ', obj[i].cantidadPedido);
            let query2 = `INSERT INTO 
                        DETALLEPRODUCTOPEDIDO (CANTIDADPEDIDO, IDPEDIDO, IDPRODUCTO)
                        VALUES ('${req.query.detalle[i].split(',')[0]}',
                                '${idPedido}',
                                '${req.query.detalle[i].split(',')[1]}');`;
                          
            mysql.query(query2).then( (data: any) => {
                console.log('registro detalle producto');

                // restamos cantidad de producto de la tabla producto
                const query3 = `SELECT * FROM PRODUCTO WHERE IDPRODUCTO = ${req.query.detalle[i].split(',')[1]}`;
                mysql.query(query3).then( (data3: any) => {
                    console.log('PRODUCTO: ', data3[0].EXISTENCIA);
                    const existencia =  data3[0].EXISTENCIA - req.query.detalle[i].split(',')[0];

                    const query4 = `UPDATE PRODUCTO SET EXISTENCIA=${existencia} WHERE IDPRODUCTO = ${req.query.detalle[i].split(',')[1]}`;
                    mysql.query(query4).then( (data4: any) => {
                       console.log(data4);
                        
                    }).catch( (err) => {
                        console.log(err);
                    });
                    
                }).catch( (err) => {
                    console.log(err);
                });
            }).catch( (err) => {
                console.log(err);
            });
        }
        
        //console.log('hizo la consulta',data);

        if(data.affectedRows === 1) {
            res.json(1);
        } else {
            res.json(0);
        }

    }).catch( (err) => {
        console.log(err);
        res.status(500).json(0);
    });

    // res.json(Math.floor(Math.random() * 6) + 1);
});

// ACTUALIZAR
router.post('/actualizar-pedido', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE PEDIDO
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
router.post('/eliminar-pedido', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM PEDIDO WHERE IDPEDIDO = '${req.query.IDPEDIDO}';`;
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
                VALUES ('${req.query.idTrabajador}',
                        '${req.query.Idlocal}',
                        '${req.query.idUbicacion}',
                        '${req.query.idFacultad}', 
                        '${req.query.NombreTRabajador}',
                        '${req.query.Apellido}',
                        '${req.query.tel}');`;
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

router.post('/obtener-productos-crud', (req: Request, res: Response) => {
    console.log('consulto api detalle producto');
    console.log(req.body);
    console.log(req.query);
    let consulta = `SELECT * FROM 
                    PRODUCTO 
                    WHERE IDPRODUCTO = ${req.query.IDPRODUCTO}`;

                    
    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data[0]);
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

// ********* Cambio precio  ******** CRUD
// LEER
router.post('/obtener-cambio-precio', (req: Request, res: Response) => {
    console.log('consulto api encargado local');

    let consulta = `SELECT * FROM CAMBIOPRECIOS WHERE IDCAMBIOPRECIO = ${req.query.IDCAMBIOPRECIO}`;

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
router.post('/registrar-cambio-precio', (req: Request, res: Response) => {
    console.log('entra a registrar encargado local');
    
    let query = `INSERT INTO CAMBIOPRECIO (IDCAMBIOPRECIO, IDPRODUCTO, FECHACAMBIO, PRECIONUEVO)
                        VALUES ('${req.query.IDCAMBIOPRECIO}',
                                '${req.query.IDPRODUCTO}',
                                '${req.query.FECHACAMBIO}',
                                '${req.query.PRECIONUEVO}');`;
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
router.post('/actualizar-cambio-precio', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE CAMBIOPRECIO
                        SET
                        IDPRODUCTO='${req.query.IDPRODUCTO}', 
                        FECHACAMBIO='${req.query.FECHACAMBIO}', 
                        PRECIONUEVO='${req.query.PRECIONUEVO}'
                        WHERE IDCAMBIOPRECIO= '${req.query.IDCAMBIOPRECIO}'`; 
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
router.post('/eliminar-cambio-precio', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM CAMBIOPRECIO WHERE IDCAMBIOPRECIO = '${req.query.IDCAMBIOPRECIO}';`;
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


// ********* Cambio precio  ******** CRUD
// LEER
router.post('/obtener-detalle-producto-precio', (req: Request, res: Response) => {
    console.log('consulto api encargado local');

    let consulta = `SELECT * FROM DETALLEPRODUCTOPRECIO WHERE PRECIOCAMBIO = ${req.query.PRECIOCAMBIO}`;

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
router.post('/registrar-detalle-producto-precio', (req: Request, res: Response) => {
    console.log('entra a registrar encargado local');
    
    let query = `INSERT INTO DETALLEPRODUCTOPRECIO (PRECIOCAMBIO)
                        VALUES ('${req.query.PRECIOCAMBIO}');`;
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
router.post('/actualizar-detalle-producto-precio', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE DETALLEPRODUCTOPRECIO
                        SET
                        PRECIOCAMBIO='${req.query.PRECIOCAMBIO}', 
                        WHERE PRECIOCAMBIO= '${req.query.PRECIOCAMBIO}'`; 
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
router.post('/eliminar-detalle-producto-precio', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM DETALLEPRODUCTOPRECIO WHERE PRECIOCAMBIO = '${req.query.PRECIOCAMBIO}';`;
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

// ********* Facultad ******** CRUD
// LEER
router.post('/obtener-facultad', (req: Request, res: Response) => {
    console.log('consulto api encargado local');

    let consulta = `SELECT * FROM FACULTAD WHERE IDFACULTAD = ${req.query.IDFACULTAD}`;

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
router.post('/registrar-facultad', (req: Request, res: Response) => {
    console.log('entra a registrar encargado local');
    
    let query = `INSERT INTO FACULTAD (IDFACULTAD, NOMFACULTAD)
                        VALUES ('${req.query.IDFACULTAD}',
                                '${req.query.NOMFACULTAD}');`;
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
router.post('/actualizar-facultad', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE FACULTAD
                        SET
                        NOMFACULTAD='${req.query.NOMFACULTAD}', 
                        WHERE IDFACULTAD= '${req.query.IDFACULTAD}'`; 
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
router.post('/eliminar-facultad', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM FACULTAD WHERE IDFACULTAD = '${req.query.FACULTAD}';`;
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


// ********* Ubicacion ******** CRUD
// LEER
router.post('/obtener-ubicacion', (req: Request, res: Response) => {
    console.log('consulto api encargado local');

    let consulta = `SELECT * FROM UBICACION WHERE IDUBICACION = ${req.query.IDUBICACION}`;

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
router.post('/registrar-ubicacion', (req: Request, res: Response) => {
    console.log('entra a registrar encargado local');
    
    let query = `INSERT INTO UBICACION (IDUBICACION, DESCUBICACION)
                        VALUES ('${req.query.IDUBICACION}',
                                '${req.query.DESCUBICACION}');`;
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
router.post('/actualizar-ubicacion', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE UBICACION
                        SET
                        DESCUBCACION='${req.query.DESCUBCACION}', 
                        WHERE IDUBICACION= '${req.query.IDUBICACION}'`; 
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
router.post('/eliminar-ubicacion', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM UBICACION WHERE IDUBICACION = '${req.query.IDUBICACION}';`;
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

// ********* Categoria ******** CRUD
// LEER
router.post('/obtener-categoria', (req: Request, res: Response) => {
    console.log('consulto api encargado local');

    let consulta = `SELECT * FROM CATEGORIA WHERE IDCATEGORIA = ${req.query.IDCATEGORIA}`;

    // consulta estructurada con promesas
    mysql.query(consulta).then( (data: any) => {
        // console.log(data);
        res.json(data[0]);
    }).catch( (err) => {
        res.status(500).json({ err });
    });

    // res.json({mensaje: 'probando api detalle producto'});
});

// AGREGAR
router.post('/registrar-categoria', (req: Request, res: Response) => {
    console.log('entra a registrar encargado local');
    
    let query = `INSERT INTO CATEGORIA (IDCATEGORIA, NOMBRECATEGORIA)
                        VALUES ('${req.query.IDCATEGORIA}',
                                '${req.query.NOMBRECATEGORIA}');`;
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
router.post('/actualizar-categoria', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE CATEGORIA
                        SET
                        NOMBRECATEGORIA='${req.query.NOMBRECATEGORIA}' 
                        WHERE IDCATEGORIA= '${req.query.IDCATEGORIA}'`; 
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
router.post('/eliminar-categoria', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM CATEGORIA WHERE IDCATEGORIA = '${req.query.IDCATEGORIA}';`;
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


// ********* estado-pedido ******** CRUD
// LEER
router.post('/obtener-estado-pedido', (req: Request, res: Response) => {
    console.log('consulto api estado pedido');

    let consulta = `SELECT * FROM ESTADPEDIDO WHERE IDESTADOPEDIDO = ${req.query.IDESTADOPEDIDO}`;

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
router.post('/registrar-estado-pedido', (req: Request, res: Response) => {
    console.log('entra a registrar encargado local');
    
    let query = `INSERT INTO ESTADPEDIDO (IDESTADOPEDIDO, DESCESTADOPEDIDO)
                        VALUES ('${req.query.IDESTADOPEDIDO}',
                                '${req.query.DESCESTADOPEDIDO}');`;
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
router.post('/actualizar-estado-pedido', (req: Request, res: Response) => {
    
    const queryUpdate =  `UPDATE ESTADPEDIDO
                        SET
                        DESCESTADOPEDIDO='${req.query.DESCESTADOPEDIDO}' 
                        WHERE IDESTADOPEDIDO= '${req.query.IDESTADOPEDIDO}'`; 
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
router.post('/eliminar-estado-pedido', (req: Request, res: Response) => {
    console.log('entra a registrar detalle pedido');
    
    let query = `DELETE FROM ESTADPEDIDO WHERE IDESTADOPEDIDO = '${req.query.IDESTADOPEDIDO}';`;
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


