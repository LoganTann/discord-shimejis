import { Ianimation } from "../animation/Animation_Defs";
import { IdleClimbHoriz } from "../animation/ClimbHoriz";
import { ThrownFallNormal } from "../animation/ThrownFall";
import { ThrownFlyNormal } from "../animation/ThrownFly";
import { CollisionStatus } from "../environment/environment";
import { Point } from "../environment/shapeInterfaces";
import { Mascot } from "../mascot/Mascot";
import { GrabbedBehavior } from "./GrabbedBehavior";
import { Ibehavior } from "./Ibehavior";
import { IdleBehavior } from "./IdleBehavior";

export class ThrownBehavior implements Ibehavior {
    name = "thrown";
    mascot!: Mascot;
    listener!: (e: PointerEvent) => void;

    lastUpdate: number = 0;
    requestID: number = 0;

    velocity: Point;
    acceleration_y: number;

    currentAnimation!: Ianimation;

    constructor(delta: Point) {
        delta.x = surround(delta.x, -50, 50) * 10;
        delta.y = surround(delta.y, -50, 1) * 10;
        if (Math.abs(delta.x) < 30) {
            delta.x = 0;
        }
        this.velocity = delta;
        this.acceleration_y = 500;
    }

    init(mascot: Mascot): void {
        this.mascot = mascot;
        this.listener = this.handlePointerDown.bind(this);
        this.mascot.canvas.canvas.addEventListener(
            "pointerdown",
            this.listener
        );
        if (this.velocity.x === 0) {
            this.currentAnimation = new ThrownFallNormal();
        } else {
            this.currentAnimation = new ThrownFlyNormal(this.velocity.x > 0);
        }
        this.mascot.setAnimation(this.currentAnimation);
        this.requestID = window.requestAnimationFrame(this.update.bind(this));
    }

    update(elapsedTime: number) {
        const dt = Math.min(elapsedTime - this.lastUpdate, 100) * 0.001;
        this.lastUpdate = elapsedTime;

        this.velocity.y = this.velocity.y + this.acceleration_y * dt;
        const position = this.mascot.canvas.position;
        position.y = position.y + this.velocity.y * dt;
        position.x = position.x + this.velocity.x * dt;

        const { status, newPosition } =
            this.mascot.environment.getCollisionStatus(position);

        if (status === CollisionStatus.None) {
            this.mascot.flushPosition();
            this.requestID = window.requestAnimationFrame(
                this.update.bind(this)
            );
            return;
        }
        position.x = newPosition.x;
        position.y = newPosition.y;
        if (status === CollisionStatus.Wall) {
            this.currentAnimation.next = new IdleClimbHoriz(
                this.velocity.x > 0
            );
        }
        this.onStop();
    }

    onStop() {
        this.mascot.flushPosition();
        this.mascot.setBehavior(new IdleBehavior());
        this.mascot.setAnimation(this.currentAnimation.next!);
    }

    destroy(): void {
        this.mascot.canvas.canvas.removeEventListener(
            "pointerdown",
            this.listener
        );
        window.cancelAnimationFrame(this.requestID);
    }

    handlePointerDown(e: PointerEvent) {
        this.mascot.canvas.setFrame("shime01.png");
        this.mascot.setBehavior(
            new GrabbedBehavior({ x: e.clientX, y: e.clientY })
        );
    }
}

function surround(nb: number, min: number, max: number) {
    return Math.max(Math.min(nb, max), min);
}
