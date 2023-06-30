import { useState } from 'react';
import { SearchBarStyle, SearchForm, SearchFormInput, SearchFormButton, SearchFormButtonLabel} from "./SearcBarStyledComponent";
export default function SearchBar ({onSubmit}) {
  const [nameValue, setNameValue] = useState('')
  

  const handleChange = e => {
    setNameValue(e.target.value.toLowerCase())
  };

  // console.log(nameValue);
    return (
      <SearchBarStyle className="searchbar">
        <SearchForm
          className="form"
          onSubmit={e => {
            e.preventDefault();
            onSubmit(nameValue);
          }}
        >
          <SearchFormButton type="submit" className="button">
            <SearchFormButtonLabel className="button-label">Search</SearchFormButtonLabel>
          </SearchFormButton>

          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
          />
        </SearchForm>
      </SearchBarStyle>
    );

}
