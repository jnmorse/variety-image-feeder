export enum SFW {
  Off = 0,
  On = 1
}

export enum Sketchy {
  Off = 0,
  On = 1
}

export enum NSFW {
  Off = 0,
  On = 1
}

export type Purity = [SFW, Sketchy, NSFW];
