import { useParams } from "react-router-dom";

function EntryDetails() {
  const { id }  = useParams();
  return (<pre>Here: {id}</pre>);
}

export default EntryDetails;