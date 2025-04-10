'use client';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="w-full">
      <div className="container bg-primary">
        <h1>Hello World</h1>
        <Button onClick={() => alert('Hello')}>Click me</Button>
      </div>
    </div>
  );
}
