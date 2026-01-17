"use client"
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center w-full px-4 text-center">

      <h1 className="text-main font-extrabold text-9xl opacity-20">
        404
      </h1>
      
      
      <div className="-mt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Lost in Space?
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        
        
        <div className="flex flex-col sm:flex-row gap-2 justify-center">

          <Button variant='main' href="/" className='justify-center'
          >
            <Home/>
            Go to Homepage
          </Button>
          <Button 
            className='justify-center'
            onClick={() => window.history.back()}
            outline >
                <ArrowLeft/>
                Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}