//@ts-ignore
import { world, ChatSendBeforeEvent, system, EasingType, Vector3, Player } from "@minecraft/server"

//@ts-ignore
world.beforeEvents.chatSend.subscribe((event: ChatSendBeforeEvent) => {
    // get RunId
    var freeCameraRunId: boolean | number | string | Vector3 | undefined = event.sender.getDynamicProperty("freeCameraRunId");
    // clear run
    if (freeCameraRunId !== undefined && event.message === "+fc") {
        event.cancel = true;
        system.clearRun(freeCameraRunId as number);
        event.sender.setDynamicProperty("freeCameraRunId", 0);
        system.run(() => {
            event.sender.camera.clear();
            event.sender.sendMessage("FreeCamera off");
        });
        return;
    }
    // free camera
    if ((freeCameraRunId === undefined || freeCameraRunId === 0) && event.message.startsWith("+fc ")) {
        event.cancel = true;
        system.run(() => {
            var originLocation: Vector3 = event.sender.location;
            var speed: number = parseFloat(event.message.substring(4));
            var cameraX: number = originLocation.x;
            var cameraY: number = originLocation.y;
            var cameraZ: number = originLocation.z;
            if (isNaN(speed)) {
                event.sender.sendMessage("§cBad Input: speed§r");
                return;
            }
            event.sender.sendMessage(`FreeCamera on (speed: ${speed})`);
            event.sender.setDynamicProperty("freeCameraRunId", system.runInterval(() => {
                cameraX += (event.sender.location.x - originLocation.x) * speed;
                if (event.sender.isSneaking) { cameraY -= 0.5; }
                if (event.sender.isJumping) { cameraY += 0.5; }
                cameraZ += (event.sender.location.z - originLocation.z) * speed;
                try { event.sender.camera.setCamera("minecraft:free", { easeOptions: { easeTime: 0.25, easeType: EasingType.Linear }, location: { x: cameraX, y: cameraY, z: cameraZ }, rotation: event.sender.getRotation() }); }
                catch (e) { }
                event.sender.teleport(originLocation, { rotation: event.sender.getRotation() });
            }, 5));
        });
        return;
    }
});

world.afterEvents.entityHurt.subscribe((event) => {
    var freeCameraRunId: boolean | number | string | Vector3 | undefined = event.hurtEntity.getDynamicProperty("freeCameraRunId");
    if (freeCameraRunId !== undefined && freeCameraRunId !== 0) {
        system.clearRun(freeCameraRunId as number);
        event.hurtEntity.setDynamicProperty("freeCameraRunId", 0);
        system.run(() => {
            (event.hurtEntity as Player).camera.clear();
            (event.hurtEntity as Player).sendMessage("FreeCamera off");
        });
        return;
    }
}, { entityTypes: ["minecraft:player"] });

world.afterEvents.playerDimensionChange.subscribe((event) => {
    var freeCameraRunId: boolean | number | string | Vector3 | undefined = event.player.getDynamicProperty("freeCameraRunId");
    if (freeCameraRunId !== undefined && freeCameraRunId !== 0) {
        system.clearRun(freeCameraRunId as number);
        event.player.setDynamicProperty("freeCameraRunId", 0);
        system.run(() => {
            event.player.camera.clear();
            event.player.sendMessage("FreeCamera off");
        });
        return;
    }
});

world.afterEvents.entityDie.subscribe((event) => {
    var freeCameraRunId: boolean | number | string | Vector3 | undefined = event.deadEntity.getDynamicProperty("freeCameraRunId");
    if (freeCameraRunId !== undefined && freeCameraRunId !== 0) {
        system.clearRun(freeCameraRunId as number);
        event.deadEntity.setDynamicProperty("freeCameraRunId", 0);
        system.run(() => {
            (event.deadEntity as Player).camera.clear();
            (event.deadEntity as Player).sendMessage("FreeCamera off");
        });
        return;
    }
}, { entityTypes: ["minecraft:player"] });

world.beforeEvents.playerLeave.subscribe((event) => {
    var freeCameraRunId: boolean | number | string | Vector3 | undefined = event.player.getDynamicProperty("freeCameraRunId");
    if (freeCameraRunId !== undefined && freeCameraRunId !== 0) {
        system.clearRun(freeCameraRunId as number);
        event.player.setDynamicProperty("freeCameraRunId", 0);
        return;
    }
});