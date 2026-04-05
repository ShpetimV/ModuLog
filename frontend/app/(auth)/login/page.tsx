import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-lime-100 p-6 md:p-10 ">
      <div className="w-full max-w-sm md:max-w-5xl">
        <LoginForm />
      </div>
    </div>
  )
}
