import { FC, useEffect, useState } from "react";
import axios from "axios";
import { IWeather } from "./types";
import { Image, Space, Typography } from "antd";
import { CSSProperties } from "styled-components";
import { Content } from "antd/es/layout/layout";

const typographyStyles: CSSProperties = {
  color: "#fff",
  textShadow: "0 0 4px rgba(0, 0, 0, 0.8)",
  fontSize: 16,
  fontWeight: 500,
  fontFamily: "monospace",
};

const contentStyles: CSSProperties = {
  width: "fit-content",
  background: "#004945",
  borderRadius: 12,
  boxShadow: "0 0 12px rgba(255, 255, 255, 0.4)",
  padding: 4,
  marginLeft: 20,
};

interface WeatherProps {
  size: "small" | "big";
}

const Weather: FC<WeatherProps> = ({ size }) => {
  const [weather, setWeather] = useState<IWeather | null>(null);
  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=a66ec9e461df30e546864f9dc8990933&units=metric"
      )
      .then((res) => {
        setWeather(res.data);
      });
  }, []);
  if (size === "small") {
    return !!weather?.weather ? (
      <Image
        src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
        alt=""
        preview={false}
        title={weather?.weather[0].description}
      />
    ) : null;
  }
  return (
    <Content style={contentStyles}>
      <Typography style={typographyStyles}>
        <span>Температура:</span>
        <strong>${weather?.main.temp} °C</strong>
      </Typography>
      <Typography style={typographyStyles}>
        <span>Влажность:</span>
        <strong>${weather?.main.humidity} г/м³</strong>
      </Typography>
      <Typography style={typographyStyles}>
        <span>Скорость ветра:</span> <strong>${weather?.wind.speed} м/с</strong>
      </Typography>
      <Space>
        {!!weather?.weather ? (
          <Image
            src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`}
            alt=""
            preview={false}
            title={weather?.weather[0].description}
          />
        ) : null}
      </Space>
    </Content>
  );
};

export default Weather;
