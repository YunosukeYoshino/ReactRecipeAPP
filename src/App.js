import './App.css';
import { useState, useEffect, useRef } from 'react';
import Recipe from './recipe';

function App() {
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("banana");
  const [recipes, setRecipes] = useState([]);
  const APP_ID = "4bf10ef3";
  const APP_KEY = "23b1592261056a3785a1278e490768ce"

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus()
  }, []);
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q="${query}"&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
  }
  useEffect(() => {
    console.log(search);
  }, [search])


  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }
  const updateSearch = e => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    getRecipes();
  }, [query])


  return (
    <div className="App">
      <form onSubmit={getSearch}>
        <input ref={inputRef} type="text" value={search} onChange={updateSearch} />
        <button type="submit">検索</button>
      </form>
      <div>
        {
          recipes.map(recipe => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}

            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
