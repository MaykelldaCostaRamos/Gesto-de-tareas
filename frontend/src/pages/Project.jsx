import { useParams } from "react-router-dom";

export default function Project() {
  const { id } = useParams();
  return <h1>Project ID: {id}</h1>;
}
