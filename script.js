let searchbtn = document.getElementById("searchbtn");
let clearbtn = document.getElementById("clearbtn");
let result = document.getElementById("resultContainer");
let mydiv = document.getElementById("dropdown");
let close = document.getElementById("close-btn");
let query = document.getElementById("searchinput");

const clearsearch = () => {
  query.value = "";
  mydiv.style.display = "none";
  result.innerHTML = "";
  console.log("Clearing");
};

clearbtn.addEventListener("click", clearsearch);

const showResult = (name, img, info) => {
  mydiv.style.display = "block"; // always show results
  result.innerHTML = `
    <h2 class="title">${name}</h2>
    <img class="search-img" src="${img}" alt="${name}">
    <p class="description">${info}</p>
  `;
};

const closeDropdown = () => {
  mydiv.style.display = "none";
  query.value = "";
  result.innerHTML = "";
};

close.addEventListener("click", closeDropdown);

const searchError = () => {
  mydiv.style.display = "block"; // always show error if not found
  result.innerHTML = `<p class="notfound">Sorry, we can't find your search</p>`;
};

fetch("recommendation.json")
  .then((res) => res.json())
  .then((data) => {
    const search = () => {
      let searchQuery = query.value.toLowerCase().trim();
      let notfound = true;

      // Search cities
      data.countries.forEach((country) => {
        country.cities.forEach((city) => {
          if (city.name.toLowerCase().includes(searchQuery)) {
            showResult(city.name, city.imageUrl, city.description);
            notfound = false;
          }
        });
      });

      // Search temples
      data.temples.forEach((temple) => {
        if (temple.name.toLowerCase().includes(searchQuery)) {
          showResult(temple.name, temple.imageUrl, temple.description);
          notfound = false;
        }
      });

      // Search beaches
      data.beaches.forEach((beach) => {
        if (beach.name.toLowerCase().includes(searchQuery)) {
          showResult(beach.name, beach.imageUrl, beach.description);
          notfound = false;
        }
      });

      if (notfound) {
        searchError();
      }
    };

    searchbtn.addEventListener("click", search);

    // Optional: Trigger search on Enter key
    query.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        search();
      }
    });
  })
  .catch((err) => console.error("Error loading JSON:", err));
