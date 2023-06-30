import {
  ImageGalleryItemSt,
  ImageGalleryItemImage,
} from './ImageGalleryItemStyled';



export default function ImageGalleryItem ({webformatURL, largeImageURL, clickImage}) {

    return (
      <ImageGalleryItemSt
        className="gallery-item"
        onClick={() => clickImage(largeImageURL)}
      >
        <ImageGalleryItemImage src={webformatURL} alt={webformatURL} />
      </ImageGalleryItemSt>
    );
  
}
