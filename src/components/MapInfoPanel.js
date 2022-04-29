import { Autocomplete, Card, Grid, Paper, TextField, Input } from "@mui/material";
import ChartHousesSales from "../components/ChartHousesSales";
import CinemasGeoInfo from "../data/CinemasGeoInfo.json";


const MapInfoPanel = ({ activeCinema, ActiveCinemaChangeHandler, activeHouse, setActiveHouse }) => {

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
                    value={activeCinema === null ? null : activeCinema.name}
                    onChange={(event, newValue) => {
                        ActiveCinemaChangeHandler(newValue);
                    }}
                >

                </Autocomplete>
                {activeCinema === null ? 
                    "Search or Click On A Cinema To Show Dashboard" :
                    <ChartHousesSales
                        hoveredCinema={activeCinema?.name}
                        activeHouse={activeHouse}
                        setActiveHouse={setActiveHouse}
                    /> 
                }
                
     
            </Paper>

        </div>
    )
}

export default MapInfoPanel