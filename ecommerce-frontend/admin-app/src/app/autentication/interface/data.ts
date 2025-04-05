export interface StatusItem {
  name: string;
  data: number[];
}

export interface StatusData {
  status: StatusItem[];
  mes?: string[];
}