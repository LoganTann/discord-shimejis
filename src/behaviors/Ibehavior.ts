import { Mascot } from "../mascot/Mascot";

export interface Ibehavior {
    name: string;
    init(mascot: Mascot): void;
    destroy(): void;
}
