//@ts-ignore
import { world, ChatSendBeforeEvent, system, EasingType, Vector3 } from "@minecraft/server"

//@ts-ignore
world.beforeEvents.chatSend.subscribe((event: ChatSendBeforeEvent) => {
    var freeCameraRunId: boolean | number | string | Vector3 | undefined = event.sender.getDynamicProperty("freeCameraRunId")
    if ((freeCameraRunId !== undefined && freeCameraRunId !== 0) && event.message === "+fc") {
        event.cancel = true;
        system.run(() => {
            system.clearRun(freeCameraRunId as number);
            event.sender.setDynamicProperty("freeCameraRunId", 0)
            event.sender.camera.clear();
            event.sender.sendMessage("FreeCamera off");
        });
        return;
    }
    if ((freeCameraRunId === undefined || freeCameraRunId === 0) && event.message.startsWith("+fc ")) {
        event.cancel = true;
        system.run(() => {
            var originLocation: Vector3 = event.sender.location;
            var speed: number = parseFloat(event.message.substring(4));
            var cameraY: number = originLocation.y;
            if (isNaN(speed)) {
                event.sender.sendMessage("§cBad Input: speed§r");
                return;
            }
            event.sender.sendMessage(`FreeCamera on (speed: ${speed})`);
            event.sender.setDynamicProperty("freeCameraRunId", system.runInterval(() => {
                if (event.sender.isSneaking) { cameraY -= 0.5; }
                if (!event.sender.isOnGround) { cameraY += 0.5; }
                event.sender.camera.setCamera("minecraft:free", { easeOptions: { easeTime: 0.25, easeType: EasingType.Linear }, location: { x: originLocation.x + (event.sender.location.x - originLocation.x) * speed, y: cameraY, z: originLocation.z + (event.sender.location.z - originLocation.z) * speed }, rotation: event.sender.getRotation() });
            }, 5));
        });
        return;
    }
});
