# React Router v6

## 1. BrowserRouter

- In v6, `BrowserRouter` still wraps the app as before
- **Key change:** `Switch` is replaced by `Routes`

## 2. Routes

- Use `element` instead of `component`
  - Previous v5 syntax: `<Route path="/" component={Home} />`
  - v6 syntax: `<Route path="/" element={<Home />} />`
- `element` must be **JSX**, not just the component name
- `exact` prop is no longer needed (matching is exact by default)

## 3. CreateBrowserRouter

- A function to create a BrowserRouter in React Router v6
- Accepts an **array of route objects** instead of JSX Routes
- Each route object can have:
  - `path`: the URL path
  - `element`: the JSX component to render
  - `children`: nested route objects for sub-routes
- Works naturally with **Outlet** for nested routes
- Useful for programmatic route definitions and larger apps

## 4. RouterProvider

- In React Router v6, when using `createBrowserRouter`, render the router with `RouterProvider`
- Replaces the standard `<BrowserRouter>` wrapper
- Usage example in `index.tsx`:

```tsx
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```
