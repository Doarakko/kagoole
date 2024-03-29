from django.urls import path

from . import views


urlpatterns = [
    path('solutions/', views.SolutionList.as_view()),
    path('solutions/<int:pk>/', views.SolutionDetail.as_view()),
    path('competitions/', views.CompetitionList.as_view({'get': 'list'})),
]
