import { Router } from 'express'
import { home } from '../home/home.controller';
import DecoratorRoutsers from '../decorators/router.decorators';

const router: Router = Router();


router.use(DecoratorRoutsers)

export default router