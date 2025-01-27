import { IconBrandSpeedtest, IconDroplet, IconUvIndex, IconWindmill } from "@tabler/icons-react";
import React from "react";


type TodayWeatherInfoProps = {
    humidity: number,
    wind_kph: number,
    pressure_mb: number,
    uv: number
}

type InfoItemsTyps = {
    type: CondationType,
    title: string,
    value: number,
    simpo: string
}

export default React.memo(function TodayWeatherInfo({weatherInfo}: {weatherInfo: TodayWeatherInfoProps}) {
    const infoItems: InfoItemsTyps[] = [
        {
            type: 'humidity',
            title: 'Humidity',
            value: weatherInfo?.humidity,
            simpo: '%'
        }, 
        {
            type: 'wind',
            title: 'Wind Speed',
            value: weatherInfo?.wind_kph,
            simpo: 'kph'
        },
        {
           type: 'pressure',
           title: 'Pressure',
           value: weatherInfo?.pressure_mb,
           simpo: 'hPa'
        },
        {
            type: 'uv',
            value: weatherInfo?.uv,
            title: 'UV',
            simpo: ''
        }
    ];
    
    return (
        <div className="grid grid-cols-2 justify-center items-center gap-4 w-full max-w-md m-auto">
            {infoItems.map((item: any) => {
                return (
                    <WeatherInfoItem type={item.type} title={item.title} key={item.title}>
                        {item.value}{item.simpo}
                    </WeatherInfoItem>
                )
            })}
        </div>
    )
})

type CondationType = 'wind' | 'humidity' | 'pressure' | 'uv';

type weatherInfoItemType = {
    type: CondationType,
    title: string
    children: React.ReactNode
}

type IconType = {
    type: CondationType,
    className?: string,
    stroke?: number
}

const WeatherInfoItem = React.memo(({type, title, children }: weatherInfoItemType) => {
    return (
        <div className="text-center space-y-1">
            <IconComponent type={type} />
            <p className="text-sm font-semibold dark:text-gray-50">{children}</p>
            <h5 className="text-md font-medium text-gray-700 dark:text-gray-200">{title}</h5>
        </div>
    )
})

const IconComponent = React.memo(({
    type,
    stroke = 1.5,
    className = 'text-blue-600 size-12 m-auto'
}: IconType) => {
    const combinedProps = {stroke, className}

    if (type === 'humidity') {
        return <IconDroplet {...combinedProps} />
    } else if (type === 'pressure') {
        return <IconBrandSpeedtest {...combinedProps} />
    } else if (type === 'uv') {
        return <IconUvIndex {...combinedProps} />
    } else if (type === 'wind') {
        return <IconWindmill {...combinedProps} />
    }
})