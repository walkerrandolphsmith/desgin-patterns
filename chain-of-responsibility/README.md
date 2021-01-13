# Chain of Responsibility

Coordinate the collaboration between multiple "handlers" or a request by allowing each handler to either process the request or pass the request to the next handler to process the request.

Middlewares used in Express.js and Redux follow this general idea. In the case of Express each HTTP request can be processed by one or more handlers. Each handler has the oppurtunity to respond to the request or pass it along to the next handler. This piping effect enables authroization handlers to produce an unauthorized response or pass along the request if authorized to the next handler.

Redux middlewares leverage the Open-Closed principle allowing the store to be extended with functionality, but closed to direct modification.
