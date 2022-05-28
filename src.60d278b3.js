parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"krre":[function(require,module,exports) {

},{"./../images/bg-home-page.jpg":[["bg-home-page.931397fd.jpg","pifM"],"pifM"],"./../images/bg-library-page.jpg":[["bg-library-page.1958d7cc.jpg","eVEB"],"eVEB"]}],"LG5i":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.fetchTrendingMovies=r,exports.fetchGenres=n,exports.receiveGenres=s,exports.receiveOneMovieGenres=a,exports.fetchMovies=i,exports.fetchOneMovie=c,exports.selectedMovie=exports.refs=void 0;const e={moviesListEl:document.querySelector(".movies-list"),homePageEl:document.querySelector(".home-page-js"),libraryPageEl:document.querySelector(".library-page-js"),headerEl:document.querySelector(".header"),libraryButtonsListEl:document.querySelector(".library-buttons-list"),searchEl:document.querySelector(".search-form"),notificationEl:document.querySelector(".search-failure-text"),modalEl:document.querySelector(".backdrop"),modalContainerEl:document.querySelector(".modal_movie-container"),modalCloseBtnEl:document.querySelector(".modal-close-btn")};exports.refs=e;const t="4a38965c8274ee66c1019c21406c4653";let o="";async function r(){const e=await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${t}`),o=await e.json();return localStorage.setItem("movies",JSON.stringify(o)),o}async function n(){if(!localStorage.getItem("genres")){const e=await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${t}&language=en-US`),{genres:o}=await e.json();localStorage.setItem("genres",JSON.stringify(o))}}function s(e){const t=JSON.parse(localStorage.getItem("genres")),o=[];return t.map(t=>{e.includes(t.id)&&o.push(t.name)}),o.length>2&&(o.splice(2),o.push("Other")),o.join(", ")}function a(e){const t=[];return e.map(e=>{t.push(e.name)}),t.join(", ")}async function i(e,o){const r=await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${t}&query=${e}&language=en-US&page=${o}&include_adult=false`),n=await r.json();return localStorage.setItem("movies",JSON.stringify(n)),n}async function c(e){const r=await fetch(`https://api.themoviedb.org/3/movie/${e}?api_key=${t}&language=en-US`);return exports.selectedMovie=o=await r.json(),o}exports.selectedMovie=o;
},{}],"rWfE":[function(require,module,exports) {
module.exports="/filmoteka/no-poster-available.dac08635.jpg";
},{}],"EzL3":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.homeHeaderMarkup=l,exports.libraryHeaderMarkup=i,exports.createMarkup=r,exports.createModalMarkup=o;var e=require("./fetchMovies"),a=s(require("./images/no-poster-available.jpg"));function s(e){return e&&e.__esModule?e:{default:e}}function l(){e.refs.libraryPageEl.classList.remove("current-page"),e.refs.homePageEl.classList.add("current-page"),e.refs.headerEl.classList.remove("header-bg-library-page"),e.refs.headerEl.classList.add("header-bg-home-page"),e.refs.libraryButtonsListEl.classList.add("header-central-container-toggle"),e.refs.searchEl.classList.remove("header-central-container-toggle")}function i(){e.refs.homePageEl.classList.remove("current-page"),e.refs.libraryPageEl.classList.add("current-page"),e.refs.headerEl.classList.remove("header-bg-home-page"),e.refs.headerEl.classList.add("header-bg-library-page"),e.refs.searchEl.classList.add("header-central-container-toggle"),e.refs.libraryButtonsListEl.classList.remove("header-central-container-toggle")}function r(a){const s=a.results.map(a=>`<li class="movie-card" id=${a.id}>\n     <img src=${t(a.poster_path)} alt=${a.original_title}poster" loading="lazy" class="image" id=${a.id} />\n     \n       <p class="movie-name" id=${a.id}>\n         ${a.original_title}\n       </p>\n       <p class="movie-genre" id=${a.id}>\n       ${(0,e.receiveGenres)(a.genre_ids)} | ${a.release_date.slice(0,4)}\n     </p>\n     \n   </li>`).join("");e.refs.moviesListEl.innerHTML=s}function t(e){return e?`https://image.tmdb.org/t/p/w300${e}`:`${a.default}`}function o(a){const s=`\n  <img class="movie_modal-poster" src=${t(a.poster_path)} alt=${a.original_title} />\n  <div class="movie_modal-text-container">\n  <p class="movie_modal-name">${a.title}</p>\n  <ul class="movie_modal-list list">\n    <li class="movie_modal-item">\n      <p class="movie_modal-subtitle">Vote / Votes </p> \n       <p class="movie_modal-value-rating">${a.vote_average}<p/><p class="movie_modal-value">\n      / ${a.vote_count}</p>\n    </li>\n    <li class="movie_modal-item">\n      <p class="movie_modal-subtitle">Popularity </p> <p class="movie_modal-value">${a.popularity}</p>\n    </li>\n    <li class="movie_modal-item">\n      <p class="movie_modal-subtitle">Original Title </p><p class="movie_modal-value">${a.original_title}</p>\n    </li>\n    <li class="movie_modal-item">\n      <p class="movie_modal-subtitle">Genre </p> <p class="movie_modal-value">${(0,e.receiveOneMovieGenres)(a.genres)}</p>\n    </li>\n  </ul>\n  <p class="movie_modal-desc-title">About</p>\n  <p class="movie_modal-description">${a.overview}</p>\n  <div/>`;e.refs.modalContainerEl.insertAdjacentHTML("afterbegin",s)}
},{"./fetchMovies":"LG5i","./images/no-poster-available.jpg":"rWfE"}],"Focm":[function(require,module,exports) {
"use strict";require("./css/styles.css");var e=require("./fetchMovies"),t=require("./markup.js");let r=1,n="";function s(){(0,t.homeHeaderMarkup)(),(0,e.fetchTrendingMovies)().then(e=>(0,t.createMarkup)(e)).catch(e=>{i(),console.log(e)}),(0,e.fetchGenres)()}function a(s){s.preventDefault(),n=s.currentTarget.elements.searchQuery.value.trim(),(0,e.fetchMovies)(n,r).then(e=>{0!==e.results.length?(0,t.createMarkup)(e):i()}).catch(e=>{i(),console.log(e)}),r+=1}function i(){e.refs.notificationEl.textContent="Search result not successful. Enter the correct movie name",setTimeout(()=>{e.refs.notificationEl.textContent=""},2e3)}function c(){(0,t.libraryHeaderMarkup)()}function o(r){("IMG"===r.target.nodeName||"LI"===r.target.nodeName||"P"===r.target.nodeName)&&(e.refs.modalEl.classList.remove("is-hidden"),(0,e.fetchOneMovie)(r.target.id).then(e=>{(0,t.createModalMarkup)(e)}).catch(e=>console.log(e)))}function l(){e.refs.modalEl.classList.add("is-hidden"),e.refs.modalContainerEl.innerHTML=""}s(),e.refs.homePageEl.addEventListener("click",s),e.refs.searchEl.addEventListener("submit",a),e.refs.libraryPageEl.addEventListener("click",c),e.refs.moviesListEl.addEventListener("click",o),e.refs.modalCloseBtnEl.addEventListener("click",l);
},{"./css/styles.css":"krre","./fetchMovies":"LG5i","./markup.js":"EzL3"}]},{},["Focm"], null)
//# sourceMappingURL=/filmoteka/src.60d278b3.js.map