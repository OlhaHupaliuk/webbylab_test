import { useDispatch } from 'react-redux';
import type { AppDispatch } from "../store/store"
import { importMovies } from "../store/moviesSlice"; 

interface HeaderProps {
  addMovie: () => void;
}
const Header:React.FC<HeaderProps> = ({ addMovie }) => {
 const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    dispatch(importMovies(file));
  };

  return (
    <header className="header d-flex w-100 justify-content-between">
        <div className="header__logoWrap d-flex gap-3 align-items-center">
            <img className="m-0" height={30} src='/logo.svg' />
            <h2 className="m-0 header__title">Kinoteka</h2>
        </div>
        <div className="header__btnRow d-flex gap-3">
            <label className="button greenBtn" style={{ cursor: "pointer" }}>
              Import
              <input type="file" accept=".txt" onChange={handleFileChange} style={{ display: "none" }} />
            </label>

            <button className="button blueBtn" onClick={addMovie}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <g clip-path="url(#clip0_3_9)">
                <path d="M17.25 8.25H9.75V0.75C9.75 0.551088 9.67098 0.360322 9.53033 0.21967C9.38968 0.0790176 9.19891 0 9 0V0C8.80109 0 8.61032 0.0790176 8.46967 0.21967C8.32902 0.360322 8.25 0.551088 8.25 0.75V8.25H0.75C0.551088 8.25 0.360322 8.32902 0.21967 8.46967C0.0790176 8.61032 0 8.80109 0 9H0C0 9.19891 0.0790176 9.38968 0.21967 9.53033C0.360322 9.67098 0.551088 9.75 0.75 9.75H8.25V17.25C8.25 17.4489 8.32902 17.6397 8.46967 17.7803C8.61032 17.921 8.80109 18 9 18C9.19891 18 9.38968 17.921 9.53033 17.7803C9.67098 17.6397 9.75 17.4489 9.75 17.25V9.75H17.25C17.4489 9.75 17.6397 9.67098 17.7803 9.53033C17.921 9.38968 18 9.19891 18 9C18 8.80109 17.921 8.61032 17.7803 8.46967C17.6397 8.32902 17.4489 8.25 17.25 8.25Z" fill="white"/>
                </g><defs><clipPath id="clip0_3_9"><rect width="18" height="18" fill="white"/></clipPath></defs></svg>
                Add movie
            </button>
        </div>
    </header>
  )
}


export default Header