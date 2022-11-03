import {atomWithStorage} from "jotai/utils";
import {JotaiConstant} from "../constants/JotaiConstant";
import {Scene, SettingModel} from "../models/DataModel";
import {initialDataScene, initialDataSetting} from "../data/InitialData";
import {atom} from "jotai";
import {MouseState} from "../constants/MouseState";

export const dataScenesAtom = atomWithStorage<Scene[]|undefined>(JotaiConstant.scenes, undefined);
export const settingsAtom = atomWithStorage<SettingModel|undefined>(JotaiConstant.setting, undefined);
export const mouseStateAtom = atom<MouseState>(MouseState.Cursor);
export const isDevAtom = atom<boolean>(false);