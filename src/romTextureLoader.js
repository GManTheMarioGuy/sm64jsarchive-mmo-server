﻿import { intro_seg7_texture_070086A0, intro_seg7_texture_07007EA0, intro_seg7_texture_0700B4A0, intro_seg7_texture_0700C4A0 } from "./levels/intro/leveldata"
import { castle_grounds_seg7_texture_07000000, castle_grounds_seg7_texture_07001000, castle_grounds_seg7_texture_07002000 } from "./levels/castle_grounds/texture.inc.js"
import { title_texture_0A0001C0, title_texture_0A000E40, title_texture_0A001AC0, title_texture_0A002740 } from "./levels/intro/title_screen_bg"
import { tree_seg3_texture_0302DE28, tree_seg3_texture_0302EE28, tree_seg3_texture_0302FF60, tree_seg3_texture_03031048, tree_seg3_texture_03032218 } from "./actors/tree/model.inc"
import { texture_shadow_quarter_circle } from "./common_gfx/segment2"
import * as SkyboxWater from "./textures/skyboxes/water_skybox"
import { assets } from "./assets"

import {
    gd_texture_mario_face_shine,
    gd_texture_red_star_0,
    gd_texture_red_star_1,
    gd_texture_red_star_2,
    gd_texture_red_star_3,
    gd_texture_red_star_4,
    gd_texture_red_star_5,
    gd_texture_red_star_6,
    gd_texture_red_star_7,
    gd_texture_white_star_0,
    gd_texture_white_star_1,
    gd_texture_white_star_2,
    gd_texture_white_star_3,
    gd_texture_white_star_4,
    gd_texture_white_star_5,
    gd_texture_white_star_6,
    gd_texture_white_star_7,
    gd_texture_sparkle_0,
    gd_texture_sparkle_1,
    gd_texture_sparkle_2,
    gd_texture_sparkle_3,
    gd_texture_sparkle_4 } from "./goddard/GoddardRenderer"

import { 
    outside_09000000,
    outside_09001000,
    outside_09002000,
    outside_09003000,
    outside_09003800, 
    outside_09004000, 
    outside_09004800, 
    outside_09006000,
    outside_09006800, 
    outside_09007800,
    outside_09008000, 
    outside_09009000, 
    outside_09009800,
    outside_0900A000,
    outside_0900B000,
    outside_0900B400,
    outside_0900BC00,
    outside_0900A800,
} from "./textures/outside"

import { 
    mario_texture_yellow_button, 
    mario_texture_eyes_front, 
    mario_texture_hair_sideburn, 
    mario_texture_mustache, 
    mario_texture_m_logo,
    mario_texture_eyes_half_closed,
    mario_texture_eyes_closed
} from "./actors/mario/model.inc"

const url = new URL(window.location.href)
const msgElement = document.getElementById('uploadMessage')
let loadedGameAssets = false
const textureVersion = 2

const loadDataIntoGame = (data) => {

    intro_seg7_texture_070086A0.push(...data['levels/intro/1.rgba16.png'].data)
    intro_seg7_texture_07007EA0.push(...data['levels/intro/0.rgba16.png'].data)
    intro_seg7_texture_0700B4A0.push(...data['levels/intro/2_copyright.rgba16.png'].data)
    intro_seg7_texture_0700C4A0.push(...data['levels/intro/3_tm.rgba16.png'].data)

    castle_grounds_seg7_texture_07000000.push(...data['levels/castle_grounds/0.rgba16.png'].data)
    castle_grounds_seg7_texture_07001000.push(...data['levels/castle_grounds/1.rgba16.png'].data)
    castle_grounds_seg7_texture_07002000.push(...data['levels/castle_grounds/2.rgba16.png'].data)

    gd_texture_mario_face_shine.push(...data['textures/intro_raw/mario_face_shine.ia8.png'].data)
    gd_texture_red_star_0.push(...data['textures/intro_raw/red_star_0.rgba16.png'].data)
    gd_texture_red_star_1.push(...data['textures/intro_raw/red_star_1.rgba16.png'].data)
    gd_texture_red_star_2.push(...data['textures/intro_raw/red_star_2.rgba16.png'].data)
    gd_texture_red_star_3.push(...data['textures/intro_raw/red_star_3.rgba16.png'].data)
    gd_texture_red_star_4.push(...data['textures/intro_raw/red_star_4.rgba16.png'].data)
    gd_texture_red_star_5.push(...data['textures/intro_raw/red_star_5.rgba16.png'].data)
    gd_texture_red_star_6.push(...data['textures/intro_raw/red_star_6.rgba16.png'].data)
    gd_texture_red_star_7.push(...data['textures/intro_raw/red_star_7.rgba16.png'].data)
    gd_texture_white_star_0.push(...data['textures/intro_raw/white_star_0.rgba16.png'].data)
    gd_texture_white_star_1.push(...data['textures/intro_raw/white_star_1.rgba16.png'].data)
    gd_texture_white_star_2.push(...data['textures/intro_raw/white_star_2.rgba16.png'].data)
    gd_texture_white_star_3.push(...data['textures/intro_raw/white_star_3.rgba16.png'].data)
    gd_texture_white_star_4.push(...data['textures/intro_raw/white_star_4.rgba16.png'].data)
    gd_texture_white_star_5.push(...data['textures/intro_raw/white_star_5.rgba16.png'].data)
    gd_texture_white_star_6.push(...data['textures/intro_raw/white_star_6.rgba16.png'].data)
    gd_texture_white_star_7.push(...data['textures/intro_raw/white_star_7.rgba16.png'].data)
    gd_texture_sparkle_0.push(...data['textures/intro_raw/sparkle_0.rgba16.png'].data)
    gd_texture_sparkle_1.push(...data['textures/intro_raw/sparkle_1.rgba16.png'].data)
    gd_texture_sparkle_2.push(...data['textures/intro_raw/sparkle_2.rgba16.png'].data)
    gd_texture_sparkle_3.push(...data['textures/intro_raw/sparkle_3.rgba16.png'].data)
    gd_texture_sparkle_4.push(...data['textures/intro_raw/sparkle_4.rgba16.png'].data)

    title_texture_0A0001C0.push(...data['textures/title_screen_bg/title_screen_bg.001C0.rgba16.png'].data)
    title_texture_0A000E40.push(...data['textures/title_screen_bg/title_screen_bg.00E40.rgba16.png'].data)
    title_texture_0A001AC0.push(...data['textures/title_screen_bg/title_screen_bg.01AC0.rgba16.png'].data)
    title_texture_0A002740.push(...data['textures/title_screen_bg/title_screen_bg.02740.rgba16.png'].data)

    outside_09000000.push(...data['textures/outside/castle_grounds_textures.00000.rgba16.png'].data)
    outside_09001000.push(...data['textures/outside/castle_grounds_textures.01000.rgba16.png'].data)
    outside_09002000.push(...data['textures/outside/castle_grounds_textures.02000.rgba16.png'].data)
    outside_09003000.push(...data['textures/outside/castle_grounds_textures.03000.rgba16.png'].data)
    outside_09003800.push(...data['textures/outside/castle_grounds_textures.03800.rgba16.png'].data)
    outside_09004000.push(...data['textures/outside/castle_grounds_textures.04000.rgba16.png'].data)
    outside_09004800.push(...data['textures/outside/castle_grounds_textures.04800.rgba16.png'].data)
    outside_09006000.push(...data['textures/outside/castle_grounds_textures.06000.rgba16.png'].data)
    outside_09006800.push(...data['textures/outside/castle_grounds_textures.06800.rgba16.png'].data)
    outside_09007800.push(...data['textures/outside/castle_grounds_textures.07800.rgba16.png'].data)
    outside_09008000.push(...data['textures/outside/castle_grounds_textures.08000.rgba16.png'].data)
    outside_09009000.push(...data['textures/outside/castle_grounds_textures.09000.rgba16.png'].data)
    outside_09009800.push(...data['textures/outside/castle_grounds_textures.09800.rgba16.png'].data)
    outside_0900A000.push(...data['textures/outside/castle_grounds_textures.0A000.rgba16.png'].data)
    outside_0900B000.push(...data['textures/outside/castle_grounds_textures.0B000.rgba16.png'].data)
    outside_0900B400.push(...data['textures/outside/castle_grounds_textures.0B400.rgba16.png'].data)
    outside_0900A800.push(...data['textures/outside/castle_grounds_textures.0A800.rgba16.png'].data)
    outside_0900BC00.push(...data['textures/outside/castle_grounds_textures.0BC00.ia16.png'].data)

    mario_texture_yellow_button.push(...data['actors/mario/mario_overalls_button.rgba16.png'].data)
    mario_texture_m_logo.push(...data['actors/mario/mario_logo.rgba16.png'].data)
    mario_texture_mustache.push(...data["actors/mario/mario_mustache.rgba16.png"].data)
    mario_texture_hair_sideburn.push(...data["actors/mario/mario_sideburn.rgba16.png"].data)
    mario_texture_eyes_front.push(...data["actors/mario/mario_eyes_center.rgba16.png"].data)
    mario_texture_eyes_half_closed.push(...data["actors/mario/mario_eyes_half_closed.rgba16.png"].data)
    mario_texture_eyes_closed.push(...data["actors/mario/mario_eyes_closed.rgba16.png"].data)

    tree_seg3_texture_0302DE28.push(...data["actors/tree/tree_left_side.rgba16.png"].data)
    tree_seg3_texture_0302EE28.push(...data["actors/tree/tree_right_side.rgba16.png"].data)
    tree_seg3_texture_0302FF60.push(...data["actors/tree/pine_tree.rgba16.png"].data)
    tree_seg3_texture_03031048.push(...data["actors/tree/snowy_pine_tree.rgba16.png"].data)
    tree_seg3_texture_03032218.push(...data["actors/tree/palm_tree.rgba16.png"].data)

    texture_shadow_quarter_circle.push(...data["textures/segment2/shadow_quarter_circle.ia8.png"].data)

    /*SkyboxWater.water_skybox_texture_00000.push(...data["water_skybox_texture_00000"].data)
    SkyboxWater.water_skybox_texture_00001.push(...data["water_skybox_texture_00001"].data)
    SkyboxWater.water_skybox_texture_00002.push(...data["water_skybox_texture_00002"].data)
    SkyboxWater.water_skybox_texture_00003.push(...data["water_skybox_texture_00003"].data)
    SkyboxWater.water_skybox_texture_00004.push(...data["water_skybox_texture_00004"].data)
    SkyboxWater.water_skybox_texture_00005.push(...data["water_skybox_texture_00005"].data)
    SkyboxWater.water_skybox_texture_00006.push(...data["water_skybox_texture_00006"].data)
    SkyboxWater.water_skybox_texture_00007.push(...data["water_skybox_texture_00007"].data)
    SkyboxWater.water_skybox_texture_00008.push(...data["water_skybox_texture_00008"].data)
    SkyboxWater.water_skybox_texture_00009.push(...data["water_skybox_texture_00009"].data)
    SkyboxWater.water_skybox_texture_0000A.push(...data["water_skybox_texture_0000A"].data)
    SkyboxWater.water_skybox_texture_0000B.push(...data["water_skybox_texture_0000B"].data)
    SkyboxWater.water_skybox_texture_0000C.push(...data["water_skybox_texture_0000C"].data)
    SkyboxWater.water_skybox_texture_0000D.push(...data["water_skybox_texture_0000D"].data)
    SkyboxWater.water_skybox_texture_0000E.push(...data["water_skybox_texture_0000E"].data)
    SkyboxWater.water_skybox_texture_0000F.push(...data["water_skybox_texture_0000F"].data)

    SkyboxWater.water_skybox_texture_00010.push(...data["water_skybox_texture_00010"].data)
    SkyboxWater.water_skybox_texture_00011.push(...data["water_skybox_texture_00011"].data)
    SkyboxWater.water_skybox_texture_00012.push(...data["water_skybox_texture_00012"].data)
    SkyboxWater.water_skybox_texture_00013.push(...data["water_skybox_texture_00013"].data)
    SkyboxWater.water_skybox_texture_00014.push(...data["water_skybox_texture_00014"].data)
    SkyboxWater.water_skybox_texture_00015.push(...data["water_skybox_texture_00015"].data)
    SkyboxWater.water_skybox_texture_00016.push(...data["water_skybox_texture_00016"].data)
    SkyboxWater.water_skybox_texture_00017.push(...data["water_skybox_texture_00017"].data)
    SkyboxWater.water_skybox_texture_00018.push(...data["water_skybox_texture_00018"].data)
    SkyboxWater.water_skybox_texture_00019.push(...data["water_skybox_texture_00019"].data)
    SkyboxWater.water_skybox_texture_0001A.push(...data["water_skybox_texture_0001A"].data)
    SkyboxWater.water_skybox_texture_0001B.push(...data["water_skybox_texture_0001B"].data)
    SkyboxWater.water_skybox_texture_0001C.push(...data["water_skybox_texture_0001C"].data)
    SkyboxWater.water_skybox_texture_0001D.push(...data["water_skybox_texture_0001D"].data)
    SkyboxWater.water_skybox_texture_0001E.push(...data["water_skybox_texture_0001E"].data)
    SkyboxWater.water_skybox_texture_0001F.push(...data["water_skybox_texture_0001F"].data)

    SkyboxWater.water_skybox_texture_00020.push(...data["water_skybox_texture_00020"].data)
    SkyboxWater.water_skybox_texture_00021.push(...data["water_skybox_texture_00021"].data)
    SkyboxWater.water_skybox_texture_00022.push(...data["water_skybox_texture_00022"].data)
    SkyboxWater.water_skybox_texture_00023.push(...data["water_skybox_texture_00023"].data)
    SkyboxWater.water_skybox_texture_00024.push(...data["water_skybox_texture_00024"].data)
    SkyboxWater.water_skybox_texture_00025.push(...data["water_skybox_texture_00025"].data)
    SkyboxWater.water_skybox_texture_00026.push(...data["water_skybox_texture_00026"].data)
    SkyboxWater.water_skybox_texture_00027.push(...data["water_skybox_texture_00027"].data)
    SkyboxWater.water_skybox_texture_00028.push(...data["water_skybox_texture_00028"].data)
    SkyboxWater.water_skybox_texture_00029.push(...data["water_skybox_texture_00029"].data)
    SkyboxWater.water_skybox_texture_0002A.push(...data["water_skybox_texture_0002A"].data)
    SkyboxWater.water_skybox_texture_0002B.push(...data["water_skybox_texture_0002B"].data)
    SkyboxWater.water_skybox_texture_0002C.push(...data["water_skybox_texture_0002C"].data)
    SkyboxWater.water_skybox_texture_0002D.push(...data["water_skybox_texture_0002D"].data)
    SkyboxWater.water_skybox_texture_0002E.push(...data["water_skybox_texture_0002E"].data)
    SkyboxWater.water_skybox_texture_0002F.push(...data["water_skybox_texture_0002F"].data)

    SkyboxWater.water_skybox_texture_00030.push(...data["water_skybox_texture_00030"].data)
    SkyboxWater.water_skybox_texture_00031.push(...data["water_skybox_texture_00031"].data)
    SkyboxWater.water_skybox_texture_00032.push(...data["water_skybox_texture_00032"].data)
    SkyboxWater.water_skybox_texture_00033.push(...data["water_skybox_texture_00033"].data)
    SkyboxWater.water_skybox_texture_00034.push(...data["water_skybox_texture_00034"].data)
    SkyboxWater.water_skybox_texture_00035.push(...data["water_skybox_texture_00035"].data)
    SkyboxWater.water_skybox_texture_00036.push(...data["water_skybox_texture_00036"].data)
    SkyboxWater.water_skybox_texture_00037.push(...data["water_skybox_texture_00037"].data)
    SkyboxWater.water_skybox_texture_00038.push(...data["water_skybox_texture_00038"].data)
    SkyboxWater.water_skybox_texture_00039.push(...data["water_skybox_texture_00039"].data)
    SkyboxWater.water_skybox_texture_0003A.push(...data["water_skybox_texture_0003A"].data)
    SkyboxWater.water_skybox_texture_0003B.push(...data["water_skybox_texture_0003B"].data)
    SkyboxWater.water_skybox_texture_0003C.push(...data["water_skybox_texture_0003C"].data)
    SkyboxWater.water_skybox_texture_0003D.push(...data["water_skybox_texture_0003D"].data)
    SkyboxWater.water_skybox_texture_0003E.push(...data["water_skybox_texture_0003E"].data)
    SkyboxWater.water_skybox_texture_0003F.push(...data["water_skybox_texture_0003F"].data)*/

    document.getElementById('romUpload').hidden = true
    msgElement.innerHTML = "Rom Asset Extraction Success - You may now start the game"
    msgElement.style = "color:#00ff00"
    document.getElementById("startbutton").disabled = false
    loadedGameAssets = true

}

const processExtractedResults = (data) => {
    if (data == 'Fail') {
        msgElement.innerHTML = "Rom Asset Extraction Fail"
        msgElement.style = "color:red"
    } else {  /// Success
        loadDataIntoGame(data)
        data.textureVersion = textureVersion
        localStorage['sm64jsAssets'] = JSON.stringify(data)
    }

}

export const checkForRom = () => {   /// happens one time when the page is loaded
    if (localStorage['sm64jsAssets']) {
        const data = JSON.parse(localStorage['sm64jsAssets'])
        if (data.textureVersion == textureVersion) loadDataIntoGame(data)
    }

    if (url.searchParams.get("romExternal") && !loadedGameAssets) {
        msgElement.innerHTML = "Transfering ROM Data..."
        msgElement.style = "color:yellow"
        $.ajax({
            url: '/romTransfer',
            type: 'GET',
            dataType: 'json',
            data: { romExternal: url.searchParams.get("romExternal") },
            success: (extractedData) => { processExtractedResults(extractedData) }
        })
    }

    return loadedGameAssets
}


const bufferToUint32Be = (buffer) => {
    const arr = []
    if (buffer.length % 4 != 0) throw "error - should be divisble by 4"
    for (let i = 0; i < buffer.length; i += 4) {
        arr.push(buffer[i + 3] + (buffer[i + 2] << 8) + (buffer[i + 1] << 16) + (buffer[i] << 24))
    }
    return arr
}

const getBit = (buf, bit) => {
    return buf[Math.floor(bit / 8) + 16] & (1 << (7 - ((bit) % 8)))
}

$('#romUpload').submit(
    (e) => {
        e.preventDefault()
        if (loadedGameAssets) return
        const romFile = document.getElementById('romFile').files[0]
        const reader = new FileReader()
        reader.readAsArrayBuffer(romFile)
        reader.onload = (evt) => {
            const romBufferData = evt.target.result
            const newData = {}

            ///// process assets by type
            const assetsMio0 = {}, assetsBasic = []

            Object.entries(assets).forEach(([key, value]) => {
                if (key == '@comment') return
                if (value[3] == undefined) return
                if (value[3]['us'].length == 2) {
                    const mio0 = value[3]['us'][0]
                    if (assetsMio0[mio0] == undefined) assetsMio0[mio0] = []
                    assetsMio0[mio0].push({
                        name: key,
                        size: value[2],
                        offset: value[3]['us'][1]
                    })
                } else if (value[3]['us'].length == 1) {
                    assetsBasic.push({
                        name: key,
                        size: value[2],
                        offset: value[3]['us'][0]
                    })
                } else throw "unknown asset type"


            })


            ////// process basic assets
            assetsBasic.forEach(value => {
                newData[value.name] = {
                    data: Buffer.from(romBufferData.slice(value.offset, value.offset + value.size))
                }
            })

            /////// process Mio0 assets
            Object.entries(assetsMio0).forEach(([mio0, values]) => {
                const dataAtOffset = romBufferData.slice(mio0)

                const firstfour = dataAtOffset.slice(0, 4)
                if (new TextDecoder().decode(new Uint8Array(firstfour)) == "MIO")
                    throw "header not valid"

                const headerData = bufferToUint32Be(new Uint8Array(dataAtOffset.slice(4, 16)))
                const headerObject = {
                    dest_size: headerData[0],
                    comp_offset: headerData[1],
                    uncomp_offset: headerData[2]
                }

                let bit_idx = 0, comp_idx = 0, uncomp_idx = 0

                const wholeData = new Uint8Array(dataAtOffset)
                const decoded_bytes = []

                while (decoded_bytes.length < headerObject.dest_size) {
                    if (getBit(wholeData, bit_idx)) {
                        // 1 - pull uncompressed data
                        decoded_bytes.push(wholeData[headerObject.uncomp_offset + uncomp_idx])
                        uncomp_idx++
                    } else {
                        // 0 - read compressed data
                        const x = headerObject.comp_offset + comp_idx
                        const vals = wholeData.slice(x, x + 2)
                        comp_idx += 2
                        const length = ((vals[0] & 0xF0) >> 4) + 3
                        const idx = ((vals[0] & 0x0F) << 8) + vals[1] + 1
                        for (let i = 0; i < length; i++) {
                            decoded_bytes.push(decoded_bytes[decoded_bytes.length - idx])
                        }
                    }
                    bit_idx++
                }

                values.forEach(value => {
                    newData[value.name] = {
                        data: Buffer.from(decoded_bytes.slice(value.offset, value.offset + value.size))
                    }
                })


            })

            loadDataIntoGame(newData)

        }
/*        msgElement.innerHTML = "Please wait for ROM to be uploaded and game assets to be sent back to your device..."
        msgElement.style = "color:yellow"
        $.ajax({
            url: '/romUpload',
            type: 'POST',
            data: new FormData(e.target),
            processData: false,
            contentType: false,
            success: (extractedData) => {
                console.log(extractedData)
                processExtractedResults(extractedData)
            }
        })*/
    }
)
