const fileInput = document.querySelector(".file-input"),
  filterOption = document.querySelectorAll(".filter button"),
  filterName = document.querySelectorAll(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlide = document.querySelector(".slider input"),
  previewImg = document.querySelector(".preview-img img"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  chooseImgBtn = document.querySelector(".choose-image"),
  saveImgBtn = document.querySelector(".save-img");

let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;

let rotate = 0,
  flipHorizontal = 1;
flipVertical = 1;

const applyFilters = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

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

    if (option.id === "Brightnees") {
      filterSlide.max = "200";
      filterSlide.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "Saturation") {
      filterSlide.max = "200";
      filterSlide.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "Inversion") {
      filterSlide.max = "100";
      filterSlide.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlide.max = "100";
      filterSlide.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
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
  applyFilters();
};

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    //adding click event listener rotate
    if (option.id === "left") {
      rotate -= 90;
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "horizontal") {
      // if fliphozintal value = 1, set this value to -1 else set 1
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilters();
  });
});

const resetFilter = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOption[0].click();
  applyFilters();
};

const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.scale(flipHorizontal, flipVertical);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.drawImage(
    previewImg,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
};

fileInput.addEventListener("change", loadImage);
filterSlide.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
