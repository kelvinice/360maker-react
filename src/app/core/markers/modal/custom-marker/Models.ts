export interface CustomMarkerModel {
    code: string;
    name: string;
}

export const CustomMarkerDataType =
    [
        { code: "button-link", name: "Button Link" } as CustomMarkerModel,
    ]

export const CustomMarkerDataObject = () => {
    return CustomMarkerDataType.map((item) => {
        return {
            code: item.code,
            name: item.name,
        }
    });
}