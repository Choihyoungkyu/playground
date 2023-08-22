'use client';

import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();

  return <main className={styles.main}>Hi, There? Good!</main>;
}
