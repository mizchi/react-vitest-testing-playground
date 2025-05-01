export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <h1>App</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/state">State</a>
          </li>
        </ul>
      </nav>
      <main>{props.children}</main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}
