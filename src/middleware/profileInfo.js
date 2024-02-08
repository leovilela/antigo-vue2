  import profileImage from "~/assets/img/profile.jpg";
import { SET_AFFILIATE_PICTURE } from "../store/affiliate/mutations";

export default async function ({
  $axios,
  store,
  redirect,
  route,
}) {
  const pagesAuth = [
    "/painel-do-cliente",
    "/meus-dados-cadastrais",
  ];
  if (pagesAuth.includes(route.fullPath)) {
    return $axios.get(`${process.env.API_AFFILIATE}/affiliates/ProfilePicture`, { responseType: "arraybuffer" })
      .then((response) => {
        const image = btoa(
          new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), ""),
        );
        const imgDataUrl = response.headers["content-type"] ? `data:${response.headers["content-type"].toLowerCase()};base64,${image}` : profileImage;
        store.commit("pictureLoad", imgDataUrl);
        store.commit(`affiliate/${SET_AFFILIATE_PICTURE}`, imgDataUrl);
      }).catch((err) => {
        store.commit("pictureLoad", profileImage);
        store.commit(`affiliate/${SET_AFFILIATE_PICTURE}`, profileImage);
        if (err.status === 204) {
          return
        }
        console.error(err);
      });
  }
}
