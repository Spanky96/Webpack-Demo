
function print_close(){
  try{//如果IE中允許，則先預覽//頁麵裏已經定義了WebBrowser，此處重新定義，避免了IE的安全警告，這一定是IE的一個漏洞！
    // Create OLE Object
    var wb = '<OBJECT ID="WebBrowser" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
    // Place Object on page
    document.body.insertAdjacentHTML('beforeEnd', wb);
    // Execute Object
    WebBrowser.ExecWB(7,1);
    // Destroy Object
    WebBrowser.outerHTML = "";
  }catch(e){//否則，直接打印
    window.print();
  }
  window.close();
}

