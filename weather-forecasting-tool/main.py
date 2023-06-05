#! python3
import sys, requests, json


if len(sys.argv)<2:
    print("Less Arguments than expected, exiting.")
    sys.exit()

loc = ' '.join(sys.argv[1:])

url = "https://api.openweathermap.org/data/2.5/weather?q=%s&appid=7a37ebfc63ed49e4820d2d9e9cd521b6" % loc
res = requests.get(url) 
res.raise_for_status()

wData=json.loads(res.text)

# print weather data
print("Current weather in %s:" % loc)
print(wData['weather'][0]['main'], '-', wData['weather'][0]['description'])
print("Temperature: %.2f" % (wData['main']['temp']-273.15))
print("Humidity: %.2f%%" % wData['main']['humidity'])
print("Pressure: %.2f hPa" % wData['main']['pressure'])
print("Wind: %.2f m/s" % wData['wind']['speed'])

