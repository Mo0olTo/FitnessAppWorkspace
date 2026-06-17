export interface MuscleGroupRes {
    message: string;
    muscleGroup: MuscleGroup;
    muscles: Muscle[];
}


export interface Muscle {
  _id: string;
  name: string;
  image: string;
}

export interface MuscleGroup {
  _id: string;
  name: string;
}