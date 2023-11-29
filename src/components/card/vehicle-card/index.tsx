const VehicleCard = ({ name, abrv, id, handleNavigation }: any) => {
  return (
    <div>
      <p>{name}</p>
      <p>{abrv}</p>
      <button onClick={handleNavigation}>CLICK</button>
    </div>
  );
};

export default VehicleCard;
