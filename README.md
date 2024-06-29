# FreeCamera

MinecraftBE ScriptAPI FreeCamera

## Usage

1. 打开 `测试版API`
2. 装载该pack

## Commands

+ `+fc <speed: number>` 以speed为映射速度启用FreeCamera
+ `+fc` 禁用FreeCamera

## Tips

+ 启用自由视角时，本体将被锁定在原位
+ 受到伤害/切换维度/死亡/退出游戏将自动退出自由视角
+ 自由视角朝向将与玩家朝向保持一致，速度为玩家速度的speed倍（这意味着高speed会导致控制困难）
+ 蹲下以下降自由视角，跳起以抬升自由视角
+ 夜视等效果将不会作用于自由视角

## License

+ MIT License
