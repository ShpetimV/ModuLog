
export default function DashboardPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
      <p className="mt-4 text-lg">This is a protected page that only authenticated users can access.</p>
    </div>
  )
}