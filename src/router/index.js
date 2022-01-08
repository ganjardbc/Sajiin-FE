import routeAdmin from './admin'
import routeCustomer from './customer'
import routeVisitor from './visitor'
import routeAuth from './auth'

export const routes = [
    { ...routeAuth },
    { ...routeAdmin },
    { ...routeCustomer },
    { ...routeVisitor },
];