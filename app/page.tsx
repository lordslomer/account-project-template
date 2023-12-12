import Link from 'next/link';
import { Button, c } from './UI/button';

export default function HomePage() {
  return (
    <main className='md:h-screen flex justify-center items-center'>
      <Link href="/login">
        <Button variant={c.BLUE}>
          login
        </Button>
      </Link>
    </main>
  )
}
