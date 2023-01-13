import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import SearchItems from './SearchItem';
import { useState, useEffect } from 'react';

function App() {
  const API_URL = 'http://localhost:3001/items';

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    // Simulation of slow API
    // setTimeout(() => {
    //   fetchItems()
    // }, 2000)
    fetchItems() // or (async () => await fetchItems())();

  }, [])

  function addNewItem(item) {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  }

  function handleCheck(id) {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  }

  function handleDelete(id) {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newItem) return;
    addNewItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="Groceries" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItems
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
