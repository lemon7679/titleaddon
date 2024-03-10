import { EntityInventoryComponent, Player, system, world } from "@minecraft/server";
import { MessageFormData, ModalFormData } from "@minecraft/server-ui";
import { readData, saveData } from "./db";

world.afterEvents.itemUse.subscribe(({ itemStack, source }) => {
    if (itemStack.typeId == "addon:custom_title") {
        system.run(() => {
            new ModalFormData().title(`§l§8<< 자유 칭호 쿠폰 >>`).textField(`§c§l10글자 이하의 단어와 띄어쓰기를 포함하지 않는 단어만 사용 가능 합니다.§r§l\n\n\n\n원하는 칭호를 입력해 주세요.`, `여기에 입력해 주세요.`).show(source).then(t => {
                if (t.canceled) {
                    source.sendMessage(`§l자유 칭호 쿠폰을 사용을 취소하였습니다.`);
                    return;
                };
                if (t.formValues == undefined) {
                    source.sendMessage(`§c§l빈 문자열은 칭호로 사용할 수 없습니다.`);
                    return;
                };
                if (String(t.formValues).length < 11 && /\s/.test(String(t.formValues))) {
                    source.sendMessage(`§c§l10글자 이하의 단어와 띄어쓰기를 포함하지 않는 단어만 사용 가능 합니다.`);
                    return;
                };
                new MessageFormData().title(`§l§8<< 자유 칭호 쿠폰 >>`).body(`정말 칭호를 ${String(t.formValues)}(으)로 하시겠습니까?`).button1(`아니요`).button2(`예`).show(source).then(t2 => {
                    if (t2.canceled) {
                        source.sendMessage(`§l자유 칭호 쿠폰을 사용을 취소하였습니다.`)
                        return
                    }
                    
                    switch (t2.selection) {
                        case 1: {
                            saveData(source.id, String(t.formValues))
                            source.runCommandAsync(`clear @s addon:custom_title`)
                            world.sendMessage(`§l§6<!>§r§l 유저 (§r ${source.name}§r§l )님이 §6[§e 자유 칭호 쿠폰 §6]§r§l을 사용하여 칭호를 §r${String(t.formValues)}§r§l(으)로 바꿨습니다.`)
                            break;
                        }
                        case 0: {
                            source.sendMessage(`§l자유 칭호 쿠폰을 사용을 취소하였습니다.`)
                            break;
                        }
                    }
                })
            });
        });
    };
});

world.beforeEvents.chatSend.subscribe(e=>{
    const {sender,message} = e
    e.cancel = true
    world.sendMessage(`[ §r${readData(sender.id)? readData(sender.id) : "칭호 없음"} §r] ${sender.name} §8>§r ${message}`)
})