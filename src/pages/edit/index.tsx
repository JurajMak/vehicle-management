import React from 'react';
import { ModelStore } from '../../store/modelStore';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

const Edit = observer(() => {
  const { id }: any = useParams();

  React.useEffect(() => {
    ModelStore.getSingleModel(id);
  }, []);

  return (
    <div>
      <p>{ModelStore.singleModelData?.name}</p>
      <p>{ModelStore.singleModelData?.abrv}</p>
    </div>
  );
});

export default Edit;
