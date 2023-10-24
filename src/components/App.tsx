import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from 'react-bootstrap';
import EntryList from './EntryList';
import Entry from '../models/Entry';

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [nextEntry, setNextEntry] = useState<Entry | undefined>(undefined);

  useEffect(() => {
    const testEntries : Entry[] = [];
    for (let i = 0; i < 50; i++) {
      testEntries.push({
        id: `entry-${i}`,
        visited: i < 10
      });
    }

    setEntries(testEntries);
    setNextEntry(testEntries.find(entry => !entry.visited));
  }, []);

  return (
    <Container className="p-3">
      {nextEntry && <Card border="secondary" className="p-3 mb-5">
        <h4>Next entry:</h4>
        <p>{nextEntry.id}</p>
      </Card>}
      <EntryList entries={entries} />
    </Container>
  );
}

export default App;
