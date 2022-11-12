export interface DataModel {
    scenes: Scene[];
    setting: SettingModel;
    shortcuts: Shortcut[];
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
    mediaPath?: string
    description?: string
    url?: string

    tooltip?: string
    width?: number
    height?: number
}

export interface SettingModel {
    initialScene: string
    defaultMarkerWidth: number
    defaultMarkerHeight: number
}

export interface ShortcutSceneMetadata {
    name: string
    sceneId: string
}

export interface Shortcut {
    id?: string
    name: string
    sceneId?: string
    children?: ShortcutSceneMetadata[]
}