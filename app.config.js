import "dotenv/config"

export default {
  name: "GratisPay",
  version: "1.0.0",
  extra: {
    authApiBaseUrl: process.env.AUTH_API_BASE_URL,
    walletsApiBaseUrl: process.env.WALLET_API_BASE_URL,
    accountsApiBaseUrl: process.env.ACCOUNT_API_BASE_URL
  },
  android: {
    package: "com.byteview.systems.gratispay"
  }
}
