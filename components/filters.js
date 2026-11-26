// Anna works on this file

console.log("filters.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-chip");

  console.log("Found buttons:", filterButtons);

  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const selectedFilter = event.currentTarget.dataset.filter;

      console.log("Selected:", selectedFilter);

      filterButtons.forEach((button) => {
        button.classList.remove("active");
      });

      event.currentTarget.classList.add("active");
    });
  });
});