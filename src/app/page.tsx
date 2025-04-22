'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setMessage('Failed to connect to the server. Please try again later.');
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 py-16">
        <nav className="mb-24">
          <Image
            src="/anima.png"
            alt="Anima"
            width={120}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-tight">
              Your Stage, Your Sound – Connect, Share & Sell with Ease
            </h1>
            <p className="text-xl text-gray-400">
              Make your mark and show the world your music and talent
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@website.com"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#E6B17E] placeholder-gray-500"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#E6B17E] text-black px-8 py-3 rounded-lg hover:bg-[#D4935E] transition-colors disabled:opacity-50 font-medium"
              >
                {status === 'loading' ? 'Signing up...' : 'Sign up'}
              </button>
            </form>
            {message && (
              <p className={`mt-4 ${status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </p>
            )}
          </div>

          <div className="relative md:pt-0 md:-mt-[30px]">
            <div className="relative z-20 md:absolute md:left-[-15%] lg:left-[-10%] xl:left-[-5%] md:-top-8">
              <Image
                src="/Real-Silver-Left.png"
                alt="App Screenshot 1"
                width={575}
                height={1246}
                className="rounded-[40px] shadow-2xl"
              />
            </div>
            <div className="relative mt-[-100px] ml-auto max-w-[575px] md:mt-0 md:absolute md:top-24 md:right-[-25%] lg:right-[-20%] xl:right-[-15%]">
              <Image
                src="/Real-Silver-Right.png"
                alt="App Screenshot 2"
                width={575}
                height={1246}
                className="rounded-[40px] shadow-2xl opacity-95"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
