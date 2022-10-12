import {atomWithStorage} from "jotai/utils";
import {JotaiConstant} from "../constants/JotaiConstant";
import {Scene} from "../models/DataModel";
import {initialDataScene} from "../data/InitialData";

export const dataScenesAtom = atomWithStorage<Scene[]>(JotaiConstant.scenes, initialDataScene);

