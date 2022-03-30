import { Route } from "./routes.types";
import FormRouter from "../modules/form/form.routes";
import UserRouter from "../modules/user/user.routes";
import ServiceRouter from "../modules/service/service.routes";
import RoleRouter from "../modules/role/role.routes";

export const routes = [
    new Route('/user', UserRouter),
    new Route('/form',FormRouter),
    new Route('/service',ServiceRouter),
    new Route('/role',RoleRouter),
];

export const excludedPaths = [
    { method: 'POST', route: '/form/feedback' },
    { method:'POST', route: '/user/login'},
    { method:'GET', route: '/service/display'},
    { method:'GET', route: '/user/display'},
    { method:'GET', route: '/role/display'}
];