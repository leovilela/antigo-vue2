module.exports = [
  "@nuxtjs/axios",
  "vue-warehouse/nuxt",
  "nuxt-i18n",
  "@nuxtjs/style-resources",
  [
    "@nuxtjs/firebase",
    {
      config: {

        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,

      },
      services: {
        auth: true,
        analytics: true,
        firestore: true,
      },
    },
  ],
];
