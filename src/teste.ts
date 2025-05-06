import TemperatureService from "./services/temperature.service"

const date = new Date("2025-05-06")

const temperatureService = new TemperatureService()

temperatureService.getTemperatureDatePerWeek(date)