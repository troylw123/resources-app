import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export const Layout = (props) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  const head = () => (
    <React.Fragment>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT"
        crossOrigin="anonymous"
      />
    </React.Fragment>
  );

  const nav = () => (
    <ul className="nav nav-tabs bg-light">
      <li className="nav-item hover-dark">
        <Link href="/">
          <a className="nav-link">Home</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/login">
          <a className="nav-link">Login</a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/register">
          <a className="nav-link">Register</a>
        </Link>
      </li>
    </ul>
  );

  return (
    <React.Fragment {...props}>
      {head()}
      {nav()}
      <div className="container pt-5 pb-5">{props.children}</div>
    </React.Fragment>
  );
};
