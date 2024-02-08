import ClickSign from "./clicksign";


export default (ctx, inject) => {
  const $ClickSign = ClickSign;

  inject("ClickSign", $ClickSign);
  ctx.$ClickSign = $ClickSign;
};
