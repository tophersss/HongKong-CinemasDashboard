import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Marquee from 'react-fast-marquee';
import SVG from "react-inlinesvg";
import { trivia_data } from "../data/TriviaData";
import { hhToAmPm } from '../utils/NumberUtils';
import shuffle from 'lodash/shuffle';


const dayOfWeekConversion = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
}

const ukraineFlag = () => {
  return <SVG
    src={`${process.env.PUBLIC_URL}/assets/ua.svg`}
    width={15}
    height={15}
  />
}

const ukraineFlagComp = () => {
  return (
    <SVG
    src={`${process.env.PUBLIC_URL}/assets/ua.svg`}
    width={15}
    height={15}
  />
  )
}



const GenerateTriviaSentences = (cinemaTriviaObj, cinemaName, chain) => {
  const triviaMostCrowdedSession = `${dayOfWeekConversion[cinemaTriviaObj.crowd_day]} ${hhToAmPm(cinemaTriviaObj.crowd_hh)} is the most crowded session at ${cinemaName}.`
  const triviaPlayCnt = `${cinemaName} played ${cinemaTriviaObj.movie_cnt_last_month} movie shows last month.`
  const triviaCheapestTicket = `The most affordable session offered at ${cinemaName} is ${dayOfWeekConversion[cinemaTriviaObj.cheap_day]} ${hhToAmPm(cinemaTriviaObj.cheap_hh)}, averages $${cinemaTriviaObj.cheap_avg_price !== null ? Math.round(cinemaTriviaObj.cheap_avg_price) : "?"} per ticket.`
  const triviaMostPlayedMovie = (<> The most played movie last month was <a href={`https://hkmovie6.com/movie/${cinemaTriviaObj.most_played_hkmovie6_code} target="_blank"`}><i>{cinemaTriviaObj.most_played_name_en}</i></a>. ({cinemaTriviaObj.most_played_cnt} times!)</>);
  const supportUkraine = (<> {ukraineFlag()} <a href={'https://leafletjs.com/'} target="_blank">Leaflet</a>, the library that is used to create this map, is developed by an Ukrainian named Volodymyr. <a href={'https://agafonkin.com/'} target="_blank">Show your support!</a> </>)
  
  if (chain === "Golden Harvest") {
    return [supportUkraine];
  } {
    return shuffle([triviaMostCrowdedSession, triviaPlayCnt, triviaCheapestTicket, triviaMostPlayedMovie]);
  }
}


const Trivia = ({ TheatreID, name, chain }) => {

  const [triviaSentences, setTriviaSentences] = useState(null);

  useEffect(() => {
    var result = trivia_data.filter(
      (d) => d.TheatreID === TheatreID
    )[0];

    var sentences = GenerateTriviaSentences(result, name, chain);
    setTriviaSentences(sentences);
  }, [TheatreID])


  // note: not in use. toggle which Trivia sentence to display
  const toggleUnitType = () => {
    // setTriviaIndex((prevState) =>
    //   prevState + 1 > Object.keys(triviaSentences).length - 1 ? 0 : prevState + 1
    // );
  };


  return (
    <Marquee gradient={false} pauseOnHover={true} >
      {triviaSentences !== undefined && triviaSentences !== null ? (
        triviaSentences.map((d) => (
          <Typography className="trivia__content" color="text.primary" variant="subtitle1" >
            {d}
          </Typography>
        ))
      ) : ("")}
      <ukraineFlagComp />
    </Marquee>
  )
}

export default Trivia