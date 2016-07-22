function configureShare (shareConfig) {
  if (window.Android && Android.showToast) {
    Android.showToast(JSON.stringify(shareConfig))
  } 
}


