export class OrdersService {
    book(_currencyPair: string, amount: string) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const bookingSuccess = amount === "1m";
                resolve(bookingSuccess);
            }, 2000);
        });
    }
}
