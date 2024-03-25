<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

header("ACCESS-CONTROL-ALLOW-ORIGIN: *");

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

function getDB()
{
    $dbhost = "localhost";
    $dbname = "sios";
    $dbuser = "Carlos";
    $dbpass = "123456";
    $mysql_conn_string = "mysql:host=$dbhost;dbname=$dbname";
    $dbConnection = new PDO($mysql_conn_string, $dbuser, $dbpass);
    $dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    /* if (isset($dbConnection)) {
        echo "Conectado";
    } else {
        echo "No se ha conectado";
    } */
    return $dbConnection;
}


$app->get('/', function (Request $request, Response $response, $args) {
    $response->getBody()->write("Conexion!");
    return $response;
});

//////aqui van los buscadores/////
$app->get('/ver_herramienta_busque/{busqueda}', function ($request, $response, $args) {  //buscar herramienta
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT h.nombre, h.id_herramienta FROM herramienta AS h INNER JOIN categoria AS c ON h.fk_categoria = c.id_categoria WHERE h.nombre LIKE CONCAT('%', :busqueda, '%') GROUP BY h.id_herramienta"); //Consulta

        $sth->bindParam(":busqueda", $args["busqueda"], PDO::PARAM_STR); //comparacion
        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/ver_busque/{busqueda}', function ($request, $response, $args) {  //buscar herramienta
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT DISTINCT m.nombre, m.id_material, m.fk_presentacion, m.cantidad, m.observaciones, m.precio, m.seleccionado, m.activo FROM material AS m WHERE m.activo = 1 AND m.nombre LIKE CONCAT('%:busqueda%');"); //Consulta

        $sth->bindParam(":busqueda", $args["busqueda"], PDO::PARAM_STR); //comparacion
        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/buscarm/{buscar}', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT DISTINCT m.nombre, m.id_material, m.fk_presentacion, m.cantidad, m.observaciones, m.precio, m.seleccionado, m.activo FROM material AS m WHERE m.nombre LIKE CONCAT('%:buscar%') AND m.activo = 1 GROUP BY m.id_material"); //Consulta

        $sth->bindParam(":buscar", $args["buscar"], PDO::PARAM_STR); //comparacion
        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/buscar_m/{buscar_m}', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT m.nombre, m.id_material, m.fk_presentacion, m.cantidad, m.observaciones, m.precio, m.seleccionado, m.activo FROM material AS m WHERE m.nombre LIKE '%:buscar_m%' AND m.activo = 1"); //Consulta

        $sth->bindParam(":buscar_m", $args["buscar_m"], PDO::PARAM_STR); //comparacion
        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/buscar_h/{buscar_h}', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT i.id_inventario, i.fk_usuario, i.observaciones, u.nombre AS nombre_usuario, i.fecha_in, i.fecha_fin, lm.cantidad, lm.preciototal, m.nombre AS material, TIMESTAMPDIFF(DAY,NOW() , i.fecha_fin) AS fecha FROM inventario AS i INNER JOIN lista_material AS lm ON lm.fk_inventario = i.id_inventario INNER JOIN usuarios AS u ON u.id = i.fk_usuario INNER JOIN material AS m ON m.id_material = lm.fk_material WHERE i.activo = 1 AND u.nombre LIKE '%:buscar_h%' ORDER BY i.id_inventario DESC"); //Consulta

        $sth->bindParam(":buscar_h", $args["buscar_h"], PDO::PARAM_STR); //comparacion
        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/buscar1/{buscar}', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT i.id_inventario, i.fk_usuario, i.observaciones, u.nombre AS nombre_usuario, i.fecha_in, i.fecha_fin, lm.cantidad, lm.preciototal, m.nombre AS material, TIMESTAMPDIFF(DAY,NOW() , i.fecha_fin) AS fecha FROM inventario AS i INNER JOIN lista_material AS lm ON lm.fk_inventario = i.id_inventario INNER JOIN usuarios AS u ON u.id = i.fk_usuario INNER JOIN material AS m ON m.id_material = lm.fk_material WHERE i.activo = 1 AND u.nombre LIKE '%:buscar%'"); //Consulta

        $sth->bindParam(":buscar", $args["buscar"], PDO::PARAM_STR); //comparacion
        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/buscarhm/{buscarhm}', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT i.id_inventario, i.fk_usuario, i.observaciones, u.nombre AS nombre_usuario, i.fecha_in, i.fecha_fin, lm.cantidad, lm.preciototal, m.nombre AS material, TIMESTAMPDIFF(DAY,NOW() , i.fecha_fin) AS fecha FROM inventario AS i INNER JOIN lista_material AS lm ON lm.fk_inventario = i.id_inventario INNER JOIN usuarios AS u ON u.id = i.fk_usuario INNER JOIN material AS m ON m.id_material = lm.fk_material WHERE i.activo = 1 AND u.nombre LIKE '%:buscar%'"); //Consulta

        $sth->bindParam(":buscarhm", $args["buscarhm"], PDO::PARAM_STR); //comparacion
        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

/////////fin buscadores//////


$app->get('/ver_usuario', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT u.nombre AS nombre_usuario, i.fecha_in, u.correo, herramienta.nombre AS nombre_herrramienta, herramienta.estado FROM usuarios AS u INNER JOIN inventario AS i ON i.fk_usuario=u.id 
        INNER JOIN lista_herramienta ON lista_herramienta.fk_inventario= i.id_inventario 
        INNER JOIN herramienta ON herramienta.id_herramienta=lista_herramienta.fk_herramienta"); //Consulta

        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/ver_categoria', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT categoria.id_categoria, categoria.nombre, COUNT(categoria.id_categoria) AS cantidad_total,  cantidad_prestada, (COUNT(categoria.id_categoria) - cantidad_prestada) AS cantidad_disponible
                FROM(
                    SELECT categoria.id_categoria, categoria.nombre, COUNT(id_categoria) AS cantidad_prestada  
                    FROM categoria
                    INNER JOIN herramienta AS h ON h.fk_categoria = id_categoria 
                    WHERE h.activo = 1 AND h.estado  = 0
                    GROUP BY id_categoria
                ) 
                categoria
                INNER JOIN herramienta AS h ON h.fk_categoria = id_categoria 
                WHERE h.activo = 1  
                GROUP BY id_categoria"); //Consulta

        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/consultaDato', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT p.id_pedido, p.fecha, u.nombre, p.descripcion, p.nombre_articulo, p.altura, p.lugar, p.estado, p.tipo_orden FROM pedido AS p INNER JOIN usuarios AS u ON u.id = p.fk_cliente"); //Consulta

        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/consultaorden', function ($request, $response, $args) {  //consulta de ordenes

    try {
        $db =  getDB(); //Carga los datos
        /* $sth = $db->prepare("SELECT `id_orden`, `fk_pedido`, `observaciones`, `fecha_entrega`, `costos`, `horas_laboradas`, `cant_trabajadores`, `estado_` FROM `ordenes`"); //Consulta */
        $sth = $db->prepare("SELECT o.id_orden, o.observaciones, o.fecha_entrega, o.estado, o.fecha_expedicion, p.nombre_articulo, p.tipo_orden FROM ordenes AS o INNER JOIN pedido AS p ON o.fk_pedido = p.id_pedido"); //Consulta


        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/ver_inventario', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT m.id_material, m.nombre, p.nombre AS nombre_presentacion, m.cantidad, m.observaciones, m.precio, m.activo FROM material AS m INNER JOIN presentacion AS p ON m.fk_presentacion = p.id_presentacion WHERE activo = 1"); //Consulta

        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/ver_herramienta', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT h.id_herramienta, h.nombre, h.estado, c.nombre AS nombre_categoria, h.observaciones, activo FROM herramienta AS h INNER JOIN categoria AS c ON h.fk_categoria = c.id_categoria where activo = 1  GROUP BY id_herramienta "); //Consulta

        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/ver_historial', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT i.id_inventario, i.fk_usuario, i.observaciones, u.nombre AS nombre_usuario, i.fecha_in, i.fecha_fin, lm.cantidad, lm.preciototal, m.nombre AS material, TIMESTAMPDIFF(DAY,NOW() , i.fecha_fin) AS fecha FROM inventario AS i INNER JOIN lista_material AS lm ON lm.fk_inventario = i.id_inventario INNER JOIN usuarios AS u ON u.id = i.fk_usuario INNER JOIN material AS m ON m.id_material = lm.fk_material WHERE i.activo = 1 ORDER BY i.id_inventario DESC"); //Consulta

        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/ver_hherramienta', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT i.id_inventario, i.fk_usuario, i.observaciones, i.fecha_in, u.nombre AS nombre_usuario, i.fecha_fin, i.activo, lh.cantidad, h.nombre AS herramienta FROM inventario AS i 
        INNER JOIN lista_herramienta AS lh ON lh.fk_inventario = i.id_inventario 
        INNER JOIN usuarios AS u ON u.id = i.fk_usuario
        INNER JOIN herramienta AS h ON h.id_herramienta = lh.fk_herramienta WHERE i.activo = 1 ORDER BY i.id_inventario DESC"); //Consulta

        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/consultaDatosMaterial', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT id_material, nombre, fk_presentacion, cantidad, observaciones, precio from material"); //Consulta
        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->get('/consultaseba', function ($request, $response, $args) {  //Defino los servicios
    try {
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("SELECT id_herramienta, nombre, estado , fk_categoria , observaciones, activo from herramienta"); //Consulta
        $sth->execute(); //Ejecutamos la consulta
        $test = $sth->fetchAll(PDO::FETCH_ASSOC); //Guardar los resultados de la consulta
        //Verificar si se ha cargado algo
        if ($test) {
            $response->getBody()->write(json_encode($test)); //write Escribe la respuesta como texto, pero necesito un Json
            $db = null; //Cerrar la conexion con la base de datos
        } else {
            $response->getBody()->write('{"error":"error"}');
        }
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->post('/createDatos', function ($request, $response, $args) { //Defino los servicios
    try {
        //$data = $request->getParseBody(); //recupero los datos
        $json = $request->getBody();
        $data = json_decode($json, true);
        //echo 'Codigo:', data[nombre],'si?';
        $db = getDB(); //Cargar los datos
        $sth = $db->prepare("INSERT INTO pedido 
                                        (fecha, fk_cliente, descripcion, tipo_orden, nombre_articulo, lugar, altura, estado) VALUE (?,?,?,?,?,?,?,?)"); //insertamos la informacion

        $sth->execute(array($data['fecha'], $data['fk_cliente'], $data['descripcion'], $data['tipo_orden'], $data['nombre_articulo'], $data['lugar'], $data['altura'], $data['estado'])); //sustituimos y ejecutamos.
        $response->getBody()->write('{"error":"ok"}'); //cuando la conexion halla terminado.

    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso que se halla generado algún error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->post('/updateDato', function ($request, $response, $args) {  //Defino los servicios 
    try {
        $json = $request->getBody();
        $data = json_decode($json, true);
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("UPDATE `pedido` SET fecha=?, descripcion=?, tipo_orden=?, nombre_articulo=?, lugar=? ,altura=? ,fk_cliente=? WHERE id_pedido=?"); //Insertamos información

        $sth->execute(array($data['fecha'], $data['descripcion'], $data['tipo_orden'], $data['nombre_articulo'], $data['lugar'], $data['altura'], $data['fk_cliente'], $data['id_pedido'])); //Sustituimos
        $response->getBody()->write('{"error":"ok"}'); //Cuando la conexión se termine
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso de error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->post('/removeDato', function ($request, $response, $args) {  //Defino los servicios 
    try {
        $json = $request->getBody();
        $data = json_decode($json, true);
        $db =  getDB(); //Carga los datos
        $sth = $db->prepare("DELETE FROM pedido
                             WHERE id_pedido = ?"); //Insertamos información
        $sth->execute(array($data['id_pedido'])); //Sustituimos
        $response->getBody()->write('{"error":"ok"}'); //Cuando la conexión se termine
    } catch (PDOException $e) {

        $response->getBody()->write('{"error":{"texto":' . $e->getMessage() . '}}'); //En caso de error
    }
    return $response
        ->withHeader('Content-Type', 'application/json');
});

$app->run();
