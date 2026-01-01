import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Sports Academy Cyprus
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Complete management system for sports academies in Cyprus
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline">
                Register
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">For Students</h3>
            <p className="text-gray-600">
              Track your progress, book sessions, and achieve your goals
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">For Coaches</h3>
            <p className="text-gray-600">
              Manage schedules, track attendance, and monitor student progress
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">For Admins</h3>
            <p className="text-gray-600">
              Complete academy management with analytics and reporting
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
