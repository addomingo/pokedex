export default function getWeaknesses(typeArray) {
    const typesAndWeaknesses = new Map([
        ["normal", ['rock', 'steel', 'fighting']],
        ["fighting", ['flying', 'poison', 'psychic', 'bug', 'ghost', 'fairy']],
        ["flying", ['rock', 'steel', 'electric']],
        ["poison", ['poison', 'ground', 'rock', 'ghost', 'steel']],
        ["ground", ['flying', 'bug', 'grass']],
        ["rock", ['fighting', 'ground', 'steel']],
        ["bug", ['fighting', 'flying', 'poison', 'ghost', 'steel', 'fire', 'fairy']],
        ["ghost", ['normal', 'dark', 'ghost']],
        ["steel", ['steel', 'fire', 'water', 'electric']],
        ["fire", ['rock', 'fire', 'water', 'dragon']],
        ["water", ['water', 'grass', 'dragon']],
        ["grass", ['flying', 'poison', 'bug', 'steel', 'fire', 'grass', 'dragon']],
        ["electric", ['ground', 'grass', 'electric', 'dragon']],
        ["psychic", ['steel', 'psychic', 'dark']],
        ["ice", ['steel', 'fire', 'water', 'ice']],
        ["dragon", ['steel', 'fairy']],
        ["dark", ['fighting', 'dark', 'fairy']],
        ["fairy", ['poison', 'steel', 'fire']],
        ["stellar", ['']] // no data in resource
    ]);

    if (typeArray.length == 2){
        return([...new Set([...typesAndWeaknesses.get(typeArray[0].type.name), ...typesAndWeaknesses.get(typeArray[1].type.name)])]);
    } else {
        return (typesAndWeaknesses.get(typeArray[0].type.name));
    }
}