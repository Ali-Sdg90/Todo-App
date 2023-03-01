const filterBackground = document.getElementsByClassName("filter-background");
const filtertext = document.getElementsByClassName("filter-text");
const filterDivBackground = document.getElementsByClassName(
    "filter-div-background"
);

for (let i = 0; i < 3; i++) {
    filtertext[i].addEventListener("click", function () {
        for (let j = 0; j < 3; j++) {
            filterBackground[j].style.fill = "rgb(198, 198, 198)";
            filterDivBackground[j].style.zIndex = "1";
        }
        filterBackground[i].style.fill = "white";
        filterDivBackground[i].style.zIndex = "2";
    });
}

// Prevent the browser's default behavior of refreshing the page when 'enter' is
// pressed while an input is in focus :
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
});

// Simulate clicking on the addBtn by pressing the Enter key.
document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        document.getElementById("add-btn").dispatchEvent(new Event("click"));
    }
});
