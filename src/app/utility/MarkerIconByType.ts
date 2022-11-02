import {PlaceMarkerIconPath, VideoMarkerIconPath} from "../constants/AssetPath";

export default function MarkerIconByType(type: string): string {
    switch (type) {
        case "place":
        return PlaceMarkerIconPath;
        case "video":
        return VideoMarkerIconPath;
        default:
        return PlaceMarkerIconPath;
    }
}