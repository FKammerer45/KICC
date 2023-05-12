import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "7d5ec8bc-11f1-45b8-be26-222be601da4d",
        authority: "https://urlshortenerkicc.b2clogin.com/urlshortenerkicc.onmicrosoft.com/B2C_1_urlshortenerlogin",
        knownAuthorities: ["urlshortenerkicc.b2clogin.com"],
        redirectUri: "https://delightful-tree-09b553f03.3.azurestaticapps.net/",
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: false,
    },
};

const msalInstance = new PublicClientApplication(msalConfig);

async function signIn() {
    try {
        const loginRequest = {
            scopes: ["openid", "profile"],
        };
        const loginResponse = await msalInstance.loginPopup(loginRequest);
        console.log("User logged in:", loginResponse);
    } catch (error) {
        console.error("Error during login:", error);
    }
}

async function acquireToken() {
    try {
        const tokenRequest = {
            scopes: ["https://urlshortenerkicc.onmicrosoft.com/7d5ec8bc-11f1-45b8-be26-222be601da4d/urlshortenerscope"],
            account: msalInstance.getAllAccounts()[0],
        };
        const tokenResponse = await msalInstance.acquireTokenSilent(tokenRequest);
        return tokenResponse.accessToken;
    } catch (error) {
        console.error("Error acquiring token:", error);
    }
}

async function callApi() {
    const accessToken = await acquireToken();
    const response = await fetch("https://urlshorthenerfunc.azurewebsites.net/api/ShortenUrl\n", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    const data = await response.json();
    console.log("API response:", data);
}

window.signIn = signIn;
