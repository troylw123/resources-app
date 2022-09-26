import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { isAuth, logout } from "../helpers/auth";

export const Layout = (props) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => NProgress.start());
    router.events.on("routeChangeComplete", () => NProgress.done());
    router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  //found this code on stack overflow, fixes hydration errors (client html doesn't match server)
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

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

      {!isAuth() && (
        <React.Fragment>
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
        </React.Fragment>
      )}

      {isAuth() && isAuth().role === "admin" && (
        <li className="nav-item ms-auto">
          <Link href="/admin">
            <a className="nav-link">{isAuth().name}</a>
          </Link>
        </li>
      )}
      {isAuth() && isAuth().role === "subscriber" && (
        <li className="nav-item ms-auto">
          <Link href="/user">
            <a className="nav-link">{isAuth().name}</a>
          </Link>
        </li>
      )}
      {isAuth() && (
        <li className="nav-item">
          <a onClick={logout} className="nav-link">
            Logout
          </a>
        </li>
      )}
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
