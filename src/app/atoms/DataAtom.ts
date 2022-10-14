import {atomWithStorage} from "jotai/utils";
import {JotaiConstant} from "../constants/JotaiConstant";
import {Scene, SettingModel} from "../models/DataModel";
import {initialDataScene, initialDataSetting} from "../data/InitialData";

export const dataScenesAtom = atomWithStorage<Scene[]>(JotaiConstant.scenes, initialDataScene);
export const settingsAtom = atomWithStorage<SettingModel>(JotaiConstant.setting, initialDataSetting);
