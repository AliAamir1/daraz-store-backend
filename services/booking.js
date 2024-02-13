import { Bookings, BookingProducts, Products } from "../db/connection.js";
import { bookingStatuses } from "../consts.js";
const generateBooking = async (userId, orderDetails, totalAmount = 100) => {
  const bookingData = {
    userId: userId,
    totalAmount: totalAmount,
    status: bookingStatuses.PENDING,
  };
  const booking = await Bookings.create(bookingData);


  let orderItems = JSON.parse(orderDetails);
  orderItems = orderItems.map((item)=>{return {...item , bookingId : booking.id }})
  const createdBookingProducts = await BookingProducts.bulkCreate(orderItems);

  const productIds = orderItems.map((item) => item.productId);
  const products =  await Products.findAll({ where: { id: productIds } });

  for (let i = 0; i < createdBookingProducts.length; i++) {
    const createdBookingProduct = createdBookingProducts[i];
    const product = products.find((p) => p.id === createdBookingProduct.productId);
  
    if (!product) {
      return ;
    }

    const updatedQuantity = product.quantity - createdBookingProduct.quantity;
    await Products.update({ quantity: updatedQuantity }, { where: { id: product.id } });
  }
 

  return true;
};

export { generateBooking };
