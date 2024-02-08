import {
  UPDATE_TYPESOFSERVICES,
  CLEAR_TYPESOFSERVICES,
} from "~/store/transaction/mutations";

export default async function ({ $services, store, route }) {
  const token = store.state.auth.accessToken;
  if (route.query.embedded === "true" || !token) return;
  return $services.transaction.getTypesOfServices()
    .then((services) => {
      if (services.lenght <= 0) {
        store.commit(`transaction/${CLEAR_TYPESOFSERVICES}`);
        return;
      }
      store.commit(`transaction/${UPDATE_TYPESOFSERVICES}`, services);
    }).catch((err) => {
      store.commit(`transaction/${CLEAR_TYPESOFSERVICES}`);
      if (err.status === 204) {
        return
      }
      console.error(err);
    });
}
