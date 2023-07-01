const fileInput = document.querySelector(".file-input"),
  previewImg = document.querySelector(".preview-img img"),
  filterOption = document.querySelectorAll(".filter button"),
  filterName = document.querySelectorAll(".filter-info .name"),
  filterSlide = document.querySelector(".slider input"),
  filterValue = document.querySelector(".filter-info .value"),
  chooseImgBtn = document.querySelector(".choose-image");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;

const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
};

filterOption.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;
  });
});

const updateFilter = () => {
  filterValue.innerText = `${filterSlide.value}%`;
  const selectFilter = document.querySelector(".filter .active");

  if (selectFilter.id === "Brightnees") {
    brightness = filterSlide.value;
  } else if (selectFilter.id === "Saturation") {
    saturation = filterSlide.value;
  } else if (selectFilter.id === "Inversion") {
    inversion = filterSlide.value;
  } else {
    grayscale = filterSlide.value;
  }
};

fileInput.addEventListener("change", loadImage);
filterSlide.addEventListener("input", updateFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());
