import { Mascot } from "../mascot/Mascot";

export type IbehaviorArguments = Record<string, string>;

export interface Ibehavior {
    name: string;
    init(mascot: Mascot): void;
    destroy(): void;
}
