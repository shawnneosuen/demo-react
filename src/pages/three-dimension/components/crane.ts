import { Color3, MeshBuilder, Scene, StandardMaterial } from "@babylonjs/core";
type Options = {
    height: number,
    width: number,
    depth: number
}

export const CreateCrane = (scene: Scene,{height,width,depth}:Options) => {
    var crane = MeshBuilder.CreateBox("crane",{height:height, width:width, depth:depth}, scene)
    var craneMaterial = new  StandardMaterial('craneMaterial', scene)
    craneMaterial.emissiveColor = new Color3(1,1,0)
    crane.material = craneMaterial
    return crane
}