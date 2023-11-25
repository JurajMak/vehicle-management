import { useNavigate } from 'react-router-dom';
import { Routes } from '../../routes';

export default function Home() {
  const navigate = useNavigate();

  const testID = ['1', '2', '3', '4'];

  return (
    <>
      <h1>HOME dasdasdasdasd d sadasdasd </h1>
      <button type="button" onClick={() => navigate(`${Routes.CREATE}`)}>
        CREATE
      </button>
      {testID.map(item => {
        return (
          <button key={item} type="button" onClick={() => navigate(`${Routes.EDIT}${item}`)}>
            Edit
          </button>
        );
      })}
    </>
  );
}
