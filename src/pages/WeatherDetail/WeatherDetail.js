import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as BackBtn } from '../../assets/svgs/backBtn.svg';
import WeatherDetailFunc from '../../hooks/useWeatherDetail';
import WeatherIconFunc from '../../hooks/weatherDetailIcon';
import weatherWeekIconFunc from '../../hooks/weatherWeekIconFunc';
import unixConverter from '../../utility/unixConverter';

export const Box = styled.div`
  display: flex;
  box-pack: center;
  justify-content: center;
  box-align: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding: 2rem 0;
  width: 100vw;
  background: ${(props) => props.theme.detailBackground};
`;

const GradientCircle = styled.div`
  position: absolute;
  z-index: 1;
  top: -10%;
  right: 0;
  width: 100rem;
  height: 100rem;
  border-radius: 50%;
  background: ${(props) => props.theme.circleBackground};
`;

const BackBtnStyled = styled.div`
  position: absolute;
  top: 3rem;
  left: 3.25rem;
  width: 5rem;
  cursor: pointer;
  z-index: 6;
  margin-top: 2rem;
`;

export const DetailCard = styled.section`
  position: relative;
  z-index: 3;
  justify-items: center;
  border-radius: 1rem;
  background: linear-gradient(180deg, #8782d0 35%, rgba(255, 177, 190, 1) 100%);
`;

const CardHeaderContainer = styled.section`
  position: relative;
  display: block;
  overflow: hidden;
  object-fit: cover;
  height: 510px;
  border-radius: 1rem 1rem 0 0;
  width: 100%;
  section {
    display: block;
  }
`;

const HeaderContentWrapper = styled.div`
  position: absolute;
  z-index: 2;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
  top: 3rem;
  width: 100%;
  color: #ffffff;
`;

const TodayWeatherContainer = styled.div`
  display: grid;
  align-self: center;
  justify-self: center;
  justify-items: center;
  grid-template-rows: 3fr 1fr;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  width: 100%;
`;
const TempStateContainer = styled.div`
  display: flex;
  box-pack: center;
  justify-content: center;
  box-orient: vertical;
  box-direction: normal;
  flex-flow: column;
  text-align: center;
`;

const TemperatureText = styled.span`
  font-size: 6rem;
  letter-spacing: 0.75rem;
`;

const WeatherStateContainer = styled.div`
  display: flex;
  box-align: center;
  box-orient: horizontal;
  align-items: center;
`;

const WeatherStateText = styled.span`
  letter-spacing: 0.5rem;
  font-size: 1.15rem;
  text-transform: uppercase;
  margin-left: 1rem;
`;

const HumWindContainer = styled.div`
  display: flex;
  box-align: center;
  align-items: center;
`;

const HumContainer = styled.div`
  display: flex;
  box-orient: vertical;
  box-direction: normal;
  flex-flow: column;
  box-pack: center;
  justify-content: center;
  box-align: center;
  align-items: center;
`;

const HumText = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const HumValueText = styled.span`
  box-direction: normal;
  font-size: 1.2rem;
`;

const HumWindSeparator = styled.div`
  margin: 0 2rem;
  width: 2px;
  height: 2.8rem;
  background-color: #ffffff;
`;

const WindContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  box-orient: vertical;
  box-direction: normal;
  box-pack: center;
  box-align: center;
  justify-content: center;
`;

const WindText = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;

const WindValueText = styled.span`
  box-direction: normal;
  font-size: 1.2rem;
`;

const CityNameContainer = styled.div`
  display: flex;
  box-pack: center;
  justify-content: center;
  box-align: center;
  align-items: center;
  padding-bottom: 25%;
`;

const CityNameUnderline = styled.div`
  background: 0 0;
  border-radius: 5px;
  height: 5px;
  box-shadow: 0 3rem 0 0 #ffffff;
`;

const CityNameText = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  font-size: 1.75rem;
  margin-bottom: 2rem;
`;

const PictureContainer = styled.div`
  width: 100px;
  height: 100px;
  padding: 1em;
  img {
    width: 100%;
  }
`;

const BodyContentWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-column-gap: 1rem;
  justify-items: center;
  justify-content: center;
  align-content: start;
  align-items: start;
  box-pack: center;
  box-align: start;
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;
  color: #ffffff;
`;

const ForecastContainer = styled.div`
  display: flex;
  box-orient: horizontal;
  box-direction: normal;
  flex-flow: row;
  flex-wrap: wrap;
`;

const SmallPictureContainer = styled.div`
  img {
    width: 4rem;
    height: 4rem;
  }
`;

const DayWeatherContainer = styled.div`
  display: flex;
  flex-flow: column;
  box-orient: vertical;
  box-direction: normal;
  box-pack: center;
  box-align: center;
  align-items: center;
  justify-content: center;
  margin: 2rem 1.5rem;
`;

const WeatherDetail = ({ match }) => {
  const { name, lat, long } = match.params;
  const { data } = WeatherDetailFunc(lat, long);
  const [img, setImg] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    if (data) {
      const img = WeatherIconFunc(data.current.weather[0].main);
      setImg(img);
      setDailyData(data.daily.slice(1, 6));
    }
  }, [data]);

  return (
    <Box>
      <GradientCircle />
      <BackBtnStyled>
        <BackBtn />
      </BackBtnStyled>
      <DetailCard>
        <CardHeaderContainer>
          <HeaderContentWrapper>
            <TodayWeatherContainer>
              <TempStateContainer>
                <TemperatureText>
                  {data && Math.round(data.current.temp)}°
                </TemperatureText>
                <WeatherStateContainer>
                  <WeatherStateText>
                    {data && data.current.weather[0].description}
                  </WeatherStateText>
                  <PictureContainer>
                    {data && <img src={img} alt="" />}
                  </PictureContainer>
                </WeatherStateContainer>
              </TempStateContainer>
              <HumWindContainer>
                <HumContainer>
                  <HumText>습도</HumText>
                  <HumValueText>{data && data.current.humidity}%</HumValueText>
                </HumContainer>
                <HumWindSeparator></HumWindSeparator>
                <WindContainer>
                  <WindText>바람</WindText>
                  <WindValueText>
                    {data && data.current.wind_speed}m/sec
                  </WindValueText>
                </WindContainer>
              </HumWindContainer>
            </TodayWeatherContainer>
            <CityNameContainer>
              <CityNameUnderline>
                <CityNameText>{name && name}</CityNameText>
              </CityNameUnderline>
            </CityNameContainer>
          </HeaderContentWrapper>
        </CardHeaderContainer>
        <BodyContentWrapper>
          <ForecastContainer>
            {dailyData &&
              dailyData.map((day) => {
                return (
                  <DayWeatherContainer>
                    <DayWeatherContainer key={day.dt}>
                      <span>{unixConverter(day.dt)}</span>
                      <SmallPictureContainer>
                        {data && (
                          <img
                            src={weatherWeekIconFunc(day.weather[0].main)}
                            alt=""
                          />
                        )}
                      </SmallPictureContainer>
                      <span>{Math.round(day.temp.day)}°</span>
                    </DayWeatherContainer>
                  </DayWeatherContainer>
                );
              })}
          </ForecastContainer>
        </BodyContentWrapper>
      </DetailCard>
    </Box>
  );
};

export default WeatherDetail;
