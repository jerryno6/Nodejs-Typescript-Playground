import { restaurants, Restaurant } from "./restaurants";
import { orders, Order, PriceBracket } from "./orders";


/// Add your getMaxPrice() function below:
function getMaxPrice(priceBracket: PriceBracket): number {
    switch (priceBracket) {
        case PriceBracket.Low:
            return 10;
        case PriceBracket.Medium:
            return 20;
        case PriceBracket.High:
        default:
            return 30;
    }
}

/// Add your getOrders() function below:
function getOrders(price: PriceBracket, orders: Order[][]): Order[][] {
    let filteredOrders: Order[][] = [];
    var maxPrice = getMaxPrice(price);

    orders.forEach(restaurantOrders => {
        filteredOrders.push(restaurantOrders.filter(o => o.price <= maxPrice));
    });

    return filteredOrders;
}

/// Add your printOrders() function below:
function printOrders(orders: Restaurant[], eligibleOrders: Order[][]): void {


    for (let i in restaurants) {
        // print restaurant
        console.log(`Restaurant Name #${Number(i) + 1}`);

        // print order
        let ordersOfRestaurant = eligibleOrders[i];
        for (let j in ordersOfRestaurant)
            console.log(`- Order ${Number(j) + 1}  ${ordersOfRestaurant[j].price}`);
    };
}

/// Main
const elligibleOrders = getOrders(PriceBracket.Low, orders);
printOrders(restaurants, elligibleOrders);
