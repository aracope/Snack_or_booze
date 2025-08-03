### Conceptual Exercise

Answer the following questions below:

1. What is the purpose of the React Router?
   React Router is a library that enables navigation and dynamic routing in a React application. It allows you to build single-page applications (SPAs) by handling in-app navigation without full page reloads.

2. What is a single page application?
   A Single Page Application (SPA) is a web application that loads a single HTML page and dynamically updates the page content based on user interaction without reloading the whole page. It uses JavaScript to modify the UI and manage state client-side.

3. What are some differences between client side and server side routing?
   | Feature | Client-side | Server-side |
   | -------- | -------- | -------- |
   | Navigation | Handled in the browser via JavaScript | Each navigation triggers a server request |
   | Speed | Faster after initial load | Slower (entire page reloads) |
   | User Experience | Smoother transitions | Often feels less responsive |
   | SEO | Harder to optimize (without SSR) | Easier, since content is served by server |

4. What are two ways of handling redirects with React Router? When would you use each?

   - `<Navigate />` component:
     Used for render-time redirects in JSX.
     Example use: Redirecting from a protected route to login.

   - useNavigate() hook:
     Used for event-based or imperative redirects (e.g., in an event handler).
     Example use: Redirect after form submission or login.

5. What are two different ways to handle page-not-found user experiences using React Router?

   - Wildcard Route (_):
     Define a route like ``` <Route path="_" element={<NotFound />} /> ``` at the end of your routes to catch unmatched paths.

   - Conditional rendering in a layout or parent route:
     Render a `<NotFound />` component if no nested route matches.

6. How do you grab URL parameters from within a component using React Router?
   Use the useParams() hook:

```js
import { useParams } from "react-router-dom";

function MyComponent() {
  const { id } = useParams(); // e.g., for route "/users/:id"
}
```

7. What is context in React? When would you use it?

   - React Context provides a way to pass data through the component tree without manually passing props down at every level.
     When to use it:
   - When several components need access to the same data (e.g., user info, theme, language).
   - Example: Auth context, theme toggling, or a shopping cart.

8. Describe some differences between class-based components and function
   components in React.
   | Feature | Class-based Components | Function Components |
   | -------- | -------- | -------- |
   | Syntax | Uses ES6 classes | Uses plain functions |
   | State & Lifecylce | `this.state`, lifecycle methods | `useState`, `useEffect` hooks |
   | Boilerplate | More verbose (e.g., constructor, binding) | More readable and concise |
   | `this` keyword | Required, can be confusing | not used |
   | Hooks support | not available | Fully supported |

9. What are some of the problems that hooks were designed to solve?

   - Reusing stateful logic:
     Before hooks, logic reuse required higher-order components (HOCs) or render props, which were harder to read.

   - Too much boilerplate:
     Class components required verbose syntax and lifecycle method juggling.

   - Confusing this keyword:
     Hooks eliminate the need to bind or understand this.

   - Better separation of concerns:
     Hooks allow you to group related logic (e.g., fetching data) instead of splitting it across lifecycle methods.
