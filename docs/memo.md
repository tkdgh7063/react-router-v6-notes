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
