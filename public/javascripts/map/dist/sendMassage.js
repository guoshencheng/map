function configureShare (shareConfig) {
  if (window.Android && Android.configureShare) {
    Android.configureShare(JSON.stringify(shareConfig))
  } 
}


