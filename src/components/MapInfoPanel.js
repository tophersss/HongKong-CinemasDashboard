import { Autocomplete, Card, Grid, Paper, TextField, Input } from "@mui/material";
import ChartHousesSales from "../components/ChartHousesSales";
import CinemasGeoInfo from "../data/CinemasGeoInfo.json";




const MapInfoPanel = ({ activeCinema, setActiveCinema, activeHouse, setActiveHouse }) => {

    var cinemaNames = CinemasGeoInfo.map((d) => d.name);

    return (
        <div className="infoPanel-left">
            <Paper sx={{ position: "relative", justifyContent: "center", overflow: "hidden", minHeight: "100px", width: "30em", display: "inline-block" }}>
                <Autocomplete 
                    disablePortal
                    autoSelect
                    
                    id="cinema-value" 
                    className="cinemaAutoComplete"
                    options={cinemaNames} 
                    // renderInput={(params) => <TextField {...params} label="Cinema" variant="standard"/>}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                            <Input type="text" multiline={false} {...params.inputProps}></Input>
                        </div>
                        // <div ref={params.InputProps.ref}>
                        //   <input type="text" {...params.inputProps} />
                        // </div>
                      )}
                    sx={{ paddingTop: "10px" }}
                    value={activeCinema}
                    onChange={(event, newValue) => {
                        console.log(`activeCinema is changed to ${newValue}`)
                        setActiveCinema(newValue);
                    }}
                >

                </Autocomplete>
                <ChartHousesSales
                    hoveredTheatre={activeCinema}
                    activeHouse={activeHouse}
                    setActiveHouse={setActiveHouse}
                />
            </Paper>

        </div>
    )
}

export default MapInfoPanel