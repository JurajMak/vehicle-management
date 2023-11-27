import type { VehicleModelType } from '../../../types/database';
type VehicleModelCardProps = Omit<VehicleModelType, 'created_at' | 'image' | 'make_id'>;

const VehicleModelCard = ({ name, abrv, id }: VehicleModelCardProps) => {
  return (
    <div>
      <p>{name}</p>
      <p>{abrv}</p>
      <button onClick={() => console.log(id)}>CLICK</button>
    </div>
  );
};

export default VehicleModelCard;
