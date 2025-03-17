
  export async function getUserRoles(userId: string) {
    const credentials = {
      audience: process.env.AUDIENCE,
      client_id:process.env.API_CLIENT_ID,
      grant_type:process.env.GRANT_TYPE,
      client_secret:process.env.API_CLIENT_SECRET,
    };
  
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(credentials)
    };
  
    const response = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, options);
    const data=await response.json();
    const config = {
        method: "get",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${data.access_token}`
        }
    };
    return await (await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`, config)).json()
}

  