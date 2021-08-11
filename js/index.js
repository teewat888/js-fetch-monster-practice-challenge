let currentPage = 1;
const baseURL = "http://localhost:3000/monsters/";

const fetchService = (type = "get") => {
  const monsterContainer = document.getElementById("monster-container");
  const clearTags = () => {
    while (monsterContainer.firstChild) {
      monsterContainer.removeChild(monsterContainer.firstChild);
    }
  };
  const monsterList = (data) => {
    for (const item of data) {
      const div = document.createElement("div");

      // monsterContainer.appendChild(div);
      const h2 = document.createElement("h2");
      const h4 = document.createElement("h4");
      const p = document.createElement("p");
      //console.log("name: ",item.name);
      h2.innerText = item.name;
      h4.innerText = `Age: ${item.age}`;
      p.innerText = `Bio: ${item.description}`;
      div.append(h2, h4, p);
      monsterContainer.append(div);
    }
  };
  if (type === "get") {
    return fetch(baseURL + `?_limit=5&_page=${currentPage}`)
      .then((resp) => resp.json())
      .then((data) => {
        clearTags();
        monsterList(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const back = document.getElementById("back");
    const forward = document.getElementById("forward");
    fetchService();
    back.addEventListener("click", () => {
      currentPage--;
      console.log("back: ", currentPage);
      if (currentPage < 1) {
        currentPage = 1;
        alert("No more monster !!!");
      } else {
        fetchService();
      }
    });
    forward.addEventListener("click", () => {
      currentPage++;
      console.log("forward: ", currentPage);
      fetchService();
    });
  });
})();
