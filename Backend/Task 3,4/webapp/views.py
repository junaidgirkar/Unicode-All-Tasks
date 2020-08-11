from django.shortcuts import render
from django.http import HttpResponse
import requests
import json
from pprint import PrettyPrinter
from webapp.models import mars_weather_data
import sqlite3
from sqlite3 import Error
pp = PrettyPrinter()

# Create your views here.
def home(request):
    if request.method == 'GET':
        return render(request, 'webapp\\weather.html')
    elif request.method == 'POST':
        sol_number = request.POST.get('sol_number')

        api_url = "https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0"
        json_data = requests.get(api_url).json()
        sol_no = str(sol_number)
        season = json_data[sol_no]['Season'].upper()
        # input from air temperature sensors
        air_temp_max = json_data[sol_no]['AT']['mx']# in Farhenheit
        air_temp_min = json_data[sol_no]['AT']['mn']# in Farhenheit
        air_temp_avg = json_data[sol_no]['AT']['av']# in Farhenheit
        # converting temperature to Celcius( C = (F-32)*5/9)
        air_temp_max = (air_temp_max-32)/1.8
        air_temp_max = round(air_temp_max,2)
        air_temp_min = (air_temp_min-32)/1.8
        air_temp_min = round(air_temp_min,2)
        air_temp_avg = (air_temp_avg-32)/1.8
        air_temp_avg = round(air_temp_avg,2)
        #input from horizontal wind speed sensors
        avg_wind_speed = json_data[sol_no]['HWS']['av']
        #converting date time to date
        utc_date = json_data[sol_no]["First_UTC"].split('T')[0]
        #input from pressure reading sensor
        pressure_avg = round(json_data[sol_no]['PRE']['av'],2)
        pressure_min = round(json_data[sol_no]['PRE']['mn'],2)
        pressure_max = round(json_data[sol_no]['PRE']['mx'],2)
        #input from wind direction sensors
        wind_common_direction = json_data[sol_no]['WD']['most_common']['compass_point']
        wind_common_degree = json_data[sol_no]['WD']['most_common']['compass_degrees']



        mars_new = mars_weather_data(sol_no=sol_no,sol_date=utc_date,season=season,air_temp_avg=air_temp_avg,air_temp_max=air_temp_max,air_temp_min=air_temp_min,wind_speed_avg=avg_wind_speed,pressure_reading_avg=pressure_avg,wind_direction=wind_common_direction,wind_angle=wind_common_degree)
        mars_new.save()


        args = {'sol_no':sol_no, 'season':season, 'air_temp_avg':air_temp_avg, 'air_temp_max':air_temp_max, 'air_temp_min': air_temp_min, 'avg_wind_speed':avg_wind_speed, 'utc_date':utc_date, 'pressure_avg':pressure_avg,'pressure_max':pressure_max, 'pressure_min':pressure_min, 'wind_common_degree':str(wind_common_degree), 'wind_common_direction':str(wind_common_direction)}

        return render(request, 'webapp\\weather.html',args)

def picture(request):
    if request.method=='GET':
        print('GET METHOD')
        return render(request, 'webapp\\picture.html')
    if request.method == 'POST':
        api_url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
        json_data = requests.get(api_url).json()
        hdurl = json_data['url']
        date = json_data['date']
        photographer = json_data['copyright']
        title = json_data['title']
        args2 = {'hdurl': hdurl, 'date': date, 'photographer': photographer, 'title': title}
        print(hdurl)
        return render(request, 'webapp\\picture.html',args2)


def dbquery(request):
    if request.method == 'GET':
        return render(request, 'webapp\\dbquery.html')
    elif request.method == 'POST':
        print('POST MTHOD')
        query_sol_number = int(request.POST.get('query_sol'))
        database = "db.sqlite3"
        try:
            conn = sqlite3.connect(database)  # Creating a Connection to the Database
        except Error as e:
            #print(e)
            print("ERROR")

        with conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM webapp_mars_weather_data WHERE sol_no = '%s' ORDER BY count ASC" %query_sol_number)


            rows = cur.fetchall()


            for row in rows:
            # Parsing Data from the row and storing them in variables
                print(row)
                id = row[0]
                sol_no = row[1]
                sol_date = row[2]
                season = row[3]
                air_temp_avg = row[4]
                air_temp_max = row[5]
                air_temp_min = row[6]
                wind_speed_avg = row[7]
                pressure_reading_avg = row[8]
                wind_direction = row[9]
                wind_angle = row[10]
                count = row[11]+1
                api_req_date_utc = row[12]
                print(sol_date)
            cur.execute("UPDATE webapp_mars_weather_data SET count = count + 1 WHERE sol_no = '%s'" % query_sol_number)

            """ Adding all the values to values in args dictionary """
        args = {'count':count,'id':id,'season':season,'sol_no':sol_no,'sol_date':sol_date,'air_temp_avg':air_temp_avg,'air_temp_max':air_temp_max,'air_temp_min':air_temp_min,'wind_speed_avg':wind_speed_avg,'pressure_reading_avg':pressure_reading_avg,'wind_direction':wind_direction,'wind_angle':wind_angle,'count':count,'api_req_date_utc':api_req_date_utc}

        return render(request, 'webapp\\dbquery.html',args)


def top3(request):
    if request.method == 'GET':
        return render(request, 'webapp\\top3.html')
    elif request.method == 'POST':
        print('POST METHOD')
        database = "db.sqlite3"
        try:
            conn = sqlite3.connect(database)
        except Error as e:
            print("ERROR")
        with conn:
            cur = conn.cursor()
            cur.execute("SELECT * FROM webapp_mars_weather_data ORDER BY count DESC")
            rows = cur.fetchall()
            list = []
            for row in rows:
                id = row[0]
                sol_no = row[1]
                count = row[11]
                sol_date = row[2]
                if sol_no not in list:
                    list.append(sol_no)
                    list.append(count)
                    list.append(sol_date)
        """ Adding top 3 variable values to list """# Improvisation Needed
        sol1 = list[0]
        count1 = list[1]
        date1= list[2]
        sol2 = list[3]
        count2 = list[4]
        date2 = list[5]
        sol3 = list[6]
        count3 = list[7]
        date3 = list[8]
        args = {'sol1': sol1, 'sol2': sol2, 'sol3':sol3, 'count1': count1, 'count2': count2, 'count3': count3, 'date1': date1, 'date2': date2, 'date3': date3}
        #print(list)

    return render(request,'webapp\\top3.html',args)