function configureShare (shareConfig) {
  if (window.android && android.configureShare) {
    android.configureShare(JSON.stringify(shareConfig))
  } 
}


