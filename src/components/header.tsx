"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/content/site";
import { HeartIcon, MenuIcon, CloseIcon } from "@/components/icons";
import { Logo } from "@/components/logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Logo />
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <nav
          id="main-navigation"
          aria-label="Navegación principal"
          className={`main-nav ${open ? "main-nav--open" : ""}`}
        >
          <ul className="main-nav__links">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="main-nav__actions">
            <Link
              className="button button--ghost"
              href="/participar"
              onClick={() => setOpen(false)}
            >
              Sumate
            </Link>
            <Link
              className="button button--primary"
              href="/donar"
              onClick={() => setOpen(false)}
            >
              <HeartIcon width={18} height={18} /> Donar
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
