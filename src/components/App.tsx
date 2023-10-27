import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Entry from '../models/Entry';
import './App.css';
import EntryList from './EntryList';
import { entryIsVisited } from '../util/StorageManager';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [nextEntry, setNextEntry] = useState<Entry | undefined>(undefined);

  async function loadEntries() {
    const res = await fetch('/api/list-entries');
    const entries = await (res.json() as Promise<Entry[]>);
    for (const entry of entries) {
      entry.visited = entryIsVisited(entry.id!);
    }
    setEntries(entries);
    setNextEntry(entries.find(entry => !entry.visited));
  }

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <>
      {/* {nextEntry && <Card border="secondary" className="p-3 mb-3">
        <h4>Next entry:</h4>
        <p>{nextEntry.id}</p>
      </Card>} */}
      <EntryList entries={entries} />
    </>
  );
}

export default App;
