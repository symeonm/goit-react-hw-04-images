import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import { useState } from 'react';
import { AppStyle } from './AppStyledComponent';

export default function App (){
  const[nameImage, setNameImage]=useState('');



  const handleSearch = ( name ) => {
    setNameImage(name)
  };

  
    return (
      <AppStyle>
        <Searchbar onSubmit={handleSearch} />
        <ImageGallery
          nameImage={nameImage}
        />
      </AppStyle>
    );
  
}
