import { useRecoilState } from 'recoil'
import moment from 'moment'
import { Container, Block } from './Layout'
import Fish from './Fish/Fish'
import FishesData from '../utils/database/fishes_data'
import { hemisphere, filters } from '../services/Recoil'

function Fishes() {
  const [hemisphereValue] = useRecoilState(hemisphere)
  const [filtersValue] = useRecoilState(filters);


  const formatSchedule = (data) => {
    let result;

    if (data.length === 0) {
      result = 'All day'
    } else {
      let firstVal = data[0];
      let secondVal = data[data.length - 1];

      if (firstVal > secondVal) {
        result = `${firstVal}pm - ${secondVal}am`;
      } else {
        result = `${firstVal}am - ${secondVal}pm`;
      }
    }

    return result
  }

  const formatSeasons = (data) => {
    if (Object.keys(data).length === 0) {
      return 'All year';
    }

    const currentSeason = data[hemisphereValue];
    let result = ''

    currentSeason.forEach((season) => {
      let firstVal = season[0];
      let secondVal = season[season.length - 1];

      result = `${moment().month(firstVal).format('MMM')} ➡ ${moment().month(secondVal).format('MMM')}`;
    });

    return result;
  };

  const isInWater = (season, schedule) => {
    if (Object.keys(season).length === 0 && schedule.length === 0) {
      return true;
    }

    let result = false;
    let isSeasonal = false;
    let currentSeason = season[hemisphereValue];
    let currentMonth = moment().format('M');
    let currentHour = moment().format('H');

    if (Object.keys(season).length === 0) {
      isSeasonal = true;
    } else {
      currentSeason.forEach((season) => {
        if (season.includes(+currentMonth)) {
          isSeasonal = true;
        }
      });
    }

    if (isSeasonal) {
      if (schedule.length === 0) {
        result = true;
      } else {
        schedule.includes(+currentHour) ? (result = true) : (result = false);
      }
    }

    return result;
  }

  const renderFishes = () => {
    if (filtersValue === 'Now') {
      return FishesData.filter(fish => {
        return isInWater(fish.seasons, fish.schedule);
      })
    }

    if (filtersValue === 'This month') {
      let currentMonth = moment().format('M');

      return FishesData.filter((fish) => {
        let value = false;
        let fishSeason = fish.seasons[hemisphereValue];
        if (Object.keys(fish.seasons).length === 0) {
          value = true;
        } else {
          if (fishSeason.includes(+currentMonth)) {
            value = true;
          }
        }
        return value
      });
    }

    if (filtersValue === 'Last chance') {
      return FishesData.filter((fish) => {
        let currentMonth = moment().format('M');
        let fishSeason = fish.seasons[hemisphereValue];
        if (Object.keys(fish.seasons).length === 0) {
          return false;
        } else if (fishSeason[fishSeason.length - 1] === currentMonth) {
          return true
        }
        return false;
      });
    }

    return FishesData
  }

  return (
    <>
      <Container>
        {renderFishes().length === 0 ?
            <Block>
              <p>Nothing to show</p>
            </Block>
            :
            <div className="grid grid-cols-1 gap-2 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {renderFishes().map((fish) => {
                return (
                    <Fish
                        key={fish.id}
                        inWater={isInWater(fish.seasons, fish.schedule)}
                        id={fish.id}
                        name={fish.name}
                        price={fish.price}
                        location={fish.location}
                        shadow={fish.shadow}
                        schedule={formatSchedule(fish.schedule)}
                        seasons={formatSeasons(fish.seasons)}
                    />
                );
              })}
            </div>}
      </Container>
    </>
  );
}

export default Fishes
