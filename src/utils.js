export const hash = function(s) {
    let h = 0xbadface
    for(let i = 0; i < s.length; i++)
        h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
    return ((h ^ h >>> 16) >>> 0).toString();
};

export const flexCol = {display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}

export const flexRow = {display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}
