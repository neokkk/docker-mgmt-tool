export type CPU = {
  core: number;
  clock: string;
  model: string;
  vendor: string;
};

export type Disk = {
  dev: string;
  size: string;
};

export type Node = {
  id: number;
  name: string;
  ip_address: string;
  cpu: CPU;
  disks: Disk[];
};

export type CreateRequestPayload = {
  name: string;
  ip_address: string;
};
