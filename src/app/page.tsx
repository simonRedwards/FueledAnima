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
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to submit email');
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-[#1a1a1a] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-5xl md:text-6xl mb-6">
            Your App Name
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            A brief, compelling description of your app that captures its essence and value proposition.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {/* Screenshot 1 */}
            <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
              <div className="relative w-[300px] mx-auto">
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-16 h-2.5 bg-black rounded-full"></div>
                <div className="rounded-[30px] overflow-hidden">
                  <Image
                    src="/screenshot1.png"
                    alt="App Screenshot 1"
                    width={300}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Screenshot 2 */}
            <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
              <div className="relative w-[300px] mx-auto">
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-16 h-2.5 bg-black rounded-full"></div>
                <div className="rounded-[30px] overflow-hidden">
                  <Image
                    src="/screenshot2.png"
                    alt="App Screenshot 2"
                    width={300}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Screenshot 3 */}
            <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
              <div className="relative w-[300px] mx-auto">
                <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 w-16 h-2.5 bg-black rounded-full"></div>
                <div className="rounded-[30px] overflow-hidden">
                  <Image
                    src="/screenshot3.png"
                    alt="App Screenshot 3"
                    width={300}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl mb-4">
            Be the first to know
          </h2>
          <p className="text-lg mb-8">
            Sign up to receive updates about our launch and early access.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-md mb-4 focus:outline-none focus:border-[#F7D18A]"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#F7D18A] text-[#1a1a1a] px-8 py-3 text-lg rounded-md hover:bg-[#f4c45f] transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Signing up...' : 'Sign Up'}
            </button>
            {message && (
              <p className={`mt-4 ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="bg-[#1a1a1a] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Your App Name. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
