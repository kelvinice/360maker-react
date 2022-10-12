export interface DataModel {
    scenes: Scene[];
    setting: SettingModel;
}

export interface Scene{
    id?: string
    name: string
    path: string
    description?: string
    markers?: Marker[]
}

export interface Marker {
    id?: string
    type: string
    name: string
    location: {
        lat: number
        lng: number
    }
}

export interface SettingModel {
    initialScene: string
}
