export function PickChainColor(chain) {
    var color = null, code = null;

    switch (chain) {
        case "Broadway":
            color = "burgundy"
            code = "#980F5A"
            break;

        case "MCL":
            color = "yellow"
            code = "#F7BE54"
            break;

        case "Emperor Cinema":
            color = "orange"
            code = "#FF9F45"
            break;

        case "Cinema City":
            color = "turquoise"
            code = "#3EB8A5"
            break;

        case "Golden Harvest":
            color = "ukraine"
            code = "#ffd600"
            break;

        case "Others":
            color = "blue"
            code = "#7863cc"
            break;

        default:
            color = "blue"
            code = "#7863cc"
            break;
    }

    return {"color": color, "code": code};
}
