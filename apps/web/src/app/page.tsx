import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Sports Academy Management System
        </h1>
        <p className="text-center text-lg mb-8 text-muted-foreground">
          Comprehensive platform for managing sports academies, teams, athletes, and more.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Dashboard
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Team Management</h3>
            <p className="text-sm text-muted-foreground">
              Organize teams, manage rosters, and track athlete performance.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Attendance Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Monitor training sessions and match attendance in real-time.
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Financial Management</h3>
            <p className="text-sm text-muted-foreground">
              Handle subscriptions, invoices, and payments seamlessly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
