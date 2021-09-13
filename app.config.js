import "dotenv/config"

export default {
  name: "GratisPay",
  version: "1.0.0",
  extra: {
    authApiBaseUrl: process.env.AUTH_API_BASE_URL,
  },
}
