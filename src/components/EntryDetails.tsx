import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

function EntryDetails() {
  const { id } = useParams();
  const [entry, setEntry] = useState<string>("");

  async function loadEntry() {
    const res = await fetch(`/api/${id}`);
    const entryText = await res.text();
    setEntry(entryText);
  }

  useEffect(() => {
    loadEntry();
  }, [id]);

  return <Card border="secondary" className="p-3 mb-5">
    <pre>{entry}</pre>
  </Card>;
}

export default EntryDetails;
