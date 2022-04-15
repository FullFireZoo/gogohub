function getURL(num){
    return`https://strapi-gogokodo.herokuapp.com/api/sources?pagination[page]=${num}&pagination[pageSize]=5`;
    }
    async function simpleFetch(url, callback, fn = () => false) {
      const response = await fetch(url);
      const data = await response.json();
      callback(data);
      fn(data);
    }
    simpleFetch(getURL(1), pagination, displayVideo);
    function displayVideo(videos) {
      document.querySelector("ul").innerHTML = "";
      videos.data.forEach((video) => {
        document.querySelector(
          "ul"
        ).innerHTML += `<li>${video.attributes.title}</li>`;
      });
    }
    function pagination(data) {
      const pageCount = data.meta.pagination.pageCount;
      createElement(pageCount);
    }
    function createElement(num) {
      for (let i = 1; i <= num; i++) {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = i;
        document.querySelector("body").appendChild(btn);
      }
    }
    document.querySelector("body").addEventListener("click", function (e) {
      if (e.target.className == "btn") {
            simpleFetch(getURL(e.target.textContent), displayVideo);
      }
    });
