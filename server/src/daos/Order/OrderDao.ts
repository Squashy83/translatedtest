import { IOrder } from '@entities';


const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'password'
});

export interface IOrderDao {
    getAll: (orderby: any) => Promise<IOrder[]>;
}

export class OrderDao implements IOrderDao {

    /**
     *
     */
    public async getAll(orderby: any): Promise<IOrder[]> {
        // TODO

        const [rows, fields] = await connection.execute('SELECT * FROM `orders` ORDER BY `date` ?', [orderby === 'newestfirst' ? 'DESC' : 'ASC']);
        return rows;
    }
}
