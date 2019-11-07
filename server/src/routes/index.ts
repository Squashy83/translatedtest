import { Router } from 'express';
import OrderRouter from './Orders';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/orders', OrderRouter);

// Export the base-router
export default router;
