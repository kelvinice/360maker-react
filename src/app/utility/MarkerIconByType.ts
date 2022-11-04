import {
    DescriptionMarkerIconPath,
    ImageMarkerIconPath,
    PlaceMarkerIconPath,
    VideoMarkerIconPath
} from "../constants/AssetPath";

export default function MarkerIconByType(type: string): string {
    switch (type) {
        case "place":
        return PlaceMarkerIconPath;
        case "video":
        return VideoMarkerIconPath;
        case "image":
        return ImageMarkerIconPath;
        case "description":
        return DescriptionMarkerIconPath;
        default:
        return PlaceMarkerIconPath;
    }
}