export interface ImageModifiers {
  width: number
  height: number
  fit: string
  format: string
  [key: string]: any
}

export interface ImageOptions {
  provider?: string,
  preset?: string,
  modifiers?: Partial<ImageModifiers>
  [key: string]: any
}

// eslint-disable-next-line no-use-before-define
export type ProviderGetImage = (src: string, options: ImageOptions, ctx: ImageCTX) => ResolvedImage

export interface ImageProvider {
  defaults?: any
  getImage: ProviderGetImage
}

export interface CreateImageOptions {
  providers: {
    [name: string]: {
      defaults: any,
      provider: ImageProvider
    }
  }
  presets: { [name: string]: ImageOptions }
  provider: string
  intersectOptions: object
  sizes?: (number | string)[]
}

export interface ImageInfo {
  width: number,
  height: number,
  placeholder?: string,
}

export interface ResolvedImage {
  url: string,
  format?: string
  isStatic?: boolean
  getMeta?: () => Promise<ImageInfo>
}

export interface $Img {
  (source: string, modifiers?: ImageOptions['modifiers'], options?: ImageOptions): ResolvedImage['url']
  options: CreateImageOptions
  getImage: (source: string, options?: ImageOptions) => ResolvedImage
  getSizes: (source: string, options?: ImageOptions, sizes?: string[]) => { width: string, height: string, src: string }[]
  getMeta: (source: string, options?: ImageOptions) => Promise<ImageInfo>
  [preset: string]: $Img['options'] | $Img['getImage'] | $Img['getSizes'] | $Img['getMeta'] | $Img /* preset */
}

export interface ImageCTX {
  options: CreateImageOptions,
  nuxtContext: {
    ssrContext: any
    cache?: any
    isDev: boolean
    isStatic: boolean
    nuxtState?: any
  }
  $img?: $Img
}

export interface ImageSize {
  width: number;
  media: string;
  breakpoint: number;
  format: string;
  url: string;
}

export interface RuntimePlaceholder extends ImageInfo {
  url: string;
}

export type OperationFormatter = (key: string, value: string) => string

export type OperationMapper = { [key: string]: string | false } | ((key: string) => string)

export interface OperationGeneratorConfig {
  keyMap?: OperationMapper
  formatter?: OperationFormatter
  joinWith?: string
  valueMap?: {
    [key: string]: OperationMapper
  }
}

export type MapToStatic = (image: ResolvedImage) => string
