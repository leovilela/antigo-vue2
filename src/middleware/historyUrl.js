export default function ({
  store,
}) {
  const actualUrl = { historyUrl: window.location.pathname };
  store.dispatch("utils/saveData", actualUrl);
}
