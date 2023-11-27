import type { VehicleModelType } from '../../../types/database';
type VehicleMakeCardProps = Omit<VehicleModelType, 'created_at' | 'image' | 'make_id'>;

const VehicleMakeCard = ({ name, abrv, id }: VehicleMakeCardProps) => {
  return (
    <div>
      <p>{name}</p>
      <p>{abrv}</p>
      <button onClick={() => console.log(id)}>CLICK</button>
    </div>
  );
};

export default VehicleMakeCard;
