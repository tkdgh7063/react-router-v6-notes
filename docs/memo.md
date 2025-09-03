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

## 5. errorElement

- **New in v6**: `errorElement` is a special property in route objects
- Used to render a fallback UI when:
  - An error occurs in the component (e.g., thrown inside `Home`)
  - A non-existent route is accessed (404 handling)

### Key Points

- Defined per route in the route object
- Can be applied at **layout level** (covers all children) or **per path**
- Works together with `useRouteError()` hook for accessing error details

### Example

```tsx
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

function ErrorComponent() {
  const error = useRouteError();
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}

function Home() {
  throw new Error("Home crashed!"); // for testing
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorComponent />,
  },
  {
    path: "*",
    element: <div>404 Not Found</div>,
    errorElement: <ErrorComponent />,
  },
]);

<RouterProvider router={router} />;
```

### Notes

- `errorElement` replaces the need for manual try/catch inside components
- Useful for **404 pages, unexpected crashes, and boundary errors**

## 6. useNavigate

- `useNavigate` is a hook provided by `react-router-dom v6`.
- It replaces the `useHistory` hook from v5.
- Used to programmatically navigate between routes.

### Example

```jsx
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // Navigate to home
  };

  return <button onClick={goHome}>Go Home</button>;
}
```

### Key Features

#### 1. Basic Navigation

```jsx
navigate("/about");
```

#### 2. Relative Path Navigation

```jsx
navigate("details"); // Relative to the current path
```

#### 3. History Stack Navigation

```jsx
navigate(-1); // Go back
navigate(1); // Go forward
```

#### 4. Using Options

```jsx
navigate("/login", { replace: true });
// Replaces the current history entry (cannot go back)
```

#### 5. Basic Navigation

```jsx
navigate("/profile", { state: { userId: 123 } });
```

### Notes/Precautions

- useNavigate can only be called inside component functions (React Hooks rule).
- The navigate function is synchronous — routing occurs immediately upon calling.
- Use the replace: true option appropriately to manage browser history.

## 7. useParams

- `useParams` returns the route parameters from the current URL.
- Available in both React Router v5 and v6.
- No major changes between v5 and v7.

### Usage

```jsx
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  return <h1>User ID: {id}</h1>;
}
```

### Notes

- Returns an object with key-value pairs of the dynamic segments.
- In Typescript, v6 allows generic typing:

```tsx
const { id } = useParams<{ id: string }>();
```

- Behavior is consistent between v5 and v6.

## 8. Outlet

- **New in v6**: `Outlet` is a component that acts as a placeholder for rendering nested routes.
- Allows child routes to be displayed inside the parent route's layout.

### Example

```tsx
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      {/* Nested routes will be rendered here */}
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "about",
        element: <div>About Page</div>,
      },
      {
        path: "contact",
        element: <div>Contact Page</div>,
      },
    ],
  },
]);
```

### Nested Example (User + Followers)

```tsx
const router = createBrowserRouter([
  {
    path: "users/:userId",
    element: <User />,
    children: [
      {
        path: "followers",
        element: <Followers />,
      },
    ],
  },
]);
```

In `User.tsx`:

```tsx
function User() {
  return (
    <div>
      <h2>User Screen</h2>
      <Outlet /> {/* Followers will render here */}
    </div>
  );
}
```

### Notes

- `Outlet` is required for **nested routing** in v6.
- Parent components stay rendered while child components update inside `<Outlet />`.
- Helps to create layout-based routing (e.g., sidebar, header, or dashboard layout).

## 9. useOutletContext

- **New in v6**: `useOutletContext` is a hook that allows child routes to access data passed from a parent route via `<Outlet context={...} />`.
- Enables communication from a parent route to its nested child routes without prop drilling.

### Example

In `User.tsx` (parent route):

```tsx
import { Outlet } from "react-router-dom";

function User() {
  const user = { id: 123, name: "Alex" }; // Example user
  return (
    <div>
      <h2>User Screen</h2>
      {/* Pass context to child routes */}
      <Outlet context={{ userData: user }} />
    </div>
  );
}
```

In `Followers.tsx` (child route):

```tsx
import { useOutletContext } from "react-router-dom";

interface UserContext {
  userData: { id: number; name: string };
}

function Followers() {
  const { userData } = useOutletContext<UserContext>();

  return <div>Followers of user {userData.name}</div>;
}
```

### Notes

- `Outlet` in the parent route must provide the `context` prop.
- `useOutletContext` must be called **inside a child route component**.
- Works well with **nested routes** to share data like user info, settings, or other state.
- Avoid using it for **global state**; use Context API or state management libraries instead.
