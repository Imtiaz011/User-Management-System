import express from 'express';
import { homeRoutes, add_user, update_user } from '../services/render.js';
import {create, find, update, remove} from '../controller/controller.js';


const route = express.Router();

//Section for routing between each page

/**
 * @description Home Route
 * @method GET/
 */

route.get('/',homeRoutes);

/**
 * @description add Route
 * @method GET/add-user
 */

route.get('/add-user',add_user);
/**
 * @description update Route
 * @method GET/update-user
 */

route.get('/update-user',update_user);

//Section for create, find, update, remove operations API

route.post('/api/users', create);
route.get('/api/users', find);
route.put('/api/users/:id', update);
route.delete('/api/users/:id', remove);

export default route;