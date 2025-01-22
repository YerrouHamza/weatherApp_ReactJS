import { useEffect, useState } from "react";
import useWeatherContext from "../context-api/weatherDataContext";
import Card from '../components/ui/card'
import SunCondation from "../components/ui/sunCondation";
import CurrentWeatherCondition from "../components/currentWeatherCondition";
import TodayWeatherInfo from "../components/todayWeatherInfo";
import useThemeMode from "../hooks/useThemeMode";

export default function WeatherDetailsCard({className}:{className: string}) {
    const [todayForecast, setTodayForecast] = useState<any>({})
    const {weatherDetails, weatherForecast} = useWeatherContext();
    const [themeMode, handleToggleThemeMode] = useThemeMode()

    useEffect(() => {
        const todayForecast = weatherForecast
        if (todayForecast && todayForecast.length > 0) {
            setTodayForecast(todayForecast[0].astro)
        }
        handleToggleThemeMode(weatherDetails?.is_day === 1 ? 'light' : 'dark')
    }, [weatherForecast, weatherDetails])

    return (
        <Card className={className} bodyClass="grid grid-cols-3 gap-5 h-full">
            <div className="flex justify-center flex-col gap-7">
                <div>
                    <h4 className="text-6xl font-bold text-gray-800 dark:text-gray-100">{weatherDetails.temp_c}°<span>C</span></h4>
                    <h5 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Feels Like: {weatherDetails.feelslike_c}°<span>C</span></h5>
                </div>
                <div className="space-y-2">
                    <SunCondation type='sunrise' time={todayForecast?.sunrise} />
                    <SunCondation type='sunset' time={todayForecast?.sunset} />
                </div>
            </div>
            <CurrentWeatherCondition currentWeather={weatherDetails} />
            <TodayWeatherInfo weatherInfo={weatherDetails} />
        </Card>
    )
}
