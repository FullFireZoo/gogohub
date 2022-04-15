let data;

fetch( getURL(1))
  
  .then((response) => response.json())
  .then((tutoriel) => {
    data = tutoriel;
    pagination(tutoriel)
    for (tuto of tutoriel.data) {
      bsd(
        ".tuto",
        tuto.id,
        tuto.attributes.title,
        tuto.attributes.category,
        tuto.attributes.url,
        tuto.attributes.color,
        tuto.attributes.difficulty
      );
    }
  });
 
function bsd(selector, id, title, category, url, couleur, difficulty) {
  document.querySelector(selector).innerHTML += `<li id="${id}" class="toto">
<div class="haut">
    <h3>${title}</h3>
    <img  ${loadFav(id)} alt="coeur" >                
</div>
<div>
    <p class="category" style="background-color:${couleur}">${category.toUpperCase()}</p>
</div>
<div class="bas">
    <div class="dif">
    ${displayDif()}
    </div>
    <div class="link">
    <a href="${url}" target="_blank">Visiter</a>
    </div>
</div>
</li>`;

  function displayDif() {
    if (difficulty == null) {
      // document.querySelector(".bas").innerHTML +=
      return `<div class="Facile circle"></div>`;
    } else if (difficulty == "Moyen") {
      // document.querySelector(".bas").innerHTML +=
      return `<div class="Moyen circle"></div>`;
    } else if (difficulty == "Dure") {
      // document.querySelector(".bas").innerHTML +=
      return `<div class="Difficile circle"></div>`;
    }
  }

  function loadFav (id){
      if(localStorage.getItem("fav")){
        
        const favoris = JSON.parse(localStorage.getItem("fav"));
        if(favoris.hasOwnProperty(id)){
        
        return `class="addFav love" src="./images/coeur_fav.png"`
        }else{ return `class="addFav" src="./images/coeur.png"`}
      }else {return `class="addFav" src="./images/coeur.png"`}
  }

}

document.querySelector("body").addEventListener("click", (e) => {
  if (e.target.textContent == "Facile") {
    document.querySelectorAll(".Facile").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "flex";
      }
    });

    document.querySelectorAll(".Moyen").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });

    document.querySelectorAll(".Difficile").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });
  } else if (e.target.textContent == "Moyen") {
    document.querySelectorAll(".Moyen").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "flex";
      }
    });

    document.querySelectorAll(".Facile").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });

    document.querySelectorAll(".Difficile").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });
  } else if (e.target.textContent == "Dure") {
    document.querySelectorAll(".Difficile").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "flex";
      }
    });

    document.querySelectorAll(".Moyen").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });

    document.querySelectorAll(".Facile").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });
  } else if (e.target.textContent == "Mes favoris") {
    document.querySelectorAll(".Difficile").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });

    document.querySelectorAll(".Moyen").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });

    document.querySelectorAll(".Facile").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "none";
      }
    });

    document.querySelectorAll(".love").forEach((Element) => {
      if (Element.closest("li")) {
        Element.closest("li").style.display = "flex";
      }
    });
  }
});

document.querySelector("#searchBar").addEventListener("input", (e) => {
  console.log(data);
  const element = e.target.value.toLowerCase();
  const filtreTuto = data.data.filter(
    (video) =>
      video.attributes.title.toLowerCase().includes(element) ||
      video.attributes.category.toLowerCase().includes(element)
  );

  document.querySelector(".tuto").innerHTML = "";
  for (tuto of filtreTuto) {
    bsd(
      ".tuto",
      tuto.id,
      tuto.attributes.title,
      tuto.attributes.category,
      tuto.attributes.url,
      tuto.attributes.color,
      tuto.attributes.difficulty
    );
  }
});

const coeur = document.querySelector(".addFav");
let favoris = {};
document.querySelector("body").addEventListener("click", function (e) {
  console.log(e.target.classList);
  if (e.target.classList.contains("addFav")) {
    
    if (e.target.src.includes("coeur.png")) {

      e.target.src = `./images/coeur_fav.png`
      e.target.classList.add("love");
      favoris[e.target.closest("li").id] = true;
      localStorage.setItem("fav", JSON.stringify(favoris));
    } else {

      e.target.src = `./images/coeur.png`;
      e.target.classList.remove("love");
      delete favoris[e.target.closest("li").id];
      localStorage.setItem("fav", JSON.stringify(favoris));
    }
  }else if (e.target.className== "petitbtn"){
    document.querySelector('.tuto').innerHTML = "";
    fetch( getURL(e.target.textContent))
  
  .then((response) => response.json())
  .then((tutoriel) => {
    data = tutoriel;
    for (tuto of tutoriel.data) {
      bsd(
        ".tuto",
        tuto.id,
        tuto.attributes.title,
        tuto.attributes.category,
        tuto.attributes.url,
        tuto.attributes.color,
        tuto.attributes.difficulty
      );
    }
  });
  }
});

function getURL(num){
  return`https://strapi-gogokodo.herokuapp.com/api/sources?pagination[page]=${num}&pagination[pageSize]=12`;
  }

function pagination(data) {
  const pageCount = data.meta.pagination.pageCount;
  createElement(pageCount);
}

function createElement(num) {
  for (let i = 1; i <= num; i++) {
    const btn = document.createElement("button");
    btn.className = "petitbtn";
    btn.textContent = i;
    document.querySelector(".pgn").appendChild(btn);
  }
}





