import { defineStore } from 'pinia';
interface IProduct {
    title: string;
    quantity: number;
    url: string;
}

export const useCartStore = defineStore('cart-store', {
    state: () => ({
        cartItems: [] as IProduct[],
    }),
    actions: {
        addItem(product: IProduct) {
            const duplicateProduct = this.cartItems.find(
                (item: IProduct) => item.title === product.title
            );
            duplicateProduct ? duplicateProduct.quantity++ : this.cartItems.push(product);
        },
    },
    getters: {
        cartData: (state) => state,
        cartQuantity: (state) => state.cartItems.reduce((prev, next) => prev + next.quantity, 0),
    },
    persist: true,
});
