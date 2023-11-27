export type VehicleModelType = {
  id: string | null;
  created_at: Date | null;
  name: string | null;
  abrv: string | null;
  make_id: string | null;
  image: string | null;
};

export type VehicleMakeType = {
  id: string | null;
  created_at: Date | null;
  name: string | null;
  image: string | null;
  abrv: string | null;
};
