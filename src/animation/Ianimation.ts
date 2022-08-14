import { Mascot } from "../mascot/Mascot";
export interface Ianimation {
    init(mascot: Mascot): void;
    destroy(): void;
    generateNext(): void;
    next?: Ianimation;
    name: string;
}
