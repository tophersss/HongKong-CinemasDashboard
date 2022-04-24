import { useEffect, useRef, useState } from "react";
import "../App.css";
import { groupBy } from "lodash";
import mtr_distances from "../data/mtr_distances.json";
import ico_goldenharvest from "../assets/golden_harvest.png";
import ico_cinemacity from "../assets/cinema_city.png";
import ico_broadway from "../assets/broadway.png";
import ico_mcl from "../assets/mcl.png";
import ico_emperor from "../assets/emperor.png";
import ico_other from "../assets/others.png";
import ico_mtr from "../assets/mtr.png";
import { useLeafletContext } from "@react-leaflet/core";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Polygon,
  Tooltip,
  Polyline,
  LayersControl,
  LayerGroup,
  FeatureGroup,
} from "react-leaflet";
import L from "leaflet";
import { Grid } from "@mui/material";
import ChartTheatresSalesOverHours from "../components/ChartTheatresSalesOverHours";
import ChartHousesSales from "../components/ChartHousesSales";

const cinemas = [
  { name: "ACX Cinemas", coordinates: [22.29271545, 114.2008981] },
  { name: "B+ cinema apm", coordinates: [22.31237, 114.22519] },
  { name: "B+ cinema MOKO", coordinates: [22.32330139, 114.1721525] },
  { name: "CANDY PARK BY CINEMA CITY", coordinates: [22.37654, 114.11154] },
  { name: "CGV Cinemas D2 Place", coordinates: [22.33603, 114.14754] },
  { name: "Cinema City JP", coordinates: [22.28084, 114.18583] },
  { name: "Cinema City VICTORIA", coordinates: [22.27975, 114.18695] },
  { name: "Cinema City 朗豪坊", coordinates: [22.31801, 114.16864] },
  { name: "Cinema City 柴灣", coordinates: [22.26362, 114.23866] },
  { name: "Festival Grand Cinema", coordinates: [22.33705, 114.17487] },
  { name: "K11 Art House", coordinates: [22.29439459, 114.1744091] },
  { name: "Lumen Cinema", coordinates: [22.36593702, 114.1359784] },
  { name: "MCL 長沙灣戲院", coordinates: [22.33908, 114.15201] },
  { name: "MCL 海怡戲院", coordinates: [22.24346, 114.14842] },
  { name: "MCL 粉嶺戲院", coordinates: [22.50076, 114.14571] },
  { name: "MCL 淘大戲院", coordinates: [22.32412, 114.21644] },
  { name: "MCL 新都城戲院", coordinates: [22.32324, 114.25819] },
  { name: "MCL 德福戲院", coordinates: [22.32285, 114.21224] },
  { name: "MCL 數碼港戲院", coordinates: [22.26074, 114.12969] },
  { name: "MCL東薈城戲院", coordinates: [22.29004, 113.94093] },
  { name: "MOViE MOViE Cityplaza", coordinates: [22.28562556, 114.2171914] },
  {
    name: "MOViE MOViE Pacific Place",
    coordinates: [22.27761878, 114.1664511],
  },
  { name: "MOVIE TOWN - 新城市廣場", coordinates: [22.38078298, 114.1881886] },
  { name: "MY CINEMA YOHO MALL", coordinates: [22.44522, 114.03768] },
  { name: "PALACE ifc", coordinates: [22.28558594, 114.1581372] },
  { name: "PREMIERE ELEMENTS", coordinates: [22.30410509, 114.1628261] },
  { name: "StagE", coordinates: [22.39353586, 113.9765212] },
  { name: "STAR Cinema", coordinates: [22.30793, 114.25989] },
  { name: "the sky", coordinates: [22.31557858, 114.1619419] },
  { name: "巴黎倫敦紐約米蘭戲院", coordinates: [22.39812, 113.97495] },
  { name: "百老匯電影中心", coordinates: [22.31066, 114.16897] },
  { name: "百老匯戲院 - The ONE", coordinates: [22.29985241, 114.1726841] },
  { name: "百老匯戲院 - 旺角", coordinates: [22.31694821, 114.1705871] },
  { name: "百老匯戲院 - 荃灣", coordinates: [22.37114982, 114.1110935] },
  { name: "百老匯戲院 - 荷里活", coordinates: [22.34044101, 114.203047] },
  { name: "百老匯戲院 - 葵芳", coordinates: [22.35745578, 114.1261888] },
  { name: "百老匯戲院 - 嘉湖銀座", coordinates: [22.45706686, 114.0031981] },
  { name: "星影匯", coordinates: [22.32404681, 114.2037823] },
  { name: "皇室戲院", coordinates: [22.28052947, 114.1864284] },
  { name: "英皇戲院（中環娛樂行）", coordinates: [22.28155, 114.15653] },
  { name: "英皇戲院（屯門新都商場）", coordinates: [22.39076, 113.97822] },
  { name: "英皇戲院（尖沙咀iSQUARE）", coordinates: [22.29674, 114.17188] },
  { name: "英皇戲院（荃灣荃新天地）", coordinates: [22.36797, 114.11453] },
  {
    name: "英皇戲院（馬鞍山新港城中心）",
    coordinates: [22.42414936, 114.2309463],
  },
  { name: "英皇戲院（將軍澳康城）", coordinates: [22.2945, 114.27061] },
  { name: "英皇戲院（銅鑼灣時代廣場）", coordinates: [22.27829, 114.18211] },
  { name: "香港藝術中心古天樂電影院", coordinates: [22.28017, 114.17081] },
  { name: "海運戲院", coordinates: [22.29516055, 114.1690952] },
  { name: "高先電影院", coordinates: [22.28335, 114.12933] },
  { name: "康怡戲院", coordinates: [22.28391, 114.21614] },
  { name: "凱都", coordinates: [22.39882503, 113.975449] },
  { name: "新寶", coordinates: [22.31676573, 114.1718083] },
  { name: "嘉禾 Megabox", coordinates: [22.3197175, 114.2084764] },
  { name: "嘉禾 V WALK", coordinates: [22.32689916, 114.1542262] },
  { name: "嘉禾大埔", coordinates: [22.45240094, 114.1691641] },
  { name: "嘉禾粉嶺", coordinates: [22.49176643, 114.1400493] },
  { name: "嘉禾啟德", coordinates: [22.3339037, 114.1955553] },
  { name: "嘉禾黃埔", coordinates: [22.30511557, 114.1908673] },
  { name: "嘉禾銀河廣場", coordinates: [22.27743207, 114.2295761] },
  { name: "影藝戲院(九龍城)", coordinates: [22.33094334, 114.1877447] },
  { name: "總統", coordinates: [22.28133879, 114.1835767] },
  { name: "寶石戲院", coordinates: [22.30652597, 114.186096] },
  { name: "影藝戲院(青衣城)", coordinates: [22.36028379, 114.1070718] },
];

const fillBlueOptions = { fillColor: "blue" };
const blackOptions = { color: "black" };
const limeOptions = { color: "lime" };
const purpleOptions = { color: "purple" };
const redOptions = { color: "red" };

const multiPolygon = [
  [
    [22.36795, 114.113],
    [22.36785, 114.1155],
    [22.36665, 114.1175],
  ],
  [
    [22.3679, 114.11445],
    [22.3679, 114.11444],
    [22.3679, 114.11443],
  ],
];

const getIcon = (org) => {
  const iconFilesRef = {
    Broadway: ico_broadway,
    MCL: ico_mcl,
    "Cinema City": ico_cinemacity,
    "Golden Harvest": ico_goldenharvest,
    "Emperor Cinema": ico_emperor,
    Others: ico_other,
    MTR: ico_mtr,
  };

  // console.log(`../assets/${iconFilesRef[org]}.png`);
  return L.icon({
    iconUrl: iconFilesRef[org],
    iconSize: 50,
  });
};

const MapTutorial = () => {
  const [activeCinema, setActiveCinema] = useState(null);
  const [activeHouse, setActiveHouse] = useState(null);
  const [activeDistance, setActiveDistance] = useState([
    [0, 0],
    [0, 0],
  ]);

  const addLine = (name) => {
    var cinema_obj = mtr_distances.filter((c) => c.name == name)[0];
    // console.log(cinema_obj[0].closest_exits);
    // console.log(cinema_obj[0]);
    setActiveDistance([
      [cinema_obj.latitude, cinema_obj.longitude],
      cinema_obj.closest_exits[0].coordinates,
    ]);
  };

  // https://stackoverflow.com/questions/66264472/react-leaflet-layerscontrol-overlay-with-multiple-markers
  const groupedByChain = groupBy(mtr_distances, "chain");

  return (
    // <div>map</div>
    <Grid
      container
      sx={{
        height: "100%",
      }}
      alignItems="center"
      justifyContent="space-between"
      // spacing={10}
      // rowSpacing={12}
    >
      <Grid item xs={6}>
        <MapContainer center={[22.36797, 114.11453]} zoom={13}>
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
              />
            </LayersControl.BaseLayer>

            {Object.keys(groupedByChain).map((chain) => (
              <LayersControl.Overlay
                checked={chain == "Golden Harvest" ? true : true}
                key={chain}
                name={chain}
              >
                <LayerGroup>
                  {groupedByChain[chain].map((c) => (
                    <Marker
                      name={c.name}
                      position={[c.latitude, c.longitude]}
                      icon={getIcon(c.chain)}
                      eventHandlers={{
                        // click: () => {},
                        click: (e) => {
                          setActiveHouse(null);
                          addLine(e.target.options.name);
                          setActiveCinema(c.name);
                        },
                        // mouseout: () => {
                        //   // setActiveCinema(null);
                        //   setActiveHouse(null);
                        //   setActiveDistance(null);
                        // },
                      }}
                    >
                      <Tooltip>{c.name}</Tooltip>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
            ))}
            <LayersControl.Overlay checked key="MTR Exits" name="MTR Exits">
              <LayerGroup>
                {mtr_distances.map((c) => (
                  <Marker
                    name={c.closest_exits[0].name}
                    position={c.closest_exits[0].coordinates}
                    icon={getIcon("MTR")}
                  >
                    <Tooltip>{c.closest_exits[0].name}</Tooltip>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
            {activeDistance == null ? (
              <></>
            ) : (
              <Polyline
                positions={activeDistance}
                pathOptions={{ color: "rgb(224,179,66)" }}
              ></Polyline>
            )}
            <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
          </LayersControl>
        </MapContainer>
      </Grid>
      <Grid item xs={6} sx={{ textAlign: "center" }}>
        <Grid container direction="column" justifyContent="center">
          <h3> {activeCinema == null ? "-" : activeCinema} </h3>
          <ChartHousesSales
            hoveredTheatre={activeCinema}
            activeHouse={activeHouse}
            setActiveHouse={setActiveHouse}
          />
          <ChartTheatresSalesOverHours hoveredTheatre={activeCinema} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MapTutorial;
