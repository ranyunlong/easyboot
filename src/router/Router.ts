import { HttpServlet } from '../core/HttpServlet';
import { RouterConfiguration } from 'src/configurations/RouterConfiguration';

export class Router {
    constructor(public application: HttpServlet, public configs: RouterConfiguration = new RouterConfiguration()) {
        
    }
}