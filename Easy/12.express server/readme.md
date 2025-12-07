Express.js routing defines how an application responds to a client request at a particular endpoint (URI path) using a specific HTTP method. Routes are defined using methods on the express application instance (e.g., app.get()) or a Router instance (e.g., router.post()).

Basic Route Syntax
The general syntax for defining a route is app.METHOD(PATH, HANDLER), where:
app: Your Express application instance.

METHOD: A lowercase HTTP request method (e.g., get, post, put, delete).

PATH: The URL path or URI the server listens to, which can be a string, string pattern, or regular expression.

HANDLER: A callback function (or an array of functions) that executes when the route matches the request. It takes (req, res, next) as arguments.

Common HTTP Route Methods
Express provides methods for all standard HTTP verbs. The most commonly used are:
app.get(path, handler): Used to retrieve data or resources from the server. This is typically used for fetching web pages or API data.
app.post(path, handler): Used to send data to the server, often to create a new resource (e.g., submitting a form, creating a new user).
app.put(path, handler): Used to update an existing resource on the server, usually by replacing the entire resource with new data.
app.delete(path, handler): Used to remove a specified resource from the server.
app.patch(path, handler): Used to partially update a resource, sending only the changes instead of the entire new resource.

Special Routing Methods and Concepts

app.all(path, handler): This method matches all HTTP methods at a specified path. It's useful for applying middleware functions that need to run regardless of the HTTP verb used (e.g., authentication checks for a specific route path).

app.route(path): This allows you to create chainable route handlers for a single path, which helps in avoiding redundancy and typos.

javascript
app.route('/user')
.get((req, res) => { /_ fetch user _/ })
.post((req, res) => { /_ create user _/ })
.put((req, res) => { /_ update user _/ });

express.Router(): This function creates a modular, mountable router instance, often referred to as a "mini-app". This is essential for organizing routes into separate files (e.g., userRoutes.js, productRoutes.js) in larger applications. You then use app.use('/users', userRouter) to mount the router at a specific base path.

1. Server-Side Rendering (SSR)
In SSR, the complete HTML content of the page is generated on the server for every request. 
Aspect 	Notes
How it Works	The browser sends a request, the server executes the page logic/data fetching, builds the full HTML string, and sends that HTML to the browser. The browser then displays it immediately.
Pros	Better SEO: Search engine crawlers see fully rendered content immediately. Faster initial load time: The user sees content quickly (Time to First Contentful Paint).
Cons	Slower response time from server: The server has to do work for every request. Less dynamic: Page interactions (like clicking a button that updates just one part of the page) often require a full page refresh or complex setup (hydration).
Best For	E-commerce sites, blogs, news portals, marketing sites where SEO is critical.

2. Client-Side Rendering (CSR)
In CSR, the server sends a minimal HTML shell (often just an empty <div> where the app will load) and a bundle of JavaScript code. The browser then downloads the JavaScript, executes it, fetches data via APIs, and builds the page directly in the user's browser. 
Aspect 	Notes
How it Works	Browser downloads minimal HTML/JS shell. JavaScript runs in the browser, makes API calls to fetch data, and dynamically injects the HTML into the page.
Pros	Rich, app-like experience: Very fast transitions and interactions after the initial load. Less server load: Server just serves static files and API data, not full HTML pages.
Cons	Poor SEO (historically): Crawlers initially saw an empty page (though this is improving with modern crawlers). Slower initial load time (Time to Interactive): The user waits until all JavaScript loads and executes before seeing anything meaningful.
Best For	Dashboards, complex web applications, social media feeds, internal tools where user interaction is primary.

// A controller without local try/catch blocks
export const signUp = async (req, res, next) => {
  // We no longer need try...catch here.
  // If signUpService fails, the rejected promise is caught by Express 5's engine
  // and passed automatically to your global error handling middleware.
  const user = await signUpService(req.body);

  return res
    .status(StatusCodes.CREATED)
    .json(successResponse(user, 'User created successfully'));
  
  // Note: We don't need 'catch' or 'next(error)'
};

// In your main app.js/server.js file (must have all four arguments):
app.use((err, req, res, next) => {
  console.error('Global error middleware:', err);
  // This middleware now handles all async errors automatically
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  if (err.statusCode) {
    return res.status(statusCode).json(customErrorResponse(err));
  }

  return res
    .status(statusCode)
    .json(internalErrorResponse(err));
});