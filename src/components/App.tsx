import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import EntryList from './EntryList';
import Entry from '../models/Entry';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [nextEntry, setNextEntry] = useState<Entry | undefined>(undefined);

  async function loadEntries() {
    const res = await fetch('/entries.json');
    const entries = await (res.json() as Promise<Entry[]>);
    entries[0].visited = true;
    entries[1].visited = true;
    setEntries(entries);
    setNextEntry(entries.find(entry => !entry.visited));
  }

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <>
      {nextEntry && <Card border="secondary" className="p-3 mb-5">
        <h4>Next entry:</h4>
        <p>{nextEntry.id}</p>
      </Card>}
      <EntryList entries={entries} />
    </>
  );
}

export default App;
