export interface LightCapabilities {
  certified: boolean;
  control: {
    mindimlevel: number;
    maxlumen: number;
    colorgamutttype: [number, number][];
    ct: {
      min: number;
      max: number;
    };
  };
  streaming: { renderer: boolean; proxy: boolean };
}
