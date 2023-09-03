// Add imports above this line
import { galleryItems } from './gallery-items';

console.log(galleryItems);

import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

function creatGalleryEl(arr) {
  return arr
    .map(
      ({ preview, original, description }) =>
        `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="I${description}"/>
        </a>
      </li>`).join("");
}
galleryContainer.insertAdjacentHTML("beforeend", creatGalleryEl(galleryItems));

galleryContainer.addEventListener("click", onGalleryContainerClick);

const galleryLightbox = new SimpleLightbox('.gallery a');

function onGalleryContainerClick(evt) {

  evt.preventDefault();
  const linkGalleryEl = document.querySelector(".gallery__link");
  if (evt.target === linkGalleryEl) {
      return; 
  }

  const oringinalImgSrc = evt.target.dataset.source;

  const instance = basicLightbox.create(`
    <div class="modal">
    <img src="${oringinalImgSrc}" width="1200">
    </div>`,
    {
      onShow: () => {
        document.addEventListener("keydown", onEscapePress);
      },
    },
    {
      onClose: () => {
        document.removeEventListener("keydown", onEscapePress);
      },
    }
  );

  instance.show();

  function onEscapePress(evt) {
    if (evt.code === "Escape") {
      instance.close();
    }
  }
}