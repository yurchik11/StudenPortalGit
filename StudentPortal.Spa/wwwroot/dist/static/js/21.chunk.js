webpackJsonp([21],{709:function(e,r,t){"use strict";function n(e){return{display:e?null:"none"}}Object.defineProperty(r,"__esModule",{value:!0}),t.d(r,"ReactImage",function(){return l});var o=t(2),a=t(0),s=(t.n(a),t(18)),i=t(20),c=Object(i.a)({}),l=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.state={previewVisible:!0,error:!1},r.createImage=function(e){var t=r.props,i=t.src,c=t.previewSrc,l=t.onClick,u=t.onLoad,p=t.onError,m=r.state,f=m.previewVisible,d=m.error;r.props;if(c){var y=Object(s.f)(r.onLoad.bind(r),u);return a.createElement(a.Fragment,null,a.createElement("img",{className:e.main,src:i,style:o.a({},r.props.style,n(!f)),onLoad:y,onError:p,onClick:l}),a.createElement("img",{className:e.main,src:c,style:o.a({},r.props.style,n(f)),onClick:l}))}if(d)return null;var v=Object(s.f)(function(){r.setState(function(e){return o.a({},e,{error:!0})})},p);return a.createElement("img",{style:r.props.style,src:i,className:e.main,onLoad:u,onClick:l,onError:v})},r}return o.c(r,e),r.prototype.onLoad=function(){this.setState(function(e){return o.a({},e,{previewVisible:!1})})},r.prototype.render=function(){return a.createElement(c,{className:this.props.className},this.createImage)},r.defaultProps={src:""},r}(a.Component)}});
//# sourceMappingURL=21.chunk.js.map