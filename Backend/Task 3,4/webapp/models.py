from django.db import models
from jsonfield import JSONField
# Create your models here.
class mars_weather_data(models.Model):
    sol_no = models.IntegerField('sol_no')
    sol_date = models.DateField(auto_now=False, auto_now_add=False)
    api_req_date_utc = models.DateTimeField(auto_now=True)
    season = models.CharField('season', max_length= 20)
    air_temp_avg = models.FloatField('air_temp_avg')
    air_temp_max = models.FloatField('air_temp_max')
    air_temp_min = models.FloatField('air_temp_min')
    wind_speed_avg = models.FloatField('wind_speed_avg')
    pressure_reading_avg = models.FloatField('pressure_reading_avg')
    wind_direction = models.CharField('wind_direction', max_length=10)
    wind_angle = models.FloatField('wind_angle')
    count = models.IntegerField('count',default = 0)

    def __str__(self):
        return self.sol_no