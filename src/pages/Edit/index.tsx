import React from 'react';
import { modelStore } from '../../store/ModelStore';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

const Edit = observer(() => {
  const { id }: any = useParams();

  React.useEffect(() => {
    modelStore.getSingleModel(id);
  }, [id]);

  return (
    <div>
      <p>{modelStore.singleModelData?.name}</p>
      <p>{modelStore.singleModelData?.abrv}</p>
    </div>
  );
});

export default Edit;
