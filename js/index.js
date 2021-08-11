let currentPage = 1;
const baseURL = "http://localhost:3000/monsters/";

const fetchService = (type = "get", pdata) => {
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
  } else if (type === "post") {
    const confObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(pdata)
    };
    console.log("pdata: ",pdata);
    console.log("confObj:  ", confObj);
    return fetch(baseURL, confObj)
      .then((resp) => resp.json())
      .then((obj) => {
        console.log("data added: ", obj);
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

const setAttributes = (el, attrs) => {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const back = document.getElementById("back");
    const forward = document.getElementById("forward");
    const createMonster = document.getElementById("create-monster");
    const form = document.createElement("form");
    form.setAttribute("id", "monster-form");
    const inputName = document.createElement("input");
    setAttributes(inputName, {
      id: "name",
      placeholder: "name...",
    });
    const inputAge = document.createElement("input");
    setAttributes(inputAge, {
      id: "age",
      placeholder: "age ...",
    });
    const inputDesc = document.createElement("input");
    setAttributes(inputDesc, {
      id: "description",
      placeholder: "description...",
    });
    const createBtn = document.createElement("button");
    createBtn.innerText = "Create";
    form.append(inputName, inputAge, inputDesc, createBtn);
    createMonster.appendChild(form);
    fetchService("get"); //first default page
    createBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const data = {
        name: `${inputName.value}`,
        age: parseFloat(inputAge.value),
        description: `${inputDesc.value}`,
      };
      fetchService("post", data);
    });
    back.addEventListener("click", () => {
      currentPage--;
      if (currentPage < 1) {
        currentPage = 1;
        alert("No more monster !!!");
      } else {
        fetchService("get");
      }
    });
    forward.addEventListener("click", () => {
      currentPage++;
      fetchService("get");
    });
  });
})();
