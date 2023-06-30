import { useState, useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import apiImage from '../service/ServiceGallery';
import { ImageList } from './ImageGalleryStyled';
import LoadMore from '../Button/Button';
import Loader from '../Loader/';
import Modal from '../Modal';

export default function ImageGallery({ nameImage }) {
  const [imageArr, setImageArr] = useState([]);
  const [status, setStatus] = useState('idle');
  const [modalImage, setModalImage] = useState('');
  const [totalHits, setTotalHits] = useState('');
  const [page, setPage] = useState(1);
  const [stateName, setStateName] = useState('');
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    if (nameImage === '') {
      return;
    }

    setStatus('pending');

    apiImage(nameImage, page)
      .then(obj => {
        setTotalHits(obj.totalHits);
        setImageArr([...imageArr, ...obj.hits]);
        setStatus('resolved');
        setStateName(nameImage);
        if (obj.hits.length === 0) {
          setStatus('noImage');
        }
      })
      .catch(error => setStatus('rejected'));
  }, [nameImage, page]);

  if (stateName !== nameImage && stateName !== '') {
    setStateName(nameImage);
    setImageArr([]);
    setPage(1)
  }

  const clickImage = img => {
    setModalImage(img)
    setShowModal(!showModal)
  };

  const countPage = () => {
    setPage(page + 1);
  };

  const hasMore = imageArr.length < totalHits && imageArr.length > 0;
  if (status === 'resolved') {
    return (
      <>
        <ImageList className="gallery">
          {imageArr.map(({ id, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              clickImage={clickImage}
            />
          ))}
          {showModal && (
              <Modal onClose={clickImage}>
                <img src={modalImage} alt={modalImage}></img>
              </Modal>
            )}
        </ImageList>
        {hasMore && <LoadMore addImage={countPage}></LoadMore>}
      </>
    );
  }

  if (status === 'noImage') {
    setPage(1);
    setImageArr([]);
    alert(`Зображень за запитом: ${nameImage} не існує`);
    return;
  }

  if (status === 'rejected') {
    return alert('ERR SERVER');
  }

  if (status === 'pending') {
    return <Loader />;
  }
}
