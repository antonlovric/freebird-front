import { defineStore } from 'pinia';
interface IProduct {
    id: number;
    title: string;
    quantity: number;
    url: string;
    price: String;
}

export const useCartStore = defineStore('cart-store', {
    state: () => ({
        cartItems: [] as IProduct[],
    }),
    actions: {
        addItem(product: IProduct) {
            const duplicateProduct = this.cartItems.find(
                (item: IProduct) => item.id === product.id
            );

            duplicateProduct ? duplicateProduct.quantity++ : this.cartItems.push(product);
        },
        removeItem(productId: number) {
            this.cartItems = this.cartItems?.filter((item: IProduct) => item.id !== productId);
        },
        clearCart() {
            this.cartItems = [];
        },
    },
    getters: {
        cartData: (state) => state,
        cartQuantity: (state) => state?.cartItems.reduce((prev, next) => prev + next?.quantity, 0),
        cartPrice: (state) =>
            state?.cartItems.reduce((prev, next) => prev + Number(next?.price), 0),
        productIds: (state) => state.cartItems.map((item) => item.id),
    },
    persist: true,
});
