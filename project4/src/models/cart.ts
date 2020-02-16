export interface Cart {
  _id: String;
  userId: String;
  date: Date;
  isOpen: Number;
  products: [];

  totalPrice?: Number;
}
