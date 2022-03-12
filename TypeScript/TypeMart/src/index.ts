import products from "./products";

class Product {
  constructor(name: string, price: string, preOrder: string) {
    this.name = name;
    this.price = price;
    this.preOrder = preOrder;
  }

  name: string
  price: string
  preOrder: string
}



class ShipReceipt {
  constructor(product: Product) {
    this.product = product;

    this.setShippingFee();
    this.setTax();
    this.calculateTaxTotal();
    this.calculateTotal();

  }

  product: Product | undefined;
  shipping: number = 5;
  taxPercent: number = 0;
  taxTotal: number = 0;
  total: number = 0;
  shippingAddress: string = 'New York';  

  private calculateTotal() {
    this.total = this.taxTotal + this.shipping + Number(this.product?.price);
  }

  private calculateTaxTotal(total?: number) {
    this.taxTotal = Number(this.product?.price) * this.taxPercent;
  }

  public setShippingFee() {
    if (Number(this.product?.price) > 25) {
      this.shipping = 0;
    }
  }

  public setTax() {
    const regex = /New York/;
    if (this.shippingAddress.match(regex)) {
      this.taxPercent = 0.1;
    }
  }
}


//get product
let product: Product = products.filter(product => product.name === 'fanny pack')[0];
if (product) {
  let aReceipt: ShipReceipt = new ShipReceipt(product);

  console.log(`
Product name: ${aReceipt.product?.name}
Shipping address: ${aReceipt.shippingAddress}
Price of the product: ${aReceipt.product?.price}
Tax total: ${aReceipt.taxTotal}
Shipping fee: ${aReceipt.shipping}
Total amount: ${aReceipt.total}`);
}


