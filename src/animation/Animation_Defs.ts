import { Mascot } from "../mascot/Mascot";

export interface Ianimation {
    name: string;
    init(mascot: Mascot): void;
    destroy(): void;

    generateNext(): void;
    next?: Ianimation;
}
