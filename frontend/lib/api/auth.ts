const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function registerUser(data: { email: string; password: string; firstName: string; lastName: string }) {
    const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Registration failed");
    }
}

export async function loginUser(data: { email: string; password: string }) {
    const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Login failed");
    }
}

export async function logoutUser() {
    await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    })
}
