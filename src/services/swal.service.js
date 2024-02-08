export function SwalService($swal, title, text) {
  const commonProperties = {
    title: title,
    text: text,
    confirmButtonText: "OK",
    showCloseButton: true,
    customClass: "swal-listo",

  };

  const callDanger = (otherOptions = {}) => {
    $swal({ ...commonProperties, icon: "error", ...otherOptions})
  }

  const callInfo = (confirmButtonText, cancelButtonText, otherOptions = {}) => {
    $swal({
      ...commonProperties, icon: "info", confirmButtonText,
      cancelButtonText,
      ...otherOptions
    })
  }

  const callSuccess = (otherOptions = {}) => {
    $swal({...commonProperties, icon: "success", ...otherOptions})
  }

  return {
    callDanger,
    callInfo,
    callSuccess
  }
}
