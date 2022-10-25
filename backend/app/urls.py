from django.urls import path
from . import views

urlpatterns = [
    path("getChartData/", views.get_chart_data)
]