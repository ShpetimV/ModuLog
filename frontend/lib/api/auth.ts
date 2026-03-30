const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function registerUser(data: {
    email: string
    password: string
    firstName: string
    lastName: string
}) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error(await res.text())
    return res.text()  // returns your JWT token
}