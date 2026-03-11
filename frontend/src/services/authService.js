export async function checkAuth() {

    const res = await fetch(
        "https://hub.buildprocure.com/api/auth/me",
        {
            credentials: "include"
        }
    );

    if (!res.ok) throw new Error("Not logged in");

    return res.json();
}