export interface DataModel {
    scenes: Scene[];
    setting: SettingModel;
}

export interface Scene{
    id?: string
    name: string
    path: string
    description?: string
    markers: Marker[]
}

export interface Marker {
    id?: string
    type: string
    name: string
    location: {
        latitude: number
        longitude: number
    }
    targetSceneId?: string
    tooltip?: string
    mediaPath?: string
    description?: string
}

export interface SettingModel {
    initialScene: string
}

export interface Shortcut {
    id?: string
    name: string
    sceneId?: string
}