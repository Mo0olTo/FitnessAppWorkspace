export interface MusclesRes {
  message: string;
  musclesGroup: MusclesGroup[];
}

export interface MusclesGroup {
  _id: string;
  name: string;
}