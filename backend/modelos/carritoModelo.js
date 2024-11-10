import { db } from "./mysql.js";
import { clientError } from "../red/errors.js";

const carShop = async () => {
  const sql = `SELECT l.titulo,
    e.nombre AS editorial,
    a.nombre AS autor, 
    s.cantidad_disponible AS stock, 
    l.estado, l.precio_venta as precio
    FROM libros l INNER JOIN editoriales e ON e.id_editorial = l.id_editorial
    INNER JOIN libros_autores la ON la.id_libro = l.id_libro
    INNER JOIN autores a ON a.id_autor = la.id_autor
    INNER JOIN stock s ON s.id_libro = l.id_libro`;
  const [rows] = await db.execute(sql);
  return rows;
};

const createSale = async (items, id_usuario) => {
  //calcular el precio

  const totalPrice = items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  //ingresar la venta

  const sql = `INSERT INTO ventas (id_usuario, fecha_venta, precio_total)
  VALUES (?,NOW(),?)`;

  const [reslutVenta] = await db.execute(sql, [id_usuario, totalPrice]);

  // detalles del pedido
  for (const item of items) {
    const sql = `INSERT INTO detalles_pedido (id_pedido, id_libro, cantidad, precio_unitario, tipo_operacion)
    VALUES (?,?,?,?,?)`;

    await db.execute(sql, [
      reslutVenta.insertID,
      item.id_libro,
      item.cantidad,
      item.precio,
    ]);
  }
  return { id_venta: reslutVenta.insertID, totalPrice, items };
};

export const cartModel = {
  carShop,
  createSale,
};
