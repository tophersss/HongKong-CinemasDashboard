import { Typography } from '@mui/material';
import { shuffle } from 'lodash';
import React, { useEffect, useState } from 'react'
import { trivia_data } from "../data/TriviaData";
import { hhToAmPm } from '../utils/NumberUtils';
import Marquee from 'react-fast-marquee';


const dayOfWeekConversion = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
}

const GenerateTriviaSentences = (cinemaTriviaObj, cinemaName) => {
  const triviaMostCrowdedSession = `${dayOfWeekConversion[cinemaTriviaObj.crowd_day]} ${hhToAmPm(cinemaTriviaObj.crowd_hh)} is the most crowded session at ${cinemaName}.`
  const triviaPlayCnt = `${cinemaName} played ${cinemaTriviaObj.movie_cnt_last_month} movie shows last month.`
  const triviaCheapestTicket = `The most affordable session offered at ${cinemaName} is ${dayOfWeekConversion[cinemaTriviaObj.cheap_day]} ${hhToAmPm(cinemaTriviaObj.cheap_hh)}, averages $${cinemaTriviaObj.cheap_avg_price} per ticket.`
  const triviaMostPlayedMovie = `The most played movie last month was <i> ${cinemaTriviaObj.most_played_name_en}</i>. (${cinemaTriviaObj.most_played_cnt} times!)`

  console.log(`GenerateTriviaSentences(): printing trivia sentences:`)
  console.log([triviaMostCrowdedSession, triviaPlayCnt, triviaCheapestTicket, triviaMostPlayedMovie]);

  return shuffle([triviaMostCrowdedSession, triviaPlayCnt, triviaCheapestTicket, triviaMostPlayedMovie]);
}


const Trivia = ({ TheatreID, name }) => {

  const [triviaIndex, setTriviaIndex] = useState(0);
  const [triviaSentences, setTriviaSentences] = useState(null);

  useEffect(() => {
    var result = trivia_data.filter(
      (d) => d.TheatreID === TheatreID
    )[0];

    // console.log(`printing trivia result:`)
    // console.log(result);

    var sentences = GenerateTriviaSentences(result, name);
    console.log(`printing trivia sentences:`)
    console.log(sentences);

    setTriviaSentences(sentences);

  }, [TheatreID])
  
  
  // note: toggle which Trivia sentence to display
  const toggleUnitType = () => {
    setTriviaIndex((prevState) =>
      prevState + 1 > Object.keys(triviaSentences).length - 1 ? 0 : prevState + 1
    );
  };


  return (
    <Marquee gradient={false} pauseOnHover={true} >
      <Typography className="trivia__content" color="text.primary" variant="subtitle1" >  
        { triviaSentences !== undefined && triviaSentences !== null ? triviaSentences[triviaIndex] : "" }
      </Typography>
    </Marquee>
  )
}

export default Trivia