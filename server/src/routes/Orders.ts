
import { OrderDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';

// Init shared
const router = Router();
const orderDao = new OrderDao();

router.get('/all', async (req: Request, res: Response) => {
    try {
        const orderby = req.query.orderby;
        const Orders = await OrderDao.getAll(orderby);
        return res.status(OK).json({Orders});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

export default router;
