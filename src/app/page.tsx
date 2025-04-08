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
    <main className="min-h-screen bg-white">
      <header className="bg-[#1a1a1a] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/anima.png"
              alt="Anima"
              width={200}
              height={100}
              priority
            />
          </div>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            The app for classical musicians
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
                    src="/Event PDP.png"
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
                    src="/Yamen.png"
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
                    src="/Kelton.png"
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
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair mb-8">Stay Updated</h2>
            <p className="text-lg mb-8">
              Sign up to be notified when we launch and get early access to exclusive features.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className={`mt-4 ${status === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[#1a1a1a] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Anima. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
