
export interface IOrder {
    id?: number;
    name: string;
    date: string;
}

export class Order implements IOrder {

    public id?: number;
    public name: string;
    public date: string;

    constructor(nameOrOrder: string | IOrder, date?: string) {
        if (typeof nameOrOrder === 'string') {
            this.name = nameOrOrder;
            this.date = date || '';
        } else {
            this.name = nameOrOrder.name;
            this.date = nameOrOrder.date;
        }
    }
}
