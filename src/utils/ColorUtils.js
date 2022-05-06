export function PickChainColor(chain) {
    var color = null;

    switch (chain) {
        case "Broadway":
            color = "burgundy"
            break;

        case "MCL":
            color = "yellow"
            break;

        case "Emperor Cinema":
            color = "orange"
            break;

        case "Cinema City":
            color = "turquoise"
            break;

        case "Golden Harvest":
            color = "ukraine"
            break;

        case "Others":
            color = "blue"
            break;

        default:
            color = "blue"
            break;
    }

    return color;
}
