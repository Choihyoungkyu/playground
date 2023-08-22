'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import style from './Navbar.module.css';

const Navbar = () => {
  const router = useRouter();

  return (
    <section className={style.nav}>
      <div className={style.logo} onClick={() => router.push('/')}>
        Logo
      </div>
      <ul className={style.menu}>
        <li key="calculator" tabIndex={0} onClick={() => router.push('/calculator')}>
          Calculator
        </li>
      </ul>
    </section>
  );
};

export default Navbar;
