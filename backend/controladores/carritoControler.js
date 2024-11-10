import { cartModel } from "../modelos/carritoModelo.js";
import catchedAsync from "../red/catchAsync.js";
import response from "../red/respuesta.js";

const cartShop = async (req, res) => {
  const cart = await cartModel.carShop();
  response(res, 200, cart);
};

// crear venta

const addSale = async (req, res) => {
  const { items, id_usuario } = req.body;

  const newSale = await cartModel.createSale(items, id_usuario);
  response(res, 201, newSale);
};

export const cartControl = {
  cartShop: catchedAsync(cartShop),
  addSale: catchedAsync(addSale),
};

/*
el precio debe tener un contador que
me indique la cantidad que desea comprar
un boton para eliminar compra 
el subtotal con el precio por si hay mas de un libro o hay descuento
un boton que finaliza la compra
*/
