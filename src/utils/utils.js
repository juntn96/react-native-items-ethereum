export const getItemProp = (itemPropDigits) => {
    const dmg = itemPropDigits.substring(0, 3) % 100 + 1
    const def = itemPropDigits.substring(3, 6) % 100 + 1
    const str = itemPropDigits.substring(6, 9) % 100 + 1
    const agi = itemPropDigits.substring(9, 12) % 100 + 1
    const intel = itemPropDigits.substring(12, 15) % 100 + 1
    return {
        dmg,
        def,
        str,
        agi,
        intel
    }
}

export const getItemQuality = (itemProp) => {
    console.log('>>>>  ', itemProp.dmg)
    const averageProp = (itemProp.dmg + itemProp.def + itemProp.str + itemProp.agi + itemProp.intel) / 5
    console.log('>>>>>>>>>>>>> ', averageProp)
    if (averageProp <= 35) {
        return 'D'
    }
    if (averageProp > 35 && averageProp <= 60) {
        return 'C'
    }
    if (averageProp > 60 && averageProp <= 80) {
        return 'B'
    }
    if (averageProp > 80 && averageProp <= 95) {
        return 'A'
    }
    if (averageProp > 95) {
        return 'S'
    }
}