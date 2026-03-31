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
        credentials: "include"
    })

    if (!res.ok) throw new Error(await res.text())
    return res.text()  // returns your JWT token
}

export async function loginUser(data: { email: string; password: string }) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include"
    })

    if (!res.ok) throw new Error(await res.text())
    return res.text()  // returns your JWT token
}

export async function logoutUser() {
    await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    })
}
