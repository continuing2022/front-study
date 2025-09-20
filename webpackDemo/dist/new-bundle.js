(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id];
    const module = { exports: {} };

    function localRequire(filePath) {
      return require(mapping[filePath]);
    }

    fn(localRequire, module, module.exports);
    return module.exports;
  } 

  require(0);
})({
  
  '0': [
    function (require, module, exports) {
      "use strict";

require("./style.css");
// import { say22 } from "./2222.js";  // 添加 .js 扩展名
// import jsonDate from './jsonData.json'

// say22()
console.log('33333');
// console.log(jsonDate)
    },
    {"./style.css":1}
  ],
  
  '1': [
    function (require, module, exports) {
      "use strict";

var style = document.createElement('style');
style.innerHTML = "/**__CSS_SOURCE_.container-a687{\r\n  background-color: skyblue;\r\n}\r\n.vue-9fcd{\r\n  background-color: skyblue;\r\n}\r\n.react-3ee7{\r\n  background-color: skyblue;\r\n}\r\n.angular-f5b2{\r\n  background-color: skyblue;\r\n}__**//**__CSS_classKeyMap_{\"container\":\"container-a687\",\"vue\":\"vue-9fcd\",\"react\":\"react-3ee7\",\"angular\":\"angular-f5b2\"}__**/";
document.head.appendChild(style);
    },
    {}
  ],
  
});
